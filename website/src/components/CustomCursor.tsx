import { useEffect, useRef, useState } from 'react'

/** Soft gradient ring that trails the pointer on desktop. Hidden on touch and reduced motion. */
export default function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)
    let x = innerWidth / 2
    let y = innerHeight / 2
    let rx = x
    let ry = y
    let hover = false
    let scale = 1
    let raf = 0
    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      hover = !!(e.target as Element)?.closest?.('a,button,[data-cursor="hover"]')
    }
    const loop = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      scale += ((hover ? 1.8 : 1) - scale) * 0.15
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%) scale(${scale})`
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null
  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] h-10 w-10 rounded-full border border-white/70 mix-blend-difference"
      />
      <div ref={dot} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference" />
    </>
  )
}
