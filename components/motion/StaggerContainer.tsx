'use client'

import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/motion'

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
}

/**
 * Wrapper that staggers the entrance of its StaggerItem children.
 * Pass grid / flex / space-y classes via `className`.
 */
export function StaggerContainer({ children, className }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  )
}
