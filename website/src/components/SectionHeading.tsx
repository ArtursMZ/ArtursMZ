import FadeIn from './FadeIn'

export default function SectionHeading({ children, dark = false, className = '' }: { children: string; dark?: boolean; className?: string }) {
  return (
    <FadeIn
      as="h2"
      y={40}
      className={`${dark ? 'text-ink' : 'hero-heading'} text-center font-black uppercase leading-none tracking-tight ${className}`}
    >
      <span style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>{children}</span>
    </FadeIn>
  )
}
