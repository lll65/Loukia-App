import type { IconName } from '../ui/Icon'

export interface NavItem {
  to: string
  label: string
  icon: IconName
  short?: string
}

/** Barre principale, reprise de la maquette. */
export const MAIN_NAV: NavItem[] = [
  { to: '/', label: 'Accueil', icon: 'home' },
  { to: '/matieres', label: 'Cours', icon: 'book' },
  { to: '/fiches', label: 'Fiches', icon: 'file' },
  { to: '/videos', label: 'Vidéos', icon: 'video' },
  { to: '/quiz', label: 'Quiz', icon: 'quiz' },
  { to: '/exercices', label: 'Exercices', icon: 'pencil' },
  { to: '/notes', label: 'Notes', icon: 'note' },
  { to: '/planning', label: 'Planning', icon: 'calendar' },
  { to: '/programme', label: 'Programme', icon: 'target' },
  { to: '/statistiques', label: 'Statistiques', icon: 'chart', short: 'Stats' },
]

/** Fonctions complémentaires, accessibles depuis le menu « Plus ». */
export const EXTRA_NAV: NavItem[] = [
  { to: '/objectif', label: 'Ma note visée', icon: 'target' },
  { to: '/concentration', label: 'Mode concentration', icon: 'timer' },
  { to: '/rappels', label: 'Rappels', icon: 'bell' },
  { to: '/erreurs', label: 'Mes erreurs', icon: 'alert' },
  { to: '/badges', label: 'Mes objectifs', icon: 'award' },
  { to: '/parametres', label: 'Paramètres', icon: 'settings' },
]

/** Onglets du bas sur téléphone. */
export const TAB_NAV: NavItem[] = [
  { to: '/', label: 'Accueil', icon: 'home' },
  { to: '/matieres', label: 'Cours', icon: 'book' },
  { to: '/programme', label: 'Programme', icon: 'target' },
  { to: '/notes', label: 'Notes', icon: 'note' },
]
