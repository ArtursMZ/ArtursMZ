import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { DEPOSIT } from '../data/site'

const STEPS = [
  { title: `You pay $${DEPOSIT} to start`, text: `The $${DEPOSIT} deposit covers building your website and showing it to you.` },
  { title: 'You see your website', text: 'I show you the finished site. Click through every page and tell me what you think.' },
  { title: 'You like it, you buy it', text: 'If you like everything, you buy the fully working website for the price we agreed on, and it goes live.' },
]

/** Three steps in order, joined by a line that draws itself as you scroll. Sits on a dark background. */
export default function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.5'] })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <ol ref={ref} className="relative mx-auto flex max-w-3xl flex-col gap-14 pl-20 sm:pl-24">
      <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-[2px] bg-snow/15 sm:left-[31px]" />
      <motion.span aria-hidden="true" className="absolute left-[27px] top-6 w-[2px] origin-top bg-antler sm:left-[31px]" style={{ height }} />
      {STEPS.map(({ title, text }, i) => (
        <li key={title} className="relative">
          <span className="absolute -left-20 top-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-snow bg-night font-display text-xl font-semibold sm:-left-24 sm:h-16 sm:w-16">
            {i + 1}
          </span>
          <h3 className="pt-2 text-2xl font-semibold uppercase leading-tight text-snow sm:text-4xl">{title}</h3>
          <p className="mt-3 max-w-[52ch] text-lg text-fog">{text}</p>
        </li>
      ))}
    </ol>
  )
}
