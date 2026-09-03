import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  webpSrc?: string;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  webpSrc,
  priority = false,
  className = '',
  containerClassName = '',
  aspectRatio,
  onError,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-generate webp path if not explicitly provided and local file
  const computedWebp =
    webpSrc ||
    (src.startsWith('/') && (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png'))
      ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
      : undefined);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true);
      if (fallbackSrc) {
        (e.currentTarget as HTMLImageElement).src = fallbackSrc;
      }
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#f0eae1] ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <picture>
        {computedWebp && !hasError && (
          <source srcSet={computedWebp} type="image/webp" />
        )}
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onError={handleError}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-90'
          } ${className}`}
          {...props}
        />
      </picture>
    </div>
  );
};
