import React from 'react';
import { GalleryItem, GALLERY_ITEMS } from './galleryData';

interface GalleryHeroProps {
  onOpenLightbox?: (item: GalleryItem) => void;
  onScrollToGallery?: () => void;
}

export const GalleryHero: React.FC<GalleryHeroProps> = ({
  onOpenLightbox,
  onScrollToGallery,
}) => {
  // Highlight 3 curated photographs with natural archival mounts
  const heroFeaturedItems = [
    GALLERY_ITEMS.find((i) => i.id === 'photo-amani-students') || GALLERY_ITEMS[3],
    GALLERY_ITEMS.find((i) => i.id === 'photo-fellowship') || GALLERY_ITEMS[5],
    GALLERY_ITEMS.find((i) => i.id === 'photo-purity-teacher') || GALLERY_ITEMS[4],
  ].filter(Boolean) as GalleryItem[];

  return (
    <section
      aria-label="Gallery Hero"
      className="relative w-full bg-[#240e08] text-white pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#ebdcd0]/15"
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
        {/* Harmonious Header Hierarchy & Centered Typography */}
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-[#e5b382] mb-3 sm:mb-4 inline-block">
            GALLERY
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight max-w-2xl mx-auto">
            Moments from the work.
          </h1>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/75 max-w-xl mx-auto font-normal leading-relaxed">
            Photos and videos from Furaha's work and the communities we serve in Kenya.
          </p>
        </div>

        {/* Gallery Exhibition Preview Row */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {heroFeaturedItems.map((item, index) => {
            // Subtle rotational rhythm for an art gallery display feel
            const rotationClass =
              index === 0
                ? '-rotate-1 hover:rotate-0'
                : index === 2
                ? 'rotate-1 hover:rotate-0'
                : 'hover:-translate-y-1';

            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox && onOpenLightbox(item)}
                className={`group relative cursor-pointer transition-all duration-300 ${rotationClass}`}
              >
                <div className="p-2 sm:p-2.5 bg-white/95 rounded-2xl shadow-xl shadow-black/40 border border-white/30 text-left">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#1f1513]">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  <div className="pt-2 px-1 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#201a18] truncate mr-2">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-[#59524e] shrink-0">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtle quick-scroll affordance */}
        {onScrollToGallery && (
          <div className="mt-10 sm:mt-12 flex justify-center">
            <button
              onClick={onScrollToGallery}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium text-white/80 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-xs transition-colors cursor-pointer"
            >
              Explore all media
              <span className="text-xs">↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
