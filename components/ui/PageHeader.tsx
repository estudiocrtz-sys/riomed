import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  breadcrumbs?: Breadcrumb[]
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({ breadcrumbs, actions, className }: PageHeaderProps) {
  if (!breadcrumbs && !actions) return null
  return (
    <div className={cn('flex items-center justify-between mb-6', className)}>
      {breadcrumbs && (
        <nav className="flex items-center gap-1.5 text-sm">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#8A9390]" />}
              {crumb.href ? (
                <Link href={crumb.href} className="text-[#8A9390] hover:text-[#03624C] transition-colors font-medium">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#000F11] font-semibold">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
