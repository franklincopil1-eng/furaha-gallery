import React, { useState } from 'react';
import { ArrowRight, Lock, Check } from 'lucide-react';
import { getGivebutterCheckoutUrl, GIVEBUTTER_CAMPAIGN_URL } from '../../lib/givebutter';
import { GivingPillarId, findPillarById } from '../../data/givingPillars';

interface FinalDonationCTAProps {
  /** The pillar the donor chose higher up the page, carried into checkout. */
  selectedPillarId?: GivingPillarId | null;
}

export const FinalDonationCTA: React.FC<FinalDonationCTAProps> = ({ selectedPillarId = null }) => {
  const [selectedOption, setSelectedOption] = useState<'15' | '30' | '300' | 'custom'>('30');
  const [customValue, setCustomValue] = useState<number>(50);

  const handleGivebutterRedirect = () => {
    let amt = 30;
    let freq: 'monthly' | 'once' = 'monthly';
    let cause = "Support a child's education and everyday needs";

    if (selectedOption === '15') {
      amt = 15;
      freq = 'monthly';
      cause = 'Help keep a child in school';
    } else if (selectedOption === '30') {
      amt = 30;
      freq = 'monthly';
      cause = "Support a child's education and everyday needs";
    } else if (selectedOption === '300') {
      amt = 300;
      freq = 'once';
      cause = 'Help provide a year of education';
    } else {
      amt = customValue || 50;
      freq = 'monthly';
      cause = 'Direct Child Support';
    }

    const url = getGivebutterCheckoutUrl({
      amount: amt,
      frequency: freq,
      cause,
      fundId: findPillarById(selectedPillarId)?.givebutterFundId || undefined,
    });

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-12 sm:py-16 bg-[#faf7f2] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Dignified Tag */}
        <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-2">
          Give
        </span>

        {/* Headlines */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#201a18] tracking-tight mb-2 leading-tight">
          Help one child stay in school.
        </h2>
        <p className="text-base sm:text-lg text-[#59524e] font-medium mb-6 max-w-xl mx-auto">
          Pick an amount, monthly or once.
        </p>

        {/* Quick Selection Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-xl mx-auto mb-6">
          
          <button
            type="button"
            onClick={() => setSelectedOption('15')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedOption === '15'
                ? 'bg-white border-[#893d2d] shadow-sm ring-1 ring-[#893d2d]/20'
                : 'bg-white/70 hover:bg-white border-[#ebdcd0]'
            }`}
          >
            <div className="font-extrabold text-base text-[#893d2d]">$15<span className="ml-1.5 align-middle inline-block px-2 py-0.5 rounded-full bg-[#893d2d] text-white text-[10px] font-extrabold uppercase tracking-wide">Monthly</span></div>
            <div className="text-[11px] text-[#59524e] mt-0.5 leading-tight">Help keep a child in school</div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedOption('30')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedOption === '30'
                ? 'bg-white border-[#893d2d] shadow-sm ring-1 ring-[#893d2d]/20'
                : 'bg-white/70 hover:bg-white border-[#ebdcd0]'
            }`}
          >
            <div className="font-extrabold text-base text-[#893d2d]">$30<span className="ml-1.5 align-middle inline-block px-2 py-0.5 rounded-full bg-[#893d2d] text-white text-[10px] font-extrabold uppercase tracking-wide">Monthly</span></div>
            <div className="text-[11px] text-[#59524e] mt-0.5 leading-tight">Education & everyday needs</div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedOption('300')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedOption === '300'
                ? 'bg-white border-[#893d2d] shadow-sm ring-1 ring-[#893d2d]/20'
                : 'bg-white/70 hover:bg-white border-[#ebdcd0]'
            }`}
          >
            <div className="font-extrabold text-base text-[#893d2d]">$300<span className="ml-1.5 align-middle inline-block px-2 py-0.5 rounded-full bg-[#b7791f] text-white text-[10px] font-extrabold uppercase tracking-wide">Yearly</span></div>
            <div className="text-[11px] text-[#59524e] mt-0.5 leading-tight">A year of education</div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedOption('custom')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedOption === 'custom'
                ? 'bg-white border-[#893d2d] shadow-sm ring-1 ring-[#893d2d]/20'
                : 'bg-white/70 hover:bg-white border-[#ebdcd0]'
            }`}
          >
            <div className="font-extrabold text-base text-[#201a18]">Other</div>
            <div className="text-[11px] text-[#59524e] mt-0.5 leading-tight">Give what feels right</div>
          </button>

        </div>

        {/* Primary CTA */}
        <div className="max-w-sm mx-auto mb-4">
          <button
            onClick={handleGivebutterRedirect}
            id="final-givebutter-cta"
            className="w-full bg-[#893d2d] hover:bg-[#733123] text-white text-base font-bold py-3.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Give Through Givebutter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust & Reassurance Line */}
        <p className="text-xs text-[#717275] flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5" />
          <span>Payments are handled by Givebutter.</span>
        </p>

      </div>
    </section>
  );
};
