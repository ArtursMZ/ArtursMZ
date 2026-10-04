import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { DIGITAL } from '../../data/media'
import { LoopVideo } from '../Media'

const WORDS = 'Crafted Digital Experiences Built to Outlast Trends'.split(' ')
const blurIn = { initial: { filter: 'blur(10px)', opacity: 0, y: 20 }, animate: { filter: 'blur(0px)', opacity: 1, y: 0 } }

/** Recreation of the "Digital Experiences" agency hero with liquid-glass UI and blur-in headline. */
export function DigitalMain() {
  // Replay the entrance every few seconds so the preview stays alive.
  const [run, setRun] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setRun((r) => r + 1), 7000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="media-fallback absolute inset-0 bg-black font-barlow text-white">
      <LoopVideo src={DIGITAL.hero} className="absolute left-1/2 top-0 h-[120%] w-[120%] -translate-x-1/2 object-cover object-top" />
      <div className="absolute inset-x-[4cqw] top-[2.5cqw] flex items-center justify-between">
        <span className="liquid-glass flex h-[5cqw] w-[5cqw] items-center justify-center rounded-full font-serif text-[2.4cqw] italic">a</span>
        <div className="liquid-glass flex items-center rounded-full p-[0.5cqw] text-[1.3cqw]">
          {['Work', 'Studio', 'Services', 'Journal', 'Contact'].map((l) => (
            <span key={l} className="px-[1.2cqw] py-[0.6cqw] text-white/90">
              {l}
            </span>
          ))}
          <span className="ml-[0.5cqw] rounded-full bg-white px-[1.6cqw] py-[0.7cqw] text-black">Start a Project ↗</span>
        </div>
        <span className="h-[5cqw] w-[5cqw]" />
      </div>

      <div key={run} className="absolute inset-0 flex flex-col items-center justify-center px-[4cqw] pt-[6cqw] text-center">
        <motion.div {...blurIn} transition={{ duration: 0.8, delay: 0.3 }} className="liquid-glass flex items-center gap-[1cqw] rounded-full py-[0.5cqw] pl-[0.5cqw] pr-[1.5cqw] text-[1.2cqw]">
          <span className="rounded-full bg-white px-[1cqw] py-[0.3cqw] font-medium text-black">New</span>
          Booking Q3 2026 engagements, limited capacity
        </motion.div>
        <h3 className="mt-[2cqw] flex max-w-[64cqw] flex-wrap justify-center font-serif italic leading-[0.8] tracking-[-0.3cqw]" style={{ fontSize: '7.4cqw', rowGap: '0.1em' }}>
          {WORDS.map((w, i) => (
            <motion.span key={i} className="mr-[0.28em] inline-block" {...blurIn} transition={{ duration: 0.7, delay: 0.5 + i * 0.1 }}>
              {w}
            </motion.span>
          ))}
        </h3>
        <motion.p {...blurIn} transition={{ duration: 0.8, delay: 1.2 }} className="mt-[1.6cqw] max-w-[52cqw] text-[1.4cqw] font-light leading-tight">
          A small studio shaping brand-defining websites. Precise typography, cinematic motion, and code you can be proud of.
        </motion.p>
        <motion.div {...blurIn} transition={{ duration: 0.8, delay: 1.5 }} className="mt-[2.4cqw] flex gap-[1.6cqw]">
          {[
            ['6 Weeks', 'Average launch time'],
            ['140+', 'Brands shipped'],
          ].map(([n, l]) => (
            <div key={n} className="liquid-glass w-[18cqw] rounded-[1.6cqw] p-[1.6cqw] text-left">
              <div className="font-serif text-[3.4cqw] italic leading-none">{n}</div>
              <div className="mt-[0.6cqw] text-[1.1cqw] text-white/80">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export function DigitalSideA() {
  return (
    <div className="media-fallback absolute inset-0 bg-black text-white">
      <LoopVideo src={DIGITAL.capabilities} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute left-[8%] top-[10%]">
        <p className="font-barlow text-xs text-white/80">// Capabilities</p>
        <p className="mt-2 font-serif text-[clamp(1.6rem,3.6vw,3rem)] italic leading-[0.9] tracking-[-1px]">
          Studio craft,
          <br />
          end to end
        </p>
      </div>
    </div>
  )
}

export function DigitalSideB() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black text-white">
      <motion.div
        aria-hidden="true"
        className="absolute -left-1/4 top-1/4 h-[90%] w-[90%] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(118,33,176,.7), transparent 65%)' }}
        animate={{ x: ['0%', '40%', '0%'], y: ['0%', '-20%', '0%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-[8%]">
      <div className="liquid-glass flex h-full flex-col rounded-[1.25rem] p-5">
        <div className="flex flex-wrap justify-end gap-1.5">
          {['React', 'Next.js', 'Headless CMS', 'Edge-Ready'].map((t) => (
            <span key={t} className="liquid-glass rounded-full px-3 py-1 font-barlow text-[11px] text-white/90">
              {t}
            </span>
          ))}
        </div>
        <div className="flex-1" />
        <p className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] italic leading-none tracking-[-1px]">Engineering</p>
        <p className="mt-2 max-w-[32ch] font-barlow text-sm font-light leading-snug text-white/90">Production-grade front-ends that are fast, accessible and a joy to extend.</p>
      </div>
      </div>
    </div>
  )
}
