import { forwardRef, type ButtonHTMLAttributes, cloneElement, isValidElement } from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'secondary' | 'navy'
  asChild?: boolean
}

export const Button = forwardRef<any, ButtonProps>(({ className, variant = 'primary', asChild, ...props }, ref) => {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 disabled:pointer-events-none disabled:opacity-50', 
    { 
      'bg-[#ff6b35] text-white shadow-[0_12px_28px_rgba(255,107,53,.28)] hover:-translate-y-0.5 hover:bg-[#f45b24]': variant === 'primary', 
      'border border-slate-200 bg-white text-[#0a1d35] shadow-sm hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md': variant === 'secondary', 
      'bg-[#0a1d35] text-white hover:-translate-y-0.5 hover:bg-[#122d4c]': variant === 'navy' 
    }, 
    className
  )

  if (asChild && isValidElement(props.children)) {
    const child = props.children as React.ReactElement<any>
    return cloneElement(child, {
      ...(props as any),
      ...child.props,
      ref,
      className: cn(classes, child.props.className)
    })
  }

  return <button ref={ref} className={classes} {...props} />
})
Button.displayName = 'Button'

