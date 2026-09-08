import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Share2, Check, ZoomIn, ZoomOut, MapPin, Play, Film } from 'lucide-react';
import { GalleryItem } from './galleryData';

interface GalleryLightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectNext: () => void;
  onSelectPrev: () => void;
}

const VIDEO_CHAPTERS = [
  { time: 0, label: '0:00 Old Latrines' },
  { time: 4, label: '0:04 The Need' },
  { time: 7, label: '0:07 Materials Arrive' },
  { time: 11, label: '0:11 Framing & Masonry' },
  { time: 15, label: '0:15 Carpentry Works' },
  { time: 19, label: '0:19 Clean Washrooms' },
];

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
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  const seekToChapter = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play().catch(() => {});
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
        <div className="w-full flex items-center justify-center max-h-[75vh] overflow-hidden">
          {isVideo ? (
            <div className="relative w-full max-w-4xl flex flex-col items-center">
              <div className="relative w-full aspect-[16/9] bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center">
                <video
                  ref={videoRef}
                  key={item.src}
                  poster={item.poster}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                >
                  <source src={item.src} type="video/mp4" />
                  <source src="/videos/community-washroom-transformation.mp4" type="video/mp4" />
                  <source src="/westhill_sanitation.mp4" type="video/mp4" />
                  <source src="/amani-sanitation.mp4" type="video/mp4" />
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Documentary chapter jump bar */}
              <div className="mt-3 w-full flex items-center justify-center gap-1.5 overflow-x-auto py-1 px-2 no-scrollbar">
                <span className="text-[11px] font-bold text-[#f7e4b7] uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
                  <Film className="w-3 h-3 text-[#ef802e]" /> Chapters:
                </span>
                {VIDEO_CHAPTERS.map((ch) => (
                  <button
                    key={ch.label}
                    onClick={() => seekToChapter(ch.time)}
                    className="text-[11px] font-medium bg-white/10 hover:bg-[#893d2d] text-white/90 hover:text-white px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer border border-white/10 shrink-0"
                  >
                    {ch.label}
                  </button>
                ))}
              </div>
            </div>
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
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#893d2d] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              {item.categoryLabel}
            </span>
            {isVideo && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 text-[#f7e4b7] text-[11px] font-semibold border border-white/15">
                <Play className="w-3 h-3 fill-current text-[#ef802e]" />
                {item.duration || '0:27'}
              </span>
            )}
          </div>
          <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold text-white tracking-[-1px] leading-snug">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-[16px] leading-[1.65] font-light text-white/90 mt-1.5 max-w-xl">
              {item.subtitle}
            </p>
          )}

          {item.location && (
            <div className="mt-2.5 inline-flex items-center gap-1.5 text-[14px] font-light text-[#f7e4b7]">
              <MapPin className="w-3.5 h-3.5 text-[#e5b382] shrink-0" />
              <span>{item.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
