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
      className="relative w-full bg-gradient-to-b from-[#140804] via-[#1e0f0a] to-[#110502] text-white py-24 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#ebdcd0]/10"
    >
      {/* 1. Deep Multi-Layered Atmosphere & Golden Hour Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(circle 700px at 50% 50%, rgba(137, 61, 45, 0.28) 0%, rgba(229, 179, 130, 0.12) 35%, transparent 75%),
            radial-gradient(circle 450px at 20% 20%, rgba(229, 179, 130, 0.14) 0%, transparent 70%),
            radial-gradient(circle 500px at 80% 80%, rgba(137, 61, 45, 0.2) 0%, transparent 70%)
          `,
        }}
      />

      {/* 2. Ghosted Photographic Heritage Layer (Field Fellowship Moment) */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07] mix-blend-luminosity"
        aria-hidden="true"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 65% at 50% 50%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 50%, black 20%, transparent 85%)',
        }}
      >
        <img
          src="/images/discipleship-kibera-church.jpg"
          alt=""
          className="w-full h-full object-cover object-center scale-105 filter blur-[1px]"
        />
      </div>

      {/* 3. Subtle Museum Archival Micro-Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(229, 179, 130, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229, 179, 130, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 30%, transparent 85%)',
        }}
      />

      {/* 4. Fine Analog Film Grain Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* 5. Curatorial Registration Marks */}
      <div className="max-w-5xl mx-auto absolute inset-x-4 sm:inset-x-8 top-12 bottom-12 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-0">
          <span className="inline-block w-2.5 h-2.5 border-t border-l border-[#e5b382]/40" />
        </div>
        <div className="absolute top-0 right-0 flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#e5b382]/30 uppercase">
          <span>FURAHIA MAISHA // ONGOING IMPACT</span>
          <span className="inline-block w-2.5 h-2.5 border-t border-r border-[#e5b382]/40" />
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block w-2.5 h-2.5 border-b border-l border-[#e5b382]/40" />
        </div>
        <div className="absolute bottom-0 right-0">
          <span className="inline-block w-2.5 h-2.5 border-b border-r border-[#e5b382]/40" />
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Curated Eyebrow Badge with Radiant Amber Beacon */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#e5b382]/25 shadow-[0_0_20px_rgba(229,179,130,0.12)] backdrop-blur-md text-[#e5b382] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e5b382] shadow-[0_0_8px_#e5b382] animate-pulse" />
          <span>Furahia Maisha · Join the Mission</span>
        </div>

        {/* Main Title — Section 2 font size and style */}
        <h2 className="text-[36px] sm:text-[42px] lg:text-[46px] font-semibold text-white tracking-[-2px] mb-2 leading-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]">
          See the Work. Become Part of the Story.
        </h2>

        {/* Subtitle — Section 2 font size and style */}
        <h5 className="text-[16px] min-[360px]:text-[18px] sm:text-[22px] lg:text-[24px] font-semibold text-[#e5b382] mb-3 sm:mb-4 tracking-[-0.5px] sm:tracking-[-1px] leading-snug drop-shadow-[0_1px_10px_rgba(229,179,130,0.25)]">
          Furaha Ministries, Non-Profit Organization
        </h5>

        {/* Body Copy — Section 2 font size */}
        <p className="text-white/85 text-[16px] leading-[1.65] font-light max-w-xl mx-auto mb-8">
          Every photograph represents a real community, a real moment, and ongoing work that continues beyond the frame.
        </p>

        {/* Action Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {onNavigateToDonate && (
            <button
              onClick={() => onNavigateToDonate()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-[15px] font-semibold tracking-wider text-[#1e0f0a] bg-[#e5b382] hover:bg-[#d69f6c] transition-all cursor-pointer shadow-[0_10px_25px_-5px_rgba(229,179,130,0.4)] hover:scale-[1.02] active:scale-[0.99]"
            >
              <Heart className="w-4 h-4 fill-current text-[#893d2d]" />
              <span>Give to Furaha</span>
            </button>
          )}

          {onNavigateToOurWork && (
            <button
              onClick={onNavigateToOurWork}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-medium tracking-wider text-white hover:text-white border border-white/20 hover:border-[#e5b382] hover:bg-white/[0.08] backdrop-blur-xs transition-all cursor-pointer"
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
