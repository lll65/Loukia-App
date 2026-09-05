import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { formatShort, todayISO } from '../lib/dates'
import { cx, uid } from '../lib/utils'
import type { LessonSection, SectionKind } from '../store/types'
import { useStore } from '../store/StoreContext'
import { chapterStarted, MASTERY_COLOR, masteryStatus } from '../store/selectors'
import {
  Button,
  Card,
  EmptyState,
  IconButton,
  Input,
  Label,
  ProgressBar,
  Select,
  Textarea,
} from '../components/ui/primitives'
import { ConfirmDialog, Modal } from '../components/ui/Modal'
import { RichText } from '../components/ui/RichText'
import { Icon, type IconName } from '../components/ui/Icon'
import { MasteryBadge, PageHeader, SubjectChip } from '../components/common'

type Tab = 'cours' | 'fiche' | 'videos' | 'quiz' | 'exercices' | 'notes' | 'erreurs'

const TABS: { id: Tab; label: string; icon: IconName }[] = [
  { id: 'cours', label: 'Cours', icon: 'file' },
  { id: 'fiche', label: 'Fiche', icon: 'note' },
  { id: 'videos', label: 'Vidéos', icon: 'video' },
  { id: 'quiz', label: 'Quiz', icon: 'quiz' },
  { id: 'exercices', label: 'Exercices', icon: 'pencil' },
  { id: 'notes', label: 'Mes notes', icon: 'save' },
  { id: 'erreurs', label: 'Mes erreurs', icon: 'alert' },
]

const KIND_STYLE: Record<SectionKind, { label: string; icon: IconName; tone: string }> = {
  cours: { label: 'Cours', icon: 'file', tone: 'violet' },
  definition: { label: 'Définition', icon: 'book', tone: 'sky' },
  propriete: { label: 'Propriété', icon: 'star', tone: 'indigo' },
  methode: { label: 'Méthode', icon: 'list', tone: 'emerald' },
  exemple: { label: 'Exemple', icon: 'eye', tone: 'teal' },
  astuce: { label: 'Astuce', icon: 'bulb', tone: 'amber' },
  attention: { label: 'Attention', icon: 'alert', tone: 'rose' },
}

