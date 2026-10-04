import { Link } from 'react-router-dom'
import { BRAND, EMAIL, MAILTO, NAV } from '../data/site'

export default function Footer() {
  return (
    <footer className="bg-night px-5 pb-10 pt-section sm:px-8 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-fog">Got a project?</p>
            <a href={MAILTO} className="mt-3 block break-all font-display text-[clamp(1.6rem,4.4vw,3.6rem)] font-semibold leading-tight text-snow underline-offset-8 hover:underline">
              {EMAIL}
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {NAV.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="inline-flex min-h-[44px] items-center text-lg text-snow underline-offset-4 hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-snow/15 pt-6 text-fog sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND}. Made in Germany.
          </p>
          <p>Websites for businesses around the world.</p>
        </div>
      </div>
    </footer>
  )
}
