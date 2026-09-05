import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';

interface GalleryClosingCTAProps {
  onNavigateToDonate?: (cause?: string) => void;
  onNavigateToOurWork?: () => void;
}

export const GalleryClosingCTA: React.FC<GalleryClosingCTAProps> = ({
  onNavigateToDonate,
  onNavigateToOurWork,
}) => {
  return (
    <section
      aria-label="Become part of the story"
      className="relative w-full bg-[#1e0f0a] text-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#ebdcd0]/10"
    >
      {/* Warm Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#893d2d]/25 blur-[130px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#e5b382]/90 mb-4">
          FURAHIA MAISHA / JOIN THE MISSION
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white leading-[1.08] uppercase">
          See the work.<br />
          <span className="italic font-light text-[#e5b382]/95">Become part of the story.</span>
        </h2>

        <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-white/75 max-w-xl mx-auto font-normal leading-relaxed">
          Every photograph represents a real community, a real moment, and ongoing work that continues beyond the frame.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {onNavigateToDonate && (
            <button
              onClick={() => onNavigateToDonate()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-[#1e0f0a] bg-[#e5b382] hover:bg-[#d69f6c] transition-all cursor-pointer shadow-lg shadow-black/40 hover:scale-[1.02]"
            >
              <Heart className="w-4 h-4 fill-current text-[#893d2d]" />
              <span>Give to Furaha</span>
            </button>
          )}

          {onNavigateToOurWork && (
            <button
              onClick={onNavigateToOurWork}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-wider text-white hover:text-white border border-white/20 hover:border-[#e5b382]/60 hover:bg-white/5 transition-all cursor-pointer"
            >
              <span>Learn About Our Work</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#e5b382]" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
