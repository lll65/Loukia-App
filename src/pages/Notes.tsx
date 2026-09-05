import { useMemo, useState } from 'react'
import { formatShort, todayISO, trimestreOf } from '../lib/dates'
import { round, uid } from '../lib/utils'
import type { Grade, GradeKind } from '../store/types'
import { useStore } from '../store/StoreContext'
import {
  averageTimeline,
  effortNeeded,
  generalAverage,
  gradeOn20,
  projectedAverage,
  subjectAverage,
  subjectGrades,
} from '../store/selectors'
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
import { Modal } from '../components/ui/Modal'
import { LineChart } from '../components/charts'
import { PageHeader, Segmented, SubjectAvatar } from '../components/common'
import { Icon } from '../components/ui/Icon'

const KIND_LABEL: Record<GradeKind, string> = {
  controle: 'Contrôle',
  devoir: 'Devoir',
  oral: 'Oral',
  'brevet-blanc': 'Brevet blanc',
  autre: 'Autre',
}

export function Notes() {
  const { state, dispatch } = useStore()
  const [trimestre, setTrimestre] = useState<'all' | '1' | '2' | '3'>(
    String(trimestreOf(todayISO())) as '1' | '2' | '3',
  )
  const [editing, setEditing] = useState<Grade | 'new' | null>(null)
  const [openSubject, setOpenSubject] = useState<string | null>(null)

  const filterTrimestre = trimestre === 'all' ? undefined : (Number(trimestre) as 1 | 2 | 3)
  const average = generalAverage(state, filterTrimestre)
  const target = state.settings.noteVisee
  const gap = effortNeeded(state)
  const projection = projectedAverage(state)
  const timeline = useMemo(() => averageTimeline(state), [state])

  const rows = state.subjects
    .map((subject) => ({
      subject,
      grades: subjectGrades(state, subject.id, filterTrimestre),
      average: subjectAverage(state, subject.id, filterTrimestre),
    }))
    .filter((row) => row.grades.length > 0 || !filterTrimestre)

  return (
    <div>
      <PageHeader
        icon="note"
        title="Mes notes"
        subtitle="Toutes tes notes, la moyenne par matière, la moyenne générale et son évolution."
        action={
          <Button icon="plus" size="sm" onClick={() => setEditing('new')}>
            Note
          </Button>
        }
      />

      <div className="mb-3">
        <Segmented
          value={trimestre}
          onChange={setTrimestre}
          options={[
            { value: '1', label: 'Trim. 1' },
            { value: '2', label: 'Trim. 2' },
            { value: '3', label: 'Trim. 3' },
            { value: 'all', label: 'Année' },
          ]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-2.5">
          {rows.length === 0 ? (
            <EmptyState
              icon="note"
              title="Aucune note pour ce trimestre"
              text="Ajoute tes notes au fur et à mesure : moyennes et statistiques se calculent toutes seules."
              action={
                <Button size="sm" icon="plus" onClick={() => setEditing('new')}>
                  Ajouter une note
                </Button>
              }
            />
          ) : (
            rows.map(({ subject, grades, average: subjectAvg }) => {
              const open = openSubject === subject.id
              return (
                <Card key={subject.id} data-tone={subject.tone} padded={false}>
                  <button
                    onClick={() => setOpenSubject(open ? null : subject.id)}
                    className="flex w-full items-center gap-3 p-3.5 text-left"
                  >
                    <SubjectAvatar subject={subject} size={38} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-ink">{subject.name}</span>
                      <span className="text-[11px] text-muted">
                        {grades.length} note{grades.length > 1 ? 's' : ''} · coef. {subject.coefficient}
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-base font-extrabold text-[var(--tone-fg)]">
                        {subjectAvg === null
                          ? '—'
                          : round(subjectAvg, 2).toString().replace('.', ',')}
                      </span>
                      <span className="text-[10px] text-muted">/20</span>
                    </span>
                    <Icon
                      name={open ? 'chevronUp' : 'chevronDown'}
                      size={16}
                      className="shrink-0 text-muted"
                    />
                  </button>

                  {open && (
                    <div className="animate-rise border-t border-line px-3.5 pb-3 pt-2">
                      {grades.length === 0 ? (
                        <p className="py-2 text-xs text-muted">Aucune note dans cette matière.</p>
                      ) : (
                        <ul className="divide-y divide-line">
                          {grades.map((grade) => (
                            <li key={grade.id} className="flex items-center gap-2.5 py-2">
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-xs font-semibold text-ink">
                                  {grade.intitule}
                                </span>
                                <span className="text-[11px] text-muted">
                                  {formatShort(grade.date)} · {KIND_LABEL[grade.kind]} · coef.{' '}
                                  {grade.coefficient}
                                </span>
                              </span>
                              <span className="shrink-0 text-sm font-bold text-ink">
                                {round(grade.valeur, 2).toString().replace('.', ',')}
                                <span className="text-[10px] font-normal text-muted">
                                  /{grade.bareme}
                                </span>
                              </span>
                              <IconButton
                                icon="pencil"
                                label="Modifier"
                                size={14}
                                onClick={() => setEditing(grade)}
                              />
                              <IconButton
                                icon="trash"
                                label="Supprimer"
                                size={14}
                                onClick={() => dispatch({ type: 'grade/remove', payload: grade.id })}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="plus"
                        className="mt-1"
                        onClick={() => setEditing('new')}
                      >
                        Ajouter une note en {subject.short}
                      </Button>
                    </div>
                  )}
                </Card>
              )
            })
          )}
        </div>

        <div className="space-y-3">
          <Card>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">
              Ma moyenne générale
            </p>
            <p className="mt-1 text-3xl font-extrabold text-ink">
              {average === null ? '—' : round(average, 2).toString().replace('.', ',')}
              <span className="text-base font-bold text-muted">/20</span>
            </p>
            {gap !== null && (
              <p className="mt-1 text-xs text-muted">
                {gap <= 0 ? (
                  <span className="font-semibold text-emerald-500">
                    Objectif de {target}/20 atteint 🎉
                  </span>
                ) : (
                  <>
                    Il te manque{' '}
                    <span className="font-bold text-accent">
                      {round(gap, 2).toString().replace('.', ',')} point
                      {gap >= 2 ? 's' : ''}
                    </span>{' '}
                    pour atteindre {target}/20.
                  </>
                )}
              </p>
            )}
            {timeline.length > 1 && (
              <div className="mt-3">
                <LineChart points={timeline} target={target} suffix="/20" />
              </div>
            )}
          </Card>

          {projection !== null && state.grades.length >= 4 && (
            <Card className="border-primary/25 bg-primary-soft/40">
              <SectionTitle icon="sparkle" title="Estimation de ma moyenne à venir" />
              <p className="text-2xl font-extrabold text-primary-ink">
                {round(projection, 2).toString().replace('.', ',')}
                <span className="text-sm font-bold text-muted">/20</span>
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
                Calculée à partir de la tendance de tes dernières notes. Ce n’est qu’une estimation :
                elle bouge à chaque nouvelle note.
              </p>
            </Card>
          )}

          <Card>
            <SectionTitle icon="chart" title="Mes meilleures matières" />
            <ul className="space-y-1.5">
              {rows
                .filter((row) => row.average !== null)
                .sort((a, b) => (b.average ?? 0) - (a.average ?? 0))
                .slice(0, 5)
                .map((row) => (
                  <li key={row.subject.id} className="flex items-center gap-2 text-xs">
                    <SubjectAvatar subject={row.subject} size={24} />
                    <span className="min-w-0 flex-1 truncate text-ink-soft">{row.subject.name}</span>
                    <span className="shrink-0 font-bold text-ink">
                      {round(row.average ?? 0, 1).toString().replace('.', ',')}
                    </span>
                  </li>
                ))}
            </ul>
          </Card>
        </div>
      </div>

      <GradeModal grade={editing} onClose={() => setEditing(null)} />
    </div>
  )
}

function GradeModal({ grade, onClose }: { grade: Grade | 'new' | null; onClose: () => void }) {
  const { state, dispatch } = useStore()
  const isNew = grade === 'new'
  const existing = grade !== 'new' && grade !== null ? grade : null

  const [form, setForm] = useState<Omit<Grade, 'id'>>(() => ({
    subjectId: existing?.subjectId ?? state.subjects[0]?.id ?? '',
    intitule: existing?.intitule ?? '',
    valeur: existing?.valeur ?? 15,
    bareme: existing?.bareme ?? 20,
    coefficient: existing?.coefficient ?? 1,
    date: existing?.date ?? todayISO(),
    kind: existing?.kind ?? 'controle',
    trimestre: existing?.trimestre ?? trimestreOf(todayISO()),
  }))

  // Réinitialise le formulaire à chaque ouverture.
  const [key, setKey] = useState('')
  const currentKey = existing?.id ?? (isNew ? 'new' : '')
  if (grade !== null && key !== currentKey) {
    setKey(currentKey)
    setForm({
      subjectId: existing?.subjectId ?? state.subjects[0]?.id ?? '',
      intitule: existing?.intitule ?? '',
      valeur: existing?.valeur ?? 15,
      bareme: existing?.bareme ?? 20,
      coefficient: existing?.coefficient ?? 1,
      date: existing?.date ?? todayISO(),
      kind: existing?.kind ?? 'controle',
      trimestre: existing?.trimestre ?? trimestreOf(todayISO()),
    })
  }

  const save = () => {
    if (!form.subjectId || !form.intitule.trim()) return
    const payload: Grade = { ...form, id: existing?.id ?? uid('grade'), intitule: form.intitule.trim() }
    if (existing) dispatch({ type: 'grade/update', payload: { id: existing.id, patch: payload } })
    else dispatch({ type: 'grade/add', payload })
    onClose()
  }

  return (
    <Modal
      open={grade !== null}
      onClose={onClose}
      title={existing ? 'Modifier la note' : 'Nouvelle note'}
      footer={
        <>
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
          <Label>Intitulé</Label>
          <Input
            value={form.intitule}
            onChange={(e) => setForm({ ...form, intitule: e.target.value })}
            placeholder="Ex. Contrôle — Fonctions"
          />
        </label>
        <div className="grid grid-cols-3 gap-2">
          <label className="block">
            <Label>Note</Label>
            <Input
              type="number"
              step="0.25"
              min={0}
              max={form.bareme}
              value={form.valeur}
              onChange={(e) => setForm({ ...form, valeur: Number(e.target.value) })}
            />
          </label>
          <label className="block">
            <Label>Sur</Label>
            <Input
              type="number"
              min={1}
              value={form.bareme}
              onChange={(e) => setForm({ ...form, bareme: Number(e.target.value) || 20 })}
            />
          </label>
          <label className="block">
            <Label>Coef.</Label>
            <Input
              type="number"
              step="0.5"
              min={0.5}
              value={form.coefficient}
              onChange={(e) => setForm({ ...form, coefficient: Number(e.target.value) || 1 })}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <Label>Date</Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value, trimestre: trimestreOf(e.target.value) })
              }
            />
          </label>
          <label className="block">
            <Label>Type</Label>
            <Select
              value={form.kind}
              onChange={(e) => setForm({ ...form, kind: e.target.value as GradeKind })}
            >
              {Object.entries(KIND_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </label>
        </div>
        <label className="block">
          <Label>Trimestre</Label>
          <Select
            value={form.trimestre}
            onChange={(e) => setForm({ ...form, trimestre: Number(e.target.value) as 1 | 2 | 3 })}
          >
            <option value={1}>Trimestre 1</option>
            <option value={2}>Trimestre 2</option>
            <option value={3}>Trimestre 3</option>
          </Select>
        </label>
        {form.bareme !== 20 && (
          <p className="rounded-xl bg-surface-2 p-2.5 text-[11px] text-muted">
            Cette note sera ramenée sur 20 pour les moyennes :{' '}
            <strong className="text-ink">
              {round(gradeOn20({ ...form, id: 'x' }), 2).toString().replace('.', ',')}/20
            </strong>
          </p>
        )}
      </div>
    </Modal>
  )
}
