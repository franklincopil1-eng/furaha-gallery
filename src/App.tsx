/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, Footer } from './components/layout';
import {
  DonationModal,
  VolunteerModal,
  ScholarshipModal,
  TechStackInspector,
} from './components/modals';
import {
  HomePage,
  DonationPage,
  WhoWeServePage,
  OurWorkPage,
  OurImpactPage,
  GalleryPage,
} from './pages';
import { useRouter } from './hooks';

export default function App() {
  const {
    currentPage,
    activeSection,
    selectedCauseForDonation,
    selectedFrequencyForDonation,
    selectedAmountForDonation,
    handleNavigateToDonate,
    handleNavigateToWhoWeServe,
    handleNavigateToOurWork,
    handleNavigateToOurImpact,
    handleNavigateToGallery,
    handleNavigateToHome,
    handleNavigateToSection,
  } = useRouter();

  // Modals state
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [scholarshipModalOpen, setScholarshipModalOpen] = useState(false);
  const [techStackModalOpen, setTechStackModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fdfbf9] text-[#2e2e2e] flex flex-col selection:bg-[#893d2d] selection:text-white">
      {/* Universal Navigation Bar across ALL pages */}
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
            <DonationPage
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
          <HomePage
            onOpenDonate={handleNavigateToDonate}
            onOpenVolunteer={() => setVolunteerModalOpen(true)}
            onOpenScholarship={() => setScholarshipModalOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Universal Footer across ALL pages */}
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

      {/* Interactive Global Modals */}
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
          handleNavigateToDonate({
            cause: 'Education & Scholarship Fund',
            amount: 30,
          });
        }}
      />

      <TechStackInspector
        isOpen={techStackModalOpen}
        onClose={() => setTechStackModalOpen(false)}
      />
    </div>
  );
}
