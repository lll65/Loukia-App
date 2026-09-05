import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Enregistrement du service worker : l'application reste utilisable hors connexion.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(new URL('sw.js', document.baseURI).href).catch(() => {
      // Pas de service worker (contexte non sécurisé, navigation privée…) :
      // l'application fonctionne quand même, simplement sans mode hors ligne.
    })
  })
}
