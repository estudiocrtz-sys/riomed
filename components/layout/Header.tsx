'use client'

import { Bell, Search, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { notifications } from '@/data/notifications'
import { currentPatient } from '@/data/patient'
import { STORAGE_KEYS, usePersistentState } from '@/lib/local-storage'

interface HeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  const [storedNotifications] = usePersistentState(STORAGE_KEYS.notifications, notifications)
  const [patient] = usePersistentState(STORAGE_KEYS.patient, currentPatient)
  const unreadCount = storedNotifications.filter((n) => !n.read).length
  const patientInitials = patient.name.split(' ').map((part) => part[0]).slice(0, 2).join('')

  return (
    <header className="sticky top-0 z-30 flex min-h-16 flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#F7F6F6]/90 backdrop-blur-sm border-b border-[#D0DDD6]/60 sm:px-6 lg:px-8">
      <div className="min-w-0">
        <h1 className="text-lg font-semibold text-[#000F11] leading-none">{title}</h1>
        {subtitle && <p className="text-xs text-[#8A9390] mt-1">{subtitle}</p>}
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        {/* Search */}
        <div className="relative hidden min-w-44 max-w-64 flex-1 sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9390]" />
          <input
            type="text"
            placeholder="Buscar médico, especialidade..."
            className="h-9 w-full pl-9 pr-4 rounded-xl bg-white border border-[#D0DDD6] text-sm text-[#000F11] placeholder:text-[#8A9390] focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30 focus:border-[#2CC295] transition-all"
          />
        </div>

        {actions}

        {/* Notifications */}
        <Link href="/notificacoes">
          <button className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-[#D0DDD6] text-[#8A9390] hover:text-[#000F11] hover:border-[#8A9390] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50">
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#2CC295] text-[#000F11] text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </Link>

        {/* Patient avatar */}
        <Link href="/perfil">
          <button className="flex items-center gap-2.5 h-9 px-2.5 sm:px-3 rounded-xl bg-white border border-[#D0DDD6] hover:border-[#8A9390] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2CC295] to-[#03624C] flex items-center justify-center text-white text-[10px] font-bold">
              {patientInitials}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold text-[#000F11] leading-none">{patient.name}</p>
              <p className="text-[10px] text-[#8A9390] leading-none mt-0.5">{patient.insurance}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#8A9390]" />
          </button>
        </Link>
      </div>
    </header>
  )
}
