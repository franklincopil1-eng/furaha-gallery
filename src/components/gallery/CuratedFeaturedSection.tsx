import React from 'react';
import { GalleryItem } from './galleryData';

interface CuratedFeaturedSectionProps {
  featuredItems: GalleryItem[];
  onOpenLightbox: (item: GalleryItem) => void;
}

export const CuratedFeaturedSection: React.FC<CuratedFeaturedSectionProps> = ({
  featuredItems,
  onOpenLightbox,
}) => {
  if (!featuredItems || featuredItems.length === 0) return null;

  // We deliberately arrange 5 featured moments
  const mainFeature = featuredItems[0];
  const sideTop = featuredItems[1];
  const sideBottom = featuredItems[2];
  const bottomRowLeft = featuredItems[3];
  const bottomRowRight = featuredItems[4];

  return (
    <section
      aria-label="Curated Featured Moments"
      className="py-16 sm:py-20 lg:py-24 bg-[#fdfbf9] border-b border-[#ebdcd0]/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#893d2d] mb-2">
            CURATED MOMENTS / 02
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#201a18] tracking-tight">
            Stories from the Ground
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#59524e] font-normal leading-relaxed">
            A deliberate selection of moments capturing the spirit, dignity, and daily life across Furaha&apos;s community.
          </p>
        </div>

        {/* Editorial CSS Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Main Large Feature (Spans 7 cols and 2 rows on desktop) */}
          {mainFeature && (
            <div
              onClick={() => onOpenLightbox(mainFeature)}
              className="sm:col-span-2 lg:col-span-7 lg:row-span-2 group relative overflow-hidden rounded-2xl bg-[#1e0f0a] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="relative w-full h-full min-h-[320px] sm:min-h-[420px] lg:min-h-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto overflow-hidden">
                <img
                  src={mainFeature.src}
                  alt={mainFeature.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                {/* Subtle Gradient Scrim for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/85" />

                {/* Minimal Overlay Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e5b382] mb-1.5 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                    {mainFeature.categoryLabel}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-normal text-white leading-tight">
                    {mainFeature.title}
                  </h3>
                  {mainFeature.subtitle && (
                    <p className="text-xs sm:text-sm text-white/80 mt-1 font-normal line-clamp-2 max-w-lg">
                      {mainFeature.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Side Top Supporting Item (Spans 5 cols on desktop) */}
          {sideTop && (
            <div
              onClick={() => onOpenLightbox(sideTop)}
              className="sm:col-span-1 lg:col-span-5 group relative overflow-hidden rounded-2xl bg-[#1e0f0a] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
                <img
                  src={sideTop.src}
                  alt={sideTop.title}
                  loading="lazy"
                  className={`w-full h-full object-cover ${sideTop.objectPosition || 'object-center'} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e5b382] mb-1 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                    {sideTop.categoryLabel}
                  </span>
                  <h3 className="text-base sm:text-lg lg:text-xl font-serif font-normal text-white leading-snug">
                    {sideTop.title}
                  </h3>
                  {sideTop.subtitle && (
                    <p className="text-xs text-white/80 mt-0.5 font-normal line-clamp-1">
                      {sideTop.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Side Bottom Supporting Item (Spans 5 cols on desktop) */}
          {sideBottom && (
            <div
              onClick={() => onOpenLightbox(sideBottom)}
              className="sm:col-span-1 lg:col-span-5 group relative overflow-hidden rounded-2xl bg-[#1e0f0a] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
                <img
                  src={sideBottom.src}
                  alt={sideBottom.title}
                  loading="lazy"
                  className={`w-full h-full object-cover ${sideBottom.objectPosition || 'object-center'} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e5b382] mb-1 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                    {sideBottom.categoryLabel}
                  </span>
                  <h3 className="text-base sm:text-lg lg:text-xl font-serif font-normal text-white leading-snug">
                    {sideBottom.title}
                  </h3>
                  {sideBottom.subtitle && (
                    <p className="text-xs text-white/80 mt-0.5 font-normal line-clamp-1">
                      {sideBottom.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Left Supporting Item (Spans 5 cols on desktop) */}
          {bottomRowLeft && (
            <div
              onClick={() => onOpenLightbox(bottomRowLeft)}
              className="sm:col-span-1 lg:col-span-5 group relative overflow-hidden rounded-2xl bg-[#1e0f0a] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
                <img
                  src={bottomRowLeft.src}
                  alt={bottomRowLeft.title}
                  loading="lazy"
                  className={`w-full h-full object-cover ${bottomRowLeft.objectPosition || 'object-center'} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e5b382] mb-1 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                    {bottomRowLeft.categoryLabel}
                  </span>
                  <h3 className="text-base sm:text-lg lg:text-xl font-serif font-normal text-white leading-snug">
                    {bottomRowLeft.title}
                  </h3>
                  {bottomRowLeft.subtitle && (
                    <p className="text-xs text-white/80 mt-0.5 font-normal line-clamp-1">
                      {bottomRowLeft.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Right Wide Supporting Item (Spans 7 cols on desktop) */}
          {bottomRowRight && (
            <div
              onClick={() => onOpenLightbox(bottomRowRight)}
              className="sm:col-span-1 lg:col-span-7 group relative overflow-hidden rounded-2xl bg-[#1e0f0a] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
                <img
                  src={bottomRowRight.src}
                  alt={bottomRowRight.title}
                  loading="lazy"
                  className={`w-full h-full object-cover ${bottomRowRight.objectPosition || 'object-center'} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e5b382] mb-1 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                    {bottomRowRight.categoryLabel}
                  </span>
                  <h3 className="text-base sm:text-lg lg:text-xl font-serif font-normal text-white leading-snug">
                    {bottomRowRight.title}
                  </h3>
                  {bottomRowRight.subtitle && (
                    <p className="text-xs text-white/80 mt-0.5 font-normal line-clamp-1">
                      {bottomRowRight.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
