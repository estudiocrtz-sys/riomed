import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: { value: number; label: string }
  accent?: boolean
  className?: string
}

export function StatCard({ title, value, subtitle, icon, trend, accent, className }: StatCardProps) {
  const trendPositive = trend && trend.value > 0
  const trendNeutral = trend && trend.value === 0

  return (
    <div
      className={cn(
        'rounded-2xl p-5 flex flex-col gap-4 border transition-shadow hover:shadow-md',
        accent
          ? 'bg-gradient-to-br from-[#03624C] to-[#000F11] text-white border-transparent'
          : 'bg-white border-[#E8EDE9]',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-xl',
            accent ? 'bg-white/10' : 'bg-[#F7F6F6]'
          )}
        >
          <span className={cn('w-5 h-5', accent ? 'text-[#2CC295]' : 'text-[#03624C]')}>{icon}</span>
        </div>

        {trend && (
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg',
              trendNeutral
                ? 'bg-gray-100 text-gray-500'
                : trendPositive
                ? accent
                  ? 'bg-white/10 text-[#2CC295]'
                  : 'bg-[#2CC295]/10 text-[#03624C]'
                : accent
                ? 'bg-red-400/20 text-red-300'
                : 'bg-red-50 text-red-600'
            )}
          >
            {trendNeutral ? (
              <Minus className="w-3 h-3" />
            ) : trendPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>

      <div>
        <p className={cn('text-2xl font-bold leading-none', accent ? 'text-white' : 'text-[#000F11]')}>{value}</p>
        <p className={cn('text-sm font-medium mt-1', accent ? 'text-white/70' : 'text-[#8A9390]')}>{title}</p>
        {subtitle && (
          <p className={cn('text-xs mt-1', accent ? 'text-white/50' : 'text-[#D0DDD6]')}>{subtitle}</p>
        )}
        {trend && (
          <p className={cn('text-xs mt-1', accent ? 'text-white/50' : 'text-[#8A9390]')}>{trend.label}</p>
        )}
      </div>
    </div>
  )
}
