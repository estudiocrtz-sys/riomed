import type { Variants } from 'framer-motion'

export const EASE_PREMIUM = [0.25, 0.1, 0.25, 1.0] as const

// ─── Single-element fade in from below ────────────────────────────────────────
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: EASE_PREMIUM },
  },
}

// ─── Stagger container — propagates "hidden"→"show" to children ───────────────
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

// ─── Stagger child item ────────────────────────────────────────────────────────
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: EASE_PREMIUM },
  },
}

// ─── Modal backdrop ────────────────────────────────────────────────────────────
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.18 } },
  exit:  { opacity: 0, transition: { duration: 0.15 } },
}

// ─── Modal panel ──────────────────────────────────────────────────────────────
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.22, ease: EASE_PREMIUM },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 4,
    transition: { duration: 0.18, ease: EASE_PREMIUM },
  },
}

// ─── Tab / filter content swap ────────────────────────────────────────────────
export const tabContent: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: EASE_PREMIUM },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.14 },
  },
}

// ─── Scale-in (empty states, confirmations) ───────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.22, ease: EASE_PREMIUM },
  },
}
