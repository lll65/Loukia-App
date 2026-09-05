import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '../../lib/utils'
import { Icon, type IconName } from './Icon'

/* ------------------------------------------------------------------ */
/* Cartes                                                              */
/* ------------------------------------------------------------------ */

export function Card({
  children,
  className,
  padded = true,
  ...rest
}: { children: ReactNode; className?: string; padded?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('card', padded && 'p-4 sm:p-5', className)} {...rest}>
      {children}
    </div>
  )
}

export function SectionTitle({
  icon,
  title,
  subtitle,
  action,
}: {
  icon?: IconName
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div className="min-w-0">
        <h2 className="flex items-start gap-2 text-[15px] font-bold text-ink">
          {icon && <Icon name={icon} size={17} className="mt-0.5 shrink-0 text-primary" />}
          <span>{title}</span>
        </h2>
        {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Boutons                                                             */
/* ------------------------------------------------------------------ */

type Variant = 'primary' | 'soft' | 'ghost' | 'outline' | 'danger'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:brightness-110 shadow-sm',
  soft: 'bg-primary-soft text-primary-ink hover:brightness-95',
  ghost: 'text-ink-soft hover:bg-surface-2',
  outline: 'border border-line-strong text-ink hover:bg-surface-2',
  danger: 'bg-rose-500/10 text-rose-600 dark:text-rose-300 hover:bg-rose-500/20',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  icon?: IconName
  /** Icône placée après le texte (flèche « suivant », par exemple). */
  iconRight?: IconName
  size?: 'sm' | 'md'
  full?: boolean
}

export function Button({
  variant = 'primary',
  icon,
  iconRight,
  size = 'md',
  full,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cx(
        'inline-flex items-center justify-center gap-1.5 rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-45',
        size === 'sm' ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-sm',
        full && 'w-full',
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 14 : 16} />}
    </button>
  )
}

export function IconButton({
  icon,
  label,
  className,
  size = 18,
  ...rest
}: { icon: IconName; label: string; size?: number } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cx(
        'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink',
        className,
      )}
      {...rest}
    >
      <Icon name={icon} size={size} />
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Étiquettes                                                          */
/* ------------------------------------------------------------------ */

export function Pill({
  children,
  tone,
  className,
}: {
  children: ReactNode
  tone?: string
  className?: string
}) {
  return (
    <span
      data-tone={tone}
      className={cx(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold',
        tone
          ? 'bg-[var(--tone-bg)] text-[var(--tone-fg)]'
          : 'bg-primary-soft text-primary-ink',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Dot({ color, className }: { color: string; className?: string }) {
  return (
    <span
      className={cx('inline-block h-2 w-2 shrink-0 rounded-full', className)}
      style={{ background: color }}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Formulaires                                                         */
/* ------------------------------------------------------------------ */

export function Label({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <span className="mb-1 block text-xs font-semibold text-ink-soft">
      {children}
      {hint && <span className="ml-1 font-normal text-muted">{hint}</span>}
    </span>
  )
}

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx('field', className)} {...rest} />
}

export function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cx('field appearance-none pr-8', className)} {...rest}>
      {children}
    </select>
  )
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx('field resize-y', className)} {...rest} />
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (value: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cx(
        'relative h-6 w-11 shrink-0 rounded-full transition',
        checked ? 'bg-primary' : 'bg-line-strong',
      )}
    >
      <span
        className={cx(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all',
          checked ? 'left-[22px]' : 'left-0.5',
        )}
      />
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Divers                                                              */
/* ------------------------------------------------------------------ */

export function EmptyState({
  icon = 'sparkle',
  title,
  text,
  action,
}: {
  icon?: IconName
  title: string
  text?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-line-strong px-6 py-9 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary-ink">
        <Icon name={icon} size={20} />
      </span>
      <p className="text-sm font-semibold text-ink">{title}</p>
      {text && <p className="max-w-xs text-xs leading-relaxed text-muted">{text}</p>}
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}

export function ProgressBar({
  value,
  color,
  className,
  height = 8,
}: {
  value: number
  color?: string
  className?: string
  height?: number
}) {
  return (
    <div
      className={cx('w-full overflow-hidden rounded-full bg-line', className)}
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color ?? 'var(--app-primary)' }}
      />
    </div>
  )
}

export function Stat({
  label,
  value,
  hint,
  icon,
  tone,
}: {
  label: string
  value: ReactNode
  hint?: string
  icon?: IconName
  tone?: string
}) {
  return (
    <div data-tone={tone} className="rounded-2xl border border-line bg-surface-2 p-3">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
        {icon && <Icon name={icon} size={13} />}
        <span className="truncate">{label}</span>
      </div>
      <div
        className="mt-1 text-xl font-extrabold"
        style={tone ? { color: 'var(--tone-fg)' } : undefined}
      >
        {value}
      </div>
      {hint && <div className="mt-0.5 text-[11px] text-muted">{hint}</div>}
    </div>
  )
}

export function LinkRow({
  to,
  icon,
  title,
  subtitle,
  right,
  tone,
}: {
  to: string
  icon?: IconName
  title: string
  subtitle?: string
  right?: ReactNode
  tone?: string
}) {
  return (
    <Link
      to={to}
      data-tone={tone}
      className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition hover:bg-surface-2"
    >
      {icon && (
        <span
          className={cx(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
            tone ? 'bg-[var(--tone-bg)] text-[var(--tone-fg)]' : 'bg-primary-soft text-primary-ink',
          )}
        >
          <Icon name={icon} size={16} />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-ink">{title}</span>
        {subtitle && <span className="block truncate text-xs text-muted">{subtitle}</span>}
      </span>
      {right ?? <Icon name="chevronRight" size={16} className="shrink-0 text-muted" />}
    </Link>
  )
}
