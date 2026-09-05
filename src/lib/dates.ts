export const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
export const JOURS_COURTS = ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.']
export const MOIS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
]
export const MOIS_COURTS = [
  'Janv.',
  'Févr.',
  'Mars',
  'Avr.',
  'Mai',
  'Juin',
  'Juil.',
  'Août',
  'Sept.',
  'Oct.',
  'Nov.',
  'Déc.',
]

/** Date du jour au format yyyy-mm-dd, en heure locale. */
export function todayISO(): string {
  return toISO(new Date())
}

export function toISO(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function fromISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

export function addDays(iso: string, days: number): string {
  const date = fromISO(iso)
  date.setDate(date.getDate() + days)
  return toISO(date)
}

/** 1 = lundi … 7 = dimanche */
export function isoWeekday(iso: string): number {
  const day = fromISO(iso).getDay()
  return day === 0 ? 7 : day
}

export function diffDays(fromIso: string, toIso: string): number {
  const a = fromISO(fromIso).getTime()
  const b = fromISO(toIso).getTime()
  return Math.round((b - a) / 86_400_000)
}

export function formatLong(iso: string): string {
  const d = fromISO(iso)
  return `${JOURS[(d.getDay() + 6) % 7]} ${d.getDate()} ${MOIS[d.getMonth()]}`
}

export function formatShort(iso: string): string {
  const d = fromISO(iso)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
}

/** « Aujourd'hui », « Demain », « Dans 3 jours », « Il y a 2 jours »… */
export function relativeLabel(iso: string, from = todayISO()): string {
  const delta = diffDays(from, iso)
  if (delta === 0) return "Aujourd'hui"
  if (delta === 1) return 'Demain'
  if (delta === -1) return 'Hier'
  if (delta > 1) return `Dans ${delta} jours`
  return `Il y a ${-delta} jours`
}

/** Début (lundi) de la semaine contenant `iso`. */
export function startOfWeek(iso: string): string {
  return addDays(iso, -(isoWeekday(iso) - 1))
}

export function weekDays(iso: string, count = 7): string[] {
  const start = startOfWeek(iso)
  return Array.from({ length: count }, (_, i) => addDays(start, i))
}

export function lastNDays(count: number, from = todayISO()): string[] {
  return Array.from({ length: count }, (_, i) => addDays(from, i - count + 1))
}

export function minutesFromTime(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return (h || 0) * 60 + (m || 0)
}

export function timeFromMinutes(minutes: number): string {
  const m = Math.max(0, Math.round(minutes))
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

/** Trimestre scolaire déduit du mois (approximation française usuelle). */
export function trimestreOf(iso: string): 1 | 2 | 3 {
  const m = fromISO(iso).getMonth() + 1
  if (m >= 9) return 1
  if (m <= 3) return 2
  return 3
}
