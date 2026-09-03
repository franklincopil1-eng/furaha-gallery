import React from 'react';
import { Camera, MapPin, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from './galleryData';

interface GalleryHeroProps {
  onScrollToGallery?: () => void;
}

export const GalleryHero: React.FC<GalleryHeroProps> = ({
  onScrollToGallery,
}) => {
  return (
    <section
      aria-label="Gallery Hero"
      className="relative w-full bg-[#240e08] text-white pt-28 sm:pt-36 pb-14 sm:pb-18 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#ebdcd0]/15"
    >
      {/* Subtle Museum Ambient Lighting */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#e5b382]/10 blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 left-1/4 w-72 h-72 bg-[#893d2d]/25 blur-[100px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#e5b382] mb-3 inline-flex items-center gap-2">
            <Camera className="w-3.5 h-3.5" />
            PHOTO GALLERY
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight max-w-2xl mx-auto">
            Moments from the field.
          </h1>

          <p className="mt-3 text-sm sm:text-base text-white/80 max-w-lg mx-auto font-normal leading-relaxed">
            Photographs from Furaha&apos;s education, nutrition, discipleship, and community programs in Kenya.
          </p>

          {/* Program Badges */}
          <div className="mt-5 flex flex-wrap justify-center items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium border border-white/15">
              <Sparkles className="w-3 h-3 text-[#e5b382]" />
              {GALLERY_ITEMS.length} Photographs
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium border border-white/15">
              <MapPin className="w-3 h-3 text-[#e5b382]" />
              Kenya
            </span>
          </div>

          {/* Quick scroll button */}
          {onScrollToGallery && (
            <div className="mt-8">
              <button
                onClick={onScrollToGallery}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#240e08] bg-[#e5b382] hover:bg-[#d69f6c] transition-all cursor-pointer shadow-lg shadow-black/30 hover:scale-102"
              >
                Explore Gallery
                <span className="text-sm font-bold">↓</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
