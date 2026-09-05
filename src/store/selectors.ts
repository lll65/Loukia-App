import type {
  AppState,
  Chapter,
  Grade,
  MasteryStatus,
  PlanKind,
  PlanTask,
  Reminder,
  Subject,
} from './types'
import {
  addDays,
  diffDays,
  fromISO,
  isoWeekday,
  lastNDays,
  MOIS_COURTS,
  todayISO,
  trimestreOf,
} from '../lib/dates'
import { clamp, round, sum, weightedAverage } from '../lib/utils'

/* ------------------------------------------------------------------ */
/* Maîtrise                                                            */
/* ------------------------------------------------------------------ */

export function masteryStatus(mastery: number): MasteryStatus {
  if (mastery >= 80) return 'acquis'
  if (mastery >= 60) return 'presque'
  if (mastery >= 35) return 'encours'
  return 'arevoir'
}

export const MASTERY_LABEL: Record<MasteryStatus, string> = {
  acquis: 'Acquis',
  presque: 'Presque acquis',
  encours: 'En cours',
  arevoir: 'À revoir',
}

export const MASTERY_COLOR: Record<MasteryStatus, string> = {
  acquis: '#22c55e',
  presque: '#38bdf8',
  encours: '#facc15',
  arevoir: '#f87171',
}

/* ------------------------------------------------------------------ */
/* Notes et moyennes                                                   */
/* ------------------------------------------------------------------ */

/** Note ramenée sur 20. */
export const gradeOn20 = (grade: Grade) => (grade.valeur / grade.bareme) * 20

