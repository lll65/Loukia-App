import { useCallback, useState } from 'react'

/** Petit état persistant local (préférences d'affichage, onglet ouvert…). */
export function useLocalState<T>(key: string, initial: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  const update = useCallback(
    (next: T) => {
      setValue(next)
      try {
        localStorage.setItem(key, JSON.stringify(next))
      } catch {
        /* stockage indisponible : on garde la valeur en mémoire */
      }
    },
    [key],
  )

  return [value, update]
}
