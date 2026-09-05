import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Share2, Check, ZoomIn, ZoomOut, MapPin } from 'lucide-react';
import { GalleryItem } from './galleryData';

interface GalleryLightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectNext: () => void;
  onSelectPrev: () => void;
}

export const GalleryLightboxModal: React.FC<GalleryLightboxModalProps> = ({
  item,
  items,
  isOpen,
  onClose,
  onSelectNext,
  onSelectPrev,
}) => {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);

  // Reset zoom whenever active item changes
  useEffect(() => {
    setIsZoomed(false);
  }, [item?.id]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectNext();
      if (e.key === 'ArrowLeft') onSelectPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onSelectNext, onSelectPrev]);

  if (!isOpen || !item) return null;

  const isVideo = item.type === 'video';

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const swipeThreshold = 50;
    if (diffX > swipeThreshold) {
      onSelectNext();
    } else if (diffX < -swipeThreshold) {
      onSelectPrev();
    }
    touchStartX.current = null;
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          url: shareUrl,
        });
      } catch {
        // User cancelled or unsupported
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-sm transition-opacity"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Click backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Top Utility Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={handleShare}
          aria-label="Share"
          className="p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors cursor-pointer"
          title={copied ? 'Link copied' : 'Share'}
        >
          {copied ? <Check className="w-5 h-5 text-[#e5b382]" /> : <Share2 className="w-5 h-5" />}
        </button>

        <button
          onClick={onClose}
          aria-label="Close"
          className="p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev / Next buttons */}
      {items.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectPrev();
            }}
            aria-label="Previous"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectNext();
            }}
            aria-label="Next"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Content Modal Container */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        {/* Media */}
        <div className="w-full flex items-center justify-center max-h-[75vh] overflow-auto">
          {isVideo ? (
            <video
              key={item.src}
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              playsInline
              className="max-h-[75vh] w-auto max-w-full rounded-xl shadow-2xl bg-black"
            />
          ) : (
            <div className="relative inline-block">
              <img
                src={item.src}
                alt={item.title}
                onClick={() => setIsZoomed(!isZoomed)}
                className={`w-auto max-w-full rounded-xl shadow-2xl transition-all duration-300 ${
                  isZoomed
                    ? 'scale-125 cursor-zoom-out my-8'
                    : 'max-h-[75vh] object-contain cursor-zoom-in'
                }`}
              />
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-md backdrop-blur-xs transition-colors cursor-pointer sm:flex hidden"
                title={isZoomed ? 'Zoom out' : 'Zoom in'}
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>

        {/* Minimal Caption Footer */}
        <div className="mt-5 text-center text-white max-w-xl px-4 flex flex-col items-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e5b382] block mb-1">
            {item.categoryLabel}
          </span>
          <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-normal text-white">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-xs sm:text-sm text-white/80 mt-1.5 font-normal leading-relaxed">
              {item.subtitle}
            </p>
          )}

          {item.location && (
            <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[#e5b382]/90">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{item.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
