import { motion } from 'framer-motion'
import { SPACE } from '../../data/media'
import { LoopVideo, RemoteImg } from '../Media'

const PLANETS = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
const FACTS = [
  ['Distance', 'About 228 million km'],
  ['Year', '687 Earth days'],
  ['Temperature', 'Around -60 °C'],
  ['Atmosphere', '95% carbon dioxide'],
]

/** Recreation of the "Space Voyage" hero: Mars backdrop, tilting portal, giant title. */
export function SpaceVoyageMain() {
  return (
    <div className="media-fallback absolute inset-0 bg-[#0a0908] font-[Arial,sans-serif] text-white">
      <LoopVideo src={SPACE.marsBg} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 52%, rgba(0,0,0,.88) 100%)' }} />

      {/* header */}
      <div className="absolute inset-x-[3cqw] top-[3cqw] flex items-center justify-between">
        <RemoteImg src={SPACE.logo} className="h-[5cqw] w-[5cqw]" />
        <div className="flex items-center gap-[1cqw]">
          <div className="flex items-center rounded-full border border-white/45 bg-white/10 p-[0.5cqw] text-[1.5cqw] backdrop-blur">
            <span className="rounded-full bg-white px-[1.8cqw] py-[0.7cqw] text-black">About</span>
            <span className="px-[1.8cqw]">Explore</span>
            <span className="px-[1.8cqw]">Planets</span>
          </div>
          <span className="rounded-full bg-white px-[2cqw] py-[1.1cqw] text-[1.5cqw] text-black">Menu</span>
        </div>
      </div>

      {/* planet list */}
      <ul className="absolute left-[3cqw] top-1/2 flex -translate-y-[43%] flex-col gap-[0.6cqw] text-[1.5cqw]">
        {PLANETS.map((p, i) => (
          <motion.li
            key={p}
            className={`flex items-center gap-[0.8cqw] ${p === 'Mars' ? 'text-[1.8cqw] font-bold' : 'opacity-80'}`}
            animate={{ x: [-8, 0, 0, -8], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 7, times: [0, 0.12, 0.88, 1], delay: i * 0.05, repeat: Infinity }}
          >
            {p === 'Mars' && <span className="h-[1.5cqw] w-[1.5cqw] rounded-full bg-white" />}
            {p}
          </motion.li>
        ))}
      </ul>

      {/* portal */}
      <div className="absolute left-1/2 top-[46%] w-[28cqw] -translate-x-1/2 -translate-y-1/2" style={{ perspective: 900 }}>
        <div className="mb-[1cqw] flex justify-between text-[1.5cqw]">
          <span>Next:</span>
          <span>
            [03] <strong className="text-[1.7cqw]">Earth</strong>
          </span>
        </div>
        <motion.div
          className="aspect-[320/350] overflow-hidden rounded-[8cqw] bg-black shadow-2xl"
          animate={{ rotateY: [-14, 14, -14], rotateX: [8, -6, 8] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <LoopVideo src={SPACE.toEarth} className="h-full w-full object-cover" />
        </motion.div>
      </div>

      {/* title + facts */}
      <div className="absolute inset-x-[4cqw] bottom-[3cqw] flex items-end justify-between gap-[3cqw]">
        <motion.h3
          className="font-bebas leading-[0.72]"
          style={{ fontSize: '21cqw' }}
          animate={{ y: [30, 0, 0, 30], opacity: [0, 1, 1, 0], filter: ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(12px)'] }}
          transition={{ duration: 7, times: [0, 0.15, 0.88, 1], repeat: Infinity }}
        >
          MARS
        </motion.h3>
        <dl className="w-[34cqw] text-[1.35cqw]">
          {FACTS.map(([k, v], i) => (
            <motion.div
              key={k}
              className="grid grid-cols-[11cqw_1fr] gap-[1.4cqw] border-b border-white/50 py-[0.7cqw]"
              animate={{ y: [18, 0, 0, 18], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 7, times: [0, 0.15, 0.88, 1], delay: 0.3 + i * 0.16, repeat: Infinity }}
            >
              <dt className="font-bold">{k}:</dt>
              <dd>{v}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </div>
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
