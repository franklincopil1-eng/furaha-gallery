import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface ImpactBannerProps {
  onOpenDonate: () => void;
}

export const ImpactBanner: React.FC<ImpactBannerProps> = ({ onOpenDonate }) => {
  return (
    <section className="cta-section section-padding section-bg relative overflow-hidden">
      {/* Decorative background dynamic ambient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/40 pointer-events-none blur-2xl"
      />
      <motion.div
        animate={{
          scale: [1.15, 1, 1.15],
          opacity: [0.4, 0.65, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#f4b83e]/20 pointer-events-none blur-2xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-center">
          {/* Left Column: Headline with subtle kinetic punch */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8 text-center md:text-left"
          >
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
              Make a difference.
            </h2>
          </motion.div>

          {/* Right Column: High-energy magnetic CTA button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 flex justify-center md:justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              id="impact-give-btn"
              onClick={onOpenDonate}
              className="custom-btn custom-btn-primary !text-[18px] !py-[15px] !px-[28px] shadow-lg hover:shadow-2xl transition-shadow cursor-pointer flex items-center gap-2 group"
            >
              <Heart className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
              <span>Give to Furaha</span>
              <Sparkles className="w-4 h-4 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
