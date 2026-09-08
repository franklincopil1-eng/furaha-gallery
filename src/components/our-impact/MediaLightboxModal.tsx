import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Calendar, Tag, Camera, Play, Film } from 'lucide-react';

export interface MediaItem {
  id: string;
  image: string;
  imageAlt: string;
  caption: string;
  location: string;
  date: string;
  category: string;
  context: string;
  isVideo?: boolean;
  videoSrc?: string;
  duration?: string;
}

interface MediaLightboxModalProps {
  item: MediaItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MediaLightboxModal: React.FC<MediaLightboxModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Dark backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Lightbox container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-3xl bg-[#201a18] text-white rounded-3xl shadow-2xl border border-white/15 overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
          >
            {/* Top Bar with Close Button */}
            <div className="p-4 bg-black/40 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#f7e4b7]">
                {item.isVideo ? <Film className="w-4 h-4 text-[#ef802e]" /> : <Camera className="w-4 h-4" />}
                <span>{item.isVideo ? 'Field Video Footage · Kenya' : 'Field Documentation · Kenya'}</span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close media viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Media View */}
            <div className="relative aspect-[16/10] w-full bg-black flex items-center justify-center overflow-hidden">
              {item.isVideo && item.videoSrc ? (
                <video
                  key={item.videoSrc}
                  controls
                  autoPlay
                  playsInline
                  poster={item.image}
                  className="w-full h-full object-contain"
                >
                  <source src={item.videoSrc} type="video/mp4" />
                  <source src="/videos/community-washroom-transformation.mp4" type="video/mp4" />
                  <source src="/westhill_sanitation.mp4" type="video/mp4" />
                  <source src="/amani-sanitation.mp4" type="video/mp4" />
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              ) : (
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full h-full object-contain object-center"
                />
              )}
            </div>

            {/* Context & Metadata details */}
            <div className="p-5 sm:p-6 bg-[#201a18] space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 bg-[#893d2d] text-white font-semibold px-2.5 py-0.5 rounded-full">
                  <Tag className="w-3 h-3" />
                  {item.category}
                </span>
                {item.isVideo && (
                  <span className="inline-flex items-center gap-1 bg-[#ef802e]/20 text-[#f7e4b7] font-semibold px-2.5 py-0.5 rounded-full border border-[#ef802e]/30">
                    <Play className="w-3 h-3 fill-current text-[#ef802e]" />
                    {item.duration || '0:27'} Video
                  </span>
                )}
                <span className="inline-flex items-center gap-1 bg-white/10 text-white/90 px-2.5 py-0.5 rounded-full">
                  <MapPin className="w-3 h-3 text-[#f7e4b7]" />
                  {item.location}
                </span>
                <span className="inline-flex items-center gap-1 bg-white/10 text-white/90 px-2.5 py-0.5 rounded-full">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {item.caption}
              </h3>

              <p className="text-xs sm:text-sm text-[#d4cfcb] leading-relaxed font-light">
                {item.context}
              </p>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
