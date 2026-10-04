import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.76, 0, 0.24, 1] as const

/** Gradient curtain that wipes over the screen between pages. */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] origin-top"
        style={{ background: 'var(--brand)' }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.7, ease, delay: 0.05 } }}
        exit={{ scaleY: 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] origin-bottom"
        style={{ background: 'var(--brand)' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.5, ease } }}
      />
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.2 } }} exit={{ opacity: 1 }}>
        {children}
      </motion.main>
    </>
  )
}
