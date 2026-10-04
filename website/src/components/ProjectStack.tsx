import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import BrowserFrame from './showcases/BrowserFrame'

export type Project = {
  name: string
  category: string
  url: string
  blurb: string
  main: ReactNode
  sideA: ReactNode
  sideB: ReactNode
}

function Card({ p, i, total, progress }: { p: Project; i: number; total: number; progress: MotionValue<number> }) {
  const targetScale = 1 - (total - 1 - i) * 0.03
  const scale = useTransform(progress, [i / total, 1], [1, targetScale])

  return (
    <div className="sticky top-24 flex h-[85vh] items-start justify-center md:top-32">
      <motion.article
        style={{ scale, top: `${i * 28}px` }}
        className="relative flex h-full max-h-[760px] w-full max-w-7xl origin-top flex-col gap-4 rounded-[40px] border-2 border-mist bg-ink p-4 sm:gap-6 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div className="flex items-end gap-4 sm:gap-6">
            <span className="font-black leading-[0.8] text-mist" style={{ fontSize: 'clamp(2.6rem, 7vw, 100px)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="pb-1">
              <p className="text-xs uppercase tracking-[0.25em] text-mist/60 sm:text-sm">{p.category}</p>
              <h3 className="text-xl font-semibold uppercase leading-tight text-white sm:text-3xl md:text-4xl">{p.name}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="hidden max-w-xs text-sm font-light leading-snug text-mist/70 lg:block">{p.blurb}</p>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-mist px-4 py-2 text-xs font-medium uppercase tracking-widest text-mist sm:px-6 sm:text-sm">
              <span className="pulse-dot h-2 w-2 rounded-full bg-cyan-300" aria-hidden="true" />
              Live preview
            </span>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 gap-3 sm:gap-4">
          <div className="hidden w-[34%] flex-col gap-3 sm:flex sm:gap-4">
            <div className="relative flex-[0.42] overflow-hidden rounded-[28px] sm:rounded-[36px] md:rounded-[44px]" aria-hidden="true">
              {p.sideA}
            </div>
            <div className="relative flex-[0.58] overflow-hidden rounded-[28px] sm:rounded-[36px] md:rounded-[44px]" aria-hidden="true">
              {p.sideB}
            </div>
          </div>
          <div className="min-h-0 flex-1">
            <BrowserFrame url={p.url}>{p.main}</BrowserFrame>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

/** Sticky cards that stack and shrink slightly as you scroll past them. */
export default function ProjectStack({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <div ref={ref} className="relative mx-auto flex w-full flex-col gap-[10vh]">
      {projects.map((p, i) => (
        <Card key={p.name} p={p} i={i} total={projects.length} progress={scrollYProgress} />
      ))}
    </div>
  )
}
