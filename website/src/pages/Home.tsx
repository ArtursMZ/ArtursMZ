import MooseHero from '../components/MooseHero'
import Marquee from '../components/Marquee'
import AnimatedText from '../components/AnimatedText'
import PriceCards from '../components/PriceCards'
import Process from '../components/Process'
import CtaBand from '../components/CtaBand'
import SectionHeading from '../components/SectionHeading'
import Treeline from '../components/Treeline'
import BrowserFrame from '../components/showcases/BrowserFrame'
import { Pill } from '../components/Buttons'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/projects'
import { DEPOSIT } from '../data/site'

const FACTS = [
  { big: '3 days', small: 'from your first message to a finished website' },
  { big: `$${DEPOSIT}`, small: 'is all it takes to get started' },
  { big: '100%', small: 'responsive on phones, tablets and computers' },
]

export default function Home() {
  return (
    <>
      <MooseHero />

      <section className="bg-snow px-5 py-section text-ink sm:px-8 md:px-10">
        <div className="mx-auto max-w-5xl">
          <AnimatedText
            className="text-center font-display font-medium leading-snug text-ink [font-size:clamp(1.45rem,3.4vw,2.9rem)]"
            text="I'm Artur, a website developer from Germany. I build modern, high-quality websites made to fit your business. Work with me and you get a finished, ready-to-launch website in just three days."
          />
          <dl className="mt-20 grid border-y border-ink/15 sm:grid-cols-3 sm:divide-x sm:divide-ink/15">
            {FACTS.map((f) => (
              <div key={f.big} className="border-b border-ink/15 px-2 py-8 last:border-b-0 sm:border-b-0 sm:px-8">
                <dt className="font-display font-extrabold leading-none tabular-nums text-spruce" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)' }}>
                  {f.big}
                </dt>
                <dd className="mt-3 text-lg text-slate">{f.small}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Marquee />

      <section className="bg-snow px-5 pb-section text-ink sm:px-8 md:px-10">
        <div className="mx-auto mb-14 flex max-w-6xl flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <SectionHeading tone="dark">Pricing</SectionHeading>
          <p className="max-w-[38ch] text-xl text-slate">Two clear packages. No hidden costs. Anything else, we can talk about.</p>
        </div>
        <PriceCards />
      </section>

      <Treeline color="#0E1713" back="#1F3B30" seed={5} className="-mt-px bg-snow" />

      <section className="bg-night px-5 py-section sm:px-8 md:px-10">
        <div className="mx-auto mb-16 max-w-6xl md:mb-24">
          <SectionHeading>How it works</SectionHeading>
          <p className="mt-6 max-w-[44ch] text-xl text-fog">You only pay the full price after you've seen your website and you like it.</p>
        </div>
        <Process />
      </section>

      <section className="bg-night px-5 pb-section sm:px-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading>My work</SectionHeading>
            <Pill to="/work" tone="outline-light" arrow>
              See all projects
            </Pill>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {PROJECTS.map((p) => (
              <Link key={p.name} to="/work" className="group block" aria-label={`${p.name}, see it on the work page`}>
                <div className="aspect-[4/3] transition-transform duration-500 group-hover:-translate-y-2">
                  <BrowserFrame url={p.url}>{p.main}</BrowserFrame>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold uppercase text-snow group-hover:underline">{p.name}</h3>
                  <span className="text-fog">{p.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
