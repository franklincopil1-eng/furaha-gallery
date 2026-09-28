import React, { useState } from 'react';
import { Play, Heart, ArrowRight } from 'lucide-react';

interface ElevatorPitchVideoProps {
  onOpenDonate?: () => void;
  onOpenVolunteer?: () => void;
}

const YOUTUBE_VIDEO_ID = 'cwaWlg9q4BA';
const YOUTUBE_EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

export const ElevatorPitchVideo: React.FC<ElevatorPitchVideoProps> = ({
  onOpenDonate,
  onOpenVolunteer,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [thumbLoaded, setThumbLoaded] = useState<boolean>(true);

  const scrollToStory = (e: React.MouseEvent) => {
    e.preventDefault();
    const storySection = document.getElementById('story');
    if (storySection) {
      const topOffset = 110;
      const elementPosition = storySection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="mission-overview-video"
      aria-label="Furaha Ministries Mission Overview Video"
      className="relative z-30 bg-white py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#ebdcd0]/60"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-5 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#893d2d] tracking-tight mb-1.5">
            The Heart Behind Furaha
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-600">
            Reaching the overlooked across Africa through faith, education, and love.
          </p>
        </div>

        {/* Bezel-less Glass Video Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Subtle Ambient Backlight Glow behind glass */}
          <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-[#893d2d]/15 via-[#faedd0]/30 to-[#893d2d]/15 rounded-3xl sm:rounded-[36px] blur-xl opacity-75 -z-10 pointer-events-none" />

          {/* Seamless Edge-to-Edge Glass Canvas */}
          <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-md bg-neutral-950/20 border border-white/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.45)]">
            {/* Glass Surface Specular Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.12] pointer-events-none z-10" />

            {isPlaying ? (
              <iframe
                src={YOUTUBE_EMBED_URL}
                title="Furaha Ministries Mission Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0 absolute inset-0 z-20"
              />
            ) : (
              <div
                role="button"
                tabIndex={0}
                aria-label="Play Furaha Ministries Mission Overview Video"
                onClick={() => setIsPlaying(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsPlaying(true);
                  }
                }}
                className="relative w-full h-full cursor-pointer focus:outline-hidden focus-visible:ring-4 focus-visible:ring-[#893d2d]/60 select-none group"
              >
                {/* Thumbnail Image with fallback */}
                <img
                  src={
                    thumbLoaded
                      ? `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`
                      : `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`
                  }
                  onError={() => setThumbLoaded(false)}
                  alt="Furaha Ministries Mission Overview Video Preview"
                  className="w-full h-full object-cover"
                />

                {/* Ultra-subtle sheer glass overlay */}
                <div className="absolute inset-0 bg-black/10" />

                {/* Ghost Glass Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div
                    className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-white/[0.15] backdrop-blur-xs border border-white/40 shadow-sm flex items-center justify-center"
                    aria-label="Play Furaha Ministries Mission Overview Video"
                  >
                    <Play className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-white/90 text-white/90 translate-x-0.5 drop-shadow-sm" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Bar - Proportional & Responsive on Mobile */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 max-w-sm sm:max-w-none mx-auto w-full px-2 sm:px-0">
          <div className="flex flex-col min-[420px]:flex-row items-stretch min-[420px]:items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {onOpenDonate && (
              <button
                onClick={onOpenDonate}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-full bg-[#893d2d] hover:bg-[#723225] text-white font-medium text-xs sm:text-sm transition-all shadow-xs active:scale-98"
              >
                <Heart className="w-3.5 h-3.5 fill-white shrink-0" />
                <span>Sponsor a Child or Donate</span>
              </button>
            )}

            <a
              href="#story"
              onClick={scrollToStory}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:px-4.5 sm:py-2.5 rounded-full bg-white hover:bg-neutral-50 text-[#893d2d] font-medium text-xs sm:text-sm transition-all border border-[#ebdcd0] shadow-2xs active:scale-98"
            >
              <span>Read Our Full Story</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          {onOpenVolunteer && (
            <button
              onClick={onOpenVolunteer}
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 sm:py-2 rounded-full text-neutral-600 hover:text-[#893d2d] font-medium text-xs sm:text-sm transition-colors"
            >
              <span>Get Involved as a Volunteer</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
