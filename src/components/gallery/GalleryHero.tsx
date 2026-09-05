import React from 'react';
import { GALLERY_ITEMS } from './galleryData';

interface GalleryHeroProps {
  onScrollToGallery?: () => void;
}

export const GalleryHero: React.FC<GalleryHeroProps> = ({
  onScrollToGallery,
}) => {
  return (
    <section
      aria-label="Gallery Hero"
      className="relative w-full bg-gradient-to-b from-[#140804] via-[#1e0f0a] to-[#120603] text-white pt-28 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#ebdcd0]/10"
    >
      {/* 1. Deep Multi-Layered Atmosphere & Golden Hour Horizon Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 900px 450px at 50% -10%, rgba(229, 179, 130, 0.18) 0%, rgba(137, 61, 45, 0.15) 45%, transparent 80%),
            radial-gradient(circle 650px at 50% 55%, rgba(137, 61, 45, 0.22) 0%, transparent 70%),
            radial-gradient(circle 420px at 15% 85%, rgba(137, 61, 45, 0.16), transparent 70%),
            radial-gradient(circle 450px at 85% 25%, rgba(229, 179, 130, 0.12), transparent 75%)
          `,
        }}
      />

      {/* 2. Ghosted Photographic Heritage Layer (Authentic Kenya Field Collage) */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.08] mix-blend-luminosity"
        aria-hidden="true"
        style={{
          maskImage: 'radial-gradient(ellipse 85% 70% at 50% 45%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 45%, black 20%, transparent 85%)',
        }}
      >
        <img
          src="/images/field-outreach-14.jpg"
          alt=""
          className="w-full h-full object-cover object-center scale-105 filter blur-[1px]"
        />
      </div>

      {/* 3. Subtle Museum Archival Micro-Grid & Crosshairs Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(229, 179, 130, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229, 179, 130, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 90%)',
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

      {/* 5. Curatorial Registration Marks (Gallery Exhibition Coordinates) */}
      <div className="max-w-6xl mx-auto absolute inset-x-4 sm:inset-x-8 top-28 bottom-12 pointer-events-none hidden md:block">
        {/* Top-Left Registration Mark */}
        <div className="absolute top-0 left-0 flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#e5b382]/30 uppercase">
          <span className="inline-block w-2.5 h-2.5 border-t border-l border-[#e5b382]/40" />
          <span>FURAHA // ARCHIVE</span>
        </div>
        {/* Top-Right Registration Mark */}
        <div className="absolute top-0 right-0 flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#e5b382]/30 uppercase">
          <span>01°17&apos;S · 36°49&apos;E</span>
          <span className="inline-block w-2.5 h-2.5 border-t border-r border-[#e5b382]/40" />
        </div>
        {/* Bottom-Left Registration Mark */}
        <div className="absolute bottom-0 left-0">
          <span className="inline-block w-2.5 h-2.5 border-b border-l border-[#e5b382]/40" />
        </div>
        {/* Bottom-Right Registration Mark */}
        <div className="absolute bottom-0 right-0">
          <span className="inline-block w-2.5 h-2.5 border-b border-r border-[#e5b382]/40" />
        </div>
      </div>

      {/* Hero Content Stage */}
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <div className="flex flex-col items-center">
          {/* Curated Eyebrow Pill with Radiant Amber Beacon */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#e5b382]/25 shadow-[0_0_20px_rgba(229,179,130,0.12)] backdrop-blur-md text-[#e5b382] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e5b382] shadow-[0_0_8px_#e5b382] animate-pulse" />
            <span>Curated Photographic Archive</span>
          </div>

          {/* Main Title — Section 2 font size and style with soft dimensional shadow */}
          <h1 className="text-[36px] sm:text-[42px] lg:text-[46px] font-semibold text-white tracking-[-2px] mb-2 leading-tight max-w-3xl mx-auto drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]">
            Moments from the Field
          </h1>

          {/* Subtitle — Section 2 font size and style with warm golden glow */}
          <h5 className="text-[16px] min-[360px]:text-[18px] sm:text-[22px] lg:text-[24px] font-semibold text-[#e5b382] mb-3 sm:mb-4 tracking-[-0.5px] sm:tracking-[-1px] leading-snug drop-shadow-[0_1px_10px_rgba(229,179,130,0.25)]">
            Furaha Ministries Field Photography
          </h5>

          {/* Supporting Body Copy — Section 2 font size with balanced line-height */}
          <p className="text-white/85 text-[16px] leading-[1.65] font-light max-w-2xl mx-auto mb-6">
            Photographs from Furaha&apos;s education, nutrition, discipleship, and community programs in Kenya.
          </p>

          {/* Archival Metadata Chip */}
          <div className="inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm text-white/75 text-[15px] font-light shadow-inner">
            <span className="font-semibold text-[#e5b382]">{GALLERY_ITEMS.length} Photographs</span>
            <span className="text-white/30">·</span>
            <span>Documented in Kenya</span>
          </div>

          {/* Explore Trigger Button */}
          {onScrollToGallery && (
            <div className="mt-8 sm:mt-10">
              <button
                onClick={onScrollToGallery}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[14px] sm:text-[15px] font-semibold tracking-wider text-white hover:text-white uppercase transition-all duration-300 cursor-pointer bg-white/[0.05] border border-white/20 hover:border-[#e5b382] hover:bg-white/[0.12] hover:shadow-[0_0_30px_rgba(229,179,130,0.25)] backdrop-blur-xs"
              >
                <span>Explore the stories</span>
                <span className="text-sm font-bold transition-transform duration-300 group-hover:translate-y-0.5 text-[#e5b382]">
                  ↓
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
