import { DEPOSIT, PACKAGES, formatUSD } from '../data/site'
import { Pill } from './Buttons'
import { CheckIcon } from './Icons'

/** The two standard packages plus the custom-request row. Sits on a snow background. */
export default function PriceCards() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-6 md:grid-cols-2">
        {PACKAGES.map((p, i) => {
          const dark = i === 1
          return (
            <article
              key={p.id}
              className={`flex flex-col rounded-[28px] p-8 sm:p-10 ${dark ? 'bg-spruce text-snow' : 'border border-ink/15 bg-white text-ink'}`}
            >
              <h3 className="text-2xl font-semibold uppercase leading-tight sm:text-3xl">{p.name}</h3>
              <p className={`mt-3 max-w-[40ch] text-lg ${dark ? 'text-fog' : 'text-slate'}`}>{p.tagline}</p>
              <p className={`mt-10 text-sm font-bold uppercase tracking-[0.18em] ${dark ? 'text-fog' : 'text-slate'}`}>Standard price</p>
              <p className="font-display font-extrabold leading-none tabular-nums" style={{ fontSize: 'clamp(3.4rem, 7vw, 5.6rem)' }}>
                {formatUSD(p.price)}
              </p>
              <ul className={`mt-8 flex flex-1 flex-col border-t ${dark ? 'border-snow/20' : 'border-ink/10'}`}>
                {p.features.map((f) => (
                  <li key={f} className={`flex items-start gap-3 border-b py-3 text-lg ${dark ? 'border-snow/20' : 'border-ink/10'}`}>
                    <CheckIcon className={`mt-1 h-5 w-5 shrink-0 ${dark ? 'text-[#b9cf8f]' : 'text-moss'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Pill to="/contact" tone={dark ? 'light' : 'dark'} arrow className="mt-10 self-start">
                Start with ${DEPOSIT}
              </Pill>
            </article>
          )
        })}
      </div>
      <div className="mt-6 flex flex-col items-start gap-6 rounded-[28px] border border-ink/15 p-8 text-ink sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div>
          <h3 className="text-2xl font-semibold uppercase sm:text-3xl">Need something else?</h3>
          <p className="mt-2 max-w-[56ch] text-lg text-slate">Any other request can be talked through and arranged. Tell me what you have in mind and we'll agree on a plan and a price.</p>
        </div>
        <Pill to="/contact" tone="outline-dark" arrow className="shrink-0">
          Let's talk
        </Pill>
      </div>
    </div>
  )
}
