/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WelcomeActions } from './components/WelcomeActions';
import { OurStory } from './components/OurStory';
import { FounderSpotlight } from './components/FounderSpotlight';
import { Causes } from './components/Causes';
import { TestimonialSection } from './components/TestimonialSection';
import { ImpactBanner } from './components/ImpactBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DonationLandingPage } from './components/DonationLandingPage';
import { WhoWeServePage } from './components/WhoWeServePage';
import { OurWorkPage } from './components/OurWorkPage';
import { OurImpactPage } from './components/OurImpactPage';
import { GalleryPage } from './components/GalleryPage';
import { DonationModal } from './components/DonationModal';
import { VolunteerModal } from './components/VolunteerModal';
import { ScholarshipModal } from './components/ScholarshipModal';
import { TechStackInspector } from './components/TechStackInspector';

const sectionFadeVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'donate' | 'who-we-serve' | 'our-work' | 'our-impact' | 'gallery'>('home');
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [scholarshipModalOpen, setScholarshipModalOpen] = useState(false);
  const [techStackModalOpen, setTechStackModalOpen] = useState(false);
  const [selectedCauseForDonation, setSelectedCauseForDonation] = useState<string>('Where Needed Most');
  const [selectedFrequencyForDonation, setSelectedFrequencyForDonation] = useState<'monthly' | 'annual' | 'once'>('monthly');
  const [selectedAmountForDonation, setSelectedAmountForDonation] = useState<number | undefined>(undefined);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Handle URL hash routing (e.g. #donate, #who-we-serve, #our-work, #our-impact, or #home)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#donate') {
        setCurrentPage('donate');
      } else if (hash === '#who-we-serve') {
        setCurrentPage('who-we-serve');
      } else if (hash === '#our-work') {
        setCurrentPage('our-work');
      } else if (hash === '#our-impact') {
        setCurrentPage('our-impact');
      } else if (hash === '#gallery') {
        setCurrentPage('gallery');
      } else if (hash === '#home' || hash === '#top' || hash === '') {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Detect active section on scroll for navbar highlights (only when on home page)
  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'story', 'causes', 'impact', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId === 'about' ? 'story' : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Navigate to dedicated donation landing page with optional custom configuration
  const handleNavigateToDonate = (options?: {
    cause?: string;
    frequency?: 'monthly' | 'annual' | 'once';
    amount?: number;
  }) => {
    if (options?.cause) {
      setSelectedCauseForDonation(options.cause);
    } else {
      setSelectedCauseForDonation('Where Needed Most');
    }

    if (options?.frequency) {
      setSelectedFrequencyForDonation(options.frequency);
    } else {
      setSelectedFrequencyForDonation('monthly');
    }

    setSelectedAmountForDonation(options?.amount);
    setCurrentPage('donate');
    window.location.hash = 'donate';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToWhoWeServe = () => {
    setCurrentPage('who-we-serve');
    window.location.hash = 'who-we-serve';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToOurWork = () => {
    setCurrentPage('our-work');
    window.location.hash = 'our-work';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToOurImpact = () => {
    setCurrentPage('our-impact');
    window.location.hash = 'our-impact';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToGallery = () => {
    setCurrentPage('gallery');
    window.location.hash = 'gallery';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToHome = () => {
    setCurrentPage('home');
    window.location.hash = 'top';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (sectionId === 'who-we-serve') {
      handleNavigateToWhoWeServe();
      return;
    }
    if (sectionId === 'our-work') {
      handleNavigateToOurWork();
      return;
    }
    if (sectionId === 'our-impact') {
      handleNavigateToOurImpact();
      return;
    }
    if (sectionId === 'gallery') {
      handleNavigateToGallery();
      return;
    }

    setCurrentPage('home');
    const targetHash = sectionId === 'story' ? 'section_2' : sectionId === 'causes' ? 'section_3' : sectionId === 'impact' ? 'section_4' : sectionId === 'contact' ? 'section_6' : 'top';
    window.location.hash = targetHash;

    setTimeout(() => {
      let targetId = 'home';
      if (sectionId === 'story') targetId = 'section_2';
      else if (sectionId === 'causes') targetId = 'section_3';
      else if (sectionId === 'impact') targetId = 'section_4';
      else if (sectionId === 'contact') targetId = 'section_6';

      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf9] text-[#2e2e2e] flex flex-col selection:bg-[#893d2d] selection:text-white">
      
      {/* 1. Universal Navigation Bar across ALL pages (Home, Donate, Who We Serve, Our Work, Our Impact, Gallery) */}
      <Navbar
        onOpenDonateModal={(cause) => handleNavigateToDonate({ cause })}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToWhoWeServe={handleNavigateToWhoWeServe}
        onNavigateToOurWork={handleNavigateToOurWork}
        onNavigateToOurImpact={handleNavigateToOurImpact}
        onNavigateToGallery={handleNavigateToGallery}
        onNavigateToSection={handleNavigateToSection}
        currentPage={currentPage}
        activeSection={activeSection}
      />

      <AnimatePresence mode="wait">
        {currentPage === 'donate' ? (
          <motion.div
            key="donate-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1"
          >
            <DonationLandingPage
              onBackToHome={handleNavigateToHome}
              onNavigateToSection={handleNavigateToSection}
              initialCause={selectedCauseForDonation}
              initialFrequency={selectedFrequencyForDonation}
              initialAmount={selectedAmountForDonation}
            />
          </motion.div>
        ) : currentPage === 'who-we-serve' ? (
          <motion.div
            key="who-we-serve-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1"
          >
            <WhoWeServePage
              onNavigateToDonate={(cause) => handleNavigateToDonate({ cause })}
              onNavigateToHome={handleNavigateToHome}
              onNavigateToSection={handleNavigateToSection}
              onNavigateToOurWork={handleNavigateToOurWork}
              onNavigateToOurImpact={handleNavigateToOurImpact}
            />
          </motion.div>
        ) : currentPage === 'our-work' ? (
          <motion.div
            key="our-work-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1"
          >
            <OurWorkPage
              onNavigateToDonate={(cause) => handleNavigateToDonate({ cause })}
              onNavigateToWhoWeServe={handleNavigateToWhoWeServe}
              onNavigateToOurImpact={handleNavigateToOurImpact}
              onNavigateToGallery={handleNavigateToGallery}
              onNavigateToHome={handleNavigateToHome}
              onNavigateToSection={handleNavigateToSection}
              onOpenContact={() => handleNavigateToSection('contact')}
            />
          </motion.div>
        ) : currentPage === 'our-impact' ? (
          <motion.div
            key="our-impact-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1"
          >
            <OurImpactPage
              onNavigateToDonate={(cause) => handleNavigateToDonate({ cause })}
              onNavigateToWhoWeServe={handleNavigateToWhoWeServe}
              onNavigateToOurWork={handleNavigateToOurWork}
              onNavigateToHome={handleNavigateToHome}
              onNavigateToSection={handleNavigateToSection}
            />
          </motion.div>
        ) : currentPage === 'gallery' ? (
          <motion.div
            key="gallery-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1"
          >
            <GalleryPage
              onNavigateToDonate={(cause) => handleNavigateToDonate({ cause })}
              onNavigateToWhoWeServe={handleNavigateToWhoWeServe}
              onNavigateToOurWork={handleNavigateToOurWork}
              onNavigateToOurImpact={handleNavigateToOurImpact}
              onNavigateToHome={handleNavigateToHome}
              onNavigateToSection={handleNavigateToSection}
            />
          </motion.div>
        ) : (
          <motion.main
            key="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex-1"
          >
            {/* 2. Hero Section: Cinematic slideshow with pinned background & rising text */}
            <Hero onOpenDonateModal={() => handleNavigateToDonate()} />

            {/* 3. Overlapping Content Sheet: Gradually scrolls up over the pinned hero image */}
            <div className="relative z-20 bg-[#fdfbf9] shadow-[0_-25px_60px_rgba(0,0,0,0.22)] rounded-t-[32px] sm:rounded-t-[44px] overflow-hidden -mt-8 sm:-mt-14 pt-4 sm:pt-8 border-t border-white/60">
              {/* Welcome & 4 Feature Action Cards */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={sectionFadeVariants}
              >
                <WelcomeActions
                  onOpenDonate={() => handleNavigateToDonate()}
                  onOpenVolunteer={() => setVolunteerModalOpen(true)}
                  onOpenScholarship={() => setScholarshipModalOpen(true)}
                />
              </motion.div>

              {/* 4. Our Story Section */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={sectionFadeVariants}
              >
                <OurStory />
              </motion.div>

              {/* 5. Founder Spotlight */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={sectionFadeVariants}
              >
                <FounderSpotlight />
              </motion.div>

              {/* 6. Our Causes: Nutrition, Education, Discipleship */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={sectionFadeVariants}
              >
                <Causes
                  onOpenDonateForCause={(cause) =>
                    handleNavigateToDonate({
                      cause,
                      amount: cause.toLowerCase().includes('education') ? 30 : 15,
                    })
                  }
                />
              </motion.div>

              {/* 7. Testimonials Section: Carousel */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={sectionFadeVariants}
              >
                <TestimonialSection />
              </motion.div>

              {/* 9. Impact Banner: "Make an impact. Make a difference." */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={sectionFadeVariants}
              >
                <ImpactBanner onOpenDonate={() => handleNavigateToDonate()} />
              </motion.div>

              {/* 10. Get In Touch & Contact Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={sectionFadeVariants}
              >
                <ContactSection />
              </motion.div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Universal Footer across ALL pages (Home, Donate, Who We Serve, Our Work, Our Impact, Gallery) */}
      <Footer
        onOpenVolunteer={() => setVolunteerModalOpen(true)}
        onOpenPartner={() => setVolunteerModalOpen(true)}
        onOpenDonate={() => handleNavigateToDonate()}
        onOpenTechStack={() => setTechStackModalOpen(true)}
        onNavigateToWhoWeServe={handleNavigateToWhoWeServe}
        onNavigateToOurWork={handleNavigateToOurWork}
        onNavigateToOurImpact={handleNavigateToOurImpact}
        onNavigateToGallery={handleNavigateToGallery}
        onNavigateToSection={handleNavigateToSection}
        onNavigateToHome={handleNavigateToHome}
      />

      {/* Interactive Modals */}
      <DonationModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        initialCause={selectedCauseForDonation}
      />

      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
      />

      <ScholarshipModal
        isOpen={scholarshipModalOpen}
        onClose={() => setScholarshipModalOpen(false)}
        onSponsorClick={() => {
          setScholarshipModalOpen(false);
          handleNavigateToDonate({ cause: 'Education', amount: 30 });
        }}
      />

      {/* Settled Stack & CMS / Webhook Inspector */}
      <TechStackInspector
        isOpen={techStackModalOpen}
        onClose={() => setTechStackModalOpen(false)}
      />
    </div>
  );
}
