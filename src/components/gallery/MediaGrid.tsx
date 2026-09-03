import React, { useState, useMemo } from 'react';
import { Play, Search, X } from 'lucide-react';
import { GalleryItem, GALLERY_CATEGORIES, GalleryCategory } from './galleryData';

interface MediaGridProps {
  items: GalleryItem[];
  onOpenLightbox: (item: GalleryItem) => void;
}

type FilterType = 'all' | 'photos' | 'videos';

export const MediaGrid: React.FC<MediaGridProps> = ({ items, onOpenLightbox }) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | GalleryCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Type filter
      if (filter === 'photos' && item.type !== 'photo') return false;
      if (filter === 'videos' && item.type !== 'video') return false;

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
  }, [items, filter, categoryFilter, searchQuery]);

  return (
    <section aria-label="Media Collection" className="py-12 sm:py-16 bg-[#faf8f5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category & Filter Navigation */}
        <div className="space-y-4 mb-10 sm:mb-12">
          {/* Thematic Categories Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                categoryFilter === 'all'
                  ? 'bg-[#893d2d] text-white shadow-xs'
                  : 'bg-white text-[#59524e] hover:text-[#201a18] border border-[#ebdcd0]'
              }`}
            >
              All Categories
            </button>
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-[#893d2d] text-white shadow-xs'
                    : 'bg-white text-[#59524e] hover:text-[#201a18] border border-[#ebdcd0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sub-bar: Type toggles and Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-[#ebdcd0]/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#59524e] mr-1">Format:</span>
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[#201a18] text-white'
                    : 'bg-stone-100 text-[#59524e] hover:bg-stone-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('photos')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  filter === 'photos'
                    ? 'bg-[#201a18] text-white'
                    : 'bg-stone-100 text-[#59524e] hover:bg-stone-200'
                }`}
              >
                Photos
              </button>
              <button
                onClick={() => setFilter('videos')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  filter === 'videos'
                    ? 'bg-[#201a18] text-white'
                    : 'bg-stone-100 text-[#59524e] hover:bg-stone-200'
                }`}
              >
                Videos
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#59524e]/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-white border border-[#ebdcd0] rounded-full text-[#201a18] placeholder:text-[#59524e]/50 focus:outline-none focus:border-[#893d2d] transition-colors"
              >
              </input>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#59524e] hover:text-[#201a18] p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Clean, Visually Calm Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-[#59524e] text-sm">
            <p>No items found matching your filters.</p>
            <button
              onClick={() => {
                setFilter('all');
                setCategoryFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-[#893d2d] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const isVideo = item.type === 'video';
              const thumbnailSrc = isVideo ? item.poster || item.src : item.src;
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
                      src={thumbnailSrc}
                      alt={item.title}
                      className={`w-full h-full object-cover ${positionClass} group-hover:scale-103 transition-transform duration-500`}
                      loading="lazy"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-2.5 left-2.5 bg-black/65 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                      {item.categoryLabel}
                    </div>

                    {/* Video Center Play Icon */}
                    {isVideo && (
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-[#893d2d] text-white flex items-center justify-center shadow-md">
                          <Play className="w-4 h-4 ml-0.5 fill-white" />
                        </div>
                      </div>
                    )}

                    {/* Video Duration Pill in Bottom Corner */}
                    {isVideo && item.duration && (
                      <span className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                        {item.duration}
                      </span>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#893d2d] block mb-1">
                        {isVideo ? 'VIDEO' : 'PHOTO'}
                      </span>
                      <h3 className="text-base font-bold text-[#201a18] leading-snug">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-xs text-[#59524e] mt-0.5 font-medium">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    {item.location && (
                      <span className="text-[11px] text-[#59524e]/80 mt-3 block">
                        {item.location}
                      </span>
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
