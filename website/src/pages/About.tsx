import AnimatedText from '../components/AnimatedText'
import SectionHeading from '../components/SectionHeading'
import CtaBand from '../components/CtaBand'
import Treeline from '../components/Treeline'
import { Pill } from '../components/Buttons'
import { CheckIcon } from '../components/Icons'

const WHY = [
  { word: 'Get found', text: 'Most people look online before they buy. A website puts your business in front of them, day and night.' },
  { word: 'Look trustworthy', text: 'A clean, modern website shows customers you are a real, professional business before you even say hello.' },
  { word: 'Win customers', text: 'Customers can book, order, read reviews or send you a message whenever it suits them.' },
]

const PROMISES = ['A unique design, never a copy', 'Looks right on every screen', 'Built clean, fast and secure', 'You talk to me directly']

export default function About() {
  return (
    <>
      <section className="bg-night px-5 pt-36 sm:px-8 md:px-10 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <SectionHeading as="h1">About me</SectionHeading>
          <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
            <AnimatedText
              className="font-display font-medium leading-snug text-snow [font-size:clamp(1.35rem,2.6vw,2.2rem)]"
              text="Hi, I'm Artur, a website developer from Germany. I've made websites for lots of companies, and they loved the result. I build modern, high-quality websites that fit each business."
            />
            <div className="flex flex-col items-start gap-6">
              <p className="text-xl text-fog">If you choose to work with me, I can deliver a fully finished, ready-to-launch website in just three days.</p>
              <Pill to="/contact" tone="light" arrow>
                Work with me
              </Pill>
            </div>
          </div>
        </div>
        <Treeline color="#F2F4EF" back="#1F3B30" seed={13} className="mt-section -mx-5 w-[calc(100%+2.5rem)] sm:-mx-8 sm:w-[calc(100%+4rem)] md:-mx-10 md:w-[calc(100%+5rem)]" />
      </section>

      <section className="bg-snow px-5 py-section text-ink sm:px-8 md:px-10">
        <div className="mx-auto max-w-6xl">
          <SectionHeading tone="dark">Why a website?</SectionHeading>
          <p className="mt-6 max-w-[48ch] text-xl text-slate">A strong online presence makes more people find you, trust you and buy from you.</p>
          <ul className="mt-14 border-t border-ink/15">
            {WHY.map(({ word, text }) => (
              <li key={word} className="grid gap-3 border-b border-ink/15 py-9 md:grid-cols-[1fr_1fr] md:items-baseline md:gap-10">
                <h3 className="font-display font-extrabold uppercase leading-none text-spruce" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}>
                  {word}
                </h3>
                <p className="max-w-[46ch] text-xl text-slate">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-spruce px-5 py-section text-snow sm:px-8 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-fog">How I work</p>
            <h2 className="mt-5 font-display font-semibold leading-[1.05]" style={{ fontSize: 'clamp(2rem, 4.6vw, 4rem)' }}>
              I make modern, high-quality websites made for each business. Fast, smooth and easy for you.
            </h2>
            <p className="mt-10 font-display font-extrabold uppercase leading-none text-[#c9a982]" style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}>
              3 days
            </p>
            <p className="mt-2 text-xl text-fog">from start to a website that's ready to launch</p>
          </div>
          <div>
            <ul className="border-t border-snow/20">
              {PROMISES.map((t) => (
                <li key={t} className="flex items-center gap-3 border-b border-snow/20 py-4 text-lg">
                  <CheckIcon className="h-5 w-5 shrink-0 text-[#b9cf8f]" />
                  {t}
                </li>
              ))}
            </ul>
            <Pill to="/contact" tone="light" arrow className="mt-8">
              Let's talk
            </Pill>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
