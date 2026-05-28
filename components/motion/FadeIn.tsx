'use client'

import { motion } from 'framer-motion'
import { EASE_PREMIUM } from '@/lib/motion'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

export function FadeIn({ children, className, delay = 0, y = 10 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: EASE_PREMIUM, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