export function Chapitre() {
  const { chapterId = '' } = useParams()
  const navigate = useNavigate()
  const { state, dispatch } = useStore()
  const [params, setParams] = useSearchParams()
  const requested = params.get('onglet') as Tab | null
  const [tab, setTabState] = useState<Tab>(
    requested && TABS.some((t) => t.id === requested) ? requested : 'cours',
  )
  const [confirm, setConfirm] = useState(false)

  const setTab = (next: Tab) => {
    setTabState(next)
    setParams(next === 'cours' ? {} : { onglet: next }, { replace: true })
  }

  const chapter = state.chapters.find((c) => c.id === chapterId)
  const subject = state.subjects.find((s) => s.id === chapter?.subjectId)

  const questions = useMemo(
    () => state.questions.filter((q) => q.chapterId === chapterId),
    [state.questions, chapterId],
  )
  const exercises = useMemo(
    () => state.exercises.filter((e) => e.chapterId === chapterId),
    [state.exercises, chapterId],
  )
  const videos = useMemo(
    () => state.videos.filter((v) => v.chapterId === chapterId),
    [state.videos, chapterId],
  )
  const mistakes = useMemo(
    () => state.mistakes.filter((m) => m.chapterId === chapterId),
    [state.mistakes, chapterId],
  )

  if (!chapter || !subject) return <Navigate to="/matieres" replace />

  const favori = state.favoris.includes(chapter.id)
  const started = chapterStarted(state, chapter.id)
  const color = MASTERY_COLOR[masteryStatus(chapter.mastery)]

  const counts: Record<Tab, number | undefined> = {
    cours: chapter.sections.length,
    fiche: chapter.fiche.essentiel.length,
    videos: videos.length,
    quiz: questions.length,
    exercices: exercises.length,
    notes: undefined,
    erreurs: mistakes.filter((m) => !m.corrige).length,
  }

  return (
    <div data-tone={subject.tone}>
      <PageHeader
        title={chapter.title}
        back={{ to: `/matieres/${subject.id}`, label: subject.name }}
        action={
          <div className="flex items-center gap-1">
            <IconButton
              icon="star"
              label={favori ? 'Retirer des favoris' : 'Mettre en favori'}
              onClick={() => dispatch({ type: 'favori/toggle', payload: chapter.id })}
              className={favori ? 'text-amber-500' : undefined}
            />
            <IconButton icon="trash" label="Supprimer le chapitre" onClick={() => setConfirm(true)} />
          </div>
        }
      />

      <Card className="mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <SubjectChip subject={subject} />
          <MasteryBadge mastery={chapter.mastery} started={started} />
          <span
            className="ml-auto text-xs font-bold"
            style={{ color: started ? color : 'var(--app-muted)' }}
          >
            {chapter.mastery} % de maîtrise
          </span>
        </div>
        <ProgressBar value={chapter.mastery} color={color} className="mt-2.5" />
        <div className="mt-3 flex items-center gap-3">
          <span className="text-[11px] text-muted">Ajuster à la main</span>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={chapter.mastery}
            onChange={(e) =>
              dispatch({
                type: 'chapter/update',
                payload: {
                  id: chapter.id,
                  patch: { mastery: Number(e.target.value), masteryManual: true },
                },
              })
            }
            className="h-1.5 flex-1 accent-[var(--tone)]"
            aria-label="Niveau de maîtrise"
          />
          {chapter.masteryManual && (
            <button
              onClick={() =>
                dispatch({
                  type: 'chapter/update',
                  payload: { id: chapter.id, patch: { masteryManual: false } },
                })
              }
              className="text-[11px] font-semibold text-primary"
            >
              Auto
            </button>
          )}
        </div>
      </Card>

      <div className="no-scrollbar -mx-4 mb-4 flex gap-1.5 overflow-x-auto px-4">
        {TABS.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={cx(
              'flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition',
              tab === item.id
                ? 'bg-[var(--tone)] text-white'
                : 'bg-surface text-ink-soft hover:bg-surface-2',
            )}
          >
            <Icon name={item.icon} size={14} />
            {item.label}
            {counts[item.id] !== undefined && counts[item.id]! > 0 && (
              <span
                className={cx(
                  'rounded-full px-1.5 text-[10px]',
                  tab === item.id ? 'bg-white/25' : 'bg-line',
                )}
              >
                {counts[item.id]}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === 'cours' && <CoursTab chapterId={chapter.id} />}
      {tab === 'fiche' && <FicheTab chapterId={chapter.id} />}
      {tab === 'videos' && <VideosTab chapterId={chapter.id} />}
      {tab === 'quiz' && <QuizTab chapterId={chapter.id} />}
      {tab === 'exercices' && <ExercicesTab chapterId={chapter.id} />}
      {tab === 'notes' && <NotesTab chapterId={chapter.id} />}
      {tab === 'erreurs' && <ErreursTab chapterId={chapter.id} />}

      <ConfirmDialog
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          dispatch({ type: 'chapter/remove', payload: chapter.id })
          navigate(`/matieres/${subject.id}`)
        }}
        title="Supprimer ce chapitre ?"
        message="Le cours, la fiche, les vidéos, le quiz, les exercices et les notes de ce chapitre seront supprimés."
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */

function CoursTab({ chapterId }: { chapterId: string }) {
  const { state, dispatch } = useStore()
  const chapter = state.chapters.find((c) => c.id === chapterId)!
  const [editing, setEditing] = useState<number | 'new' | null>(null)
  const [draft, setDraft] = useState<LessonSection>({ kind: 'cours', title: '', body: '' })

  const openNew = () => {
    setDraft({ kind: 'cours', title: '', body: '' })
    setEditing('new')
  }
  const openEdit = (index: number) => {
    setDraft(chapter.sections[index])
    setEditing(index)
  }

  const save = () => {
    if (!draft.title.trim()) return
    const sections = [...chapter.sections]
    if (editing === 'new') sections.push(draft)
    else if (typeof editing === 'number') sections[editing] = draft
    dispatch({ type: 'chapter/update', payload: { id: chapter.id, patch: { sections } } })
    setEditing(null)
  }

  const remove = (index: number) => {
    const sections = chapter.sections.filter((_, i) => i !== index)
    dispatch({ type: 'chapter/update', payload: { id: chapter.id, patch: { sections } } })
  }

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= chapter.sections.length) return
    const sections = [...chapter.sections]
    ;[sections[index], sections[target]] = [sections[target], sections[index]]
    dispatch({ type: 'chapter/update', payload: { id: chapter.id, patch: { sections } } })
  }

  return (
    <div className="space-y-3">
      {chapter.intro && (
        <Card className="border-primary/25 bg-primary-soft/40">
          <p className="text-sm leading-relaxed text-ink-soft">{chapter.intro}</p>
        </Card>
      )}

      {chapter.sections.length === 0 ? (
        <EmptyState
          icon="file"
          title="Pas encore de cours"
          text="Écris ton cours ici, section par section : définition, propriété, méthode, exemple…"
          action={
            <Button size="sm" icon="plus" onClick={openNew}>
              Ajouter une section
            </Button>
          }
        />
      ) : (
        chapter.sections.map((section, index) => {
          const style = KIND_STYLE[section.kind]
          return (
            <Card key={`${section.title}-${index}`} data-tone={style.tone}>
              <div className="mb-2 flex items-start gap-2.5">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--tone-bg)] text-[var(--tone-fg)]">
                  <Icon name={style.icon} size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10.5px] font-bold uppercase tracking-wide text-[var(--tone-fg)]">
                    {style.label}
                  </p>
                  <h3 className="text-sm font-bold text-ink">{section.title}</h3>
                </div>
                <div className="flex shrink-0 items-center">
                  <IconButton icon="chevronUp" label="Monter" size={14} onClick={() => move(index, -1)} />
                  <IconButton icon="chevronDown" label="Descendre" size={14} onClick={() => move(index, 1)} />
                  <IconButton icon="pencil" label="Modifier" size={14} onClick={() => openEdit(index)} />
                  <IconButton icon="trash" label="Supprimer" size={14} onClick={() => remove(index)} />
                </div>
              </div>
              <RichText text={section.body} />
            </Card>
          )
        })
      )}

      {chapter.sections.length > 0 && (
        <Button variant="outline" icon="plus" full onClick={openNew}>
          Ajouter une section
        </Button>
      )}

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        wide
        title={editing === 'new' ? 'Nouvelle section' : 'Modifier la section'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Annuler
            </Button>
            <Button icon="check" onClick={save}>
              Enregistrer
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <label className="block">
            <Label>Type</Label>
            <Select
              value={draft.kind}
              onChange={(e) => setDraft({ ...draft, kind: e.target.value as SectionKind })}
            >
              {Object.entries(KIND_STYLE).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </Select>
          </label>
          <label className="block">
            <Label>Titre</Label>
            <Input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="Ex. Définition d’une fonction"
            />
          </label>
          <label className="block">
            <Label hint="**gras**, *italique*, « - » pour une puce">Contenu</Label>
            <Textarea
              rows={10}
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              placeholder={'Une fonction associe à chaque nombre x un **unique** nombre f(x).\n- image de a : f(a)\n- antécédent de b : on résout f(x) = b'}
            />
          </label>
        </div>
      </Modal>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function ListEditor({
  title,
  icon,
  tone,
  items,
  onChange,
  placeholder,
}: {
  title: string
  icon: IconName
  tone: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder: string
}) {
  const [value, setValue] = useState('')
  const add = () => {
    if (!value.trim()) return
    onChange([...items, value.trim()])
    setValue('')
  }
  return (
    <Card data-tone={tone}>
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--tone-bg)] text-[var(--tone-fg)]">
          <Icon name={icon} size={15} />
        </span>
        <h3 className="text-sm font-bold text-ink">{title}</h3>
      </div>
      {items.length === 0 ? (
        <p className="text-xs text-muted">Rien pour l’instant.</p>
      ) : (
        <ul className="space-y-1.5">
          {items.map((item, index) => (
            <li key={`${item}-${index}`} className="group flex items-start gap-2 text-sm text-ink-soft">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--tone)]" />
              <span className="flex-1 leading-relaxed">{item}</span>
              <button
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                aria-label="Supprimer"
                className="shrink-0 text-muted opacity-0 transition group-hover:opacity-100 hover:text-rose-500"
              >
                <Icon name="x" size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2.5 flex gap-1.5">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder={placeholder}
        />
        <Button variant="soft" icon="plus" onClick={add} aria-label="Ajouter" />
      </div>
    </Card>
  )
}

function FicheTab({ chapterId }: { chapterId: string }) {
  const { state, dispatch } = useStore()
  const chapter = state.chapters.find((c) => c.id === chapterId)!
  const patchFiche = (patch: Partial<typeof chapter.fiche>) =>
    dispatch({
      type: 'chapter/update',
      payload: { id: chapter.id, patch: { fiche: { ...chapter.fiche, ...patch } } },
    })

  return (
    <div className="space-y-3">
      <div className="no-print flex justify-end">
        <Button variant="outline" size="sm" icon="download" onClick={() => window.print()}>
          Imprimer / PDF
        </Button>
      </div>
      <ListEditor
        title="L’essentiel à retenir"
        icon="star"
        tone="violet"
        items={chapter.fiche.essentiel}
        onChange={(essentiel) => patchFiche({ essentiel })}
        placeholder="Ajouter un point clé"
      />
      <ListEditor
        title="Formules et repères"
        icon="quiz"
        tone="sky"
        items={chapter.fiche.formules ?? []}
        onChange={(formules) => patchFiche({ formules })}
        placeholder="Ajouter une formule"
      />
      <ListEditor
        title="Pièges à éviter"
        icon="alert"
        tone="rose"
        items={chapter.fiche.pieges ?? []}
        onChange={(pieges) => patchFiche({ pieges })}
        placeholder="Ajouter un piège"
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */

function VideosTab({ chapterId }: { chapterId: string }) {
  const { state, dispatch } = useStore()
  const chapter = state.chapters.find((c) => c.id === chapterId)!
  const videos = state.videos.filter((v) => v.chapterId === chapterId)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [duree, setDuree] = useState(10)

  const add = () => {
    if (!title.trim() || !url.trim()) return
    dispatch({
      type: 'video/add',
      payload: {
        id: uid('vid'),
        chapterId,
        subjectId: chapter.subjectId,
        title: title.trim(),
        url: url.trim(),
        duree,
        source: 'Ajoutée par moi',
      },
    })
    setTitle('')
    setUrl('')
    setOpen(false)
  }

  return (
    <div className="space-y-3">
      {videos.length === 0 ? (
        <EmptyState
          icon="video"
          title="Aucune vidéo"
          text="Ajoute le lien d’une vidéo qui t’a aidée pour ce chapitre."
          action={
            <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
              Ajouter une vidéo
            </Button>
          }
        />
      ) : (
        videos.map((video) => (
          <Card key={video.id} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/12 text-rose-500">
              <Icon name="play" size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{video.title}</p>
              <p className="text-[11px] text-muted">
                {video.source} · environ {video.duree} min
              </p>
            </div>
            <a
              href={video.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-primary-soft px-2.5 py-1.5 text-xs font-semibold text-primary-ink"
            >
              Voir
              <Icon name="external" size={13} />
            </a>
            <IconButton
              icon="trash"
              label="Supprimer"
              size={15}
              onClick={() => dispatch({ type: 'video/remove', payload: video.id })}
            />
          </Card>
        ))
      )}

      {videos.length > 0 && (
        <Button variant="outline" icon="plus" full onClick={() => setOpen(true)}>
          Ajouter une vidéo
        </Button>
      )}

      <p className="px-1 text-[11px] leading-relaxed text-muted">
        Les vidéos proposées ouvrent une recherche sur YouTube : tu choisis celle qui t’explique le
        mieux le chapitre, puis tu peux enregistrer son lien ici.
      </p>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Ajouter une vidéo"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button icon="check" onClick={add}>
              Ajouter
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <label className="block">
            <Label>Titre</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          </label>
          <label className="block">
            <Label>Lien</Label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              inputMode="url"
            />
          </label>
          <label className="block">
            <Label>Durée (minutes)</Label>
            <Input
              type="number"
              min={1}
              max={180}
              value={duree}
              onChange={(e) => setDuree(Number(e.target.value))}
            />
          </label>
        </div>
      </Modal>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function QuizTab({ chapterId }: { chapterId: string }) {
  const { state } = useStore()
  const questions = state.questions.filter((q) => q.chapterId === chapterId)
  const attempts = state.attempts.filter((a) => a.chapterId === chapterId).slice(0, 5)

  return (
    <div className="space-y-3">
      <Card className="flex flex-wrap items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-ink">
          <Icon name="quiz" size={19} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-ink">
            {questions.length} question{questions.length > 1 ? 's' : ''} disponible
            {questions.length > 1 ? 's' : ''}
          </p>
          <p className="text-[11px] text-muted">
            QCM, vrai/faux, réponse à écrire, calcul et associations.
          </p>
        </div>
        {questions.length > 0 && (
          <Link
            to={`/quiz/${chapterId}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-sm font-semibold text-white"
          >
            <Icon name="play" size={15} />
            Commencer
          </Link>
        )}
      </Card>

      {attempts.length > 0 && (
        <Card>
          <h3 className="mb-2 text-sm font-bold text-ink">Mes derniers essais</h3>
          <ul className="space-y-1.5">
            {attempts.map((attempt) => {
              const pct = Math.round((attempt.score / attempt.total) * 100)
              return (
                <li key={attempt.id} className="flex items-center gap-2 text-xs">
                  <span className="w-14 shrink-0 text-muted">{formatShort(attempt.date)}</span>
                  <ProgressBar value={pct} className="flex-1" height={6} />
                  <span className="w-16 shrink-0 text-right font-bold text-ink">
                    {attempt.score}/{attempt.total}
                  </span>
                </li>
              )
            })}
          </ul>
        </Card>
      )}

      {questions.length === 0 && (
        <EmptyState
          icon="quiz"
          title="Aucune question"
          text="Ce chapitre n’a pas encore de quiz. Tu peux en créer un depuis la page Quiz."
          action={
            <Link
              to="/quiz"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary-ink"
            >
              Aller aux quiz
            </Link>
          }
        />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */

function ExercicesTab({ chapterId }: { chapterId: string }) {
  const { state } = useStore()
  const exercises = state.exercises.filter((e) => e.chapterId === chapterId)
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [hints, setHints] = useState<Record<string, boolean>>({})

  if (exercises.length === 0) {
    return (
      <EmptyState
        icon="pencil"
        title="Aucun exercice"
        text="Les exercices corrigés de ce chapitre apparaîtront ici."
      />
    )
  }

  return (
    <div className="space-y-3">
      {exercises.map((exercise) => (
        <Card key={exercise.id}>
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="text-sm font-bold text-ink">{exercise.titre}</h3>
            <span className="shrink-0 text-xs" title={`Difficulté ${exercise.difficulte}/3`}>
              {'★'.repeat(exercise.difficulte)}
              <span className="text-line-strong">{'★'.repeat(3 - exercise.difficulte)}</span>
            </span>
          </div>
          <RichText text={exercise.enonce} />

          {exercise.indice && (
            <div className="mt-3">
              {hints[exercise.id] ? (
                <div className="rounded-xl bg-amber-500/10 p-2.5 text-xs text-amber-700 dark:text-amber-300">
                  <strong>Indice : </strong>
                  {exercise.indice}
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  icon="bulb"
                  onClick={() => setHints({ ...hints, [exercise.id]: true })}
                >
                  Voir un indice
                </Button>
              )}
            </div>
          )}

          <div className="mt-3 border-t border-line pt-3">
            {revealed[exercise.id] ? (
              <div>
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                  Correction
                </p>
                <ol className="space-y-1.5">
                  {exercise.correction.map((step, index) => (
                    <li key={index} className="flex gap-2 text-sm text-ink-soft">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => setRevealed({ ...revealed, [exercise.id]: false })}
                >
                  Masquer
                </Button>
              </div>
            ) : (
              <Button
                variant="soft"
                size="sm"
                icon="eye"
                onClick={() => setRevealed({ ...revealed, [exercise.id]: true })}
              >
                Voir la correction
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */

function NotesTab({ chapterId }: { chapterId: string }) {
  const { state, dispatch } = useStore()
  const chapter = state.chapters.find((c) => c.id === chapterId)!
  const note = state.chapterNotes.find((n) => n.chapterId === chapterId)
  const [value, setValue] = useState(note?.contenu ?? '')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setValue(note?.contenu ?? '')
  }, [note?.contenu])

  // Enregistrement automatique une seconde après la dernière frappe.
  useEffect(() => {
    if (value === (note?.contenu ?? '')) return
    const timer = window.setTimeout(() => {
      dispatch({
        type: 'note/upsert',
        payload: {
          id: note?.id ?? uid('note'),
          chapterId,
          subjectId: chapter.subjectId,
          contenu: value,
          updatedAt: new Date().toISOString(),
        },
      })
      setSaved(true)
      window.setTimeout(() => setSaved(false), 1600)
    }, 900)
    return () => window.clearTimeout(timer)
  }, [value, note, chapterId, chapter.subjectId, dispatch])

  return (
    <Card>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-bold text-ink">Mes notes personnelles</h3>
        <span
          className={cx(
            'text-[11px] font-semibold transition-opacity',
            saved ? 'text-emerald-500 opacity-100' : 'opacity-0',
          )}
        >
          Enregistré ✓
        </span>
      </div>
      <Textarea
        rows={12}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ce que le prof a insisté dessus, ce que je n’ai pas compris, mes astuces…"
      />
      <p className="mt-2 text-[11px] text-muted">
        Tout est enregistré automatiquement sur cet appareil.
      </p>
    </Card>
  )
}

/* ------------------------------------------------------------------ */

function ErreursTab({ chapterId }: { chapterId: string }) {
  const { state, dispatch } = useStore()
  const chapter = state.chapters.find((c) => c.id === chapterId)!
  const mistakes = state.mistakes.filter((m) => m.chapterId === chapterId)
  const [open, setOpen] = useState(false)
  const [enonce, setEnonce] = useState('')
  const [maReponse, setMaReponse] = useState('')
  const [bonneReponse, setBonneReponse] = useState('')

  const add = () => {
    if (!enonce.trim()) return
    dispatch({
      type: 'mistake/add',
      payload: {
        id: uid('err'),
        chapterId,
        subjectId: chapter.subjectId,
        enonce: enonce.trim(),
        maReponse: maReponse.trim(),
        bonneReponse: bonneReponse.trim(),
        date: todayISO(),
        corrige: false,
      },
    })
    setEnonce('')
    setMaReponse('')
    setBonneReponse('')
    setOpen(false)
  }

  return (
    <div className="space-y-3">
      {mistakes.length === 0 ? (
        <EmptyState
          icon="alert"
          title="Aucune erreur enregistrée"
          text="Les erreurs faites pendant les quiz arrivent ici automatiquement. Tu peux aussi en ajouter à la main après un contrôle."
          action={
            <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
              Ajouter une erreur
            </Button>
          }
        />
      ) : (
        mistakes.map((mistake) => (
          <Card key={mistake.id} className={mistake.corrige ? 'opacity-60' : undefined}>
            <div className="flex items-start gap-2.5">
              <button
                onClick={() =>
                  dispatch({
                    type: 'mistake/update',
                    payload: { id: mistake.id, patch: { corrige: !mistake.corrige } },
                  })
                }
                aria-label={mistake.corrige ? 'Marquer à revoir' : 'Marquer comme corrigée'}
                className={cx(
                  'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition',
                  mistake.corrige
                    ? 'border-transparent bg-emerald-500 text-white'
                    : 'border-line-strong text-transparent hover:border-emerald-400',
                )}
              >
                <Icon name="check" size={13} />
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">{mistake.enonce}</p>
                {mistake.maReponse && (
                  <p className="mt-1 text-xs text-rose-500">Ma réponse : {mistake.maReponse}</p>
                )}
                {mistake.bonneReponse && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    Bonne réponse : {mistake.bonneReponse}
                  </p>
                )}
                <p className="mt-1 text-[11px] text-muted">{formatShort(mistake.date)}</p>
              </div>
              <IconButton
                icon="trash"
                label="Supprimer"
                size={15}
                onClick={() => dispatch({ type: 'mistake/remove', payload: mistake.id })}
              />
            </div>
          </Card>
        ))
      )}

      {mistakes.length > 0 && (
        <Button variant="outline" icon="plus" full onClick={() => setOpen(true)}>
          Ajouter une erreur
        </Button>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Nouvelle erreur"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button icon="check" onClick={add}>
              Enregistrer
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <label className="block">
            <Label>Question ou consigne</Label>
            <Textarea rows={2} value={enonce} onChange={(e) => setEnonce(e.target.value)} autoFocus />
          </label>
          <label className="block">
            <Label>Ce que j’avais répondu</Label>
            <Input value={maReponse} onChange={(e) => setMaReponse(e.target.value)} />
          </label>
          <label className="block">
            <Label>La bonne réponse</Label>
            <Input value={bonneReponse} onChange={(e) => setBonneReponse(e.target.value)} />
          </label>
        </div>
      </Modal>
    </div>
  )
}
