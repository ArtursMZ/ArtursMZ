// Remote media used by the marquee and the work showcases.

export const MARQUEE_GIFS = [
  'hero-space-voyage-preview-eECLH3Yc',
  'hero-codenest-preview-Cgppc2qV',
  'hero-vex-ventures-preview-BczMFIiw',
  'hero-stellar-ai-v2-preview-DjvxjG3C',
  'hero-asme-preview-B_nGDnTP',
  'hero-transform-data-preview-Cx5OU29N',
  'hero-vitara-preview-Cjz2QYyU',
  'hero-terra-preview-BFjrCr7T',
  'hero-skyelite-preview-DHaZIgUv',
  'hero-aethera-preview-DknSlcTa',
  'hero-designpro-preview-D8c5_een',
  'hero-stellar-ai-preview-D3HL6bw1',
  'hero-xportfolio-preview-D4A8maiC',
  'hero-orbit-web3-preview-BXt4OttD',
  'hero-nexora-preview-cx5HmUgo',
  'hero-evr-ventures-preview-DZxeVFEX',
  'hero-planet-orbit-preview-DWAP8Z1P',
  'hero-new-era-preview-CocuDUm9',
  'hero-wealth-preview-B70idl_u',
  'hero-luminex-preview-CxOP7ce6',
  'hero-celestia-preview-0yO3jXO8',
].map((name) => `https://motionsites.ai/assets/${name}.gif`)

const FIGMA = 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7'
export const DECOR = {
  moon: `${FIGMA}/moon_icon.11395d36.png`,
  object: `${FIGMA}/p59_1.4659672e.png`,
  lego: `${FIGMA}/lego_icon-1.703bb594.png`,
  group: `${FIGMA}/Group_134-1.2e04f3ce.png`,
}

const SV = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P'
export const SPACE = {
  marsBg: `${SV}/3c83091e-4046-4fd6-adbb-2edb728be79a.mp4`,
  toEarth: `${SV}/fc3ded42-e845-41f3-a830-5cab512d79cd.mp4`,
  toVenus: `${SV}/b30f64d9-1637-477a-83df-d0fc6461a422.mp4`,
  logo: `${SV}/eb7e0f53-50cd-4af5-abc4-8b9a52cdc01b.svg`,
  gif: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
}

const higgs = (user: string, file: string) =>
  `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(
    `https://d8j0ntlcm91z4.cloudfront.net/${user}/${file}.png`,
  )}&w=1280&q=85`

export const PROMPT = {
  left: 'https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154433_532a85d3-dabf-4265-b8bd-19ac6af31842.mp4',
  right: 'https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154401_a664f076-b971-4557-8728-40ef9ea4c49b.mp4',
  gallery: [
    'hf_20260629_104530_521b2f85-c0f3-4d0e-9704-b578315b4cb9',
    'hf_20260629_103711_76ccdb8b-5043-4f47-9c54-4379713393ea',
    'hf_20260629_103728_394f6a1b-85e2-4386-a4f6-408472a0a5b7',
    'hf_20260629_103739_86743e0e-16a7-4bee-bf38-dd67985344dc',
    'hf_20260629_103748_b2215dc8-a3a7-470d-b19a-5b87fa7d0c37',
    'hf_20260629_103758_e919ce72-5c9d-4b87-9be6-d7647b34825c',
  ].map((f) => higgs('user_38xzZboKViGWJOttwIXH07lWA1P', f)),
}

const DX = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P'
export const DIGITAL = {
  hero: `${DX}/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4`,
  capabilities: `${DX}/hf_20260622_093722_ccfc7ebf-182f-419f-8a62-2dc02db7dd9d.mp4`,
}
