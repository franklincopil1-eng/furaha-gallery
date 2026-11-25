import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { getGivebutterCheckoutUrl } from '../../lib/givebutter';
import { GivingPillar } from '../../data/givingPillars';

interface StickyMobileCTAProps {
  selectedAmount?: number;
  selectedFrequency?: 'monthly' | 'annual' | 'once';
  /** The area the donor chose, if any. Its fund is passed to Givebutter. */
  selectedPillar?: GivingPillar | null;
  /** Hide the bar (e.g. while the giving pop-up is open). */
  hidden?: boolean;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({
  selectedAmount = 30,
  selectedFrequency = 'monthly',
  selectedPillar = null,
  hidden = false,
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

  if (!isVisible || hidden) return null;

  const freqLabel = selectedFrequency === 'annual' ? '/year' : selectedFrequency === 'monthly' ? '/month' : '';

  // Goes straight to Givebutter with the amount, frequency and chosen area. No page jump.
  const handleGive = () => {
    const url = getGivebutterCheckoutUrl({
      amount: selectedAmount,
      frequency: selectedFrequency === 'monthly' ? 'monthly' : 'once',
      cause: selectedPillar?.title,
      fundId: selectedPillar?.givebutterFundId || undefined,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-2.5 min-[360px]:p-3 bg-white/95 backdrop-blur-md border-t border-[#ebdcd0] shadow-[0_-8px_20px_rgba(0,0,0,0.08)] transition-all animate-in slide-in-from-bottom duration-300">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2.5 min-[360px]:gap-3">
        <div className="flex flex-col shrink-0">
          <span className="text-[10px] min-[360px]:text-[11px] font-bold text-[#893d2d] uppercase tracking-wider">
            {selectedPillar ? selectedPillar.title : 'Give'}
          </span>
          <span className="text-xs min-[360px]:text-sm font-extrabold text-[#201a18]">
            ${selectedAmount}{freqLabel}
          </span>
        </div>

        <button
          onClick={handleGive}
          className="flex-1 bg-[#893d2d] hover:bg-[#733123] text-white font-bold text-xs min-[360px]:text-sm py-2 min-[360px]:py-2.5 px-3.5 min-[360px]:px-4.5 rounded-full shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
        >
          <span>Give ${selectedAmount}{freqLabel}{selectedPillar ? ` to ${selectedPillar.title}` : ''}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
