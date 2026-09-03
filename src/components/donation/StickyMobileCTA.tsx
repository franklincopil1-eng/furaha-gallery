import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { getGivebutterCheckoutUrl } from '../../lib/givebutter';

interface StickyMobileCTAProps {
  onScrollToGiving: () => void;
  selectedAmount?: number;
  selectedFrequency?: 'monthly' | 'annual' | 'once';
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({
  onScrollToGiving,
  selectedAmount = 30,
  selectedFrequency = 'monthly',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past hero (> 300px)
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const freqLabel = selectedFrequency === 'annual' ? '/yr' : selectedFrequency === 'monthly' ? '/mo' : '';

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-[#ebdcd0] shadow-[0_-8px_20px_rgba(0,0,0,0.08)] transition-all animate-in slide-in-from-bottom duration-300">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-[#893d2d] uppercase tracking-wider">
            Sponsor a Student
          </span>
          <span className="text-sm font-extrabold text-[#201a18]">
            ${selectedAmount}{freqLabel}
          </span>
        </div>

        <button
          onClick={onScrollToGiving}
          className="flex-1 bg-[#893d2d] hover:bg-[#733123] text-white font-bold text-sm py-3 px-5 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Give ${selectedAmount}{freqLabel}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
