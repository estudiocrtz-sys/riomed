export type AppointmentStatus = 'agendada' | 'confirmada' | 'em_atendimento' | 'concluida' | 'cancelada'
export type PatientStatus = 'ativo' | 'inativo' | 'aguardando'
export type DoctorStatus = 'ativo' | 'ausente' | 'em_atendimento'
export type DocumentCategory = 'receita' | 'exame' | 'atestado' | 'guia' | 'contrato' | 'anexo'
export type PaymentStatus = 'pago' | 'pendente' | 'atrasado' | 'reembolsado'
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export interface Patient {
  id: string
  name: string
  photo?: string
  birthDate: string
  cpf: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  cep: string
  insurance: string
  recordNumber: string
  status: PatientStatus
  bloodType: BloodType
  allergies: string[]
  chronicConditions: string[]
  medications: string[]
  notes: string
  doctorId: string
  registeredAt: string
  lastAppointment?: string
  nextAppointment?: string
  maritalStatus: string
  gender: string
}

export interface Doctor {
  id: string
  name: string
  photo?: string
  specialty: string
  crm: string
  phone: string
  email: string
  status: DoctorStatus
  patientsCount: number
  appointmentsThisMonth: number
  rating: number
  bio: string
  education: string[]
  workingHours: {
    day: string
    start: string
    end: string
  }[]
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  type: string
  status: AppointmentStatus
  insurance: string
  notes?: string
  symptoms?: string
}

export interface MedicalRecord {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  symptoms: string
  diagnosis: string
  treatment: string
  notes?: string
  documents: string[]
}

export interface Document {
  id: string
  name: string
  category: DocumentCategory
  patientId: string
  patientName: string
  uploadedAt: string
  size: string
  status: 'disponivel' | 'processando'
}

export interface FinanceRecord {
  id: string
  patientId: string
  patientName: string
  doctorName: string
  specialty: string
  date: string
  value: number
  type: 'convenio' | 'particular'
  insurance?: string
  status: PaymentStatus
  appointmentId: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  read: boolean
  createdAt: string
}
