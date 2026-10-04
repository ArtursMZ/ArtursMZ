import ProjectStack from '../components/ProjectStack'
import SectionHeading from '../components/SectionHeading'
import CtaBand from '../components/CtaBand'
import { PROJECTS } from '../data/projects'

export default function Work() {
  return (
    <>
      <section className="bg-night px-5 pb-16 pt-36 sm:px-8 md:px-10 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <SectionHeading as="h1">My work</SectionHeading>
          <p className="mt-8 max-w-[44ch] text-xl text-fog">These previews play live on the page, so you can watch every animation without leaving.</p>
        </div>
      </section>
      <section aria-label="Projects" className="bg-night px-3 pb-section sm:px-6 md:px-10">
        <ProjectStack projects={PROJECTS} />
      </section>
      <CtaBand />
    </>
  )
}
