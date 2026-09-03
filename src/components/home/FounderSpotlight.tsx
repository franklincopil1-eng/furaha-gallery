import React from 'react';
import { motion } from 'motion/react';

export const FounderSpotlight: React.FC = () => {
  return (
    <section className="about-section section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 350x400 Image with subtle floating focus entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-[320px] sm:w-[350px] h-[380px] sm:h-[400px] rounded-[20px] overflow-hidden shadow-xl border border-gray-100 group relative bg-[#f0eae1]">
              <picture>
                <source srcSet="/images/maggienew2.webp" type="image/webp" />
                <img
                  src="/images/maggienew2.jpg"
                  alt="Maggie Mburu - Founder of Furaha Ministries"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop';
                  }}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Column: Text Block with refined editorial typography wipe */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 py-6 sm:py-10 px-4 sm:px-10"
          >
            <h2
              id="founder-name"
              className="text-[36px] sm:text-[42px] md:text-[46px] font-semibold text-[#893d2d] tracking-[-2px] mb-1"
            >
              Maggie Mburu
            </h2>
            <p
              id="founder-role"
              className="text-[#893d2d]/80 font-medium tracking-wide uppercase text-[14px] mb-6"
            >
              Founder
            </p>

            <div className="space-y-4 text-[#717275] text-[16px] leading-[1.7] font-light">
              <p>
                As a young girl, I dreamed of caring for children in need. Though that vision evolved, God led me to help one child at a time.
              </p>
              <p>
                Through prayer and encouragement, He opened doors for me to serve—and Furaha became the gift through which I live out that calling.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