export function subjectGrades(state: AppState, subjectId: string, trimestre?: number): Grade[] {
  return state.grades
    .filter((g) => g.subjectId === subjectId && (!trimestre || g.trimestre === trimestre))
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function subjectAverage(
  state: AppState,
  subjectId: string,
  trimestre?: number,
): number | null {
  const grades = subjectGrades(state, subjectId, trimestre)
  return weightedAverage(grades.map((g) => ({ value: gradeOn20(g), weight: g.coefficient })))
}

/** Moyenne générale, pondérée par le coefficient de chaque matière. */
export function generalAverage(state: AppState, trimestre?: number): number | null {
  const entries = state.subjects
    .map((subject) => ({
      value: subjectAverage(state, subject.id, trimestre),
      weight: subject.coefficient,
    }))
    .filter((entry): entry is { value: number; weight: number } => entry.value !== null)
  return weightedAverage(entries)
}

/** Moyenne générale mois par mois, pour le graphique d'évolution. */
export function averageTimeline(state: AppState): { label: string; value: number }[] {
  const byMonth = new Map<string, Grade[]>()
  for (const grade of state.grades) {
    const key = grade.date.slice(0, 7)
    byMonth.set(key, [...(byMonth.get(key) ?? []), grade])
  }
  const months = [...byMonth.keys()].sort()
  const cumulative: Grade[] = []
  return months.map((month) => {
    cumulative.push(...(byMonth.get(month) ?? []))
    const bySubject = new Map<string, Grade[]>()
    for (const grade of cumulative) {
      bySubject.set(grade.subjectId, [...(bySubject.get(grade.subjectId) ?? []), grade])
    }
    const entries: { value: number; weight: number }[] = []
    for (const [subjectId, grades] of bySubject) {
      const subject = state.subjects.find((s) => s.id === subjectId)
      const avg = weightedAverage(grades.map((g) => ({ value: gradeOn20(g), weight: g.coefficient })))
      if (avg !== null) entries.push({ value: avg, weight: subject?.coefficient ?? 1 })
    }
    const m = Number(month.slice(5, 7))
    return {
      label: MOIS_COURTS[m - 1],
      value: round(weightedAverage(entries) ?? 0, 2),
    }
  })
}

/**
 * Estimation de la moyenne à venir : on prolonge la tendance des dernières notes.
 * Volontairement prudente — l'estimation est bornée par ±2 points autour de la moyenne actuelle.
 */
export function projectedAverage(state: AppState): number | null {
  const current = generalAverage(state)
  if (current === null) return null
  const recent = [...state.grades].sort((a, b) => a.date.localeCompare(b.date))
  if (recent.length < 4) return round(current, 2)
  const half = Math.floor(recent.length / 2)
  const older = weightedAverage(
    recent.slice(0, half).map((g) => ({ value: gradeOn20(g), weight: g.coefficient })),
  )
  const newer = weightedAverage(
    recent.slice(half).map((g) => ({ value: gradeOn20(g), weight: g.coefficient })),
  )
  if (older === null || newer === null) return round(current, 2)
  const trend = clamp(newer - older, -2, 2)
  return round(clamp(current + trend * 0.6, 0, 20), 2)
}

/** Ce qu'il faudrait obtenir en moyenne pour atteindre la note visée. */
export function effortNeeded(state: AppState): number | null {
  const current = generalAverage(state)
  if (current === null) return null
  return round(state.settings.noteVisee - current, 2)
}

/* ------------------------------------------------------------------ */
/* Temps de travail                                                    */
/* ------------------------------------------------------------------ */

export function minutesOn(state: AppState, date: string): number {
  return sum(state.sessions.filter((s) => s.date === date).map((s) => s.minutes))
}

export function minutesBetween(state: AppState, from: string, to: string): number {
  return sum(
    state.sessions.filter((s) => s.date >= from && s.date <= to).map((s) => s.minutes),
  )
}

export function dailyMinutes(state: AppState, days: number): { date: string; minutes: number }[] {
  return lastNDays(days).map((date) => ({ date, minutes: minutesOn(state, date) }))
}

/** Nombre de jours consécutifs avec au moins une session de révision. */
export function streak(state: AppState): number {
  const worked = new Set(state.sessions.filter((s) => s.minutes > 0).map((s) => s.date))
  const today = todayISO()
  let cursor = worked.has(today) ? today : addDays(today, -1)
  if (!worked.has(cursor)) return 0
  let count = 0
  while (worked.has(cursor)) {
    count += 1
    cursor = addDays(cursor, -1)
  }
  return count
}

export function minutesBySubject(
  state: AppState,
  days = 30,
): { subject: Subject; minutes: number }[] {
  const from = addDays(todayISO(), -(days - 1))
  const totals = new Map<string, number>()
  for (const session of state.sessions) {
    if (session.date < from || !session.subjectId) continue
    totals.set(session.subjectId, (totals.get(session.subjectId) ?? 0) + session.minutes)
  }
  return state.subjects
    .map((subject) => ({ subject, minutes: totals.get(subject.id) ?? 0 }))
    .filter((entry) => entry.minutes > 0)
    .sort((a, b) => b.minutes - a.minutes)
}

/* ------------------------------------------------------------------ */
/* Rappels                                                             */
/* ------------------------------------------------------------------ */

export function upcomingReminders(state: AppState, days = 21): Reminder[] {
  const today = todayISO()
  const limit = addDays(today, days)
  return state.reminders
    .filter((r) => !r.fait && r.date >= today && r.date <= limit)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.heure ?? '').localeCompare(b.heure ?? ''))
}

export function nextControl(state: AppState): Reminder | null {
  return upcomingReminders(state, 120).find((r) => r.kind === 'controle') ?? null
}

export function lateReminders(state: AppState): Reminder[] {
  const today = todayISO()
  return state.reminders.filter((r) => !r.fait && r.date < today)
}

/* ------------------------------------------------------------------ */
/* Programme personnalisé                                              */
/* ------------------------------------------------------------------ */

interface Candidate {
  chapter: Chapter
  subject: Subject
  score: number
  reasons: string[]
}

