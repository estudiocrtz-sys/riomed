import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex min-h-9 items-center justify-center gap-2 whitespace-nowrap font-medium rounded-xl transition-all duration-150 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F6F6]',
          {
            'bg-[#2CC295] hover:bg-[#00DF81] text-[#000F11] shadow-sm hover:shadow-md': variant === 'primary',
            'bg-[#F7F6F6] hover:bg-[#E8EDE9] text-[#000F11] border border-[#D0DDD6]': variant === 'secondary',
            'hover:bg-[#F7F6F6] text-[#5F6A67] hover:text-[#000F11]': variant === 'ghost',
            'border border-[#D0DDD6] bg-white hover:border-[#03624C] hover:text-[#03624C] text-[#000F11]': variant === 'outline',
            'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300 focus-visible:ring-red-300': variant === 'danger',
          },
          {
            'px-2.5 py-1.5 text-xs': size === 'sm',
            'px-4 py-2 text-sm': size === 'md',
            'px-5 py-2.5 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
