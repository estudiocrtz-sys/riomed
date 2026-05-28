export type SpecialtyIconName =
  | 'Stethoscope'
  | 'HeartPulse'
  | 'Sparkles'
  | 'Cross'
  | 'Bone'
  | 'Baby'
  | 'Brain'
  | 'Activity'
  | 'Eye'
  | 'Droplets'

export interface Specialty {
  id: string
  name: string
  description: string
  iconName: SpecialtyIconName
  doctorCount: number
  avgWaitDays: number
  color: string
}

export const specialties: Specialty[] = [
  {
    id: 's1',
    name: 'Clínica Geral',
    description: 'Atendimento primário, check-ups e acompanhamento geral de saúde.',
    iconName: 'Stethoscope',
    doctorCount: 4,
    avgWaitDays: 2,
    color: '#2CC295',
  },
  {
    id: 's2',
    name: 'Cardiologia',
    description: 'Diagnóstico e tratamento de doenças do coração e vasos sanguíneos.',
    iconName: 'HeartPulse',
    doctorCount: 2,
    avgWaitDays: 5,
    color: '#ef4444',
  },
  {
    id: 's3',
    name: 'Dermatologia',
    description: 'Cuidados com a pele, cabelos, unhas e tratamentos estéticos dermatológicos.',
    iconName: 'Sparkles',
    doctorCount: 2,
    avgWaitDays: 4,
    color: '#84cc16',
  },
  {
    id: 's4',
    name: 'Ginecologia',
    description: 'Saúde da mulher, pré-natal, climatério e saúde reprodutiva.',
    iconName: 'Cross',
    doctorCount: 2,
    avgWaitDays: 3,
    color: '#ec4899',
  },
  {
    id: 's5',
    name: 'Ortopedia',
    description: 'Tratamento de ossos, articulações, músculos e medicina esportiva.',
    iconName: 'Bone',
    doctorCount: 2,
    avgWaitDays: 6,
    color: '#f59e0b',
  },
  {
    id: 's6',
    name: 'Pediatria',
    description: 'Saúde e desenvolvimento de crianças e adolescentes.',
    iconName: 'Baby',
    doctorCount: 2,
    avgWaitDays: 2,
    color: '#3b82f6',
  },
  {
    id: 's7',
    name: 'Neurologia',
    description: 'Diagnóstico de doenças do sistema nervoso central e periférico.',
    iconName: 'Brain',
    doctorCount: 1,
    avgWaitDays: 8,
    color: '#8b5cf6',
  },
  {
    id: 's8',
    name: 'Endocrinologia',
    description: 'Tratamento de diabetes, tireoide, hormônios e metabolismo.',
    iconName: 'Activity',
    doctorCount: 1,
    avgWaitDays: 7,
    color: '#06b6d4',
  },
  {
    id: 's9',
    name: 'Oftalmologia',
    description: 'Exames e tratamentos de doenças dos olhos e da visão.',
    iconName: 'Eye',
    doctorCount: 1,
    avgWaitDays: 5,
    color: '#0ea5e9',
  },
  {
    id: 's10',
    name: 'Urologia',
    description: 'Tratamento do sistema urinário e saúde masculina.',
    iconName: 'Droplets',
    doctorCount: 1,
    avgWaitDays: 6,
    color: '#14b8a6',
  },
]

export function getSpecialtyById(id: string) {
  return specialties.find((s) => s.id === id)
}
