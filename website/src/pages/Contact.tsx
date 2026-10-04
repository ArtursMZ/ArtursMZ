import { useState } from 'react'
import { Check, Copy, PhoneCall, Timer, Wallet } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import Globe from '../components/Globe'
import RotatingText from '../components/RotatingText'
import { ContactButton } from '../components/Buttons'
import { DEPOSIT, EMAIL, MAILTO } from '../data/site'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = MAILTO
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden px-5 pb-24 pt-32 sm:px-8 md:px-10 md:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div className="order-2 lg:order-1">
          <RotatingText />

          <FadeIn delay={0.2} className="mt-6 max-w-xl text-lg font-light leading-relaxed text-mist/80 sm:text-xl">
            If you're interested, I'd be happy to set up a call to talk about your goals and go over pricing options.
          </FadeIn>

          <FadeIn delay={0.3} className="mt-10">
            <p className="text-sm uppercase tracking-[0.3em] text-mist/60">Email me</p>
            <a href={MAILTO} className="mt-2 block break-all text-[clamp(1.5rem,3.6vw,2.8rem)] font-semibold leading-tight text-white transition-opacity hover:opacity-80">
              {EMAIL}
            </a>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-8 flex flex-wrap items-center gap-4">
            <ContactButton href={MAILTO}>Book a call</ContactButton>
            <button
              type="button"
              onClick={copy}
              className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full border-2 border-mist px-6 py-3 text-sm font-medium uppercase tracking-widest text-mist transition-colors hover:bg-mist/10"
            >
              {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy email'}
            </button>
            <span role="status" className="sr-only">
              {copied ? 'Email address copied' : ''}
            </span>
          </FadeIn>
        </div>

        <FadeIn delay={0.1} y={0} duration={1.2} className="order-1 mx-auto w-full max-w-[640px] lg:order-2">
          <Globe />
          <p className="mt-2 text-center text-xs uppercase tracking-[0.3em] text-mist/50">
            <span className="[@media(pointer:coarse)]:hidden">Move your mouse to spin the world</span>
            <span className="hidden [@media(pointer:coarse)]:inline">Drag to spin the world</span>
          </p>
        </FadeIn>
      </div>

      <div className="mx-auto mt-20 grid max-w-7xl gap-4 sm:grid-cols-3">
        {[
          { icon: PhoneCall, title: 'Free first call', text: 'We talk about your business, your goals and your budget.' },
          { icon: Wallet, title: `$${DEPOSIT} to start`, text: 'I build your website and show it to you before you buy.' },
          { icon: Timer, title: 'Live in 3 days', text: 'A fully finished, ready-to-launch website, fast.' },
        ].map(({ icon: Icon, title, text }, i) => (
          <FadeIn key={title} delay={i * 0.1} className="flex gap-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: 'var(--brand)' }}>
              <Icon aria-hidden="true" className="h-5 w-5 text-white" />
            </span>
            <div>
              <h2 className="text-lg font-semibold uppercase text-white">{title}</h2>
              <p className="mt-1 text-base font-light leading-snug text-mist/70">{text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
