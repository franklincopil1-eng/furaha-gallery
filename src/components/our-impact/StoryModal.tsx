import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Calendar, Tag, ArrowRight, Heart } from 'lucide-react';

export interface FieldStory {
  id: string;
  date: string;
  location: string;
  category: 'Education' | 'Nutrition' | 'Care' | 'Faith' | 'Outreach';
  title: string;
  summary: string;
  fullStory: string;
  image: string;
  imageAlt: string;
  chips: string[];
  whatHappened: string;
  outcome?: string;
}

interface StoryModalProps {
  story: FieldStory | null;
  isOpen: boolean;
  onClose: () => void;
  onDonate?: (cause?: string) => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  story,
  isOpen,
  onClose,
  onDonate,
}) => {
  // Lock body scroll when open
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

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!story) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#ebdcd0] overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
          >
            {/* Header image */}
            <div className="relative aspect-[16/9] w-full shrink-0 bg-[#201a18] overflow-hidden">
              <img
                src={story.image}
                alt={story.imageAlt}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badges on image */}
              <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-[#893d2d] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  <Tag className="w-3 h-3" />
                  {story.category}
                </span>
                <span className="inline-flex items-center gap-1 bg-black/60 text-white/90 text-[11px] px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                  <Calendar className="w-3 h-3" />
                  {story.date}
                </span>
                <span className="inline-flex items-center gap-1 bg-black/60 text-white/90 text-[11px] px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                  <MapPin className="w-3 h-3 text-[#f7e4b7]" />
                  {story.location}
                </span>
              </div>
            </div>

            {/* Scrollable Story Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-5 text-[#201a18]">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#201a18]">
                {story.title}
              </h2>

              <p className="text-sm text-[#59524e] leading-relaxed font-normal">
                {story.summary}
              </p>

              {/* What Happened Section */}
              <div className="bg-[#faf8f5] p-4 rounded-2xl border border-[#ebdcd0] space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#893d2d]">
                  What Happened On The Ground
                </div>
                <p className="text-xs sm:text-sm text-[#201a18] leading-relaxed">
                  {story.whatHappened}
                </p>
              </div>

              {/* Full context */}
              <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed">
                {story.fullStory}
              </p>

              {/* Evidence Chips */}
              <div className="pt-2 border-t border-[#ebdcd0]/80">
                <div className="text-[11px] font-semibold text-[#717275] uppercase tracking-wider mb-2">
                  Evidence Chips
                </div>
                <div className="flex flex-wrap gap-2">
                  {story.chips.map((chip, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#faf8f5] border border-[#ebdcd0] text-xs font-medium text-[#59524e]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-4 sm:p-5 bg-[#faf8f5] border-t border-[#ebdcd0] flex items-center justify-between gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#59524e] hover:text-[#201a18] transition-colors"
              >
                Close
              </button>
              {onDonate && (
                <button
                  onClick={() => {
                    onClose();
                    onDonate(story.category);
                  }}
                  className="inline-flex items-center gap-2 bg-[#893d2d] hover:bg-[#733123] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer shadow-xs"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Support this work</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
