import { useEffect, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

const COLORS = {
  fur: '#3b2a1d',
  furDark: '#24180f',
  muzzle: '#5a4231',
  nose: '#2b1f17',
  antler: '#9a7550',
  antlerTip: '#c9a982',
  eye: '#0a0705',
}

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

/** Low-poly look: merge vertices, nudge them a little, then shade flat. */
function rough(geo: THREE.BufferGeometry, amount: number, seed: number) {
  const g = mergeVertices(geo.deleteAttribute('normal').deleteAttribute('uv') as THREE.BufferGeometry)
  const r = rng(seed)
  const p = g.attributes.position as THREE.BufferAttribute
  for (let i = 0; i < p.count; i++) {
    p.setXYZ(i, p.getX(i) + (r() - 0.5) * amount, p.getY(i) + (r() - 0.5) * amount, p.getZ(i) + (r() - 0.5) * amount)
  }
  g.computeVertexNormals()
  return g
}

function mat(color: string, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  return new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.92, metalness: 0, ...extra })
}

function part(geo: THREE.BufferGeometry, material: THREE.Material, pos: [number, number, number], scale: [number, number, number] = [1, 1, 1], rot: [number, number, number] = [0, 0, 0]) {
  const m = new THREE.Mesh(geo, material)
  m.position.set(...pos)
  m.scale.set(...scale)
  m.rotation.set(...rot)
  return m
}

/** A palmate moose antler as an extruded 2D outline (x points outward, y up). */
function antlerGeometry() {
  const pts: [number, number][] = [
    [0, 0], [0.45, -0.1], [1.05, -0.06], [1.65, 0.1], [2.15, 0.42],
    [2.55, 0.62], [2.25, 0.78], [2.5, 1.08], [2.12, 1.08], [2.28, 1.5], [1.9, 1.36],
    [1.92, 1.8], [1.6, 1.52], [1.5, 1.95], [1.28, 1.56], [1.12, 1.86], [0.98, 1.42],
    [0.72, 1.6], [0.68, 1.12], [0.42, 0.86], [0.22, 0.52], [0.06, 0.26],
  ]
  const shape = new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y)))
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.09, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.035, bevelSegments: 1, curveSegments: 2 })
  geo.translate(0, 0, -0.045)
  return rough(geo, 0.025, 11)
}

