export default function SectionHeading({ children, tone = 'light', className = '', as: Tag = 'h2' }: { children: string; tone?: 'light' | 'dark'; className?: string; as?: 'h1' | 'h2' }) {
  return (
    <Tag
      className={`font-display font-extrabold uppercase leading-[0.9] tracking-tight ${tone === 'dark' ? 'text-ink' : 'text-snow'} ${className}`}
      style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
    >
      {children}
    </Tag>
  )
}
