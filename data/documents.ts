export type DocCategory = 'exame' | 'receita' | 'atestado' | 'guia' | 'laudo'

export interface PatientDocument {
  id: string
  name: string
  category: DocCategory
  doctor: string
  date: string
  size: string
  appointmentId?: string
  isNew?: boolean
}

export const myDocuments: PatientDocument[] = [
  {
    id: 'doc1',
    name: 'Hemograma_Completo_Maio2024.pdf',
    category: 'exame',
    doctor: 'Dra. Beatriz Nunes',
    date: '2024-05-10',
    size: '312 KB',
    appointmentId: 'a3',
    isNew: true,
  },
  {
    id: 'doc2',
    name: 'HbA1c_Resultado_Abril2024.pdf',
    category: 'exame',
    doctor: 'Dra. Beatriz Nunes',
    date: '2024-04-08',
    size: '198 KB',
    appointmentId: 'a3',
    isNew: true,
  },
  {
    id: 'doc3',
    name: 'Receita_Metformina_Sitagliptina.pdf',
    category: 'receita',
    doctor: 'Dra. Beatriz Nunes',
    date: '2024-04-05',
    size: '124 KB',
    appointmentId: 'a3',
  },
  {
    id: 'doc4',
    name: 'Receita_Levotiroxina_50mcg.pdf',
    category: 'receita',
    doctor: 'Dra. Beatriz Nunes',
    date: '2024-02-20',
    size: '108 KB',
    appointmentId: 'a5',
  },
  {
    id: 'doc5',
    name: 'Ultrassom_Tireoide.pdf',
    category: 'laudo',
    doctor: 'Dra. Beatriz Nunes',
    date: '2024-01-15',
    size: '2.1 MB',
  },
  {
    id: 'doc6',
    name: 'Papanicolau_Resultado_Marco2024.pdf',
    category: 'exame',
    doctor: 'Dra. Camila Torres',
    date: '2024-03-18',
    size: '445 KB',
    appointmentId: 'a4',
  },
  {
    id: 'doc7',
    name: 'Atestado_Medico_Fevereiro.pdf',
    category: 'atestado',
    doctor: 'Dra. Beatriz Nunes',
    date: '2024-02-20',
    size: '96 KB',
    appointmentId: 'a5',
  },
  {
    id: 'doc8',
    name: 'Guia_Cardiologia_Unimed.pdf',
    category: 'guia',
    doctor: 'Dra. Beatriz Nunes',
    date: '2024-05-20',
    size: '145 KB',
    appointmentId: 'a2',
    isNew: true,
  },
]
