import { useMemo, useState } from 'react'
import { isoWeekday, JOURS, JOURS_COURTS, minutesFromTime, relativeLabel, timeFromMinutes, todayISO } from '../lib/dates'
import { uid } from '../lib/utils'
import type { CourseSlot } from '../store/types'
import { useStore } from '../store/StoreContext'
import { slotsForDay, upcomingReminders } from '../store/selectors'
import {
  Button,
  Card,
  EmptyState,
  IconButton,
  Input,
  Label,
  Select,
  SectionTitle,
} from '../components/ui/primitives'
import { ConfirmDialog, Modal } from '../components/ui/Modal'
import { PageHeader, Segmented, SubjectChip } from '../components/common'


const HOUR_HEIGHT = 56

export function Planning() {
  const { state, dispatch } = useStore()
  const [view, setView] = useState<'semaine' | 'jour'>('semaine')
  const [day, setDay] = useState(() => Math.min(isoWeekday(todayISO()), 6))
  const [editing, setEditing] = useState<CourseSlot | 'new' | null>(null)
  const [clearing, setClearing] = useState(false)

  const days = useMemo(() => {
    const maxDay = state.slots.reduce((acc, slot) => Math.max(acc, slot.day), 5)
    return Array.from({ length: Math.max(5, maxDay) }, (_, i) => i + 1)
  }, [state.slots])

  const range = useMemo(() => {
    if (state.slots.length === 0) return { start: 8 * 60, end: 18 * 60 }
    const start = Math.min(...state.slots.map((slot) => minutesFromTime(slot.start)))
    const end = Math.max(...state.slots.map((slot) => minutesFromTime(slot.end)))
    return { start: Math.floor(start / 60) * 60, end: Math.ceil(end / 60) * 60 }
  }, [state.slots])

  const hours = Array.from(
    { length: Math.max(1, (range.end - range.start) / 60) },
    (_, i) => range.start / 60 + i,
  )
  const soon = upcomingReminders(state, 21)

  return (
    <div>
      <PageHeader
        icon="calendar"
        title="Mon emploi du temps"
        subtitle="Ton planning de la semaine, avec les rappels de devoirs et de contrôles. Un emploi du temps type est déjà chargé : adapte-le au tien."
        action={
          <Button icon="plus" size="sm" onClick={() => setEditing('new')}>
            Cours
          </Button>
        }
      />

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: 'semaine', label: 'Semaine' },
            { value: 'jour', label: 'Par jour' },
          ]}
        />
        {view === 'jour' && (
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
            {days.map((value) => (
              <button
                key={value}
                onClick={() => setDay(value)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  day === value ? 'bg-primary text-white' : 'bg-surface-2 text-ink-soft'
                }`}
              >
                {JOURS_COURTS[value - 1]}
              </button>
            ))}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          icon="trash"
          className="ml-auto"
          onClick={() => setClearing(true)}
        >
          Vider
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <Card padded={false} className="overflow-hidden">
          {state.slots.length === 0 ? (
            <div className="p-4">
              <EmptyState
                icon="calendar"
                title="Emploi du temps vide"
                text="Ajoute tes cours un par un : ils apparaîtront ici avec la couleur de leur matière."
                action={
                  <Button size="sm" icon="plus" onClick={() => setEditing('new')}>
                    Ajouter un cours
                  </Button>
                }
              />
            </div>
          ) : view === 'semaine' ? (
            <div className="scroll-thin overflow-x-auto">
              <div className="min-w-[560px] p-3">
                <div
                  className="grid gap-1"
                  style={{ gridTemplateColumns: `42px repeat(${days.length}, minmax(0, 1fr))` }}
                >
                  <div />
                  {days.map((value) => (
                    <div
                      key={value}
                      className={`pb-1.5 text-center text-[11px] font-bold ${
                        isoWeekday(todayISO()) === value ? 'text-primary' : 'text-muted'
                      }`}
                    >
                      {JOURS_COURTS[value - 1]}
                    </div>
                  ))}
                </div>

                <div
                  className="grid gap-1"
                  style={{ gridTemplateColumns: `42px repeat(${days.length}, minmax(0, 1fr))` }}
                >
                  <div className="relative" style={{ height: hours.length * HOUR_HEIGHT }}>
                    {hours.map((hour, i) => (
                      <span
                        key={hour}
                        className="absolute right-1.5 -translate-y-1/2 text-[10px] text-muted"
                        style={{ top: i * HOUR_HEIGHT }}
                      >
                        {hour}h
                      </span>
                    ))}
                  </div>

                  {days.map((value) => (
                    <div
                      key={value}
                      className="relative rounded-xl bg-surface-2"
                      style={{ height: hours.length * HOUR_HEIGHT }}
                    >
                      {hours.map((hour, i) => (
                        <div
                          key={hour}
                          className="absolute left-0 right-0 border-t border-line"
                          style={{ top: i * HOUR_HEIGHT }}
                        />
                      ))}
                      {slotsForDay(state, value).map((slot) => {
                        const subject = state.subjects.find((s) => s.id === slot.subjectId)
                        const top =
                          ((minutesFromTime(slot.start) - range.start) / 60) * HOUR_HEIGHT
                        const height = Math.max(
                          22,
                          ((minutesFromTime(slot.end) - minutesFromTime(slot.start)) / 60) *
                            HOUR_HEIGHT -
                            3,
                        )
                        return (
                          <button
                            key={slot.id}
                            data-tone={subject?.tone}
                            onClick={() => setEditing(slot)}
                            className="absolute left-1 right-1 overflow-hidden rounded-lg bg-[var(--tone-bg)] px-1.5 py-1 text-left transition hover:brightness-95"
                            style={{ top, height }}
                          >
                            <span className="block truncate text-[10.5px] font-bold text-[var(--tone-fg)]">
                              {subject?.short ?? '—'}
                            </span>
                            {height > 36 && (
                              <span className="block truncate text-[9.5px] text-[var(--tone-fg)] opacity-80">
                                {slot.start}
                                {slot.salle ? ` · ${slot.salle}` : ''}
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3.5">
              <h3 className="mb-2.5 text-sm font-bold text-ink">{JOURS[day - 1]}</h3>
              {slotsForDay(state, day).length === 0 ? (
                <p className="py-6 text-center text-xs text-muted">Pas de cours ce jour-là.</p>
              ) : (
                <ul className="space-y-2">
                  {slotsForDay(state, day).map((slot) => {
                    const subject = state.subjects.find((s) => s.id === slot.subjectId)
                    return (
                      <li
                        key={slot.id}
                        data-tone={subject?.tone}
                        className="flex items-center gap-3 rounded-2xl border border-line bg-surface-2 p-2.5"
                      >
                        <span className="w-12 shrink-0 text-xs font-bold text-ink">{slot.start}</span>
                        <span className="h-9 w-1 shrink-0 rounded-full bg-[var(--tone)]" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-ink">
                            {subject?.name ?? 'Matière supprimée'}
                          </span>
                          <span className="text-[11px] text-muted">
                            {slot.start} – {slot.end}
                            {slot.salle ? ` · salle ${slot.salle}` : ''}
                          </span>
                        </span>
                        <IconButton icon="pencil" label="Modifier" size={15} onClick={() => setEditing(slot)} />
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )}
        </Card>

        <div className="space-y-3">
          <Card>
            <SectionTitle icon="bell" title="Devoirs et contrôles" />
            {soon.length === 0 ? (
              <p className="text-xs text-muted">Rien de prévu pour les trois prochaines semaines.</p>
            ) : (
              <ul className="space-y-2.5">
                {soon.slice(0, 6).map((reminder) => {
                  const subject = state.subjects.find((s) => s.id === reminder.subjectId)
                  return (
                    <li key={reminder.id} className="flex items-start gap-2.5">
                      <span
                        className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                          reminder.kind === 'controle' ? 'bg-accent' : 'bg-primary'
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-xs font-semibold text-ink">{reminder.titre}</p>
                        <p className="text-[11px] text-muted">{relativeLabel(reminder.date)}</p>
                      </div>
                      {subject && <SubjectChip subject={subject} />}
                    </li>
                  )
                })}
              </ul>
            )}
          </Card>

          <Card>
            <SectionTitle icon="clock" title="Mes créneaux" />
            <p className="text-xs leading-relaxed text-ink-soft">
              De <strong className="text-ink">{state.settings.heureDebut}</strong> à{' '}
              <strong className="text-ink">{state.settings.heureFin}</strong>, les{' '}
              {state.settings.joursRevision.map((d) => JOURS_COURTS[d - 1]).join(', ')}.
            </p>
            <p className="mt-1.5 text-[11px] text-muted">
              Modifiable dans les paramètres — c’est ce qui sert à construire ton programme.
            </p>
          </Card>
        </div>
      </div>

      <SlotModal slot={editing} onClose={() => setEditing(null)} />

      <ConfirmDialog
        open={clearing}
        onClose={() => setClearing(false)}
        onConfirm={() => dispatch({ type: 'slot/clear' })}
        title="Vider l’emploi du temps ?"
        message="Tous les créneaux seront supprimés. Tes cours, notes et rappels ne sont pas concernés."
        confirmLabel="Tout vider"
      />
    </div>
  )
}

function SlotModal({ slot, onClose }: { slot: CourseSlot | 'new' | null; onClose: () => void }) {
  const { state, dispatch } = useStore()
  const existing = slot !== 'new' && slot !== null ? slot : null
  const [key, setKey] = useState('')
  const [form, setForm] = useState<Omit<CourseSlot, 'id'>>({
    day: 1,
    start: '08:00',
    end: '09:00',
    subjectId: state.subjects[0]?.id ?? '',
  })

  const currentKey = existing?.id ?? (slot === 'new' ? 'new' : '')
  if (slot !== null && key !== currentKey) {
    setKey(currentKey)
    setForm({
      day: existing?.day ?? 1,
      start: existing?.start ?? '08:00',
      end: existing?.end ?? '09:00',
      subjectId: existing?.subjectId ?? state.subjects[0]?.id ?? '',
      salle: existing?.salle,
    })
  }

  const save = () => {
    if (!form.subjectId) return
    if (minutesFromTime(form.end) <= minutesFromTime(form.start)) {
      setForm({ ...form, end: timeFromMinutes(minutesFromTime(form.start) + 60) })
      return
    }
    if (existing) dispatch({ type: 'slot/update', payload: { id: existing.id, patch: form } })
    else dispatch({ type: 'slot/add', payload: { ...form, id: uid('slot') } })
    onClose()
  }

  return (
    <Modal
      open={slot !== null}
      onClose={onClose}
      title={existing ? 'Modifier le cours' : 'Ajouter un cours'}
      footer={
        <>
          {existing && (
            <Button
              variant="danger"
              icon="trash"
              onClick={() => {
                dispatch({ type: 'slot/remove', payload: existing.id })
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
          <Label>Matière</Label>
          <Select
            value={form.subjectId}
            onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
          >
            {state.subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.emoji} {subject.name}
              </option>
            ))}
          </Select>
        </label>
        <label className="block">
          <Label>Jour</Label>
          <Select value={form.day} onChange={(e) => setForm({ ...form, day: Number(e.target.value) })}>
            {JOURS.map((label, index) => (
              <option key={label} value={index + 1}>
                {label}
              </option>
            ))}
          </Select>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <Label>Début</Label>
            <Input type="time" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} />
          </label>
          <label className="block">
            <Label>Fin</Label>
            <Input type="time" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} />
          </label>
        </div>
        <label className="block">
          <Label hint="(facultatif)">Salle</Label>
          <Input
            value={form.salle ?? ''}
            onChange={(e) => setForm({ ...form, salle: e.target.value })}
            placeholder="Ex. B204"
          />
        </label>
      </div>
    </Modal>
  )
}
