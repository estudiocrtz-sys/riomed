'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { doctors } from '@/data/doctors'
import { specialties } from '@/data/specialties'
import { units } from '@/data/units'
import { Search, Star, Clock, MapPin, Calendar, X } from 'lucide-react'
import type { Doctor } from '@/data/doctors'

function DoctorModal({ doctor, onClose }: { doctor: Doctor; onClose: () => void }) {
  const doctorUnits = units.filter((u) => doctor.unitIds.includes(u.id))
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-[#E8EDE9] w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between p-6 border-b border-[#E8EDE9]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2CC295] to-[#03624C] flex items-center justify-center text-white text-lg font-bold">
              {doctor.name.replace(/^Dr[a]?\. /, '').split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#000F11]">{doctor.name}</h2>
              <p className="text-sm text-[#2CC295] font-medium">{doctor.specialty}</p>
              <p className="text-xs text-[#8A9390]">{doctor.crm}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-[#F7F6F6] text-[#8A9390]">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-1.5">
            {[1,2,3,4,5].map((i) => (
              <Star key={i} className={`w-4 h-4 ${i <= Math.round(doctor.rating) ? 'fill-amber-400 text-amber-400' : 'text-[#D0DDD6]'}`} />
            ))}
            <span className="text-sm font-semibold text-[#000F11] ml-1">{doctor.rating}</span>
            <span className="text-xs text-[#8A9390]">({doctor.reviewCount} avaliações)</span>
          </div>

          <p className="text-sm text-[#8A9390]">{doctor.bio}</p>

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
            <Button className="w-full" size="lg"><Calendar className="w-4 h-4" /> Agendar com {doctor.name.split(' ')[0]} {doctor.name.split(' ')[1]}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function MedicosPage() {
  const [search, setSearch] = useState('')
  const [specialtyFilter, setSpecialtyFilter] = useState('todos')
  const [selected, setSelected] = useState<Doctor | null>(null)

  const filtered = doctors.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
    const matchSpec = specialtyFilter === 'todos' || d.specialtyId === specialtyFilter
    return matchSearch && matchSpec
  })

  return (
    <AppShell>
      <Header title="Médicos" subtitle="Conheça nossa equipe de especialistas" />
      <div className="flex-1 p-8 space-y-6">
        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9390]" />
            <input
              type="text"
              placeholder="Buscar médico ou especialidade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full pl-9 pr-4 rounded-xl bg-white border border-[#D0DDD6] text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30 focus:border-[#2CC295]"
            />
          </div>
          <div className="flex items-center gap-1 bg-white border border-[#D0DDD6] rounded-xl p-1 flex-wrap">
            <button
              onClick={() => setSpecialtyFilter('todos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${specialtyFilter === 'todos' ? 'bg-[#03624C] text-white' : 'text-[#8A9390] hover:text-[#000F11]'}`}
            >
              Todos
            </button>
            {specialties.slice(0, 6).map((s) => (
              <button
                key={s.id}
                onClick={() => setSpecialtyFilter(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${specialtyFilter === s.id ? 'bg-[#03624C] text-white' : 'text-[#8A9390] hover:text-[#000F11]'}`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((d) => {
            const doctorUnits = units.filter((u) => d.unitIds.includes(u.id))
            return (
              <div key={d.id} className="bg-white rounded-2xl border border-[#E8EDE9] p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2CC295]/70 to-[#03624C] flex items-center justify-center text-white font-bold flex-shrink-0">
                    {d.name.replace(/^Dr[a]?\. /, '').split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#000F11] truncate">{d.name}</p>
                    <p className="text-xs text-[#2CC295] font-medium">{d.specialty}</p>
                    <p className="text-[10px] text-[#8A9390]">{d.crm}</p>
                  </div>
                </div>

                <p className="text-xs text-[#8A9390] mb-3 line-clamp-2">{d.bio}</p>

                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className={`w-3 h-3 ${i <= Math.round(d.rating) ? 'fill-amber-400 text-amber-400' : 'text-[#D0DDD6]'}`} />
                  ))}
                  <span className="text-xs font-semibold text-[#000F11] ml-1">{d.rating}</span>
                  <span className="text-[10px] text-[#8A9390]">({d.reviewCount})</span>
                </div>

                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#8A9390]">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{d.availableDays.join(' · ')}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-[10px] text-[#8A9390]">
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
              </div>
            )
          })}
        </div>
      </div>

      {selected && <DoctorModal doctor={selected} onClose={() => setSelected(null)} />}
    </AppShell>
  )
}
