'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { DoctorAvatar } from '@/components/ui/DoctorAvatar'
import { StaggerContainer } from '@/components/motion/StaggerContainer'
import { StaggerItem } from '@/components/motion/StaggerItem'
import { AnimatedCard } from '@/components/motion/AnimatedCard'
import { doctors } from '@/data/doctors'
import { specialties } from '@/data/specialties'
import { units } from '@/data/units'
import { overlayVariants, modalVariants } from '@/lib/motion'
import { Search, Star, Clock, MapPin, Calendar, X, Building2, SlidersHorizontal } from 'lucide-react'
import type { Doctor } from '@/data/doctors'

const weekdayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

function getNextAvailability(doctor: Doctor) {
  const todayName = weekdayNames[new Date().getDay()]
  const firstSlot = doctor.timeSlots[0]

  if (doctor.availableDays.includes(todayName)) {
    return `Hoje, ${firstSlot}`
  }

  return `${doctor.availableDays[0]}, ${firstSlot}`
}

function DoctorModal({ doctor, onClose }: { doctor: Doctor | null; onClose: () => void }) {
  const doctorUnits = doctor ? units.filter((u) => doctor.unitIds.includes(u.id)) : []

  return (
    <AnimatePresence>
      {doctor && (
        <>
          {/* Backdrop */}
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            variants={modalVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl border border-[#E8EDE9] w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto pointer-events-auto">
              <div className="flex items-start justify-between p-6 border-b border-[#E8EDE9]">
                <div className="flex items-center gap-4">
                  <DoctorAvatar doctor={doctor} size="lg" />
                  <div>
                    <h2 className="text-lg font-bold text-[#000F11]">{doctor.name}</h2>
                    <p className="text-sm text-[#2CC295] font-medium">{doctor.specialty}</p>
                    <p className="text-xs text-[#8A9390]">{doctor.crm}</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-xl hover:bg-[#F7F6F6] text-[#8A9390] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-center gap-1.5">
                  {[1,2,3,4,5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i <= Math.round(doctor.rating) ? 'fill-amber-400 text-amber-400' : 'text-[#D0DDD6]'}`}
                    />
                  ))}
                  <span className="text-sm font-semibold text-[#000F11] ml-1">{doctor.rating}</span>
                  <span className="text-xs text-[#8A9390]">({doctor.reviewCount} avaliações)</span>
                </div>

                <p className="text-sm text-[#8A9390]">{doctor.bio}</p>

                <div className="rounded-2xl border border-[#2CC295]/20 bg-[#2CC295]/5 p-4">
                  <p className="text-xs font-semibold text-[#03624C] uppercase tracking-wide">Próximo horário</p>
                  <p className="mt-1 text-sm font-bold text-[#000F11]">{getNextAvailability(doctor)}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#8A9390] uppercase tracking-wider mb-2">Formação</p>
                  <div className="space-y-1.5">
                    {doctor.education.map((e) => (
                      <p key={e} className="text-sm text-[#000F11] flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#2CC295] mt-2 flex-shrink-0" />{e}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#8A9390] uppercase tracking-wider mb-2">Dias de atendimento</p>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availableDays.map((d) => (
                      <span key={d} className="px-3 py-1 bg-[#F7F6F6] border border-[#E8EDE9] rounded-full text-xs font-medium text-[#000F11]">{d}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#8A9390] uppercase tracking-wider mb-2">Unidades de atendimento</p>
                  <div className="space-y-2">
                    {doctorUnits.map((u) => (
                      <div key={u.id} className="flex items-center gap-2 text-sm text-[#8A9390]">
                        <MapPin className="w-4 h-4 text-[#2CC295] flex-shrink-0" />
                        <span>{u.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href={`/agendar?doctor=${doctor.id}`} className="block">
                  <Button className="w-full" size="lg">
                    <Calendar className="w-4 h-4" /> Agendar com {doctor.name.split(' ')[0]} {doctor.name.split(' ')[1]}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function MedicosPage() {
  const [search, setSearch] = useState('')
  const [specialtyFilter, setSpecialtyFilter] = useState('todos')
  const [unitFilter, setUnitFilter] = useState('todas')
  const [onlyToday, setOnlyToday] = useState(false)
  const [selected, setSelected] = useState<Doctor | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const todayName = weekdayNames[new Date().getDay()]
  const hasActiveFilters = search !== '' || specialtyFilter !== 'todos' || unitFilter !== 'todas' || onlyToday

  const filtered = doctors.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
    const matchSpec = specialtyFilter === 'todos' || d.specialtyId === specialtyFilter
    const matchUnit = unitFilter === 'todas' || d.unitIds.includes(unitFilter)
    const matchToday = !onlyToday || d.availableDays.includes(todayName)
    return matchSearch && matchSpec && matchUnit && matchToday
  })

  function clearFilters() {
    setSearch('')
    setSpecialtyFilter('todos')
    setUnitFilter('todas')
    setOnlyToday(false)
  }

  return (
    <AppShell>
      <Header title="Médicos" subtitle="Conheça nossa equipe de especialistas" />
      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">

        {/* Filters */}
        <div className="flex gap-2 lg:hidden">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9390]" />
            <input
              type="text"
              placeholder="Buscar médico..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-xl border border-[#D0DDD6] bg-white pl-9 pr-4 text-sm text-[#000F11] placeholder:text-[#8A9390] focus:border-[#2CC295] focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30"
            />
          </div>
          <button
            onClick={() => setFiltersOpen(true)}
            className="relative flex h-11 items-center gap-2 rounded-xl border border-[#D0DDD6] bg-white px-3 text-sm font-semibold text-[#000F11] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
            {hasActiveFilters && <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#2CC295]" />}
          </button>
        </div>

        <div className="hidden space-y-3 rounded-2xl border border-[#E8EDE9] bg-white p-3 shadow-sm shadow-[#000F11]/[0.02] lg:block">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative min-w-64 flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9390]" />
            <input
              type="text"
              placeholder="Buscar médico ou especialidade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full pl-9 pr-4 rounded-xl bg-white border border-[#D0DDD6] text-sm text-[#000F11] placeholder:text-[#8A9390] focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30 focus:border-[#2CC295]"
            />
          </div>
          <select
            value={unitFilter}
            onChange={(e) => setUnitFilter(e.target.value)}
            className="h-10 rounded-xl border border-[#D0DDD6] bg-white px-3 text-sm text-[#000F11] focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30 focus:border-[#2CC295] lg:w-56"
          >
            <option value="todas">Todas as unidades</option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>{unit.shortName}</option>
            ))}
          </select>
          <label className={`flex h-10 cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 text-sm font-semibold transition-colors lg:w-40 ${
            onlyToday ? 'border-[#2CC295]/40 bg-[#2CC295]/10 text-[#03624C]' : 'border-[#D0DDD6] bg-white text-[#5F6A67] hover:border-[#8A9390]'
          }`}>
            <input
              type="checkbox"
              checked={onlyToday}
              onChange={(e) => setOnlyToday(e.target.checked)}
              className="sr-only"
            />
            <span>Atende hoje</span>
            <span className={`relative h-5 w-9 rounded-full transition-colors ${onlyToday ? 'bg-[#2CC295]' : 'bg-[#D0DDD6]'}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${onlyToday ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </span>
          </label>
          </div>

          <div className="flex items-center gap-2 border-t border-[#F7F6F6] pt-3">
            <div className="hidden items-center gap-1.5 text-xs font-semibold text-[#8A9390] lg:flex">
              <Building2 className="h-3.5 w-3.5" />
              Especialidade
            </div>
            <div className="relative flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-xl bg-[#F7F6F6] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setSpecialtyFilter('todos')}
              className="relative z-10 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50"
              style={{ color: specialtyFilter === 'todos' ? 'white' : '#8A9390' }}
            >
              {specialtyFilter === 'todos' && (
                <motion.div
                  layoutId="specialty-filter-active-bg"
                  className="absolute inset-0 bg-[#03624C] rounded-lg shadow-sm"
                  transition={{ type: 'spring', stiffness: 500, damping: 38, mass: 0.8 }}
                />
              )}
              <span className="relative z-10">Todos</span>
            </button>
            {specialties.map((s) => (
              <button
                key={s.id}
                onClick={() => setSpecialtyFilter(s.id)}
                className="relative z-10 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50"
                style={{ color: specialtyFilter === s.id ? 'white' : '#8A9390' }}
              >
                {specialtyFilter === s.id && (
                  <motion.div
                    layoutId="specialty-filter-active-bg"
                    className="absolute inset-0 bg-[#03624C] rounded-lg shadow-sm"
                    transition={{ type: 'spring', stiffness: 500, damping: 38, mass: 0.8 }}
                  />
                )}
                <span className="relative z-10">{s.name}</span>
              </button>
            ))}
            </div>
          </div>
        </div>

        {/* Doctor cards */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Search />}
            title="Nenhum médico encontrado"
            description="Tente ajustar a busca, trocar a especialidade ou limpar os filtros para ver mais opções."
            action={<Button variant="outline" onClick={clearFilters}>Limpar filtros</Button>}
          />
        ) : (
          <StaggerContainer key={`${specialtyFilter}-${unitFilter}-${onlyToday}-${search}`} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((d) => {
              const doctorUnits = units.filter((u) => d.unitIds.includes(u.id))
              return (
                <StaggerItem key={d.id}>
                  <AnimatedCard className="bg-white rounded-2xl border border-[#E8EDE9] p-4 sm:p-5">
                    <div className="flex items-start gap-4 mb-3 sm:mb-4">
                      <DoctorAvatar doctor={d} />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#000F11] truncate">{d.name}</p>
                        <p className="text-xs text-[#2CC295] font-medium">{d.specialty}</p>
                        <p className="hidden text-[10px] text-[#8A9390] sm:block">{d.crm}</p>
                      </div>
                    </div>

                    <div className="mb-3 flex items-center justify-between gap-3 rounded-xl bg-[#F7F6F6] px-3 py-2">
                      <div>
                        <p className="text-[10px] font-medium uppercase text-[#8A9390]">Próximo horário</p>
                        <p className="text-xs font-bold text-[#000F11]">{getNextAvailability(d)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-semibold text-[#000F11]">{d.rating}</span>
                        <span className="text-[10px] text-[#8A9390]">({d.reviewCount})</span>
                      </div>
                    </div>

                    <p className="hidden text-xs text-[#5F6A67] mb-3 line-clamp-2 sm:block">{d.bio}</p>

                    <div className="mb-4 hidden space-y-1.5 sm:block">
                      <div className="flex items-center gap-1.5 text-[10px] text-[#5F6A67]">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{d.availableDays.join(' · ')}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-[10px] text-[#5F6A67]">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{doctorUnits.map(u => u.shortName).join(', ')}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelected(d)}>
                        Ver perfil
                      </Button>
                      <Link href={`/agendar?doctor=${d.id}`} className="flex-1">
                        <Button size="sm" className="w-full">Agendar</Button>
                      </Link>
                    </div>
                  </AnimatedCard>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        )}

      </div>

      <DoctorModal doctor={selected} onClose={() => setSelected(null)} />

      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              key="filters-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed inset-0 z-50 bg-black/25 backdrop-blur-sm lg:hidden"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              key="filters-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[82vh] overflow-y-auto rounded-t-3xl border border-[#E8EDE9] bg-white p-4 shadow-2xl lg:hidden"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#D0DDD6]" />
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-bold text-[#000F11]">Filtros</p>
                  <p className="text-xs text-[#8A9390]">Refine a busca por unidade e especialidade.</p>
                </div>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="rounded-xl p-2 text-[#8A9390] transition-colors hover:bg-[#F7F6F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8A9390]">Unidade</label>
                  <select
                    value={unitFilter}
                    onChange={(e) => setUnitFilter(e.target.value)}
                    className="h-11 w-full rounded-xl border border-[#D0DDD6] bg-white px-3 text-sm text-[#000F11] focus:border-[#2CC295] focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30"
                  >
                    <option value="todas">Todas as unidades</option>
                    {units.map((unit) => (
                      <option key={unit.id} value={unit.id}>{unit.shortName}</option>
                    ))}
                  </select>
                </div>

                <label className={`flex h-12 cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 text-sm font-semibold transition-colors ${
                  onlyToday ? 'border-[#2CC295]/40 bg-[#2CC295]/10 text-[#03624C]' : 'border-[#D0DDD6] bg-white text-[#5F6A67]'
                }`}>
                  <input
                    type="checkbox"
                    checked={onlyToday}
                    onChange={(e) => setOnlyToday(e.target.checked)}
                    className="sr-only"
                  />
                  <span>Atende hoje</span>
                  <span className={`relative h-5 w-9 rounded-full transition-colors ${onlyToday ? 'bg-[#2CC295]' : 'bg-[#D0DDD6]'}`}>
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${onlyToday ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </span>
                </label>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8A9390]">Especialidade</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ id: 'todos', name: 'Todos' }, ...specialties].map((s) => {
                      const active = specialtyFilter === s.id
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSpecialtyFilter(s.id)}
                          className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                            active ? 'border-[#03624C] bg-[#03624C] text-white' : 'border-[#D0DDD6] bg-white text-[#5F6A67]'
                          }`}
                        >
                          {s.name}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="sticky bottom-0 -mx-4 flex gap-2 border-t border-[#E8EDE9] bg-white p-4">
                  <Button variant="outline" className="flex-1" onClick={clearFilters}>Limpar</Button>
                  <Button className="flex-1" onClick={() => setFiltersOpen(false)}>Ver médicos</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AppShell>
  )
}
