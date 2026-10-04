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
 * Cycles "Building websites all around the world" through ten languages.
 * Every phrase is rendered in the same grid cell, so the block is always as tall as the
 * longest translation and the page never jumps when the language changes.
 */
export default function RotatingText({ className = '' }: { className?: string }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setI((n) => (n + 1) % PHRASES.length), 2800)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className={className}>
      <h1 className="sr-only">Building websites all around the world</h1>
      <div aria-hidden="true" className="grid">
        {PHRASES.map((p, n) => {
          const state = n === i ? 'in' : n === (i - 1 + PHRASES.length) % PHRASES.length ? 'out' : 'wait'
          return (
            <p
              key={p.code}
              lang={p.code}
              className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-snow [grid-area:1/1]"
              style={{
                fontSize: 'clamp(2.1rem, 5.6vw, 5.4rem)',
                opacity: state === 'in' ? 1 : 0,
                transform: state === 'in' ? 'none' : state === 'out' ? 'translateY(-0.35em)' : 'translateY(0.35em)',
                transition: state === 'wait' ? 'none' : 'opacity .55s ease, transform .55s cubic-bezier(.22,1,.36,1)',
              }}
            >
              {p.text}
            </p>
          )
        })}
      </div>
      <p aria-hidden="true" className="mt-4 h-6 text-sm uppercase tracking-[0.2em] text-fog">
        {PHRASES[i].lang}
      </p>
    </div>
  )
}
