import { useEffect, useState } from 'react'

const PHRASES: { lang: string; code: string; text: string }[] = [
  { lang: 'English', code: 'en', text: 'Building websites all around the world' },
  { lang: 'Deutsch', code: 'de', text: 'Ich baue Websites auf der ganzen Welt' },
  { lang: 'Français', code: 'fr', text: 'Je crée des sites web partout dans le monde' },
  { lang: 'Español', code: 'es', text: 'Creo sitios web en todo el mundo' },
  { lang: 'Latviešu', code: 'lv', text: 'Veidoju mājaslapas visā pasaulē' },
  { lang: 'Italiano', code: 'it', text: 'Creo siti web in tutto il mondo' },
  { lang: 'Polski', code: 'pl', text: 'Tworzę strony internetowe na całym świecie' },
  { lang: 'Português', code: 'pt', text: 'Crio sites no mundo inteiro' },
  { lang: 'Nederlands', code: 'nl', text: 'Ik bouw websites over de hele wereld' },
  { lang: '日本語', code: 'ja', text: '世界中でウェブサイトを制作しています' },
]

/**
 * Cycles "Building websites all around the world" through several languages.
 * Every phrase sits in the same grid cell, so the block is always as tall as the longest
 * translation and the page never jumps when the language changes.
 */
export default function RotatingText({ className = '' }: { className?: string }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setI((n) => (n + 1) % PHRASES.length), 2600)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className={className}>
      {/* Screen readers get the English line once instead of a stream of updates. */}
      <h1 className="sr-only">Building websites all around the world</h1>
      <div aria-hidden="true">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.25em] text-mist/80">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-cyan-300" />
          {PHRASES[i].lang}
        </span>
        <div className="grid">
          {PHRASES.map((p, n) => {
            const state = n === i ? 'in' : n === (i - 1 + PHRASES.length) % PHRASES.length ? 'out' : 'wait'
            return (
              <p
                key={p.code}
                lang={p.code}
                className="font-black uppercase leading-[0.95] tracking-tight text-white [grid-area:1/1]"
                style={{
                  fontSize: 'clamp(2.1rem, 6.4vw, 6rem)',
                  opacity: state === 'in' ? 1 : 0,
                  filter: state === 'in' ? 'blur(0px)' : 'blur(12px)',
                  transform: state === 'in' ? 'none' : state === 'out' ? 'translateY(-40px)' : 'translateY(40px)',
                  transition: state === 'wait' ? 'none' : 'opacity .6s ease, filter .6s ease, transform .6s cubic-bezier(.22,1,.36,1)',
                }}
              >
                <span className="glow-text">{p.text}</span>
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}
