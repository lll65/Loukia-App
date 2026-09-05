import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { round, uid } from '../lib/utils'
import { useStore } from '../store/StoreContext'
import { chaptersOf, subjectAverage, subjectGrades } from '../store/selectors'
import { Button, Card, IconButton, Input, Label, Select, EmptyState } from '../components/ui/primitives'
import { ConfirmDialog, Modal } from '../components/ui/Modal'
import { ChapterRow, MasteryLegend, PageHeader, SubjectAvatar } from '../components/common'
import { Icon } from '../components/ui/Icon'
import { TONES, type ToneKey } from '../store/types'

export function Matiere() {
  const { subjectId = '' } = useParams()
  const navigate = useNavigate()
  const { state, dispatch } = useStore()
  const subject = state.subjects.find((s) => s.id === subjectId)
  const [search, setSearch] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [title, setTitle] = useState('')

  const chapters = useMemo(
    () => (subject ? chaptersOf(state, subject.id) : []),
    [state, subject],
  )
  const filtered = chapters.filter((chapter) =>
    chapter.title.toLowerCase().includes(search.trim().toLowerCase()),
  )

  if (!subject) return <Navigate to="/matieres" replace />

  const average = subjectAverage(state, subject.id)
  const grades = subjectGrades(state, subject.id)

  const addChapter = () => {
    if (!title.trim()) return
    dispatch({
      type: 'chapter/add',
      payload: {
        id: uid('chap'),
        subjectId: subject.id,
        title: title.trim(),
        order: chapters.length,
        mastery: 0,
        sections: [],
        fiche: { essentiel: [] },
      },
    })
    setTitle('')
    setAddOpen(false)
  }

  return (
    <div>
      <PageHeader
        title={subject.name}
        back={{ to: '/matieres', label: 'Toutes mes matières' }}
        subtitle={`${chapters.length} chapitre${chapters.length > 1 ? 's' : ''} · coefficient ${subject.coefficient}${
          average !== null ? ` · moyenne ${round(average, 1).toString().replace('.', ',')}/20` : ''
        }`}
        action={
          <div className="flex items-center gap-1">
            <IconButton icon="settings" label="Modifier la matière" onClick={() => setEditOpen(true)} />
            <Button icon="plus" size="sm" onClick={() => setAddOpen(true)}>
              Chapitre
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="space-y-3">
          <Card padded={false} className="flex items-center gap-2 px-3 py-2">
            <Icon name="search" size={16} className="shrink-0 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un chapitre"
              className="w-full bg-transparent py-1 text-sm outline-none placeholder:text-muted"
            />
            {search && <IconButton icon="x" label="Effacer" onClick={() => setSearch('')} />}
          </Card>

          {filtered.length === 0 ? (
            <EmptyState
              icon="book"
              title={search ? 'Aucun chapitre trouvé' : 'Aucun chapitre'}
              text={
                search
                  ? 'Essaie un autre mot-clé.'
                  : 'Ajoute ton premier chapitre pour commencer à travailler cette matière.'
              }
              action={
                !search && (
                  <Button size="sm" icon="plus" onClick={() => setAddOpen(true)}>
                    Ajouter un chapitre
                  </Button>
                )
              }
            />
          ) : (
            <div className="space-y-2">
              {filtered.map((chapter) => (
                <ChapterRow key={chapter.id} chapter={chapter} subject={subject} />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Card className="flex items-center gap-3">
            <SubjectAvatar subject={subject} size={42} />
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Moyenne</p>
              <p className="text-lg font-extrabold text-ink">
                {average === null ? '—' : `${round(average, 1).toString().replace('.', ',')}/20`}
              </p>
              <p className="text-[11px] text-muted">
                {grades.length} note{grades.length > 1 ? 's' : ''}
              </p>
            </div>
          </Card>
          <MasteryLegend />
        </div>
      </div>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Nouveau chapitre"
        footer={
          <>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>
              Annuler
            </Button>
            <Button icon="check" onClick={addChapter}>
              Ajouter
            </Button>
          </>
        }
      >
        <label className="block">
          <Label>Titre du chapitre</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addChapter()}
            placeholder="Ex. Le théorème de Thalès"
            autoFocus
          />
        </label>
        <p className="mt-2 text-xs text-muted">
          Tu pourras ensuite y écrire le cours, la fiche, les vidéos, le quiz et les exercices.
        </p>
      </Modal>

      <EditSubjectModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onDelete={() => {
          setEditOpen(false)
          setConfirm(true)
        }}
        subjectId={subject.id}
      />

      <ConfirmDialog
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          dispatch({ type: 'subject/remove', payload: subject.id })
          navigate('/matieres')
        }}
        title={`Supprimer ${subject.name} ?`}
        message="Tous les chapitres, cours, quiz, notes et rappels de cette matière seront supprimés. Cette action est définitive."
      />
    </div>
  )
}

function EditSubjectModal({
  open,
  onClose,
  onDelete,
  subjectId,
}: {
  open: boolean
  onClose: () => void
  onDelete: () => void
  subjectId: string
}) {
  const { state, dispatch } = useStore()
  const subject = state.subjects.find((s) => s.id === subjectId)
  if (!subject) return null

  const patch = (values: Partial<typeof subject>) =>
    dispatch({ type: 'subject/update', payload: { id: subject.id, patch: values } })

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Modifier la matière"
      footer={
        <>
          <Button variant="danger" icon="trash" onClick={onDelete}>
            Supprimer
          </Button>
          <Button icon="check" onClick={onClose}>
            Terminé
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <label className="block">
          <Label>Nom</Label>
          <Input value={subject.name} onChange={(e) => patch({ name: e.target.value })} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <Label>Abréviation</Label>
            <Input value={subject.short} onChange={(e) => patch({ short: e.target.value })} />
          </label>
          <label className="block">
            <Label>Coefficient</Label>
            <Select
              value={subject.coefficient}
              onChange={(e) => patch({ coefficient: Number(e.target.value) })}
            >
              {[0.5, 1, 1.5, 2, 3].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          </label>
        </div>
        <label className="block">
          <Label>Icône</Label>
          <Input
            value={subject.emoji}
            onChange={(e) => patch({ emoji: e.target.value.slice(0, 2) })}
            className="w-20 text-center text-lg"
          />
        </label>
        <div>
          <Label>Couleur</Label>
          <div className="flex flex-wrap gap-1.5">
            {TONES.map((value: ToneKey) => (
              <button
                key={value}
                data-tone={value}
                onClick={() => patch({ tone: value })}
                aria-label={`Couleur ${value}`}
                className={`h-8 w-8 rounded-xl bg-[var(--tone)] transition ${
                  subject.tone === value
                    ? 'ring-2 ring-ink ring-offset-2 ring-offset-surface'
                    : 'opacity-75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
