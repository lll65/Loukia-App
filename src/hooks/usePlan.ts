import { useEffect, useRef } from 'react'
import { useStore } from '../store/StoreContext'
import { generatePlan, planFor } from '../store/selectors'
import type { PlanTask } from '../store/types'

/**
 * Renvoie le programme d'une journée, en le générant une seule fois si besoin.
 * Le garde-fou `attempted` évite de relancer la génération quand le budget
 * de la journée est nul (jour sans révision).
 */
export function usePlan(date: string): {
  tasks: PlanTask[]
  regenerate: () => void
} {
  const { state, dispatch } = useStore()
  const attempted = useRef(new Set<string>())
  const tasks = planFor(state, date)

  useEffect(() => {
    if (tasks.length > 0 || attempted.current.has(date)) return
    attempted.current.add(date)
    const generated = generatePlan(state, date)
    if (generated.length > 0) dispatch({ type: 'plan/set', payload: { date, tasks: generated } })
    // On ne dépend volontairement pas de `state` : la génération n'a lieu qu'une fois par date.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, tasks.length])

  const regenerate = () => {
    attempted.current.add(date)
    dispatch({ type: 'plan/set', payload: { date, tasks: generatePlan(state, date, true) } })
  }

  return { tasks, regenerate }
}
