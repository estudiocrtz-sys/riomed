'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { BackButton } from '@/components/ui/BackButton'
import { DoctorAvatar } from '@/components/ui/DoctorAvatar'
import { useToast } from '@/components/ui/ToastProvider'
import { specialties, getSpecialtyById } from '@/data/specialties'
import { specialtyIconMap } from '@/lib/specialty-icons'
import { doctors, getDoctorsBySpecialty, getDoctorById } from '@/data/doctors'
import { myAppointments } from '@/data/appointments'
import { units, getUnitById } from '@/data/units'
import { STORAGE_KEYS, usePersistentState } from '@/lib/local-storage'
import {
  Check, Star, MapPin, Clock, Calendar, CheckCircle2,
} from 'lucide-react'

type Step = 1 | 2 | 3 | 4 | 5 | 6

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

function generateDates() {
  const dates = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < 30; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    if (d.getDay() !== 0) dates.push(d) // skip Sunday
  }
  return dates
}

const availableDates = generateDates()

const stepLabels = ['Especialidade', 'Médico', 'Unidade', 'Data', 'Horário', 'Confirmação']

function AnimatedSuccessCheck() {
  return (
    <motion.div
      initial={{ scale: 0.75, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 360, damping: 24, mass: 0.8 }}
      className="relative w-20 h-20 rounded-full bg-[#2CC295]/10 flex items-center justify-center mx-auto mb-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0.45 }}
        animate={{ scale: 1.35, opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
        className="absolute inset-0 rounded-full bg-[#2CC295]/20"
      />
      <svg className="relative z-10 w-10 h-10" viewBox="0 0 44 44" fill="none" aria-hidden="true">
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

function BookingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const doctorParam = searchParams.get('doctor')
  const specialtyParam = searchParams.get('specialty')
  const unitParam = searchParams.get('unit')
  const initialDoctor = doctorParam ? getDoctorById(doctorParam) : null
  const initialStep: Step = initialDoctor ? 3 : unitParam || specialtyParam ? 2 : 1

  const [step, setStep] = useState<Step>(initialStep)
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(initialDoctor?.specialtyId ?? specialtyParam)
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(initialDoctor ? doctorParam : null)
  const [selectedUnit, setSelectedUnit] = useState<string | null>(unitParam)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [specialtySearch, setSpecialtySearch] = useState('')
  const [, setAppointments] = usePersistentState(STORAGE_KEYS.appointments, myAppointments)
  const { showToast } = useToast()

  const filteredSpecialties = specialties.filter((s) =>
    s.name.toLowerCase().includes(specialtySearch.toLowerCase())
  )

  const availableDoctors = selectedSpecialty
    ? getDoctorsBySpecialty(selectedSpecialty)
    : doctors

  const doctor = selectedDoctor ? getDoctorById(selectedDoctor) : null
  const specialty = selectedSpecialty ? getSpecialtyById(selectedSpecialty) : null
  const unit = selectedUnit ? getUnitById(selectedUnit) : null

  const availableUnits = selectedDoctor
    ? units.filter((u) => doctor?.unitIds.includes(u.id))
    : units

  function confirmAppointment() {
    if (!doctor || !specialty || !unit || !selectedDate || !selectedTime) return

    const appointment = {
      id: `local-${doctor.id}-${unit.id}-${selectedDate.toISOString().split('T')[0]}-${selectedTime}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: specialty.name,
      specialtyId: specialty.id,
      unitId: unit.id,
      unitName: unit.name,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      type: 'Consulta',
      status: 'agendada' as const,
    }

    setAppointments((current) => [appointment, ...current])
    setConfirmed(true)
    showToast({
      title: 'Consulta agendada',
      description: `${doctor.name} às ${selectedTime}.`,
    })
  }

  if (confirmed) {
    return (
      <AppShell>
        <Header title="Agendar Consulta" />
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="bg-white rounded-3xl border border-[#E8EDE9] p-6 sm:p-12 max-w-md w-full text-center shadow-lg">
            <AnimatedSuccessCheck />
            <h2 className="text-2xl font-bold text-[#000F11] mb-2">Consulta Agendada!</h2>
            <p className="text-[#8A9390] mb-6">
              Sua consulta foi agendada com sucesso. Você receberá um lembrete por e-mail e SMS.
            </p>
            <div className="bg-[#F7F6F6] rounded-2xl p-4 text-left space-y-2 mb-6">
              <p className="text-sm"><span className="text-[#8A9390]">Médico:</span> <span className="font-semibold text-[#000F11]">{doctor?.name}</span></p>
              <p className="text-sm"><span className="text-[#8A9390]">Especialidade:</span> <span className="font-semibold text-[#000F11]">{specialty?.name}</span></p>
              <p className="text-sm"><span className="text-[#8A9390]">Unidade:</span> <span className="font-semibold text-[#000F11]">{unit?.name}</span></p>
              <p className="text-sm"><span className="text-[#8A9390]">Data:</span> <span className="font-semibold text-[#000F11]">{selectedDate?.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}</span></p>
              <p className="text-sm"><span className="text-[#8A9390]">Horário:</span> <span className="font-semibold text-[#000F11]">{selectedTime}</span></p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/minhas-consultas" className="flex-1">
                <Button variant="outline" className="w-full">Ver minhas consultas</Button>
              </a>
              <a href="/inicio" className="flex-1">
                <Button className="w-full">Ir para o início</Button>
              </a>
            </div>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <Header title="Agendar Consulta" subtitle="Escolha as opções abaixo para agendar sua consulta" />

      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Steps indicator */}
        <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex min-w-[680px] items-center gap-0">
          {stepLabels.map((label, i) => {
            const n = (i + 1) as Step
            const done = n < step
            const active = n === step
            return (
              <div key={n} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    done ? 'bg-[#2CC295] text-[#000F11]' :
                    active ? 'bg-[#03624C] text-white ring-4 ring-[#2CC295]/20' :
                    'bg-white border-2 border-[#D0DDD6] text-[#8A9390]'
                  }`}>
                    {done ? <Check className="w-4 h-4" /> : n}
                  </div>
                  <span className={`text-[10px] font-medium mt-1 whitespace-nowrap ${active ? 'text-[#03624C]' : done ? 'text-[#2CC295]' : 'text-[#8A9390]'}`}>
                    {label}
                  </span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mb-4 ${done ? 'bg-[#2CC295]' : 'bg-[#D0DDD6]'}`} />
                )}
              </div>
            )
          })}
        </div>
        </div>

        {/* Step 1: Specialty */}
        {step === 1 && (
          <div>
            <BackButton onClick={() => router.push('/inicio')} className="mb-6" />
            <h2 className="text-lg font-semibold text-[#000F11] mb-2">Escolha a especialidade</h2>
            <p className="text-sm text-[#8A9390] mb-5">Selecione a especialidade médica que você precisa.</p>
            <input
              type="text"
              placeholder="Buscar especialidade..."
              value={specialtySearch}
              onChange={(e) => setSpecialtySearch(e.target.value)}
              className="h-9 w-full max-w-sm px-4 rounded-xl bg-white border border-[#D0DDD6] text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30 focus:border-[#2CC295]"
            />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {filteredSpecialties.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedSpecialty(s.id); setStep(2) }}
                  className={`bg-white rounded-2xl border p-4 sm:p-5 text-left hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50 ${
                    selectedSpecialty === s.id ? 'border-[#2CC295] ring-2 ring-[#2CC295]/20' : 'border-[#E8EDE9] hover:border-[#2CC295]/40'
                  }`}
                >
                  {(() => {
                    const Icon = specialtyIconMap[s.iconName]
                    return (
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                        style={{ backgroundColor: `${s.color}1a` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: s.color }} />
                      </div>
                    )
                  })()}
                  <p className="text-sm font-semibold text-[#000F11]">{s.name}</p>
                  <p className="text-xs text-[#8A9390] mt-1 line-clamp-2">{s.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] text-[#2CC295] font-medium">{s.doctorCount} médicos</span>
                    <span className="text-[10px] text-[#8A9390]">≈{s.avgWaitDays}d</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Doctor */}
        {step === 2 && (
          <div>
            <BackButton onClick={() => setStep(1)} className="mb-6" />
            <h2 className="text-lg font-semibold text-[#000F11] mb-2">Escolha o médico</h2>
            <p className="text-sm text-[#8A9390] mb-5">Profissionais disponíveis em {specialty?.name ?? 'todas as especialidades'}.</p>
            <div className="grid gap-4 lg:grid-cols-2">
              {availableDoctors.map((d) => (
                <button
                  key={d.id}
                  onClick={() => { setSelectedDoctor(d.id); setStep(3) }}
                  className={`bg-white rounded-2xl border p-4 sm:p-5 text-left hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50 ${
                    selectedDoctor === d.id ? 'border-[#2CC295] ring-2 ring-[#2CC295]/20' : 'border-[#E8EDE9]'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <DoctorAvatar doctor={d} />
                    <div>
                      <p className="text-sm font-bold text-[#000F11]">{d.name}</p>
                      <p className="text-xs text-[#2CC295] font-medium">{d.specialty}</p>
                      <p className="text-[10px] text-[#8A9390]">{d.crm}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#8A9390] mb-3 line-clamp-2">{d.bio}</p>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold text-[#000F11]">{d.rating}</span>
                      <span className="text-[10px] text-[#8A9390]">({d.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#8A9390]">
                      <Clock className="w-3 h-3" />
                      {d.availableDays.join(', ')}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Unit */}
        {step === 3 && (
          <div>
            <BackButton onClick={() => setStep(2)} className="mb-6" />
            <h2 className="text-lg font-semibold text-[#000F11] mb-2">Escolha a unidade</h2>
            <p className="text-sm text-[#8A9390] mb-5">Selecione a unidade mais conveniente para você.</p>
            <div className="grid gap-4 lg:grid-cols-2">
              {availableUnits.map((u) => (
                <button
                  key={u.id}
                  onClick={() => { setSelectedUnit(u.id); setStep(4) }}
                  className={`bg-white rounded-2xl border p-4 sm:p-5 text-left hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50 ${
                    selectedUnit === u.id ? 'border-[#2CC295] ring-2 ring-[#2CC295]/20' : 'border-[#E8EDE9]'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F7F6F6] border border-[#E8EDE9] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#03624C]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#000F11]">{u.name}</p>
                      <p className="text-xs text-[#8A9390]">{u.neighborhood}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#8A9390] mb-2">{u.address}</p>
                  <p className="text-[10px] text-[#2CC295] font-medium">{u.hours.split('|')[0]}</p>
                  <div className="flex gap-2 mt-3">
                    {u.parking && <span className="text-[10px] bg-[#F7F6F6] text-[#8A9390] px-2 py-0.5 rounded-full">Estacionamento</span>}
                    {u.accessibility && <span className="text-[10px] bg-[#F7F6F6] text-[#8A9390] px-2 py-0.5 rounded-full">Acessível</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Date */}
        {step === 4 && (
          <div>
            <BackButton onClick={() => setStep(3)} className="mb-6" />
            <h2 className="text-lg font-semibold text-[#000F11] mb-2">Escolha a data</h2>
            <p className="text-sm text-[#8A9390] mb-5">Selecione uma data disponível para sua consulta.</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
              {availableDates.map((d, i) => {
                const isSelected = selectedDate?.toDateString() === d.toDateString()
                const isToday = d.toDateString() === new Date().toDateString()
                const isWeekend = d.getDay() === 6
                return (
                  <button
                    key={i}
                    onClick={() => { setSelectedDate(d); setStep(5) }}
                    className={`rounded-2xl border p-3 text-center transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50 ${
                      isSelected ? 'bg-[#03624C] border-[#03624C] text-white' :
                      isToday ? 'bg-[#2CC295]/10 border-[#2CC295] ring-2 ring-[#2CC295]/20' :
                      isWeekend ? 'bg-amber-50 border-amber-100 hover:border-amber-300' :
                      'bg-white border-[#E8EDE9] hover:border-[#2CC295]/40'
                    }`}
                  >
                    {isToday && (
                      <span className="mb-1 inline-flex rounded-full bg-[#2CC295] px-2 py-0.5 text-[9px] font-bold uppercase text-[#000F11]">
                        Hoje
                      </span>
                    )}
                    <p className={`text-[10px] font-medium mb-1 ${isSelected ? 'text-white/70' : 'text-[#8A9390]'}`}>
                      {DAYS[d.getDay()]}
                    </p>
                    <p className={`text-base font-bold ${isSelected ? 'text-white' : 'text-[#000F11]'}`}>
                      {d.getDate()}
                    </p>
                    <p className={`text-[10px] ${isSelected ? 'text-white/70' : 'text-[#8A9390]'}`}>
                      {MONTHS[d.getMonth()]}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 5: Time */}
        {step === 5 && (
          <div>
            <BackButton onClick={() => setStep(4)} className="mb-6" />
            <h2 className="text-lg font-semibold text-[#000F11] mb-2">Escolha o horário</h2>
            <p className="text-sm text-[#8A9390] mb-5">
              Horários disponíveis para {selectedDate?.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {(doctor?.timeSlots ?? ['08:00','08:30','09:00','09:30','10:00','10:30','14:00','14:30']).map((t: string) => (
                <button
                  key={t}
                  onClick={() => { setSelectedTime(t); setStep(6) }}
                  className={`rounded-2xl border p-4 text-center text-sm font-semibold transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50 ${
                    selectedTime === t ? 'bg-[#03624C] border-[#03624C] text-white' : 'bg-white border-[#E8EDE9] text-[#000F11] hover:border-[#2CC295]/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Confirm */}
        {step === 6 && (
          <div className="max-w-lg mx-auto">
            <BackButton onClick={() => setStep(5)} className="mb-6" />
            <h2 className="text-lg font-semibold text-[#000F11] mb-2">Confirmar agendamento</h2>
            <p className="text-sm text-[#8A9390] mb-5">Revise os detalhes antes de confirmar.</p>

            <div className="bg-white rounded-2xl border border-[#E8EDE9] p-4 sm:p-6 space-y-4 mb-6">
              <div className="flex items-center gap-4 pb-4 border-b border-[#F7F6F6]">
                {doctor && <DoctorAvatar doctor={doctor} />}
                <div>
                  <p className="font-bold text-[#000F11]">{doctor?.name}</p>
                  <p className="text-sm text-[#2CC295]">{specialty?.name}</p>
                  <p className="text-xs text-[#8A9390]">{doctor?.crm}</p>
                </div>
              </div>
              {[
                { icon: MapPin, label: 'Unidade', value: `${unit?.name} — ${unit?.address}` },
                { icon: Calendar, label: 'Data', value: selectedDate?.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }) },
                { icon: Clock, label: 'Horário', value: selectedTime },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F7F6F6] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#03624C]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#8A9390] font-medium uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-semibold text-[#000F11]">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#2CC295]/5 border border-[#2CC295]/20 rounded-xl p-4 mb-6 text-sm text-[#03624C]">
              Você receberá uma confirmação por e-mail e SMS com os detalhes da consulta.
            </div>

            <Button className="w-full" size="lg" onClick={confirmAppointment}>
              <CheckCircle2 className="w-5 h-5" /> Confirmar Agendamento
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  )
}

export default function AgendarPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center text-[#8A9390]">Carregando...</div>}>
      <BookingContent />
    </Suspense>
  )
}
