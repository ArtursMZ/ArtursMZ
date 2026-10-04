import type { Project } from '../components/ProjectStack'
import { SpaceVoyageMain, SpaceVoyageSideA, SpaceVoyageSideB } from '../components/showcases/SpaceVoyage'
import { PromptMain, PromptSideA, PromptSideB } from '../components/showcases/Prompt'
import { DigitalMain, DigitalSideA, DigitalSideB } from '../components/showcases/Digital'

export const PROJECTS: Project[] = [
  {
    name: 'Space Voyage',
    category: 'Immersive experience',
    url: 'space-voyage.web',
    blurb: 'A trip through space. A tilting window grows to fill the screen and flies you from Mars to Earth to Venus.',
    main: <SpaceVoyageMain />,
    sideA: <SpaceVoyageSideA />,
    sideB: <SpaceVoyageSideB />,
  },
  {
    name: 'PROMPT',
    category: 'Fashion / eCommerce',
    url: 'prmpt.store',
    blurb: 'A fashion store where the video follows your mouse and products appear as you scroll.',
    main: <PromptMain />,
    sideA: <PromptSideA />,
    sideB: <PromptSideB />,
  },
  {
    name: 'Digital Experiences',
    category: 'Agency website',
    url: 'digital-experiences.studio',
    blurb: 'A dark studio website with glass-style buttons and text that sharpens into view.',
    main: <DigitalMain />,
    sideA: <DigitalSideA />,
    sideB: <DigitalSideB />,
  },
]
