'use client'

import { Bell, Search, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { notifications } from '@/data/notifications'

const unreadCount = notifications.filter((n) => !n.read).length

interface HeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-8 bg-[#F7F6F6]/90 backdrop-blur-sm border-b border-[#D0DDD6]/60">
      <div>
        <h1 className="text-lg font-semibold text-[#000F11] leading-none">{title}</h1>
        {subtitle && <p className="text-xs text-[#8A9390] mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9390]" />
          <input
            type="text"
            placeholder="Buscar médico, especialidade..."
            className="h-9 w-64 pl-9 pr-4 rounded-xl bg-white border border-[#D0DDD6] text-sm text-[#000F11] placeholder:text-[#8A9390] focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30 focus:border-[#2CC295] transition-all"
          />
        </div>

        {actions}

        {/* Notifications */}
        <Link href="/notificacoes">
          <button className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-[#D0DDD6] text-[#8A9390] hover:text-[#000F11] hover:border-[#8A9390] transition-all">
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
          <button className="flex items-center gap-2.5 h-9 px-3 rounded-xl bg-white border border-[#D0DDD6] hover:border-[#8A9390] transition-all">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2CC295] to-[#03624C] flex items-center justify-center text-white text-[10px] font-bold">
              FA
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-[#000F11] leading-none">Felipe Almeida</p>
              <p className="text-[10px] text-[#8A9390] leading-none mt-0.5">Saúde Premium</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#8A9390]" />
          </button>
        </Link>
      </div>
    </header>
  )
}
