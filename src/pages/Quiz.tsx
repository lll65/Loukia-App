import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { todayISO } from '../lib/dates'
import { cx, formatDuration, normalizeAnswer, shuffle, uid } from '../lib/utils'
import type { Question } from '../store/types'
import { useStore } from '../store/StoreContext'
import { Button, Card, EmptyState, Input, ProgressBar } from '../components/ui/primitives'
import { Icon } from '../components/ui/Icon'
import { PageHeader, SubjectChip, SubjectFilter } from '../components/common'
import { ProgressRing } from '../components/charts'

const KIND_LABEL: Record<Question['kind'], string> = {
  qcm: 'QCM',
  vraifaux: 'Vrai / Faux',
  texte: 'Réponse à écrire',
  calcul: 'Calcul',
  associer: 'Associer',
}

/* ------------------------------------------------------------------ */
/* Index                                                               */
/* ------------------------------------------------------------------ */

export function QuizIndex() {
  const { state } = useStore()
  const [filter, setFilter] = useState('')

  const rows = state.chapters
    .filter((chapter) => !filter || chapter.subjectId === filter)
    .map((chapter) => ({
      chapter,
      subject: state.subjects.find((s) => s.id === chapter.subjectId)!,
      count: state.questions.filter((q) => q.chapterId === chapter.id).length,
      best: state.attempts
        .filter((a) => a.chapterId === chapter.id)
        .reduce((acc, a) => Math.max(acc, a.total ? (a.score / a.total) * 100 : 0), -1),
    }))
    .filter((row) => row.count > 0 && row.subject)

  return (
    <div>
      <PageHeader
        icon="quiz"
        title="Quiz et exercices"
        subtitle="QCM, vrai/faux, réponse à écrire, calcul, associations — de quoi se tester rapidement sur chaque chapitre."
      />
      <div className="mb-3">
        <SubjectFilter subjects={state.subjects} value={filter} onChange={setFilter} />
      </div>

      {rows.length === 0 ? (
        <EmptyState icon="quiz" title="Aucun quiz disponible" text="Ajoute des questions depuis un chapitre." />
      ) : (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {rows.map(({ chapter, subject, count, best }) => (
            <Link
              key={chapter.id}
              to={`/quiz/${chapter.id}`}
              data-tone={subject.tone}
              className="card flex items-center gap-3 p-3.5 transition hover:border-[var(--tone)] hover:shadow-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--tone-bg)] text-[var(--tone-fg)]">
                <Icon name="quiz" size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{chapter.title}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted">
                  <SubjectChip subject={subject} />
                  {count} question{count > 1 ? 's' : ''}
                </p>
              </div>
              {best >= 0 && (
                <span className="shrink-0 text-xs font-bold text-[var(--tone-fg)]">
                  {Math.round(best)} %
                </span>
              )}
              <Icon name="chevronRight" size={16} className="shrink-0 text-muted" />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Déroulé du quiz                                                     */
/* ------------------------------------------------------------------ */

interface Answer {
  question: Question
  given: string
  correct: boolean
}

export function QuizRun() {
  const { chapterId = '' } = useParams()
  const navigate = useNavigate()
  const { state, dispatch } = useStore()
  const chapter = state.chapters.find((c) => c.id === chapterId)
  const subject = state.subjects.find((s) => s.id === chapter?.subjectId)

  const pool = useMemo(
    () => shuffle(state.questions.filter((q) => q.chapterId === chapterId)).slice(0, 10),
    [state.questions, chapterId],
  )

  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [choice, setChoice] = useState<number | null>(null)
  const [text, setText] = useState('')
  const [pairing, setPairing] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)
  const [finished, setFinished] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const saved = useRef(false)

  useEffect(() => {
    if (finished) return
    const timer = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(timer)
  }, [finished])

  const question = pool[index]

  const rightOptions = useMemo(
    () => (question?.pairs ? shuffle(question.pairs.map((p) => p.right)) : []),
    [question],
  )

  // Enregistrement du résultat une seule fois, à la fin du quiz.
  useEffect(() => {
    if (!finished || saved.current || !chapter || !subject) return
    saved.current = true
    const score = answers.filter((a) => a.correct).length
    dispatch({
      type: 'attempt/add',
      payload: {
        id: uid('att'),
        chapterId: chapter.id,
        subjectId: subject.id,
        date: todayISO(),
        score,
        total: answers.length,
        dureeSec: seconds,
      },
    })
    dispatch({
      type: 'session/add',
      payload: {
        id: uid('sess'),
        date: todayISO(),
        minutes: Math.max(1, Math.round(seconds / 60)),
        subjectId: subject.id,
        chapterId: chapter.id,
        source: 'quiz',
      },
    })
    for (const answer of answers.filter((a) => !a.correct)) {
      dispatch({
        type: 'mistake/add',
        payload: {
          id: uid('err'),
          chapterId: chapter.id,
          subjectId: subject.id,
          questionId: answer.question.id,
          enonce: answer.question.enonce,
          maReponse: answer.given || '(pas de réponse)',
          bonneReponse: expectedAnswer(answer.question),
          date: todayISO(),
          corrige: false,
        },
      })
    }
  }, [finished, answers, chapter, subject, seconds, dispatch])

  if (!chapter || !subject) return <Navigate to="/quiz" replace />
  if (pool.length === 0) {
    return (
      <div>
        <PageHeader title={chapter.title} back={{ to: '/quiz', label: 'Tous les quiz' }} />
        <EmptyState icon="quiz" title="Ce chapitre n’a pas encore de questions." />
      </div>
    )
  }

  const reset = () => {
    setChoice(null)
    setText('')
    setPairing({})
    setChecked(false)
  }

  const evaluate = (): { correct: boolean; given: string } => {
    switch (question.kind) {
      case 'qcm':
        return {
          correct: choice === question.correctIndex,
          given: choice === null ? '' : (question.options?.[choice] ?? ''),
        }
      case 'vraifaux':
        return {
          correct: (choice === 0) === question.correctBool,
          given: choice === null ? '' : choice === 0 ? 'Vrai' : 'Faux',
        }
      case 'associer': {
        const ok = (question.pairs ?? []).every((pair) => pairing[pair.left] === pair.right)
        return {
          correct: ok,
          given: (question.pairs ?? [])
            .map((pair) => `${pair.left} → ${pairing[pair.left] ?? '?'}`)
            .join(' ; '),
        }
      }
      default: {
        const normalized = normalizeAnswer(text)
        const ok =
          normalized.length > 0 &&
          (question.accepted ?? []).some((value) => normalizeAnswer(value) === normalized)
        return { correct: ok, given: text }
      }
    }
  }

  const canValidate =
    question.kind === 'qcm' || question.kind === 'vraifaux'
      ? choice !== null
      : question.kind === 'associer'
        ? (question.pairs ?? []).every((pair) => pairing[pair.left])
        : text.trim().length > 0

  const current = checked ? evaluate() : null

  const validate = () => {
    if (!canValidate) return
    const result = evaluate()
    setAnswers([...answers, { question, given: result.given, correct: result.correct }])
    setChecked(true)
  }

  const next = () => {
    if (index + 1 >= pool.length) {
      setFinished(true)
      return
    }
    setIndex(index + 1)
    reset()
  }

  if (finished) {
    const score = answers.filter((a) => a.correct).length
    const pct = Math.round((score / answers.length) * 100)
    return (
      <div data-tone={subject.tone}>
        <PageHeader title="Résultat" back={{ to: `/chapitre/${chapter.id}`, label: chapter.title }} />
        <Card className="mb-4 text-center">
          <ProgressRing
            value={pct}
            size={128}
            thickness={12}
            className="mx-auto"
            color={pct >= 80 ? '#22c55e' : pct >= 50 ? 'var(--app-primary)' : '#f87171'}
            label={`${score} / ${answers.length}`}
            sublabel={`${pct} % de réussite`}
          />
          <p className="mt-3 text-sm font-bold text-ink">
            {pct >= 90
              ? 'Excellent, ce chapitre est acquis ! 🎉'
              : pct >= 70
                ? 'Très bien, encore un petit effort sur les points ratés.'
                : pct >= 50
                  ? 'C’est en bonne voie : revois les erreurs ci-dessous.'
                  : 'Ce chapitre est encore fragile — reprends le cours puis refais le quiz.'}
          </p>
          <p className="mt-1 text-xs text-muted">Durée : {formatDuration(seconds)}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Button
              icon="refresh"
              onClick={() => {
                saved.current = false
                setAnswers([])
                setIndex(0)
                setSeconds(0)
                setFinished(false)
                reset()
              }}
            >
              Recommencer
            </Button>
            <Button variant="outline" icon="file" onClick={() => navigate(`/chapitre/${chapter.id}`)}>
              Revoir le cours
            </Button>
          </div>
        </Card>

        <h2 className="mb-2 text-sm font-bold text-ink">Le détail</h2>
        <div className="space-y-2">
          {answers.map((answer, i) => (
            <Card key={i} className={answer.correct ? 'border-emerald-500/30' : 'border-rose-500/30'}>
              <div className="flex items-start gap-2.5">
                <span
                  className={cx(
                    'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white',
                    answer.correct ? 'bg-emerald-500' : 'bg-rose-500',
                  )}
                >
                  <Icon name={answer.correct ? 'check' : 'x'} size={13} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{answer.question.enonce}</p>
                  {!answer.correct && (
                    <>
                      <p className="mt-1 text-xs text-rose-500">
                        Ta réponse : {answer.given || '(vide)'}
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">
                        Bonne réponse : {expectedAnswer(answer.question)}
                      </p>
                    </>
                  )}
                  {answer.question.explication && (
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {answer.question.explication}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-muted">
          Les questions ratées ont été ajoutées à{' '}
          <Link to="/erreurs" className="font-semibold text-primary">
            mes erreurs
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <div data-tone={subject.tone}>
      <PageHeader
        title={chapter.title}
        back={{ to: `/chapitre/${chapter.id}`, label: 'Retour au chapitre' }}
        subtitle={`Question ${index + 1}/${pool.length} · ${KIND_LABEL[question.kind]}`}
      />
      <ProgressBar
        value={((index + (checked ? 1 : 0)) / pool.length) * 100}
        className="mx-auto mb-4 max-w-2xl"
      />

      <Card className="mx-auto max-w-2xl">
        <p className="text-base font-bold leading-snug text-ink">{question.enonce}</p>

        <div className="mt-4 space-y-2">
          {question.kind === 'qcm' &&
            question.options?.map((option, i) => (
              <OptionButton
                key={i}
                label={String.fromCharCode(65 + i)}
                text={option}
                selected={choice === i}
                state={
                  !checked
                    ? 'idle'
                    : i === question.correctIndex
                      ? 'good'
                      : choice === i
                        ? 'bad'
                        : 'idle'
                }
                onClick={() => !checked && setChoice(i)}
              />
            ))}

          {question.kind === 'vraifaux' &&
            ['Vrai', 'Faux'].map((option, i) => (
              <OptionButton
                key={option}
                label={i === 0 ? 'V' : 'F'}
                text={option}
                selected={choice === i}
                state={
                  !checked
                    ? 'idle'
                    : (i === 0) === question.correctBool
                      ? 'good'
                      : choice === i
                        ? 'bad'
                        : 'idle'
                }
                onClick={() => !checked && setChoice(i)}
              />
            ))}

          {(question.kind === 'texte' || question.kind === 'calcul') && (
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !checked && validate()}
              disabled={checked}
              placeholder="Écris ta réponse"
              autoFocus
              className={cx(
                checked && (current?.correct ? 'border-emerald-500' : 'border-rose-500'),
              )}
            />
          )}

          {question.kind === 'associer' &&
            question.pairs?.map((pair) => (
              <div key={pair.left} className="flex items-center gap-2">
                <span className="w-1/2 shrink-0 truncate text-sm font-semibold text-ink">
                  {pair.left}
                </span>
                <Icon name="chevronRight" size={14} className="shrink-0 text-muted" />
                <select
                  disabled={checked}
                  value={pairing[pair.left] ?? ''}
                  onChange={(e) => setPairing({ ...pairing, [pair.left]: e.target.value })}
                  className={cx(
                    'field flex-1',
                    checked &&
                      (pairing[pair.left] === pair.right
                        ? 'border-emerald-500'
                        : 'border-rose-500'),
                  )}
                >
                  <option value="">Choisir…</option>
                  {rightOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
        </div>

        {checked && (
          <div
            className={cx(
              'animate-rise mt-4 rounded-2xl p-3',
              current?.correct
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-500/10 text-rose-700 dark:text-rose-300',
            )}
          >
            <p className="flex items-center gap-1.5 text-sm font-bold">
              <Icon name={current?.correct ? 'check' : 'x'} size={15} />
              {current?.correct ? 'Bonne réponse !' : 'Ce n’est pas ça.'}
            </p>
            {!current?.correct && (
              <p className="mt-1 text-xs">Réponse attendue : {expectedAnswer(question)}</p>
            )}
            {question.explication && (
              <p className="mt-1 text-xs leading-relaxed opacity-90">{question.explication}</p>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs text-muted">{formatDuration(seconds)}</span>
          <div className="ml-auto">
            {checked ? (
              <Button iconRight="chevronRight" onClick={next}>
                {index + 1 >= pool.length ? 'Voir le résultat' : 'Question suivante'}
              </Button>
            ) : (
              <Button icon="check" onClick={validate} disabled={!canValidate}>
                Valider
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

function OptionButton({
  label,
  text,
  selected,
  state,
  onClick,
}: {
  label: string
  text: string
  selected: boolean
  state: 'idle' | 'good' | 'bad'
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        'flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left text-sm transition',
        state === 'good'
          ? 'border-emerald-500 bg-emerald-500/10'
          : state === 'bad'
            ? 'border-rose-500 bg-rose-500/10'
            : selected
              ? 'border-primary bg-primary-soft'
              : 'border-line bg-surface-2 hover:border-primary/40',
      )}
    >
      <span
        className={cx(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold',
          state === 'good'
            ? 'bg-emerald-500 text-white'
            : state === 'bad'
              ? 'bg-rose-500 text-white'
              : selected
                ? 'bg-primary text-white'
                : 'bg-line text-ink-soft',
        )}
      >
        {label}
      </span>
      <span className="flex-1 font-medium text-ink">{text}</span>
      {state === 'good' && <Icon name="check" size={16} className="shrink-0 text-emerald-500" />}
    </button>
  )
}

function expectedAnswer(question: Question): string {
  switch (question.kind) {
    case 'qcm':
      return question.options?.[question.correctIndex ?? 0] ?? ''
    case 'vraifaux':
      return question.correctBool ? 'Vrai' : 'Faux'
    case 'associer':
      return (question.pairs ?? []).map((pair) => `${pair.left} → ${pair.right}`).join(' ; ')
    default:
      return question.accepted?.[0] ?? ''
  }
}
