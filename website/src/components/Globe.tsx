import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type City = { name: string; lat: number; lon: number }

const CITIES: City[] = [
  { name: 'Berlin', lat: 52.52, lon: 13.4 },
  { name: 'New York', lat: 40.71, lon: -74.0 },
  { name: 'Los Angeles', lat: 34.05, lon: -118.24 },
  { name: 'Toronto', lat: 43.65, lon: -79.38 },
  { name: 'Mexico City', lat: 19.43, lon: -99.13 },
  { name: 'São Paulo', lat: -23.55, lon: -46.63 },
  { name: 'London', lat: 51.5, lon: -0.12 },
  { name: 'Riga', lat: 56.95, lon: 24.1 },
  { name: 'Rome', lat: 41.9, lon: 12.5 },
  { name: 'Dubai', lat: 25.2, lon: 55.27 },
  { name: 'Mumbai', lat: 19.07, lon: 72.88 },
  { name: 'Singapore', lat: 1.35, lon: 103.82 },
  { name: 'Tokyo', lat: 35.68, lon: 139.65 },
  { name: 'Sydney', lat: -33.87, lon: 151.21 },
  { name: 'Cape Town', lat: -33.92, lon: 18.42 },
]

/** Lat/lon to a unit vector that matches three.js sphere UVs (equirectangular texture). */
function toVec(lat: number, lon: number, r = 1) {
  const phi = ((lon + 180) * Math.PI) / 180
  const la = (lat * Math.PI) / 180
  return new THREE.Vector3(-Math.cos(phi) * Math.cos(la) * r, Math.sin(la) * r, Math.sin(phi) * Math.cos(la) * r)
}

const base = import.meta.env.BASE_URL

/**
 * Realistic daytime Earth: colour imagery, raised mountains, moving water and drifting clouds,
 * lit evenly from the viewer's side so every visible place is in daylight.
 * It turns to follow the mouse (drag on touch screens) and has pins on cities worldwide.
 */
