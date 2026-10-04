import { useMemo } from 'react'

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

function spruce(cx: number, base: number, h: number, w: number) {
  // Tiered spruce: from the tip, step out and back in on each side, then the trunk.
  const tiers = 6
  const top = base - h
  const right: [number, number][] = []
  for (let i = 1; i <= tiers; i++) {
    const t = i / tiers
    const y = top + h * 0.9 * t
    const half = (w / 2) * t
    right.push([cx + half, y])
    if (i < tiers) right.push([cx + half * 0.55, y - h * 0.02])
  }
  const trunk = w * 0.05
  const pts: [number, number][] = [[cx, top], ...right, [cx + trunk, base], [cx - trunk, base], ...right.slice().reverse().map(([x, y]) => [2 * cx - x, y] as [number, number])]
  return 'M' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L') + ' Z'
}

/**
 * A strip of spruce trees used as the edge between two sections.
 * `color` is the colour of the section below, so the forest "grows" out of it.
 */
export default function Treeline({ color, back, seed = 3, className = '' }: { color: string; back?: string; seed?: number; className?: string }) {
  const { front, rear } = useMemo(() => {
    const W = 1440
    const H = 160
    const build = (s: number, minH: number, maxH: number, gap: number) => {
      const r = rng(s)
      let d = `M0,${H} L0,${H - 18} L${W},${H - 18} L${W},${H} Z`
      for (let x = -20; x < W + 40; x += gap * (0.6 + r() * 0.8)) {
        const h = minH + r() * (maxH - minH)
        d += ' ' + spruce(x, H - 14, h, h * (0.42 + r() * 0.12))
      }
      return d
    }
    return { front: build(seed, 46, 128, 34), rear: build(seed + 7, 70, 150, 40) }
  }, [seed])

  return (
    <svg viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true" className={`block h-[70px] w-full sm:h-[110px] md:h-[150px] ${className}`}>
      {back && <path d={rear} fill={back} />}
      <path d={front} fill={color} />
    </svg>
  )
}
