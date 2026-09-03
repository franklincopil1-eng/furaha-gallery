import { useState, useEffect } from 'react';

export type PageRoute = 'home' | 'donate' | 'who-we-serve' | 'our-work' | 'our-impact' | 'gallery';

export interface DonateOptions {
  cause?: string;
  frequency?: 'monthly' | 'annual' | 'once';
  amount?: number;
}

export function useRouter() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedCauseForDonation, setSelectedCauseForDonation] = useState<string>('Where Needed Most');
  const [selectedFrequencyForDonation, setSelectedFrequencyForDonation] = useState<'monthly' | 'annual' | 'once'>('monthly');
  const [selectedAmountForDonation, setSelectedAmountForDonation] = useState<number | undefined>(undefined);

  // Handle URL hash routing (e.g. #donate, #who-we-serve, #our-work, #our-impact, #gallery, or #home)
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

  const handleNavigateToDonate = (options?: DonateOptions) => {
    setSelectedCauseForDonation(options?.cause || 'Where Needed Most');
    setSelectedFrequencyForDonation(options?.frequency || 'monthly');
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
    const targetHash =
      sectionId === 'story'
        ? 'section_2'
        : sectionId === 'causes'
        ? 'section_3'
        : sectionId === 'impact'
        ? 'section_4'
        : sectionId === 'contact'
        ? 'section_6'
        : 'top';
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

  return {
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
  };
}