export default function Globe({ className = '' }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const labelsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const labelsEl = labelsRef.current
    if (!wrap || !labelsEl) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    const canvas = renderer.domElement
    canvas.style.cursor = 'grab'
    canvas.style.touchAction = 'pan-y'
    canvas.setAttribute('role', 'img')
    canvas.setAttribute('aria-label', 'A turning globe of the Earth with pins on cities around the world')
    wrap.prepend(canvas)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50)
    camera.position.set(0, 0, 4.1)
    scene.add(camera)

    // Even daylight: strong ambient plus a soft light that sits with the camera, so there is no night side and no sun.
    scene.add(new THREE.AmbientLight('#ffffff', 1.9))
    const head = new THREE.DirectionalLight('#ffffff', 1.25)
    head.position.set(-1.5, 1.2, 3)
    camera.add(head)

    const loader = new THREE.TextureLoader()
    const load = (f: string, color = false) => {
      const t = loader.load(`${base}earth/${f}`)
      if (color) t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
      return t
    }
    const colorMap = load('color.webp', true)
    const heightMap = load('height.webp')
    const waterMap = load('water.webp')
    const cloudMap = load('clouds.webp')

    const tilt = new THREE.Group() // up/down
    const spin = new THREE.Group() // left/right
    tilt.add(spin)
    scene.add(tilt)

    const uniforms = { uTime: { value: 0 }, uWater: { value: waterMap } }
    const earthMat = new THREE.MeshStandardMaterial({
      map: colorMap,
      displacementMap: heightMap,
      displacementScale: 0.045,
      bumpMap: heightMap,
      bumpScale: 9,
      roughness: 0.95,
      metalness: 0,
    })
    earthMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniforms.uTime
      shader.uniforms.uWater = uniforms.uWater
      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          /* glsl */ `#include <common>
          uniform float uTime;
          uniform sampler2D uWater;
          float wave(vec2 p) {
            return sin(p.x * 1.0 + uTime * 0.9) * 0.5 + sin(p.y * 1.3 - uTime * 0.7) * 0.5
                 + sin((p.x + p.y) * 0.7 + uTime * 1.3) * 0.5;
          }`,
        )
        .replace(
          '#include <map_fragment>',
          /* glsl */ `#include <map_fragment>
          float water = texture2D(uWater, vMapUv).r;
          vec2 wp = vMapUv * vec2(900.0, 450.0);
          float w = wave(wp) + 0.5 * wave(wp * 2.3 + 11.0);
          // Slow rolling swells and bright crests drifting across the oceans
          diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * (0.9 + 0.09 * w) + vec3(0.02, 0.05, 0.07) * smoothstep(1.2, 1.9, w), water);`,
        )
        .replace(
          '#include <roughnessmap_fragment>',
          /* glsl */ `#include <roughnessmap_fragment>
          roughnessFactor = mix(roughnessFactor, 0.62, texture2D(uWater, vMapUv).r);`,
        )
    }
    const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 384, 192), earthMat)
    spin.add(earth)

    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 96, 48),
      new THREE.MeshStandardMaterial({ color: '#ffffff', alphaMap: cloudMap, transparent: true, depthWrite: false, roughness: 1, opacity: 0.95 }),
    )
    spin.add(clouds)

    // Thin blue haze around the edge
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.14, 64, 32),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `varying vec3 vN; varying vec3 vV;
          void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
        fragmentShader: /* glsl */ `varying vec3 vN; varying vec3 vV;
          void main(){ float f = pow(1.0 - abs(dot(vN, vV)), 2.2); gl_FragColor = vec4(0.55, 0.78, 1.0, f * 0.55); }`,
      }),
    )
    scene.add(atmosphere)

    // City pins: a pole, a red head and a pulsing ring on the ground
    const pinMat = new THREE.MeshStandardMaterial({ color: '#d8432b', roughness: 0.4 })
    const poleMat = new THREE.MeshStandardMaterial({ color: '#f2f4ef', roughness: 0.6 })
    const ringMat = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false })
    const poleGeo = new THREE.CylinderGeometry(0.0035, 0.0035, 0.09, 6)
    poleGeo.translate(0, 0.045, 0)
    const headGeo = new THREE.SphereGeometry(0.017, 16, 12)
    const ringGeo = new THREE.RingGeometry(0.018, 0.026, 32)
    ringGeo.rotateX(-Math.PI / 2)
    const up = new THREE.Vector3(0, 1, 0)
    const pins = CITIES.map((c, i) => {
      const n = toVec(c.lat, c.lon).normalize()
      const g = new THREE.Group()
      g.position.copy(n.clone().multiplyScalar(1.005))
      g.quaternion.setFromUnitVectors(up, n)
      g.add(new THREE.Mesh(poleGeo, poleMat))
      const h = new THREE.Mesh(headGeo, pinMat)
      h.position.y = 0.095
      g.add(h)
      const ring = new THREE.Mesh(ringGeo, ringMat.clone())
      g.add(ring)
      spin.add(g)
      const label = document.createElement('span')
      label.textContent = c.name
      label.className = 'pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full bg-night/85 px-2 py-0.5 text-[12px] font-medium text-snow transition-opacity duration-300'
      labelsEl.appendChild(label)
      return { g, ring, head: h, label, phase: i * 0.7 }
    })

    // Start with Europe facing the viewer
    const home = toVec(52.5, 13.4)
    const baseSpin = Math.atan2(-home.x, home.z)
    const baseTilt = 0.42
    spin.rotation.y = baseSpin
    tilt.rotation.x = baseTilt

    let spinTarget = baseSpin
    let tiltTarget = baseTilt
    let drift = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      spinTarget = baseSpin + (e.clientX / innerWidth - 0.5) * Math.PI * 1.4
      tiltTarget = baseTilt + (e.clientY / innerHeight - 0.5) * 0.9
    }
    let dragX: number | null = null
    let dragY = 0
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return
      dragX = e.clientX
      dragY = e.clientY
    }
    const onDrag = (e: PointerEvent) => {
      if (dragX === null) return
      spinTarget += (e.clientX - dragX) / 110
      tiltTarget = Math.max(-0.9, Math.min(0.9, tiltTarget + (e.clientY - dragY) / 260))
      dragX = e.clientX
      dragY = e.clientY
    }
    const onUp = () => (dragX = null)
    window.addEventListener('pointermove', onMove, { passive: true })
    canvas.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onDrag, { passive: true })
    window.addEventListener('pointerup', onUp)

    let size = { w: 1, h: 1 }
    const resize = () => {
      const w = wrap.clientWidth
      const h = wrap.clientHeight
      if (!w || !h) return
      size = { w, h }
      renderer.setSize(w, h, false)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    resize()

    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(wrap)

    const world = new THREE.Vector3()
    const normal = new THREE.Vector3()
    const toCam = new THREE.Vector3()
    const clock = new THREE.Clock()
    let raf = 0
    const showLabels = size.w > 420

    const frame = (t: number) => {
      uniforms.uTime.value = t
      if (!reduce) drift += 0.0009
      spin.rotation.y += (spinTarget + drift - spin.rotation.y) * 0.05
      tilt.rotation.x += (tiltTarget - tilt.rotation.x) * 0.05
      clouds.rotation.y = t * 0.012

      for (const p of pins) {
        const k = ((t * 0.6 + p.phase) % 1.6) / 1.6
        p.ring.scale.setScalar(1 + k * 2.4)
        ;(p.ring.material as THREE.MeshBasicMaterial).opacity = 0.8 * (1 - k)
        p.head.getWorldPosition(world)
        normal.copy(world).normalize()
        toCam.copy(camera.position).sub(world).normalize()
        const facing = normal.dot(toCam)
        const v = world.clone().project(camera)
        const x = (v.x * 0.5 + 0.5) * size.w
        const y = (-v.y * 0.5 + 0.5) * size.h
        p.label.style.transform = `translate(${x + 10}px, ${y - 12}px)`
        p.label.style.opacity = showLabels && facing > 0.35 ? '1' : '0'
      }
      renderer.render(scene, camera)
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible || document.hidden) return
      frame(clock.getElapsedTime())
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointermove', onDrag)
      window.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointerdown', onDown)
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        m.geometry?.dispose()
        ;(m.material as THREE.Material | undefined)?.dispose()
      })
      ;[colorMap, heightMap, waterMap, cloudMap].forEach((t) => t.dispose())
      labelsEl.replaceChildren()
      renderer.dispose()
      canvas.remove()
    }
  }, [])

  return (
    <div ref={wrapRef} className={`relative aspect-square w-full ${className}`}>
      <div ref={labelsRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" />
    </div>
  )
}
