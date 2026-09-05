import type { AppState } from './types'

export const STORAGE_KEY = 'loukia-app-state-v1'

export function loadState(): AppState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AppState
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.subjects)) return null
    return parsed
  } catch {
    return null
  }
}

let pending: number | undefined

export function saveState(state: AppState): void {
  if (pending) window.clearTimeout(pending)
  pending = window.setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Quota dépassé ou stockage indisponible (navigation privée) :
      // l'application continue de fonctionner, seule la sauvegarde échoue.
      console.warn('Sauvegarde impossible : le stockage du navigateur est plein ou bloqué.')
    }
  }, 250)
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignoré */
  }
}

export function exportState(state: AppState): void {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const stamp = new Date().toISOString().slice(0, 10)
  link.href = url
  link.download = `sauvegarde-revisions-${stamp}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export async function readStateFile(file: File): Promise<AppState> {
  const text = await file.text()
  const parsed = JSON.parse(text) as AppState
  if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.subjects)) {
    throw new Error('Ce fichier ne ressemble pas à une sauvegarde de l’application.')
  }
  return parsed
}
