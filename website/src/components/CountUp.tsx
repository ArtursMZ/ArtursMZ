import { animate, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function CountUp({ to, prefix = '', suffix = '', duration = 1.6 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${prefix}${to.toLocaleString('en-US')}${suffix}`
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = `${prefix}${Math.round(v).toLocaleString('en-US')}${suffix}`),
    })
    return () => controls.stop()
  }, [inView, to, prefix, suffix, duration])

  return (
    <span ref={ref}>
      {prefix}
      {to.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
