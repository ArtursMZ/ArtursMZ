import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { NAV } from '../data/site'

export default function Navbar() {
  // Hide while scrolling down so it never sits on top of big headlines; show again on scroll up.
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > 160 && y > prev)
  })

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={hidden ? { opacity: 0, y: -100 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      onFocusCapture={() => setHidden(false)}
      className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
    >
      <nav aria-label="Main" className="flex items-center justify-between gap-4 px-6 pt-6 md:px-10 md:pt-8">
        <Link to="/" aria-label="AR website developmenTURS, home" className="text-lg font-black tracking-tight text-white md:text-2xl">
          AR<span className="font-light">/</span>
        </Link>
        <ul className="flex flex-1 items-center justify-between gap-3 pl-6 sm:max-w-[640px] sm:pl-0 md:max-w-[820px]">
          {NAV.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `group relative inline-flex min-h-[44px] items-center text-sm font-medium uppercase tracking-wider text-white transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem] ${isActive ? '' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}
