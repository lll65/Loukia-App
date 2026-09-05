import { useState } from 'react'
import { addDays, diffDays, formatLong, relativeLabel, todayISO } from '../lib/dates'
import { cx, uid } from '../lib/utils'
import type { Reminder, ReminderKind } from '../store/types'
import { useStore } from '../store/StoreContext'
import { lateReminders, upcomingReminders } from '../store/selectors'
import {
  Button,
  Card,
  EmptyState,
  IconButton,
  Input,
  Label,
  Select,
  SectionTitle,
  Textarea,
  Toggle,
} from '../components/ui/primitives'
import { Modal } from '../components/ui/Modal'
import { PageHeader, SubjectChip } from '../components/common'
import { Icon } from '../components/ui/Icon'

const KIND_LABEL: Record<ReminderKind, string> = {
  controle: 'Contrôle',
  devoir: 'Devoir',
  revision: 'Révision',
  autre: 'Autre',
}

const KIND_COLOR: Record<ReminderKind, string> = {
  controle: 'bg-accent',
  devoir: 'bg-primary',
  revision: 'bg-emerald-500',
  autre: 'bg-slate-400',
}

export function Rappels() {
  const { state, dispatch } = useStore()
  const [editing, setEditing] = useState<Reminder | 'new' | null>(null)
  const [showDone, setShowDone] = useState(false)

  const late = lateReminders(state)
  const upcoming = upcomingReminders(state, 120)
  const done = state.reminders.filter((reminder) => reminder.fait)

  const askPermission = async () => {
    if (!('Notification' in window)) return
    const permission = await Notification.requestPermission()
    dispatch({ type: 'settings/patch', payload: { notifications: permission === 'granted' } })
    if (permission === 'granted') {
      new Notification('Rappels activés ✅', {
        body: 'Tu recevras une alerte quand l’application est ouverte le jour d’un contrôle.',
      })
    }
  }

  return (
    <div>
      <PageHeader
        icon="bell"
        title="Rappels et notifications"
        subtitle="Contrôles, devoirs à rendre, révisions à ne pas oublier. Tout ce qui est ici alimente ton programme personnalisé."
        action={
          <Button icon="plus" size="sm" onClick={() => setEditing('new')}>
            Rappel
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="space-y-3">
          {late.length > 0 && (
            <Card className="border-rose-500/30 bg-rose-500/5">
              <SectionTitle icon="alert" title="En retard" />
              <ul className="space-y-2">
                {late.map((reminder) => (
                  <ReminderRow
                    key={reminder.id}
                    reminder={reminder}
                    onEdit={() => setEditing(reminder)}
                  />
                ))}
              </ul>
            </Card>
          )}

          {upcoming.length === 0 && late.length === 0 ? (
            <EmptyState
              icon="bell"
              title="Aucun rappel"
              text="Note ici tes contrôles et tes devoirs : l’application s’en sert pour prioriser tes révisions."
              action={
                <Button size="sm" icon="plus" onClick={() => setEditing('new')}>
                  Ajouter un rappel
                </Button>
              }
            />
          ) : (
            upcoming.length > 0 && (
              <Card>
                <SectionTitle icon="calendar" title="À venir" subtitle={`${upcoming.length} rappel${upcoming.length > 1 ? 's' : ''}`} />
                <ul className="space-y-2">
                  {upcoming.map((reminder) => (
                    <ReminderRow
                      key={reminder.id}
                      reminder={reminder}
                      onEdit={() => setEditing(reminder)}
                    />
                  ))}
                </ul>
              </Card>
            )
          )}

          {done.length > 0 && (
            <Card>
              <button
                onClick={() => setShowDone(!showDone)}
                className="flex w-full items-center gap-2 text-left"
              >
                <Icon name="check" size={15} className="text-emerald-500" />
                <span className="flex-1 text-sm font-bold text-ink">
                  Terminés ({done.length})
                </span>
                <Icon name={showDone ? 'chevronUp' : 'chevronDown'} size={15} className="text-muted" />
              </button>
              {showDone && (
                <ul className="mt-3 space-y-2">
                  {done.map((reminder) => (
                    <ReminderRow
                      key={reminder.id}
                      reminder={reminder}
                      onEdit={() => setEditing(reminder)}
                    />
                  ))}
                </ul>
              )}
            </Card>
          )}
        </div>

        <div className="space-y-3">
          <Card>
            <SectionTitle icon="bell" title="Notifications" />
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-ink">Alertes du navigateur</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                  Une alerte s’affiche à l’ouverture de l’application quand un contrôle approche.
                </p>
              </div>
              <Toggle
                checked={state.settings.notifications}
                label="Activer les notifications"
                onChange={(value) => {
                  if (value) void askPermission()
                  else dispatch({ type: 'settings/patch', payload: { notifications: false } })
                }}
              />
            </div>
          </Card>

          <Card className="border-primary/25 bg-primary-soft/40">
            <p className="text-[11px] font-bold uppercase tracking-wide text-primary-ink">
              Le bon réflexe
            </p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">
              Note un contrôle dès que le prof l’annonce. L’application répartira automatiquement les
              révisions sur les jours qui restent, au lieu de tout laisser pour la veille.
            </p>
          </Card>
        </div>
      </div>

      <ReminderModal reminder={editing} onClose={() => setEditing(null)} />
    </div>
  )
}

function ReminderRow({ reminder, onEdit }: { reminder: Reminder; onEdit: () => void }) {
  const { state, dispatch } = useStore()
  const subject = state.subjects.find((s) => s.id === reminder.subjectId)
  const delta = diffDays(todayISO(), reminder.date)
  const urgent = !reminder.fait && delta >= 0 && delta <= reminder.alerteJours

  return (
    <li
      className={cx(
        'flex items-center gap-3 rounded-2xl border p-2.5 transition',
        reminder.fait
          ? 'border-line bg-surface-2 opacity-60'
          : urgent
            ? 'border-accent/40 bg-accent-soft'
            : 'border-line bg-surface-2',
      )}
    >
      <button
        onClick={() =>
          dispatch({
            type: 'reminder/update',
            payload: { id: reminder.id, patch: { fait: !reminder.fait } },
          })
        }
        aria-label={reminder.fait ? 'Marquer à faire' : 'Marquer comme fait'}
        className={cx(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition',
          reminder.fait
            ? 'border-transparent bg-emerald-500 text-white'
            : 'border-line-strong text-transparent hover:border-emerald-400',
        )}
      >
        <Icon name="check" size={13} />
      </button>

      <span className={cx('h-8 w-1 shrink-0 rounded-full', KIND_COLOR[reminder.kind])} />

      <div className="min-w-0 flex-1">
        <p className={cx('truncate text-sm font-semibold', reminder.fait ? 'text-muted line-through' : 'text-ink')}>
          {reminder.titre}
        </p>
        <p className="truncate text-[11px] text-muted">
          {KIND_LABEL[reminder.kind]} · {relativeLabel(reminder.date)}
          {reminder.heure ? ` · ${reminder.heure}` : ''}
        </p>
        {reminder.details && (
          <p className="mt-0.5 truncate text-[11px] text-ink-soft">{reminder.details}</p>
        )}
      </div>

      {subject && <SubjectChip subject={subject} />}
      <IconButton icon="pencil" label="Modifier" size={15} onClick={onEdit} />
    </li>
  )
}

function ReminderModal({
  reminder,
  onClose,
}: {
  reminder: Reminder | 'new' | null
  onClose: () => void
}) {
  const { state, dispatch } = useStore()
  const existing = reminder !== 'new' && reminder !== null ? reminder : null
  const [key, setKey] = useState('')
  const [form, setForm] = useState<Omit<Reminder, 'id'>>({
    titre: '',
    date: addDays(todayISO(), 7),
    heure: '08:00',
    kind: 'controle',
    fait: false,
    alerteJours: 2,
  })

  const currentKey = existing?.id ?? (reminder === 'new' ? 'new' : '')
  if (reminder !== null && key !== currentKey) {
    setKey(currentKey)
    setForm({
      titre: existing?.titre ?? '',
      subjectId: existing?.subjectId,
      chapterId: existing?.chapterId,
      date: existing?.date ?? addDays(todayISO(), 7),
      heure: existing?.heure ?? '08:00',
      kind: existing?.kind ?? 'controle',
      details: existing?.details,
      fait: existing?.fait ?? false,
      alerteJours: existing?.alerteJours ?? 2,
    })
  }

  const chapters = state.chapters.filter((c) => c.subjectId === form.subjectId)

  const save = () => {
    if (!form.titre.trim()) return
    const payload: Reminder = { ...form, id: existing?.id ?? uid('rem'), titre: form.titre.trim() }
    if (existing) dispatch({ type: 'reminder/update', payload: { id: existing.id, patch: payload } })
    else dispatch({ type: 'reminder/add', payload })
    onClose()
  }

  return (
    <Modal
      open={reminder !== null}
      onClose={onClose}
      title={existing ? 'Modifier le rappel' : 'Nouveau rappel'}
      footer={
        <>
          {existing && (
            <Button
              variant="danger"
              icon="trash"
              onClick={() => {
                dispatch({ type: 'reminder/remove', payload: existing.id })
                onClose()
              }}
            >
              Supprimer
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>
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
          <Label>Intitulé</Label>
          <Input
            value={form.titre}
            onChange={(e) => setForm({ ...form, titre: e.target.value })}
            placeholder="Ex. Contrôle de maths — Fonctions"
            autoFocus
          />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <Label>Type</Label>
            <Select
              value={form.kind}
              onChange={(e) => setForm({ ...form, kind: e.target.value as ReminderKind })}
            >
              {Object.entries(KIND_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </label>
          <label className="block">
            <Label>Alerte</Label>
            <Select
              value={form.alerteJours}
              onChange={(e) => setForm({ ...form, alerteJours: Number(e.target.value) })}
            >
              <option value={0}>Le jour même</option>
              <option value={1}>1 jour avant</option>
              <option value={2}>2 jours avant</option>
              <option value={5}>5 jours avant</option>
              <option value={7}>1 semaine avant</option>
            </Select>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <Label>Date</Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </label>
          <label className="block">
            <Label hint="(facultatif)">Heure</Label>
            <Input
              type="time"
              value={form.heure ?? ''}
              onChange={(e) => setForm({ ...form, heure: e.target.value })}
            />
          </label>
        </div>
        <label className="block">
          <Label hint="(facultatif)">Matière</Label>
          <Select
            value={form.subjectId ?? ''}
            onChange={(e) =>
              setForm({ ...form, subjectId: e.target.value || undefined, chapterId: undefined })
            }
          >
            <option value="">Aucune</option>
            {state.subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.emoji} {subject.name}
              </option>
            ))}
          </Select>
        </label>
        {form.subjectId && chapters.length > 0 && (
          <label className="block">
            <Label hint="(facultatif — rend le programme plus précis)">Chapitre</Label>
            <Select
              value={form.chapterId ?? ''}
              onChange={(e) => setForm({ ...form, chapterId: e.target.value || undefined })}
            >
              <option value="">Tout le programme de la matière</option>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.title}
                </option>
              ))}
            </Select>
          </label>
        )}
        <label className="block">
          <Label hint="(facultatif)">Détails</Label>
          <Textarea
            rows={2}
            value={form.details ?? ''}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            placeholder="Ce qui est au programme, ce qu’il faut apporter…"
          />
        </label>
        <p className="rounded-xl bg-surface-2 p-2.5 text-[11px] text-muted">
          Prévu le <strong className="text-ink">{formatLong(form.date)}</strong>.
        </p>
      </div>
    </Modal>
  )
}
