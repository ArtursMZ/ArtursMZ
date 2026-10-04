import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

function Char({ char, progress, range }: { char: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span className="relative">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  )
}

/** Each character brightens from 20% to 100% opacity as the paragraph scrolls through view. */
export default function AnimatedText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  const words = text.split(' ')
  const total = text.length
  let index = 0

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, w) => {
        const chars = word.split('').map((c) => {
          const start = index / total
          index += 1
          return <Char key={index} char={c} progress={scrollYProgress} range={[start, Math.min(1, start + 1 / total + 0.02)]} />
        })
        index += 1 // the space
        return (
          <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap">
            {chars}
            {w < words.length - 1 && <span>&nbsp;</span>}
          </span>
        )
      })}
    </p>
  )
}
