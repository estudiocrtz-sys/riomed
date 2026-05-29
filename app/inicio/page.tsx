'use client'

import Link from 'next/link'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { DoctorAvatar } from '@/components/ui/DoctorAvatar'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer } from '@/components/motion/StaggerContainer'
import { StaggerItem } from '@/components/motion/StaggerItem'
import { AnimatedCard } from '@/components/motion/AnimatedCard'
import { currentPatient } from '@/data/patient'
import { myAppointments } from '@/data/appointments'
import { specialties } from '@/data/specialties'
import { doctors } from '@/data/doctors'
import { units } from '@/data/units'
import { notifications } from '@/data/notifications'
import { formatDate } from '@/lib/utils'
import { specialtyIconMap } from '@/lib/specialty-icons'
import { STORAGE_KEYS, usePersistentState } from '@/lib/local-storage'
import {
  CalendarPlus, Calendar, ArrowRight, MapPin,
  Star, Clock, Shield,
} from 'lucide-react'

export default function InicioPage() {
  const [appointments] = usePersistentState(STORAGE_KEYS.appointments, myAppointments)
  const [storedNotifications] = usePersistentState(STORAGE_KEYS.notifications, notifications)
  const [patient] = usePersistentState(STORAGE_KEYS.patient, currentPatient)
  const upcoming = appointments
    .filter((a) => ['agendada', 'confirmada'].includes(a.status))
    .sort((a, b) => a.date.localeCompare(b.date))
  const nextAppointment = upcoming[0]
  const unread = storedNotifications.filter((n) => !n.read)

  return (
    <AppShell>
      <Header title="Início" subtitle="Bem-vindo(a) ao seu portal de saúde" />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">

        {/* Welcome hero */}
        <FadeIn>
          <div className="bg-gradient-to-br from-[#023221] to-[#000F11] rounded-2xl p-5 sm:p-7 flex items-center justify-between relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #2CC295 0%, transparent 60%)' }}
            />
            <div className="relative z-10">
              <p className="text-[#2CC295] text-sm font-medium mb-1">Olá, {patient.name.split(' ')[0]} 👋</p>
              <h2 className="text-white text-xl sm:text-2xl font-bold mb-1">Como você está hoje?</h2>
              <p className="text-white/60 text-sm max-w-md">
                Sua saúde é nossa prioridade. Agende sua consulta, veja seus exames ou acompanhe seus médicos.
              </p>
              <div className="flex flex-col gap-3 mt-5 sm:flex-row sm:items-center">
                <Link href="/agendar">
                  <Button className="w-full gap-2 sm:w-auto"><CalendarPlus className="w-4 h-4" /> Agendar Consulta</Button>
                </Link>
                <Link href="/minhas-consultas">
                  <Button variant="ghost" className="w-full !text-white hover:!text-white hover:bg-white/10 gap-2 sm:w-auto">
                    <Calendar className="w-4 h-4" /> Minhas Consultas
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden xl:flex items-center gap-3 relative z-10">
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Convênio', value: patient.insurance, icon: Shield },
                  { label: 'Paciente desde', value: patient.patientSince, icon: Calendar },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2.5">
                    <Icon className="w-4 h-4 text-[#2CC295]" />
                    <div>
                      <p className="text-white/50 text-[10px]">{label}</p>
                      <p className="text-white text-xs font-semibold">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Next appointment + Notifications */}
        <div className="grid gap-4 xl:grid-cols-3">
          {/* Next appointment */}
          <FadeIn className="xl:col-span-2" delay={0.06}>
            {nextAppointment ? (
              <div className="bg-white rounded-2xl border border-[#E8EDE9] p-5 h-full">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h3 className="text-sm font-semibold text-[#000F11]">Próxima Consulta</h3>
                  <Link href="/minhas-consultas" className="flex items-center gap-1 text-xs text-[#03624C] font-medium hover:text-[#2CC295]">
                    Ver todas <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-[#F7F6F6] to-[#E8EDE9]/50 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 md:flex-row md:items-start md:gap-5">
                  <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-[#2CC295]/10 border border-[#2CC295]/20">
                    <span className="text-xl font-bold text-[#03624C] leading-none">
                      {new Date(nextAppointment.date + 'T00:00:00').getDate()}
                    </span>
                    <span className="text-[10px] text-[#8A9390] font-medium uppercase mt-0.5">
                      {new Date(nextAppointment.date + 'T00:00:00').toLocaleDateString('pt-BR', { month: 'short' })}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="text-base font-bold text-[#000F11]">{nextAppointment.doctorName}</p>
                      <StatusBadge status={nextAppointment.status} />
                    </div>
                    <p className="text-sm text-[#2CC295] font-medium">{nextAppointment.specialty}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#8A9390]">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {nextAppointment.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {nextAppointment.unitName}</span>
                    </div>
                    {nextAppointment.notes && (
                      <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1.5 mt-3">
                        {nextAppointment.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 md:flex-col md:flex-shrink-0">
                    <Button variant="outline" size="sm">Remarcar</Button>
                    <Button variant="ghost" size="sm" className="text-[#8A9390]">Cancelar</Button>
                  </div>
                </div>

                {upcoming.length > 1 && (
                  <div className="mt-3 space-y-2">
                    {upcoming.slice(1).map((apt) => (
                      <div key={apt.id} className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F7F6F6] transition-colors sm:items-center">
                        <div className="w-8 h-8 rounded-xl bg-[#F7F6F6] border border-[#E8EDE9] flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-[#8A9390]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#000F11] truncate">{apt.doctorName}</p>
                          <p className="text-xs text-[#8A9390]">{formatDate(apt.date)} · {apt.time} · {apt.unitName}</p>
                        </div>
                        <StatusBadge status={apt.status} className="hidden sm:inline-flex" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E8EDE9] p-8 text-center">
                <p className="text-sm text-[#8A9390] mb-3">Você não tem consultas agendadas.</p>
                <Link href="/agendar"><Button><CalendarPlus className="w-4 h-4" /> Agendar agora</Button></Link>
              </div>
            )}
          </FadeIn>

          {/* Notifications */}
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl border border-[#E8EDE9] p-5 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[#000F11]">Notificações</h3>
                <Link href="/notificacoes" className="text-xs text-[#03624C] font-medium hover:text-[#2CC295]">Ver todas</Link>
              </div>
              <div className="space-y-2">
                {unread.slice(0, 3).map((n) => {
                  return (
                    <Link key={n.id} href={n.link ?? '/notificacoes'}>
                      <div className="flex items-start gap-2.5 p-3 rounded-xl hover:bg-[#F7F6F6] cursor-pointer transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.read ? 'bg-[#D0DDD6]' : 'bg-[#2CC295]'}`} />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[#000F11] leading-tight">{n.title}</p>
                          <p className="text-[10px] text-[#8A9390] mt-0.5 line-clamp-2">{n.message}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Specialties */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[#000F11]">Especialidades disponíveis</h3>
            <Link href="/especialidades" className="flex items-center gap-1 text-sm text-[#03624C] font-medium hover:text-[#2CC295]">
              Ver todas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {specialties.slice(0, 5).map((s) => {
              const Icon = specialtyIconMap[s.iconName]
              return (
                <StaggerItem key={s.id}>
                  <Link href={`/agendar?specialty=${s.id}`}>
                    <AnimatedCard className="bg-white rounded-2xl border border-[#E8EDE9] p-4 cursor-pointer text-center">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-3"
                        style={{ backgroundColor: `${s.color}1a` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: s.color }} />
                      </div>
                      <p className="text-sm font-semibold text-[#000F11] leading-tight">{s.name}</p>
                      <p className="text-[10px] text-[#8A9390] mt-1">{s.doctorCount} médicos</p>
                      <p className="text-[10px] text-[#2CC295] font-medium mt-0.5">≈{s.avgWaitDays} dias</p>
                    </AnimatedCard>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>

        {/* Doctors + Units */}
        <div className="grid gap-6 xl:grid-cols-2">
          {/* Recommended doctors */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="text-base font-semibold text-[#000F11]">Médicos recomendados</h3>
              <Link href="/medicos" className="flex items-center gap-1 text-sm text-[#03624C] font-medium hover:text-[#2CC295]">
                Ver todos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <StaggerContainer className="space-y-3">
              {doctors.slice(0, 3).map((d) => (
                <StaggerItem key={d.id}>
                  <AnimatedCard className="bg-white rounded-2xl border border-[#E8EDE9] p-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <DoctorAvatar doctor={d} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#000F11]">{d.name}</p>
                      <p className="text-xs text-[#2CC295] font-medium">{d.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-[#8A9390]">{d.rating} ({d.reviewCount} avaliações)</span>
                      </div>
                    </div>
                    <Link href={`/agendar?doctor=${d.id}`} className="sm:flex-shrink-0">
                      <Button size="sm" variant="outline" className="w-full sm:w-auto">Agendar</Button>
                    </Link>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Units */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="text-base font-semibold text-[#000F11]">Nossas unidades</h3>
              <Link href="/unidades" className="flex items-center gap-1 text-sm text-[#03624C] font-medium hover:text-[#2CC295]">
                Ver todas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <StaggerContainer className="space-y-3">
              {units.slice(0, 3).map((u) => (
                <StaggerItem key={u.id}>
                  <AnimatedCard className="bg-white rounded-2xl border border-[#E8EDE9] p-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="w-11 h-11 rounded-2xl bg-[#F7F6F6] border border-[#E8EDE9] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#03624C]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#000F11]">{u.name}</p>
                      <p className="text-xs text-[#8A9390] truncate">{u.address}</p>
                      <p className="text-[10px] text-[#2CC295] font-medium mt-0.5">{u.hours.split('|')[0]}</p>
                    </div>
                    <Link href={`/agendar?unit=${u.id}`} className="sm:flex-shrink-0">
                      <Button size="sm" variant="outline" className="w-full sm:w-auto">Agendar</Button>
                    </Link>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

      </div>
    </AppShell>
  )
}
