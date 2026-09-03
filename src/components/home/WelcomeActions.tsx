import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, GraduationCap, Users, Gift } from 'lucide-react';

interface WelcomeActionsProps {
  onOpenDonate: () => void;
  onOpenVolunteer: () => void;
  onOpenScholarship: () => void;
}

const welcomeContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const welcomeCard = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const WelcomeActions: React.FC<WelcomeActionsProps> = ({
  onOpenDonate,
  onOpenVolunteer,
  onOpenScholarship,
}) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImgError = (key: string) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
  };

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
    <section id="welcome" className="relative z-30 bg-white py-16 px-4 sm:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header with smooth upward reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          <h2
            id="welcome-title-1"
            className="text-[36px] sm:text-[42px] md:text-[46px] font-semibold text-[#893d2d] tracking-[-2px] leading-tight mb-2"
          >
            Welcome to Furaha Ministries,
          </h2>
          <h2
            id="welcome-title-2"
            className="text-[32px] sm:text-[38px] md:text-[42px] font-semibold text-[#893d2d] tracking-[-2px] leading-tight"
          >
            Reaching the Overlooked Across Africa
          </h2>
        </motion.div>

        {/* 4 Feature Action Cards Grid with staggered upward cascade */}
        <motion.div
          variants={welcomeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {/* 1. Our Story @Furaha */}
          <motion.a
            variants={welcomeCard}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
            whileTap={{ scale: 0.98 }}
            href="#story"
            onClick={scrollToStory}
            id="action-card-story"
            className="featured-block cursor-pointer flex flex-col justify-center items-center group rounded-2xl hover:bg-neutral-50 p-6 transition-all border border-transparent hover:border-[#ebdcd0]/50"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-3">
              {!imgErrors['heart'] ? (
                <img
                  src="/images/heart.png"
                  alt="Our Story @Furaha"
                  onError={() => handleImgError('heart')}
                  className="featured-block-image img-fluid w-20 h-20 sm:w-24 sm:h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#faedd0] flex items-center justify-center text-[#893d2d] group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-10 h-10 fill-[#893d2d]" />
                </div>
              )}
            </div>
            <h5 className="featured-block-text !text-[20px] !text-[#893d2d] font-semibold">
              Our Story <span className="font-normal text-[#717275]">@Furaha</span>
            </h5>
          </motion.a>

          {/* 2. Scholarship Program */}
          <motion.button
            variants={welcomeCard}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenScholarship}
            id="action-card-scholarship"
            className="featured-block cursor-pointer flex flex-col justify-center items-center group rounded-2xl hover:bg-neutral-50 p-6 transition-all border border-transparent hover:border-[#ebdcd0]/50 text-center"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-3">
              {!imgErrors['scholarship'] ? (
                <img
                  src="/images/scholarship1.png"
                  alt="Scholarship Program"
                  onError={() => handleImgError('scholarship')}
                  className="featured-block-image img-fluid w-20 h-20 sm:w-24 sm:h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#faedd0] flex items-center justify-center text-[#893d2d] group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-10 h-10 stroke-[2.2]" />
                </div>
              )}
            </div>
            <h5 className="featured-block-text !text-[20px] !text-[#893d2d] font-semibold">
              Scholarship Program
            </h5>
          </motion.button>

          {/* 3. Become a volunteer */}
          <motion.button
            variants={welcomeCard}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenVolunteer}
            id="action-card-volunteer"
            className="featured-block cursor-pointer flex flex-col justify-center items-center group rounded-2xl hover:bg-neutral-50 p-6 transition-all border border-transparent hover:border-[#ebdcd0]/50 text-center"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-3">
              {!imgErrors['hands'] ? (
                <img
                  src="/images/hands1.png"
                  alt="Become a volunteer"
                  onError={() => handleImgError('hands')}
                  className="featured-block-image img-fluid w-20 h-20 sm:w-24 sm:h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#faedd0] flex items-center justify-center text-[#893d2d] group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 stroke-[2.2]" />
                </div>
              )}
            </div>
            <h5 className="featured-block-text !text-[20px] !text-[#893d2d] font-semibold">
              Become a volunteer
            </h5>
          </motion.button>

          {/* 4. Give to Furaha */}
          <motion.button
            variants={welcomeCard}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenDonate}
            id="action-card-donate"
            className="featured-block cursor-pointer flex flex-col justify-center items-center group rounded-2xl hover:bg-neutral-50 p-6 transition-all border border-transparent hover:border-[#ebdcd0]/50 text-center"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-3">
              {!imgErrors['receive'] ? (
                <img
                  src="/images/receive1.png"
                  alt="Give to Furaha"
                  onError={() => handleImgError('receive')}
                  className="featured-block-image img-fluid w-20 h-20 sm:w-24 sm:h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#faedd0] flex items-center justify-center text-[#893d2d] group-hover:scale-110 transition-transform duration-300">
                  <Gift className="w-10 h-10 stroke-[2.2]" />
                </div>
              )}
            </div>
            <h5 className="featured-block-text !text-[20px] !text-[#893d2d] font-semibold">
              Give to Furaha
            </h5>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
