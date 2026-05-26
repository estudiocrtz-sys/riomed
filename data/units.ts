export interface Unit {
  id: string
  name: string
  shortName: string
  address: string
  neighborhood: string
  city: string
  phone: string
  email: string
  hours: string
  hoursDetail: { day: string; time: string }[]
  specialties: string[]
  doctorIds: string[]
  coordinates: { lat: number; lng: number }
  parking: boolean
  accessibility: boolean
  photo?: string
}

export const units: Unit[] = [
  {
    id: 'unit1',
    name: 'RIOMed Barra da Tijuca',
    shortName: 'Barra da Tijuca',
    address: 'Av. das Américas, 500, Sala 1205',
    neighborhood: 'Barra da Tijuca',
    city: 'Rio de Janeiro — RJ',
    phone: '(21) 3040-8800',
    email: 'barra@riomed.com.br',
    hours: 'Seg–Sex: 07h–20h | Sáb: 08h–14h',
    hoursDetail: [
      { day: 'Segunda a Sexta', time: '07:00 – 20:00' },
      { day: 'Sábado', time: '08:00 – 14:00' },
      { day: 'Domingo', time: 'Fechado' },
    ],
    specialties: ['Cardiologia', 'Dermatologia', 'Clínica Geral', 'Ortopedia', 'Ginecologia'],
    doctorIds: ['d1', 'd2', 'd4', 'd5'],
    coordinates: { lat: -23.0054, lng: -43.3672 },
    parking: true,
    accessibility: true,
  },
  {
    id: 'unit2',
    name: 'RIOMed Botafogo',
    shortName: 'Botafogo',
    address: 'Rua Voluntários da Pátria, 190, Sala 301',
    neighborhood: 'Botafogo',
    city: 'Rio de Janeiro — RJ',
    phone: '(21) 3040-8810',
    email: 'botafogo@riomed.com.br',
    hours: 'Seg–Sex: 07h–19h | Sáb: 08h–12h',
    hoursDetail: [
      { day: 'Segunda a Sexta', time: '07:00 – 19:00' },
      { day: 'Sábado', time: '08:00 – 12:00' },
      { day: 'Domingo', time: 'Fechado' },
    ],
    specialties: ['Clínica Geral', 'Pediatria', 'Ginecologia', 'Endocrinologia'],
    doctorIds: ['d3', 'd4', 'd6'],
    coordinates: { lat: -22.9524, lng: -43.1841 },
    parking: false,
    accessibility: true,
  },
  {
    id: 'unit3',
    name: 'RIOMed Centro',
    shortName: 'Centro',
    address: 'Av. Rio Branco, 120, Conj. 801',
    neighborhood: 'Centro',
    city: 'Rio de Janeiro — RJ',
    phone: '(21) 3040-8820',
    email: 'centro@riomed.com.br',
    hours: 'Seg–Sex: 08h–18h',
    hoursDetail: [
      { day: 'Segunda a Sexta', time: '08:00 – 18:00' },
      { day: 'Sábado', time: 'Fechado' },
      { day: 'Domingo', time: 'Fechado' },
    ],
    specialties: ['Clínica Geral', 'Cardiologia', 'Neurologia', 'Urologia'],
    doctorIds: ['d1', 'd4'],
    coordinates: { lat: -22.9068, lng: -43.1729 },
    parking: false,
    accessibility: true,
  },
  {
    id: 'unit4',
    name: 'RIOMed Tijuca',
    shortName: 'Tijuca',
    address: 'Av. Maracanã, 987, Sala 502',
    neighborhood: 'Tijuca',
    city: 'Rio de Janeiro — RJ',
    phone: '(21) 3040-8830',
    email: 'tijuca@riomed.com.br',
    hours: 'Seg–Sex: 07h–20h | Sáb: 08h–13h',
    hoursDetail: [
      { day: 'Segunda a Sexta', time: '07:00 – 20:00' },
      { day: 'Sábado', time: '08:00 – 13:00' },
      { day: 'Domingo', time: 'Fechado' },
    ],
    specialties: ['Clínica Geral', 'Ortopedia', 'Dermatologia', 'Oftalmologia'],
    doctorIds: ['d2', 'd4', 'd5'],
    coordinates: { lat: -22.9206, lng: -43.2399 },
    parking: true,
    accessibility: true,
  },
  {
    id: 'unit5',
    name: 'RIOMed Copacabana',
    shortName: 'Copacabana',
    address: 'Av. Nossa Senhora de Copacabana, 1200, Sala 401',
    neighborhood: 'Copacabana',
    city: 'Rio de Janeiro — RJ',
    phone: '(21) 3040-8840',
    email: 'copacabana@riomed.com.br',
    hours: 'Seg–Sex: 07h–20h | Sáb: 07h–15h',
    hoursDetail: [
      { day: 'Segunda a Sexta', time: '07:00 – 20:00' },
      { day: 'Sábado', time: '07:00 – 15:00' },
      { day: 'Domingo', time: 'Fechado' },
    ],
    specialties: ['Clínica Geral', 'Cardiologia', 'Ginecologia', 'Pediatria', 'Dermatologia'],
    doctorIds: ['d1', 'd3', 'd4', 'd6'],
    coordinates: { lat: -22.9676, lng: -43.1840 },
    parking: false,
    accessibility: true,
  },
]

export function getUnitById(id: string) {
  return units.find((u) => u.id === id)
}
