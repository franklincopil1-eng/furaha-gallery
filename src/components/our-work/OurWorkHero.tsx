import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight, Heart, Utensils, BookOpen, HeartHandshake, Compass } from 'lucide-react';

interface OurWorkHeroProps {
  onPrimaryCtaClick: () => void;
  onSecondaryCtaClick: () => void;
  onNavigateToHome?: () => void;
  onSelectPillar?: (pillarId: string) => void;
}

export const OurWorkHero: React.FC<OurWorkHeroProps> = ({
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  onNavigateToHome,
  onSelectPillar,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Direct scroll tracking for zero-latency response from the very first pixel
  const { scrollY } = useScroll();

  // Deepened, fluid documentary parallax that starts immediately and prevents edge clipping/hanging
  const imageY = useTransform(
    scrollY,
    [-100, 0, 500],
    prefersReducedMotion ? [0, 0, 0] : [-30, 0, 160],
    { clamp: false }
  );
  const imageScale = useTransform(
    scrollY,
    [-100, 0, 500],
    prefersReducedMotion ? [1, 1, 1] : [1.06, 1.02, 1.15],
    { clamp: false }
  );
  const contentOpacity = useTransform(scrollY, [0, 320], [1, 0.05], { clamp: false });
  const contentY = useTransform(
    scrollY,
    [-100, 0, 450],
    prefersReducedMotion ? [0, 0, 0] : [15, 0, -50],
    { clamp: false }
  );

  const scrollToPillar = (pillarId: string) => {
    if (onSelectPillar) {
      onSelectPillar(pillarId);
    } else {
      const el = document.getElementById(`work-area-${pillarId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      aria-label="Our Work in Kenya"
      className="relative w-full min-h-[46vh] sm:min-h-[50vh] md:min-h-[52vh] max-h-[540px] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#3a1a13] via-[#3a1a13] 70% to-[#faf8f5] text-white"
    >
      {/* 1. Immersive Edge-to-Edge Documentary Photograph with Deep Parallax & Bleed Protection */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 62%, rgba(0, 0, 0, 0.75) 76%, rgba(0, 0, 0, 0.25) 90%, rgba(0, 0, 0, 0) 100%)',
          maskImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 62%, rgba(0, 0, 0, 0.75) 76%, rgba(0, 0, 0, 0.25) 90%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <motion.div
          style={{
            y: imageY,
            scale: imageScale,
          }}
          className="absolute -top-[160px] -left-[6%] -right-[6%] w-[112%] h-[calc(100%+320px)] will-change-transform"
        >
          <picture className="w-full h-full block">
            <source srcSet="/Purity.webp" type="image/webp" />
            <img
              src="/Purity.jpg"
              alt="Teacher Purity and students in Kenya supported by Furaha Ministries"
              className="w-full h-full object-cover object-[center_30%] scale-[1.03] filter blur-[1px] sm:blur-[1.5px]"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </motion.div>

        {/* Warm Furaha Earth Brown Overlays */}
        <div className="absolute inset-0 bg-[#4a2219]/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3a1a13]/60 via-[#3a1a13]/25 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3a1a13]/40 via-transparent to-[#3a1a13]/25 pointer-events-none" />

        {/* Seamless Warm-Toned Photographic Bleed */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 sm:h-32 md:h-36 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(to bottom, rgba(250, 248, 245, 0) 0%, rgba(74, 34, 25, 0.08) 25%, rgba(137, 61, 45, 0.16) 50%, rgba(220, 203, 189, 0.65) 75%, rgba(245, 240, 234, 0.92) 90%, #faf8f5 100%)',
          }}
        />
      </div>

      {/* 2. Top Minimal Bar with Clean, Balanced Hierarchy */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 flex items-center justify-between text-xs text-[#f7e4b7]/90 font-sans">
        <button
          type="button"
          onClick={onNavigateToHome}
          className="inline-flex items-center gap-1.5 text-[#f7e4b7]/90 hover:text-white transition-colors cursor-pointer group py-1 focus-visible:outline-2 focus-visible:outline-[#f7e4b7] rounded shrink-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
          aria-label="Return to Home Overview"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span className="font-medium tracking-wide">Home</span>
        </button>

        {/* Centered Top Eyebrow - Clean & Proportionate */}
        <div className="text-center px-2">
          <p
            id="our-work-eyebrow"
            className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#f7e4b7] uppercase font-sans drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]"
          >
            OUR WORK
          </p>
        </div>

        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#f7e4b7]/85 hidden sm:block shrink-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] font-sans">
          KENYA
        </span>
        <div className="sm:hidden w-12 shrink-0" aria-hidden="true" />
      </div>

      {/* 3. Streamlined Centered Editorial Typography - Shifted Higher Up with Pillars */}
      <div className="relative z-10 max-w-2xl w-full mx-auto px-4 sm:px-6 mt-1 sm:mt-2 mb-auto py-2 sm:py-3 text-center font-sans">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="will-change-transform mx-auto"
        >
          {/* Headline - Plus Jakarta Sans, font-semibold, tracking-tight */}
          <motion.h1
            id="our-work-headline"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-[-1px] sm:tracking-[-1.5px] leading-tight mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] font-sans"
          >
            Four Pillars of Care
          </motion.h1>

          {/* Supporting Text - 1 concise line */}
          <motion.p
            id="our-work-subheadline"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-[#f7e4b7] text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed max-w-lg mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.75)] mb-3 font-sans"
          >
            Education, nutrition, discipleship, and mentorship working together in Kenya.
          </motion.p>

          {/* Compact Dual Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          >
            <button
              type="button"
              onClick={onPrimaryCtaClick}
              id="our-work-primary-cta"
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#893d2d] hover:bg-[#733123] text-white font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg cursor-pointer inline-flex items-center gap-1.5 active:scale-95 border border-[#893d2d] focus-visible:outline-2 focus-visible:outline-[#f7e4b7]"
            >
              <Heart className="w-3.5 h-3.5 fill-white text-white" />
              <span>Support the Work</span>
            </button>
            <button
              type="button"
              onClick={onSecondaryCtaClick}
              id="our-work-secondary-cta"
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[#f7e4b7]/40 bg-black/40 hover:bg-black/60 hover:border-[#f7e4b7] text-[#f7e4b7] hover:text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-[#f7e4b7]"
            >
              <span>See Impact</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#f7e4b7]" />
            </button>
          </motion.div>

          {/* Restored Pillar Jump Chips with Complementing Icons */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-3 sm:mt-3.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
          >
            {[
              { id: 'learn', label: '01 Learn', icon: BookOpen },
              { id: 'eat', label: '02 Eat', icon: Utensils },
              { id: 'grow', label: '03 Grow', icon: HeartHandshake },
              { id: 'believe', label: '04 Believe', icon: Compass },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => scrollToPillar(p.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-xs text-[#f7e4b7] hover:text-white border border-[#f7e4b7]/30 hover:border-[#f7e4b7]/60 text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 font-sans"
                >
                  <Icon className="w-3.5 h-3.5 text-[#f7e4b7]" />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle bottom breathing space */}
      <div className="relative z-10 h-3 sm:h-5" aria-hidden="true" />
    </section>
  );
};
