import { useState } from 'react'
import Globe from '../components/Globe'
import RotatingText from '../components/RotatingText'
import { Pill } from '../components/Buttons'
import { CopyIcon } from '../components/Icons'
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
    <section className="min-h-screen bg-night px-5 pb-section pt-32 sm:px-8 md:px-10 md:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div className="order-2 lg:order-1">
          <RotatingText />

          <p className="mt-8 max-w-[46ch] text-xl text-fog">If you're interested, I'd be happy to set up a call to talk about your goals and go over pricing options.</p>

          <p className="mt-10 text-sm font-bold uppercase tracking-[0.18em] text-fog">Email me</p>
          <a href={MAILTO} className="mt-2 block break-all font-display text-[clamp(1.6rem,3.6vw,2.8rem)] font-semibold leading-tight text-snow underline-offset-8 hover:underline">
            {EMAIL}
          </a>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Pill href={MAILTO} tone="light" arrow>
              Book a call
            </Pill>
            <Pill tone="outline-light" onClick={copy} className="gap-3">
              {copied ? 'Copied' : 'Copy email'}
              {!copied && <CopyIcon className="h-3.5 w-3.5" />}
            </Pill>
            <span role="status" className="sr-only">
              {copied ? 'Email address copied' : ''}
            </span>
          </div>

          <p className="mt-12 border-t border-snow/15 pt-6 text-lg text-fog">
            Free first call <span className="px-2 text-antler">/</span> ${DEPOSIT} to start <span className="px-2 text-antler">/</span> Ready in 3 days
          </p>
        </div>

        <div className="order-1 mx-auto w-full max-w-[640px] lg:order-2">
          <Globe />
          <p className="mt-2 text-center text-sm text-fog">
            <span className="[@media(pointer:coarse)]:hidden">Move your mouse to turn the world</span>
            <span className="hidden [@media(pointer:coarse)]:inline">Drag to turn the world</span>
          </p>
        </div>
      </div>
    </section>
  )
}
