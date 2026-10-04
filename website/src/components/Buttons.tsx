import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { ArrowUpRight } from './Icons'

type Tone = 'light' | 'dark' | 'outline-light' | 'outline-dark'

const tones: Record<Tone, string> = {
  // Hover swaps the fill instead of fading the button.
  light: 'bg-snow text-ink border-snow hover:bg-antler hover:border-antler hover:text-white',
  dark: 'bg-spruce text-snow border-spruce hover:bg-antler hover:border-antler',
  'outline-light': 'bg-transparent text-snow border-snow hover:bg-snow hover:text-ink',
  'outline-dark': 'bg-transparent text-ink border-ink hover:bg-ink hover:text-snow',
}

type Props = { children: ReactNode; to?: string; href?: string; tone?: Tone; size?: 'sm' | 'lg'; arrow?: boolean; className?: string; onClick?: () => void }

/** Rounded pill button. Internal links use the router, external ones a plain anchor. */
export function Pill({ children, to, href, tone = 'light', size = 'lg', arrow = false, className = '', onClick }: Props) {
  const cls = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border font-body font-medium transition-colors duration-200 ${
    size === 'lg' ? 'min-h-[52px] px-7 text-base sm:text-lg' : 'min-h-[40px] px-4 text-[15px] sm:px-5'
  } ${tones[tone]} ${className}`
  const inner = (
    <>
      {children}
      {arrow && <ArrowUpRight />}
    </>
  )
  if (to)
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    )
  if (href)
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    )
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  )
}
