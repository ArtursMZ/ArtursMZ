import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  padding?: number
  strength?: number
  className?: string
  activeTransition?: string
  inactiveTransition?: string
}

/** Pulls its child toward the cursor while the cursor is within `padding` px of it. */
export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  className,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e: PointerEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = Math.abs(cx - e.clientX)
      const dy = Math.abs(cy - e.clientY)
      if (dx < r.width / 2 + padding && dy < r.height / 2 + padding) {
        setActive(true)
        setPos({ x: (e.clientX - cx) / strength, y: (e.clientY - cy) / strength })
      } else {
        setActive(false)
        setPos({ x: 0, y: 0 })
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [padding, strength])

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: active ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}
