import type { ToneKey } from '../store/types'

/** Couleurs pleines des matières, utilisables dans les graphiques (SVG). */
export const TONE_COLORS: Record<ToneKey, string> = {
  violet: '#7c5cfc',
  rose: '#f43f5e',
  amber: '#f59e0b',
  emerald: '#10b981',
  sky: '#0ea5e9',
  teal: '#14b8a6',
  yellow: '#eab308',
  slate: '#64748b',
  pink: '#ec4899',
  indigo: '#6366f1',
  lime: '#84cc16',
  orange: '#f97316',
}

export const toneColor = (tone: ToneKey) => TONE_COLORS[tone] ?? TONE_COLORS.violet
