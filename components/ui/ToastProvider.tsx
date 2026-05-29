'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, X, AlertCircle } from 'lucide-react'

type ToastType = 'success' | 'info' | 'error'

interface Toast {
  id: string
  title: string
  description?: string
  type: ToastType
}

interface ToastInput {
  title: string
  description?: string
  type?: ToastType
}

const ToastContext = createContext<{ showToast: (toast: ToastInput) => void } | null>(null)

const toastStyles: Record<ToastType, { icon: React.ReactNode; className: string }> = {
  success: {
    icon: <CheckCircle2 className="h-4 w-4 text-[#03624C]" />,
    className: 'border-[#2CC295]/25 bg-[#2CC295]/10',
  },
  info: {
    icon: <Info className="h-4 w-4 text-[#03624C]" />,
    className: 'border-[#D0DDD6] bg-white',
  },
  error: {
    icon: <AlertCircle className="h-4 w-4 text-red-600" />,
    className: 'border-red-200 bg-red-50',
  },
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((toast: ToastInput) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const nextToast: Toast = {
      id,
      title: toast.title,
      description: toast.description,
      type: toast.type ?? 'success',
    }

    setToasts((current) => [nextToast, ...current].slice(0, 3))
    window.setTimeout(() => dismissToast(id), 3500)
  }, [dismissToast])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[80] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => {
            const style = toastStyles[toast.type]

            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 16, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className={`pointer-events-auto rounded-2xl border p-4 shadow-lg shadow-[#000F11]/10 backdrop-blur ${style.className}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white">
                    {style.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#000F11]">{toast.title}</p>
                    {toast.description && (
                      <p className="mt-0.5 text-xs leading-relaxed text-[#5F6A67]">{toast.description}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => dismissToast(toast.id)}
                    className="rounded-lg p-1 text-[#8A9390] transition-colors hover:bg-white hover:text-[#000F11] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50"
                    aria-label="Fechar aviso"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used inside ToastProvider')
  }
  return context
}
