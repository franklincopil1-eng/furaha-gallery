import React, { useState, useRef } from 'react';
import { Play, Pause, Maximize2, RotateCcw, Film, CheckCircle, MapPin, Tag, Heart } from 'lucide-react';
import { GalleryItem } from './galleryData';

interface FeaturedVideoSectionProps {
  videoItem: GalleryItem;
  onOpenLightbox: (item: GalleryItem) => void;
  onNavigateToDonate?: (cause?: string) => void;
}

const VIDEO_CHAPTERS = [
  { time: 0, label: '0:00 Old Latrines' },
  { time: 4, label: '0:04 Urgent Need' },
  { time: 7, label: '0:07 Materials Arrive' },
  { time: 11, label: '0:11 Framing & Masonry' },
  { time: 15, label: '0:15 Carpentry Works' },
  { time: 19, label: '0:19 Clean Washrooms' },
];

export const FeaturedVideoSection: React.FC<FeaturedVideoSectionProps> = ({
  videoItem,
  onOpenLightbox,
  onNavigateToDonate,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayInline = () => {
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 50);
  };

  const handleSeek = (seconds: number, index: number) => {
    setActiveChapter(index);
    if (!isPlaying) {
      setIsPlaying(true);
    }
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = seconds;
        videoRef.current.play().catch(() => {});
      }
    }, 80);
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section
      id="gallery-documentary-video"
      aria-label="Field Documentary Video"
      className="relative w-full bg-[#f4eee6] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-[#ebdcd0]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#893d2d]/10 border border-[#893d2d]/20 text-[#893d2d] text-xs font-bold uppercase tracking-wider mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>Field Video Documentary · Kenya</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#201a18] tracking-tight mb-3.5">
            {videoItem.title}
          </h2>
          <p className="text-base sm:text-lg text-[#59524e] leading-relaxed">
            {videoItem.subtitle}
          </p>
        </div>

        {/* Video Player & Context Container */}
        <div className="bg-[#faf8f5] rounded-2xl border border-[#ebdcd0] shadow-sm overflow-hidden p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 cols: Video Stage */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="relative aspect-[16/9] w-full bg-black rounded-xl overflow-hidden shadow-md group">
                {isPlaying ? (
                  <video
                    ref={videoRef}
                    key={videoItem.src}
                    poster={videoItem.poster}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  >
                    <source src={videoItem.src} type="video/mp4" />
                    <source src="/videos/community-washroom-transformation.mp4" type="video/mp4" />
                    <source src="/westhill_sanitation.mp4" type="video/mp4" />
                    <source src="/amani-sanitation.mp4" type="video/mp4" />
                    <source src="/video.mp4" type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>
                ) : (
                  <div
                    onClick={handlePlayInline}
                    className="relative w-full h-full cursor-pointer overflow-hidden"
                  >
                    <img
                      src={videoItem.poster}
                      alt={videoItem.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 group-hover:via-black/20 transition-colors" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#f7e4b7] text-xs font-semibold border border-white/15">
                        <MapPin className="w-3 h-3 text-[#ef802e]" />
                        {videoItem.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/15">
                        <Film className="w-3 h-3 text-[#ef802e]" />
                        {videoItem.duration || '0:27'}
                      </span>
                    </div>

                    {/* Center Animated Play Button */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#893d2d] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#a64835] transition-all duration-300">
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                      </div>
                      <span className="mt-3 text-xs sm:text-sm font-semibold text-white/95 bg-black/50 px-3.5 py-1 rounded-full backdrop-blur-sm border border-white/20">
                        Click to watch transformation video (0:27)
                      </span>
                    </div>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                      <p className="text-white text-xs sm:text-sm line-clamp-1 font-medium drop-shadow-md">
                        Makeshift Pit Latrines → Clean, Ventilated Ceramic Washrooms
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Controls & Chapter Jump Bar */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#ebdcd0]">
                {/* Chapters */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                  <span className="text-xs font-bold text-[#893d2d] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                    Chapters:
                  </span>
                  {VIDEO_CHAPTERS.map((ch, index) => (
                    <button
                      key={ch.label}
                      onClick={() => handleSeek(ch.time, index)}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                        activeChapter === index && isPlaying
                          ? 'bg-[#893d2d] text-white border-[#893d2d]'
                          : 'bg-white hover:bg-[#893d2d]/10 text-[#59524e] hover:text-[#893d2d] border-[#ebdcd0]'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>

                {/* Secondary Action: Fullscreen Modal Lightbox */}
                <div className="flex items-center gap-2 shrink-0">
                  {isPlaying && (
                    <button
                      onClick={handleRestart}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#59524e] hover:text-[#893d2d] bg-white border border-[#ebdcd0] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                      title="Replay from beginning"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Replay</span>
                    </button>
                  )}
                  <button
                    onClick={() => onOpenLightbox(videoItem)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#893d2d] hover:text-white bg-[#893d2d]/10 hover:bg-[#893d2d] border border-[#893d2d]/30 px-3 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Open in Lightbox</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Story & Field Impact Context */}
            <div className="lg:col-span-4 flex flex-col space-y-5">
              <div className="bg-white rounded-xl p-5 border border-[#ebdcd0]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#893d2d] uppercase tracking-wider mb-2">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Sanitation & Facility Repairs</span>
                </div>
                <h3 className="text-lg font-bold text-[#201a18] mb-2 leading-snug">
                  From Fragile Latrines to Clean, Dignified Washrooms
                </h3>
                <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed mb-4">
                  Before this intervention, children and community members relied on unstable, dilapidated pit structures. With local community artisans, Furaha rebuilt the facilities with deep masonry, ventilated piping, ceramic tile flooring, and secure lockable doors.
                </p>

                {/* Before / After checklist */}
                <div className="space-y-2.5 pt-3 border-t border-[#f4eee6] text-xs">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0" />
                    <span className="text-[#717275]">
                      <strong className="text-[#201a18]">Before:</strong> Fragile iron sheets, unsteady timber, poor hygiene risks.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-[#717275]">
                      <strong className="text-[#201a18]">After:</strong> Ceramic-tiled floors, fresh ventilation, handwashing stations.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Prompt */}
              <div className="bg-[#893d2d]/5 rounded-xl p-5 border border-[#893d2d]/20 text-center flex flex-col items-center">
                <span className="text-xs font-semibold text-[#893d2d] mb-1">
                  Help Fund Similar Projects
                </span>
                <p className="text-xs text-[#59524e] mb-3 leading-relaxed">
                  100% of public gifts go directly into on-the-ground materials and construction in Kenya.
                </p>
                {onNavigateToDonate && (
                  <button
                    type="button"
                    onClick={() => onNavigateToDonate('Sanitation & Facility Repairs')}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#893d2d] hover:bg-[#a64835] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Support Facility Upgrades</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
