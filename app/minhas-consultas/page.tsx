'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { myAppointments } from '@/data/appointments'
import { formatDate } from '@/lib/utils'
import { Calendar, MapPin, Clock, FileText, RotateCcw, X, ChevronRight } from 'lucide-react'
import type { AppointmentStatus } from '@/data/appointments'

const tabs: { label: string; value: 'proximas' | 'anteriores' | 'canceladas' }[] = [
  { label: 'Próximas', value: 'proximas' },
  { label: 'Anteriores', value: 'anteriores' },
  { label: 'Canceladas', value: 'canceladas' },
]

export default function MinhasConsultasPage() {
  const [activeTab, setActiveTab] = useState<'proximas' | 'anteriores' | 'canceladas'>('proximas')

  const proximas = myAppointments.filter((a) => ['agendada', 'confirmada'].includes(a.status)).sort((a, b) => a.date.localeCompare(b.date))
  const anteriores = myAppointments.filter((a) => a.status === 'concluida').sort((a, b) => b.date.localeCompare(a.date))
  const canceladas = myAppointments.filter((a) => ['cancelada', 'remarcada'].includes(a.status))

  const items = activeTab === 'proximas' ? proximas : activeTab === 'anteriores' ? anteriores : canceladas

  return (
    <AppShell>
      <Header
        title="Minhas Consultas"
        subtitle={`${proximas.length} próximas · ${anteriores.length} realizadas · ${canceladas.length} canceladas`}
        actions={
          <Link href="/agendar">
            <Button size="sm"><Calendar className="w-4 h-4" /> Nova Consulta</Button>
          </Link>
        }
      />

      <div className="flex-1 p-8 space-y-6">
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white border border-[#E8EDE9] rounded-2xl p-1.5 w-fit">
          {tabs.map((tab) => {
            const count = tab.value === 'proximas' ? proximas.length : tab.value === 'anteriores' ? anteriores.length : canceladas.length
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.value ? 'bg-[#03624C] text-white shadow-sm' : 'text-[#8A9390] hover:text-[#000F11]'
                }`}
              >
                {tab.label}
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.value ? 'bg-white/20 text-white' : 'bg-[#F7F6F6] text-[#8A9390]'
                }`}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* List */}
        {items.length === 0 ? (
          <EmptyState
            icon={<Calendar />}
            title="Nenhuma consulta aqui"
            description={activeTab === 'proximas' ? 'Você não tem consultas agendadas. Que tal marcar uma?' : 'Nenhum histórico encontrado.'}
            action={activeTab === 'proximas' ? <Link href="/agendar"><Button>Agendar agora</Button></Link> : undefined}
          />
        ) : (
          <div className="space-y-3">
            {items.map((apt) => (
              <div key={apt.id} className="bg-white rounded-2xl border border-[#E8EDE9] p-5">
                <div className="flex items-start gap-5">
                  {/* Date block */}
                  <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-[#F7F6F6] border border-[#E8EDE9]">
                    <span className="text-lg font-bold text-[#000F11] leading-none">
                      {new Date(apt.date + 'T00:00:00').getDate()}
                    </span>
                    <span className="text-[10px] text-[#8A9390] font-medium">
                      {new Date(apt.date + 'T00:00:00').toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-base font-bold text-[#000F11]">{apt.doctorName}</p>
                      <StatusBadge status={apt.status} size="sm" />
                    </div>
                    <p className="text-sm text-[#2CC295] font-medium mb-2">{apt.specialty} · {apt.type}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-[#8A9390]">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{apt.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{apt.unitName}</span>
                    </div>
                    {apt.notes && (
                      <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-3">
                        📌 {apt.notes}
                      </p>
                    )}
                    {apt.result && (
                      <p className="text-xs text-[#03624C] bg-[#2CC295]/5 border border-[#2CC295]/15 rounded-lg px-3 py-2 mt-3">
                        ✓ {apt.result}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {activeTab === 'proximas' && (
                      <>
                        <Link href="/agendar">
                          <Button variant="outline" size="sm" className="gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> Remarcar</Button>
                        </Link>
                        <Button variant="danger" size="sm" className="gap-1.5"><X className="w-3.5 h-3.5" /> Cancelar</Button>
                      </>
                    )}
                    {activeTab === 'anteriores' && (
                      <>
                        <Button variant="outline" size="sm" className="gap-1.5"><FileText className="w-3.5 h-3.5" /> Ver prontuário</Button>
                        <Link href="/agendar">
                          <Button size="sm" className="gap-1.5 w-full"><RotateCcw className="w-3.5 h-3.5" /> Remarcar</Button>
                        </Link>
                      </>
                    )}
                    {activeTab === 'canceladas' && (
                      <Link href="/agendar">
                        <Button size="sm" className="gap-1.5"><Calendar className="w-3.5 h-3.5" /> Reagendar</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}
