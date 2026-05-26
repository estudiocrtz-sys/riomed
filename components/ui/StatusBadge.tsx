import { cn } from '@/lib/utils'
import type { AppointmentStatus, PatientStatus, DoctorStatus, PaymentStatus } from '@/types'

type Status = AppointmentStatus | PatientStatus | DoctorStatus | PaymentStatus | string

const statusConfig: Record<string, { label: string; className: string }> = {
  agendada: { label: 'Agendada', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  confirmada: { label: 'Confirmada', className: 'bg-[#2CC295]/10 text-[#03624C] border-[#2CC295]/20' },
  em_atendimento: { label: 'Em Atendimento', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  concluida: { label: 'Concluída', className: 'bg-[#2CC295]/10 text-[#03624C] border-[#2CC295]/20' },
  cancelada: { label: 'Cancelada', className: 'bg-red-50 text-red-600 border-red-200' },
  ativo: { label: 'Ativo', className: 'bg-[#2CC295]/10 text-[#03624C] border-[#2CC295]/20' },
  inativo: { label: 'Inativo', className: 'bg-[#8A9390]/10 text-[#8A9390] border-[#8A9390]/20' },
  aguardando: { label: 'Aguardando', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  ausente: { label: 'Ausente', className: 'bg-[#8A9390]/10 text-[#8A9390] border-[#8A9390]/20' },
  pago: { label: 'Pago', className: 'bg-[#2CC295]/10 text-[#03624C] border-[#2CC295]/20' },
  pendente: { label: 'Pendente', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  atrasado: { label: 'Atrasado', className: 'bg-red-50 text-red-600 border-red-200' },
  reembolsado: { label: 'Reembolsado', className: 'bg-purple-50 text-purple-700 border-purple-200' },
  disponivel: { label: 'Disponível', className: 'bg-[#2CC295]/10 text-[#03624C] border-[#2CC295]/20' },
  processando: { label: 'Processando', className: 'bg-amber-50 text-amber-700 border-amber-200' },
}

interface StatusBadgeProps {
  status: Status
  size?: 'sm' | 'md'
  className?: string
}

export function StatusBadge({ status, size = 'sm', className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { label: status, className: 'bg-gray-100 text-gray-600 border-gray-200' }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
