import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TestimonialItem } from '../types';

export const TestimonialSection: React.FC = () => {
  const testimonials: TestimonialItem[] = [
    {
      quote:
        'As a young girl, I dreamed of caring for children in need. Though that vision evolved, God led me to help one child at a time. Through prayer and encouragement, He opened doors for me to serve—and Furaha became the gift through which I live out that calling.',
      author: 'Maggie Mburu',
      role: 'Founder',
      location: 'Kenya & USA',
      image: '/maggienew2.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex, testimonials.length]);

  const handleNext = () => {
    if (testimonials.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (testimonials.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="impact" className="w-full bg-[#221c1a] py-20 sm:py-28 px-4 sm:px-8 text-white relative overflow-hidden">
      {/* Decorative backdrop ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#893d2d]/15 blur-[120px] rounded-full pointer-events-none" />

      <div id="section_4" className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 text-[#f4b83e] mb-8 backdrop-blur-sm border border-white/10"
        >
          <Quote className="w-7 h-7" />
        </motion.div>

        {/* Testimonial Stage with 3D Slide-and-Crossfade Transition */}
        <div className="relative min-h-[360px] sm:min-h-[320px] max-w-2xl mx-auto flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={(dir: number) => ({
                opacity: 0,
                x: dir > 0 ? 50 : -50,
                scale: 0.96,
                filter: 'blur(4px)',
              })}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                filter: 'blur(0px)',
                transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              }}
              exit={(dir: number) => ({
                opacity: 0,
                x: dir > 0 ? -50 : 50,
                scale: 0.96,
                filter: 'blur(4px)',
                transition: { duration: 0.35, ease: 'easeIn' },
              })}
              className="bg-white text-[#2e2e2e] rounded-[28px] p-8 sm:p-12 md:p-14 shadow-2xl w-full relative"
            >
              {/* Author Portrait */}
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 border-3 border-[#893d2d] shadow-md bg-[#f0eae1]">
                <picture>
                  <source srcSet="/maggienew2.webp" type="image/webp" />
                  <img
                    src={current.image}
                    alt={current.author}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop';
                    }}
                    className="w-full h-full object-cover object-top"
                  />
                </picture>
              </div>

              {/* Quote text */}
              <blockquote className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#3a3a3a] mb-6 italic">
                "{current.quote}"
              </blockquote>

              {/* Author info */}
              <h4 className="text-lg font-bold text-[#893d2d] tracking-tight">{current.author}</h4>
              <p className="text-xs sm:text-sm text-[#777] font-medium mt-0.5">{current.role}</p>
              {current.location && (
                <p className="text-[11px] text-[#999] tracking-wider uppercase mt-1">{current.location}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation (if multiple testimonials) */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={handlePrev}
              id="prev-testimonial-btn"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#893d2d] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer active:scale-95"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 h-2.5 bg-[#893d2d]'
                      : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              id="next-testimonial-btn"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#893d2d] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer active:scale-95"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
