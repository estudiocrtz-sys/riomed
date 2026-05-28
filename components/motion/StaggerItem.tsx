'use client'

import { motion } from 'framer-motion'
import { staggerItem } from '@/lib/motion'

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
}

/**
 * Direct child of StaggerContainer.
 * Inherits initial/animate state from the parent via Framer Motion variant propagation.
 */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  )
}
