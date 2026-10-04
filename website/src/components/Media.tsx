import { useEffect, useRef, useState } from 'react'

/** Muted looping video that only plays while on screen. A gradient shows until it loads. */
export function LoopVideo({ src, className = '', style }: { src: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduce) v.play().catch(() => {})
        else v.pause()
      },
      { rootMargin: '200px' },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      onLoadedData={() => setReady(true)}
      className={`${className} transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
      style={style}
    />
  )
}

/** Remote image that fades in on load and hides itself if the host is unreachable. */
export function RemoteImg({ src, alt = '', className = '', eager = false }: { src: string; alt?: string; className?: string; eager?: boolean }) {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading')
  if (state === 'error') return null
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      onLoad={() => setState('ok')}
      onError={() => setState('error')}
      className={`${className} transition-opacity duration-700 ${state === 'ok' ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}
