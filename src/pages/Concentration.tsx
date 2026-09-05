import { useEffect, useMemo, useRef, useState } from 'react'
import { todayISO } from '../lib/dates'
import { cx, formatDuration, formatMinutes, uid } from '../lib/utils'
import { useStore } from '../store/StoreContext'
import { minutesOn, planFor } from '../store/selectors'
import { Button, Card, Input, Label, Select, SectionTitle } from '../components/ui/primitives'
import { PageHeader } from '../components/common'
import { Icon } from '../components/ui/Icon'

type Phase = 'travail' | 'pause'

/** Petit signal sonore de fin de session, sans fichier audio. */
function beep() {
  try {
    const AudioCtx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return
    const context = new AudioCtx()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.type = 'sine'
    oscillator.frequency.value = 660
    gain.gain.setValueAtTime(0.0001, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.22, context.currentTime + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1.1)
    oscillator.start()
    oscillator.stop(context.currentTime + 1.2)
  } catch {
    /* le son n'est pas indispensable */
  }
}

export function Concentration() {
  const { state, dispatch } = useStore()
  const [phase, setPhase] = useState<Phase>('travail')
  const [duration, setDuration] = useState(state.settings.pomodoroTravail)
  const [left, setLeft] = useState(state.settings.pomodoroTravail * 60)
  const [running, setRunning] = useState(false)
  const [cycles, setCycles] = useState(0)
  const [subjectId, setSubjectId] = useState('')
  const [chapterId, setChapterId] = useState('')
  const [objectif, setObjectif] = useState('')
  const [justSaved, setJustSaved] = useState(false)
  const startedAt = useRef<number | null>(null)

  const chapters = useMemo(
    () => state.chapters.filter((c) => !subjectId || c.subjectId === subjectId),
    [state.chapters, subjectId],
  )
  const todayMinutes = minutesOn(state, todayISO())
  const todayTasks = planFor(state, todayISO()).filter((task) => !task.fait)

  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => {
      setLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer)
          return 0
        }
        return value - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [running])

  // Fin de la minuterie : on enregistre le temps travaillé puis on enchaîne.
  useEffect(() => {
    if (left > 0 || !running) return
    setRunning(false)
    if (state.settings.sonFin) beep()

    if (phase === 'travail') {
      const worked = startedAt.current
        ? Math.max(1, Math.round((Date.now() - startedAt.current) / 60000))
        : duration
      dispatch({
        type: 'session/add',
        payload: {
          id: uid('sess'),
          date: todayISO(),
          minutes: Math.min(worked, duration),
          subjectId: subjectId || undefined,
          chapterId: chapterId || undefined,
          source: 'pomodoro',
          objectif: objectif || undefined,
        },
      })
      setJustSaved(true)
      window.setTimeout(() => setJustSaved(false), 4000)
      const nextCycles = cycles + 1
      setCycles(nextCycles)
      const pause =
        nextCycles % 4 === 0 ? state.settings.pomodoroLongue : state.settings.pomodoroPause
      setPhase('pause')
      setLeft(pause * 60)
    } else {
      setPhase('travail')
      setLeft(duration * 60)
    }
    startedAt.current = null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, running])

  const total = phase === 'travail' ? duration * 60 : left || 1
  const progress = phase === 'travail' ? 1 - left / (duration * 60) : 0

  const start = () => {
    startedAt.current = Date.now()
    setRunning(true)
  }

  const stopAndSave = () => {
    setRunning(false)
    if (phase === 'travail' && startedAt.current) {
      const worked = Math.round((Date.now() - startedAt.current) / 60000)
      if (worked >= 1) {
        dispatch({
          type: 'session/add',
          payload: {
            id: uid('sess'),
            date: todayISO(),
            minutes: worked,
            subjectId: subjectId || undefined,
            chapterId: chapterId || undefined,
            source: 'pomodoro',
            objectif: objectif || undefined,
          },
        })
        setJustSaved(true)
        window.setTimeout(() => setJustSaved(false), 4000)
      }
    }
    startedAt.current = null
    setLeft(duration * 60)
    setPhase('travail')
  }

  const pick = (minutes: number) => {
    setDuration(minutes)
    setPhase('travail')
    setLeft(minutes * 60)
    setRunning(false)
    startedAt.current = null
  }

  return (
    <div>
      <PageHeader
        icon="timer"
        title="Mode concentration"
        subtitle="Une session, un objectif, zéro distraction. Le temps travaillé est enregistré automatiquement dans tes statistiques."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <Card className="flex flex-col items-center py-8">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">
            {phase === 'travail' ? 'Session de révision' : 'Pause'}
          </p>
          {subjectId && (
            <p className="mt-1 text-sm font-semibold text-primary">
              {state.subjects.find((s) => s.id === subjectId)?.name}
              {chapterId && ` — ${state.chapters.find((c) => c.id === chapterId)?.title}`}
            </p>
          )}

          <div className="relative mt-5">
            <svg width="220" height="220" className="-rotate-90">
              <circle cx="110" cy="110" r="96" fill="none" stroke="var(--app-line)" strokeWidth="12" />
              <circle
                cx="110"
                cy="110"
                r="96"
                fill="none"
                stroke={phase === 'travail' ? 'var(--app-primary)' : 'var(--app-accent)'}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 96}
                strokeDashoffset={
                  2 * Math.PI * 96 * (1 - (phase === 'travail' ? progress : 1 - left / total))
                }
                className="transition-[stroke-dashoffset] duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-5xl font-extrabold tracking-tight text-ink">
                {formatDuration(left)}
              </span>
              {cycles > 0 && (
                <span className="mt-1 text-[11px] text-muted">
                  {cycles} session{cycles > 1 ? 's' : ''} terminée{cycles > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2">
            {running ? (
              <Button icon="pause" onClick={() => setRunning(false)}>
                Pause
              </Button>
            ) : (
              <Button icon="play" onClick={start}>
                {left === duration * 60 ? 'Démarrer' : 'Reprendre'}
              </Button>
            )}
            <Button variant="outline" icon="rotate" onClick={stopAndSave}>
              Terminer
            </Button>
          </div>

          {justSaved && (
            <p className="animate-rise mt-4 flex items-center gap-1.5 rounded-full bg-emerald-500/12 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <Icon name="check" size={14} />
              Temps enregistré
            </p>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-1.5">
            {[15, 25, 30, 45, 50].map((value) => (
              <button
                key={value}
                onClick={() => pick(value)}
                className={cx(
                  'rounded-xl px-3 py-1.5 text-xs font-semibold transition',
                  duration === value
                    ? 'bg-primary text-white'
                    : 'bg-surface-2 text-ink-soft hover:bg-line',
                )}
              >
                {value} min
              </button>
            ))}
          </div>
        </Card>

        <div className="space-y-3">
          <Card>
            <SectionTitle icon="target" title="Objectif de la session" />
            <div className="space-y-2.5">
              <label className="block">
                <Label>Matière</Label>
                <Select
                  value={subjectId}
                  onChange={(e) => {
                    setSubjectId(e.target.value)
                    setChapterId('')
                  }}
                >
                  <option value="">Sans matière précise</option>
                  {state.subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.emoji} {subject.name}
                    </option>
                  ))}
                </Select>
              </label>
              <label className="block">
                <Label>Chapitre</Label>
                <Select
                  value={chapterId}
                  onChange={(e) => setChapterId(e.target.value)}
                  disabled={!subjectId}
                >
                  <option value="">Aucun chapitre précis</option>
                  {chapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>
                      {chapter.title}
                    </option>
                  ))}
                </Select>
              </label>
              <label className="block">
                <Label>Ce que je veux finir</Label>
                <Input
                  value={objectif}
                  onChange={(e) => setObjectif(e.target.value)}
                  placeholder="Ex. finir les exercices 1 à 5"
                />
              </label>
            </div>
          </Card>

          {todayTasks.length > 0 && (
            <Card>
              <SectionTitle icon="list" title="À faire aujourd’hui" />
              <ul className="space-y-1.5">
                {todayTasks.slice(0, 4).map((task) => (
                  <li key={task.id}>
                    <button
                      onClick={() => {
                        setSubjectId(task.subjectId)
                        setChapterId(task.chapterId ?? '')
                        setObjectif(task.titre)
                        pick(Math.max(15, Math.min(50, task.minutes)))
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left text-xs transition hover:bg-surface-2"
                    >
                      <Icon name="chevronRight" size={13} className="shrink-0 text-muted" />
                      <span className="min-w-0 flex-1 truncate text-ink-soft">{task.titre}</span>
                      <span className="shrink-0 text-[10px] font-bold text-muted">
                        {task.minutes}′
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Aujourd’hui</p>
            <p className="mt-0.5 text-2xl font-extrabold text-ink">{formatMinutes(todayMinutes)}</p>
            <p className="text-[11px] text-muted">
              Objectif : {formatMinutes(state.settings.objectifQuotidien)}
            </p>
          </Card>

          <Card className="border-primary/25 bg-primary-soft/40">
            <p className="text-[11px] font-bold uppercase tracking-wide text-primary-ink">
              La méthode Pomodoro
            </p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">
              {state.settings.pomodoroTravail} minutes de travail, {state.settings.pomodoroPause}{' '}
              minutes de pause. Toutes les 4 sessions, une grande pause de{' '}
              {state.settings.pomodoroLongue} minutes. Pendant la session : téléphone loin, une seule
              tâche à la fois.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
