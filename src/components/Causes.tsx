import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Heart, X, Check } from 'lucide-react';

interface CauseItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  impactMetrics: string[];
  imageUrl: string;
  raisedPercent: number;
}

interface CausesProps {
  onOpenDonateForCause: (causeTitle: string) => void;
}

const causesContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const causeCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const Causes: React.FC<CausesProps> = ({ onOpenDonateForCause }) => {
  const [activeCauseModal, setActiveCauseModal] = useState<CauseItem | null>(null);

  const causes: CauseItem[] = [
    {
      id: 'nutrition',
      title: 'Nutrition',
      shortDesc: 'Providing nutritious meals and clean drinking water to combat malnutrition and ensure children have the physical strength to learn and thrive.',
      fullDesc: 'Proper nutrition is the cornerstone of healthy childhood development. Without consistent daily food, children struggle to focus in school and face severe immune vulnerabilities. Furaha Ministries partners with local schools and community feeding centers to provide balanced, nutrient-dense meals every single day.',
      impactMetrics: [
        'Over 1,200 nutritious hot meals served monthly',
        'Direct partnerships with primary school feeding centers',
        'Clean water filtration and vitamin supplementation programs'
      ],
      imageUrl: '/Nutrition.png',
      raisedPercent: 78
    },
    {
      id: 'education',
      title: 'Education',
      shortDesc: 'Breaking cycles of poverty through tuition support, tailored scholarships, essential school supplies, backpacks, and dignity-affirming uniforms.',
      fullDesc: 'Education is the most reliable ladder out of intergenerational poverty. However, thousands of overlooked children in Kenya are turned away from schools due to lack of uniforms, shoes, or basic tuition fees. We equip students with full learning kits, enroll them in vetted schools, and provide academic tutoring.',
      impactMetrics: [
        '100% comprehensive scholarship sponsorship for vetted orphans',
        'Annual distribution of uniforms, leather shoes, and backpacks',
        'After-school literacy circles and computer literacy workshops'
      ],
      imageUrl: '/DSCF0817.jpg',
      raisedPercent: 92
    },
    {
      id: 'discipleship',
      title: 'Discipleship',
      shortDesc: 'Nurturing spiritual resilience, character formation, and emotional healing through Christ-centered mentorship and community fellowship.',
      fullDesc: 'Material relief alone does not heal a wounded spirit. Many abandoned and orphaned children carry trauma and feelings of worthlessness. Through weekly Bible study clubs, compassionate youth mentorship, and local church partnerships, Furaha Ministries instills deep faith, purpose, and lasting joy.',
      impactMetrics: [
        'Weekly youth fellowship and Bible discovery groups',
        'Trauma-informed Christian counseling and pastoral care',
        'Community service and peer-leadership development training'
      ],
      imageUrl: '/video_frame_blessing.jpg',
      raisedPercent: 85
    }
  ];

  return (
    <section className="section-padding bg-[#faf8f5] overflow-hidden" id="causes">
      <div id="section_3" className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Heading Center Aligned with reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2
            id="causes-title"
            className="text-[36px] sm:text-[42px] md:text-[46px] font-semibold text-[#893d2d] tracking-[-2px] mb-3"
          >
            Our Causes
          </h2>
          <p className="text-[16px] text-[#717275] font-light leading-relaxed">
            Addressing the deep, interrelated needs of body, mind, and soul to bring comprehensive transformation.
          </p>
        </motion.div>

        {/* 3 Cause Cards Row with staggered entrance & spring cards */}
        <motion.div
          variants={causesContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {causes.map((cause) => (
            <motion.div
              key={cause.id}
              variants={causeCardVariants}
              whileHover={{ y: -8, transition: { duration: 0.28, ease: 'easeOut' } }}
              id={`cause-card-${cause.id}`}
              className="custom-block-wrap shadow-sm flex flex-col justify-between rounded-[20px] overflow-hidden border border-black/[0.04] hover:shadow-xl transition-shadow duration-300"
            >
              <div>
                {/* Image on top */}
                <div className="w-full h-56 sm:h-64 overflow-hidden relative group bg-[#f0eae1]">
                  <picture>
                    <source
                      srcSet={cause.imageUrl.replace(/\.(png|jpg|jpeg)$/i, '.webp')}
                      type="image/webp"
                    />
                    <img
                      src={cause.imageUrl}
                      alt={cause.title}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          cause.id === 'education'
                            ? 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop'
                            : cause.id === 'discipleship'
                            ? 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop'
                            : 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop';
                      }}
                      className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                  </picture>
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#893d2d] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                      {cause.title}
                    </span>
                  </div>
                </div>

                {/* Card Body with 30px padding */}
                <div className="custom-block-body">
                  <h5 className="text-[24px] font-semibold text-[#893d2d] tracking-[-1px] mb-3">
                    {cause.title}
                  </h5>
                  <p className="text-[#717275] text-[16px] leading-[1.65] font-light">
                    {cause.shortDesc}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-7 pb-7 pt-2 border-t border-gray-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveCauseModal(cause)}
                  className="text-xs sm:text-sm font-semibold text-[#893d2d] hover:text-[#733123] flex items-center gap-1.5 cursor-pointer group"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenDonateForCause(cause.title)}
                  className="custom-btn !py-2 !px-4 !text-xs !font-semibold cursor-pointer shadow-xs hover:shadow-md transition-shadow"
                >
                  <Heart className="w-3 h-3 fill-current mr-1" />
                  <span>Support</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Cause Detail Modal with spring pop-in */}
      <AnimatePresence>
        {activeCauseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-[20px] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveCauseModal(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full h-48 rounded-xl overflow-hidden mb-5">
                <img
                  src={activeCauseModal.imageUrl}
                  alt={activeCauseModal.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      activeCauseModal.id === 'education'
                        ? 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop'
                        : activeCauseModal.id === 'discipleship'
                        ? 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop'
                        : 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-[28px] font-semibold text-[#893d2d] tracking-[-1px] mb-3">
                {activeCauseModal.title} Cause
              </h3>

              <p className="text-[#717275] text-[16px] leading-[1.65] font-light mb-6">
                {activeCauseModal.fullDesc}
              </p>

              <div className="bg-[#f7e4b7]/50 rounded-xl p-4 sm:p-5 mb-6 border border-[#f0dfb8]">
                <h4 className="text-sm font-bold text-[#893d2d] uppercase tracking-wider mb-3">
                  Key Initiatives & Outcomes
                </h4>
                <ul className="space-y-2.5">
                  {activeCauseModal.impactMetrics.map((metric, i) => (
                    <li key={i} className="text-xs sm:text-sm text-[#444] flex items-start gap-2.5 font-normal">
                      <Check className="w-4 h-4 text-[#893d2d] shrink-0 mt-0.5" />
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveCauseModal(null)}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = activeCauseModal.title;
                    setActiveCauseModal(null);
                    onOpenDonateForCause(title);
                  }}
                  className="custom-btn custom-btn-primary !py-2.5 !px-6 text-sm font-semibold cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white mr-1.5" />
                  <span>Give to {activeCauseModal.title}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
