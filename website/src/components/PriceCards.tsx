import { Check, MessagesSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { DEPOSIT, PACKAGES } from '../data/site'
import CountUp from './CountUp'
import FadeIn from './FadeIn'
import { ContactButton } from './Buttons'

/** The two standard packages plus the "anything else" card. Designed for a white background. */
export default function PriceCards() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
      {PACKAGES.map((p, i) => (
        <FadeIn key={p.id} delay={i * 0.12} y={50}>
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className={`${i === 1 ? 'spin-border' : ''} h-full rounded-[36px] shadow-[0_30px_80px_-30px_rgba(0, 163, 255,0.6)] sm:rounded-[44px]`}
          >
          <article className="flex h-full flex-col rounded-[36px] bg-ink p-7 text-mist sm:rounded-[44px] sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-semibold uppercase leading-tight text-white sm:text-3xl">{p.name}</h3>
              {i === 1 && <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink">Online shop</span>}
            </div>
            <p className="mt-3 text-base font-light leading-relaxed text-mist/75">{p.tagline}</p>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-mist/60">Standard price</p>
            <p className="font-black leading-none text-white" style={{ fontSize: 'clamp(3.2rem, 7vw, 5.5rem)' }}>
              <span className="glow-text">
                <CountUp to={p.price} prefix="$" />
              </span>
            </p>
            <ul className="mt-8 flex flex-1 flex-col gap-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-base leading-snug">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: 'var(--brand)' }}>
                    <Check aria-hidden="true" className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <ContactButton to="/contact" className="mt-10 self-start">
              Start for ${DEPOSIT}
            </ContactButton>
          </article>
          </motion.div>
        </FadeIn>
      ))}
      <FadeIn delay={0.24} y={50} className="md:col-span-2">
        <div className="flex flex-col items-start gap-6 rounded-[36px] border-2 border-ink/15 p-7 sm:flex-row sm:items-center sm:justify-between sm:rounded-[44px] sm:p-10">
          <div className="flex items-start gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-white">
              <MessagesSquare aria-hidden="true" className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-2xl font-semibold uppercase text-ink sm:text-3xl">Something else in mind?</h3>
              <p className="mt-2 max-w-xl text-base font-light leading-relaxed text-ink/70">
                Any other request can be talked through and arranged. Tell me what you need and we'll find the right plan and price together.
              </p>
            </div>
          </div>
          <ContactButton to="/contact" className="shrink-0">
            Let's talk
          </ContactButton>
        </div>
      </FadeIn>
    </div>
  )
}
