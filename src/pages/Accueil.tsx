import { Link } from 'react-router-dom'
import { formatLong, relativeLabel, todayISO } from '../lib/dates'
import { formatMinutes, round } from '../lib/utils'
import { useStore } from '../store/StoreContext'
import {
  badges,
  chapterOf,
  generalAverage,
  minutesOn,
  nextControl,
  streak,
  subjectOf,
  suggestion,
  upcomingReminders,
} from '../store/selectors'
import { usePlan } from '../hooks/usePlan'
import { Card, ProgressBar, SectionTitle, Button, EmptyState } from '../components/ui/primitives'
import { Icon } from '../components/ui/Icon'
import { ProgressRing } from '../components/charts'
import { SubjectChip } from '../components/common'

export function Accueil() {
  const { state, dispatch } = useStore()
  const today = todayISO()
  const { tasks, regenerate } = usePlan(today)
  const worked = minutesOn(state, today)
  const goal = state.settings.objectifQuotidien
  const serie = streak(state)
  const control = nextControl(state)
  const tip = suggestion(state)
  const average = generalAverage(state)
  const obtained = badges(state).filter((b) => b.obtenu).length
  const soon = upcomingReminders(state, 10)

  const planned = tasks.reduce((acc, task) => acc + task.minutes, 0)
  const done = tasks.filter((task) => task.fait)

  return (
    <div className="space-y-4">
      {/* Bandeau du jour */}
      <Card className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, var(--app-primary), transparent 70%)' }}
        />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {formatLong(today)}
            </p>
            <h1 className="mt-1 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
              Bonjour {state.settings.prenom} !
            </h1>
            <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted">
              {tasks.length === 0
                ? "Aucune tâche prévue aujourd'hui. Profites-en, ou lance une révision libre."
                : `${done.length} tâche${done.length > 1 ? 's' : ''} terminée${done.length > 1 ? 's' : ''} sur ${tasks.length} — ${formatMinutes(planned)} prévues.`}
            </p>
          </div>
          <ProgressRing
            value={goal > 0 ? (worked / goal) * 100 : 0}
            size={86}
            thickness={9}
            label={formatMinutes(worked)}
            sublabel={`objectif ${formatMinutes(goal)}`}
          />
        </div>

        <div className="relative mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <MiniStat icon="clock" label="Aujourd’hui" value={formatMinutes(worked)} />
          <MiniStat icon="flame" label="Ma série" value={`${serie} j`} accent={serie >= 3} />
          <MiniStat
            icon="chart"
            label="Moyenne"
            value={average === null ? '—' : `${round(average, 1).toString().replace('.', ',')}`}
          />
          <MiniStat icon="award" label="Objectifs" value={`${obtained}/8`} />
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* À faire aujourd'hui */}
        <Card className="lg:col-span-2">
          <SectionTitle
            icon="list"
            title="À faire aujourd’hui"
            subtitle="Généré à partir de tes notes, tes contrôles et ta maîtrise"
            action={
              <Button variant="ghost" size="sm" icon="refresh" onClick={regenerate}>
                Regénérer
              </Button>
            }
          />
          {tasks.length === 0 ? (
            <EmptyState
              icon="sparkle"
              title="Rien de prévu"
              text="Ce jour n’est pas coché comme jour de révision dans tes paramètres. Tu peux quand même générer un programme si tu veux avancer."
              action={
                <Button variant="soft" size="sm" icon="target" onClick={regenerate}>
                  Créer mon programme
                </Button>
              }
            />
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => {
                const subject = subjectOf(state, task.subjectId)
                const chapter = task.chapterId ? chapterOf(state, task.chapterId) : undefined
                return (
                  <li
                    key={task.id}
                    data-tone={subject?.tone}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-surface-2 p-2.5"
                  >
                    <button
                      onClick={() => dispatch({ type: 'plan/toggle', payload: task.id })}
                      aria-label={task.fait ? 'Marquer comme à faire' : 'Marquer comme fait'}
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
                        className={`truncate text-sm font-semibold ${task.fait ? 'text-muted line-through' : 'text-ink'}`}
                      >
                        {task.titre}
                      </p>
                      <p className="truncate text-[11px] text-muted">
                        {subject?.name} · {task.raison}
                      </p>
                    </div>
                    <span className="shrink-0 text-[11px] font-bold text-[var(--tone-fg)]">
                      {task.minutes} min
                    </span>
                    {chapter && (
                      <Link
                        to={`/chapitre/${chapter.id}`}
                        aria-label={`Ouvrir ${chapter.title}`}
                        className="shrink-0 text-muted transition hover:text-primary"
                      >
                        <Icon name="chevronRight" size={16} />
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          )}

          {tasks.length > 0 && (
            <div className="mt-3 flex items-center gap-3 border-t border-line pt-3">
              <ProgressBar
                value={tasks.length === 0 ? 0 : (done.length / tasks.length) * 100}
                className="flex-1"
              />
              <span className="text-xs font-bold text-primary">
                {Math.round((done.length / tasks.length) * 100)} %
              </span>
              <Link
                to="/concentration"
                className="inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-white"
              >
                <Icon name="play" size={13} />
                Démarrer
              </Link>
            </div>
          )}
        </Card>

        <div className="space-y-4">
          {/* Suggestion */}
          <Card className="border-primary/25 bg-primary-soft/50">
            <div className="flex items-start gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                <Icon name="bulb" size={17} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-primary-ink">{tip.titre}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">{tip.texte}</p>
                {tip.chapterId && (
                  <Link
                    to={`/chapitre/${tip.chapterId}`}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary"
                  >
                    Ouvrir le chapitre
                    <Icon name="chevronRight" size={13} />
                  </Link>
                )}
              </div>
            </div>
          </Card>

          {/* Prochain contrôle */}
          <Card>
            <SectionTitle icon="bell" title="Ce qui arrive" />
            {soon.length === 0 ? (
              <p className="text-xs text-muted">
                Aucun contrôle ni devoir enregistré.{' '}
                <Link to="/rappels" className="font-semibold text-primary">
                  En ajouter un
                </Link>
                .
              </p>
            ) : (
              <ul className="space-y-2">
                {soon.slice(0, 4).map((reminder) => {
                  const subject = reminder.subjectId ? subjectOf(state, reminder.subjectId) : undefined
                  return (
                    <li key={reminder.id} className="flex items-center gap-2.5">
                      <span
                        className={`h-8 w-1 shrink-0 rounded-full ${
                          reminder.kind === 'controle' ? 'bg-accent' : 'bg-primary'
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-ink">{reminder.titre}</p>
                        <p className="text-[11px] text-muted">
                          {relativeLabel(reminder.date)}
                          {reminder.heure ? ` · ${reminder.heure}` : ''}
                        </p>
                      </div>
                      {subject && <SubjectChip subject={subject} />}
                    </li>
                  )
                })}
              </ul>
            )}
            {control && (
              <div className="mt-3 rounded-2xl border border-accent/30 bg-accent-soft p-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-accent">
                  Prochain contrôle
                </p>
                <p className="mt-0.5 text-sm font-bold text-ink">{control.titre}</p>
                <p className="text-[11px] text-ink-soft">{relativeLabel(control.date)}</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Accès rapides */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <QuickLink to="/matieres" icon="book" title="Mes cours" text="Chapitres et fiches" />
        <QuickLink to="/quiz" icon="quiz" title="Un quiz" text="Se tester en 5 min" />
        <QuickLink to="/concentration" icon="timer" title="Concentration" text="Pomodoro" />
        <QuickLink to="/statistiques" icon="chart" title="Mes progrès" text="Temps et moyennes" />
      </div>
    </div>
  )
}

function MiniStat({
  icon,
  label,
  value,
  accent,
}: {
  icon: 'clock' | 'flame' | 'chart' | 'award'
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface-2 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-muted">
        <Icon name={icon} size={12} />
        <span className="truncate">{label}</span>
      </div>
      <p className={`mt-0.5 text-base font-extrabold ${accent ? 'text-orange-500' : 'text-ink'}`}>
        {value}
      </p>
    </div>
  )
}

function QuickLink({
  to,
  icon,
  title,
  text,
}: {
  to: string
  icon: 'book' | 'quiz' | 'timer' | 'chart'
  title: string
  text: string
}) {
  return (
    <Link
      to={to}
      className="card flex items-center gap-2.5 p-3 transition hover:border-primary/40 hover:shadow-md"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-ink">
        <Icon name={icon} size={17} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold text-ink">{title}</span>
        <span className="block truncate text-[11px] text-muted">{text}</span>
      </span>
    </Link>
  )
}
