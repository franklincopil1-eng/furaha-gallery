import React from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight } from 'lucide-react';

interface ImpactBannerProps {
  onOpenDonate: () => void;
}

export const ImpactBanner: React.FC<ImpactBannerProps> = ({ onOpenDonate }) => {
  return (
    <section className="cta-section section-padding section-bg relative overflow-hidden">
      {/* Decorative subtle ambient warm background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-center">
          {/* Left Column: Headline */}
          <div className="md:col-span-8 text-center md:text-left">
            <h2
              id="impact-banner-title-1"
              className="text-[36px] sm:text-[42px] md:text-[46px] font-semibold text-[#893d2d] tracking-[-2px] leading-tight"
            >
              Make an impact.
            </h2>
            <h2
              id="impact-banner-title-2"
              className="text-[36px] sm:text-[42px] md:text-[46px] font-semibold text-[#893d2d] tracking-[-2px] leading-tight"
            >
              Support children in Kenya.
            </h2>
          </div>

          {/* Right Column: CTA button */}
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <button
              id="impact-give-btn"
              onClick={onOpenDonate}
              className="custom-btn custom-btn-primary !text-[18px] !py-[15px] !px-[28px] shadow-md hover:shadow-lg transition-shadow cursor-pointer flex items-center gap-2.5 group"
            >
              <Heart className="w-5 h-5 fill-white group-hover:scale-105 transition-transform" />
              <span>Give to Furaha</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
