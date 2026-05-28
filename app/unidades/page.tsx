'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { StaggerContainer } from '@/components/motion/StaggerContainer'
import { StaggerItem } from '@/components/motion/StaggerItem'
import { units } from '@/data/units'
import { getDoctorsByUnit } from '@/data/doctors'
import { MapPin, Phone, Mail, Calendar, ChevronDown, ParkingCircle, Accessibility } from 'lucide-react'
import { EASE_PREMIUM } from '@/lib/motion'

export default function UnidadesPage() {
  const [expanded, setExpanded] = useState<string | null>('unit1')

  return (
    <AppShell>
      <Header title="Unidades" subtitle="Encontre a unidade RIOMed mais próxima de você" />
      <div className="flex-1 p-8">
        <StaggerContainer className="space-y-4">
          {units.map((u) => {
            const unitDoctors = getDoctorsByUnit(u.id)
            const isExpanded = expanded === u.id

            return (
              <StaggerItem key={u.id}>
                <div className="bg-white rounded-2xl border border-[#E8EDE9] overflow-hidden">

                  {/* Header row */}
                  <button
                    className="w-full flex items-start gap-5 p-6 text-left hover:bg-[#F7F6F6] transition-colors"
                    onClick={() => setExpanded(isExpanded ? null : u.id)}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#F7F6F6] border border-[#E8EDE9] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#03624C]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="text-base font-bold text-[#000F11]">{u.name}</p>
                        <div className="flex items-center gap-1.5">
                          {u.parking && (
                            <span className="flex items-center gap-1 text-[10px] bg-[#F7F6F6] text-[#8A9390] px-2 py-0.5 rounded-full border border-[#E8EDE9]">
                              <ParkingCircle className="w-3 h-3" /> Estacionamento
                            </span>
                          )}
                          {u.accessibility && (
                            <span className="flex items-center gap-1 text-[10px] bg-[#F7F6F6] text-[#8A9390] px-2 py-0.5 rounded-full border border-[#E8EDE9]">
                              <Accessibility className="w-3 h-3" /> Acessível
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-[#8A9390]">{u.address} · {u.neighborhood}</p>
                      <p className="text-xs text-[#2CC295] font-medium mt-1">{u.hours.split('|')[0]}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Link href={`/agendar?unit=${u.id}`} onClick={(e) => e.stopPropagation()}>
                        <Button size="sm"><Calendar className="w-3.5 h-3.5" /> Agendar</Button>
                      </Link>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.22, ease: EASE_PREMIUM }}
                      >
                        <ChevronDown className="w-4 h-4 text-[#8A9390]" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Expandable content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: EASE_PREMIUM }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#F7F6F6] p-6 grid grid-cols-3 gap-6">
                          {/* Contact & Hours */}
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs font-semibold text-[#8A9390] uppercase tracking-wider mb-2">Contato</p>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-[#000F11]">
                                  <Phone className="w-4 h-4 text-[#2CC295]" />{u.phone}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#000F11]">
                                  <Mail className="w-4 h-4 text-[#2CC295]" />{u.email}
                                </div>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-[#8A9390] uppercase tracking-wider mb-2">Horários</p>
                              <div className="space-y-1.5">
                                {u.hoursDetail.map((h) => (
                                  <div key={h.day} className="flex items-center justify-between text-sm">
                                    <span className="text-[#000F11] font-medium">{h.day}</span>
                                    <span className={h.time === 'Fechado' ? 'text-red-500' : 'text-[#8A9390]'}>{h.time}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Specialties */}
                          <div>
                            <p className="text-xs font-semibold text-[#8A9390] uppercase tracking-wider mb-3">Especialidades</p>
                            <div className="flex flex-wrap gap-2">
                              {u.specialties.map((s) => (
                                <span key={s} className="text-xs bg-[#2CC295]/10 text-[#03624C] px-2.5 py-1 rounded-full font-medium">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Doctors */}
                          <div>
                            <p className="text-xs font-semibold text-[#8A9390] uppercase tracking-wider mb-3">Médicos nesta unidade</p>
                            <div className="space-y-2">
                              {unitDoctors.map((d) => (
                                <div key={d.id} className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2CC295]/60 to-[#03624C] flex items-center justify-center text-white text-xs font-bold">
                                    {d.name.replace(/^Dr[a]?\. /, '').split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-medium text-[#000F11] truncate">{d.name}</p>
                                    <p className="text-[10px] text-[#2CC295]">{d.specialty}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </AppShell>
  )
}
