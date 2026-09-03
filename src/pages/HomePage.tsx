import React from 'react';
import { motion, Variants } from 'motion/react';
import {
  Hero,
  WelcomeActions,
  OurStory,
  FounderSpotlight,
  Causes,
  TestimonialSection,
  ContactSection,
  ImpactBanner,
} from '../components/home';

interface HomePageProps {
  onOpenDonate: (options?: { cause?: string; amount?: number }) => void;
  onOpenVolunteer: () => void;
  onOpenScholarship: () => void;
}

const sectionFadeVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const HomePage: React.FC<HomePageProps> = ({
  onOpenDonate,
  onOpenVolunteer,
  onOpenScholarship,
}) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex-1"
    >
      {/* 1. Hero Section: Cinematic slideshow with pinned background & rising text */}
      <Hero onOpenDonateModal={() => onOpenDonate()} />

      {/* 2. Overlapping Content Sheet: Gradually scrolls up over the pinned hero image */}
      <div className="relative z-20 bg-[#fdfbf9] shadow-[0_-25px_60px_rgba(0,0,0,0.22)] rounded-t-[32px] sm:rounded-t-[44px] overflow-hidden -mt-8 sm:-mt-14 pt-4 sm:pt-8 border-t border-white/60">
        {/* Welcome & 4 Feature Action Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionFadeVariants}
        >
          <WelcomeActions
            onOpenDonate={() => onOpenDonate()}
            onOpenVolunteer={onOpenVolunteer}
            onOpenScholarship={onOpenScholarship}
          />
        </motion.div>

        {/* Our Story Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionFadeVariants}
        >
          <OurStory />
        </motion.div>

        {/* Founder Spotlight */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionFadeVariants}
        >
          <FounderSpotlight />
        </motion.div>

        {/* Our Causes: Nutrition, Education, Discipleship */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionFadeVariants}
        >
          <Causes
            onOpenDonateForCause={(cause) =>
              onOpenDonate({
                cause,
                amount: cause.toLowerCase().includes('education') ? 30 : 15,
              })
            }
          />
        </motion.div>

        {/* Testimonials Section: Carousel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionFadeVariants}
        >
          <TestimonialSection />
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionFadeVariants}
        >
          <ContactSection />
        </motion.div>

        {/* Impact Banner: "Make an impact. Make a difference." */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionFadeVariants}
        >
          <ImpactBanner onOpenDonate={() => onOpenDonate()} />
        </motion.div>
      </div>
    </motion.main>
  );
};
