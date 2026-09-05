/** Couleurs disponibles pour les matières (définies dans index.css). */
export type ToneKey =
  | 'violet'
  | 'rose'
  | 'amber'
  | 'emerald'
  | 'sky'
  | 'teal'
  | 'yellow'
  | 'slate'
  | 'pink'
  | 'indigo'
  | 'lime'
  | 'orange'

export const TONES: ToneKey[] = [
  'violet',
  'rose',
  'amber',
  'emerald',
  'sky',
  'teal',
  'yellow',
  'slate',
  'pink',
  'indigo',
  'lime',
  'orange',
]

/** Niveau de maîtrise d'un chapitre, dérivé du pourcentage. */
export type MasteryStatus = 'acquis' | 'presque' | 'encours' | 'arevoir'

export interface Subject {
  id: string
  name: string
  /** Abréviation affichée dans l'emploi du temps. */
  short: string
  tone: ToneKey
  emoji: string
  coefficient: number
  archived?: boolean
}

export type SectionKind =
  | 'cours'
  | 'definition'
  | 'propriete'
  | 'methode'
  | 'exemple'
  | 'astuce'
  | 'attention'

export interface LessonSection {
  title: string
  kind: SectionKind
  body: string
}

export interface Chapter {
  id: string
  subjectId: string
  title: string
  order: number
  /** 0 → 100. Recalculé automatiquement sauf si `masteryManual`. */
  mastery: number
  masteryManual?: boolean
  intro?: string
  sections: LessonSection[]
  fiche: {
    essentiel: string[]
    formules?: string[]
    pieges?: string[]
  }
  archived?: boolean
}

export interface Video {
  id: string
  chapterId: string
  subjectId: string
  title: string
  url: string
  duree: number
  source: string
}

export type QuestionKind = 'qcm' | 'vraifaux' | 'texte' | 'associer' | 'calcul'

export interface Question {
  id: string
  chapterId: string
  subjectId: string
  kind: QuestionKind
  enonce: string
  /** QCM */
  options?: string[]
  correctIndex?: number
  /** Vrai / Faux */
  correctBool?: boolean
  /** Réponse à écrire ou calcul : toutes les formulations acceptées. */
  accepted?: string[]
  /** Associer */
  pairs?: { left: string; right: string }[]
  /** Petit schéma SVG optionnel (clé dans components/Schema.tsx). */
  schema?: string
  explication?: string
}

export interface Exercise {
  id: string
  chapterId: string
  subjectId: string
  titre: string
  enonce: string
  difficulte: 1 | 2 | 3
  indice?: string
  correction: string[]
}

export type GradeKind = 'controle' | 'devoir' | 'oral' | 'brevet-blanc' | 'autre'

export interface Grade {
  id: string
  subjectId: string
  intitule: string
  valeur: number
  bareme: number
  coefficient: number
  date: string
  kind: GradeKind
  trimestre: 1 | 2 | 3
}

export interface CourseSlot {
  id: string
  /** 1 = lundi … 7 = dimanche */
  day: number
  start: string
  end: string
  subjectId: string
  salle?: string
}

export type ReminderKind = 'controle' | 'devoir' | 'revision' | 'autre'

export interface Reminder {
  id: string
  titre: string
  subjectId?: string
  chapterId?: string
  date: string
  heure?: string
  kind: ReminderKind
  details?: string
  fait: boolean
  /** Nombre de jours avant l'échéance où l'alerte se déclenche. */
  alerteJours: number
}

export type SessionSource = 'pomodoro' | 'manuel' | 'quiz' | 'exercice'

export interface StudySession {
  id: string
  date: string
  minutes: number
  subjectId?: string
  chapterId?: string
  source: SessionSource
  objectif?: string
}

export interface ChapterNote {
  id: string
  chapterId: string
  subjectId: string
  contenu: string
  updatedAt: string
}

export interface Mistake {
  id: string
  chapterId: string
  subjectId: string
  questionId?: string
  enonce: string
  maReponse: string
  bonneReponse: string
  date: string
  corrige: boolean
}

export interface QuizAttempt {
  id: string
  chapterId: string
  subjectId: string
  date: string
  score: number
  total: number
  dureeSec: number
}

export type PlanKind = 'cours' | 'fiche' | 'quiz' | 'exercices' | 'erreurs' | 'video' | 'libre'

export interface PlanTask {
  id: string
  date: string
  subjectId: string
  chapterId?: string
  titre: string
  minutes: number
  kind: PlanKind
  raison: string
  fait: boolean
  auto: boolean
}

export type ThemeChoice = 'clair' | 'sombre' | 'auto'

export interface Settings {
  prenom: string
  classe: string
  /** Moyenne générale visée sur 20. */
  noteVisee: number
  dateObjectif: string
  /** Minutes de révision disponibles par jour. */
  tempsParJour: number
  heureDebut: string
  heureFin: string
  /** Jours de révision : 1 = lundi … 7 = dimanche */
  joursRevision: number[]
  theme: ThemeChoice
  objectifQuotidien: number
  pomodoroTravail: number
  pomodoroPause: number
  pomodoroLongue: number
  sonFin: boolean
  motivation: boolean
  notifications: boolean
  trimestreActif: 1 | 2 | 3
}

export interface AppState {
  version: number
  installedAt: string
  settings: Settings
  subjects: Subject[]
  chapters: Chapter[]
  videos: Video[]
  questions: Question[]
  exercises: Exercise[]
  grades: Grade[]
  slots: CourseSlot[]
  reminders: Reminder[]
  sessions: StudySession[]
  chapterNotes: ChapterNote[]
  mistakes: Mistake[]
  attempts: QuizAttempt[]
  plan: PlanTask[]
  favoris: string[]
}
