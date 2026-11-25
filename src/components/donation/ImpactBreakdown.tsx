import React from 'react';
import { Check, ArrowUp } from 'lucide-react';
import { GIVING_PILLARS, GivingPillarId, findPillarById } from '../../data/givingPillars';

interface ImpactBreakdownProps {
  selectedPillarId: GivingPillarId | null;
  onSelectPillar: (id: GivingPillarId | null) => void;
  onContinueToGive: () => void;
}

export const ImpactBreakdown: React.FC<ImpactBreakdownProps> = ({
  selectedPillarId,
  onSelectPillar,
  onContinueToGive,
}) => {
  const selectedPillar = findPillarById(selectedPillarId);

  return (
    <section id="where-support-goes" className="py-10 sm:py-14 bg-white border-y border-[#f0e6dc] scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1">
            Your gift
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-2">
            Your gift becomes more than a donation.
          </h2>
          <p className="text-sm sm:text-base text-[#59524e] font-normal leading-relaxed">
            Your gift supports materials and activities.
          </p>
          <p className="text-xs sm:text-sm text-[#893d2d] font-semibold mt-2">
            Choose the area you'd like your gift to support.
          </p>
        </div>

        {/* 4 Pillars: one can be selected */}
        <div
          role="radiogroup"
          aria-label="Choose the area your gift supports"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          {GIVING_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = pillar.id === selectedPillarId;
            return (
              <button
                key={pillar.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectPillar(isSelected ? null : pillar.id)}
                className={`relative text-left rounded-2xl p-4 sm:p-5 flex flex-col transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#893d2d]/40 ${
                  isSelected
                    ? 'bg-white border-2 border-[#893d2d] shadow-md ring-2 ring-[#893d2d]/10'
                    : 'bg-[#faf8f5] border border-[#ebdcd0] hover:border-[#893d2d]/40 hover:bg-white'
                }`}
              >
                {/* Selected tick */}
                <span
                  className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                    isSelected ? 'bg-[#893d2d] border-[#893d2d] text-white' : 'border-[#d9c8b9] bg-white'
                  }`}
                  aria-hidden="true"
                >
                  {isSelected && <Check className="w-3 h-3" />}
                </span>

                <div className="flex items-center gap-2 mb-3 pr-6">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${pillar.badgeColor}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#201a18]">
                    {pillar.title}
                  </h3>
                </div>

                <ul className="space-y-1.5">
                  {pillar.items.map((item, i) => (
                    <li key={i} className="text-xs text-[#59524e] flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#893d2d] mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* Confirmation of the donor's choice */}
        <div className="bg-[#faf7f2] rounded-xl p-3.5 border border-[#ebdcd0] text-center max-w-xl mx-auto" aria-live="polite">
          {selectedPillar ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <p className="text-xs sm:text-sm text-[#201a18] font-medium">
                You've chosen <span className="font-bold text-[#893d2d]">{selectedPillar.title}</span>.
              </p>
              <button
                type="button"
                onClick={onContinueToGive}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-white bg-[#893d2d] hover:bg-[#733123] px-4 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Choose your amount</span>
              </button>
            </div>
          ) : (
            <p className="text-xs text-[#59524e] font-medium leading-relaxed">
              Select one of the four areas above, then choose your amount.
            </p>
          )}
        </div>

      </div>
    </section>
  );
};
