import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { round, uid } from '../lib/utils'
import { TONES, type ToneKey } from '../store/types'
import { useStore } from '../store/StoreContext'
import { chaptersOf, masteryStatus, MASTERY_COLOR, subjectAverage } from '../store/selectors'
import { Button, Card, Input, Label, Select } from '../components/ui/primitives'
import { Modal } from '../components/ui/Modal'
import { ProgressRing } from '../components/charts'
import { MasteryLegend, PageHeader, SubjectAvatar } from '../components/common'

const EMOJIS = ['📐', '📖', '🌍', '🧬', '⚗️', '🇬🇧', '🇪🇸', '⚙️', '🎨', '🎵', '🏃', '💻', '⚖️', '📊']

export function Matieres() {
  const { state, dispatch } = useStore()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [short, setShort] = useState('')
  const [tone, setTone] = useState<ToneKey>('violet')
  const [emoji, setEmoji] = useState('📘')
  const [coefficient, setCoefficient] = useState(1)

  const rows = useMemo(
    () =>
      state.subjects
        .filter((subject) => !subject.archived)
        .map((subject) => {
          const chapters = chaptersOf(state, subject.id)
          const mastery =
            chapters.length === 0
              ? 0
              : chapters.reduce((acc, chapter) => acc + chapter.mastery, 0) / chapters.length
          return {
            subject,
            chapters: chapters.length,
            mastery,
            average: subjectAverage(state, subject.id),
          }
        }),
    [state],
  )

  const submit = () => {
    if (!name.trim()) return
    dispatch({
      type: 'subject/add',
      payload: {
        id: uid('subj'),
        name: name.trim(),
        short: (short.trim() || name.trim().slice(0, 5)).slice(0, 8),
        tone,
        emoji,
        coefficient,
      },
    })
    setName('')
    setShort('')
    setOpen(false)
  }

  return (
    <div>
      <PageHeader
        icon="book"
        title="Mes matières et cours"
        subtitle="Chaque matière contient ses chapitres, avec le cours, la fiche, les vidéos, le quiz et les exercices."
        action={
          <Button icon="plus" size="sm" onClick={() => setOpen(true)}>
            Matière
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="grid gap-3 sm:grid-cols-2">
          {rows.map(({ subject, chapters, mastery, average }) => (
            <Link
              key={subject.id}
              to={`/matieres/${subject.id}`}
              data-tone={subject.tone}
              className="card flex items-center gap-3.5 p-4 transition hover:border-[var(--tone)] hover:shadow-md"
            >
              <SubjectAvatar subject={subject} size={44} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{subject.name}</p>
                <p className="mt-0.5 text-[11px] text-muted">
                  {chapters} chapitre{chapters > 1 ? 's' : ''} · coef. {subject.coefficient}
                </p>
                <p className="mt-1 text-xs font-semibold text-[var(--tone-fg)]">
                  {average === null
                    ? 'Pas encore de note'
                    : `Moyenne ${round(average, 1).toString().replace('.', ',')}/20`}
                </p>
              </div>
              <ProgressRing
                value={mastery}
                size={54}
                thickness={6}
                color={MASTERY_COLOR[masteryStatus(mastery)]}
                label={`${Math.round(mastery)}%`}
              />
            </Link>
          ))}
          {rows.length === 0 && (
            <Card className="sm:col-span-2">
              <p className="text-sm text-muted">
                Aucune matière pour le moment. Ajoute-en une avec le bouton ci-dessus.
              </p>
            </Card>
          )}
        </div>

        <div className="space-y-3">
          <MasteryLegend />
          <Card>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Pour chaque chapitre</p>
            <ul className="mt-2 space-y-1.5 text-xs text-ink-soft">
              <li>📄 Le cours rédigé simplement</li>
              <li>🗂️ La fiche de révision</li>
              <li>🎬 Des vidéos courtes</li>
              <li>❓ Un quiz pour se tester</li>
              <li>✏️ Des exercices corrigés</li>
              <li>📝 Mes notes personnelles</li>
              <li>⚠️ Mes erreurs à revoir</li>
            </ul>
          </Card>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Nouvelle matière"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button icon="check" onClick={submit}>
              Ajouter
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <label className="block">
            <Label>Nom de la matière</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex. Latin" autoFocus />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <Label hint="(emploi du temps)">Abréviation</Label>
              <Input value={short} onChange={(e) => setShort(e.target.value)} placeholder="Lat." />
            </label>
            <label className="block">
              <Label>Coefficient</Label>
              <Select
                value={coefficient}
                onChange={(e) => setCoefficient(Number(e.target.value))}
              >
                {[0.5, 1, 1.5, 2, 3].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </label>
          </div>
          <div>
            <Label>Icône</Label>
            <div className="flex flex-wrap gap-1.5">
              {EMOJIS.map((value) => (
                <button
                  key={value}
                  onClick={() => setEmoji(value)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border text-lg transition ${
                    emoji === value ? 'border-primary bg-primary-soft' : 'border-line bg-surface-2'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label>Couleur</Label>
            <div className="flex flex-wrap gap-1.5">
              {TONES.map((value) => (
                <button
                  key={value}
                  data-tone={value}
                  onClick={() => setTone(value)}
                  aria-label={`Couleur ${value}`}
                  className={`h-8 w-8 rounded-xl bg-[var(--tone)] transition ${
                    tone === value ? 'ring-2 ring-ink ring-offset-2 ring-offset-surface' : 'opacity-75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
