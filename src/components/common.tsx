import { Link } from 'react-router-dom'
import { cx } from '../lib/utils'
import type { Chapter, Subject } from '../store/types'
import { chapterStarted, MASTERY_COLOR, MASTERY_LABEL, masteryStatus } from '../store/selectors'
import { useStore } from '../store/StoreContext'
import { Icon, type IconName } from './ui/Icon'
import { ProgressBar } from './ui/primitives'

export function SubjectAvatar({ subject, size = 36 }: { subject: Subject; size?: number }) {
  return (
    <span
      data-tone={subject.tone}
      className="flex shrink-0 items-center justify-center rounded-xl bg-[var(--tone-bg)]"
      style={{ width: size, height: size, fontSize: size * 0.46 }}
      aria-hidden="true"
    >
      {subject.emoji}
    </span>
  )
}

export function SubjectChip({ subject, className }: { subject: Subject; className?: string }) {
  return (
    <span
      data-tone={subject.tone}
      className={cx(
        'inline-flex items-center gap-1 rounded-full bg-[var(--tone-bg)] px-2 py-0.5 text-[11px] font-semibold text-[var(--tone-fg)]',
        className,
      )}
    >
      <span aria-hidden="true">{subject.emoji}</span>
      {subject.short}
    </span>
  )
}

export function MasteryBadge({ mastery, started = true }: { mastery: number; started?: boolean }) {
  if (!started) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-semibold text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
        Pas encore travaillé
      </span>
    )
  }
  const status = masteryStatus(mastery)
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold"
      style={{ background: `${MASTERY_COLOR[status]}22`, color: MASTERY_COLOR[status] }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: MASTERY_COLOR[status] }} />
      {MASTERY_LABEL[status]}
    </span>
  )
}

export function MasteryLegend() {
  const items = (['acquis', 'presque', 'encours', 'arevoir'] as const).map((status) => ({
    status,
    label: MASTERY_LABEL[status],
    color: MASTERY_COLOR[status],
  }))
  return (
    <div className="rounded-2xl border border-line bg-surface-2 p-3">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted">
        Niveau de maîtrise
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.status} className="flex items-center gap-2 text-xs text-ink-soft">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ChapterRow({ chapter, subject }: { chapter: Chapter; subject: Subject }) {
  const { state } = useStore()
  const started = chapterStarted(state, chapter.id)
  const color = started ? MASTERY_COLOR[masteryStatus(chapter.mastery)] : 'var(--app-line-strong)'
  return (
    <Link
      to={`/chapitre/${chapter.id}`}
      data-tone={subject.tone}
      className="block rounded-2xl border border-line bg-surface p-3 transition hover:border-primary/40 hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--tone-bg)] text-[11px] font-bold text-[var(--tone-fg)]">
          {chapter.order + 1}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-ink">{chapter.title}</span>
        </span>
        <span
          className="shrink-0 text-xs font-bold"
          style={{ color: started ? color : 'var(--app-muted)' }}
        >
          {started ? `${chapter.mastery} %` : 'à démarrer'}
        </span>
        <Icon name="chevronRight" size={15} className="shrink-0 text-muted" />
      </div>
      <ProgressBar value={chapter.mastery} color={color} className="mt-2" height={6} />
    </Link>
  )
}

export function PageHeader({
  title,
  subtitle,
  icon,
  action,
  back,
}: {
  title: string
  subtitle?: string
  icon?: IconName
  action?: React.ReactNode
  back?: { to: string; label: string }
}) {
  return (
    <div className="mb-4">
      {back && (
        <Link
          to={back.to}
          className="mb-2 inline-flex items-center gap-1 text-xs font-semibold text-muted transition hover:text-primary"
        >
          <Icon name="arrowLeft" size={14} />
          {back.label}
        </Link>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-balance text-ink sm:text-xl">
            {icon && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-ink">
                <Icon name={icon} size={17} />
              </span>
            )}
            <span>{title}</span>
          </h1>
          {subtitle && <p className="mt-1 text-xs leading-relaxed text-muted">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  )
}

export function SubjectFilter({
  subjects,
  value,
  onChange,
}: {
  subjects: Subject[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
      <button
        onClick={() => onChange('')}
        className={cx(
          'shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition',
          value === '' ? 'bg-primary text-white' : 'bg-surface-2 text-ink-soft hover:bg-line',
        )}
      >
        Toutes
      </button>
      {subjects.map((subject) => (
        <button
          key={subject.id}
          data-tone={subject.tone}
          onClick={() => onChange(subject.id)}
          className={cx(
            'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition',
            value === subject.id
              ? 'bg-[var(--tone)] text-white'
              : 'bg-[var(--tone-bg)] text-[var(--tone-fg)]',
          )}
        >
          <span aria-hidden="true">{subject.emoji}</span>
          {subject.short}
        </button>
      ))}
    </div>
  )
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div className="inline-flex rounded-xl bg-surface-2 p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cx(
            'rounded-lg px-3 py-1.5 text-xs font-semibold transition',
            value === option.value ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
