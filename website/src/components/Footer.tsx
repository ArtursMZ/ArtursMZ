import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail } from 'lucide-react'
import { BRAND, EMAIL, MAILTO, NAV } from '../data/site'
import FadeIn from './FadeIn'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink px-5 pb-10 pt-20 sm:px-8 md:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[90%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'var(--brand)' }}
      />
      <div className="relative mx-auto max-w-7xl">
        <FadeIn className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-mist/60">Got a project?</p>
            <a href={MAILTO} className="group mt-3 inline-flex items-center gap-3 text-[clamp(1.4rem,4.2vw,3.6rem)] font-semibold leading-tight text-white">
              <span className="break-all">{EMAIL}</span>
              <ArrowUpRight aria-hidden="true" className="h-[0.8em] w-[0.8em] shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {NAV.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="inline-flex min-h-[44px] items-center text-base uppercase tracking-wider text-mist transition-opacity hover:opacity-70">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </FadeIn>
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-mist/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND}. Made in Germany, for the world.
          </p>
          <a href={MAILTO} className="inline-flex min-h-[44px] items-center gap-2 transition-opacity hover:opacity-70">
            <Mail aria-hidden="true" className="h-4 w-4" /> Write to Artur
          </a>
        </div>
      </div>
    </footer>
  )
}
