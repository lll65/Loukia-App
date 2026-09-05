import type { QuestionKind, SectionKind, ToneKey } from '../store/types'

/** [kind, titre, contenu] — format compact pour écrire les cours. */
export type SectionSeed = [SectionKind, string, string]

export interface QuestionSeed {
  q: string
  kind?: QuestionKind
  options?: string[]
  /** QCM : index de la bonne réponse. V/F : booléen. Texte/calcul : réponses acceptées. */
  answer?: number | boolean | string | string[]
  pairs?: [string, string][]
  why?: string
  schema?: string
}

export interface ExerciseSeed {
  titre: string
  enonce: string
  niveau?: 1 | 2 | 3
  indice?: string
  correction: string[]
}

export interface ChapterSeed {
  id: string
  title: string
  intro?: string
  sections?: SectionSeed[]
  essentiel?: string[]
  formules?: string[]
  pieges?: string[]
  /** [phrase de recherche, durée en minutes, chaîne conseillée] */
  videos?: [string, number, string][]
  quiz?: QuestionSeed[]
  exos?: ExerciseSeed[]
}

export interface SubjectSeed {
  id: string
  name: string
  short: string
  tone: ToneKey
  emoji: string
  coefficient: number
  chapters: ChapterSeed[]
}
