import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { cx, formatMinutes } from '../../lib/utils'
import { todayISO } from '../../lib/dates'
import { useStore } from '../../store/StoreContext'
import { minutesOn, streak, upcomingReminders } from '../../store/selectors'
import { Icon } from '../ui/Icon'
import { Modal } from '../ui/Modal'
import { EXTRA_NAV, MAIN_NAV, TAB_NAV } from './nav'

export function AppShell({ children }: { children: React.ReactNode }) {
  const { state } = useStore()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const serie = streak(state)
  const today = minutesOn(state, todayISO())
  const alerts = upcomingReminders(state, 3).length

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <div className="min-h-dvh bg-bg pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-10">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <Icon name="book2" size={18} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-extrabold leading-tight text-ink">
                Mes révisions
              </span>
              <span className="block truncate text-[11px] leading-tight text-muted">
                {state.settings.prenom}
                {state.settings.classe ? ` · ${state.settings.classe}` : ''}
                {today > 0 ? ` · ${formatMinutes(today)} aujourd’hui` : ''}
              </span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-1.5">
            {serie > 0 && (
              <span
                className="hidden items-center gap-1 rounded-full bg-orange-500/12 px-2.5 py-1 text-xs font-bold text-orange-600 sm:inline-flex dark:text-orange-300"
                title={`Série de ${serie} jours`}
              >
                <Icon name="flame" size={14} />
                {serie}
              </span>
            )}
            <Link
              to="/rappels"
              aria-label="Rappels"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-ink-soft transition hover:bg-surface-2"
            >
              <Icon name="bell" size={18} />
              {alerts > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-bg" />
              )}
            </Link>
            <Link
              to="/parametres"
              aria-label="Paramètres"
              className="hidden h-9 w-9 items-center justify-center rounded-xl text-ink-soft transition hover:bg-surface-2 lg:flex"
            >
              <Icon name="settings" size={18} />
            </Link>
          </div>
        </div>

        {/* Barre de navigation façon maquette, sur écran large */}
        <nav className="mx-auto hidden max-w-6xl px-4 pb-2 lg:block">
          <div className="card flex items-center gap-1 overflow-x-auto p-1.5">
            {MAIN_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cx(
                    'flex min-w-[74px] flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-semibold transition',
                    isActive
                      ? 'bg-primary-soft text-primary-ink'
                      : 'text-muted hover:bg-surface-2 hover:text-ink',
                  )
                }
              >
                <Icon name={item.icon} size={19} />
                {item.short ?? item.label}
              </NavLink>
            ))}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex min-w-[74px] flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-semibold text-muted transition hover:bg-surface-2 hover:text-ink"
            >
              <Icon name="grid" size={19} />
              Plus
            </button>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-4 sm:py-5">{children}</main>

      {/* Onglets du bas sur téléphone */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-md items-stretch">
          {TAB_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cx(
                  'flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-semibold transition',
                  isActive ? 'text-primary' : 'text-muted',
                )
              }
            >
              <Icon name={item.icon} size={21} />
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-semibold text-muted"
          >
            <Icon name="grid" size={21} />
            Plus
          </button>
        </div>
      </nav>

      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} title="Toutes les fonctions">
        <div className="grid grid-cols-3 gap-2">
          {[...MAIN_NAV, ...EXTRA_NAV].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-line bg-surface-2 px-2 py-3 text-center text-[11px] font-semibold text-ink transition hover:border-primary/40"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary-ink">
                <Icon name={item.icon} size={17} />
              </span>
              {item.label}
            </Link>
          ))}
        </div>
      </Modal>
    </div>
  )
}
