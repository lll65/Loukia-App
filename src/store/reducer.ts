import type {
  AppState,
  Chapter,
  ChapterNote,
  CourseSlot,
  Exercise,
  Grade,
  Mistake,
  PlanTask,
  Question,
  QuizAttempt,
  Reminder,
  Settings,
  StudySession,
  Subject,
  Video,
} from './types'
import { clamp } from '../lib/utils'

export type Action =
  | { type: 'settings/patch'; payload: Partial<Settings> }
  | { type: 'subject/add'; payload: Subject }
  | { type: 'subject/update'; payload: { id: string; patch: Partial<Subject> } }
  | { type: 'subject/remove'; payload: string }
  | { type: 'chapter/add'; payload: Chapter }
  | { type: 'chapter/update'; payload: { id: string; patch: Partial<Chapter> } }
  | { type: 'chapter/remove'; payload: string }
  | { type: 'grade/add'; payload: Grade }
  | { type: 'grade/update'; payload: { id: string; patch: Partial<Grade> } }
  | { type: 'grade/remove'; payload: string }
  | { type: 'slot/add'; payload: CourseSlot }
  | { type: 'slot/update'; payload: { id: string; patch: Partial<CourseSlot> } }
  | { type: 'slot/remove'; payload: string }
  | { type: 'slot/clear' }
  | { type: 'reminder/add'; payload: Reminder }
  | { type: 'reminder/update'; payload: { id: string; patch: Partial<Reminder> } }
  | { type: 'reminder/remove'; payload: string }
  | { type: 'session/add'; payload: StudySession }
  | { type: 'session/remove'; payload: string }
  | { type: 'note/upsert'; payload: ChapterNote }
  | { type: 'note/remove'; payload: string }
  | { type: 'mistake/add'; payload: Mistake }
  | { type: 'mistake/update'; payload: { id: string; patch: Partial<Mistake> } }
  | { type: 'mistake/remove'; payload: string }
  | { type: 'attempt/add'; payload: QuizAttempt }
  | { type: 'question/add'; payload: Question }
  | { type: 'question/remove'; payload: string }
  | { type: 'exercise/add'; payload: Exercise }
  | { type: 'exercise/remove'; payload: string }
  | { type: 'video/add'; payload: Video }
  | { type: 'video/remove'; payload: string }
  | { type: 'plan/set'; payload: { date: string; tasks: PlanTask[] } }
  | { type: 'plan/add'; payload: PlanTask }
  | { type: 'plan/toggle'; payload: string }
  | { type: 'plan/remove'; payload: string }
  | { type: 'favori/toggle'; payload: string }
  | { type: 'state/replace'; payload: AppState }

const patchItem = <T extends { id: string }>(items: T[], id: string, patch: Partial<T>): T[] =>
  items.map((item) => (item.id === id ? { ...item, ...patch } : item))

