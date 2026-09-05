import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatShort } from '../lib/dates'
import { cx } from '../lib/utils'
import { useStore } from '../store/StoreContext'
import { Button, Card, EmptyState, IconButton, SectionTitle } from '../components/ui/primitives'
import { PageHeader, Segmented, SubjectChip, SubjectFilter } from '../components/common'
import { Icon } from '../components/ui/Icon'

export function Erreurs() {
  const { state, dispatch } = useStore()
  const [filter, setFilter] = useState('')
  const [view, setView] = useState<'arevoir' | 'toutes'>('arevoir')

  const mistakes = state.mistakes
    .filter((mistake) => !filter || mistake.subjectId === filter)
    .filter((mistake) => view === 'toutes' || !mistake.corrige)

  const open = state.mistakes.filter((m) => !m.corrige).length
  const corrected = state.mistakes.filter((m) => m.corrige).length

  return (
    <div>
      <PageHeader
        icon="alert"
        title="Mes erreurs"
        subtitle="Toutes les questions ratées, rassemblées au même endroit. Les reprendre est le moyen le plus rapide de gagner des points."
      />

      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Card className="py-3">
          <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted">À revoir</p>
          <p className="text-2xl font-extrabold text-rose-500">{open}</p>
        </Card>
        <Card className="py-3">
          <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted">Corrigées</p>
          <p className="text-2xl font-extrabold text-emerald-500">{corrected}</p>
        </Card>
        <Card className="col-span-2 py-3 sm:col-span-1">
          <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted">Progression</p>
          <p className="text-2xl font-extrabold text-ink">
            {state.mistakes.length === 0
              ? '—'
              : `${Math.round((corrected / state.mistakes.length) * 100)} %`}
          </p>
        </Card>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: 'arevoir', label: 'À revoir' },
            { value: 'toutes', label: 'Toutes' },
          ]}
        />
      </div>
      <div className="mb-3">
        <SubjectFilter subjects={state.subjects} value={filter} onChange={setFilter} />
      </div>

      {mistakes.length === 0 ? (
        <EmptyState
          icon="check"
          title={view === 'arevoir' ? 'Aucune erreur à revoir' : 'Aucune erreur enregistrée'}
          text={
            view === 'arevoir'
              ? 'Tout est corrigé. Continue comme ça !'
              : 'Les questions ratées pendant les quiz arrivent ici automatiquement.'
          }
          action={
            <Link
              to="/quiz"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary-ink"
            >
              Faire un quiz
            </Link>
          }
        />
      ) : (
        <div className="space-y-2.5">
          {mistakes.map((mistake) => {
            const subject = state.subjects.find((s) => s.id === mistake.subjectId)
            const chapter = state.chapters.find((c) => c.id === mistake.chapterId)
            return (
              <Card key={mistake.id} className={mistake.corrige ? 'opacity-60' : undefined}>
                <div className="flex items-start gap-3">
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'mistake/update',
                        payload: { id: mistake.id, patch: { corrige: !mistake.corrige } },
                      })
                    }
                    aria-label={mistake.corrige ? 'Remettre à revoir' : 'Marquer comme corrigée'}
                    className={cx(
                      'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition',
                      mistake.corrige
                        ? 'border-transparent bg-emerald-500 text-white'
                        : 'border-line-strong text-transparent hover:border-emerald-400',
                    )}
                  >
                    <Icon name="check" size={13} />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-1.5">
                      {subject && <SubjectChip subject={subject} />}
                      {chapter && (
                        <Link
                          to={`/chapitre/${chapter.id}`}
                          className="truncate text-[11px] font-semibold text-primary hover:underline"
                        >
                          {chapter.title}
                        </Link>
                      )}
                      <span className="text-[11px] text-muted">{formatShort(mistake.date)}</span>
                    </div>
                    <p className="text-sm font-semibold text-ink">{mistake.enonce}</p>
                    {mistake.maReponse && (
                      <p className="mt-1 text-xs text-rose-500">Ma réponse : {mistake.maReponse}</p>
                    )}
                    {mistake.bonneReponse && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">
                        Bonne réponse : {mistake.bonneReponse}
                      </p>
                    )}
                  </div>
                  <IconButton
                    icon="trash"
                    label="Supprimer"
                    size={15}
                    onClick={() => dispatch({ type: 'mistake/remove', payload: mistake.id })}
                  />
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {corrected > 0 && view === 'toutes' && (
        <Card className="mt-4">
          <SectionTitle icon="bulb" title="Un conseil" />
          <p className="text-xs leading-relaxed text-ink-soft">
            Repasse sur tes erreurs corrigées une semaine plus tard : c’est à ce moment-là que la
            mémoire se fixe pour de bon.
          </p>
          <Button
            variant="outline"
            size="sm"
            icon="refresh"
            className="mt-2.5"
            onClick={() => {
              for (const mistake of state.mistakes.filter((m) => m.corrige)) {
                dispatch({
                  type: 'mistake/update',
                  payload: { id: mistake.id, patch: { corrige: false } },
                })
              }
            }}
          >
            Tout remettre à revoir
          </Button>
        </Card>
      )}
    </div>
  )
}
