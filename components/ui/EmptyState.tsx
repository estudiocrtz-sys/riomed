import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D0DDD6] bg-white/65 py-16 px-8 text-center', className)}>
      {icon && (
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2CC295]/10 border border-[#2CC295]/20 mb-4">
          <span className="text-[#03624C] w-6 h-6">{icon}</span>
        </div>
      )}
      <h3 className="text-base font-semibold text-[#000F11] mb-1">{title}</h3>
      {description && <p className="text-sm text-[#5F6A67] max-w-sm leading-relaxed">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