/** Score de priorité d'un chapitre : plus il est élevé, plus il faut le réviser. */
function rankChapters(state: AppState, date: string): Candidate[] {
  const target = state.settings.noteVisee
  const lastStudied = new Map<string, string>()
  for (const session of state.sessions) {
    if (!session.chapterId) continue
    const previous = lastStudied.get(session.chapterId)
    if (!previous || session.date > previous) lastStudied.set(session.chapterId, session.date)
  }

  const candidates: Candidate[] = []
  for (const chapter of state.chapters) {
    if (chapter.archived) continue
    const subject = state.subjects.find((s) => s.id === chapter.subjectId)
    if (!subject || subject.archived) continue

    const reasons: string[] = []
    let score = 0

    // 1. Maîtrise du chapitre : c'est le critère principal.
    const gap = 100 - chapter.mastery
    score += gap * 0.9
    if (chapter.mastery < 40) reasons.push('chapitre encore fragile')

    // 2. Contrôle ou devoir à venir sur ce chapitre ou cette matière.
    for (const reminder of state.reminders) {
      if (reminder.fait) continue
      const delta = diffDays(date, reminder.date)
      if (delta < 0 || delta > 21) continue
      const matchesChapter = reminder.chapterId === chapter.id
      const matchesSubject = reminder.subjectId === subject.id
      if (!matchesChapter && !matchesSubject) continue
      const weight = reminder.kind === 'controle' ? 140 : 70
      const proximity = Math.max(0, 1 - delta / 21)
      score += weight * proximity * (matchesChapter ? 1 : 0.55)
      if (proximity > 0.5) {
        reasons.push(
          reminder.kind === 'controle'
            ? `contrôle dans ${delta} jour${delta > 1 ? 's' : ''}`
            : `devoir à rendre dans ${delta} jour${delta > 1 ? 's' : ''}`,
        )
      }
    }

    // 3. Matière en dessous de la note visée.
    const average = subjectAverage(state, subject.id)
    if (average !== null && average < target) {
      score += (target - average) * 12
      reasons.push(`moyenne de ${round(average, 1)} en ${subject.name.toLowerCase()}`)
    }

    // 4. Erreurs non corrigées.
    const mistakes = state.mistakes.filter((m) => m.chapterId === chapter.id && !m.corrige).length
    if (mistakes > 0) {
      score += Math.min(mistakes, 6) * 18
      reasons.push(`${mistakes} erreur${mistakes > 1 ? 's' : ''} à revoir`)
    }

    // 5. Chapitre pas revu depuis longtemps.
    const last = lastStudied.get(chapter.id)
    const daysSince = last ? diffDays(last, date) : 999
    score += Math.min(daysSince, 30) * 1.6
    if (daysSince > 20 && last) reasons.push('pas revu depuis longtemps')

    // 6. Coefficient de la matière.
    score *= 0.85 + subject.coefficient * 0.12

    candidates.push({ chapter, subject, score, reasons })
  }

  return candidates.sort((a, b) => b.score - a.score)
}

const KIND_LABEL: Record<PlanKind, string> = {
  cours: 'Lire le cours',
  fiche: 'Revoir la fiche',
  quiz: 'Faire le quiz',
  exercices: 'Faire les exercices',
  erreurs: 'Corriger mes erreurs',
  video: 'Regarder la vidéo',
  libre: 'Révision libre',
}

function taskFor(state: AppState, candidate: Candidate): { kind: PlanKind; minutes: number } {
  const { chapter } = candidate
  const openMistakes = state.mistakes.filter((m) => m.chapterId === chapter.id && !m.corrige).length
  if (openMistakes >= 3) return { kind: 'erreurs', minutes: 20 }
  if (chapter.mastery < 35) return { kind: 'cours', minutes: 30 }
  if (chapter.mastery < 60) return { kind: 'fiche', minutes: 20 }
  if (chapter.mastery < 80) return { kind: 'quiz', minutes: 15 }
  const hasExercises = state.exercises.some((e) => e.chapterId === chapter.id)
  return hasExercises ? { kind: 'exercices', minutes: 25 } : { kind: 'quiz', minutes: 15 }
}

/** Budget de révision disponible pour une date donnée. */
export function dailyBudget(state: AppState, date: string): number {
  const weekday = isoWeekday(date)
  if (state.settings.joursRevision.includes(weekday)) return state.settings.tempsParJour
  // Un jour « off » garde quand même une petite marge si un contrôle approche.
  const urgent = state.reminders.some(
    (r) => !r.fait && r.kind === 'controle' && diffDays(date, r.date) >= 0 && diffDays(date, r.date) <= 3,
  )
  return urgent ? Math.round(state.settings.tempsParJour * 0.6) : 0
}

/**
 * Construit le programme d'une journée : on prend les chapitres les plus prioritaires
 * jusqu'à remplir le temps disponible, sans jamais mettre deux fois la même matière
 * d'affilée tant qu'il reste d'autres matières intéressantes.
 */
