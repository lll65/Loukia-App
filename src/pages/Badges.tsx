import { formatMinutes, sum } from '../lib/utils'
import { useStore } from '../store/StoreContext'
import { badges, generalAverage, masteryStatus, streak } from '../store/selectors'
import { Card, ProgressBar, SectionTitle } from '../components/ui/primitives'
import { PageHeader } from '../components/common'
import { Icon } from '../components/ui/Icon'

export function Badges() {
  const { state } = useStore()
  const list = badges(state)
  const obtained = list.filter((badge) => badge.obtenu)
  const totalMinutes = sum(state.sessions.map((session) => session.minutes))
  const acquired = state.chapters.filter((c) => masteryStatus(c.mastery) === 'acquis').length
  const average = generalAverage(state)

  return (
    <div>
      <PageHeader
        icon="award"
        title="Mes objectifs"
        subtitle="Des petits caps à franchir pour garder la motivation sur toute l’année."
      />

      <Card className="mb-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">
              Objectifs débloqués
            </p>
            <p className="mt-0.5 text-3xl font-extrabold text-ink">
              {obtained.length}
              <span className="text-lg font-bold text-muted">/{list.length}</span>
            </p>
            <ProgressBar value={(obtained.length / list.length) * 100} className="mt-2" />
          </div>
          <div className="flex gap-4 text-center">
            <div>
              <p className="text-xl font-extrabold text-orange-500">{streak(state)}</p>
              <p className="text-[10.5px] text-muted">jours de suite</p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-primary">{formatMinutes(totalMinutes)}</p>
              <p className="text-[10.5px] text-muted">au total</p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-emerald-500">{acquired}</p>
              <p className="text-[10.5px] text-muted">chapitres acquis</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((badge) => (
          <Card
            key={badge.id}
            className={
              badge.obtenu
                ? 'border-primary/35 bg-primary-soft/40'
                : 'opacity-70'
            }
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-2xl ${
                  badge.obtenu ? 'bg-surface' : 'bg-surface-2 grayscale'
                }`}
              >
                {badge.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-bold text-ink">
                  {badge.titre}
                  {badge.obtenu && <Icon name="check" size={14} className="text-emerald-500" />}
                </p>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-muted">
                  {badge.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-4 border-accent/25 bg-accent-soft">
        <SectionTitle icon="target" title="Mon grand objectif" />
        <p className="text-2xl font-extrabold text-ink">
          {state.settings.noteVisee.toString().replace('.', ',')}
          <span className="text-base font-bold text-muted">/20 de moyenne</span>
        </p>
        {average !== null && (
          <>
            <ProgressBar
              value={(average / state.settings.noteVisee) * 100}
              color="var(--app-accent)"
              className="mt-2"
              height={10}
            />
            <p className="mt-1.5 text-[11px] text-ink-soft">
              Actuellement à {average.toFixed(2).replace('.', ',')}/20.
            </p>
          </>
        )}
      </Card>
    </div>
  )
}
