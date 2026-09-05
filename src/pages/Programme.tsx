import { useState } from 'react'
import { Link } from 'react-router-dom'
import { addDays, formatLong, JOURS_COURTS, isoWeekday, relativeLabel, todayISO, weekDays } from '../lib/dates'
import { formatMinutes, uid } from '../lib/utils'
import type { PlanKind } from '../store/types'
import { useStore } from '../store/StoreContext'
import { dailyBudget, generatePlan, minutesOn, planFor } from '../store/selectors'
import { usePlan } from '../hooks/usePlan'
import {
  Button,
  Card,
  EmptyState,
  IconButton,
  Input,
  Label,
  ProgressBar,
  Select,
  SectionTitle,
} from '../components/ui/primitives'
import { Modal } from '../components/ui/Modal'
import { PageHeader, Segmented, SubjectChip } from '../components/common'
import { Icon } from '../components/ui/Icon'

const KIND_OPTIONS: { value: PlanKind; label: string }[] = [
  { value: 'cours', label: 'Lire le cours' },
  { value: 'fiche', label: 'Revoir la fiche' },
  { value: 'quiz', label: 'Faire un quiz' },
  { value: 'exercices', label: 'Faire des exercices' },
  { value: 'erreurs', label: 'Corriger mes erreurs' },
  { value: 'video', label: 'Regarder une vidéo' },
  { value: 'libre', label: 'Révision libre' },
]

