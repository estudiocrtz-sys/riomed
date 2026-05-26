export interface Doctor {
  id: string
  name: string
  specialty: string
  specialtyId: string
  crm: string
  phone: string
  email: string
  bio: string
  education: string[]
  rating: number
  reviewCount: number
  unitIds: string[]
  availableDays: string[]
  timeSlots: string[]
}

export const doctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Rafael Moreira',
    specialty: 'Cardiologia',
    specialtyId: 's2',
    crm: 'CRM/RJ 52341',
    phone: '(21) 99882-0011',
    email: 'rafael.moreira@riomed.com.br',
    bio: 'Cardiologista com 18 anos de experiência, especialista em arritmias e insuficiência cardíaca.',
    education: ['Medicina — UFRJ', 'Residência Cardiologia — INC', 'Fellowship Eletrofisiologia — InCor/USP'],
    rating: 4.9,
    reviewCount: 312,
    unitIds: ['unit1', 'unit3', 'unit5'],
    availableDays: ['Segunda', 'Quarta', 'Sexta'],
    timeSlots: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '14:00', '14:30', '15:00'],
  },
  {
    id: 'd2',
    name: 'Dra. Helena Duarte',
    specialty: 'Dermatologia',
    specialtyId: 's3',
    crm: 'CRM/RJ 64892',
    phone: '(21) 99113-5544',
    email: 'helena.duarte@riomed.com.br',
    bio: 'Dermatologista com expertise em dermatologia clínica e estética, tratamento de doenças cutâneas.',
    education: ['Medicina — PUC-Rio', 'Residência Dermatologia — HUCFF'],
    rating: 4.8,
    reviewCount: 278,
    unitIds: ['unit1', 'unit4'],
    availableDays: ['Segunda', 'Terça', 'Quinta'],
    timeSlots: ['09:00', '09:30', '10:00', '10:30', '11:00', '15:00', '15:30', '16:00'],
  },
  {
    id: 'd3',
    name: 'Dr. André McCoy',
    specialty: 'Pediatria',
    specialtyId: 's6',
    crm: 'CRM/RJ 71234',
    phone: '(21) 98765-3322',
    email: 'andre.mccoy@riomed.com.br',
    bio: 'Pediatra com foco em neonatologia e desenvolvimento infantil, atendimento humanizado.',
    education: ['Medicina — UFF', 'Residência Pediatria — HIMGG', 'Especialização Neonatologia — IFF/Fiocruz'],
    rating: 4.9,
    reviewCount: 445,
    unitIds: ['unit2', 'unit5'],
    availableDays: ['Terça', 'Quarta', 'Quinta', 'Sexta'],
    timeSlots: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'],
  },
  {
    id: 'd4',
    name: 'Dra. Beatriz Nunes',
    specialty: 'Clínica Geral',
    specialtyId: 's1',
    crm: 'CRM/RJ 58901',
    phone: '(21) 97654-2211',
    email: 'beatriz.nunes@riomed.com.br',
    bio: 'Clínica geral com abordagem preventiva e de atenção primária à saúde, acompanhamento longitudinal.',
    education: ['Medicina — UERJ', 'Residência Medicina de Família — SMS/RJ'],
    rating: 4.7,
    reviewCount: 521,
    unitIds: ['unit1', 'unit2', 'unit3', 'unit4', 'unit5'],
    availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    timeSlots: ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30'],
  },
  {
    id: 'd5',
    name: 'Dr. Victor Azevedo',
    specialty: 'Ortopedia',
    specialtyId: 's5',
    crm: 'CRM/RJ 66745',
    phone: '(21) 96543-8899',
    email: 'victor.azevedo@riomed.com.br',
    bio: 'Ortopedista especializado em joelho e ombro, cirurgia artroscópica e medicina esportiva.',
    education: ['Medicina — UFRJ', 'Residência Ortopedia — HMSA', 'Fellowship Cirurgia do Joelho — HC/USP'],
    rating: 4.6,
    reviewCount: 198,
    unitIds: ['unit1', 'unit4'],
    availableDays: ['Segunda', 'Quarta', 'Sexta'],
    timeSlots: ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30'],
  },
  {
    id: 'd6',
    name: 'Dra. Camila Torres',
    specialty: 'Ginecologia',
    specialtyId: 's4',
    crm: 'CRM/RJ 73456',
    phone: '(21) 95432-7788',
    email: 'camila.torres@riomed.com.br',
    bio: 'Ginecologista e obstetra com ênfase em saúde da mulher, climatério e reprodução assistida.',
    education: ['Medicina — UVA/RJ', 'Residência Ginecologia e Obstetrícia — Maternidade Escola/UFRJ'],
    rating: 4.8,
    reviewCount: 362,
    unitIds: ['unit2', 'unit5'],
    availableDays: ['Terça', 'Quinta', 'Sábado'],
    timeSlots: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'],
  },
]

export function getDoctorById(id: string) {
  return doctors.find((d) => d.id === id)
}

export function getDoctorsBySpecialty(specialtyId: string) {
  return doctors.filter((d) => d.specialtyId === specialtyId)
}

export function getDoctorsByUnit(unitId: string) {
  return doctors.filter((d) => d.unitIds.includes(unitId))
}
