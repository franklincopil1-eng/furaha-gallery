import React from 'react';
import { Play, MapPin, Heart } from 'lucide-react';
import { GalleryItem, getCauseForCategory } from './galleryData';

interface CuratedFeaturedSectionProps {
  featuredItems: GalleryItem[];
  onOpenLightbox: (item: GalleryItem) => void;
  onNavigateToDonate?: (cause?: string) => void;
}

export const CuratedFeaturedSection: React.FC<CuratedFeaturedSectionProps> = ({
  featuredItems,
  onOpenLightbox,
  onNavigateToDonate,
}) => {
  if (!featuredItems || featuredItems.length === 0) return null;

  // We deliberately arrange 5 featured moments
  const mainFeature = featuredItems[0];
  const sideTop = featuredItems[1];
  const sideBottom = featuredItems[2];
  const bottomRowLeft = featuredItems[3];
  const bottomRowRight = featuredItems[4];

  const renderPlayOverlay = (item: GalleryItem, isLarge = false) => {
    if (item.type !== 'video') return null;
    return (
      <>
        {/* Top right video duration pill */}
        <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 bg-black/75 backdrop-blur-md text-[#f7e4b7] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md border border-white/15">
          <Play className="w-3 h-3 fill-current text-[#ef802e]" />
          <span>{item.duration || '0:27'}</span>
        </div>

        {/* Center play button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className={`${isLarge ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-12 h-12 sm:w-14 sm:h-14'} rounded-full bg-[#893d2d]/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#893d2d] transition-transform duration-300 backdrop-blur-xs pl-1`}>
            <Play className={`${isLarge ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-5 h-5 sm:w-6 sm:h-6'} fill-current`} />
          </div>
        </div>
      </>
    );
  };

  const renderCardFooter = (item: GalleryItem, isMain = false) => {
    const causeInfo = getCauseForCategory(item.category);
    return (
      <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-white/15">
        <div className="flex items-center gap-1.5 text-[12px] text-white/80 font-light min-w-0">
          <MapPin className="w-3.5 h-3.5 text-[#ef802e] shrink-0" />
          <span className="truncate">{item.location || 'Kenya'}</span>
        </div>

        {onNavigateToDonate && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigateToDonate(causeInfo.cause);
            }}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#893d2d] hover:bg-[#a64835] px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer border border-white/20 shadow-md hover:shadow-lg shrink-0 hover:scale-[1.03] active:scale-[0.97]"
            title={`Support ${causeInfo.cause}`}
          >
            <Heart className="w-3 h-3 fill-current text-[#f7e4b7]" />
            {isMain ? (
              <>
                <span className="hidden sm:inline">{causeInfo.label}</span>
                <span className="inline sm:hidden">{causeInfo.shortLabel}</span>
              </>
            ) : (
              <span>{causeInfo.shortLabel}</span>
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <section
      aria-label="Curated Featured Moments"
      className="py-16 sm:py-20 lg:py-24 bg-[#fdfbf9] border-b border-[#ebdcd0]/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#893d2d]/10 text-[#893d2d] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5">
            <span>Featured Stories</span>
          </div>
          <h2 className="text-[36px] sm:text-[42px] lg:text-[46px] font-semibold text-[#893d2d] tracking-[-2px] mb-2 leading-tight">
            Stories from the Ground
          </h2>
          <h5 className="text-[16px] min-[360px]:text-[18px] sm:text-[22px] lg:text-[24px] font-semibold text-[#893d2d] mb-3 sm:mb-4 tracking-[-0.5px] sm:tracking-[-1px] leading-snug">
            Curated Moments Across Kenya
          </h5>
          <p className="text-[#717275] text-[16px] leading-[1.65] font-light max-w-2xl">
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
                  src={mainFeature.poster || mainFeature.src}
                  alt={mainFeature.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                {renderPlayOverlay(mainFeature, true)}
                {/* Subtle Gradient Scrim for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/85" />

                {/* Minimal Overlay Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end text-white z-10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#f7e4b7] mb-1.5 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                    {mainFeature.categoryLabel}
                  </span>
                  <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold text-white tracking-[-1px] leading-tight">
                    {mainFeature.title}
                  </h3>
                  {mainFeature.subtitle && (
                    <p className="text-[16px] leading-[1.65] font-light text-white/90 mt-1 line-clamp-2 max-w-lg">
                      {mainFeature.subtitle}
                    </p>
                  )}
                  {renderCardFooter(mainFeature, true)}
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
                  src={sideTop.poster || sideTop.src}
                  alt={sideTop.title}
                  loading="lazy"
                  className={`w-full h-full object-cover ${sideTop.objectPosition || 'object-center'} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                />
                {renderPlayOverlay(sideTop)}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-white z-10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#f7e4b7] mb-1 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                    {sideTop.categoryLabel}
                  </span>
                  <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold text-white tracking-[-1px] leading-snug">
                    {sideTop.title}
                  </h3>
                  {sideTop.subtitle && (
                    <p className="text-[16px] leading-[1.65] font-light text-white/90 mt-0.5 line-clamp-1">
                      {sideTop.subtitle}
                    </p>
                  )}
                  {renderCardFooter(sideTop)}
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
                  src={sideBottom.poster || sideBottom.src}
                  alt={sideBottom.title}
                  loading="lazy"
                  className={`w-full h-full object-cover ${sideBottom.objectPosition || 'object-center'} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                />
                {renderPlayOverlay(sideBottom)}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-white z-10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#f7e4b7] mb-1 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                    {sideBottom.categoryLabel}
                  </span>
                  <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold text-white tracking-[-1px] leading-snug">
                    {sideBottom.title}
                  </h3>
                  {sideBottom.subtitle && (
                    <p className="text-[16px] leading-[1.65] font-light text-white/90 mt-0.5 line-clamp-1">
                      {sideBottom.subtitle}
                    </p>
                  )}
                  {renderCardFooter(sideBottom)}
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
                  src={bottomRowLeft.poster || bottomRowLeft.src}
                  alt={bottomRowLeft.title}
                  loading="lazy"
                  className={`w-full h-full object-cover ${bottomRowLeft.objectPosition || 'object-center'} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                />
                {renderPlayOverlay(bottomRowLeft)}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-white z-10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#f7e4b7] mb-1 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                    {bottomRowLeft.categoryLabel}
                  </span>
                  <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold text-white tracking-[-1px] leading-snug">
                    {bottomRowLeft.title}
                  </h3>
                  {bottomRowLeft.subtitle && (
                    <p className="text-[16px] leading-[1.65] font-light text-white/90 mt-0.5 line-clamp-1">
                      {bottomRowLeft.subtitle}
                    </p>
                  )}
                  {renderCardFooter(bottomRowLeft)}
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
                  src={bottomRowRight.poster || bottomRowRight.src}
                  alt={bottomRowRight.title}
                  loading="lazy"
                  className={`w-full h-full object-cover ${bottomRowRight.objectPosition || 'object-center'} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                />
                {renderPlayOverlay(bottomRowRight)}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-white z-10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#f7e4b7] mb-1 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                    {bottomRowRight.categoryLabel}
                  </span>
                  <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold text-white tracking-[-1px] leading-snug">
                    {bottomRowRight.title}
                  </h3>
                  {bottomRowRight.subtitle && (
                    <p className="text-[16px] leading-[1.65] font-light text-white/90 mt-0.5 line-clamp-1">
                      {bottomRowRight.subtitle}
                    </p>
                  )}
                  {renderCardFooter(bottomRowRight)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