export function Programme() {
  const { state, dispatch } = useStore()
  const [view, setView] = useState<'jour' | 'semaine' | 'mois'>('jour')
  const [date, setDate] = useState(todayISO())
  const [addOpen, setAddOpen] = useState(false)
  const { tasks, regenerate } = usePlan(date)

  const budget = dailyBudget(state, date)
  const planned = tasks.reduce((acc, task) => acc + task.minutes, 0)
  const done = tasks.filter((task) => task.fait)
  const realise = minutesOn(state, date)

  return (
    <div>
      <PageHeader
        icon="target"
        title="Mon programme personnalisé"
        subtitle="Construit à partir de tes notes, de ta note visée, de tes contrôles, de tes points faibles et du temps dont tu disposes."
        action={
          <Button variant="outline" size="sm" icon="refresh" onClick={regenerate}>
            Regénérer
          </Button>
        }
      />

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: 'jour', label: 'Jour' },
            { value: 'semaine', label: 'Semaine' },
            { value: 'mois', label: 'Mois' },
          ]}
        />
        {view === 'jour' && (
          <div className="ml-auto flex items-center gap-1">
            <IconButton icon="chevronLeft" label="Jour précédent" onClick={() => setDate(addDays(date, -1))} />
            <span className="min-w-[132px] text-center text-xs font-semibold text-ink">
              {relativeLabel(date)}
            </span>
            <IconButton icon="chevronRight" label="Jour suivant" onClick={() => setDate(addDays(date, 1))} />
          </div>
        )}
      </div>

      {view === 'jour' && (
        <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
          <Card>
            <SectionTitle
              icon="list"
              title={formatLong(date)}
              subtitle={
                budget === 0
                  ? 'Jour sans révision prévue dans tes paramètres'
                  : `${formatMinutes(budget)} disponibles selon tes paramètres`
              }
              action={
                <Button variant="ghost" size="sm" icon="plus" onClick={() => setAddOpen(true)}>
                  Tâche
                </Button>
              }
            />

            {tasks.length === 0 ? (
              <EmptyState
                icon="target"
                title="Aucune tâche"
                text={
                  budget === 0
                    ? 'Ce jour-là n’est pas coché comme jour de révision. Tu peux quand même ajouter une tâche à la main.'
                    : 'Lance la génération pour construire le programme du jour.'
                }
                action={
                  <Button size="sm" icon="sparkle" onClick={regenerate}>
                    Générer le programme
                  </Button>
                }
              />
            ) : (
              <ul className="space-y-2">
                {tasks.map((task) => {
                  const subject = state.subjects.find((s) => s.id === task.subjectId)
                  return (
                    <li
                      key={task.id}
                      data-tone={subject?.tone}
                      className="flex items-center gap-3 rounded-2xl border border-line bg-surface-2 p-2.5"
                    >
                      <button
                        onClick={() => dispatch({ type: 'plan/toggle', payload: task.id })}
                        aria-label={task.fait ? 'À refaire' : 'Marquer comme fait'}
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                          task.fait
                            ? 'border-transparent bg-[var(--tone)] text-white'
                            : 'border-line-strong text-transparent hover:border-[var(--tone)]'
                        }`}
                      >
                        <Icon name="check" size={13} />
                      </button>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate text-sm font-semibold ${
                            task.fait ? 'text-muted line-through' : 'text-ink'
                          }`}
                        >
                          {task.titre}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted">
                          {subject && <SubjectChip subject={subject} />}
                          <span className="truncate">{task.raison}</span>
                        </p>
                      </div>
                      <span className="shrink-0 text-[11px] font-bold text-[var(--tone-fg)]">
                        {task.minutes} min
                      </span>
                      {task.chapterId && (
                        <Link
                          to={`/chapitre/${task.chapterId}`}
                          aria-label="Ouvrir le chapitre"
                          className="shrink-0 text-muted transition hover:text-primary"
                        >
                          <Icon name="chevronRight" size={16} />
                        </Link>
                      )}
                      {!task.auto && (
                        <IconButton
                          icon="trash"
                          label="Supprimer"
                          size={14}
                          onClick={() => dispatch({ type: 'plan/remove', payload: task.id })}
                        />
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </Card>

          <div className="space-y-3">
            <Card>
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted">
                Objectif du jour
              </p>
              <p className="mt-1 text-2xl font-extrabold text-ink">{formatMinutes(planned)}</p>
              <ProgressBar
                value={tasks.length === 0 ? 0 : (done.length / tasks.length) * 100}
                className="mt-2"
              />
              <p className="mt-1.5 text-[11px] text-muted">
                {done.length}/{tasks.length} tâche{tasks.length > 1 ? 's' : ''} terminée
                {done.length > 1 ? 's' : ''}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">
                <div>
                  <p className="text-[10.5px] uppercase tracking-wide text-muted">Temps prévu</p>
                  <p className="text-sm font-bold text-ink">{formatMinutes(planned)}</p>
                </div>
                <div>
                  <p className="text-[10.5px] uppercase tracking-wide text-muted">Temps réalisé</p>
                  <p className="text-sm font-bold text-primary">{formatMinutes(realise)}</p>
                </div>
              </div>
            </Card>

            <Card className="border-primary/25 bg-primary-soft/40">
              <p className="text-[11px] font-bold uppercase tracking-wide text-primary-ink">
                Comment c’est calculé
              </p>
              <ul className="mt-1.5 space-y-1 text-[11px] leading-relaxed text-ink-soft">
                <li>• tes notes et ta note visée</li>
                <li>• les contrôles et devoirs à venir</li>
                <li>• ta maîtrise de chaque chapitre</li>
                <li>• tes erreurs non corrigées</li>
                <li>• le temps dont tu disposes</li>
              </ul>
            </Card>

            <Link
              to="/concentration"
              className="card flex items-center gap-2.5 p-3 transition hover:border-primary/40"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                <Icon name="timer" size={17} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-ink">Mode concentration</span>
                <span className="block text-[11px] text-muted">Pomodoro et minuteur</span>
              </span>
            </Link>
          </div>
        </div>
      )}

      {view === 'semaine' && <WeekView from={date} />}
      {view === 'mois' && <MonthView from={date} />}

      <AddTaskModal date={date} open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  )
}

function WeekView({ from }: { from: string }) {
  const { state, dispatch } = useStore()
  const days = weekDays(from)

  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {days.map((day) => {
        const tasks = planFor(state, day)
        const budget = dailyBudget(state, day)
        const done = tasks.filter((task) => task.fait).length
        return (
          <Card key={day} className={day === todayISO() ? 'border-primary/40' : undefined}>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-ink">{JOURS_COURTS[isoWeekday(day) - 1]}</p>
                <p className="text-[11px] text-muted">{formatLong(day).split(' ').slice(1).join(' ')}</p>
              </div>
              {budget > 0 ? (
                <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10.5px] font-bold text-primary-ink">
                  {formatMinutes(budget)}
                </span>
              ) : (
                <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10.5px] font-semibold text-muted">
                  repos
                </span>
              )}
            </div>

            {tasks.length === 0 ? (
              <button
                onClick={() =>
                  dispatch({ type: 'plan/set', payload: { date: day, tasks: generatePlan(state, day, true) } })
                }
                className="w-full rounded-xl border border-dashed border-line-strong py-3 text-[11px] font-semibold text-muted transition hover:border-primary hover:text-primary"
              >
                {budget > 0 ? 'Générer le programme' : 'Rien de prévu'}
              </button>
            ) : (
              <>
                <ul className="space-y-1.5">
                  {tasks.map((task) => {
                    const subject = state.subjects.find((s) => s.id === task.subjectId)
                    return (
                      <li key={task.id} data-tone={subject?.tone} className="flex items-center gap-2">
                        <button
                          onClick={() => dispatch({ type: 'plan/toggle', payload: task.id })}
                          aria-label="Cocher"
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                            task.fait
                              ? 'border-transparent bg-[var(--tone)] text-white'
                              : 'border-line-strong text-transparent'
                          }`}
                        >
                          <Icon name="check" size={10} />
                        </button>
                        <span
                          className={`min-w-0 flex-1 truncate text-[11.5px] ${
                            task.fait ? 'text-muted line-through' : 'text-ink-soft'
                          }`}
                        >
                          {task.titre}
                        </span>
                        <span className="shrink-0 text-[10px] text-muted">{task.minutes}′</span>
                      </li>
                    )
                  })}
                </ul>
                <ProgressBar
                  value={(done / tasks.length) * 100}
                  className="mt-2"
                  height={5}
                />
              </>
            )}
          </Card>
        )
      })}
    </div>
  )
}

function MonthView({ from }: { from: string }) {
  const { state } = useStore()
  const days = Array.from({ length: 28 }, (_, i) => addDays(from, i - 7))

  return (
    <Card>
      <SectionTitle
        icon="calendar"
        title="Vue d’ensemble sur 4 semaines"
        subtitle="Chaque case indique le temps de révision réalisé ce jour-là."
      />
      <div className="grid grid-cols-7 gap-1.5">
        {JOURS_COURTS.map((label) => (
          <div key={label} className="pb-1 text-center text-[10px] font-bold text-muted">
            {label.slice(0, 1)}
          </div>
        ))}
        {days.map((day) => {
          const minutes = minutesOn(state, day)
          const goal = state.settings.objectifQuotidien
          const ratio = goal > 0 ? Math.min(1, minutes / goal) : 0
          const isToday = day === todayISO()
          return (
            <div
              key={day}
              title={`${formatLong(day)} — ${formatMinutes(minutes)}`}
              className={`flex aspect-square flex-col items-center justify-center rounded-lg text-[10px] font-bold transition ${
                isToday ? 'ring-2 ring-primary' : ''
              }`}
              style={{
                background:
                  minutes === 0
                    ? 'var(--app-surface-2)'
                    : `color-mix(in srgb, var(--app-primary) ${18 + ratio * 70}%, var(--app-surface))`,
                color: ratio > 0.5 ? 'white' : 'var(--app-ink-soft)',
              }}
            >
              {Number(day.slice(8))}
            </div>
          )
        })}
      </div>
      <p className="mt-3 text-[11px] text-muted">
        Plus la case est foncée, plus tu as travaillé ce jour-là.
      </p>
    </Card>
  )
}

function AddTaskModal({
  date,
  open,
  onClose,
}: {
  date: string
  open: boolean
  onClose: () => void
}) {
  const { state, dispatch } = useStore()
  const [subjectId, setSubjectId] = useState(state.subjects[0]?.id ?? '')
  const [chapterId, setChapterId] = useState('')
  const [kind, setKind] = useState<PlanKind>('libre')
  const [minutes, setMinutes] = useState(20)
  const [titre, setTitre] = useState('')

  const chapters = state.chapters.filter((c) => c.subjectId === subjectId)

  const save = () => {
    const chapter = chapters.find((c) => c.id === chapterId)
    const label =
      titre.trim() ||
      `${KIND_OPTIONS.find((option) => option.value === kind)?.label}${chapter ? ` — ${chapter.title}` : ''}`
    dispatch({
      type: 'plan/add',
      payload: {
        id: uid('task'),
        date,
        subjectId,
        chapterId: chapterId || undefined,
        titre: label,
        minutes,
        kind,
        raison: 'ajouté par moi',
        fait: false,
        auto: false,
      },
    })
    setTitre('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Ajouter une tâche"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button icon="check" onClick={save}>
            Ajouter
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <label className="block">
          <Label>Matière</Label>
          <Select
            value={subjectId}
            onChange={(e) => {
              setSubjectId(e.target.value)
              setChapterId('')
            }}
          >
            {state.subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.emoji} {subject.name}
              </option>
            ))}
          </Select>
        </label>
        <label className="block">
          <Label hint="(facultatif)">Chapitre</Label>
          <Select value={chapterId} onChange={(e) => setChapterId(e.target.value)}>
            <option value="">Aucun chapitre précis</option>
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.title}
              </option>
            ))}
          </Select>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <Label>Type</Label>
            <Select value={kind} onChange={(e) => setKind(e.target.value as PlanKind)}>
              {KIND_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </label>
          <label className="block">
            <Label>Durée (min)</Label>
            <Input
              type="number"
              min={5}
              step={5}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
          </label>
        </div>
        <label className="block">
          <Label hint="(facultatif)">Intitulé</Label>
          <Input
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Laisser vide pour un intitulé automatique"
          />
        </label>
      </div>
    </Modal>
  )
}
