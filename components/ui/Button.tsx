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
          'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-[#2CC295] hover:bg-[#00DF81] text-[#000F11] shadow-sm': variant === 'primary',
            'bg-[#F7F6F6] hover:bg-[#D0DDD6] text-[#000F11] border border-[#D0DDD6]': variant === 'secondary',
            'hover:bg-[#F7F6F6] text-[#8A9390] hover:text-[#000F11]': variant === 'ghost',
            'border border-[#D0DDD6] bg-white hover:border-[#8A9390] text-[#000F11]': variant === 'outline',
            'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200': variant === 'danger',
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
