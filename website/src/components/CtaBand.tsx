import { Pill } from './Buttons'

const WORDS = ["Let's build your website", 'Ready in 3 days', 'Made in Germany', 'For businesses everywhere']

function Spruce() {
  return (
    <svg viewBox="0 0 20 28" className="h-[0.55em] w-auto shrink-0 fill-antler" aria-hidden="true">
      <path d="M10 0 15 8h-3l5 7h-3l6 9H0l6-9H3l5-7H5zM8.5 24h3v4h-3z" />
    </svg>
  )
}

/** Endless headline strip with a call to action, on spruce green. */
export default function CtaBand() {
  const line = [...WORDS, ...WORDS]
  return (
    <section aria-label="Start a project" className="overflow-hidden bg-spruce py-section">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap" aria-hidden="true">
        {line.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display font-extrabold uppercase leading-none" style={{ fontSize: 'clamp(3rem, 8.5vw, 8.5rem)' }}>
            <span className={i % 2 ? 'text-transparent [-webkit-text-stroke:2px_#F2F4EF]' : 'text-snow'}>{w}</span>
            <Spruce />
          </span>
        ))}
      </div>
      <div className="mt-14 flex flex-col items-center gap-6 px-5 text-center">
        <p className="max-w-[46ch] text-xl text-fog">Your new website could be live by the end of the week. Send me a message and we'll start.</p>
        <Pill to="/contact" tone="light" arrow>
          Start your project
        </Pill>
      </div>
    </section>
  )
}
