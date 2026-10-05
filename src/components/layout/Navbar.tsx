import React, { useState, useEffect, useRef } from 'react';
import { Mail, Menu, X, Heart, ChevronDown, MapPin, ArrowRight } from 'lucide-react';
import { FurahaLogo } from './FurahaLogo';

interface NavbarProps {
  onOpenDonateModal: (cause?: string) => void;
  onNavigateToHome?: () => void;
  onNavigateToWhoWeServe?: (communityId?: 'all' | 'west-hill' | 'amani' | 'cry-of-a-young-one') => void;
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
  const [whoWeServeDropdownOpen, setWhoWeServeDropdownOpen] = useState(false);
  const [mobileWhoWeServeExpanded, setMobileWhoWeServeExpanded] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollThreshold = 10;

  const whoWeServeDropdownProjects = [
    {
      id: 'west-hill' as const,
      name: 'West Hill School',
      location: 'Central Kenya',
      description: 'Tuition aid, uniforms, and learning guidance led by Teacher Salim',
      metric: '120+ Students',
    },
    {
      id: 'amani' as const,
      name: "Amani Children's Home",
      location: 'Kiambu County',
      description: 'Permanent sanctuary, daily meals, and family-style living care',
      metric: '45+ Residents',
    },
    {
      id: 'cry-of-a-young-one' as const,
      name: 'Cry of a Young One',
      location: 'Nairobi / Huruma',
      description: 'Apartment living assistance keeping 6 orphaned siblings together',
      metric: '6 Siblings',
    },
  ];

  const navLinks = [
    { name: 'Home', href: '#top', id: 'home' },
    { name: 'Our Story', href: '#section_2', id: 'story' },
    { name: 'Who We Serve', href: '#who-we-serve', id: 'who-we-serve', hasDropdown: true },
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

  const handleMouseEnterWhoWeServe = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setWhoWeServeDropdownOpen(true);
  };

