import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { addDays, JOURS_COURTS, isoWeekday, lastNDays, todayISO } from '../lib/dates'
import { formatMinutes, round, sum } from '../lib/utils'
import { toneColor } from '../lib/tones'
import { useStore } from '../store/StoreContext'
import {
  averageTimeline,
  badges,
  chaptersToReview,
  dailyMinutes,
  generalAverage,
  MASTERY_COLOR,
  masteryStatus,
  minutesBetween,
  minutesBySubject,
  streak,
} from '../store/selectors'
import { Card, EmptyState, SectionTitle } from '../components/ui/primitives'
import { BarChart, DonutChart, LineChart, ProgressRing } from '../components/charts'
import { PageHeader, Segmented, SubjectAvatar } from '../components/common'
import { Icon } from '../components/ui/Icon'

export function Statistiques() {
  const { state } = useStore()
  const [range, setRange] = useState<'semaine' | 'mois' | 'trimestre'>('semaine')
  const days = range === 'semaine' ? 7 : range === 'mois' ? 30 : 90

  const today = todayISO()
  const daily = useMemo(() => dailyMinutes(state, days), [state, days])
  const total = sum(daily.map((entry) => entry.minutes))
  const bySubject = useMemo(() => minutesBySubject(state, days), [state, days])
  const timeline = useMemo(() => averageTimeline(state), [state])
  const average = generalAverage(state)
  const serie = streak(state)
  const obtained = badges(state).filter((b) => b.obtenu)

  const previousTotal = minutesBetween(state, addDays(today, -2 * days + 1), addDays(today, -days))
  const evolution = previousTotal === 0 ? null : ((total - previousTotal) / previousTotal) * 100

  const toReview = useMemo(() => chaptersToReview(state, 6), [state])

  const bars = daily.map((entry) => ({
    label: days <= 7 ? JOURS_COURTS[isoWeekday(entry.date) - 1].slice(0, 3) : entry.date.slice(8),
    value: entry.minutes,
    color: entry.date === today ? 'var(--app-accent)' : 'var(--app-primary)',
  }))

  return (
    <div>
      <PageHeader
        icon="chart"
        title="Mes statistiques et progrès"
        subtitle="Temps de travail, répartition par matière, évolution de la moyenne et chapitres à revoir."
      />

      <div className="mb-3">
        <Segmented
          value={range}
          onChange={setRange}
          options={[
            { value: 'semaine', label: 'Cette semaine' },
            { value: 'mois', label: '30 jours' },
            { value: 'trimestre', label: '90 jours' },
          ]}
        />
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle
            icon="clock"
            title="Temps de travail"
            subtitle={`${formatMinutes(total)} sur la période`}
            action={
              evolution !== null && (
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ${
                    evolution >= 0
                      ? 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/12 text-rose-500'
                  }`}
                >
                  <Icon name={evolution >= 0 ? 'arrowUp' : 'arrowDown'} size={12} />
                  {Math.abs(Math.round(evolution))} %
                </span>
              )
            }
          />
          {total === 0 ? (
            <EmptyState
              icon="timer"
              title="Aucune session enregistrée"
              text="Lance le mode concentration ou fais un quiz : ton temps de travail se remplira tout seul."
            />
          ) : (
            <BarChart bars={bars.slice(-Math.min(days, 31))} height={170} />
          )}
        </Card>

        <div className="space-y-3">
          <Card className="flex items-center gap-4">
            <ProgressRing
              value={state.settings.objectifQuotidien > 0
                ? (daily[daily.length - 1].minutes / state.settings.objectifQuotidien) * 100
                : 0}
              size={72}
              thickness={8}
              label={formatMinutes(daily[daily.length - 1].minutes)}
            />
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Aujourd’hui</p>
              <p className="text-sm text-ink-soft">
                Objectif : {formatMinutes(state.settings.objectifQuotidien)}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs font-bold text-orange-500">
                <Icon name="flame" size={13} />
                Série de {serie} jour{serie > 1 ? 's' : ''}
              </p>
            </div>
          </Card>

          <Card>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Moyenne générale</p>
            <p className="mt-0.5 text-2xl font-extrabold text-ink">
              {average === null ? '—' : round(average, 2).toString().replace('.', ',')}
              <span className="text-sm font-bold text-muted">/20</span>
            </p>
            <p className="mt-0.5 text-[11px] text-muted">
              Note visée : {state.settings.noteVisee}/20
            </p>
          </Card>

          <Card>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Objectifs atteints</p>
            <p className="mt-0.5 text-2xl font-extrabold text-ink">
              {obtained.length}
              <span className="text-sm font-bold text-muted">/8</span>
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {obtained.slice(0, 8).map((badge) => (
                <span key={badge.id} title={badge.titre} className="text-base">
                  {badge.emoji}
                </span>
              ))}
            </div>
            <Link to="/badges" className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-primary">
              Voir tous mes objectifs
              <Icon name="chevronRight" size={12} />
            </Link>
          </Card>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionTitle icon="grid" title="Répartition par matière" subtitle="Sur la période choisie" />
          {bySubject.length === 0 ? (
            <p className="text-xs text-muted">Pas encore de temps enregistré par matière.</p>
          ) : (
            <div className="flex flex-wrap items-center gap-5">
              <DonutChart
                slices={bySubject.map((entry) => ({
                  label: entry.subject.name,
                  value: entry.minutes,
                  color: toneColor(entry.subject.tone),
                }))}
                center={{ top: formatMinutes(sum(bySubject.map((e) => e.minutes))), bottom: 'au total' }}
              />
              <ul className="min-w-0 flex-1 space-y-1.5">
                {bySubject.slice(0, 7).map((entry) => {
                  const percent = Math.round(
                    (entry.minutes / sum(bySubject.map((e) => e.minutes))) * 100,
                  )
                  return (
                    <li key={entry.subject.id} className="flex items-center gap-2 text-xs">
                      <SubjectAvatar subject={entry.subject} size={22} />
                      <span className="min-w-0 flex-1 truncate text-ink-soft">
                        {entry.subject.name}
                      </span>
                      <span className="shrink-0 font-bold text-ink">{percent} %</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </Card>

        <Card>
          <SectionTitle icon="chart" title="Évolution de ma moyenne" />
          {timeline.length < 2 ? (
            <p className="text-xs text-muted">
              Ajoute au moins deux mois de notes pour voir la courbe apparaître.
            </p>
          ) : (
            <LineChart points={timeline} target={state.settings.noteVisee} suffix="/20" height={150} />
          )}
        </Card>
      </div>

      <Card className="mt-4">
        <SectionTitle
          icon="alert"
          title="Chapitres à revoir en priorité"
          subtitle="Les moins solides d’après tes quiz et ton auto-évaluation"
        />
        {toReview.length === 0 ? (
          <p className="text-xs text-muted">
            Tous tes chapitres sont à plus de 60 % de maîtrise. Beau travail !
          </p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {toReview.map((chapter) => {
              const subject = state.subjects.find((s) => s.id === chapter.subjectId)
              const color = MASTERY_COLOR[masteryStatus(chapter.mastery)]
              return (
                <Link
                  key={chapter.id}
                  to={`/chapitre/${chapter.id}`}
                  className="flex items-center gap-2.5 rounded-2xl border border-line bg-surface-2 p-2.5 transition hover:border-primary/40"
                >
                  {subject && <SubjectAvatar subject={subject} size={30} />}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold text-ink">
                      {chapter.title}
                    </span>
                    <span className="block truncate text-[11px] text-muted">{subject?.name}</span>
                  </span>
                  <span className="shrink-0 text-xs font-bold" style={{ color }}>
                    {chapter.mastery} %
                  </span>
                </Link>
              )
            })}
          </div>
        )}
      </Card>

      {total > 0 && (
        <Card className="mt-4 border-primary/25 bg-primary-soft/40">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <Icon name="sparkle" size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-primary-ink">
                {evolution !== null && evolution > 5
                  ? 'Tu progresses, continue comme ça !'
                  : serie >= 3
                    ? `${serie} jours d’affilée : la régularité, c’est ce qui paie le plus.`
                    : 'Chaque session compte, même 20 minutes.'}
              </p>
              <p className="mt-0.5 text-[11px] text-ink-soft">
                Moyenne de {formatMinutes(Math.round(total / lastNDays(days).length))} par jour sur la
                période.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
