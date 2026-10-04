import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SPACE } from '../../data/media'
import { LoopVideo, RemoteImg } from '../Media'

const PLANETS = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']

type Leg = { name: string; next: string; number: string; portal: string; image?: boolean; facts: [string, string][] }

const LEGS: Leg[] = [
  {
    name: 'Mars',
    next: 'Earth',
    number: '[03]',
    portal: SPACE.toEarth,
    facts: [
      ['Distance', 'About 228 million km'],
      ['Year', '687 Earth days'],
      ['Temperature', 'Around -60 °C'],
      ['Atmosphere', '95% carbon dioxide'],
    ],
  },
  {
    name: 'Earth',
    next: 'Venus',
    number: '[02]',
    portal: SPACE.toVenus,
    facts: [
      ['Distance', '149.6 million km'],
      ['Year', '365.25 Earth days'],
      ['Temperature', 'Around 15 °C'],
      ['Atmosphere', 'Nitrogen and oxygen'],
    ],
  },
  {
    name: 'Venus',
    next: 'Mercury',
    number: '[06]',
    portal: SPACE.mercury,
    image: true,
    facts: [
      ['Distance', '108.2 million km'],
      ['Year', '225 Earth days'],
      ['Temperature', 'Around 465 °C'],
      ['Atmosphere', 'Dense CO₂, acid clouds'],
    ],
  },
]

const ease = [0.65, 0, 0.35, 1] as const
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** Resolve when the video ends, or after `fallback` ms if it never loads (e.g. the host is blocked). */
function playToEnd(v: HTMLVideoElement | null, rate: number, fallback: number) {
  return new Promise<void>((resolve) => {
    if (!v) return resolve()
    let done = false
    const finish = () => {
      if (done) return
      done = true
      v.removeEventListener('ended', finish)
      resolve()
    }
    v.addEventListener('ended', finish)
    v.currentTime = 0
    v.playbackRate = rate
    v.play().catch(finish)
    setTimeout(finish, fallback)
  })
}

/**
 * Recreation of the "Space Voyage" template that plays its whole sequence on a loop:
 * preloader flight to Mars with a 0-100% counter, then the portal swallows the screen and
 * flies you to Earth, then to Venus, then back to the start.
 */
