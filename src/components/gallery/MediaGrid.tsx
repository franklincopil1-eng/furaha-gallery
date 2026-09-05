import React, { useState, useMemo } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { GalleryItem, GALLERY_CATEGORIES, GalleryCategory } from './galleryData';

interface MediaGridProps {
  items: GalleryItem[];
  onOpenLightbox: (item: GalleryItem) => void;
}

export const MediaGrid: React.FC<MediaGridProps> = ({ items, onOpenLightbox }) => {
  const [categoryFilter, setCategoryFilter] = useState<'all' | GalleryCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Thematic category filter
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSubtitle = item.subtitle?.toLowerCase().includes(q);
        const matchesCategory = item.categoryLabel?.toLowerCase().includes(q);
        return matchesTitle || matchesSubtitle || matchesCategory;
      }

      return true;
    });
  }, [items, categoryFilter, searchQuery]);

  return (
    <section aria-label="Media Collection Archive" className="py-16 sm:py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION 3 — EXPLORE BY IMPACT HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#893d2d]/10 text-[#893d2d] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5">
              <span>Field Collection</span>
            </div>
            <h2 className="text-[36px] sm:text-[42px] lg:text-[46px] font-semibold text-[#893d2d] tracking-[-2px] mb-2 leading-tight">
              Explore the Work
            </h2>
            <h5 className="text-[16px] min-[360px]:text-[18px] sm:text-[22px] lg:text-[24px] font-semibold text-[#893d2d] mb-3 sm:mb-4 tracking-[-0.5px] sm:tracking-[-1px] leading-snug">
              Everyday Impact Across Programs
            </h5>
            <p className="text-[#717275] text-[16px] leading-[1.65] font-light max-w-2xl">
              Explore the moments and programs shaping everyday life across Furaha&apos;s communities.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#717275]/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-[15px] font-light bg-white border border-[#ebdcd0] rounded-full text-[#717275] placeholder:text-[#717275]/70 focus:outline-none focus:border-[#893d2d] transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#717275] hover:text-[#893d2d] p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Thematic Category Filter Pills (Horizontally scrollable on mobile, wrap on desktop) */}
        <div className="mb-10 sm:mb-12 border-b border-[#ebdcd0]/80 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap no-scrollbar">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                categoryFilter === 'all'
                  ? 'bg-[#893d2d] text-white shadow-xs'
                  : 'bg-white text-[#717275] hover:text-[#893d2d] border border-[#ebdcd0]'
              }`}
            >
              <span>All Stories</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  categoryFilter === 'all' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {items.length}
              </span>
            </button>

            {GALLERY_CATEGORIES.map((cat) => {
              const catCount = items.filter((i) => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    categoryFilter === cat.id
                      ? 'bg-[#893d2d] text-white shadow-xs'
                      : 'bg-white text-[#717275] hover:text-[#893d2d] border border-[#ebdcd0]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      categoryFilter === cat.id ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {catCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 4 — FULL CURATED ARCHIVE GRID */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#ebdcd0] p-8 max-w-md mx-auto">
            <h5 className="text-[20px] font-semibold text-[#893d2d] tracking-[-1px] mb-2">
              No photographs found
            </h5>
            <p className="text-[#717275] text-[16px] font-light leading-relaxed mb-4">
              Try clearing your keyword or selecting another category.
            </p>
            <button
              onClick={() => {
                setCategoryFilter('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center px-6 py-2.5 rounded-full text-[15px] font-semibold bg-[#893d2d] text-white hover:bg-[#733123] transition-colors cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const positionClass = item.objectPosition || 'object-center';
              const isWide = item.layout === 'wide' && categoryFilter === 'all';
              const isPortrait = item.layout === 'portrait';

              return (
                <article
                  key={item.id}
                  onClick={() => onOpenLightbox(item)}
                  className={`group bg-white rounded-2xl overflow-hidden border border-[#ebdcd0] hover:border-[#893d2d]/40 transition-all duration-300 cursor-pointer shadow-2xs hover:shadow-md flex flex-col ${
                    isWide ? 'sm:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  {/* Stable Aspect-Ratio Thumbnail Container (No Layout Shift) */}
                  <div
                    className={`relative w-full overflow-hidden bg-[#1e0f0a] ${
                      isWide
                        ? 'aspect-[16/9]'
                        : isPortrait
                        ? 'aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/3]'
                        : 'aspect-[4/3]'
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className={`w-full h-full object-cover ${positionClass} transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
                    />
                    
                    {/* Minimal Category Tag Over Photo */}
                    <div className="absolute top-3 left-3 bg-[#893d2d] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                      {item.categoryLabel}
                    </div>
                  </div>

                  {/* Clean Card Details — Formatted with Section 2 styles */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold text-[#893d2d] tracking-[-1px] leading-snug group-hover:text-[#733123] transition-colors mb-1">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-[#717275] text-[16px] font-light leading-[1.65] line-clamp-2">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    {item.location && (
                      <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-[#ebdcd0]/60 text-[14px] text-[#717275] font-light">
                        <MapPin className="w-3.5 h-3.5 text-[#893d2d] shrink-0" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