function buildMoose() {
  const root = new THREE.Group()
  const fur = mat(COLORS.fur)
  const furDark = mat(COLORS.furDark)
  const muzzle = mat(COLORS.muzzle)
  const nose = mat(COLORS.nose)
  const antlerMat = mat(COLORS.antler, { side: THREE.DoubleSide, roughness: 0.8 })
  const tipMat = mat(COLORS.antlerTip, { roughness: 0.75 })
  const eyeMat = new THREE.MeshStandardMaterial({ color: COLORS.eye, roughness: 0.15, metalness: 0.1 })
  const glint = new THREE.MeshBasicMaterial({ color: '#fff4e0' })

  // Body: neck and shoulder hump run off the bottom of the frame.
  const body = new THREE.Group()
  body.add(part(rough(new THREE.CylinderGeometry(0.78, 1.35, 2.8, 9, 3), 0.08, 1), fur, [0, -1.75, -0.75], [1, 1, 0.85], [0.42, 0, 0]))
  body.add(part(rough(new THREE.IcosahedronGeometry(1, 1), 0.1, 2), furDark, [0, -3.05, -1.35], [2.35, 1.35, 1.5]))
  // Mane along the top of the neck
  body.add(part(rough(new THREE.ConeGeometry(0.42, 1.6, 5, 2), 0.06, 3), furDark, [0, -0.95, -1.05], [1, 1, 0.6], [-0.5, 0, 0]))
  root.add(body)

  const head = new THREE.Group()
  head.position.set(0, 0.15, 0.05)
  root.add(head)

  // Skull
  head.add(part(rough(new THREE.IcosahedronGeometry(0.62, 1), 0.05, 4), fur, [0, 0.25, -0.08], [1.08, 0.95, 1.15]))
  // Long muzzle pointing forward and down
  head.add(part(rough(new THREE.CylinderGeometry(0.4, 0.52, 1.55, 8, 2), 0.05, 5), muzzle, [0, -0.38, 0.62], [1, 1, 0.92], [Math.PI / 2 - 0.62, 0, 0]))
  // Heavy overhanging nose and upper lip
  head.add(part(rough(new THREE.IcosahedronGeometry(0.5, 1), 0.04, 6), muzzle, [0, -0.82, 1.18], [1.28, 0.95, 1.05]))
  head.add(part(rough(new THREE.IcosahedronGeometry(0.42, 1), 0.04, 7), furDark, [0, -1.12, 1.16], [1.25, 0.6, 1]))

  // Nostrils (also where the breath comes out)
  const nostrils: THREE.Object3D[] = []
  for (const s of [-1, 1]) {
    const n = part(new THREE.SphereGeometry(0.1, 8, 6), nose, [s * 0.2, -0.86, 1.66], [0.85, 1.25, 0.6], [0, 0, s * 0.35])
    head.add(n)
    const emitter = new THREE.Object3D()
    emitter.position.set(s * 0.2, -0.9, 1.75)
    head.add(emitter)
    nostrils.push(emitter)
  }

  // Eyes, sunk under heavy brows
  for (const s of [-1, 1]) {
    head.add(part(new THREE.SphereGeometry(0.085, 12, 10), eyeMat, [s * 0.5, 0.16, 0.36]))
    head.add(part(new THREE.SphereGeometry(0.02, 6, 6), glint, [s * 0.5 + s * -0.02, 0.19, 0.44]))
    // Angry brow: inner end pulled down
    head.add(part(rough(new THREE.BoxGeometry(0.42, 0.11, 0.2, 2, 1, 1), 0.02, 8 + s), furDark, [s * 0.42, 0.31, 0.38], [1, 1, 1], [0.15, s * -0.35, s * 0.5]))
  }

  // Ears pinned back
  for (const s of [-1, 1]) {
    head.add(part(rough(new THREE.ConeGeometry(0.17, 0.62, 5, 1), 0.03, 12 + s), fur, [s * 0.68, 0.48, -0.36], [1, 1, 0.55], [-0.9, 0, s * -1.25]))
  }

  // Bell (the flap of skin under the chin)
  head.add(part(rough(new THREE.ConeGeometry(0.16, 0.95, 6, 2), 0.03, 14), furDark, [0, -1.2, 0.12], [1, 1, 0.7], [Math.PI + 0.15, 0, 0]))

  // Antlers: short beam out of the skull, then the big palm
  const palm = antlerGeometry()
  for (const s of [-1, 1]) {
    const a = new THREE.Group()
    a.position.set(s * 0.5, 0.68, -0.2)
    a.add(part(rough(new THREE.CylinderGeometry(0.07, 0.11, 0.5, 6), 0.02, 20 + s), antlerMat, [s * 0.18, 0.08, 0], [1, 1, 1], [0, 0, s * -1.1]))
    const p = new THREE.Mesh(palm, antlerMat)
    p.position.set(s * 0.36, 0.12, 0)
    p.scale.set(s * 0.95, 0.95, 0.95)
    p.rotation.set(-0.55, s * -0.35, s * 0.12)
    a.add(p)
    // Brow tine pointing forward
    a.add(part(rough(new THREE.ConeGeometry(0.06, 0.55, 5), 0.015, 30 + s), tipMat, [s * 0.32, 0.2, 0.3], [1, 1, 1], [1.2, 0, s * -0.4]))
    head.add(a)
  }

  head.rotation.x = 0.14 // head held low, staring down the viewer
  return { root, head, body, nostrils }
}

