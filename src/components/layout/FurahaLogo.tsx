import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface FurahaLogoProps {
  variant?: 'dark' | 'light' | 'white';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const FurahaLogo: React.FC<FurahaLogoProps> = ({
  variant = 'dark',
  showText = true,
  size = 'md',
  className = '',
}) => {
  const isWhite = variant === 'light' || variant === 'white';
  const [imgError, setImgError] = useState(false);

  // Dynamic responsive sizing based on size prop and screen breakpoint
  const imageSizeClasses =
    size === 'sm'
      ? 'h-7 min-[340px]:h-8 min-[380px]:h-8.5 sm:h-9 md:h-10 lg:h-11 max-h-11'
      : size === 'lg' || size === 'xl'
      ? 'h-8 min-[340px]:h-9 min-[380px]:h-10 sm:h-11 md:h-12 lg:h-14 max-h-14'
      : 'h-7.5 min-[340px]:h-8.5 min-[380px]:h-9 sm:h-10 md:h-11 lg:h-12 max-h-12';

  const titleSizeClasses =
    size === 'sm'
      ? 'text-[11.5px] min-[340px]:text-[12.5px] min-[380px]:text-[14px] min-[440px]:text-[15.5px] sm:text-[17px] md:text-[18.5px] lg:text-[19.5px] xl:text-[20.5px]'
      : 'text-[12px] min-[340px]:text-[13px] min-[380px]:text-[15px] min-[440px]:text-[16.5px] sm:text-[18px] md:text-[19.5px] lg:text-[20.5px] xl:text-[21.5px]';

  const subSizeClasses =
    size === 'sm'
      ? 'text-[6.5px] min-[340px]:text-[7px] min-[380px]:text-[8px] min-[440px]:text-[8.5px] sm:text-[9px] md:text-[9.5px] lg:text-[10px]'
      : 'text-[7px] min-[340px]:text-[7.5px] min-[380px]:text-[8px] min-[440px]:text-[8.5px] sm:text-[9.5px] md:text-[10px]';

  return (
    <div
      id="furaha-logo-brand"
      className={`navbar-brand select-none flex items-center gap-1.5 min-[360px]:gap-2 sm:gap-2.5 md:gap-3 shrink-0 ${className}`}
    >
      {/* Official Logo with Vector Fallback */}
      {!imgError ? (
        <img
          src="/images/Logo2.png"
          alt="Furaha Ministries Logo"
          onError={() => setImgError(true)}
          className={`logo shrink-0 object-contain w-auto transition-all ${imageSizeClasses}`}
        />
      ) : (
        <div className="w-7 h-7 min-[340px]:w-8 min-[340px]:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-[#893d2d] flex items-center justify-center text-white shadow-xs shrink-0">
          <Heart className="w-3.5 h-3.5 min-[340px]:w-4 min-[340px]:h-4 sm:w-5 sm:h-5 fill-[#faedd0] text-[#faedd0]" />
        </div>
      )}

      {showText && (
        <div className="flex flex-col leading-tight min-w-0">
          <span
            className={`${titleSizeClasses} font-bold tracking-tight font-display uppercase whitespace-nowrap leading-[1.1] transition-all ${
              isWhite ? 'text-white' : 'text-[#893d2d]'
            }`}
          >
            FURAHA MINISTRIES
          </span>
          <small
            className={`${subSizeClasses} uppercase tracking-wider font-semibold whitespace-nowrap leading-tight transition-all ${
              isWhite ? 'text-white/80' : 'text-neutral-500'
            }`}
          >
            Non-profit Organization
          </small>
        </div>
      )}
    </div>
  );
};

