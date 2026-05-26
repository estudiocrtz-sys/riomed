'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { specialties } from '@/data/specialties'
import { doctors, getDoctorsBySpecialty } from '@/data/doctors'
import { Search, Star, Calendar, ChevronRight } from 'lucide-react'

export default function EspecialidadesPage() {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = specialties.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppShell>
      <Header title="Especialidades" subtitle="Todas as áreas médicas disponíveis na RIOMed" />
      <div className="flex-1 p-8 space-y-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9390]" />
          <input
            type="text"
            placeholder="Buscar especialidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full pl-9 pr-4 rounded-xl bg-white border border-[#D0DDD6] text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30 focus:border-[#2CC295]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filtered.map((s) => {
            const specDoctors = getDoctorsBySpecialty(s.id)
            const isExpanded = expanded === s.id
            return (
              <div key={s.id} className="bg-white rounded-2xl border border-[#E8EDE9] overflow-hidden hover:shadow-md transition-shadow">
                <button
                  className="w-full p-5 text-left"
                  onClick={() => setExpanded(isExpanded ? null : s.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{s.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-base font-bold text-[#000F11]">{s.name}</p>
                        <ChevronRight className={`w-4 h-4 text-[#8A9390] transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                      <p className="text-sm text-[#8A9390] mt-1">{s.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-[#2CC295] font-semibold bg-[#2CC295]/10 px-2.5 py-1 rounded-full">
                          {s.doctorCount} médicos
                        </span>
                        <span className="text-xs text-[#8A9390]">Espera ≈ {s.avgWaitDays} dias</span>
                      </div>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-[#F7F6F6] px-5 pb-5 pt-4 space-y-3">
                    <p className="text-xs font-semibold text-[#8A9390] uppercase tracking-wider">Médicos disponíveis</p>
                    {specDoctors.length === 0 ? (
                      <p className="text-xs text-[#8A9390]">Nenhum médico cadastrado nessa especialidade.</p>
                    ) : specDoctors.map((d) => (
                      <div key={d.id} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2CC295]/60 to-[#03624C] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {d.name.replace(/^Dr[a]?\. /, '').split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#000F11] truncate">{d.name}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-[10px] text-[#8A9390]">{d.rating}</span>
                          </div>
                        </div>
                        <Link href={`/agendar?doctor=${d.id}`}>
                          <Button size="sm" variant="outline">Agendar</Button>
                        </Link>
                      </div>
                    ))}
                    <Link href={`/agendar?specialty=${s.id}`} className="block mt-2">
                      <Button className="w-full" size="sm">
                        <Calendar className="w-3.5 h-3.5" /> Agendar em {s.name}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
