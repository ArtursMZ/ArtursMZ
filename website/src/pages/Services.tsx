import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PriceCards from '../components/PriceCards'
import Process from '../components/Process'
import SectionHeading from '../components/SectionHeading'
import CtaBand from '../components/CtaBand'
import Treeline from '../components/Treeline'
import { DEPOSIT } from '../data/site'

const FAQ = [
  { q: 'How fast will my website be ready?', a: 'I can deliver a fully finished website that is ready to launch in just three days.' },
  {
    q: `What is the $${DEPOSIT} deposit for?`,
    a: `The $${DEPOSIT} lets me start building your website. When it's ready, I show it to you. If you like everything, you buy the fully working website for the price we agreed on.`,
  },
  { q: 'Will it work on phones?', a: 'Yes. Every website is fully responsive, so it looks and works right on phones, tablets and computers.' },
  { q: "I need something that isn't in a package. Is that okay?", a: 'Yes. Any other request can be talked through and arranged. Send me a message.' },
  { q: 'Can customers book or buy on my site?', a: 'Yes. The Business Website includes online booking, and the eCommerce Website includes ordering and payments.' },
]

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mx-auto max-w-4xl border-t border-snow/20">
      {FAQ.map(({ q, a }, i) => {
        const isOpen = open === i
        return (
          <div key={q} className="border-b border-snow/20">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                id={`faq-q-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-body text-xl font-medium text-snow sm:text-2xl"
              >
                {q}
                <span aria-hidden="true" className="relative h-5 w-5 shrink-0">
                  <span className="absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 bg-snow" />
                  <span className={`absolute left-1/2 top-0 h-5 w-[2px] -translate-x-1/2 bg-snow transition-transform duration-300 ${isOpen ? 'scale-y-0' : ''}`} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[60ch] pb-6 text-lg text-fog">{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default function Services() {
  return (
    <>
      <section className="bg-night px-5 pt-36 sm:px-8 md:px-10 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <SectionHeading as="h1">Services</SectionHeading>
          <p className="mt-8 max-w-[44ch] text-xl text-fog">Two clear packages to get your business online, and room for anything else you need. Every website is designed just for you.</p>
        </div>
        <Treeline color="#F2F4EF" back="#1F3B30" seed={31} className="mt-section -mx-5 w-[calc(100%+2.5rem)] sm:-mx-8 sm:w-[calc(100%+4rem)] md:-mx-10 md:w-[calc(100%+5rem)]" />
      </section>

      <section className="bg-snow px-5 py-section text-ink sm:px-8 md:px-10">
        <div className="mx-auto mb-14 max-w-6xl md:mb-20">
          <SectionHeading tone="dark">Packages</SectionHeading>
        </div>
        <PriceCards />
      </section>

      <Treeline color="#0E1713" back="#1F3B30" seed={9} className="-mt-px bg-snow" />

      <section className="bg-night px-5 py-section sm:px-8 md:px-10">
        <div className="mx-auto mb-16 max-w-6xl md:mb-24">
          <SectionHeading>How it works</SectionHeading>
          <p className="mt-6 max-w-[44ch] text-xl text-fog">Start with ${DEPOSIT}. See your website. Only buy it if you like it.</p>
        </div>
        <Process />
      </section>

      <section className="bg-night px-5 pb-section sm:px-8 md:px-10">
        <div className="mx-auto mb-12 max-w-4xl">
          <SectionHeading>Questions</SectionHeading>
        </div>
        <Faq />
      </section>
      <CtaBand />
    </>
  )
}
