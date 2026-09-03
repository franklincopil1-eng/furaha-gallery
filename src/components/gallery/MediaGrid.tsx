import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
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
        const matchesLocation = item.location?.toLowerCase().includes(q);
        const matchesCategory = item.categoryLabel?.toLowerCase().includes(q);
        return matchesTitle || matchesSubtitle || matchesLocation || matchesCategory;
      }

      return true;
    });
  }, [items, categoryFilter, searchQuery]);

  return (
    <section aria-label="Media Collection" className="py-12 sm:py-16 bg-[#faf8f5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category & Filter Navigation */}
        <div className="space-y-4 mb-10 sm:mb-12">
          {/* Header info & search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#893d2d]" />
              <span className="text-sm font-bold text-[#201a18]">
                {filteredItems.length === items.length
                  ? `All ${items.length} Photographs`
                  : `Showing ${filteredItems.length} of ${items.length} Photographs`}
              </span>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-[#59524e]/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search photographs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-[#ebdcd0] rounded-full text-[#201a18] placeholder:text-[#59524e]/60 focus:outline-none focus:border-[#893d2d] transition-colors shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#59524e] hover:text-[#201a18] p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Thematic Categories Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#ebdcd0]/70">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                categoryFilter === 'all'
                  ? 'bg-[#893d2d] text-white shadow-xs'
                  : 'bg-white text-[#59524e] hover:text-[#201a18] border border-[#ebdcd0]'
              }`}
            >
              <span>All Categories</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                categoryFilter === 'all' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
              }`}>
                {items.length}
              </span>
            </button>
            {GALLERY_CATEGORIES.map((cat) => {
              const catCount = items.filter((i) => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    categoryFilter === cat.id
                      ? 'bg-[#893d2d] text-white shadow-xs'
                      : 'bg-white text-[#59524e] hover:text-[#201a18] border border-[#ebdcd0]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    categoryFilter === cat.id ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {catCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean, Visually Balanced Grid - Every image is 100% unique */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-[#59524e] text-sm bg-white rounded-2xl border border-[#ebdcd0] p-8">
            <p className="font-medium text-[#201a18]">No photographs found matching your search.</p>
            <p className="text-xs text-[#59524e] mt-1">Try clearing your search term or selecting another category.</p>
            <button
              onClick={() => {
                setCategoryFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-[#893d2d] text-white hover:bg-[#723224] transition-colors cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const positionClass = item.objectPosition || 'object-center';

              return (
                <div
                  key={item.id}
                  onClick={() => onOpenLightbox(item)}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#ebdcd0] hover:border-[#893d2d]/50 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md flex flex-col"
                >
                  {/* Visual Thumbnail */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#201a18]">
                    <img
                      src={item.src}
                      alt={item.title}
                      className={`w-full h-full object-cover ${positionClass} group-hover:scale-103 transition-transform duration-500`}
                      loading="lazy"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-2.5 left-2.5 bg-black/65 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                      {item.categoryLabel}
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#201a18] leading-snug group-hover:text-[#893d2d] transition-colors">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-xs text-[#59524e] mt-1 font-normal leading-relaxed">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    {item.location && (
                      <div className="pt-3 mt-3 border-t border-[#ebdcd0]/40 flex items-center justify-between text-[11px] text-[#59524e]/80">
                        <span>{item.location}</span>
                        <span className="text-[10px] text-[#893d2d] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          View photo →
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
