import React, { useState, useRef } from 'react';
import { Play, Maximize2 } from 'lucide-react';
import { GalleryItem } from './galleryData';

interface FeaturedVideosSectionProps {
  videos: GalleryItem[];
  onOpenLightbox: (item: GalleryItem) => void;
}

export const FeaturedVideosSection: React.FC<FeaturedVideosSectionProps> = ({
  videos,
  onOpenLightbox,
}) => {
  const [activeVideoId, setActiveVideoId] = useState<string>(videos[0]?.id || '');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeVideo = videos.find((v) => v.id === activeVideoId) || videos[0];

  const handleSelectVideo = (video: GalleryItem) => {
    setActiveVideoId(video.id);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section
      aria-label="Featured Video"
      className="py-12 sm:py-16 bg-[#faf8f5] border-b border-[#ebdcd0]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#893d2d] block mb-1">
            Featured
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#201a18] tracking-tight">
            {activeVideo?.title || "Amani Children's Home"}
          </h2>
          <p className="mt-1 text-sm text-[#59524e]">
            {activeVideo?.subtitle
              ? `${activeVideo.subtitle} · ${activeVideo.location || 'Kenya'}`
              : "A short video from Furaha's work at the children's home."}
          </p>
        </div>

        {/* Cinematic Video Container */}
        <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-md border border-[#ebdcd0]">
          <video
            ref={videoRef}
            key={activeVideo?.src}
            src={activeVideo?.src}
            poster={activeVideo?.poster}
            controls
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-contain"
          />

          {!isPlaying && (
            <div
              onClick={handleTogglePlay}
              className="absolute inset-0 bg-black/35 hover:bg-black/25 transition-colors flex items-center justify-center cursor-pointer group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#893d2d] group-hover:scale-105 transition-transform flex items-center justify-center shadow-lg">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 text-white fill-white" />
              </div>
            </div>
          )}

          <button
            onClick={() => onOpenLightbox(activeVideo)}
            aria-label="Open fullscreen"
            className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-2.5 rounded-full transition-colors cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Simple Video Selector if multiple videos available */}
        {videos.length > 1 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {videos.map((vid) => {
              const isSelected = vid.id === activeVideo?.id;
              return (
                <button
                  key={vid.id}
                  onClick={() => handleSelectVideo(vid)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#893d2d] text-white shadow-xs'
                      : 'bg-white text-[#59524e] hover:text-[#201a18] border border-[#ebdcd0]'
                  }`}
                >
                  {vid.title} {vid.subtitle ? `— ${vid.subtitle}` : ''}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
