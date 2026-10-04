import { useEffect, useRef } from 'react'
import { MARQUEE_GIFS } from '../data/media'
import { RemoteImg } from './Media'

const row1 = MARQUEE_GIFS.slice(0, 11)
const row2 = MARQUEE_GIFS.slice(11)

function Row({ images, rowRef }: { images: string[]; rowRef: React.RefObject<HTMLDivElement> }) {
  const tripled = [...images, ...images, ...images]
  return (
    <div ref={rowRef} className="flex w-max gap-3" style={{ willChange: 'transform' }}>
      {tripled.map((src, i) => (
        <div key={i} className="media-fallback relative h-[170px] w-[264px] shrink-0 overflow-hidden rounded-2xl sm:h-[270px] sm:w-[420px]">
          <RemoteImg src={src} className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  )
}

/** Two rows of live website previews that slide in opposite directions as you scroll. */
export default function Marquee() {
  const section = useRef<HTMLElement>(null)
  const r1 = useRef<HTMLDivElement>(null)
  const r2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const el = section.current
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY
      const offset = (window.scrollY - top + window.innerHeight) * 0.3
      if (r1.current) r1.current.style.transform = `translateX(${offset - 200}px)`
      if (r2.current) r2.current.style.transform = `translateX(${-(offset - 200)}px)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section ref={section} aria-label="Website previews" className="overflow-hidden bg-snow pb-section">
      <div className="flex flex-col gap-3">
        <div className="-ml-[600px]">
          <Row images={row1} rowRef={r1} />
        </div>
        <div className="-ml-[1400px]">
          <Row images={row2} rowRef={r2} />
        </div>
      </div>
    </section>
  )
}
