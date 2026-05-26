export type AppointmentStatus = 'agendada' | 'confirmada' | 'concluida' | 'cancelada' | 'remarcada'

export interface Appointment {
  id: string
  doctorId: string
  doctorName: string
  specialty: string
  specialtyId: string
  unitId: string
  unitName: string
  date: string
  time: string
  type: string
  status: AppointmentStatus
  notes?: string
  symptoms?: string
  result?: string
}

export const myAppointments: Appointment[] = [
  {
    id: 'a1',
    doctorId: 'd4',
    doctorName: 'Dra. Beatriz Nunes',
    specialty: 'Clínica Geral',
    specialtyId: 's1',
    unitId: 'unit2',
    unitName: 'RIOMed Botafogo',
    date: '2024-06-10',
    time: '09:00',
    type: 'Retorno',
    status: 'confirmada',
    notes: 'Trazer exames de sangue solicitados na última consulta.',
  },
  {
    id: 'a2',
    doctorId: 'd1',
    doctorName: 'Dr. Rafael Moreira',
    specialty: 'Cardiologia',
    specialtyId: 's2',
    unitId: 'unit1',
    unitName: 'RIOMed Barra da Tijuca',
    date: '2024-06-20',
    time: '14:00',
    type: 'Primeira consulta',
    status: 'agendada',
  },
  {
    id: 'a3',
    doctorId: 'd4',
    doctorName: 'Dra. Beatriz Nunes',
    specialty: 'Clínica Geral',
    specialtyId: 's1',
    unitId: 'unit2',
    unitName: 'RIOMed Botafogo',
    date: '2024-04-05',
    time: '09:00',
    type: 'Retorno',
    status: 'concluida',
    notes: 'Controle glicêmico. HbA1c solicitada.',
    result: 'Ajuste de Sitagliptina 100mg à Metformina. Retorno em 30 dias.',
  },
  {
    id: 'a4',
    doctorId: 'd6',
    doctorName: 'Dra. Camila Torres',
    specialty: 'Ginecologia',
    specialtyId: 's4',
    unitId: 'unit2',
    unitName: 'RIOMed Botafogo',
    date: '2024-03-15',
    time: '10:00',
    type: 'Consulta de rotina',
    status: 'concluida',
    result: 'Exames de rotina normais. Retorno anual recomendado.',
  },
  {
    id: 'a5',
    doctorId: 'd4',
    doctorName: 'Dra. Beatriz Nunes',
    specialty: 'Clínica Geral',
    specialtyId: 's1',
    unitId: 'unit2',
    unitName: 'RIOMed Botafogo',
    date: '2024-02-20',
    time: '08:00',
    type: 'Consulta',
    status: 'concluida',
    result: 'Hipotireoidismo em controle. Levotiroxina mantida.',
  },
  {
    id: 'a6',
    doctorId: 'd2',
    doctorName: 'Dra. Helena Duarte',
    specialty: 'Dermatologia',
    specialtyId: 's3',
    unitId: 'unit1',
    unitName: 'RIOMed Barra da Tijuca',
    date: '2024-05-08',
    time: '15:00',
    type: 'Consulta',
    status: 'cancelada',
    notes: 'Cancelada pela paciente por motivo pessoal.',
  },
  {
    id: 'a7',
    doctorId: 'd4',
    doctorName: 'Dra. Beatriz Nunes',
    specialty: 'Clínica Geral',
    specialtyId: 's1',
    unitId: 'unit5',
    unitName: 'RIOMed Copacabana',
    date: '2024-07-08',
    time: '07:30',
    type: 'Retorno',
    status: 'agendada',
  },
]

export function getUpcomingAppointments() {
  return myAppointments.filter((a) =>
    ['agendada', 'confirmada'].includes(a.status)
  ).sort((a, b) => a.date.localeCompare(b.date))
}

export function getPastAppointments() {
  return myAppointments.filter((a) =>
    ['concluida', 'cancelada', 'remarcada'].includes(a.status)
  ).sort((a, b) => b.date.localeCompare(a.date))
}
