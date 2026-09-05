import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StoreProvider, useStore } from './store/StoreContext'
import { useLocalState } from './hooks/useLocalState'
import { diffDays, todayISO } from './lib/dates'
import { AppShell } from './components/layout/AppShell'
import { Accueil } from './pages/Accueil'
import { Matieres } from './pages/Matieres'
import { Matiere } from './pages/Matiere'
import { Chapitre } from './pages/Chapitre'
import { Fiches, Videos, Exercices } from './pages/Bibliotheque'
import { QuizIndex, QuizRun } from './pages/Quiz'
import { Notes } from './pages/Notes'
import { Planning } from './pages/Planning'
import { Programme } from './pages/Programme'
import { Statistiques } from './pages/Statistiques'
import { Objectif } from './pages/Objectif'
import { Concentration } from './pages/Concentration'
import { Rappels } from './pages/Rappels'
import { Erreurs } from './pages/Erreurs'
import { Badges } from './pages/Badges'
import { Parametres } from './pages/Parametres'
import { Bienvenue } from './pages/Bienvenue'

/** Alerte à l'ouverture quand un contrôle approche (si les notifications sont autorisées). */
function useControlNotifications() {
  const { state } = useStore()
  useEffect(() => {
    if (!state.settings.notifications) return
    if (!('Notification' in window) || Notification.permission !== 'granted') return
    const today = todayISO()
    const due = state.reminders.filter((reminder) => {
      if (reminder.fait) return false
      const delta = diffDays(today, reminder.date)
      return delta >= 0 && delta <= reminder.alerteJours
    })
    if (due.length === 0) return
    const key = `loukia-notif-${today}`
    try {
      if (localStorage.getItem(key)) return
      localStorage.setItem(key, '1')
    } catch {
      return
    }
    const first = due[0]
    new Notification(due.length === 1 ? first.titre : `${due.length} échéances approchent`, {
      body:
        due.length === 1
          ? `${diffDays(today, first.date) === 0 ? "C'est aujourd'hui" : `Dans ${diffDays(today, first.date)} jour(s)`} — pense à réviser.`
          : due.map((reminder) => reminder.titre).join(' · '),
      icon: './icons/icon-192.png',
    })
  }, [state.settings.notifications, state.reminders])
}

function Routeur() {
  useControlNotifications()
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/matieres" element={<Matieres />} />
        <Route path="/matieres/:subjectId" element={<Matiere />} />
        <Route path="/chapitre/:chapterId" element={<Chapitre />} />
        <Route path="/fiches" element={<Fiches />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/exercices" element={<Exercices />} />
        <Route path="/quiz" element={<QuizIndex />} />
        <Route path="/quiz/:chapterId" element={<QuizRun />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/programme" element={<Programme />} />
        <Route path="/statistiques" element={<Statistiques />} />
        <Route path="/objectif" element={<Objectif />} />
        <Route path="/concentration" element={<Concentration />} />
        <Route path="/rappels" element={<Rappels />} />
        <Route path="/erreurs" element={<Erreurs />} />
        <Route path="/badges" element={<Badges />} />
        <Route path="/parametres" element={<Parametres />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}

function Contenu() {
  const [onboarded, setOnboarded] = useLocalState('loukia-onboarded', false)
  if (!onboarded) return <Bienvenue onDone={() => setOnboarded(true)} />
  return (
    <HashRouter>
      <Routeur />
    </HashRouter>
  )
}

export function App() {
  return (
    <StoreProvider>
      <Contenu />
    </StoreProvider>
  )
}
