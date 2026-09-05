import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatLong } from '../lib/dates'
import { round } from '../lib/utils'
import { useStore } from '../store/StoreContext'
import {
  averageTimeline,
  daysUntilObjective,
  effortNeeded,
  generalAverage,
  projectedAverage,
  subjectAverage,
} from '../store/selectors'
import { Button, Card, Input, Label, ProgressBar, SectionTitle } from '../components/ui/primitives'
import { LineChart } from '../components/charts'
import { PageHeader, SubjectAvatar } from '../components/common'
import { Icon } from '../components/ui/Icon'

export function Objectif() {
  const { state, dispatch } = useStore()
  const [editing, setEditing] = useState(false)
  const average = generalAverage(state)
  const target = state.settings.noteVisee
  const gap = effortNeeded(state)
  const projection = projectedAverage(state)
  const timeline = averageTimeline(state)
  const remaining = daysUntilObjective(state)

  const weak = state.subjects
    .map((subject) => ({ subject, average: subjectAverage(state, subject.id) }))
    .filter((row): row is { subject: (typeof state.subjects)[number]; average: number } => row.average !== null)
    .filter((row) => row.average < target)
    .sort((a, b) => a.average - b.average)
    .slice(0, 5)

  return (
    <div>
      <PageHeader
        icon="target"
        title="Ma note visée"
        subtitle="Choisis la moyenne que tu veux atteindre : l’application adapte ton programme pour y arriver."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <Card className="relative overflow-hidden text-center">
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, var(--app-accent), transparent 70%)' }}
            />
            <p className="relative text-xs font-semibold uppercase tracking-wide text-muted">
              Quelle moyenne veux-tu atteindre cette année ?
            </p>
            {editing ? (
              <div className="relative mx-auto mt-3 max-w-[200px]">
                <Input
                  type="number"
                  min={0}
                  max={20}
                  step={0.5}
                  autoFocus
                  value={target}
                  onChange={(e) =>
                    dispatch({
                      type: 'settings/patch',
                      payload: { noteVisee: Math.min(20, Math.max(0, Number(e.target.value))) },
                    })
                  }
                  onBlur={() => setEditing(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
                  className="text-center text-3xl font-extrabold"
                />
              </div>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="relative mt-2 inline-flex items-center gap-2 text-5xl font-extrabold tracking-tight text-ink"
              >
                {target.toString().replace('.', ',')}
                <span className="text-2xl font-bold text-muted">/20</span>
                <Icon name="pencil" size={18} className="text-muted" />
              </button>
            )}

            <div className="relative mx-auto mt-4 max-w-md">
              <input
                type="range"
                min={8}
                max={20}
                step={0.5}
                value={target}
                onChange={(e) =>
                  dispatch({ type: 'settings/patch', payload: { noteVisee: Number(e.target.value) } })
                }
                className="w-full accent-[var(--app-accent)]"
                aria-label="Note visée"
              />
              <div className="flex justify-between text-[10px] text-muted">
                <span>8</span>
                <span>14</span>
                <span>20</span>
              </div>
            </div>

            <div className="relative mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <div className="rounded-2xl bg-surface-2 p-3">
                <p className="text-[10.5px] uppercase tracking-wide text-muted">Actuellement</p>
                <p className="text-lg font-extrabold text-ink">
                  {average === null ? '—' : round(average, 2).toString().replace('.', ',')}
                </p>
              </div>
              <div className="rounded-2xl bg-accent-soft p-3">
                <p className="text-[10.5px] uppercase tracking-wide text-accent">Écart</p>
                <p className="text-lg font-extrabold text-accent">
                  {gap === null ? '—' : `${gap > 0 ? '+' : ''}${round(gap, 2).toString().replace('.', ',')}`}
                </p>
              </div>
              <div className="col-span-2 rounded-2xl bg-surface-2 p-3 sm:col-span-1">
                <p className="text-[10.5px] uppercase tracking-wide text-muted">Estimation</p>
                <p className="text-lg font-extrabold text-primary">
                  {projection === null ? '—' : round(projection, 2).toString().replace('.', ',')}
                </p>
              </div>
            </div>

            {average !== null && (
              <div className="relative mt-4">
                <ProgressBar value={(average / target) * 100} height={10} color="var(--app-accent)" />
                <p className="mt-1.5 text-[11px] text-muted">
                  {gap !== null && gap <= 0
                    ? 'Objectif atteint — tu peux viser plus haut !'
                    : `Encore ${round(gap ?? 0, 2).toString().replace('.', ',')} point${(gap ?? 0) >= 2 ? 's' : ''} à gagner.`}
                </p>
              </div>
            )}
          </Card>

          {timeline.length > 1 && (
            <Card>
              <SectionTitle icon="chart" title="Où j’en suis" subtitle="Ma moyenne mois par mois" />
              <LineChart points={timeline} target={target} suffix="/20" height={150} />
            </Card>
          )}

          {weak.length > 0 && (
            <Card>
              <SectionTitle
                icon="alert"
                title="Les matières qui te font perdre des points"
                subtitle="Ce sont elles qui feront le plus bouger ta moyenne"
              />
              <ul className="space-y-2">
                {weak.map(({ subject, average: subjectAvg }) => (
                  <li key={subject.id} data-tone={subject.tone} className="flex items-center gap-3">
                    <SubjectAvatar subject={subject} size={32} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{subject.name}</p>
                      <ProgressBar
                        value={(subjectAvg / 20) * 100}
                        color="var(--tone)"
                        height={5}
                        className="mt-1"
                      />
                    </div>
                    <span className="shrink-0 text-sm font-bold text-[var(--tone-fg)]">
                      {round(subjectAvg, 1).toString().replace('.', ',')}
                    </span>
                    <Link
                      to={`/matieres/${subject.id}`}
                      aria-label={`Ouvrir ${subject.name}`}
                      className="shrink-0 text-muted transition hover:text-primary"
                    >
                      <Icon name="chevronRight" size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        <div className="space-y-3">
          <Card>
            <SectionTitle icon="calendar" title="Date objectif" />
            <label className="block">
              <Label>Fin de l’année scolaire</Label>
              <Input
                type="date"
                value={state.settings.dateObjectif}
                onChange={(e) =>
                  dispatch({ type: 'settings/patch', payload: { dateObjectif: e.target.value } })
                }
              />
            </label>
            <p className="mt-2 text-xs text-ink-soft">
              {remaining > 0 ? (
                <>
                  Il reste <strong className="text-ink">{remaining} jours</strong> — soit environ{' '}
                  <strong className="text-ink">
                    {Math.round((remaining / 7) * state.settings.joursRevision.length)} séances
                  </strong>{' '}
                  de révision possibles.
                </>
              ) : (
                'La date objectif est passée : choisis-en une nouvelle.'
              )}
            </p>
            <p className="mt-1 text-[11px] text-muted">{formatLong(state.settings.dateObjectif)}</p>
          </Card>

          <Card className="border-primary/25 bg-primary-soft/40">
            <SectionTitle icon="bulb" title="Comment gagner ces points" />
            <ul className="space-y-1.5 text-[11.5px] leading-relaxed text-ink-soft">
              <li>
                • Vise d’abord les matières à <strong>gros coefficient</strong> : un point gagné y
                compte double.
              </li>
              <li>
                • Corrige systématiquement tes erreurs : c’est le geste qui fait le plus progresser.
              </li>
              <li>• Mieux vaut 30 min tous les jours que 3 h le dimanche.</li>
              <li>• Refais un quiz une semaine après : c’est là que la mémoire se fixe.</li>
            </ul>
          </Card>

          <Button
            variant="outline"
            full
            icon="target"
            onClick={() =>
              dispatch({
                type: 'settings/patch',
                payload: { noteVisee: Math.min(20, Math.round(((average ?? 12) + 2) * 2) / 2) },
              })
            }
          >
            Proposer un objectif réaliste
          </Button>
          <p className="px-1 text-center text-[11px] text-muted">
            Deux points au-dessus de ta moyenne actuelle : ambitieux mais atteignable.
          </p>
        </div>
      </div>
    </div>
  )
}
