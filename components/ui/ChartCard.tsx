import { cn } from '@/lib/utils'

interface ChartCardProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function ChartCard({ title, subtitle, actions, children, className }: ChartCardProps) {
  return (
    <div className={cn('bg-white rounded-2xl border border-[#E8EDE9] p-5', className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#000F11]">{title}</h3>
          {subtitle && <p className="text-xs text-[#8A9390] mt-0.5">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {children}
    </div>
  )
}
