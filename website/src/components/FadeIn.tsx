import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const tags = {
  div: motion.div,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  li: motion.li,
  span: motion.span,
  nav: motion.nav,
} as const

type Props = {
  as?: keyof typeof tags
  children?: ReactNode
  className?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
  blur?: boolean
}

export default function FadeIn({ as = 'div', children, className, delay = 0, duration = 0.7, x = 0, y = 30, blur = false }: Props) {
  const Tag = tags[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, x, y, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Tag>
  )
}
