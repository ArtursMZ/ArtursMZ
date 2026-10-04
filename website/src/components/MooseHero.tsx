import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import MooseScene from './MooseScene'
import Treeline from './Treeline'
import { Pill } from './Buttons'
import { CopyIcon } from './Icons'
import { EMAIL } from '../data/site'

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(text)
      return
    }
    let i = 0
    let id = 0
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        i += 1
        setDisplayed(text.slice(0, i))
        if (i >= text.length) window.clearInterval(id)
      }, speed)
    }, startDelay)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(id)
    }
  }, [text, speed, startDelay])
  return { displayed, done: displayed.length === text.length }
}

/** The business name set on an arc over the moose's antlers. It slides along the curve into place and drifts with the mouse. */
function ArcTitle() {
  const [offset, setOffset] = useState(50)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e: PointerEvent) => setOffset(50 + (e.clientX / innerWidth - 0.5) * 3)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <svg viewBox="0 0 1000 300" className="w-full overflow-visible" aria-hidden="true">
      <defs>
        <path id="arc" d="M 10 270 Q 500 -20 990 270" />
      </defs>
      <text className="font-display" fontWeight={800} fontSize="56" letterSpacing="1" fill="#F2F4EF" stroke="#0E1713" strokeWidth="10" paintOrder="stroke" strokeLinejoin="round">
        <textPath href="#arc" startOffset={`${offset}%`} textAnchor="middle">
          <animate attributeName="startOffset" from="80%" to={`${offset}%`} dur="1.3s" begin="0.2s" fill="remove" calcMode="spline" keySplines="0.22 1 0.36 1" />
          AR WEBSITE DEVELOPMEN
          <tspan fill="#C9A982">TURS</tspan>
        </textPath>
      </text>
    </svg>
  )
}

const ACTIONS = [
  { label: 'See prices', to: '/services' },
  { label: 'View my work', to: '/work' },
  { label: 'About me', to: '/about' },
  { label: 'Book a call', to: '/contact' },
]

export default function MooseHero() {
  const wrap = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => (progress.current = v))

  // The breath fog covers the screen, then the snow-white page underneath takes over.
  const fog = useTransform(scrollYProgress, [0.45, 0.92], [0, 1])
  const textOut = useTransform(scrollYProgress, [0.05, 0.4], [1, 0])
  const textY = useTransform(scrollYProgress, [0.05, 0.4], [0, -40])

  const { displayed, done } = useTypewriter("I'm Artur. I build modern websites for businesses, and I can have yours ready in 3 days. What are we building?")
  const [showPills, setShowPills] = useState(false)
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setShowPills(true), 400)
    return () => window.clearTimeout(id)
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* the address is visible on the button, so nothing else to do */
    }
  }

  return (
    <div ref={wrap} className="relative h-[230vh]">
      <section aria-label="Introduction" className="sticky top-0 h-[100svh] min-h-[600px] overflow-hidden" style={{ background: 'linear-gradient(#1c2b26 0%, #2f433d 55%, #5b6f69 100%)' }}>
        {/* Forest backdrop */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0">
          <Treeline color="#22332d" seed={21} className="!h-[260px] opacity-90 sm:!h-[300px]" />
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0">
          <Treeline color="#16231e" seed={8} className="!h-[180px] sm:!h-[210px]" />
        </div>

        <MooseScene progress={progress} className="absolute inset-0" />

        {/* Name on an arc over the antlers */}
        <h1 className="sr-only">AR website developmenTURS, websites by Artur</h1>
        <div className="pointer-events-none absolute left-1/2 top-[13%] w-[104vw] -translate-x-1/2 md:left-[58%] md:top-[6%] md:w-[min(980px,62vw)]">
          <ArcTitle />
        </div>

        {/* Template-style intro, bottom left */}
        <motion.div style={{ opacity: textOut, y: textY }} className="absolute inset-x-0 bottom-0 z-10 px-5 pb-10 sm:px-8 md:px-10 md:pb-14">
          <div className="max-w-xl text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            <p className="pointer-events-none mb-4 select-none blur-[3px]" style={{ fontSize: 'clamp(16px, 3.6vw, 23px)', lineHeight: 1.3 }} aria-hidden="true">
              Hey there, meet the moose.
              <br />
              AR website developmenTURS, made in Germany
            </p>
            <p className="mb-5 min-h-[3.2em]" style={{ fontSize: 'clamp(18px, 4vw, 26px)', lineHeight: 1.35 }}>
              <span className="sr-only">I'm Artur. I build modern websites for businesses, and I can have yours ready in 3 days. What are we building?</span>
              <span aria-hidden="true">
                {displayed}
                {!done && <span className="caret ml-[2px] inline-block h-[1.1em] w-[2px] bg-white align-middle" />}
              </span>
            </p>
            <div className="flex flex-wrap gap-2" style={{ opacity: showPills ? 1 : 0, transform: showPills ? 'none' : 'translateY(8px)', transition: 'opacity .4s ease, transform .4s ease' }}>
              {ACTIONS.map((a) => (
                <Pill key={a.to} to={a.to} size="sm" tone="light">
                  {a.label}
                </Pill>
              ))}
              <Pill size="sm" tone="outline-light" onClick={copy} className="gap-3">
                {copied ? (
                  'Email copied'
                ) : (
                  <>
                    <span>
                      Email: <span className="underline underline-offset-2">{EMAIL}</span>
                    </span>
                    <CopyIcon />
                  </>
                )}
              </Pill>
            </div>
          </div>
        </motion.div>

        {/* Breath fog takeover */}
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 bg-snow" style={{ opacity: fog }} />
      </section>
    </div>
  )
}