/** Nouvelle maîtrise après un quiz : on lisse pour éviter les à-coups. */
function blendMastery(previous: number, hasHistory: boolean, ratio: number): number {
  const score = ratio * 100
  const next = hasHistory ? previous * 0.4 + score * 0.6 : score
  return clamp(Math.round(next), 0, 100)
}

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'settings/patch':
      return { ...state, settings: { ...state.settings, ...action.payload } }

    case 'subject/add':
      return { ...state, subjects: [...state.subjects, action.payload] }
    case 'subject/update':
      return {
        ...state,
        subjects: patchItem(state.subjects, action.payload.id, action.payload.patch),
      }
    case 'subject/remove': {
      const id = action.payload
      const chapterIds = new Set(state.chapters.filter((c) => c.subjectId === id).map((c) => c.id))
      return {
        ...state,
        subjects: state.subjects.filter((s) => s.id !== id),
        chapters: state.chapters.filter((c) => c.subjectId !== id),
        questions: state.questions.filter((q) => q.subjectId !== id),
        exercises: state.exercises.filter((e) => e.subjectId !== id),
        videos: state.videos.filter((v) => v.subjectId !== id),
        grades: state.grades.filter((g) => g.subjectId !== id),
        slots: state.slots.filter((s) => s.subjectId !== id),
        reminders: state.reminders.filter((r) => r.subjectId !== id),
        chapterNotes: state.chapterNotes.filter((n) => n.subjectId !== id),
        mistakes: state.mistakes.filter((m) => m.subjectId !== id),
        attempts: state.attempts.filter((a) => a.subjectId !== id),
        plan: state.plan.filter((p) => p.subjectId !== id),
        favoris: state.favoris.filter((f) => !chapterIds.has(f)),
      }
    }

    case 'chapter/add':
      return { ...state, chapters: [...state.chapters, action.payload] }
    case 'chapter/update':
      return {
        ...state,
        chapters: patchItem(state.chapters, action.payload.id, action.payload.patch),
      }
    case 'chapter/remove': {
      const id = action.payload
      return {
        ...state,
        chapters: state.chapters.filter((c) => c.id !== id),
        questions: state.questions.filter((q) => q.chapterId !== id),
        exercises: state.exercises.filter((e) => e.chapterId !== id),
        videos: state.videos.filter((v) => v.chapterId !== id),
        chapterNotes: state.chapterNotes.filter((n) => n.chapterId !== id),
        mistakes: state.mistakes.filter((m) => m.chapterId !== id),
        attempts: state.attempts.filter((a) => a.chapterId !== id),
        plan: state.plan.filter((p) => p.chapterId !== id),
        favoris: state.favoris.filter((f) => f !== id),
      }
    }

    case 'grade/add':
      return { ...state, grades: [...state.grades, action.payload] }
    case 'grade/update':
      return { ...state, grades: patchItem(state.grades, action.payload.id, action.payload.patch) }
    case 'grade/remove':
      return { ...state, grades: state.grades.filter((g) => g.id !== action.payload) }

    case 'slot/add':
      return { ...state, slots: [...state.slots, action.payload] }
    case 'slot/update':
      return { ...state, slots: patchItem(state.slots, action.payload.id, action.payload.patch) }
    case 'slot/remove':
      return { ...state, slots: state.slots.filter((s) => s.id !== action.payload) }
    case 'slot/clear':
      return { ...state, slots: [] }

    case 'reminder/add':
      return { ...state, reminders: [...state.reminders, action.payload] }
    case 'reminder/update':
      return {
        ...state,
        reminders: patchItem(state.reminders, action.payload.id, action.payload.patch),
      }
    case 'reminder/remove':
      return { ...state, reminders: state.reminders.filter((r) => r.id !== action.payload) }

    case 'session/add':
      return { ...state, sessions: [...state.sessions, action.payload] }
    case 'session/remove':
      return { ...state, sessions: state.sessions.filter((s) => s.id !== action.payload) }

    case 'note/upsert': {
      const exists = state.chapterNotes.some((n) => n.id === action.payload.id)
      return {
        ...state,
        chapterNotes: exists
          ? state.chapterNotes.map((n) => (n.id === action.payload.id ? action.payload : n))
          : [...state.chapterNotes, action.payload],
      }
    }
    case 'note/remove':
      return { ...state, chapterNotes: state.chapterNotes.filter((n) => n.id !== action.payload) }

    case 'mistake/add':
      return { ...state, mistakes: [action.payload, ...state.mistakes] }
    case 'mistake/update':
      return {
        ...state,
        mistakes: patchItem(state.mistakes, action.payload.id, action.payload.patch),
      }
    case 'mistake/remove':
      return { ...state, mistakes: state.mistakes.filter((m) => m.id !== action.payload) }

    case 'attempt/add': {
      const attempt = action.payload
      const hasHistory = state.attempts.some((a) => a.chapterId === attempt.chapterId)
      const ratio = attempt.total > 0 ? attempt.score / attempt.total : 0
      return {
        ...state,
        attempts: [attempt, ...state.attempts],
        chapters: state.chapters.map((chapter) =>
          chapter.id === attempt.chapterId && !chapter.masteryManual
            ? { ...chapter, mastery: blendMastery(chapter.mastery, hasHistory, ratio) }
            : chapter,
        ),
      }
    }

    case 'question/add':
      return { ...state, questions: [...state.questions, action.payload] }
    case 'question/remove':
      return { ...state, questions: state.questions.filter((q) => q.id !== action.payload) }

    case 'exercise/add':
      return { ...state, exercises: [...state.exercises, action.payload] }
    case 'exercise/remove':
      return { ...state, exercises: state.exercises.filter((e) => e.id !== action.payload) }

    case 'video/add':
      return { ...state, videos: [...state.videos, action.payload] }
    case 'video/remove':
      return { ...state, videos: state.videos.filter((v) => v.id !== action.payload) }

    case 'plan/set':
      return {
        ...state,
        plan: [
          ...state.plan.filter((task) => task.date !== action.payload.date || !task.auto),
          ...action.payload.tasks,
        ],
      }
    case 'plan/add':
      return { ...state, plan: [...state.plan, action.payload] }
    case 'plan/toggle':
      return {
        ...state,
        plan: state.plan.map((task) =>
          task.id === action.payload ? { ...task, fait: !task.fait } : task,
        ),
      }
    case 'plan/remove':
      return { ...state, plan: state.plan.filter((task) => task.id !== action.payload) }

    case 'favori/toggle':
      return {
        ...state,
        favoris: state.favoris.includes(action.payload)
          ? state.favoris.filter((f) => f !== action.payload)
          : [...state.favoris, action.payload],
      }

    case 'state/replace':
      return action.payload

    default:
      return state
  }
}
