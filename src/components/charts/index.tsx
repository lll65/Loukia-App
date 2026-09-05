import { useId } from 'react'
import { cx, formatMinutes, round } from '../../lib/utils'

/* ------------------------------------------------------------------ */
/* Courbe                                                              */
/* ------------------------------------------------------------------ */

export function LineChart({
  points,
  height = 130,
  color = 'var(--app-primary)',
  suffix = '',
  target,
}: {
  points: { label: string; value: number }[]
  height?: number
  color?: string
  suffix?: string
  target?: number
}) {
  const gradientId = useId()
  if (points.length === 0) return null

  const width = 320
  const padX = 18
  const padTop = 14
  const padBottom = 22
  const values = points.map((p) => p.value)
  const candidates = target !== undefined ? [...values, target] : values
  const rawMin = Math.min(...candidates)
  const rawMax = Math.max(...candidates)
  const span = Math.max(rawMax - rawMin, 1)
  const min = rawMin - span * 0.15
  const max = rawMax + span * 0.15

  const x = (index: number) =>
    points.length === 1
      ? width / 2
      : padX + (index * (width - padX * 2)) / (points.length - 1)
  const y = (value: number) =>
    padTop + (1 - (value - min) / (max - min)) * (height - padTop - padBottom)

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(p.value)}`).join(' ')
  const area = `${line} L${x(points.length - 1)},${height - padBottom} L${x(0)},${height - padBottom} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Évolution">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {target !== undefined && (
        <>
          <line
            x1={padX}
            x2={width - padX}
            y1={y(target)}
            y2={y(target)}
            stroke="var(--app-accent)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.7"
          />
          <text x={width - padX} y={y(target) - 4} textAnchor="end" className="fill-[var(--app-accent)] text-[8px] font-semibold">
            objectif {target}
          </text>
        </>
      )}
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((point, i) => (
        <g key={`${point.label}-${i}`}>
          <circle cx={x(i)} cy={y(point.value)} r="3.2" fill="var(--app-surface)" stroke={color} strokeWidth="2" />
          <text x={x(i)} y={height - 6} textAnchor="middle" className="fill-[var(--app-muted)] text-[8.5px]">
            {point.label}
          </text>
          <title>{`${point.label} : ${round(point.value, 2)}${suffix}`}</title>
        </g>
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Barres                                                              */
/* ------------------------------------------------------------------ */

export function BarChart({
  bars,
  height = 120,
  unit = 'min',
}: {
  bars: { label: string; value: number; color?: string }[]
  height?: number
  unit?: string
}) {
  const max = Math.max(...bars.map((b) => b.value), 1)
  const LABEL_HEIGHT = 16
  const area = Math.max(20, height - LABEL_HEIGHT)

  // Les hauteurs sont calculées en pixels : un pourcentage ne se résout pas
  // de façon fiable à l'intérieur d'un conteneur flex.
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {bars.map((bar, i) => (
        <div key={`${bar.label}-${i}`} className="flex min-w-0 flex-1 flex-col items-center">
          <div className="flex w-full items-end" style={{ height: area }}>
            <div
              className="w-full rounded-t-md transition-[height] duration-500"
              style={{
                height: Math.max(3, Math.round((bar.value / max) * area)),
                background: bar.color ?? 'var(--app-primary)',
                opacity: bar.value === 0 ? 0.25 : 1,
              }}
              title={`${bar.label} : ${unit === 'min' ? formatMinutes(bar.value) : `${round(bar.value, 1)} ${unit}`}`}
            />
          </div>
          <span
            className="w-full truncate text-center text-[9.5px] leading-4 text-muted"
            style={{ height: LABEL_HEIGHT }}
          >
            {bar.label}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Anneau                                                              */
/* ------------------------------------------------------------------ */

export function DonutChart({
  slices,
  size = 132,
  thickness = 18,
  center,
}: {
  slices: { label: string; value: number; color: string }[]
  size?: number
  thickness?: number
  center?: { top: string; bottom?: string }
}) {
  const total = slices.reduce((acc, slice) => acc + slice.value, 0)
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--app-line)"
          strokeWidth={thickness}
        />
        {total > 0 &&
          slices.map((slice) => {
            const length = (slice.value / total) * circumference
            const element = (
              <circle
                key={slice.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={slice.color}
                strokeWidth={thickness}
                strokeDasharray={`${Math.max(length - 2, 0)} ${circumference}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
              >
                <title>{`${slice.label} : ${Math.round((slice.value / total) * 100)} %`}</title>
              </circle>
            )
            offset += length
            return element
          })}
      </svg>
      {center && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-extrabold text-ink">{center.top}</span>
          {center.bottom && <span className="text-[10px] text-muted">{center.bottom}</span>}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Jauge circulaire                                                    */
/* ------------------------------------------------------------------ */

export function ProgressRing({
  value,
  size = 78,
  thickness = 8,
  color = 'var(--app-primary)',
  label,
  sublabel,
  className,
}: {
  value: number
  size?: number
  thickness?: number
  color?: string
  label?: string
  sublabel?: string
  className?: string
}) {
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cx('relative shrink-0', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--app-line)" strokeWidth={thickness} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped / 100)}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-tight">
        <span className="text-sm font-extrabold text-ink">{label ?? `${Math.round(clamped)} %`}</span>
        {sublabel && <span className="text-[9px] text-muted">{sublabel}</span>}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mini-courbe                                                         */
/* ------------------------------------------------------------------ */

export function Sparkline({
  values,
  color = 'var(--app-primary)',
  width = 96,
  height = 28,
}: {
  values: number[]
  color?: string
  width?: number
  height?: number
}) {
  if (values.length < 2) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = Math.max(max - min, 0.5)
  const path = values
    .map((value, i) => {
      const x = (i / (values.length - 1)) * width
      const y = height - 2 - ((value - min) / span) * (height - 4)
      return `${i === 0 ? 'M' : 'L'}${round(x, 2)},${round(y, 2)}`
    })
    .join(' ')
  return (
    <svg width={width} height={height} className="overflow-visible">
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
