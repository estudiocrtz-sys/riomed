export type NotificationType = 'confirmacao' | 'lembrete' | 'exame' | 'retorno' | 'cancelamento' | 'aviso'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  date: string
  read: boolean
  link?: string
}

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'confirmacao',
    title: 'Consulta confirmada',
    message: 'Sua consulta com Dra. Beatriz Nunes em 10/06 às 09:00 na RIOMed Botafogo está confirmada.',
    date: '2024-05-26T10:30:00',
    read: false,
    link: '/minhas-consultas',
  },
  {
    id: 'n2',
    type: 'exame',
    title: 'Resultado disponível',
    message: 'Seu resultado de HbA1c já está disponível para download na área de Exames e Documentos.',
    date: '2024-05-25T08:00:00',
    read: false,
    link: '/exames',
  },
  {
    id: 'n3',
    type: 'exame',
    title: 'Novo exame disponível',
    message: 'O resultado do seu Hemograma Completo foi liberado. Acesse Exames e Documentos.',
    date: '2024-05-24T14:00:00',
    read: false,
    link: '/exames',
  },
  {
    id: 'n4',
    type: 'retorno',
    title: 'Retorno recomendado',
    message: 'Dra. Beatriz Nunes recomenda retorno em 30 dias para avaliar o controle glicêmico. Agende sua consulta.',
    date: '2024-05-10T09:00:00',
    read: true,
    link: '/agendar',
  },
  {
    id: 'n5',
    type: 'lembrete',
    title: 'Lembrete de consulta',
    message: 'Lembrete: você tem consulta com Dr. Rafael Moreira em 20/06 às 14:00 na RIOMed Barra da Tijuca.',
    date: '2024-05-20T07:00:00',
    read: true,
    link: '/minhas-consultas',
  },
  {
    id: 'n6',
    type: 'aviso',
    title: 'Guia médica disponível',
    message: 'Sua guia de encaminhamento para Cardiologia foi emitida e está disponível para download.',
    date: '2024-05-20T11:00:00',
    read: true,
    link: '/exames',
  },
  {
    id: 'n7',
    type: 'cancelamento',
    title: 'Consulta cancelada',
    message: 'Sua consulta com Dra. Helena Duarte em 08/05 foi cancelada. Deseja reagendar?',
    date: '2024-05-07T16:00:00',
    read: true,
    link: '/agendar',
  },
]
