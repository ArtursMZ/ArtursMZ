import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

type LatLng = [number, number]

const HOME: LatLng = [52.52, 13.405] // Berlin, Germany
const CITIES: LatLng[] = [
  [40.7128, -74.006], // New York
  [34.0522, -118.2437], // Los Angeles
  [43.6532, -79.3832], // Toronto
  [19.4326, -99.1332], // Mexico City
  [-23.5505, -46.6333], // São Paulo
  [51.5074, -0.1278], // London
  [48.8566, 2.3522], // Paris
  [56.9496, 24.1052], // Riga
  [41.9028, 12.4964], // Rome
  [25.2048, 55.2708], // Dubai
  [19.076, 72.8777], // Mumbai
  [1.3521, 103.8198], // Singapore
  [35.6762, 139.6503], // Tokyo
  [-33.8688, 151.2093], // Sydney
  [-33.9249, 18.4241], // Cape Town
]

const toPhi = (lng: number) => Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2)
const toTheta = (lat: number) => (lat * Math.PI) / 180

/**
 * Interactive WebGL globe. On desktop it turns to follow the mouse; on touch you can drag it.
 * Arcs fly out from Germany to cities around the world.
 */
export default function Globe({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let size = wrap.offsetWidth
    const basePhi = toPhi(HOME[1])
    const baseTheta = toTheta(HOME[0]) * 0.55
    let phi = basePhi
    let theta = baseTheta
    let targetPhi = phi
    let targetTheta = theta
    let drift = 0

    let globe: ReturnType<typeof createGlobe>
    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: size * dpr,
        height: size * dpr,
        phi,
        theta,
        dark: 1,
        diffuse: 1.4,
        scale: 1,
        mapSamples: 20000,
        mapBrightness: 7,
        mapBaseBrightness: 0.04,
        baseColor: [0.32, 0.3, 0.38],
        markerColor: [0.95, 0.45, 1],
        glowColor: [0.5, 0.22, 0.75],
        markers: [
          { location: HOME, size: 0.1, color: [1, 0.55, 0.15] },
          ...CITIES.map((location) => ({ location, size: 0.045 })),
        ],
        arcs: CITIES.map((to) => ({ from: HOME, to })),
        arcColor: [1, 0.5, 0.95],
        arcWidth: 0.6,
        arcHeight: 0.35,
        markerElevation: 0.015,
      })
    } catch {
      return
    }

    // Desktop: the globe follows the mouse anywhere on the page.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      targetPhi = basePhi + (e.clientX / innerWidth - 0.5) * Math.PI * 1.6
      targetTheta = baseTheta + (e.clientY / innerHeight - 0.5) * 0.9
    }
    // Touch / pen: drag to spin.
    let dragX: number | null = null
    let dragY = 0
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return
      dragX = e.clientX
      dragY = e.clientY
    }
    const onDrag = (e: PointerEvent) => {
      if (dragX === null) return
      targetPhi += (e.clientX - dragX) / 120
      targetTheta = Math.max(-0.8, Math.min(0.8, targetTheta + (e.clientY - dragY) / 300))
      dragX = e.clientX
      dragY = e.clientY
    }
    const onUp = () => (dragX = null)
    window.addEventListener('pointermove', onMove, { passive: true })
    canvas.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onDrag, { passive: true })
    window.addEventListener('pointerup', onUp)

    const ro = new ResizeObserver(() => {
      size = wrap.offsetWidth
      globe.update({ width: size * dpr, height: size * dpr })
    })
    ro.observe(wrap)

    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(wrap)

    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible || document.hidden) return
      if (!reduce) drift += 0.0025
      phi += (targetPhi + drift - phi) * 0.06
      theta += (targetTheta - theta) * 0.06
      globe.update({ phi, theta })
    }
    tick()
    canvas.style.opacity = '1'

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointermove', onDrag)
      window.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointerdown', onDown)
      globe.destroy()
    }
  }, [])

  return (
    <div ref={wrapRef} className={`relative aspect-square w-full ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-[12%] rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(182,0,168,.55) 0%, rgba(118,33,176,.35) 45%, transparent 70%)' }}
      />
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="A spinning globe with lines from Germany to cities all over the world"
        className="relative h-full w-full touch-pan-y opacity-0 transition-opacity duration-1000"
        style={{ cursor: 'grab', contain: 'layout paint size' }}
      />
    </div>
  )
}
