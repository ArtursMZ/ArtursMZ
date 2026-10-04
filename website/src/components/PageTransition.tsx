import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.76, 0, 0.24, 1] as const

/** A spruce-green panel wipes across the screen between pages. */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] origin-top bg-spruce"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.65, ease, delay: 0.05 } }}
        exit={{ scaleY: 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] origin-bottom bg-spruce"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.45, ease } }}
      />
      <main>{children}</main>
    </>
  )
}
