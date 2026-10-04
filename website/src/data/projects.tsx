import type { Project } from '../components/ProjectStack'
import { SpaceVoyageMain, SpaceVoyageSideA, SpaceVoyageSideB } from '../components/showcases/SpaceVoyage'
import { PromptMain, PromptSideA, PromptSideB } from '../components/showcases/Prompt'
import { DigitalMain, DigitalSideA, DigitalSideB } from '../components/showcases/Digital'

export const PROJECTS: Project[] = [
  {
    name: 'Space Voyage',
    category: 'Immersive experience',
    url: 'space-voyage.web',
    blurb: 'A cinematic space portal. A tilting 3D window lets you jump from planet to planet.',
    main: <SpaceVoyageMain />,
    sideA: <SpaceVoyageSideA />,
    sideB: <SpaceVoyageSideB />,
  },
  {
    name: 'PROMPT',
    category: 'Fashion / eCommerce',
    url: 'prmpt.store',
    blurb: 'A fashion archive where video follows your cursor and products pop in as you scroll.',
    main: <PromptMain />,
    sideA: <PromptSideA />,
    sideB: <PromptSideB />,
  },
  {
    name: 'Digital Experiences',
    category: 'Agency website',
    url: 'digital-experiences.studio',
    blurb: 'A dark, cinematic studio site with liquid-glass UI and smooth blur-in animations.',
    main: <DigitalMain />,
    sideA: <DigitalSideA />,
    sideB: <DigitalSideB />,
  },
]
