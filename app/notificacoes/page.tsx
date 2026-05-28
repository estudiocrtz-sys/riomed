'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { StaggerContainer } from '@/components/motion/StaggerContainer'
import { StaggerItem } from '@/components/motion/StaggerItem'
import { notifications } from '@/data/notifications'
import { Bell, CheckCircle2, FileText, Calendar, AlertCircle, Info } from 'lucide-react'

const typeIcon: Record<string, React.ReactNode> = {
  confirmacao: <CheckCircle2 className="w-4 h-4 text-[#2CC295]" />,
  lembrete:    <Bell className="w-4 h-4 text-amber-500" />,
  exame:       <FileText className="w-4 h-4 text-blue-500" />,
  retorno:     <Calendar className="w-4 h-4 text-purple-500" />,
  cancelamento:<AlertCircle className="w-4 h-4 text-red-500" />,
  aviso:       <Info className="w-4 h-4 text-[#03624C]" />,
}

const typeBg: Record<string, string> = {
  confirmacao:  'bg-[#2CC295]/10',
  lembrete:     'bg-amber-50',
  exame:        'bg-blue-50',
  retorno:      'bg-purple-50',
  cancelamento: 'bg-red-50',
  aviso:        'bg-[#03624C]/5',
}

function formatRelativeDate(dateStr: string) {
  const d = new Date(dateStr)
  const now = new Date('2024-05-26T12:00:00')
  const diffMs = now.getTime() - d.getTime()
  const diffH = Math.floor(diffMs / 3600000)
  const diffD = Math.floor(diffH / 24)
  if (diffH < 1) return 'Agora mesmo'
  if (diffH < 24) return `Há ${diffH}h`
  if (diffD === 1) return 'Ontem'
  if (diffD < 7) return `Há ${diffD} dias`
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

export default function NotificacoesPage() {
  const [items, setItems] = useState(notifications)
  const unread = items.filter((n) => !n.read)
  const read   = items.filter((n) => n.read)

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }
  function markRead(id: string) {
    setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <AppShell>
      <Header title="Notificações" subtitle={`${unread.length} não lidas`} />
      <div className="flex-1 p-8 space-y-6">

        {unread.length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={markAllRead}
              className="text-sm text-[#03624C] font-medium hover:text-[#2CC295] transition-colors"
            >
              Marcar todas como lidas
            </button>
          </div>
        )}

        {/* Unread */}
        {unread.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-[#8A9390] uppercase tracking-wider mb-3">Não lidas</p>
            <StaggerContainer className="space-y-2">
              {unread.map((n) => (
                <StaggerItem key={n.id}>
                  <Link href={n.link ?? '#'}>
                    <div
                      className={`flex items-start gap-4 p-4 rounded-2xl border border-[#2CC295]/20 ${typeBg[n.type]} hover:shadow-sm cursor-pointer transition-shadow`}
                      onClick={() => markRead(n.id)}
                    >
                      <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        {typeIcon[n.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#000F11]">{n.title}</p>
                        <p className="text-xs text-[#8A9390] mt-0.5 leading-relaxed">{n.message}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span className="text-[10px] text-[#8A9390]">{formatRelativeDate(n.date)}</span>
                        <span className="w-2 h-2 rounded-full bg-[#2CC295]" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

        {/* Read */}
        {read.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-[#8A9390] uppercase tracking-wider mb-3">Anteriores</p>
            <StaggerContainer className="space-y-2">
              {read.map((n) => (
                <StaggerItem key={n.id}>
                  <Link href={n.link ?? '#'}>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#E8EDE9] hover:shadow-sm cursor-pointer transition-shadow">
                      <div className="w-9 h-9 rounded-xl bg-[#F7F6F6] border border-[#E8EDE9] flex items-center justify-center flex-shrink-0">
                        {typeIcon[n.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#000F11]">{n.title}</p>
                        <p className="text-xs text-[#8A9390] mt-0.5 leading-relaxed">{n.message}</p>
                      </div>
                      <span className="text-[10px] text-[#8A9390] flex-shrink-0">{formatRelativeDate(n.date)}</span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

        {items.length === 0 && (
          <div className="py-16 text-center bg-white rounded-2xl border border-[#E8EDE9]">
            <Bell className="w-10 h-10 text-[#D0DDD6] mx-auto mb-3" />
            <p className="text-sm text-[#8A9390]">Nenhuma notificação.</p>
          </div>
        )}

      </div>
    </AppShell>
  )
}
