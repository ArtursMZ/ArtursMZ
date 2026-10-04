import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import FitText from '../components/FitText'
import Magnet from '../components/Magnet'
import HeroOrb from '../components/HeroOrb'
import Marquee from '../components/Marquee'
import AnimatedText from '../components/AnimatedText'
import CountUp from '../components/CountUp'
import PriceCards from '../components/PriceCards'
import Process from '../components/Process'
import CtaBand from '../components/CtaBand'
import SectionHeading from '../components/SectionHeading'
import BrowserFrame from '../components/showcases/BrowserFrame'
import { ContactButton, GhostButton } from '../components/Buttons'
import { PROJECTS } from '../data/projects'
import { DEPOSIT } from '../data/site'

function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[620px] flex-col" style={{ overflowX: 'clip' }}>
      <div className="flex flex-1 flex-col justify-start overflow-hidden pt-28 md:pt-24">
        <FadeIn delay={0.1} y={20} className="px-6 md:px-10">
          <p className="text-sm font-light uppercase tracking-[0.35em] text-mist/70 md:text-base">Hi, I'm Artur, and this is</p>
        </FadeIn>
        <h1 className="mt-2 w-full select-none font-black uppercase leading-[0.86] tracking-tight" aria-label="AR website developmenTURS">
          <motion.span
            aria-hidden="true"
            className="block text-center"
            initial={{ opacity: 0, y: 60, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <FitText fill={0.96}>
              <span className="hero-heading">AR website</span>
            </FitText>
          </motion.span>
          <motion.span
            aria-hidden="true"
            className="block text-center"
            initial={{ opacity: 0, y: 60, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <FitText fill={0.96}>
              <span className="hero-heading">developmen</span>
              <span className="glow-text">TURS</span>
            </FitText>
          </motion.span>
        </h1>
      </div>

      {/* Positioning lives on a plain div: Framer Motion's transform would override Tailwind's translate classes. */}
      <div className="absolute left-1/2 top-[60%] z-10 w-[340px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[400px] sm:translate-y-0 md:w-[480px] lg:w-[560px]">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Magnet padding={150} strength={3}>
            <HeroOrb className="aspect-square w-full" />
          </Magnet>
        </motion.div>
      </div>

      <div className="relative z-20 flex items-end justify-between gap-4 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[170px] font-light uppercase leading-snug tracking-wide text-mist sm:max-w-[240px] md:max-w-[300px]" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.4rem)' }}>
            Modern websites that make your business stand out. <span className="glow-text font-medium">Ready in 3 days.</span>
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} className="flex flex-col items-end gap-4">
          <a href="#intro" className="hidden items-center gap-2 text-xs uppercase tracking-[0.3em] text-mist/60 transition-opacity hover:opacity-80 md:inline-flex">
            Scroll <ArrowDown aria-hidden="true" className="h-4 w-4 animate-bounce" />
          </a>
          <ContactButton>Start a project</ContactButton>
        </FadeIn>
      </div>
    </section>
  )
}

const STATS = [
  { value: 3, suffix: ' days', label: 'From start to a finished, ready-to-launch website' },
  { value: DEPOSIT, prefix: '$', label: 'Is all it takes to get started' },
  { value: 100, suffix: '%', label: 'Responsive on phones, tablets and desktops' },
]

function Intro() {
  return (
    <section id="intro" className="relative scroll-mt-10 px-5 py-24 sm:px-8 sm:py-32 md:px-10">
      <div className="mx-auto max-w-5xl">
        <AnimatedText
          className="text-center font-medium leading-snug text-mist [font-size:clamp(1.35rem,3.4vw,2.9rem)]"
          text="I'm Artur, a website developer from Germany. I build modern, high-quality websites made to fit your business. Work with me and you get a finished, ready-to-launch website in just three days. Fast, smooth and stress-free."
        />
        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.12} className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur">
              <p className="font-black leading-none text-white" style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}>
                <span className="glow-text">
                  <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </span>
              </p>
              <p className="mt-3 text-base font-light leading-snug text-mist/70">{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesTeaser() {
  return (
    <section className="rounded-t-[40px] bg-white px-5 py-20 text-ink sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <SectionHeading dark className="mb-6">
        Pricing
      </SectionHeading>
      <FadeIn className="mx-auto mb-16 max-w-2xl text-center text-lg font-light leading-relaxed text-ink/70 sm:mb-20 sm:text-xl">
        Clear prices, no surprises. Pick a package, or tell me what you need.
      </FadeIn>
      <PriceCards />
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="relative z-10 -mt-10 rounded-t-[40px] bg-ink px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-28 md:-mt-14 md:rounded-t-[60px] md:px-10">
      <SectionHeading className="mb-6">How it works</SectionHeading>
      <FadeIn className="mx-auto mb-16 max-w-2xl text-center text-lg font-light leading-relaxed text-mist/70 sm:mb-24 sm:text-xl">
        You only pay the full price once you've seen your website and love it.
      </FadeIn>
      <Process />
    </section>
  )
}

function WorkTeaser() {
  return (
    <section className="px-5 py-24 sm:px-8 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <FadeIn as="h2" y={40} className="hero-heading font-black uppercase leading-none tracking-tight">
            <span style={{ fontSize: 'clamp(3rem, 9vw, 120px)' }}>My work</span>
          </FadeIn>
          <GhostButton to="/work">
            See all projects <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </GhostButton>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.12} y={50}>
              <Link to="/work" className="group block" aria-label={`${p.name}, see it on the work page`}>
                <div className="aspect-[4/3] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1deg]">
                  <BrowserFrame url={p.url}>{p.main}</BrowserFrame>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold uppercase text-white">{p.name}</h3>
                  <span className="text-sm text-mist/60">{p.category}</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <ServicesTeaser />
      <HowItWorks />
      <WorkTeaser />
      <CtaBand />
    </>
  )
}