export function generatePlan(state: AppState, date: string, force = false): PlanTask[] {
  // `force` sert quand on demande explicitement un programme un jour de repos.
  const budget = dailyBudget(state, date) || (force ? state.settings.tempsParJour : 0)
  if (budget <= 0) return []

  const ranked = rankChapters(state, date)
  const tasks: PlanTask[] = []
  const usedChapters = new Set<string>()
  let remaining = budget
  let lastSubject = ''

  const pick = (allowSameSubject: boolean) => {
    for (const candidate of ranked) {
      if (remaining <= 8) return
      if (usedChapters.has(candidate.chapter.id)) continue
      if (!allowSameSubject && candidate.subject.id === lastSubject) continue
      const { kind, minutes } = taskFor(state, candidate)
      const duration = Math.min(minutes, remaining)
      if (duration < 10) continue
      tasks.push({
        id: `${date}-${candidate.chapter.id}-${kind}`,
        date,
        subjectId: candidate.subject.id,
        chapterId: candidate.chapter.id,
        titre: `${KIND_LABEL[kind]} — ${candidate.chapter.title}`,
        minutes: duration,
        kind,
        raison: candidate.reasons[0] ?? 'à consolider',
        fait: false,
        auto: true,
      })
      usedChapters.add(candidate.chapter.id)
      lastSubject = candidate.subject.id
      remaining -= duration
    }
  }

  pick(false)
  if (remaining > 15) pick(true)
  return tasks
}

export function planFor(state: AppState, date: string): PlanTask[] {
  return state.plan
    .filter((task) => task.date === date)
    .sort((a, b) => Number(a.fait) - Number(b.fait))
}

/** Suggestion affichée sur l'accueil. */
export function suggestion(state: AppState): { titre: string; texte: string; chapterId?: string } {
  const ranked = rankChapters(state, todayISO())
  const top = ranked[0]
  if (!top) {
    return {
      titre: 'Bienvenue !',
      texte: 'Ajoute tes matières et tes chapitres pour recevoir des suggestions personnalisées.',
    }
  }
  const mistakes = state.mistakes.filter((m) => m.chapterId === top.chapter.id && !m.corrige).length
  if (mistakes >= 2) {
    return {
      titre: 'Suggestion du jour',
      texte: `Tu as ${mistakes} erreurs non corrigées sur le chapitre « ${top.chapter.title} ». Reprends-les aujourd’hui, c’est le moyen le plus rapide de gagner des points.`,
      chapterId: top.chapter.id,
    }
  }
  const control = state.reminders.find(
    (r) =>
      !r.fait &&
      r.kind === 'controle' &&
      (r.chapterId === top.chapter.id || r.subjectId === top.subject.id) &&
      diffDays(todayISO(), r.date) >= 0,
  )
  if (control) {
    const days = diffDays(todayISO(), control.date)
    return {
      titre: 'Suggestion du jour',
      texte: `Contrôle de ${top.subject.name.toLowerCase()} ${
        days === 0 ? "aujourd'hui" : days === 1 ? 'demain' : `dans ${days} jours`
      }. Commence par « ${top.chapter.title} » : c’est le chapitre le moins solide.`,
      chapterId: top.chapter.id,
    }
  }
  return {
    titre: 'Suggestion du jour',
    texte: `Le chapitre « ${top.chapter.title} » en ${top.subject.name.toLowerCase()} est à ${top.chapter.mastery} % de maîtrise. Une session de 20 minutes suffirait à le faire monter.`,
    chapterId: top.chapter.id,
  }
}

/* ------------------------------------------------------------------ */
/* Badges                                                              */
/* ------------------------------------------------------------------ */

export interface Badge {
  id: string
  emoji: string
  titre: string
  description: string
  obtenu: boolean
}

