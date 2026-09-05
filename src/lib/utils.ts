export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

let counter = 0
export function uid(prefix = 'id'): string {
  counter += 1
  return `${prefix}_${Date.now().toString(36)}${counter.toString(36)}${Math.random()
    .toString(36)
    .slice(2, 6)}`
}

export const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

export const sum = (values: number[]) => values.reduce((a, b) => a + b, 0)

export const round = (v: number, decimals = 1) => {
  const f = 10 ** decimals
  return Math.round(v * f) / f
}

/** Moyenne pondérée, ou `null` si la liste est vide. */
export function weightedAverage(items: { value: number; weight: number }[]): number | null {
  const totalWeight = sum(items.map((i) => i.weight))
  if (totalWeight === 0) return null
  return sum(items.map((i) => i.value * i.weight)) / totalWeight
}

/** Normalise une réponse écrite pour la comparer sans se soucier de la casse ni des accents. */
export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[«»"'’]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[.;!?]+$/, '')
    .replace(/,/g, '.')
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function groupBy<T, K extends string>(items: T[], key: (item: T) => K): Record<K, T[]> {
  const out = {} as Record<K, T[]>
  for (const item of items) {
    const k = key(item)
    ;(out[k] ||= []).push(item)
  }
  return out
}

export function formatMinutes(minutes: number): string {
  const m = Math.max(0, Math.round(minutes))
  const h = Math.floor(m / 60)
  const rest = m % 60
  if (h === 0) return `${rest} min`
  if (rest === 0) return `${h} h`
  return `${h} h ${String(rest).padStart(2, '0')}`
}

export function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.round(seconds))
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

export function formatGrade(value: number, bareme = 20): string {
  return `${round(value, 2).toString().replace('.', ',')}/${bareme}`
}
