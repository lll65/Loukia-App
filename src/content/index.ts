import type {
  AppState,
  Chapter,
  CourseSlot,
  Exercise,
  Question,
  Settings,
  Subject,
  Video,
} from '../store/types'
import { todayISO } from '../lib/dates'
import { maths } from './maths'
import { francais } from './francais'
import { histoire } from './histoire'
import { svt } from './svt'
import { physique } from './physique'
import { anglais, espagnol } from './langues'
import { arts, eps, musique, technologie } from './autres'
import type { ChapterSeed, SubjectSeed } from './types'

export const SEEDS: SubjectSeed[] = [
  maths,
  francais,
  histoire,
  svt,
  physique,
  anglais,
  espagnol,
  technologie,
  arts,
  musique,
  eps,
]

const youtubeSearch = (query: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`

function buildChapter(seed: ChapterSeed, subjectId: string, order: number): Chapter {
  return {
    id: seed.id,
    subjectId,
    title: seed.title,
    order,
    mastery: 0,
    intro: seed.intro,
    sections: (seed.sections ?? []).map(([kind, title, body]) => ({ kind, title, body })),
    fiche: {
      essentiel: seed.essentiel ?? [],
      formules: seed.formules,
      pieges: seed.pieges,
    },
  }
}

function buildQuestions(seed: ChapterSeed, subjectId: string): Question[] {
  return (seed.quiz ?? []).map((q, index) => {
    const kind = q.kind ?? (q.options ? 'qcm' : 'texte')
    const base: Question = {
      id: `${seed.id}-q${index + 1}`,
      chapterId: seed.id,
      subjectId,
      kind,
      enonce: q.q,
      explication: q.why,
      schema: q.schema,
    }
    if (kind === 'qcm') {
      base.options = q.options
      base.correctIndex = typeof q.answer === 'number' ? q.answer : 0
    } else if (kind === 'vraifaux') {
      base.correctBool = q.answer === true
    } else if (kind === 'associer') {
      base.pairs = (q.pairs ?? []).map(([left, right]) => ({ left, right }))
    } else {
      base.accepted = Array.isArray(q.answer)
        ? q.answer
        : typeof q.answer === 'string'
          ? [q.answer]
          : []
    }
    return base
  })
}

function buildExercises(seed: ChapterSeed, subjectId: string): Exercise[] {
  return (seed.exos ?? []).map((e, index) => ({
    id: `${seed.id}-ex${index + 1}`,
    chapterId: seed.id,
    subjectId,
    titre: e.titre,
    enonce: e.enonce,
    difficulte: e.niveau ?? 2,
    indice: e.indice,
    correction: e.correction,
  }))
}

function buildVideos(seed: ChapterSeed, subjectId: string): Video[] {
  return (seed.videos ?? []).map(([query, duree, source], index) => ({
    id: `${seed.id}-v${index + 1}`,
    chapterId: seed.id,
    subjectId,
    title: query.charAt(0).toUpperCase() + query.slice(1),
    url: youtubeSearch(query),
    duree,
    source,
  }))
}

/** Emploi du temps de départ, réaliste pour une 3ᵉ — entièrement modifiable ensuite. */
const DEFAULT_SLOTS: Array<[number, string, string, string]> = [
  [1, '08:00', '09:00', 'francais'],
  [1, '09:00', '10:00', 'maths'],
  [1, '10:15', '11:15', 'histoire'],
  [1, '11:15', '12:15', 'anglais'],
  [1, '14:00', '15:00', 'svt'],
  [1, '15:00', '16:00', 'eps'],
  [2, '08:00', '09:00', 'maths'],
  [2, '09:00', '10:00', 'physique'],
  [2, '10:15', '11:15', 'francais'],
  [2, '11:15', '12:15', 'espagnol'],
  [2, '14:00', '16:00', 'eps'],
  [3, '08:00', '09:00', 'histoire'],
  [3, '09:00', '10:00', 'anglais'],
  [3, '10:15', '11:15', 'maths'],
  [3, '11:15', '12:15', 'arts'],
  [4, '08:00', '09:00', 'francais'],
  [4, '09:00', '10:00', 'svt'],
  [4, '10:15', '11:15', 'espagnol'],
  [4, '11:15', '12:15', 'techno'],
  [4, '14:00', '15:00', 'maths'],
  [4, '15:00', '16:00', 'musique'],
  [5, '08:00', '09:00', 'physique'],
  [5, '09:00', '10:00', 'maths'],
  [5, '10:15', '11:15', 'anglais'],
  [5, '11:15', '12:15', 'histoire'],
  [5, '14:00', '15:00', 'francais'],
]

export const DEFAULT_SETTINGS: Settings = {
  prenom: 'Lou',
  classe: '3ᵉ',
  noteVisee: 18,
  dateObjectif: `${new Date().getMonth() + 1 >= 9 ? new Date().getFullYear() + 1 : new Date().getFullYear()}-06-30`,
  tempsParJour: 90,
  heureDebut: '17:30',
  heureFin: '22:00',
  joursRevision: [1, 2, 3, 4, 5],
  theme: 'auto',
  objectifQuotidien: 60,
  pomodoroTravail: 25,
  pomodoroPause: 5,
  pomodoroLongue: 15,
  sonFin: true,
  motivation: true,
  notifications: false,
  trimestreActif: 1,
}

export interface SeedOptions {
  withSchedule?: boolean
}

export function buildInitialState(options: SeedOptions = {}): AppState {
  const subjects: Subject[] = []
  const chapters: Chapter[] = []
  const questions: Question[] = []
  const exercises: Exercise[] = []
  const videos: Video[] = []

  for (const seed of SEEDS) {
    subjects.push({
      id: seed.id,
      name: seed.name,
      short: seed.short,
      tone: seed.tone,
      emoji: seed.emoji,
      coefficient: seed.coefficient,
    })
    seed.chapters.forEach((chapterSeed, index) => {
      chapters.push(buildChapter(chapterSeed, seed.id, index))
      questions.push(...buildQuestions(chapterSeed, seed.id))
      exercises.push(...buildExercises(chapterSeed, seed.id))
      videos.push(...buildVideos(chapterSeed, seed.id))
    })
  }

  const slots: CourseSlot[] =
    options.withSchedule === false
      ? []
      : DEFAULT_SLOTS.map(([day, start, end, subjectId], index) => ({
          id: `slot-${index}`,
          day,
          start,
          end,
          subjectId,
        }))

  return {
    version: 1,
    installedAt: todayISO(),
    settings: { ...DEFAULT_SETTINGS },
    subjects,
    chapters,
    videos,
    questions,
    exercises,
    grades: [],
    slots,
    reminders: [],
    sessions: [],
    chapterNotes: [],
    mistakes: [],
    attempts: [],
    plan: [],
    favoris: [],
  }
}
