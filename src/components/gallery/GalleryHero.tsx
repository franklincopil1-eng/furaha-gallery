import React from 'react';
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
      className="relative w-full bg-[#1e0f0a] text-white pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#ebdcd0]/10"
    >
      {/* Subtle Warm Atmospheric Light */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-[#e5b382]/8 blur-[140px] pointer-events-none rounded-full"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-12 right-1/4 w-80 h-80 bg-[#893d2d]/20 blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <div className="flex flex-col items-center">
          {/* Section Eyebrow */}
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#e5b382]/90 mb-5">
            PHOTO GALLERY / 01
          </p>

          {/* Large Editorial Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-white leading-[1.05] uppercase max-w-3xl mx-auto">
            Moments<br />
            <span className="italic font-light text-[#e5b382]/95">from the field.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-white/75 max-w-xl mx-auto font-normal leading-relaxed">
            Photographs from Furaha&apos;s education, nutrition, discipleship, and community programs in Kenya.
          </p>

          {/* Metadata Marker */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-widest text-[#e5b382]/80 uppercase">
            <span>{GALLERY_ITEMS.length} Photographs</span>
            <span className="text-white/30">·</span>
            <span>Kenya</span>
          </div>

          {/* Subtle Explore Indicator */}
          {onScrollToGallery && (
            <div className="mt-10 sm:mt-12">
              <button
                onClick={onScrollToGallery}
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wider text-white/90 hover:text-white uppercase transition-all cursor-pointer py-2 px-4 rounded-full border border-white/15 hover:border-[#e5b382]/50 hover:bg-white/5"
              >
                <span>Explore the stories</span>
                <span className="text-sm font-bold transition-transform duration-300 group-hover:translate-y-0.5 text-[#e5b382]">
                  ↓
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
