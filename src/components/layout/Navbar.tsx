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
      {/* 1. Top email strip - compact and proportional */}
      <header id="top" className="site-header w-full bg-[#893d2d] text-white z-40 relative">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center min-h-[26px] sm:min-h-[28px] py-1">
          <p className="flex items-center m-0 leading-none">
            <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5 sm:mr-2 shrink-0 text-white" />
            <a
              href="mailto:info@meetfuraha.org"
              id="top-bar-email"
              className="text-white hover:text-white/80 transition-colors leading-none text-[10.5px] sm:text-xs font-medium"
            >
              info@meetfuraha.org
            </a>
          </p>
        </div>
      </header>

      {/* 2. Main Navigation Bar with Dynamic Shrink & Visual Balance */}
      <div
        className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
          navVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled ? 'shadow-md bg-white/98 backdrop-blur-md' : 'shadow-xs bg-white/95 backdrop-blur-sm'}`}
      >
        <nav className="navbar navbar-expand-lg border-b border-neutral-100/90 w-full">
          <div
            className={`max-w-7xl mx-auto px-2.5 min-[360px]:px-3 sm:px-6 lg:px-8 flex items-center justify-between w-full transition-all duration-300 ease-in-out ${
              isScrolled
                ? 'h-12 min-[360px]:h-13 sm:h-14 lg:h-15'
                : 'h-13.5 min-[360px]:h-14 sm:h-16 lg:h-17'
            }`}
          >
            {/* Left: Brand block (scales subtly when scrolled) */}
            <div
              className={`flex items-center justify-start shrink-0 lg:flex-1 transition-transform duration-300 origin-left ${
                isScrolled ? 'scale-95' : 'scale-100'
              }`}
            >
              <a
                className="inline-flex items-center py-0.5 cursor-pointer"
                href="#top"
                onClick={handleLogoClick}
                aria-label="Furaha Ministries Home"
              >
                <FurahaLogo variant="dark" size="sm" showText={true} />
              </a>
            </div>

            {/* Center: Desktop Nav Items - Centered with balanced typography */}
            <nav
              className="hidden lg:flex items-center justify-center shrink-0"
              id="navbarNav"
              aria-label="Main Navigation"
            >
              <ul className="navbar-nav flex items-center justify-center gap-1 xl:gap-2 m-0 p-0 list-none">
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link);

                  return (
                    <li key={link.name} className="nav-item">
                      <a
                        className={`px-2.5 xl:px-3.5 py-1 xl:py-1.5 rounded-full text-[12.5px] xl:text-[13.5px] whitespace-nowrap transition-all cursor-pointer ${
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

            {/* Right: Desktop Donate Button - Dynamically shrinks on scroll for visual balance */}
            <div className="hidden lg:flex items-center justify-end lg:flex-1 shrink-0">
              <button
                onClick={handleDonateClick}
                className={`inline-flex items-center justify-center gap-1.5 rounded-full font-semibold shadow-xs transition-all duration-300 cursor-pointer ${
                  isScrolled
                    ? 'px-3.5 xl:px-4 py-1.5 text-xs xl:text-[13px]'
                    : 'px-4 xl:px-5 py-1.5 xl:py-2 text-[13px] xl:text-sm'
                } ${
                  currentPage === 'donate'
                    ? 'bg-[#733123] text-white ring-2 ring-[#893d2d]/40 shadow-md'
                    : 'bg-[#893d2d] hover:bg-[#733123] text-white hover:shadow-md hover:scale-[1.02] active:scale-95'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Give to Furaha</span>
              </button>
            </div>

            {/* Tablet Nav Items (md to lg, 768px - 1023px) - Sleek and non-crowded */}
            <div className="hidden md:flex lg:hidden items-center gap-1 ms-auto">
              <ul className="navbar-nav flex items-center gap-0.5 m-0 p-0 list-none">
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link);

                  return (
                    <li key={link.name} className="nav-item">
                      <a
                        className={`px-2 py-1 rounded-full text-[11.5px] font-medium transition-all whitespace-nowrap cursor-pointer ${
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
                className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full bg-[#893d2d] hover:bg-[#733123] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer ml-1"
              >
                <Heart className="w-3 h-3 fill-white" />
                <span>Give to Furaha</span>
              </button>
            </div>

            {/* Mobile Navigation Header (screens < 768px) - Shrinks gracefully on small devices */}
            <div className="flex items-center gap-1.5 min-[360px]:gap-2 md:hidden">
              <button
                onClick={handleDonateClick}
                className={`inline-flex items-center justify-center gap-1 rounded-full bg-[#893d2d] hover:bg-[#733123] text-white font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0 ${
                  isScrolled
                    ? 'px-2.5 py-1 min-[360px]:px-3 min-[360px]:py-1 text-[11px] min-[360px]:text-xs'
                    : 'px-2.5 py-1.5 min-[360px]:px-3.5 min-[360px]:py-1.5 text-[11px] min-[360px]:text-xs'
                }`}
                aria-label="Give to Furaha"
              >
                <Heart className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 fill-white shrink-0" />
                {/* Dynamically shorten on compact mobile screens (<390px) to prevent cramping */}
                <span className="inline min-[390px]:hidden">Give</span>
                <span className="hidden min-[390px]:inline">Give to Furaha</span>
              </button>

              <button
                className="w-8 h-8 min-[360px]:w-8.5 min-[360px]:h-8.5 p-1 min-[360px]:p-1.5 text-neutral-700 hover:text-[#893d2d] hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none cursor-pointer flex items-center justify-center shrink-0"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-controls="navbarNav"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? (
                  <X className="w-4.5 h-4.5 min-[360px]:w-5 min-[360px]:h-5" />
                ) : (
                  <Menu className="w-4.5 h-4.5 min-[360px]:w-5 min-[360px]:h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown Drawer (screens < 768px) */}
          {mobileMenuOpen && (
            <div
              id="mobileNavMenu"
              className="md:hidden bg-white/98 backdrop-blur-md border-t border-neutral-100 px-4 py-3 shadow-xl transition-all w-full animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <ul className="navbar-nav flex flex-col space-y-0.5 m-0 p-0 list-none">
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link);

                  return (
                    <li key={link.name} className="nav-item">
                      <a
                        className={`block px-3 py-2 rounded-lg text-xs min-[360px]:text-sm transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#893d2d] text-white font-semibold shadow-xs flex items-center justify-between'
                            : 'text-neutral-700 hover:bg-neutral-100 hover:text-[#893d2d] font-medium'
                        }`}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">Current</span>}
                      </a>
                    </li>
                  );
                })}
                <li className="nav-item pt-2">
                  <button
                    onClick={handleDonateClick}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full bg-[#893d2d] hover:bg-[#733123] text-white text-center font-semibold text-xs min-[360px]:text-sm transition-all cursor-pointer shadow-xs active:scale-98"
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
