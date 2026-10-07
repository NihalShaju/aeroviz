import React from 'react';

export interface GlowCursorButtonProps {
  children?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  showArrow?: boolean;
  className?: string;
  variant?: 'pink' | 'dark' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  as?: 'a' | 'button';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<any>) => void;
  'aria-label'?: string;
}

export const GlowCursorButton: React.FC<GlowCursorButtonProps> = ({
  children = 'Start on WhatsApp',
  href,
  target,
  rel,
  icon,
  showArrow = true,
  className = '',
  variant = 'pink',
  size = 'md',
  as,
  type = 'button',
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
}) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--x', `${x}px`);
    el.style.setProperty('--y', `${y}px`);
  };

  const Component = as ? as : href ? 'a' : 'button';

  // Size styling maps
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs sm:text-[13px] gap-1.5',
    md: 'px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base gap-2.5',
    lg: 'px-8 sm:px-9 py-3.5 sm:py-4 text-base sm:text-lg gap-3',
  }[size];

  // Variant styling maps
  const variantClasses = {
    pink: 'bg-pink text-white shadow-pinkGlow hover:shadow-[0_0_32px_rgba(255,45,117,0.5)] border border-white/20',
    dark: 'bg-slate-900 text-white shadow-lg hover:shadow-[0_0_30px_rgba(255,45,117,0.35)] border border-slate-700/60',
    glass: 'bg-white/90 text-slate-900 shadow-md backdrop-blur-md border border-slate-200/90 hover:border-pink/50 hover:text-pink',
    outline: 'bg-transparent text-pink border-2 border-pink/60 hover:border-pink hover:bg-pink/10 shadow-sm',
  }[variant];

  // Glow colors depending on variant
  const outerGlowColor = variant === 'glass' ? 'rgba(255, 45, 117, 0.45)' : 'rgba(255, 45, 117, 0.65)';
  const borderSpotlight = variant === 'dark'
    ? 'rgba(255, 255, 255, 0.8), rgba(255, 45, 117, 0.5) 45%, transparent 75%'
    : 'rgba(255, 255, 255, 0.95), rgba(255, 120, 175, 0.5) 45%, transparent 75%';

  return (
    <Component
      href={href}
      target={target}
      rel={rel}
      type={Component === 'button' ? type : undefined}
      disabled={Component === 'button' ? disabled : undefined}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      style={{ '--x': '50%', '--y': '50%' } as React.CSSProperties}
      className={`group relative inline-flex items-center justify-center font-heading font-bold rounded-full transition-all duration-300 ease-out select-none active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 ${sizeClasses} ${variantClasses} ${className}`}
    >
      {/* 1. Ambient outer blur glow tracking cursor position */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-full blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300 ease-out"
        style={{
          background: `radial-gradient(130px circle at var(--x, 50%) var(--y, 50%), ${outerGlowColor}, transparent 75%)`,
        }}
      />

      {/* 2. Cursor-tracking border shine / highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full p-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
        style={{
          background: `radial-gradient(90px circle at var(--x, 50%) var(--y, 50%), ${borderSpotlight})`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* 3. Surface spotlight shimmer under cursor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out overflow-hidden"
        style={{
          background: `radial-gradient(100px circle at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.28), transparent 70%)`,
        }}
      />

      {/* 4. Button Foreground Content with Right-Arrow SVG Icon */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="shrink-0 transition-transform duration-300 group-hover:scale-110">{icon}</span>}
        <span className="tracking-tight">{children}</span>
        {showArrow && (
          <svg
            className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        )}
      </span>
    </Component>
  );
};

export default GlowCursorButton;
