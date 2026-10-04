import { AnimatePresence, MotionConfig } from 'framer-motion'
import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import PageTransition from './components/PageTransition'
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Work = lazy(() => import('./pages/Work'))
const Contact = lazy(() => import('./pages/Contact'))
import { BRAND } from './data/site'

const TITLES: Record<string, string> = {
  '/': `${BRAND} — Modern websites, ready in 3 days`,
  '/about': `About Artur — ${BRAND}`,
  '/services': `Services & pricing — ${BRAND}`,
  '/work': `My work — ${BRAND}`,
  '/contact': `Contact — ${BRAND}`,
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    document.title = TITLES[location.pathname] ?? TITLES['/']
  }, [location.pathname])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#content" className="sr-only z-[90] rounded-full bg-white px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <div id="content" className="noise relative" style={{ overflowX: 'clip' }}>
        <Suspense fallback={<div className="min-h-screen" />}>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <Routes location={location} key={location.pathname}>
            {[
              ['/', <Home />],
              ['/about', <About />],
              ['/services', <Services />],
              ['/work', <Work />],
              ['/contact', <Contact />],
              ['*', <Home />],
            ].map(([path, el]) => (
              <Route key={path as string} path={path as string} element={<PageTransition>{el}</PageTransition>} />
            ))}
          </Routes>
        </AnimatePresence>
        </Suspense>
        <Footer />
      </div>
    </MotionConfig>
  )
}