export function SpaceVoyageMain() {
  const frame = useRef<HTMLDivElement>(null)
  const portalVideo = useRef<HTMLVideoElement>(null)
  const preVideo = useRef<HTMLVideoElement>(null)
  const [size, setSize] = useState({ w: 800, h: 500 })
  const [leg, setLeg] = useState(0)
  const [phase, setPhase] = useState<'preload' | 'idle' | 'travel' | 'reveal'>('preload')
  const [count, setCount] = useState(0)
  const [bgFrozen, setBgFrozen] = useState<string | null>(null)

  // Portal rectangle in px, animated between the small window and the full frame.
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const w = useMotionValue(0)
  const h = useMotionValue(0)
  const radius = useMotionValue(0)
  const reveal = useMotionValue(0)
  const innerLeft = useTransform(x, (v) => -v)
  const innerTop = useTransform(y, (v) => -v)

  const small = (fw: number, fh: number) => {
    const pw = fw * 0.28
    const ph = pw * (350 / 320)
    return { x: (fw - pw) / 2, y: fh * 0.47 - ph / 2, w: pw, h: ph, r: pw * 0.28 }
  }

  useEffect(() => {
    const el = frame.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const s = { w: el.clientWidth, h: el.clientHeight }
      setSize(s)
      if (phase !== 'travel') {
        const r = small(s.w, s.h)
        x.set(r.x)
        y.set(r.y)
        w.set(r.w)
        h.set(r.h)
        radius.set(r.r)
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [phase, x, y, w, h, radius])

  // Only run the sequence while the preview is on screen
  const onScreen = useRef(false)
  useEffect(() => {
    const el = frame.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => (onScreen.current = e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // The sequence
  useEffect(() => {
    let cancelled = false
    const hold = async (ms: number) => {
      await sleep(ms)
      while (!onScreen.current && !cancelled) await sleep(300)
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setPhase('idle')
      reveal.set(1)
      return
    }

    const run = async () => {
      while (!cancelled) {
        await hold(0)
        // 1. Preloader: flight to Mars, counter 0-100
        setLeg(0)
        setBgFrozen(null)
        setPhase('preload')
        setCount(0)
        reveal.set(0)
        const v = preVideo.current
        const start = performance.now()
        const counter = setInterval(() => {
          const pct = v && v.duration ? v.currentTime / v.duration : (performance.now() - start) / 3000
          setCount(Math.min(100, Math.round(pct * 100)))
        }, 50)
        await playToEnd(v, v && v.duration ? Math.max(0.25, v.duration / 3) : 1, 3200)
        clearInterval(counter)
        setCount(100)
        if (cancelled) return
        await hold(300)

        for (let i = 0; i < LEGS.length && !cancelled; i++) {
          setLeg(i)
          setPhase('reveal')
          const el = frame.current!
          const r = small(el.clientWidth, el.clientHeight)
          x.set(r.x)
          y.set(r.y)
          w.set(r.w)
          h.set(r.h)
          radius.set(r.r)
          await animate(reveal, 1, { duration: 1.05, ease: [0.16, 1, 0.3, 1] })
          setPhase('idle')
          await hold(3800)
          if (cancelled) return
          if (LEGS[i].image) break // Venus is the last stop

          // 2. Travel: the window grows to fill the frame while the flight plays
          setPhase('travel')
          const fw = el.clientWidth
          const fh = el.clientHeight
          const flight = playToEnd(portalVideo.current, 1.3, 5200)
          await Promise.all([
            animate(x, 0, { duration: 1.1, ease }),
            animate(y, 0, { duration: 1.1, ease }),
            animate(w, fw, { duration: 1.1, ease }),
            animate(h, fh, { duration: 1.1, ease }),
            animate(radius, 0, { duration: 1.1, ease }),
          ])
          await flight
          if (cancelled) return
          // Hold the last frame of the flight as the new background
          setBgFrozen(LEGS[i].portal)
          await sleep(350)
          reveal.set(0)
        }
        await sleep(400)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [x, y, w, h, radius, reveal])

  const current = LEGS[leg]
  const chromeHidden = phase === 'travel' || phase === 'preload'
  const portalScale = useTransform(reveal, [0, 1], [0, 1])

  return (
    <div ref={frame} className="media-fallback absolute inset-0 overflow-hidden bg-[#0a0908] font-[Arial,sans-serif] text-white">
      {/* Background: Mars loop, or the frozen last frame of the flight we just took */}
      {bgFrozen ? <FrozenEnd key={bgFrozen} src={bgFrozen} /> : <LoopVideo src={SPACE.marsBg} className="absolute inset-0 h-full w-full object-cover" />}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 52%, rgba(0,0,0,.88) 100%)' }} />

      {/* Portal window: its media is locked to the frame, so the window moves over a still picture */}
      {phase !== 'preload' && (
        <div className="absolute inset-0" style={{ perspective: 900 }}>
          <motion.div
            className="absolute overflow-hidden bg-black"
            style={{
              left: x,
              top: y,
              width: w,
              height: h,
              borderRadius: radius,
              scale: phase === 'travel' ? 1 : portalScale,
            }}
            animate={phase === 'idle' ? { rotateY: [-14, 14, -14], rotateX: [8, -6, 8] } : { rotateY: 0, rotateX: 0 }}
            transition={phase === 'idle' ? { duration: 7, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.5 }}
          >
            <motion.div className="absolute" style={{ left: innerLeft, top: innerTop, width: size.w, height: size.h }}>
              {current.image ? (
                <RemoteImg src={current.portal} className="h-full w-full object-cover" eager />
              ) : (
                <video key={current.portal} ref={portalVideo} src={current.portal} muted playsInline preload="auto" className="h-full w-full object-cover" />
              )}
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Chrome */}
      <div className="transition-[opacity,filter] duration-500" style={{ opacity: chromeHidden ? 0 : 1, filter: chromeHidden ? 'blur(8px)' : 'none' }}>
        <div className="absolute inset-x-[3cqw] top-[3cqw] flex items-center justify-between">
          <RemoteImg src={SPACE.logo} className="h-[5cqw] w-[5cqw]" />
          <div className="flex items-center gap-[1cqw]">
            <div className="flex items-center rounded-full border border-white/45 bg-white/10 p-[0.5cqw] text-[1.5cqw]">
              <span className="rounded-full bg-white px-[1.8cqw] py-[0.7cqw] text-black">About</span>
              <span className="px-[1.8cqw]">Explore</span>
              <span className="px-[1.8cqw]">Planets</span>
            </div>
            <span className="rounded-full bg-white px-[2cqw] py-[1.1cqw] text-[1.5cqw] text-black">Menu</span>
          </div>
        </div>

        <ul key={`list-${leg}`} className="absolute left-[3cqw] top-1/2 flex -translate-y-[43%] flex-col gap-[0.6cqw] text-[1.5cqw]">
          {PLANETS.map((p, i) => (
            <motion.li
              key={p}
              className={`flex items-center gap-[0.8cqw] ${p === current.name ? 'text-[1.8cqw] font-bold' : 'opacity-80'}`}
              initial={{ opacity: 0.35, x: -8 }}
              animate={{ opacity: p === current.name ? 1 : 0.8, x: 0 }}
              transition={{ duration: 0.58, delay: 0.02 + i * 0.03 }}
            >
              {p === current.name && <span className="h-[1.5cqw] w-[1.5cqw] rounded-full bg-white" />}
              {p}
            </motion.li>
          ))}
        </ul>

        <div className="absolute left-1/2 w-[28cqw] -translate-x-1/2" style={{ top: `calc(${size.h * 0.47}px - 28cqw * ${350 / 320} / 2 - 3.2cqw)` }}>
          <div className="flex justify-between text-[1.5cqw]">
            <span>Next:</span>
            <span>
              {current.number} <strong className="text-[1.7cqw]">{current.next}</strong>
            </span>
          </div>
        </div>

        <div key={`content-${leg}`} className="absolute inset-x-[4cqw] bottom-[3cqw] flex items-end justify-between gap-[3cqw]">
          <motion.h3
            className="font-bebas leading-[0.72]"
            style={{ fontSize: '21cqw' }}
            initial={{ opacity: 0, y: 42, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {current.name.toUpperCase()}
          </motion.h3>
          <dl className="w-[34cqw] text-[1.35cqw]">
            {current.facts.map(([k, v], i) => (
              <motion.div
                key={k}
                className="grid grid-cols-[11cqw_1fr] gap-[1.4cqw] border-b border-white/50 py-[0.7cqw]"
                initial={{ opacity: 0, y: 18, filter: 'blur(7px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.72, delay: 0.52 + i * 0.16 }}
              >
                <dt className="font-bold">{k}:</dt>
                <dd>{v}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      {/* Preloader */}
      <div className="absolute inset-0 bg-black transition-opacity duration-700" style={{ opacity: phase === 'preload' ? 1 : 0, pointerEvents: 'none' }}>
        <video ref={preVideo} src={SPACE.toMars} muted playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-b from-transparent to-black" />
        <RemoteImg src={SPACE.logo} className="absolute left-1/2 top-1/2 h-[6cqw] w-[6cqw] -translate-x-1/2 -translate-y-1/2" eager />
        <div className="absolute bottom-[3cqw] left-1/2 flex -translate-x-1/2 items-end gap-[0.4cqw] leading-none">
          <span className="text-[6.4cqw] font-thin tabular-nums">{count}</span>
          <span className="pb-[0.5cqw] text-[2.4cqw]">%</span>
        </div>
      </div>
    </div>
  )
}

/** A video parked on its last frame. */
function FrozenEnd({ src }: { src: string }) {
  return (
    <video
      src={src}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      onLoadedMetadata={(e) => {
        const v = e.currentTarget
        v.currentTime = Math.max(0, v.duration - 0.05)
      }}
      className="absolute inset-0 h-full w-full object-cover"
    />
  )
}

export function SpaceVoyageSideA() {
  return (
    <div className="media-fallback absolute inset-0">
      <RemoteImg src={SPACE.gif} className="h-full w-full object-cover" />
    </div>
  )
}

export function SpaceVoyageSideB() {
  return (
    <div className="media-fallback absolute inset-0">
      <LoopVideo src={SPACE.toVenus} className="h-full w-full object-cover" />
      <span className="absolute bottom-[8%] left-[8%] font-bebas text-[clamp(2rem,6vw,4.5rem)] leading-none text-white">VENUS</span>
    </div>
  )
}
