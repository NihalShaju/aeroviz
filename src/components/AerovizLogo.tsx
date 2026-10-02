import React from 'react';
export interface AerovizLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'auto' | 'original' | 'white-transparent' | 'dark-transparent';
  treatment?: 'auto' | 'pill' | 'bare';
  alt?: string;
}

export const AerovizLogo: React.FC<AerovizLogoProps> = ({
  className = '',
  width,
  height,
  size = 'md',
  variant = 'auto',
  treatment = 'auto',
  alt = 'Aeroviz Adventure Tourism LLC',
}) => {
  // Responsive default sizes if explicit width/height not provided
  const sizeClasses = {
    sm: 'h-7 sm:h-8 w-auto',
    md: 'h-9 sm:h-10 w-auto',
    lg: 'h-12 sm:h-14 w-auto',
    xl: 'h-16 sm:h-20 w-auto',
  }[size];

  // Resolve image source
  let src = '/brand/aeroviz-logo-white-transparent.png';
  if (variant === 'original') {
    src = '/brand/aeroviz-logo-darkbg.png';
  } else if (variant === 'white-transparent') {
    src = '/brand/aeroviz-logo-white-transparent.png';
  } else if (variant === 'dark-transparent') {
    src = '/brand/aeroviz-logo-dark-transparent.png';
  } else {
    // auto - light mode only
    src = '/brand/aeroviz-logo-darkbg.png';
  }

  // Treatment: in light mode, if 'auto' or 'pill', render inside the official #03182D badge
  const shouldWrapPill = treatment === 'pill' || treatment === 'auto';

  if (shouldWrapPill) {
    return (
      <div
        className={`inline-flex items-center justify-center bg-[#03182D] px-3 py-1.5 rounded-xl border border-white/10 shadow-sm transition-transform hover:scale-[1.02] shrink-0 ${className}`}
        style={width ? { width } : undefined}
      >
        <img
          src="/brand/aeroviz-logo-white-transparent.png"
          alt={alt}
          className={`${sizeClasses} object-contain block`}
          style={{
            height: height || undefined,
            width: width || undefined,
            aspectRatio: '586 / 175',
          }}
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={width ? { width } : undefined}
    >
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses} object-contain block`}
        style={{
          height: height || undefined,
          width: width || undefined,
          aspectRatio: '586 / 175',
        }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default AerovizLogo;
