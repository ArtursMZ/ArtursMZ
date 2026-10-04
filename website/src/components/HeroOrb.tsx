import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// Ashima Arts 3D simplex noise (MIT)
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
uniform float uTime;
uniform float uAmp;
vec3 displace(vec3 p){
  float d = snoise(p*0.95 + vec3(uTime*0.2)) * 0.24 * uAmp
          + snoise(p*2.0 - vec3(uTime*0.3)) * 0.035 * uAmp;
  return p * (1.0 + d);
}
`

export default function HeroOrb({ className = '' }: { className?: string }) {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mount.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return // No WebGL: the CSS glow behind the canvas still shows.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.NeutralToneMapping
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.setAttribute('aria-hidden', 'true')
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 0, 8.2)

    const uniforms = { uTime: { value: 0 }, uAmp: { value: 1 } }
    const material = new THREE.MeshPhysicalMaterial({
      color: '#0080FF',
      metalness: 0.35,
      roughness: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      iridescence: 0.45,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [100, 380],
      envMapIntensity: 1.4,
    })
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniforms.uTime
      shader.uniforms.uAmp = uniforms.uAmp
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>\n${NOISE}`)
        .replace(
          '#include <beginnormal_vertex>',
          /* glsl */ `
          vec3 sp = normalize(position);
          vec3 tA = normalize(cross(sp, abs(sp.y) > 0.99 ? vec3(1.0,0.0,0.0) : vec3(0.0,1.0,0.0)));
          vec3 tB = normalize(cross(sp, tA));
          float eps = 0.01;
          vec3 dispPos = displace(sp);
          vec3 pA = displace(normalize(sp + tA * eps));
          vec3 pB = displace(normalize(sp + tB * eps));
          vec3 objectNormal = normalize(cross(pA - dispPos, pB - dispPos));
          if (dot(objectNormal, dispPos) < 0.0) objectNormal = -objectNormal;
          `,
        )
        .replace('#include <begin_vertex>', 'vec3 transformed = dispPos * length(position);')
    }

    const group = new THREE.Group()
    scene.add(group)

    const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(1.45, 60), material)
    group.add(blob)

    // Orbit ring + moons
    const ringMat = new THREE.MeshStandardMaterial({ color: '#7DF9FF', emissive: '#0066FF', emissiveIntensity: 0.9, metalness: 0.6, roughness: 0.25 })
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.018, 16, 200), ringMat)
    ring.rotation.set(Math.PI / 2.3, 0.25, 0)
    group.add(ring)

    const moonMat = new THREE.MeshPhysicalMaterial({ color: '#7DF9FF', emissive: '#00E5FF', emissiveIntensity: 0.6, roughness: 0.2, clearcoat: 1 })
    const moonA = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 32), moonMat)
    const moonB = new THREE.Mesh(new THREE.SphereGeometry(0.09, 32, 32), ringMat)
    group.add(moonA, moonB)

    // Brand-coloured lights
    const lights: [string, number, [number, number, number]][] = [
      ['#00D4FF', 60, [-3, 2.5, 3]],
      ['#00A3FF', 70, [3, -2, 2.5]],
      ['#00FFE0', 55, [2.5, 3, -1]],
      ['#ffffff', 18, [0, 0, 5]],
    ]
    for (const [c, i, p] of lights) {
      const l = new THREE.PointLight(c, i, 20, 1.6)
      l.position.set(...p)
      scene.add(l)
    }

    const resize = () => {
      const { width, height } = el.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    const target = { x: 0, y: 0 }
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
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible || document.hidden) return
      const t = clock.getElapsedTime()
      uniforms.uTime.value = t
      group.rotation.y += (target.x * 0.6 + t * 0.15 - group.rotation.y) * 0.05
      group.rotation.x += (target.y * 0.4 - group.rotation.x) * 0.05
      blob.rotation.z = t * 0.1
      moonA.position.set(Math.cos(t * 0.7) * 2.25, Math.sin(t * 0.7) * 0.55, Math.sin(t * 0.7) * 2.0)
      moonB.position.set(Math.cos(-t * 1.1 + 2) * 1.95, Math.cos(t * 1.1) * 0.9, Math.sin(-t * 1.1 + 2) * 1.6)
      renderer.render(scene, camera)
    }

    if (reduce) {
      uniforms.uTime.value = 2
      moonA.position.set(2.1, 0.4, 0.8)
      moonB.position.set(-1.8, -0.6, 0.6)
      renderer.render(scene, camera)
    } else {
      tick()
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          ;(o.material as THREE.Material).dispose()
        }
      })
      scene.environment?.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-[18%] rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle, #0066FF 0%, #00A3FF 45%, transparent 70%)' }}
      />
      <div ref={mount} className="relative h-full w-full" />
    </div>
  )
}
