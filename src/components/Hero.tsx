import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { usePerformance } from '../context/PerformanceContext';

interface HeroProps {
  onOpenDonateModal: () => void;
}

interface SlideData {
  url: string;
  webpUrl?: string;
  fallbackUrl: string;
  alt: string;
  title: string;
  subtitle: string;
  stat?: string;
  statLabel?: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDonateModal }) => {
  const { isLiteMode } = usePerformance();

  const slides: SlideData[] = [
    {
      url: '/volunteer-selecting-organizing-clothes-donations-charity.jpg',
      webpUrl: '/volunteer-selecting-organizing-clothes-donations-charity.webp',
      fallbackUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1600&auto=format&fit=crop',
      alt: 'Volunteers selecting and organizing clothes and essential donation supplies',
      title: 'Every Child Deserves the Chance to Thrive.',
      subtitle: 'Too many children grow up without the support, opportunity, and care they need. Furaha exists to help change that.',
      stat: '10,000+',
      statLabel: 'Care Packages Delivered'
    },
    {
      url: '/volunteer-helping-with-donation-box1.jpeg',
      webpUrl: '/volunteer-helping-with-donation-box1.webp',
      fallbackUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop',
      alt: 'Volunteers helping with donation boxes and community care across Kenya',
      title: 'Faith in Action',
      subtitle: 'Through education, nutrition, discipleship, and practical care, we walk alongside overlooked children and communities in Kenya.',
      stat: '5,000+',
      statLabel: 'Lives Impacted'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Smooth, high-performance scroll listener using requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Efficient slide timer: pauses when user scrolls down or slows when in lite mode to save CPU/battery
  useEffect(() => {
    // Suspend timer when scrolled past hero
    if (typeof window !== 'undefined' && scrollY > window.innerHeight * 0.85) {
      return;
    }

    const duration = isLiteMode ? 8000 : 5500;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, duration);

    return () => clearInterval(timer);
  }, [currentSlide, slides.length, scrollY, isLiteMode]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNextSlide();
    } else if (diff < -50) {
      handlePrevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const scrollToStory = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('story') || document.getElementById('section_2');
    if (el) {
      const topOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Dynamic calculation for text parallax and fade-out ONLY after top bar scrolls past
  const TOP_BAR_HEIGHT = 32;
  const effectiveScroll = Math.max(0, scrollY - TOP_BAR_HEIGHT);
  const textTranslateY = isLiteMode ? 0 : Math.min(effectiveScroll * 0.5, 220);
  const textOpacity = Math.max(0, 1 - effectiveScroll / 320);

  // Background image subtle parallax offset and depth scaling (disabled on mobile to avoid zoom)
  const imageTranslateY = isLiteMode ? 0 : effectiveScroll * 0.08;
  const scrollDimOpacity = Math.min(effectiveScroll / 600, 0.45);

  return (
    <section
      id="home"
      className="relative w-full h-[88vh] min-h-[520px] max-h-[680px] sm:h-[125vh] sm:min-h-0 sm:max-h-none bg-[#161210] select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero Carousel"
    >
      {/* Pinned / Sticky Carousel Viewport */}
      <div className="sticky top-14 sm:top-20 h-[calc(88vh-56px)] min-h-[464px] max-h-[624px] sm:h-[calc(100vh-80px)] sm:min-h-0 sm:max-h-none w-full overflow-hidden z-0">
        <div id="hero-slide" className="relative w-full h-full min-h-full overflow-hidden">
          {slides.map((slide, idx) => {
            const isActive = idx === currentSlide;

            return (
              <div
                key={idx}
                className={`hero-carousel-item absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
                aria-hidden={!isActive}
              >
                {/* Carousel Full-width Background Image */}
                <div
                  className="absolute inset-0 w-full h-full overflow-hidden bg-[#161210]"
                  style={{
                    transform: isLiteMode ? undefined : `translate3d(0, -${imageTranslateY}px, 0)`,
                    willChange: isLiteMode ? undefined : 'transform',
                  }}
                >
                  <picture>
                    {slide.webpUrl && <source srcSet={slide.webpUrl} type="image/webp" />}
                    <img
                      src={slide.url}
                      alt={slide.alt}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = slide.fallbackUrl;
                      }}
                      className="carousel-image w-full h-full object-cover object-[center_22%] sm:object-center transition-all duration-500"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={idx === 0 ? 'high' : 'auto'}
                    />
                  </picture>

                  {/* Warm Earthy Subtle Bottom Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120d0a]/95 via-[#120d0a]/40 via-35% to-transparent z-10" />

                  {/* Dynamic subtle parallax depth overlay as content sheet overlaps */}
                  <div
                    className="absolute inset-0 bg-[#0f0b09] pointer-events-none transition-opacity duration-75 z-15"
                    style={{ opacity: scrollDimOpacity }}
                  />
                </div>

                {/* Foreground Caption & Actions - Scrolls up and fades smoothly as user scrolls down */}
                <div
                  className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10 pb-6 sm:pb-8 md:pb-10 lg:pb-12 pointer-events-none"
                  style={{
                    transform: isLiteMode ? undefined : `translate3d(0, -${textTranslateY}px, 0)`,
                    opacity: textOpacity,
                    willChange: isLiteMode ? undefined : 'transform, opacity',
                  }}
                >
                  <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-3 pointer-events-auto">
                    <div className="max-w-md sm:max-w-lg lg:max-w-xl text-left">
                      <h1
                        id={`hero-slide-title-${idx}`}
                        className="text-lg sm:text-xl md:text-2xl font-semibold text-[#faf2e6] tracking-tight leading-snug mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] font-display"
                      >
                        {slide.title}
                      </h1>

                      <p
                        id={`hero-slide-subtitle-${idx}`}
                        className="text-[#e2d5c3] text-xs sm:text-[13px] md:text-sm font-normal leading-snug mb-2.5 max-w-md drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
                      >
                        {slide.subtitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <button
                          onClick={scrollToStory}
                          className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#e2d5c3]/50 bg-black/40 hover:bg-black/60 hover:border-[#faf2e6] text-[#faf2e6] font-semibold text-xs sm:text-xs md:text-sm transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-md active:scale-95"
                        >
                          <span>Our Story</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#e2d5c3]" />
                        </button>
                        <button
                          onClick={onOpenDonateModal}
                          data-givebutter="button"
                          id={`hero-donate-btn-${idx}`}
                          className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#893d2d] hover:bg-[#733123] text-[#faf2e6] font-semibold text-xs sm:text-xs md:text-sm transition-all shadow-md hover:shadow-lg cursor-pointer inline-flex items-center gap-1.5 active:scale-95 border border-[#893d2d]"
                        >
                          <Heart className="w-3.5 h-3.5 fill-[#faf2e6]" />
                          <span>Donate</span>
                        </button>
                      </div>
                    </div>

                    {/* Slide Indicators & Navigation Buttons */}
                    <div className="flex items-center gap-2 self-start md:self-end mt-1 md:mt-0 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                      {slides.map((_, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => {
                            setCurrentSlide(sIdx);
                          }}
                          aria-label={`Go to slide ${sIdx + 1}`}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            sIdx === currentSlide
                              ? 'w-6 bg-[#EF802E]'
                              : 'w-2 bg-white/40 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
