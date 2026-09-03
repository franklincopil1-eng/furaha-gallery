import React, { useState, useEffect } from 'react';
import { GalleryHero } from '../components/gallery/GalleryHero';
import { FeaturedVideosSection } from '../components/gallery/FeaturedVideosSection';
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

  const videoItems = GALLERY_ITEMS.filter((item) => item.type === 'video');

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
      <GalleryHero
        onOpenLightbox={(item) => setSelectedItem(item)}
        onScrollToGallery={handleScrollToGallery}
      />

      {/* 2. Featured Video */}
      <FeaturedVideosSection
        videos={videoItems}
        onOpenLightbox={(item) => setSelectedItem(item)}
      />

      {/* 3. Media Grid (All · Photos · Videos) */}
      <div id="gallery-collection">
        <MediaGrid
          items={GALLERY_ITEMS}
          onOpenLightbox={(item) => setSelectedItem(item)}
        />
      </div>

      {/* 4. Minimal Lightbox */}
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
