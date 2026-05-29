'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { useToast } from '@/components/ui/ToastProvider'
import { myAppointments } from '@/data/appointments'
import { overlayVariants, modalVariants } from '@/lib/motion'
import { STORAGE_KEYS, usePersistentState } from '@/lib/local-storage'
import { Calendar, MapPin, Clock, FileText, RotateCcw, X } from 'lucide-react'
import type { Appointment } from '@/data/appointments'

const tabs: { label: string; value: 'proximas' | 'anteriores' | 'canceladas' }[] = [
  { label: 'Próximas',   value: 'proximas' },
  { label: 'Anteriores', value: 'anteriores' },
  { label: 'Canceladas', value: 'canceladas' },
]

function AnimatedSuccessCheck() {
  return (
    <motion.div
      initial={{ scale: 0.75, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 360, damping: 24, mass: 0.8 }}
      className="relative w-16 h-16 rounded-full bg-[#2CC295]/10 flex items-center justify-center mx-auto mb-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0.45 }}
        animate={{ scale: 1.35, opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
        className="absolute inset-0 rounded-full bg-[#2CC295]/20"
      />
      <svg className="relative z-10 w-9 h-9" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <motion.circle
          cx="22"
          cy="22"
          r="18"
          stroke="#2CC295"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 }}
        />
        <motion.path
          d="M14.5 22.5L19.5 27.5L30 17"
          stroke="#2CC295"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.48 }}
        />
      </svg>
    </motion.div>
  )
}

function CancelAppointmentModal({
  appointment,
  success,
  onConfirm,
  onClose,
}: {
  appointment: Appointment | null
  success: boolean
  onConfirm: () => void
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {appointment && (
        <>
          <motion.div
            key="cancel-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="cancel-panel"
            variants={modalVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div role="dialog" aria-modal="true" className="w-full max-w-md rounded-3xl border border-[#E8EDE9] bg-white p-7 text-center shadow-2xl pointer-events-auto">
              {success ? (
                <>
                  <AnimatedSuccessCheck />
                  <h2 className="text-xl font-bold text-[#000F11] mb-2">Consulta cancelada com sucesso</h2>
                  <p className="text-sm text-[#8A9390] mb-6">
                    A consulta com {appointment.doctorName} foi movida para canceladas.
                  </p>
                  <Button className="w-full" onClick={onClose}>Entendi</Button>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
                    <X className="w-7 h-7 text-red-500" />
                  </div>
                  <h2 className="text-xl font-bold text-[#000F11] mb-2">Deseja realmente cancelar essa consulta?</h2>
                  <p className="text-sm text-[#8A9390] mb-6">
                    {appointment.doctorName} · {appointment.specialty} · {appointment.time}
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={onClose}>Voltar</Button>
                    <Button variant="danger" className="flex-1" onClick={onConfirm}>Sim, cancelar</Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function MinhasConsultasPage() {
  const [activeTab, setActiveTab] = useState<'proximas' | 'anteriores' | 'canceladas'>('proximas')
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null)
  const [cancelSuccess, setCancelSuccess] = useState(false)
  const [appointments, setAppointments] = usePersistentState(STORAGE_KEYS.appointments, myAppointments)
  const { showToast } = useToast()

  const proximas   = appointments.filter((a) => ['agendada', 'confirmada'].includes(a.status)).sort((a, b) => a.date.localeCompare(b.date))
  const anteriores = appointments.filter((a) => a.status === 'concluida').sort((a, b) => b.date.localeCompare(a.date))
  const canceladas = appointments.filter((a) => ['cancelada', 'remarcada'].includes(a.status)).sort((a, b) => b.date.localeCompare(a.date))

  const items = activeTab === 'proximas' ? proximas : activeTab === 'anteriores' ? anteriores : canceladas

  function handleConfirmCancel() {
    if (!cancelTarget) return
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === cancelTarget.id
          ? { ...appointment, status: 'cancelada' as const, notes: 'Cancelada pelo paciente.' }
          : appointment
      )
    )
    setCancelSuccess(true)
    showToast({
      title: 'Consulta cancelada',
      description: 'A consulta foi movida para canceladas.',
    })
  }

  function handleCloseCancelModal() {
    setCancelTarget(null)
    setCancelSuccess(false)
  }

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

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">

        {/* Tabs */}
        <div className="relative flex w-full items-center gap-1 overflow-x-auto bg-white border border-[#E8EDE9] rounded-2xl p-1.5 sm:w-fit">
          {tabs.map((tab) => {
            const count = tab.value === 'proximas' ? proximas.length : tab.value === 'anteriores' ? anteriores.length : canceladas.length
            const active = activeTab === tab.value

            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className="relative z-10 whitespace-nowrap px-5 py-2 rounded-xl text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50"
                style={{ color: active ? 'white' : '#8A9390' }}
              >
                {/* Sliding background */}
                {active && (
                  <motion.div
                    layoutId="tab-active-bg"
                    className="absolute inset-0 bg-[#03624C] rounded-xl shadow-sm"
                    transition={{ type: 'spring', stiffness: 500, damping: 38, mass: 0.8 }}
                  />
                )}
                <span className="relative z-10">
                  {tab.label}
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full transition-colors duration-200 ${
                    active ? 'bg-white/20 text-white' : 'bg-[#F7F6F6] text-[#8A9390]'
                  }`}>
                    {count}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {items.length === 0 ? (
          <EmptyState
            icon={<Calendar />}
            title="Nenhuma consulta aqui"
            description={
              activeTab === 'proximas'
                ? 'Você não tem consultas agendadas. Que tal marcar uma?'
                : 'Nenhum histórico encontrado.'
            }
            action={
              activeTab === 'proximas'
                ? <Link href="/agendar"><Button>Agendar agora</Button></Link>
                : undefined
            }
          />
        ) : (
          <div className="space-y-3">
            {items.map((apt) => (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -1, boxShadow: '0 4px 16px rgba(0,15,17,0.07)' }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-2xl border border-[#E8EDE9] p-5"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start">
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
                  <div className="flex flex-row gap-2 md:flex-col md:flex-shrink-0">
                    {activeTab === 'proximas' && (
                      <>
                        <Link href="/agendar">
                          <Button variant="outline" size="sm" className="w-full gap-1.5 md:w-auto"><RotateCcw className="w-3.5 h-3.5" /> Remarcar</Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          className="flex-1 gap-1.5 md:flex-none"
                          onClick={() => setCancelTarget(apt)}
                        >
                          <X className="w-3.5 h-3.5" /> Cancelar
                        </Button>
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
              </motion.div>
            ))}
          </div>
        )}

      </div>

      <CancelAppointmentModal
        appointment={cancelTarget}
        success={cancelSuccess}
        onConfirm={handleConfirmCancel}
        onClose={handleCloseCancelModal}
      />
    </AppShell>
  )
}
