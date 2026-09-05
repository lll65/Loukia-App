import { useRef, useState } from 'react'
import { JOURS_COURTS } from '../lib/dates'
import { cx, formatMinutes } from '../lib/utils'
import type { ThemeChoice } from '../store/types'
import { useStore } from '../store/StoreContext'
import { exportState, readStateFile } from '../store/persistence'
import { withDemoData } from '../content/demo'
import { buildInitialState } from '../content'
import {
  Button,
  Card,
  Input,
  Label,
  SectionTitle,
  Toggle,
} from '../components/ui/primitives'
import { ConfirmDialog } from '../components/ui/Modal'
import { PageHeader } from '../components/common'
import { Icon } from '../components/ui/Icon'

export function Parametres() {
  const { state, dispatch, replace, reset } = useStore()
  const fileInput = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<{ kind: 'ok' | 'ko'; text: string } | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const [confirmDemo, setConfirmDemo] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)

  const settings = state.settings
  const patch = (values: Partial<typeof settings>) =>
    dispatch({ type: 'settings/patch', payload: values })

  const toggleDay = (day: number) => {
    const days = settings.joursRevision.includes(day)
      ? settings.joursRevision.filter((value) => value !== day)
      : [...settings.joursRevision, day].sort((a, b) => a - b)
    patch({ joursRevision: days })
  }

  const importFile = async (file: File) => {
    try {
      const next = await readStateFile(file)
      replace(next)
      setMessage({ kind: 'ok', text: 'Sauvegarde restaurée avec succès.' })
    } catch (error) {
      setMessage({
        kind: 'ko',
        text: error instanceof Error ? error.message : 'Impossible de lire ce fichier.',
      })
    }
    window.setTimeout(() => setMessage(null), 5000)
  }

  return (
    <div>
      <PageHeader
        icon="settings"
        title="Paramètres"
        subtitle="Tout se règle ici : ton profil, ton rythme de travail, l’apparence et tes sauvegardes."
      />

      {message && (
        <div
          className={cx(
            'animate-rise mb-3 flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm font-semibold',
            message.kind === 'ok'
              ? 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400'
              : 'bg-rose-500/12 text-rose-500',
          )}
        >
          <Icon name={message.kind === 'ok' ? 'check' : 'alert'} size={16} />
          {message.text}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionTitle icon="users" title="Mon profil" />
          <div className="space-y-3">
            <label className="block">
              <Label>Prénom</Label>
              <Input value={settings.prenom} onChange={(e) => patch({ prenom: e.target.value })} />
            </label>
            <label className="block">
              <Label>Classe</Label>
              <Input
                value={settings.classe}
                onChange={(e) => patch({ classe: e.target.value })}
                placeholder="Ex. 3ᵉ B"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <Label>Note visée</Label>
                <Input
                  type="number"
                  min={0}
                  max={20}
                  step={0.5}
                  value={settings.noteVisee}
                  onChange={(e) => patch({ noteVisee: Number(e.target.value) })}
                />
              </label>
              <label className="block">
                <Label>Date objectif</Label>
                <Input
                  type="date"
                  value={settings.dateObjectif}
                  onChange={(e) => patch({ dateObjectif: e.target.value })}
                />
              </label>
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle icon="clock" title="Mon rythme de travail" />
          <div className="space-y-3">
            <div>
              <Label hint={formatMinutes(settings.tempsParJour)}>Temps disponible par jour</Label>
              <input
                type="range"
                min={15}
                max={240}
                step={15}
                value={settings.tempsParJour}
                onChange={(e) => patch({ tempsParJour: Number(e.target.value) })}
                className="w-full accent-[var(--app-primary)]"
                aria-label="Temps disponible par jour"
              />
            </div>
            <div>
              <Label hint={formatMinutes(settings.objectifQuotidien)}>Objectif quotidien</Label>
              <input
                type="range"
                min={15}
                max={240}
                step={15}
                value={settings.objectifQuotidien}
                onChange={(e) => patch({ objectifQuotidien: Number(e.target.value) })}
                className="w-full accent-[var(--app-primary)]"
                aria-label="Objectif quotidien"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <Label>Heure de début</Label>
                <Input
                  type="time"
                  value={settings.heureDebut}
                  onChange={(e) => patch({ heureDebut: e.target.value })}
                />
              </label>
              <label className="block">
                <Label>Heure de fin</Label>
                <Input
                  type="time"
                  value={settings.heureFin}
                  onChange={(e) => patch({ heureFin: e.target.value })}
                />
              </label>
            </div>
            <div>
              <Label>Jours de révision</Label>
              <div className="flex flex-wrap gap-1.5">
                {JOURS_COURTS.map((label, index) => {
                  const day = index + 1
                  const active = settings.joursRevision.includes(day)
                  return (
                    <button
                      key={label}
                      onClick={() => toggleDay(day)}
                      className={cx(
                        'rounded-xl px-3 py-1.5 text-xs font-semibold transition',
                        active ? 'bg-primary text-white' : 'bg-surface-2 text-muted',
                      )}
                    >
                      {label.replace('.', '')}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle icon="timer" title="Mode concentration" />
          <div className="grid grid-cols-3 gap-2">
            <label className="block">
              <Label>Travail</Label>
              <Input
                type="number"
                min={5}
                max={90}
                step={5}
                value={settings.pomodoroTravail}
                onChange={(e) => patch({ pomodoroTravail: Number(e.target.value) })}
              />
            </label>
            <label className="block">
              <Label>Pause</Label>
              <Input
                type="number"
                min={1}
                max={30}
                value={settings.pomodoroPause}
                onChange={(e) => patch({ pomodoroPause: Number(e.target.value) })}
              />
            </label>
            <label className="block">
              <Label>Grande pause</Label>
              <Input
                type="number"
                min={5}
                max={60}
                step={5}
                value={settings.pomodoroLongue}
                onChange={(e) => patch({ pomodoroLongue: Number(e.target.value) })}
              />
            </label>
          </div>
          <div className="mt-3 flex items-center gap-3 border-t border-line pt-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-ink">Signal sonore en fin de session</p>
            </div>
            <Toggle
              checked={settings.sonFin}
              label="Signal sonore"
              onChange={(value) => patch({ sonFin: value })}
            />
          </div>
          <div className="mt-3 flex items-center gap-3 border-t border-line pt-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-ink">Badges et objectifs</p>
              <p className="text-[11px] text-muted">Afficher la série et les récompenses</p>
            </div>
            <Toggle
              checked={settings.motivation}
              label="Motivation"
              onChange={(value) => patch({ motivation: value })}
            />
          </div>
        </Card>

        <Card>
          <SectionTitle icon="sun" title="Apparence" />
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { value: 'clair', label: 'Clair', icon: 'sun' },
                { value: 'sombre', label: 'Sombre', icon: 'moon' },
                { value: 'auto', label: 'Auto', icon: 'settings' },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                onClick={() => patch({ theme: option.value as ThemeChoice })}
                className={cx(
                  'flex flex-col items-center gap-1.5 rounded-2xl border px-3 py-3 text-xs font-semibold transition',
                  settings.theme === option.value
                    ? 'border-primary bg-primary-soft text-primary-ink'
                    : 'border-line bg-surface-2 text-muted',
                )}
              >
                <Icon name={option.icon} size={18} />
                {option.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-muted">
            En mode « Auto », l’application suit le réglage clair/sombre de ton téléphone.
          </p>
        </Card>

        <Card className="lg:col-span-2">
          <SectionTitle
            icon="save"
            title="Mes données"
            subtitle="Tout est enregistré sur cet appareil uniquement. Rien n’est envoyé sur Internet."
          />
          <div className="grid gap-2 sm:grid-cols-2">
            <Button variant="outline" icon="download" onClick={() => exportState(state)}>
              Exporter une sauvegarde
            </Button>
            <Button variant="outline" icon="upload" onClick={() => fileInput.current?.click()}>
              Restaurer une sauvegarde
            </Button>
            <input
              ref={fileInput}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) void importFile(file)
                e.target.value = ''
              }}
            />
            <Button variant="soft" icon="sparkle" onClick={() => setConfirmDemo(true)}>
              Charger des données d’exemple
            </Button>
            <Button variant="ghost" icon="trash" onClick={() => setConfirmClear(true)}>
              Effacer mes notes et sessions
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-line pt-4 sm:grid-cols-4">
            <Metric label="Matières" value={state.subjects.length} />
            <Metric label="Chapitres" value={state.chapters.length} />
            <Metric label="Questions" value={state.questions.length} />
            <Metric label="Notes" value={state.grades.length} />
          </div>

          <div className="mt-4 border-t border-line pt-4">
            <Button variant="danger" icon="rotate" onClick={() => setConfirmReset(true)}>
              Tout réinitialiser
            </Button>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
              Remet l’application dans son état d’origine : le contenu des cours est restauré, mais
              tes notes, ton emploi du temps et tes ajouts personnels sont perdus. Pense à exporter
              une sauvegarde avant.
            </p>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <SectionTitle icon="bulb" title="Installer l’application sur le téléphone" />
          <ol className="space-y-1.5 text-xs leading-relaxed text-ink-soft">
            <li>
              <strong className="text-ink">Sur iPhone :</strong> ouvre le site dans Safari, appuie sur
              le bouton Partager, puis « Sur l’écran d’accueil ».
            </li>
            <li>
              <strong className="text-ink">Sur Android :</strong> ouvre le site dans Chrome, appuie sur
              le menu ⋮, puis « Installer l’application ».
            </li>
          </ol>
          <p className="mt-2 text-[11px] text-muted">
            Une fois installée, l’application s’ouvre en plein écran et fonctionne même sans
            connexion.
          </p>
        </Card>
      </div>

      <ConfirmDialog
        open={confirmDemo}
        onClose={() => setConfirmDemo(false)}
        onConfirm={() => replace(withDemoData(buildInitialState()))}
        title="Charger les données d’exemple ?"
        message="Des notes, des sessions de révision et des rappels fictifs seront ajoutés pour te montrer à quoi ressemblent les statistiques. Cela remplace tes données actuelles."
        confirmLabel="Charger"
      />

      <ConfirmDialog
        open={confirmClear}
        onClose={() => setConfirmClear(false)}
        onConfirm={() => {
          for (const grade of state.grades) dispatch({ type: 'grade/remove', payload: grade.id })
          for (const session of state.sessions)
            dispatch({ type: 'session/remove', payload: session.id })
        }}
        title="Effacer les notes et les sessions ?"
        message="Tes notes et ton historique de temps de travail seront supprimés. Les cours, fiches, quiz et l’emploi du temps sont conservés."
        confirmLabel="Effacer"
      />

      <ConfirmDialog
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        onConfirm={() => reset()}
        title="Tout réinitialiser ?"
        message="L’application repartira de zéro, avec le contenu d’origine. Toutes tes données personnelles seront perdues définitivement."
        confirmLabel="Réinitialiser"
      />
    </div>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-surface-2 p-2.5 text-center">
      <p className="text-lg font-extrabold text-ink">{value}</p>
      <p className="text-[10.5px] text-muted">{label}</p>
    </div>
  )
}
