import { useState } from 'react'
import { JOURS_COURTS } from '../lib/dates'
import { cx, formatMinutes } from '../lib/utils'
import { useStore } from '../store/StoreContext'
import { withDemoData } from '../content/demo'
import { Button, Input, Label, ProgressBar } from '../components/ui/primitives'
import { Icon } from '../components/ui/Icon'

/** Écran affiché au tout premier lancement, pour personnaliser l'application. */
export function Bienvenue({ onDone }: { onDone: () => void }) {
  const { state, dispatch, replace } = useStore()
  const [step, setStep] = useState(0)
  const settings = state.settings
  const patch = (values: Partial<typeof settings>) =>
    dispatch({ type: 'settings/patch', payload: values })

  const toggleDay = (day: number) => {
    const days = settings.joursRevision.includes(day)
      ? settings.joursRevision.filter((value) => value !== day)
      : [...settings.joursRevision, day].sort((a, b) => a - b)
    patch({ joursRevision: days })
  }

  const steps = [
    {
      title: 'Bienvenue !',
      subtitle: 'Une application de révision entièrement à toi. Commençons par faire connaissance.',
      content: (
        <div className="space-y-3">
          <label className="block">
            <Label>Comment tu t’appelles ?</Label>
            <Input
              value={settings.prenom}
              onChange={(e) => patch({ prenom: e.target.value })}
              placeholder="Ton prénom"
              autoFocus
            />
          </label>
          <label className="block">
            <Label>Tu es en quelle classe ?</Label>
            <Input
              value={settings.classe}
              onChange={(e) => patch({ classe: e.target.value })}
              placeholder="Ex. 3ᵉ B"
            />
          </label>
          <p className="rounded-2xl bg-surface-2 p-3 text-[11.5px] leading-relaxed text-muted">
            Les matières et les chapitres du programme de 3ᵉ sont déjà chargés, avec des cours, des
            fiches, des quiz et des exercices corrigés. Tu peux tout modifier, supprimer ou compléter.
          </p>
        </div>
      ),
    },
    {
      title: 'Quelle moyenne veux-tu atteindre ?',
      subtitle: 'C’est ton objectif de l’année. L’application adaptera ton programme pour y arriver.',
      content: (
        <div>
          <div className="text-center">
            <span className="text-6xl font-extrabold tracking-tight text-ink">
              {settings.noteVisee.toString().replace('.', ',')}
            </span>
            <span className="text-2xl font-bold text-muted">/20</span>
          </div>
          <input
            type="range"
            min={8}
            max={20}
            step={0.5}
            value={settings.noteVisee}
            onChange={(e) => patch({ noteVisee: Number(e.target.value) })}
            className="mt-5 w-full accent-[var(--app-accent)]"
            aria-label="Note visée"
          />
          <div className="flex justify-between text-[10px] text-muted">
            <span>8</span>
            <span>14</span>
            <span>20</span>
          </div>
          <p className="mt-4 rounded-2xl bg-accent-soft p-3 text-[11.5px] leading-relaxed text-ink-soft">
            Tu pourras la changer à tout moment. L’important, c’est de viser un peu au-dessus de ta
            moyenne actuelle, pas d’aller chercher l’impossible.
          </p>
        </div>
      ),
    },
    {
      title: 'Combien de temps par jour ?',
      subtitle: 'Sois honnête : un programme réaliste est un programme qu’on tient.',
      content: (
        <div className="space-y-4">
          <div>
            <Label hint={formatMinutes(settings.tempsParJour)}>Temps de révision par jour</Label>
            <input
              type="range"
              min={15}
              max={180}
              step={15}
              value={settings.tempsParJour}
              onChange={(e) =>
                patch({
                  tempsParJour: Number(e.target.value),
                  objectifQuotidien: Number(e.target.value),
                })
              }
              className="w-full accent-[var(--app-primary)]"
              aria-label="Temps de révision par jour"
            />
          </div>
          <div>
            <Label>Quels jours ?</Label>
            <div className="flex flex-wrap gap-1.5">
              {JOURS_COURTS.map((label, index) => {
                const day = index + 1
                const active = settings.joursRevision.includes(day)
                return (
                  <button
                    key={label}
                    onClick={() => toggleDay(day)}
                    className={cx(
                      'rounded-xl px-3 py-2 text-xs font-semibold transition',
                      active ? 'bg-primary text-white' : 'bg-surface-2 text-muted',
                    )}
                  >
                    {label.replace('.', '')}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="rounded-2xl bg-surface-2 p-3">
            <p className="text-[11.5px] leading-relaxed text-muted">
              Soit environ{' '}
              <strong className="text-ink">
                {formatMinutes(settings.tempsParJour * settings.joursRevision.length)}
              </strong>{' '}
              par semaine. C’est ce budget que l’application répartira entre tes matières.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Tout est prêt !',
      subtitle: 'Dernière question : veux-tu voir l’application avec des exemples, ou partir de zéro ?',
      content: (
        <div className="space-y-2.5">
          <button
            onClick={() => {
              replace(withDemoData(state))
              onDone()
            }}
            className="flex w-full items-start gap-3 rounded-2xl border border-line bg-surface-2 p-3.5 text-left transition hover:border-primary"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-ink">
              <Icon name="sparkle" size={17} />
            </span>
            <span>
              <span className="block text-sm font-bold text-ink">Avec des exemples</span>
              <span className="mt-0.5 block text-[11.5px] leading-relaxed text-muted">
                Des notes, des rappels et un historique fictifs pour découvrir les statistiques et le
                programme. Tout est effaçable en un clic depuis les paramètres.
              </span>
            </span>
          </button>
          <button
            onClick={onDone}
            className="flex w-full items-start gap-3 rounded-2xl border border-line bg-surface-2 p-3.5 text-left transition hover:border-primary"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-ink">
              <Icon name="home" size={17} />
            </span>
            <span>
              <span className="block text-sm font-bold text-ink">Partir de zéro</span>
              <span className="mt-0.5 block text-[11.5px] leading-relaxed text-muted">
                Les cours, fiches et quiz sont là, mais aucune note ni session : à toi de remplir.
              </span>
            </span>
          </button>
        </div>
      ),
    },
  ]

  const current = steps[step]
  const last = step === steps.length - 1

  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg px-4 py-8">
      <div className="card w-full max-w-md p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
            <Icon name="book2" size={19} />
          </span>
          <div className="min-w-0 flex-1">
            <ProgressBar value={((step + 1) / steps.length) * 100} height={5} />
            <p className="mt-1 text-[10.5px] text-muted">
              Étape {step + 1} sur {steps.length}
            </p>
          </div>
        </div>

        <h1 className="text-xl font-extrabold tracking-tight text-ink">{current.title}</h1>
        <p className="mt-1 text-xs leading-relaxed text-muted">{current.subtitle}</p>

        <div className="mt-5">{current.content}</div>

        <div className="mt-6 flex items-center gap-2">
          {step > 0 && (
            <Button variant="ghost" icon="arrowLeft" onClick={() => setStep(step - 1)}>
              Retour
            </Button>
          )}
          {!last && (
            <Button className="ml-auto" iconRight="chevronRight" onClick={() => setStep(step + 1)}>
              Continuer
            </Button>
          )}
          {last && (
            <button onClick={onDone} className="ml-auto text-xs font-semibold text-muted">
              Passer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
