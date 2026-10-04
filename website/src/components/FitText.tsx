import { useLayoutEffect, useRef, type ReactNode } from 'react'

/** Scales a single line of text so it exactly fills the width of its container. */
export default function FitText({ children, className = '', fill = 0.98 }: { children: ReactNode; className?: string; fill?: number }) {
  const box = useRef<HTMLSpanElement>(null)
  const line = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const b = box.current
    const l = line.current
    if (!b || !l) return
    const fit = () => {
      l.style.fontSize = '100px'
      const ratio = (b.clientWidth * fill) / l.scrollWidth
      l.style.fontSize = `${Math.floor(100 * ratio * 100) / 100}px`
    }
    fit()
    document.fonts?.ready.then(fit)
    const ro = new ResizeObserver(fit)
    ro.observe(b)
    return () => ro.disconnect()
  }, [fill])

  return (
    <span ref={box} className={`block w-full ${className}`}>
      <span ref={line} className="inline-block whitespace-nowrap">
        {children}
      </span>
    </span>
  )
}
