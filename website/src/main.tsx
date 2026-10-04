import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import '@fontsource/kanit/500.css'
import '@fontsource/karla/400.css'
import '@fontsource/karla/500.css'
import '@fontsource/karla/700.css'
import '@fontsource/kanit/700.css'
import '@fontsource/kanit/900.css'
import '@fontsource/bebas-neue/400.css'
import '@fontsource/inter-tight/500.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/barlow/300.css'
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import './index.css'

// Hash routing works on any static host (and when opening the build from a folder) without server rewrites.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
