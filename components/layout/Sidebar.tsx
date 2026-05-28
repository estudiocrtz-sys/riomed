'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Home,
  CalendarPlus,
  Calendar,
  Stethoscope,
  Heart,
  MapPin,
  FileText,
  Bell,
  User,
  HelpCircle,
  Cross,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { notifications } from '@/data/notifications'

const navItems = [
  { href: '/inicio', label: 'Início', icon: Home },
  { href: '/agendar', label: 'Agendar Consulta', icon: CalendarPlus },
  { href: '/minhas-consultas', label: 'Minhas Consultas', icon: Calendar },
  { href: '/medicos', label: 'Médicos', icon: Stethoscope },
  { href: '/especialidades', label: 'Especialidades', icon: Heart },
  { href: '/unidades', label: 'Unidades', icon: MapPin },
  { href: '/exames', label: 'Exames e Documentos', icon: FileText },
  { href: '/notificacoes', label: 'Notificações', icon: Bell },
  { href: '/perfil', label: 'Meu Perfil', icon: User },
  { href: '/ajuda', label: 'Ajuda', icon: HelpCircle },
]

const unreadCount = notifications.filter((n) => !n.read).length

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col bg-[#000F11] z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#2CC295]">
          <Cross className="w-4 h-4 text-[#000F11]" strokeWidth={2.5} />
        </div>
        <div>
          <span className="text-white font-bold text-lg leading-none tracking-tight">RIOMed</span>
          <p className="text-[#2CC295] text-[10px] font-medium tracking-widest uppercase mt-0.5">Portal do Paciente</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          const isNotif = href === '/notificacoes'

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200',
                active
                  ? 'text-[#2CC295]'
                  : 'text-[#8A9390] hover:text-white'
              )}
            >
              {/* Sliding background — animates between nav items via layoutId */}
              {active && (
                <motion.div
                  layoutId="sidebar-active-bg"
                  className="absolute inset-0 rounded-xl bg-[#2CC295]/12"
                  transition={{ type: 'spring', stiffness: 480, damping: 38, mass: 0.8 }}
                />
              )}

              {/* Left accent bar */}
              {active && (
                <motion.div
                  layoutId="sidebar-active-bar"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#2CC295] rounded-full"
                  transition={{ type: 'spring', stiffness: 480, damping: 38, mass: 0.8 }}
                />
              )}

              <Icon
                className={cn(
                  'w-4 h-4 flex-shrink-0 relative z-10 transition-colors duration-200',
                  active ? 'text-[#2CC295]' : 'text-current'
                )}
                strokeWidth={active ? 2.5 : 1.8}
              />

              <span className="flex-1 relative z-10">{label}</span>

              {isNotif && unreadCount > 0 && (
                <span className="relative z-10 flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-[#2CC295] text-[#000F11] text-[10px] font-bold px-1">
                  {unreadCount}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 space-y-2 border-t border-white/5 pt-3">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2CC295] to-[#03624C] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            FA
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-xs font-semibold leading-none truncate">Felipe Almeida</p>
            <p className="text-[#8A9390] text-[10px] mt-0.5">Saúde Premium · desde 2022</p>
          </div>
        </div>
        <button className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs text-[#8A9390] hover:text-white hover:bg-white/5 transition-colors duration-200">
          <LogOut className="w-3.5 h-3.5" />
          Sair
        </button>
      </div>
    </aside>
  )
}