/** Soft round sprite for breath puffs. */
function puffTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')!
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grd.addColorStop(0, 'rgba(255,255,255,1)')
  grd.addColorStop(0.45, 'rgba(255,255,255,0.45)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 64, 64)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

const PUFF_VERT = /* glsl */ `
attribute float aSize;
attribute float aAlpha;
varying float vAlpha;
uniform float uScale;
void main() {
  vAlpha = aAlpha;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uScale / -mv.z;
  gl_Position = projectionMatrix * mv;
}`
const PUFF_FRAG = /* glsl */ `
uniform sampler2D uMap;
uniform vec3 uColor;
varying float vAlpha;
void main() {
  vec4 t = texture2D(uMap, gl_PointCoord);
  gl_FragColor = vec4(uColor, t.a * vAlpha);
  if (gl_FragColor.a < 0.003) discard;
}`

type Props = {
  /** 0 at the top of the hero, 1 when the breath fog has filled the screen. */
  progress: MutableRefObject<number>
  className?: string
}

export default function MooseScene({ progress, className = '' }: Props) {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mount.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.domElement.setAttribute('aria-hidden', 'true')
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)

    scene.add(new THREE.HemisphereLight('#c9d6d2', '#1a2621', 1.35))
    const key = new THREE.DirectionalLight('#ffe3c4', 2.6)
    key.position.set(-4, 5, 7)
    scene.add(key)
    const rim = new THREE.DirectionalLight('#a9c8ff', 3.2)
    rim.position.set(4, 3, -6)
    scene.add(rim)
    const rim2 = new THREE.DirectionalLight('#ffd9b0', 1.4)
    rim2.position.set(-5, 1, -4)
    scene.add(rim2)

    const moose = buildMoose()
    scene.add(moose.root)

    // ---- Breath particles
    const MAX = 900
    const pos = new Float32Array(MAX * 3)
    const vel = new Float32Array(MAX * 3)
    const life = new Float32Array(MAX)
    const maxLife = new Float32Array(MAX)
    const size = new Float32Array(MAX)
    const alpha = new Float32Array(MAX)
    const breathGeo = new THREE.BufferGeometry()
    breathGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    breathGeo.setAttribute('aSize', new THREE.BufferAttribute(size, 1))
    breathGeo.setAttribute('aAlpha', new THREE.BufferAttribute(alpha, 1))
    const puff = puffTexture()
    const breathMat = new THREE.ShaderMaterial({
      uniforms: { uMap: { value: puff }, uColor: { value: new THREE.Color('#eef3f1') }, uScale: { value: 300 } },
      vertexShader: PUFF_VERT,
      fragmentShader: PUFF_FRAG,
      transparent: true,
      depthWrite: false,
    })
    const breath = new THREE.Points(breathGeo, breathMat)
    breath.frustumCulled = false
    scene.add(breath)
    let next = 0

    const tmp = new THREE.Vector3()
    const fwd = new THREE.Vector3()
    const spawn = (origin: THREE.Vector3, dir: THREE.Vector3, boost: number) => {
      const i = next
      next = (next + 1) % MAX
      pos[i * 3] = origin.x
      pos[i * 3 + 1] = origin.y
      pos[i * 3 + 2] = origin.z
      const speed = 1.1 + Math.random() * 0.9 + boost * 1.5
      const spread = 0.5 + boost * 3.2
      vel[i * 3] = dir.x * speed + (Math.random() - 0.5) * spread
      vel[i * 3 + 1] = dir.y * speed - 0.25 + (Math.random() - 0.5) * (0.35 + boost * 1.6)
      vel[i * 3 + 2] = dir.z * speed + (Math.random() - 0.5) * 0.3
      maxLife[i] = 1.4 + Math.random() * 1.4 + boost * 1.5
      life[i] = maxLife[i]
    }

    // ---- Falling snow
    const SNOW = 700
    const snowPos = new Float32Array(SNOW * 3)
    const snowSize = new Float32Array(SNOW)
    const snowAlpha = new Float32Array(SNOW).fill(0.85)
    for (let i = 0; i < SNOW; i++) {
      snowPos[i * 3] = (Math.random() - 0.5) * 22
      snowPos[i * 3 + 1] = (Math.random() - 0.5) * 14
      snowPos[i * 3 + 2] = -8 + Math.random() * 12
      snowSize[i] = 0.25 + Math.random() * 0.45
    }
    const snowGeo = new THREE.BufferGeometry()
    snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPos, 3))
    snowGeo.setAttribute('aSize', new THREE.BufferAttribute(snowSize, 1))
    snowGeo.setAttribute('aAlpha', new THREE.BufferAttribute(snowAlpha, 1))
    const snowMat = breathMat.clone()
    snowMat.uniforms = { uMap: { value: puff }, uColor: { value: new THREE.Color('#ffffff') }, uScale: { value: 300 } }
    const snow = new THREE.Points(snowGeo, snowMat)
    snow.frustumCulled = false
    scene.add(snow)

    // ---- Layout
    let mobile = false
    const resize = () => {
      const { width, height } = el.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      camera.aspect = width / height
      mobile = width < 768
      // Keep the antlers on screen on narrow phones by stepping the camera back.
      // Desktop: moose right of centre (text sits on the left). Phone: centred, further back.
      // On phones, step back until both antlers (about 6.4 units across) fit the width.
      const dist = mobile ? Math.max(15, 6.4 / (0.536 * camera.aspect)) : 15
      const camX = mobile ? 0 : -1.6 * Math.min(1.4, camera.aspect / 1.6)
      camera.position.set(camX, 0.9, dist)
      camera.lookAt(camX, mobile ? 0.1 : 1.0, 0)
      camera.updateProjectionMatrix()
      const scale = height * renderer.getPixelRatio() * 0.55
      breathMat.uniforms.uScale.value = scale
      snowMat.uniforms.uScale.value = scale * 0.25
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    // ---- Input
    const target = { x: 0, y: 0 }
    const look = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / innerWidth - 0.5) * 2
      target.y = (e.clientY / innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(el)

    const clock = new THREE.Clock()
    let raf = 0
    let last = 0
    const BREATH = 3.4 // seconds per breath

    const frame = (t: number, dt: number) => {
      const p = progress.current
      // Head follows the pointer
      look.x += (target.x - look.x) * Math.min(1, dt * 3)
      look.y += (target.y - look.y) * Math.min(1, dt * 3)
      moose.head.rotation.y = look.x * 0.55
      moose.head.rotation.x = 0.14 + look.y * 0.16
      moose.root.rotation.y = look.x * 0.12

      // Breathing: slow inhale, short heavy exhale through the nose
      const phase = (t % BREATH) / BREATH
      const exhaling = phase > 0.62
      const chest = exhaling ? 1 - (phase - 0.62) / 0.38 : phase / 0.62
      moose.body.scale.setScalar(1 + chest * 0.025)
      moose.head.position.y = 0.15 + chest * 0.03 - (exhaling ? Math.sin(((phase - 0.62) / 0.38) * Math.PI) * 0.04 : 0)

      // As the visitor scrolls, the breath gets heavier until it fills the screen.
      const heavy = Math.min(1, p * 1.4)
      const rate = exhaling ? 90 + heavy * 420 : heavy * 260
      let count = rate * dt
      while (count > 0) {
        if (count < 1 && Math.random() > count) break
        count -= 1
        const n = moose.nostrils[Math.random() < 0.5 ? 0 : 1]
        n.getWorldPosition(tmp)
        fwd.set(0, -0.45, 1).applyQuaternion(moose.head.getWorldQuaternion(new THREE.Quaternion())).normalize()
        spawn(tmp, fwd, heavy)
      }

      for (let i = 0; i < MAX; i++) {
        if (life[i] <= 0) {
          alpha[i] = 0
          continue
        }
        life[i] -= dt
        const age = 1 - life[i] / maxLife[i]
        // drag + slight rise as the warm breath cools
        vel[i * 3] *= 1 - dt * 1.2
        vel[i * 3 + 1] = vel[i * 3 + 1] * (1 - dt * 1.2) + dt * 0.18
        vel[i * 3 + 2] *= 1 - dt * 1.1
        pos[i * 3] += vel[i * 3] * dt
        pos[i * 3 + 1] += vel[i * 3 + 1] * dt
        pos[i * 3 + 2] += vel[i * 3 + 2] * dt
        size[i] = (0.25 + age * 1.6) * (1 + heavy * 5)
        alpha[i] = Math.sin(Math.min(1, age * 3) * Math.PI * 0.5) * (1 - age) * (0.42 + heavy * 0.25)
      }
      breathGeo.attributes.position.needsUpdate = true
      breathGeo.attributes.aSize.needsUpdate = true
      breathGeo.attributes.aAlpha.needsUpdate = true

      for (let i = 0; i < SNOW; i++) {
        snowPos[i * 3 + 1] -= dt * (0.35 + snowSize[i] * 0.5)
        snowPos[i * 3] += Math.sin(t * 0.6 + i) * dt * 0.12
        if (snowPos[i * 3 + 1] < -7) snowPos[i * 3 + 1] = 7
      }
      snowGeo.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible || document.hidden) {
        last = now
        return
      }
      const dt = Math.min(0.05, (now - (last || now)) / 1000)
      last = now
      frame(clock.getElapsedTime(), dt)
    }

    if (reduce) {
      // One calm frame with a little breath hanging in the air.
      for (let k = 0; k < 40; k++) frame(2.4 + k * 0.03, 0.03)
    } else {
      raf = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        if (m.geometry) m.geometry.dispose()
        const material = m.material as THREE.Material | undefined
        material?.dispose()
      })
      puff.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [progress])

  return <div ref={mount} className={className} />
}
