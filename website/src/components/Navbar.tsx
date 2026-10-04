import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Fragment, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV } from '../data/site'

const link = 'underline-offset-4 decoration-2 hover:underline'

/** Navbar in the style of the 3D Character Studio template: comma-separated links, underlined CTA, hamburger on phones. */
export default function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const [solid, setSolid] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > 160 && y > prev)
    setSolid(y > 40)
  })
  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? -110 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        onFocusCapture={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 text-snow transition-colors duration-300 ${solid ? 'bg-night' : 'bg-transparent [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]'}`}
      >
        <nav aria-label="Main" className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
          <Link to="/" className="font-display text-[19px] font-medium tracking-tight sm:text-[23px]" aria-label="AR website developmenTURS, home">
            AR website developmen<span className="font-bold">TURS</span>
            <sup className="ml-0.5 text-[0.55em]">®</sup>
          </Link>
          <ul className="hidden items-center text-[21px] md:flex">
            {NAV.map(({ to, label }, i) => (
              <Fragment key={to}>
                <li>
                  <NavLink to={to} className={({ isActive }) => `${link} ${isActive ? 'underline' : ''}`}>
                    {label}
                  </NavLink>
                </li>
                {i < NAV.length - 1 && <li aria-hidden="true">,&nbsp;</li>}
              </Fragment>
            ))}
          </ul>
          <Link to="/contact" className="hidden text-[21px] underline decoration-2 underline-offset-4 hover:decoration-4 md:inline">
            Get in touch
          </Link>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span className={`h-[2px] w-6 bg-snow transition-transform duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-[2px] w-6 bg-snow transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-6 bg-snow transition-transform duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </nav>
      </motion.header>

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center gap-7 bg-night px-8 transition-opacity duration-300 md:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-hidden={!open}
      >
        {[{ to: '/', label: 'Home' }, ...NAV].map(({ to, label }) => (
          <Link key={to} to={to} tabIndex={open ? 0 : -1} className="font-display text-[34px] font-medium text-snow">
            {label}
          </Link>
        ))}
        <Link to="/contact" tabIndex={open ? 0 : -1} className="font-display text-[34px] text-snow underline underline-offset-4">
          Get in touch
        </Link>
      </div>
    </>
  )
}
