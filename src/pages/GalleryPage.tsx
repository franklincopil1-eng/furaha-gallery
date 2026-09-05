import React, { useState, useEffect } from 'react';
import { GalleryHero } from '../components/gallery/GalleryHero';
import { CuratedFeaturedSection } from '../components/gallery/CuratedFeaturedSection';
import { MediaGrid } from '../components/gallery/MediaGrid';
import { GalleryClosingCTA } from '../components/gallery/GalleryClosingCTA';
import { GalleryLightboxModal } from '../components/gallery/GalleryLightboxModal';
import {
  GALLERY_ITEMS,
  FEATURED_GALLERY_ITEMS,
  GalleryItem,
} from '../components/gallery/galleryData';

interface GalleryPageProps {
  onNavigateToDonate?: (cause?: string) => void;
  onNavigateToWhoWeServe?: () => void;
  onNavigateToOurWork?: () => void;
  onNavigateToOurImpact?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onNavigateToDonate,
  onNavigateToOurWork,
}) => {
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
    const el = document.getElementById('gallery-featured');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#201a18] flex flex-col font-sans selection:bg-[#893d2d] selection:text-white">
      {/* SECTION 1 — Immersive Introduction */}
      <GalleryHero onScrollToGallery={handleScrollToGallery} />

      {/* SECTION 2 — Curated Featured Moments */}
      <div id="gallery-featured">
        <CuratedFeaturedSection
          featuredItems={FEATURED_GALLERY_ITEMS}
          onOpenLightbox={(item) => setSelectedItem(item)}
        />
      </div>

      {/* SECTION 3 & 4 — Explore by Impact & Full Curated Archive */}
      <div id="gallery-collection">
        <MediaGrid
          items={GALLERY_ITEMS}
          onOpenLightbox={(item) => setSelectedItem(item)}
        />
      </div>

      {/* SECTION 6 — Closing Call to Action */}
      <GalleryClosingCTA
        onNavigateToDonate={onNavigateToDonate}
        onNavigateToOurWork={onNavigateToOurWork}
      />

      {/* SECTION 5 — Lightbox / Fullscreen Image Viewer */}
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