  const handleMouseLeaveWhoWeServe = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setWhoWeServeDropdownOpen(false);
    }, 200);
  };

  const handleSelectWhoWeServeSubItem = (
    e: React.MouseEvent,
    id: 'all' | 'west-hill' | 'amani' | 'cry-of-a-young-one'
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setWhoWeServeDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavigateToWhoWeServe) {
      onNavigateToWhoWeServe(id);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, link: typeof navLinks[0]) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (link.id === 'who-we-serve') {
      if (onNavigateToWhoWeServe) {
        onNavigateToWhoWeServe('all');
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

                  if (link.id === 'who-we-serve') {
                    return (
                      <li
                        key={link.name}
                        className="nav-item relative"
                        onMouseEnter={handleMouseEnterWhoWeServe}
                        onMouseLeave={handleMouseLeaveWhoWeServe}
                      >
                        <button
                          type="button"
                          className={`px-2.5 xl:px-3 py-1.5 rounded-full text-[12.5px] xl:text-[13.5px] whitespace-nowrap transition-all cursor-pointer inline-flex items-center gap-1 ${
                            isActive
                              ? 'bg-[#893d2d] text-white font-semibold shadow-xs'
                              : 'text-neutral-700 hover:text-[#893d2d] hover:bg-neutral-100/80 font-medium'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (onNavigateToWhoWeServe) onNavigateToWhoWeServe('all');
                          }}
                          aria-expanded={whoWeServeDropdownOpen}
                          aria-haspopup="true"
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              whoWeServeDropdownOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {/* Refined Editorial Dropdown Menu */}
                        {whoWeServeDropdownOpen && (
                          <div
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-88 sm:w-96"
                            onMouseEnter={handleMouseEnterWhoWeServe}
                            onMouseLeave={handleMouseLeaveWhoWeServe}
                          >
                            <div className="bg-white rounded-2xl border border-[#e5d8cc] shadow-[0_16px_40px_-8px_rgba(32,26,24,0.12)] p-2 backdrop-blur-md animate-in fade-in slide-in-from-top-1.5 duration-150">
                              <div className="px-3.5 pt-2 pb-2 border-b border-[#f3eae0] flex items-center justify-between">
                                <span className="text-[10.5px] font-bold tracking-widest text-[#893d2d] uppercase">
                                  Supported Initiatives
                                </span>
                                <span className="text-[11px] text-[#7d7168] font-normal">
                                  Kenya Field Partners
                                </span>
                              </div>

                              <div className="space-y-0.5 pt-1">
                                {whoWeServeDropdownProjects.map((item) => (
                                  <button
                                    key={item.id}
                                    onClick={(e) => handleSelectWhoWeServeSubItem(e, item.id)}
                                    className="w-full text-left p-3 rounded-xl hover:bg-[#faf6f2] transition-colors flex items-center justify-between group cursor-pointer"
                                  >
                                    <div className="space-y-0.5 pr-2">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-xs sm:text-[13px] font-bold text-[#201a18] group-hover:text-[#893d2d] transition-colors">
                                          {item.name}
                                        </span>
                                        <span className="text-[10px] text-[#b3a69b]">·</span>
                                        <span className="text-[11px] text-[#7d7168] font-normal">{item.location}</span>
                                      </div>
                                      <p className="text-[11.5px] text-[#635a54] line-clamp-1 leading-snug">
                                        {item.description}
                                      </p>
                                    </div>
                                    <div className="shrink-0 flex items-center gap-1.5 pl-1.5">
                                      <span className="text-[10px] font-semibold text-[#893d2d] bg-[#f5ede6] px-2 py-0.5 rounded-md whitespace-nowrap">
                                        {item.metric}
                                      </span>
                                      <ArrowRight className="w-3.5 h-3.5 text-[#cfc2b6] group-hover:text-[#893d2d] group-hover:translate-x-0.5 transition-all" />
                                    </div>
                                  </button>
                                ))}
                              </div>

                              {/* Footer Action: All Communities */}
                              <div className="mt-1 pt-1.5 border-t border-[#f3eae0]">
                                <button
                                  onClick={(e) => handleSelectWhoWeServeSubItem(e, 'all')}
                                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-[#faf6f2] transition-colors flex items-center justify-between text-xs font-semibold text-[#201a18] group cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-3.5 h-3.5 text-[#893d2d]" />
                                    <span className="group-hover:text-[#893d2d] transition-colors">
                                      All Partner Communities & Directory
                                    </span>
                                  </div>
                                  <ArrowRight className="w-3.5 h-3.5 text-[#cfc2b6] group-hover:text-[#893d2d] group-hover:translate-x-0.5 transition-all" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  }

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

                  if (link.id === 'who-we-serve') {
                    return (
                      <li key={link.name} className="nav-item">
                        <div className="flex items-center justify-between gap-1">
                          <a
                            className={`flex-1 px-3 py-2 rounded-xl text-[13px] sm:text-sm transition-all cursor-pointer ${
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
                          <button
                            type="button"
                            onClick={() => setMobileWhoWeServeExpanded(!mobileWhoWeServeExpanded)}
                            className="p-2 text-neutral-600 hover:text-[#893d2d] rounded-lg transition-colors cursor-pointer"
                            aria-label="Toggle supported projects submenu"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                mobileWhoWeServeExpanded ? 'rotate-180 text-[#893d2d]' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* Expandable sub-items */}
                        {mobileWhoWeServeExpanded && (
                          <div className="mt-1.5 mb-2 ml-2 pl-3 py-1 space-y-1 border-l-2 border-[#e6d9cd] animate-in fade-in slide-in-from-top-1 duration-150">
                            <div className="px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-[#893d2d]">
                              Supported Initiatives
                            </div>
                            {whoWeServeDropdownProjects.map((project) => (
                              <button
                                key={project.id}
                                type="button"
                                onClick={(e) => handleSelectWhoWeServeSubItem(e, project.id)}
                                className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-neutral-100 flex items-center justify-between transition-colors cursor-pointer text-xs font-semibold text-[#201a18]"
                              >
                                <span>{project.name}</span>
                                <span className="text-[10px] text-[#7d7168] bg-[#f5ede6] px-1.5 py-0.5 rounded font-normal">
                                  {project.metric}
                                </span>
                              </button>
                            ))}
                            <button
                              type="button"
                              onClick={(e) => handleSelectWhoWeServeSubItem(e, 'all')}
                              className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-neutral-100 flex items-center gap-2 transition-colors cursor-pointer text-xs font-semibold text-[#893d2d] pt-1.5 border-t border-[#f0e4d8]"
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              <span>All Partner Communities & Directory</span>
                            </button>
                          </div>
                        )}
                      </li>
                    );
                  }

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
