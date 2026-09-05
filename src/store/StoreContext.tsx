import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import type { AppState } from './types'
import { reducer, type Action } from './reducer'
import { clearState, loadState, saveState } from './persistence'
import { buildInitialState } from '../content'

interface StoreValue {
  state: AppState
  dispatch: (action: Action) => void
  reset: (options?: { keepSettings?: boolean }) => void
  replace: (next: AppState) => void
}

const StoreContext = createContext<StoreValue | null>(null)

function init(): AppState {
  return loadState() ?? buildInitialState()
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, init)

  useEffect(() => {
    saveState(state)
  }, [state])

  // Applique le thème choisi (et suit le système en mode « auto »).
  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const dark = state.settings.theme === 'sombre' || (state.settings.theme === 'auto' && media.matches)
      root.setAttribute('data-theme', dark ? 'dark' : 'light')
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', dark ? '#121120' : '#7c5cfc')
    }
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [state.settings.theme])

  const reset = useCallback(
    (options?: { keepSettings?: boolean }) => {
      clearState()
      const fresh = buildInitialState()
      dispatch({
        type: 'state/replace',
        payload: options?.keepSettings ? { ...fresh, settings: state.settings } : fresh,
      })
    },
    [state.settings],
  )

  const replace = useCallback((next: AppState) => {
    dispatch({ type: 'state/replace', payload: next })
  }, [])

  const value = useMemo<StoreValue>(
    () => ({ state, dispatch, reset, replace }),
    [state, reset, replace],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore doit être utilisé dans un StoreProvider.')
  return context
}

export function useAppState(): AppState {
  return useStore().state
}

export function useSettings() {
  return useStore().state.settings
}
