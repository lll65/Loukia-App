import type { AppState, Grade, Reminder, StudySession } from '../store/types'
import { addDays, todayISO, trimestreOf } from '../lib/dates'
import { uid } from '../lib/utils'

/**
 * Données d'exemple : elles permettent de voir immédiatement à quoi ressemblent
 * les notes, les statistiques et le programme. Tout est supprimable en un clic
 * depuis les paramètres.
 */
const GRADE_SEED: Array<[string, string, number, number, number]> = [
  ['maths', 'Contrôle — Nombres et calculs', 15.5, 1, -46],
  ['maths', 'Devoir maison — Puissances', 17, 0.5, -32],
  ['maths', 'Contrôle — Expressions algébriques', 14, 1, -18],
  ['francais', 'Rédaction — Se raconter', 16, 1, -40],
  ['francais', 'Dictée', 13.5, 0.5, -25],
  ['francais', 'Contrôle de grammaire', 15, 1, -11],
  ['histoire', 'Contrôle — Première Guerre mondiale', 14, 1, -37],
  ['histoire', 'Développement construit', 12.5, 1, -14],
  ['svt', 'Contrôle — Génétique', 17, 1, -29],
  ['physique', 'Contrôle — Atomes et ions', 15, 1, -33],
  ['physique', 'TP noté — Circuits', 16.5, 0.5, -9],
  ['anglais', 'Compréhension orale', 16, 1, -35],
  ['anglais', 'Expression écrite', 15.5, 1, -12],
  ['espagnol', 'Contrôle — Ser / Estar', 14, 1, -21],
  ['techno', 'Projet — Objet connecté', 18, 1, -16],
  ['arts', 'Production plastique', 17, 1, -24],
  ['musique', 'Écoute et analyse', 16, 1, -19],
]

const REMINDER_SEED: Array<[string, string, string, Reminder['kind'], number]> = [
  ['Contrôle de maths — Fonctions', 'maths', 'maths-fonctions', 'controle', 7],
  ['Devoir de français à rendre', 'francais', 'fr-methode', 'devoir', 3],
  ['Réviser le chapitre de SVT', 'svt', 'svt-genetique', 'revision', 1],
  ['Contrôle d’histoire — Totalitarismes', 'histoire', 'hist-totalitarismes', 'controle', 12],
]

export function demoGrades(): Grade[] {
  const today = todayISO()
  return GRADE_SEED.map(([subjectId, intitule, valeur, coefficient, offset]) => {
    const date = addDays(today, offset)
    return {
      id: uid('grade'),
      subjectId,
      intitule,
      valeur,
      bareme: 20,
      coefficient,
      date,
      kind: intitule.toLowerCase().includes('devoir')
        ? 'devoir'
        : intitule.toLowerCase().includes('oral') || intitule.toLowerCase().includes('orale')
          ? 'oral'
          : 'controle',
      trimestre: trimestreOf(date),
    }
  })
}

export function demoSessions(): StudySession[] {
  const today = todayISO()
  const subjects = ['maths', 'francais', 'histoire', 'svt', 'physique', 'anglais']
  const sessions: StudySession[] = []
  // 21 derniers jours, avec une intensité variable et deux jours de repos par semaine.
  for (let i = 20; i >= 0; i--) {
    const date = addDays(today, -i)
    const weekday = new Date(date).getDay()
    if (weekday === 0 && i % 3 !== 0) continue
    const count = 1 + ((i * 7) % 3)
    for (let k = 0; k < count; k++) {
      sessions.push({
        id: uid('sess'),
        date,
        minutes: 20 + ((i * 13 + k * 17) % 40),
        subjectId: subjects[(i + k) % subjects.length],
        source: k === 0 ? 'pomodoro' : 'manuel',
      })
    }
  }
  return sessions
}

export function demoReminders(): Reminder[] {
  const today = todayISO()
  return REMINDER_SEED.map(([titre, subjectId, chapterId, kind, offset]) => ({
    id: uid('rem'),
    titre,
    subjectId,
    chapterId,
    date: addDays(today, offset),
    heure: kind === 'controle' ? '08:00' : '13:30',
    kind,
    fait: false,
    alerteJours: 2,
  }))
}

export function withDemoData(state: AppState): AppState {
  return {
    ...state,
    grades: demoGrades(),
    sessions: demoSessions(),
    reminders: demoReminders(),
  }
}
