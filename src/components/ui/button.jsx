import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';

const Button = forwardRef(({ asChild = false, className = '', variant = 'primary', ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium ' +
    'transition-all duration-200 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background';

  const variants = {
    primary:
      'text-primary-foreground border border-white/25 backdrop-blur-xl shadow-[0_8px_30px_-8px_var(--color-primary)] ' +
      'bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-primary)_92%,transparent),color-mix(in_oklab,var(--color-primary-glow)_85%,transparent))] ' +
      'hover:shadow-[0_12px_36px_-6px_var(--color-primary)] hover:brightness-110 hover:-translate-y-0.5',
    secondary:
      'text-foreground border border-foreground/10 backdrop-blur-xl bg-white/10 dark:bg-white/5 ' +
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] hover:bg-white/20 dark:hover:bg-white/10 hover:-translate-y-0.5 hover:border-primary/30',
    ghost:
      'bg-transparent text-foreground hover:bg-white/10 backdrop-blur-md border border-transparent hover:border-foreground/10'
  };

  return (
    <Comp
      ref={ref}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export default Button;