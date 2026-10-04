import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Eye, Hammer, Rocket } from 'lucide-react'
import { DEPOSIT } from '../data/site'
import FadeIn from './FadeIn'

const STEPS = [
  {
    icon: Hammer,
    title: `You pay $${DEPOSIT} upfront`,
    text: `The $${DEPOSIT} deposit gets me started. I design and build your website from scratch.`,
  },
  {
    icon: Eye,
    title: 'You see your website',
    text: 'I show you the finished site. Click through it, check every page and tell me what you think.',
  },
  {
    icon: Rocket,
    title: 'You love it, it goes live',
    text: 'Happy with everything? You buy the fully working website for the price we agreed on, and it launches.',
  },
]

/** Three-step "how it works" with a line that draws itself as you scroll. */
export default function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.5'] })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <ol ref={ref} className="relative mx-auto flex max-w-4xl flex-col gap-14 pl-16 sm:pl-24">
      <span aria-hidden="true" className="absolute bottom-2 left-[27px] top-2 w-[2px] bg-white/10 sm:left-[35px]" />
      <motion.span aria-hidden="true" className="absolute left-[27px] top-2 w-[2px] origin-top sm:left-[35px]" style={{ height, background: 'linear-gradient(#B600A8,#7621B0,#BE4C00)' }} />
      {STEPS.map(({ icon: Icon, title, text }, i) => (
        <FadeIn as="li" key={title} delay={i * 0.1} x={40} y={0} className="relative">
          <span className="absolute -left-16 top-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/20 bg-ink sm:-left-24 sm:h-[72px] sm:w-[72px]">
            <Icon aria-hidden="true" className="h-6 w-6 text-white sm:h-7 sm:w-7" />
          </span>
          <p className="text-sm uppercase tracking-[0.3em] text-mist/50">Step {String(i + 1).padStart(2, '0')}</p>
          <h3 className="mt-1 text-2xl font-semibold uppercase leading-tight text-white sm:text-4xl">{title}</h3>
          <p className="mt-3 max-w-xl text-base font-light leading-relaxed text-mist/75 sm:text-lg">{text}</p>
        </FadeIn>
      ))}
    </ol>
  )
}
