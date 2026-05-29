'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  onClick: () => void
  label?: string
  className?: string
}

/**
 * Back button used in multi-step flows.
 * Subtle hover shift to the left reinforces the "going back" direction.
 */
export function BackButton({ onClick, label = 'Voltar', className = '' }: BackButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ x: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className={`inline-flex min-h-9 items-center gap-2 rounded-full border border-[#E8EDE9] bg-white px-4 py-2 text-sm font-medium text-[#5F6A67] transition-colors duration-200 hover:border-[#2CC295]/35 hover:bg-[#2CC295]/5 hover:text-[#03624C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F6F6] ${className}`}
    >
      <ArrowLeft className="h-4 w-4 flex-shrink-0" />
      {label}
    </motion.button>
  )
}
