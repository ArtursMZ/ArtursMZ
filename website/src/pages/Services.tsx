import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import PriceCards from '../components/PriceCards'
import Process from '../components/Process'
import SectionHeading from '../components/SectionHeading'
import CtaBand from '../components/CtaBand'
import { DEPOSIT } from '../data/site'

const FAQ = [
  { q: 'How fast will my website be ready?', a: 'In just three days I can deliver a fully finished website that is ready to launch.' },
  {
    q: `What is the $${DEPOSIT} deposit for?`,
    a: `The $${DEPOSIT} lets me start building your website. When it's ready I show it to you. If you like everything, you buy the fully working website for the price we agreed on.`,
  },
  { q: 'Will it work on phones?', a: 'Yes. Every website is fully responsive, so it looks and works great on phones, tablets and computers.' },
  { q: 'I need something that is not in a package. Is that okay?', a: 'Of course. Any other request can be discussed and arranged. Just send me a message.' },
  { q: 'Can customers book or buy directly on my site?', a: 'Yes. The Business Website includes online booking, and the eCommerce Website includes ordering and payments.' },
]

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mx-auto max-w-4xl">
      {FAQ.map(({ q, a }, i) => {
        const isOpen = open === i
        return (
          <FadeIn key={q} delay={i * 0.06} className="border-b border-white/15">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                id={`faq-q-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium text-white sm:text-2xl"
              >
                {q}
                <Plus aria-hidden="true" className={`h-6 w-6 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-base font-light leading-relaxed text-mist/75 sm:text-lg">{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeIn>
        )
      })}
    </div>
  )
}

export default function Services() {
  return (
    <>
      <section className="px-5 pb-20 pt-36 sm:px-8 md:px-10 md:pt-44">
        <FadeIn as="h1" y={40} className="hero-heading text-center font-black uppercase leading-none tracking-tight">
          <span style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>Services</span>
        </FadeIn>
        <FadeIn delay={0.15} className="mx-auto mt-8 max-w-2xl text-center text-lg font-light leading-relaxed text-mist/75 sm:text-xl">
          Two clear packages to get your business online, plus anything else you need. Every website is designed just for you.
        </FadeIn>
      </section>

      <section className="rounded-t-[40px] bg-white px-5 py-20 text-ink sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
        <SectionHeading dark className="mb-16 sm:mb-20">
          Packages
        </SectionHeading>
        <PriceCards />
      </section>

      <section className="relative z-10 -mt-10 rounded-t-[40px] bg-ink px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-28 md:-mt-14 md:rounded-t-[60px] md:px-10">
        <SectionHeading className="mb-6">How it works</SectionHeading>
        <FadeIn className="mx-auto mb-16 max-w-2xl text-center text-lg font-light leading-relaxed text-mist/70 sm:mb-24 sm:text-xl">
          Start with ${DEPOSIT}. See your website. Only buy it when you love it.
        </FadeIn>
        <Process />
      </section>

      <section className="px-5 pb-12 pt-8 sm:px-8 md:px-10">
        <SectionHeading className="mb-14">Questions</SectionHeading>
        <Faq />
      </section>
      <CtaBand />
    </>
  )
}
