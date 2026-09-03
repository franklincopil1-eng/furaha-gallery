import React, { useState, useEffect } from 'react';
import { GalleryHero } from '../components/gallery/GalleryHero';
import { MediaGrid } from '../components/gallery/MediaGrid';
import { GalleryLightboxModal } from '../components/gallery/GalleryLightboxModal';
import { GALLERY_ITEMS, GalleryItem } from '../components/gallery/galleryData';

interface GalleryPageProps {
  onNavigateToDonate?: (cause?: string) => void;
  onNavigateToWhoWeServe?: () => void;
  onNavigateToOurWork?: () => void;
  onNavigateToOurImpact?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Gallery | Furaha Ministries';
  }, []);

  const handleSelectNext = () => {
    if (!selectedItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex((i) => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
    setSelectedItem(GALLERY_ITEMS[nextIndex]);
  };

  const handleSelectPrev = () => {
    if (!selectedItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex((i) => i.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setSelectedItem(GALLERY_ITEMS[prevIndex]);
  };

  const handleScrollToGallery = () => {
    const el = document.getElementById('gallery-collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#201a18] flex flex-col font-sans selection:bg-[#893d2d] selection:text-white">
      {/* 1. Gallery Exhibition Hero */}
      <GalleryHero onScrollToGallery={handleScrollToGallery} />

      {/* 2. Media Grid - 31 100% Unique Curated Photographs */}
      <div id="gallery-collection">
        <MediaGrid
          items={GALLERY_ITEMS}
          onOpenLightbox={(item) => setSelectedItem(item)}
        />
      </div>

      {/* 3. Fullscreen Lightbox Modal */}
      <GalleryLightboxModal
        item={selectedItem}
        items={GALLERY_ITEMS}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onSelectNext={handleSelectNext}
        onSelectPrev={handleSelectPrev}
      />
    </div>
  );
};
