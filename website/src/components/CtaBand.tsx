import { ContactButton } from './Buttons'
import FadeIn from './FadeIn'

const WORDS = ["Let's build your website", 'Ready in 3 days', 'Made in Germany', 'Loved worldwide']

/** Endless headline marquee with a call to action. */
export default function CtaBand() {
  const line = [...WORDS, ...WORDS]
  return (
    <section aria-label="Start a project" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap" aria-hidden="true">
        {line.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-black uppercase leading-none" style={{ fontSize: 'clamp(3rem, 9vw, 9rem)' }}>
            <span className={i % 2 ? 'glow-text' : 'hero-heading'}>{w}</span>
            <span className="text-[0.5em] text-cyan-300">✦</span>
          </span>
        ))}
      </div>
      <FadeIn className="mt-14 flex flex-col items-center gap-6 px-5 text-center">
        <p className="max-w-xl text-lg font-light text-mist/80 sm:text-xl">Your new website could be live by the end of the week. Let's talk about it.</p>
        <ContactButton>Start your project</ContactButton>
      </FadeIn>
    </section>
  )
}
