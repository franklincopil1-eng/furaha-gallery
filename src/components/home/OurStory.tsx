import React from 'react';
import { motion } from 'motion/react';

export const OurStory: React.FC = () => {
  return (
    <section className="section-padding section-bg overflow-hidden" id="story">
      <div id="section_2" className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Image with soft scale reveal */}
          <motion.div
            initial={{ opacity: 0, x: -35, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-stretch"
          >
            <div className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] overflow-hidden rounded-[20px] bg-[#f0eae1]">
              <picture>
                <source srcSet="/images/group-people-volunteering-foodbank-poor-people.webp" type="image/webp" />
                <img
                  src="/images/group-people-volunteering-foodbank-poor-people.jpg"
                  alt="Volunteers and community working together at Furaha Ministries"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop';
                  }}
                  className="custom-text-box-image shadow-md hover:scale-105 transition-transform duration-700 ease-out"
                />
              </picture>
            </div>
          </motion.div>

          {/* Right Column: Story Copy & Stacked Mission/Vision Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Top Main Card: Our Story with lateral slide */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="custom-text-box shadow-sm"
            >
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#893d2d]/10 text-[#893d2d] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5">
                <span>Why We Exist</span>
              </div>

              <h2
                id="our-story-title"
                className="text-[36px] sm:text-[42px] lg:text-[46px] font-semibold text-[#893d2d] tracking-[-2px] mb-2 leading-tight"
              >
                Our Story
              </h2>
              <h5
                id="our-story-subtitle"
                className="text-[16px] min-[360px]:text-[18px] sm:text-[22px] lg:text-[24px] font-semibold text-[#893d2d] mb-3 sm:mb-4 tracking-[-0.5px] sm:tracking-[-1px] leading-snug"
              >
                Furaha Ministries, Non-Profit Organization
              </h5>

              <div className="space-y-4 text-[#717275] text-[16px] leading-[1.65] font-light">
                <p>
                  Furaha ministries was founded with a passion to serve the neediest of the needy that may be overlooked. We focus on orphans, abandoned children and youth at risk - and offer holistic support that nurtures their body mind and spirit.
                </p>
                <p>
                  Our programs are tailored to meeting critical community needs by partnering with schools, children’s programs, churches and clinics. We walk with each child and young person through their journey of healing growth and empowerment.
                </p>
              </div>
            </motion.div>

            {/* Bottom 2 Cards: Mission & Vision with staggered flip-up */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                id="card-mission"
                className="custom-text-box shadow-sm !mb-0 border border-transparent hover:border-[#ebdcd0]"
              >
                <h5 className="text-[24px] font-semibold text-[#893d2d] tracking-[-1px] mb-3">
                  Mission
                </h5>
                <p className="text-[#717275] text-[16px] font-light leading-relaxed">
                  To provide a bridge that furnish a sustainable, spiritual, nutritional and educational growth to overlooked children in Kenya.
                </p>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                id="card-vision"
                className="custom-text-box shadow-sm !mb-0 border border-transparent hover:border-[#ebdcd0]"
              >
                <h5 className="text-[24px] font-semibold text-[#893d2d] tracking-[-1px] mb-3">
                  Vision
                </h5>
                <p className="text-[#717275] text-[16px] font-light leading-relaxed">
                  A Kenya where overlooked children are spiritually transformed and practically equipped in an environment that can sustain them.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
