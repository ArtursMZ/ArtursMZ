import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

const pill =
  'brand-pill group inline-flex items-center gap-2 rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer'

type Props = { children?: ReactNode; to?: string; href?: string; className?: string }

/** The gradient "Contact Me" pill from the 3D Portfolio template. */
export function ContactButton({ children = 'Contact Me', to = '/contact', href, className = '' }: Props) {
  const inner = (
    <>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </>
  )
  if (href) {
    return (
      <a href={href} className={`${pill} ${className}`}>
        {inner}
      </a>
    )
  }
  return (
    <Link to={to} className={`${pill} ${className}`}>
      {inner}
    </Link>
  )
}

/** Ghost outline pill. */
export function GhostButton({ children, to = '/', className = '' }: Props) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 rounded-full border-2 border-mist px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-mist transition-colors duration-200 hover:bg-mist/10 cursor-pointer ${className}`}
    >
      {children}
    </Link>
  )
}
