import { motion } from 'framer-motion'
import { Eye, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import AnimatedText from '../components/AnimatedText'
import SectionHeading from '../components/SectionHeading'
import CtaBand from '../components/CtaBand'
import { ContactButton } from '../components/Buttons'
import { RemoteImg } from '../components/Media'
import { DECOR } from '../data/media'

function Decor({ src, className, delay, x }: { src: string; className: string; delay: number; x: number }) {
  return (
    <FadeIn delay={delay} x={x} y={0} duration={0.9} className={`pointer-events-none absolute ${className}`}>
      <div className="animate-float" style={{ animationDelay: `${delay * 4}s` }}>
        <RemoteImg src={src} eager className="w-full" />
      </div>
    </FadeIn>
  )
}

const WHY = [
  {
    icon: Eye,
    title: 'Get seen',
    text: 'People look online first. A website puts your business in front of new customers, day and night.',
  },
  {
    icon: ShieldCheck,
    title: 'Build trust',
    text: 'A modern, professional website makes you look reliable before you even say hello.',
  },
  {
    icon: MessageCircle,
    title: 'Win customers',
    text: 'Bookings, reviews, orders and messages. Customers can reach you whenever they want.',
  },
]

export default function About() {
  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center justify-center gap-16 overflow-hidden px-5 py-28 sm:gap-20 sm:px-8 md:gap-24 md:px-10">
        <Decor src={DECOR.moon} delay={0.1} x={-80} className="left-[1%] top-[8%] w-[110px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]" />
        <Decor src={DECOR.object} delay={0.25} x={-80} className="bottom-[8%] left-[3%] w-[90px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]" />
        <Decor src={DECOR.lego} delay={0.15} x={80} className="right-[1%] top-[8%] w-[110px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]" />
        <Decor src={DECOR.group} delay={0.3} x={80} className="bottom-[8%] right-[3%] w-[110px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]" />

        <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn as="h1" y={40} className="hero-heading text-center font-black uppercase leading-none tracking-tight">
            <span style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>About me</span>
          </FadeIn>
          <AnimatedText
            className="max-w-[600px] text-center font-medium leading-relaxed text-mist [font-size:clamp(1.05rem,2vw,1.4rem)]"
            text="Hi, I'm Artur, a website developer from Germany. I've built websites for lots of companies, and they loved the result. I make modern, high-quality websites that fit each business, and I can deliver yours fully finished and ready to launch in just three days."
          />
        </div>
        <FadeIn delay={0.2} className="relative z-10">
          <ContactButton>Work with me</ContactButton>
        </FadeIn>
      </section>

      <section className="rounded-t-[40px] bg-white px-5 py-20 text-ink sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
        <SectionHeading dark className="mb-6">
          Why a website?
        </SectionHeading>
        <FadeIn className="mx-auto mb-16 max-w-2xl text-center text-lg font-light leading-relaxed text-ink/70 sm:mb-20 sm:text-xl">
          A strong online presence makes more people find you, trust you and buy from you.
        </FadeIn>
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {WHY.map(({ icon: Icon, title, text }, i) => (
            <FadeIn key={title} delay={i * 0.12} y={50}>
              <motion.div
                whileHover={{ y: -10, rotate: i === 1 ? 0 : i === 0 ? -1.5 : 1.5 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="flex h-full flex-col rounded-[36px] bg-ink p-8 text-mist sm:p-10"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: 'var(--brand)' }}>
                  <Icon aria-hidden="true" className="h-7 w-7 text-white" />
                </span>
                <h3 className="mt-10 text-3xl font-semibold uppercase leading-none text-white sm:text-4xl">{title}</h3>
                <p className="mt-4 text-base font-light leading-relaxed text-mist/75 sm:text-lg">{text}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="relative z-10 -mt-10 overflow-hidden rounded-t-[40px] bg-ink px-5 py-24 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-32 md:-mt-14 md:rounded-t-[60px] md:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-mist/60">
            <Sparkles aria-hidden="true" className="h-4 w-4 text-fuchsia-300" /> My promise
          </FadeIn>
          <FadeIn as="p" delay={0.1} y={40} blur className="mt-6 font-semibold leading-[1.05] text-white" >
            <span style={{ fontSize: 'clamp(2rem, 5.4vw, 4.8rem)' }}>
              Modern, high-quality websites, <span className="glow-text">made for your business.</span>
            </span>
          </FadeIn>
          <div className="mt-16 grid items-stretch gap-5 md:grid-cols-[1.2fr_1fr]">
            <FadeIn delay={0.1} className="spin-border rounded-[36px]">
              <div className="flex h-full flex-col justify-between gap-8 rounded-[34px] bg-ink p-8 sm:p-10">
                <p className="text-lg font-light leading-relaxed text-mist/80 sm:text-xl">
                  Choose me and you get a fully finished, ready-to-launch website in just three days. My goal is to make the whole process fast, smooth and easy for you.
                </p>
                <p className="font-black uppercase leading-none" style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}>
                  <span className="glow-text">3 days</span>
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="flex flex-col justify-between gap-6 rounded-[36px] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
              <ul className="flex flex-col gap-4 text-lg text-white">
                {['Unique design, never a copy', 'Looks great on every screen', 'Built clean, fast and secure', 'Friendly, direct contact with me'].map((t) => (
                  <li key={t} className="flex items-center gap-3 border-b border-white/10 pb-4 last:border-0">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: 'var(--brand)' }} />
                    {t}
                  </li>
                ))}
              </ul>
              <ContactButton className="self-start">Let's talk</ContactButton>
            </FadeIn>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
