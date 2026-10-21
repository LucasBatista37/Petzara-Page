import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import App from './App.jsx'
import { loadCatalog } from './i18n/catalogs.js'
import { localeFromPath } from './i18n/config.js'
import { setSiteLanguage } from './lib/analytics'

const locale = localeFromPath(window.location.pathname)
setSiteLanguage(locale)

const app = (
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
)

// O catálogo do idioma da página precisa estar carregado antes do 1º render, para o texto
// bater com o HTML pré-renderizado (pt-BR já vem no bundle; es/en são um chunk pequeno).
loadCatalog(locale).then(() => {
    const root = document.getElementById('root')
    if (root.firstElementChild) hydrateRoot(root, app)
    else createRoot(root).render(app) // `npm run dev`: sem pré-render
})
