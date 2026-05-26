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
    <div className={cn('flex flex-col items-center justify-center py-16 px-8 text-center', className)}>
      {icon && (
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F7F6F6] border border-[#D0DDD6] mb-4">
          <span className="text-[#8A9390] w-6 h-6">{icon}</span>
        </div>
      )}
      <h3 className="text-base font-semibold text-[#000F11] mb-1">{title}</h3>
      {description && <p className="text-sm text-[#8A9390] max-w-xs">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
