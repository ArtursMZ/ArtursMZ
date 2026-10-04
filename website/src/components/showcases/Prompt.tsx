import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { PROMPT } from '../../data/media'
import { LoopVideo, RemoteImg } from '../Media'

const SYMBOLS = ['8', '$', '^^', '%', '/']
const blend = { mixBlendMode: 'exclusion' as const }

/** Recreation of the "PROMPT" fashion archive: video hero, exclusion-blend type, a gallery panel sliding up. */
export function PromptMain() {
  const [sym, setSym] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setSym((s) => (s + 1) % SYMBOLS.length), 900)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 bg-white font-tight text-white">
      <LoopVideo src={PROMPT.right} className="absolute inset-0 h-full w-full object-cover" />

      {/* black gallery panel that slides up and back */}
      <motion.div
        className="absolute inset-0 z-10 overflow-hidden bg-black"
        animate={{ y: ['100%', '100%', '0%', '0%', '100%'] }}
        transition={{ duration: 10, times: [0, 0.3, 0.45, 0.85, 1], repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="grid grid-cols-4 gap-[1.5cqw] p-[3cqw] pt-[20cqw]">
          {PROMPT.gallery.slice(0, 4).map((src, i) => (
            <motion.div
              key={src}
              className={`media-fallback aspect-[2/3] overflow-hidden ${i % 2 ? 'mt-[8cqw]' : ''}`}
              style={{ transformOrigin: i < 2 ? 'right bottom' : 'left bottom' }}
              animate={{ scale: [0, 0, 1, 1, 0] }}
              transition={{ duration: 10, times: [0, 0.38, 0.55, 0.85, 1], delay: i * 0.08, repeat: Infinity }}
            >
              <RemoteImg src={src} className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="absolute left-[3cqw] top-[3cqw] z-20 text-[11cqw] font-medium leading-none tracking-[-0.06em]" style={blend}>
        prmpt<sup className="ml-[0.5cqw] align-super text-[3cqw]">®</sup>
      </div>
      <p className="absolute left-[3cqw] top-[17cqw] z-20 w-[40cqw] text-[1.25cqw] leading-[1.4] tracking-[-0.04em]" style={blend}>
        An archive of looks, moving with your cursor. Scroll to open the collection.
      </p>
      <div className="absolute right-[3cqw] top-[3cqw] z-20 flex w-[30cqw] items-center justify-between text-[1.5cqw] uppercase" style={blend}>
        <span>About</span>
        <span className="flex items-center gap-[4cqw]">
          <svg viewBox="0 0 40 40" className="h-[3cqw] w-[3cqw]" fill="none" stroke="#fff" strokeWidth="2.5">
            <path d="M0 14H40M0 26H40" />
          </svg>
          [ Cart ]
        </span>
      </div>
      <div className="absolute bottom-[4cqw] right-[3cqw] z-20 flex w-[30cqw] flex-col items-center" style={blend}>
        <div className="mb-[2cqw] flex w-full flex-col items-start">
          <span className="relative mb-[1cqw] flex h-[3cqw] w-[3cqw] items-center justify-center rounded-full border-[0.25cqw] border-white text-[1.3cqw]">
            {SYMBOLS[sym]}
          </span>
          <span className="text-[2.6cqw] uppercase leading-none tracking-[-0.04em]">
            Archive collection
            <br />
            "Prompt"
          </span>
        </div>
        <span className="text-[7cqw] leading-none tracking-[-0.04em]">$97,33</span>
      </div>
    </div>
  )
}

export function PromptSideA() {
  return (
    <div className="media-fallback absolute inset-0">
      <motion.div className="h-full w-full" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <RemoteImg src={PROMPT.gallery[4]} className="h-full w-full object-cover" />
      </motion.div>
    </div>
  )
}

export function PromptSideB() {
  return (
    <div className="media-fallback absolute inset-0">
      <LoopVideo src={PROMPT.left} className="h-full w-full object-cover" />
      <span className="absolute bottom-[8%] left-[8%] font-tight text-[clamp(1.6rem,4vw,3rem)] font-medium leading-none tracking-[-0.05em] text-white [mix-blend-mode:exclusion]">
        prmpt®
      </span>
    </div>
  )
}
