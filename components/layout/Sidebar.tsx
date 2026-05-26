'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-[#2CC295]/15 text-[#2CC295]'
                  : 'text-[#8A9390] hover:text-white hover:bg-white/5'
              )}
            >
              <Icon
                className={cn('w-4 h-4 flex-shrink-0', active ? 'text-[#2CC295]' : 'text-current')}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className="flex-1">{label}</span>
              {isNotif && unreadCount > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-[#2CC295] text-[#000F11] text-[10px] font-bold px-1">
                  {unreadCount}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 space-y-2 border-t border-white/5 pt-3">
        {/* Patient card */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2CC295] to-[#03624C] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            MC
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-xs font-semibold leading-none truncate">Mariana Costa</p>
            <p className="text-[#8A9390] text-[10px] mt-0.5">Saúde Premium · desde 2022</p>
          </div>
        </div>
        <button className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs text-[#8A9390] hover:text-white hover:bg-white/5 transition-all">
          <LogOut className="w-3.5 h-3.5" />
          Sair
        </button>
      </div>
    </aside>
  )
}
