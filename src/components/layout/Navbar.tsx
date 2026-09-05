import React, { useState, useEffect, useRef } from 'react';
import { Mail, Menu, X, Heart } from 'lucide-react';
import { FurahaLogo } from './FurahaLogo';

interface NavbarProps {
  onOpenDonateModal: (cause?: string) => void;
  onNavigateToHome?: () => void;
  onNavigateToWhoWeServe?: () => void;
  onNavigateToOurWork?: () => void;
  onNavigateToOurImpact?: () => void;
  onNavigateToGallery?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  currentPage?: 'home' | 'donate' | 'who-we-serve' | 'our-work' | 'our-impact' | 'gallery';
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDonateModal,
  onNavigateToHome,
  onNavigateToWhoWeServe,
  onNavigateToOurWork,
  onNavigateToOurImpact,
  onNavigateToGallery,
  onNavigateToSection,
  currentPage = 'home',
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const scrollThreshold = 10;

  const navLinks = [
    { name: 'Home', href: '#top', id: 'home' },
    { name: 'Our Story', href: '#section_2', id: 'story' },
    { name: 'Who We Serve', href: '#who-we-serve', id: 'who-we-serve' },
    { name: 'Our Work', href: '#our-work', id: 'our-work' },
    { name: 'Our Impact', href: '#our-impact', id: 'our-impact' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
  ];

  // Scroll detection for shadow, active state, and intelligent hide-on-scroll
  // Keeps navbar fully visible through the hero section until the following section has scrolled up at least a quarter (~25% of viewport into the content sheet)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      setIsScrolled(currentScrollY > 20);

      // Calculate hero threshold dynamically:
      // The hero section spans ~120vh-130vh (or at least window.innerHeight).
      // A quarter into the section below means hero height + 25% of viewport height.
      const heroElement = document.getElementById('home');
      const heroHeight = heroElement ? heroElement.offsetHeight : window.innerHeight;
      const minScrollThresholdForHide = heroHeight + window.innerHeight * 0.25;

      // Keep navbar securely visible through the entire hero and until the next section is ~25% scrolled up
      if (currentScrollY < minScrollThresholdForHide) {
        setNavVisible(true);
      } else if (Math.abs(delta) > scrollThreshold) {
        if (delta > 0) {
          // Scrolling DOWN deep into subsequent content -> hide navbar smoothly
          setNavVisible(false);
          setMobileMenuOpen(false);
        } else {
          // Scrolling UP -> instantly reappear
          setNavVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (link.id === 'who-we-serve') {
      if (onNavigateToWhoWeServe) {
        onNavigateToWhoWeServe();
      }
      return;
    }

    if (link.id === 'our-work') {
      if (onNavigateToOurWork) {
        onNavigateToOurWork();
      } else if (onNavigateToSection) {
        onNavigateToSection('causes');
      }
      return;
    }

    if (link.id === 'our-impact') {
      if (onNavigateToOurImpact) {
        onNavigateToOurImpact();
      } else if (onNavigateToSection) {
        onNavigateToSection('impact');
      }
      return;
    }

    if (link.id === 'gallery') {
      if (onNavigateToGallery) {
        onNavigateToGallery();
      }
      return;
    }

    if (link.id === 'home') {
      if (onNavigateToHome) {
        onNavigateToHome();
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Navigating to a section (story, causes, impact, contact)
    if (currentPage !== 'home') {
      if (onNavigateToSection) {
        onNavigateToSection(link.id);
      } else if (onNavigateToHome) {
        onNavigateToHome();
        setTimeout(() => {
          scrollToHref(link.href);
        }, 100);
      }
      return;
    }

    scrollToHref(link.href);
  };

  const scrollToHref = (href: string) => {
    let targetElement = document.querySelector(href);
    if (!targetElement) {
      if (href === '#top') targetElement = document.getElementById('home') || document.body;
      if (href === '#section_2') targetElement = document.getElementById('story') || document.getElementById('section_2');
      if (href === '#section_3') targetElement = document.getElementById('causes') || document.getElementById('section_3');
      if (href === '#section_4') targetElement = document.getElementById('impact') || document.getElementById('section_4');
      if (href === '#section_6') targetElement = document.getElementById('contact') || document.getElementById('section_6');
    }

    if (targetElement) {
      const topOffset = 68;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: href === '#top' ? 0 : offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onOpenDonateModal();
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigateToHome) {
      onNavigateToHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isLinkActive = (link: typeof navLinks[0]) => {
    if (link.id === 'who-we-serve') return currentPage === 'who-we-serve';
    if (link.id === 'our-work') return currentPage === 'our-work';
    if (link.id === 'our-impact') return currentPage === 'our-impact';
    if (link.id === 'gallery') return currentPage === 'gallery';
    if (currentPage === 'home') {
      if (link.href === '#top') return activeSection === 'home' || activeSection === 'top';
      if (link.href === '#section_2') return activeSection === 'story' || activeSection === 'section_2';
      if (link.href === '#section_3') return activeSection === 'causes' || activeSection === 'section_3';
      if (link.href === '#our-impact' || link.href === '#section_4') return activeSection === 'impact' || activeSection === 'section_4';
      if (link.href === '#section_6') return activeSection === 'contact' || activeSection === 'section_6';
    }
    return false;
  };

  return (
    <>
      {/* 1. Top email strip */}
      <header id="top" className="site-header w-full bg-[#893d2d] text-white z-40 relative">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center min-h-[26px] py-1">
          <p className="flex items-center m-0 leading-none">
            <Mail className="w-3 h-3 min-[380px]:w-3.5 min-[380px]:h-3.5 mr-1.5 shrink-0 text-white" />
            <a
              href="mailto:info@meetfuraha.org"
              id="top-bar-email"
              className="text-white hover:text-white/80 transition-colors leading-none text-[11px] min-[380px]:text-xs font-medium"
            >
              info@meetfuraha.org
            </a>
          </p>
        </div>
      </header>

      {/* 2. Main Navigation Bar */}
      <div
        className={`sticky top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-in-out ${
          navVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled ? 'shadow-md bg-white/98' : 'shadow-xs bg-white/95'}`}
      >
        <nav className="navbar navbar-expand-lg backdrop-blur-md border-b border-neutral-100/90 w-full">
          <div className="max-w-7xl mx-auto px-2.5 min-[360px]:px-3 sm:px-6 lg:px-8 flex items-center justify-between w-full h-14 sm:h-16 lg:h-16">
            {/* Left: Brand block (flex-1 on lg to symmetrically counterbalance right action) */}
            <div className="flex items-center justify-start shrink-0 lg:flex-1 min-w-0">
              <a
                className="inline-flex items-center py-1 cursor-pointer min-w-0"
                href="#top"
                onClick={handleLogoClick}
                aria-label="Furaha Ministries Home"
              >
                <FurahaLogo variant="dark" size="sm" showText={true} />
              </a>
            </div>

            {/* Center: Desktop Nav Items - Perfectly centered on big screen for optimal visual balance */}
            <nav
              className="hidden lg:flex items-center justify-center shrink-0"
              id="navbarNav"
              aria-label="Main Navigation"
            >
              <ul className="navbar-nav flex items-center justify-center gap-0.5 xl:gap-1.5 m-0 p-0 list-none">
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link);

                  return (
                    <li key={link.name} className="nav-item">
                      <a
                        className={`px-2.5 xl:px-3 py-1.5 rounded-full text-[12.5px] xl:text-[13.5px] whitespace-nowrap transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#893d2d] text-white font-semibold shadow-xs'
                            : 'text-neutral-700 hover:text-[#893d2d] hover:bg-neutral-100/80 font-medium'
                        }`}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right: Desktop Donate Button (flex-1 on lg to counterbalance left brand) */}
            <div className="hidden lg:flex items-center justify-end lg:flex-1 shrink-0">
              <button
                onClick={handleDonateClick}
                className={`inline-flex items-center justify-center gap-1.5 px-3.5 xl:px-4.5 py-1.5 xl:py-2 rounded-full font-semibold text-xs xl:text-sm shadow-xs transition-all cursor-pointer ${
                  currentPage === 'donate'
                    ? 'bg-[#733123] text-white ring-2 ring-[#893d2d]/40 shadow-md'
                    : 'bg-[#893d2d] hover:bg-[#733123] text-white hover:shadow-md hover:scale-105 active:scale-95'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Give to Furaha</span>
              </button>
            </div>

            {/* Tablet Nav Items (md to lg, 768px - 1023px) */}
            <div className="hidden md:flex lg:hidden items-center gap-1 ms-auto shrink-0">
              <ul className="navbar-nav flex items-center gap-0.5 m-0 p-0 list-none">
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link);

                  return (
                    <li key={link.name} className="nav-item">
                      <a
                        className={`px-2 min-[880px]:px-2.5 py-1 rounded-full text-[11px] min-[880px]:text-[11.5px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? 'bg-[#893d2d] text-white font-semibold shadow-xs'
                            : 'text-neutral-700 hover:text-[#893d2d] hover:bg-neutral-100/80'
                        }`}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <button
                onClick={handleDonateClick}
                className="inline-flex items-center justify-center gap-1 px-2.5 min-[880px]:px-3 py-1 min-[880px]:py-1.5 rounded-full bg-[#893d2d] hover:bg-[#733123] text-white text-[11px] min-[880px]:text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer ml-1 shrink-0"
              >
                <Heart className="w-3 h-3 fill-white shrink-0" />
                <span className="hidden min-[880px]:inline">Give to Furaha</span>
                <span className="min-[880px]:hidden inline">Give</span>
              </button>
            </div>

            {/* Mobile Navigation Header (screens < 768px) */}
            <div className="flex items-center gap-1.5 min-[380px]:gap-2 md:hidden shrink-0">
              <button
                onClick={handleDonateClick}
                className="inline-flex items-center justify-center gap-1 px-2.5 min-[360px]:px-3 min-[420px]:px-3.5 py-1 min-[380px]:py-1.5 rounded-full bg-[#893d2d] hover:bg-[#733123] text-white text-[11px] min-[380px]:text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
              >
                <Heart className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 fill-white shrink-0" />
                <span className="hidden min-[400px]:inline">Give to Furaha</span>
                <span className="min-[400px]:hidden inline">Give</span>
              </button>
              <button
                className="p-1.5 min-[380px]:p-2 text-neutral-700 hover:text-[#893d2d] hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none cursor-pointer flex items-center justify-center shrink-0"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-controls="navbarNav"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-4.5 h-4.5 min-[380px]:w-5 min-[380px]:h-5" /> : <Menu className="w-4.5 h-4.5 min-[380px]:w-5 min-[380px]:h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown Drawer (screens < 768px) */}
          {mobileMenuOpen && (
            <div
              id="mobileNavMenu"
              className="md:hidden bg-white border-t border-neutral-100 px-4 py-3 sm:px-5 sm:py-3.5 shadow-xl transition-all w-full animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <ul className="navbar-nav flex flex-col space-y-0.5 sm:space-y-1 m-0 p-0 list-none">
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link);

                  return (
                    <li key={link.name} className="nav-item">
                      <a
                        className={`block px-3 py-2 rounded-xl text-[13px] sm:text-sm transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#893d2d] text-white font-semibold shadow-xs flex items-center justify-between'
                            : 'text-neutral-700 hover:bg-neutral-100 hover:text-[#893d2d] font-medium'
                        }`}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Current</span>}
                      </a>
                    </li>
                  );
                })}
                <li className="nav-item pt-1.5">
                  <button
                    onClick={handleDonateClick}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-full bg-[#893d2d] hover:bg-[#733123] text-white text-center font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-sm"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Give to Furaha</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};
