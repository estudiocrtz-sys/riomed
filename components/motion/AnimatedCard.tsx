'use client'

import { motion } from 'framer-motion'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

/**
 * Drop-in replacement for a plain card div.
 * Adds subtle hover elevation and shadow — no scale, just a clean y-lift.
 */
export function AnimatedCard({ children, className, onClick }: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0, 15, 17, 0.09)' }}
      transition={{ duration: 0.18 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
