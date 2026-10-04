// The handful of icons the site needs, drawn inline instead of pulling in an icon library.
type P = { className?: string }
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }

export const ArrowUpRight = ({ className = 'h-4 w-4' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const CopyIcon = ({ className = 'h-3 w-3' }: P) => (
  <svg viewBox="0 0 12 12" className={className} {...base} strokeWidth={1.2}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
    <path d="M8.5 1.5h-6a1 1 0 0 0-1 1v6" />
  </svg>
)

export const CheckIcon = ({ className = 'h-4 w-4' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.6}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)
