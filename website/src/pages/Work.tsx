import FadeIn from '../components/FadeIn'
import ProjectStack from '../components/ProjectStack'
import CtaBand from '../components/CtaBand'
import { PROJECTS } from '../data/projects'

export default function Work() {
  return (
    <>
      <section className="px-5 pb-16 pt-36 sm:px-8 md:px-10 md:pt-44">
        <FadeIn as="h1" y={40} className="hero-heading text-center font-black uppercase leading-none tracking-tight">
          <span style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>My work</span>
        </FadeIn>
        <FadeIn delay={0.15} className="mx-auto mt-8 max-w-2xl text-center text-lg font-light leading-relaxed text-mist/75 sm:text-xl">
          Sit back and watch. These are live previews, so every animation plays right here on the page.
        </FadeIn>
      </section>
      <section aria-label="Projects" className="px-3 pb-32 sm:px-6 md:px-10">
        <ProjectStack projects={PROJECTS} />
      </section>
      <CtaBand />
    </>
  )
}