export function badges(state: AppState): Badge[] {
  const totalMinutes = sum(state.sessions.map((s) => s.minutes))
  const current = streak(state)
  const acquired = state.chapters.filter((c) => masteryStatus(c.mastery) === 'acquis').length
  const perfectQuiz = state.attempts.some((a) => a.total > 0 && a.score === a.total)
  const average = generalAverage(state)
  const corrected = state.mistakes.filter((m) => m.corrige).length

  return [
    {
      id: 'premiere-session',
      emoji: '🌱',
      titre: 'Premier pas',
      description: 'Terminer une première session de révision',
      obtenu: state.sessions.length > 0,
    },
    {
      id: 'serie-3',
      emoji: '🔥',
      titre: 'Série de 3 jours',
      description: 'Réviser 3 jours de suite',
      obtenu: current >= 3,
    },
    {
      id: 'serie-7',
      emoji: '⚡',
      titre: 'Série de 7 jours',
      description: 'Réviser une semaine entière sans interruption',
      obtenu: current >= 7,
    },
    {
      id: 'dix-heures',
      emoji: '⏳',
      titre: '10 heures cumulées',
      description: 'Atteindre 10 heures de révision au total',
      obtenu: totalMinutes >= 600,
    },
    {
      id: 'quiz-parfait',
      emoji: '🎯',
      titre: 'Sans faute',
      description: 'Obtenir 100 % à un quiz',
      obtenu: perfectQuiz,
    },
    {
      id: 'cinq-chapitres',
      emoji: '📚',
      titre: '5 chapitres acquis',
      description: 'Atteindre 80 % de maîtrise sur 5 chapitres',
      obtenu: acquired >= 5,
    },
    {
      id: 'erreurs',
      emoji: '🧠',
      titre: 'Apprendre de ses erreurs',
      description: 'Corriger 10 erreurs enregistrées',
      obtenu: corrected >= 10,
    },
    {
      id: 'objectif',
      emoji: '🏆',
      titre: 'Objectif atteint',
      description: 'Atteindre la moyenne visée',
      obtenu: average !== null && average >= state.settings.noteVisee,
    },
  ]
}

/* ------------------------------------------------------------------ */
/* Divers                                                              */
/* ------------------------------------------------------------------ */

/** Un chapitre est « commencé » dès qu'il a été testé ou auto-évalué. */
export function chapterStarted(state: AppState, chapterId: string): boolean {
  if (state.attempts.some((a) => a.chapterId === chapterId)) return true
  const chapter = state.chapters.find((c) => c.id === chapterId)
  return Boolean(chapter?.masteryManual) || (chapter?.mastery ?? 0) > 0
}

/**
 * Chapitres les moins solides, en alternant les matières : sans cela, une matière
 * qui a beaucoup de chapitres occuperait toute la liste.
 */
export function chaptersToReview(state: AppState, limit = 6): Chapter[] {
  const bySubject = new Map<string, Chapter[]>()
  for (const chapter of state.chapters) {
    if (chapter.archived || chapter.mastery >= 60) continue
    bySubject.set(chapter.subjectId, [...(bySubject.get(chapter.subjectId) ?? []), chapter])
  }
  for (const chapters of bySubject.values()) chapters.sort((a, b) => a.mastery - b.mastery)

  const queues = [...bySubject.values()]
  const out: Chapter[] = []
  let round = 0
  while (out.length < limit && queues.some((queue) => queue.length > round)) {
    for (const queue of queues) {
      if (out.length >= limit) break
      const chapter = queue[round]
      if (chapter) out.push(chapter)
    }
    round += 1
  }
  return out
}

export function chaptersOf(state: AppState, subjectId: string): Chapter[] {
  return state.chapters
    .filter((c) => c.subjectId === subjectId && !c.archived)
    .sort((a, b) => a.order - b.order)
}

export function subjectOf(state: AppState, subjectId: string): Subject | undefined {
  return state.subjects.find((s) => s.id === subjectId)
}

export function chapterOf(state: AppState, chapterId: string): Chapter | undefined {
  return state.chapters.find((c) => c.id === chapterId)
}

export function slotsForDay(state: AppState, day: number) {
  return state.slots
    .filter((slot) => slot.day === day)
    .sort((a, b) => a.start.localeCompare(b.start))
}

export function currentTrimestre(): 1 | 2 | 3 {
  return trimestreOf(todayISO())
}

export function daysUntilObjective(state: AppState): number {
  return Math.max(0, diffDays(todayISO(), state.settings.dateObjectif))
}

export function schoolYearLabel(state: AppState): string {
  const start = fromISO(state.installedAt)
  const year = start.getMonth() + 1 >= 9 ? start.getFullYear() : start.getFullYear() - 1
  return `${year}–${year + 1}`
}
