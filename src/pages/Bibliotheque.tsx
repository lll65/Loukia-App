import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/StoreContext'
import { Card, EmptyState } from '../components/ui/primitives'
import { Icon } from '../components/ui/Icon'
import { PageHeader, SubjectChip, SubjectFilter } from '../components/common'

/* ------------------------------------------------------------------ */
/* Toutes les fiches de révision                                       */
/* ------------------------------------------------------------------ */

export function Fiches() {
  const { state } = useStore()
  const [filter, setFilter] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  const rows = state.chapters
    .filter((chapter) => !filter || chapter.subjectId === filter)
    .map((chapter) => ({
      chapter,
      subject: state.subjects.find((s) => s.id === chapter.subjectId)!,
    }))
    .filter((row) => row.subject && row.chapter.fiche.essentiel.length > 0)

  return (
    <div>
      <PageHeader
        icon="file"
        title="Mes fiches de révision"
        subtitle="L’essentiel de chaque chapitre, en quelques points. Idéal pour réviser la veille d’un contrôle."
      />
      <div className="mb-3">
        <SubjectFilter subjects={state.subjects} value={filter} onChange={setFilter} />
      </div>

      {rows.length === 0 ? (
        <EmptyState
          icon="file"
          title="Aucune fiche"
          text="Ouvre un chapitre puis l’onglet « Fiche » pour écrire tes points clés."
        />
      ) : (
        <div className="space-y-2.5">
          {rows.map(({ chapter, subject }) => {
            const open = openId === chapter.id
            return (
              <Card key={chapter.id} data-tone={subject.tone} padded={false} className="overflow-hidden">
                <button
                  onClick={() => setOpenId(open ? null : chapter.id)}
                  className="flex w-full items-center gap-3 p-3.5 text-left"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--tone-bg)] text-[var(--tone-fg)]">
                    <Icon name="file" size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-ink">{chapter.title}</span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted">
                      <SubjectChip subject={subject} />
                      {chapter.fiche.essentiel.length} point
                      {chapter.fiche.essentiel.length > 1 ? 's' : ''} clé
                      {chapter.fiche.essentiel.length > 1 ? 's' : ''}
                    </span>
                  </span>
                  <Icon
                    name={open ? 'chevronUp' : 'chevronDown'}
                    size={16}
                    className="shrink-0 text-muted"
                  />
                </button>

                {open && (
                  <div className="animate-rise border-t border-line px-3.5 pb-3.5 pt-3">
                    <ul className="space-y-1.5">
                      {chapter.fiche.essentiel.map((point, i) => (
                        <li key={i} className="flex gap-2 text-sm text-ink-soft">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--tone)]" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {chapter.fiche.formules && chapter.fiche.formules.length > 0 && (
                      <div className="mt-3 rounded-xl bg-surface-2 p-2.5">
                        <p className="mb-1 text-[10.5px] font-bold uppercase tracking-wide text-muted">
                          Formules
                        </p>
                        <ul className="flex flex-wrap gap-1.5">
                          {chapter.fiche.formules.map((formule, i) => (
                            <li
                              key={i}
                              className="rounded-lg bg-surface px-2 py-1 text-xs font-medium text-ink"
                            >
                              {formule}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {chapter.fiche.pieges && chapter.fiche.pieges.length > 0 && (
                      <div className="mt-2 rounded-xl bg-rose-500/8 p-2.5">
                        <p className="mb-1 text-[10.5px] font-bold uppercase tracking-wide text-rose-500">
                          Pièges à éviter
                        </p>
                        <ul className="space-y-1">
                          {chapter.fiche.pieges.map((piege, i) => (
                            <li key={i} className="text-xs text-ink-soft">
                              • {piege}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link
                      to={`/chapitre/${chapter.id}?onglet=fiche`}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary"
                    >
                      Ouvrir le chapitre
                      <Icon name="chevronRight" size={13} />
                    </Link>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Toutes les vidéos                                                   */
/* ------------------------------------------------------------------ */

export function Videos() {
  const { state } = useStore()
  const [filter, setFilter] = useState('')
  const videos = state.videos.filter((video) => !filter || video.subjectId === filter)

  return (
    <div>
      <PageHeader
        icon="video"
        title="Vidéos"
        subtitle="Des vidéos courtes pour comprendre autrement. Chaque lien ouvre une recherche : choisis celle qui t’explique le mieux le chapitre."
      />
      <div className="mb-3">
        <SubjectFilter subjects={state.subjects} value={filter} onChange={setFilter} />
      </div>

      {videos.length === 0 ? (
        <EmptyState icon="video" title="Aucune vidéo" text="Ajoute-en depuis l’onglet Vidéos d’un chapitre." />
      ) : (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {videos.map((video) => {
            const subject = state.subjects.find((s) => s.id === video.subjectId)
            const chapter = state.chapters.find((c) => c.id === video.chapterId)
            return (
              <Card key={video.id} data-tone={subject?.tone} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/12 text-rose-500">
                  <Icon name="play" size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{video.title}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted">
                    {subject && <SubjectChip subject={subject} />}
                    <span className="truncate">{chapter?.title}</span>
                  </p>
                  <p className="text-[11px] text-muted">
                    {video.source} · environ {video.duree} min
                  </p>
                </div>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-primary-soft px-2.5 py-1.5 text-xs font-semibold text-primary-ink"
                >
                  Voir
                  <Icon name="external" size={13} />
                </a>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tous les exercices                                                  */
/* ------------------------------------------------------------------ */

export function Exercices() {
  const { state } = useStore()
  const [filter, setFilter] = useState('')

  const rows = state.chapters
    .filter((chapter) => !filter || chapter.subjectId === filter)
    .map((chapter) => ({
      chapter,
      subject: state.subjects.find((s) => s.id === chapter.subjectId)!,
      exercises: state.exercises.filter((e) => e.chapterId === chapter.id),
    }))
    .filter((row) => row.subject && row.exercises.length > 0)

  return (
    <div>
      <PageHeader
        icon="pencil"
        title="Exercices corrigés"
        subtitle="Des exercices type contrôle, avec indice et correction détaillée étape par étape."
      />
      <div className="mb-3">
        <SubjectFilter subjects={state.subjects} value={filter} onChange={setFilter} />
      </div>

      {rows.length === 0 ? (
        <EmptyState icon="pencil" title="Aucun exercice" text="Les exercices sont rangés par chapitre." />
      ) : (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {rows.map(({ chapter, subject, exercises }) => (
            <Link
              key={chapter.id}
              to={`/chapitre/${chapter.id}?onglet=exercices`}
              data-tone={subject.tone}
              className="card flex items-center gap-3 p-3.5 transition hover:border-[var(--tone)] hover:shadow-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--tone-bg)] text-[var(--tone-fg)]">
                <Icon name="pencil" size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{chapter.title}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted">
                  <SubjectChip subject={subject} />
                  {exercises.length} exercice{exercises.length > 1 ? 's' : ''}
                </p>
              </div>
              <Icon name="chevronRight" size={16} className="shrink-0 text-muted" />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
