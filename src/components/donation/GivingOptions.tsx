import React, { useState } from 'react';
import { Check, ArrowRight, Heart } from 'lucide-react';
import { getGivebutterCheckoutUrl, GIVEBUTTER_CAMPAIGN_URL } from '../../lib/givebutter';
import { GivingPillarId, findPillarById } from '../../data/givingPillars';

export interface GivingTierData {
  id: '15' | '30' | '300';
  amount: number;
  frequency: 'monthly' | 'annual';
  title: string;
  supportingCopy: string;
  ctaText: string;
  supportingNote?: string;
  isPopular?: boolean;
}

export const GIVING_TIERS: GivingTierData[] = [
  {
    id: '15',
    amount: 15,
    frequency: 'monthly',
    title: 'Help keep a child in school',
    supportingCopy:
      'Towards one child’s school costs each month.',
    ctaText: 'Give $15/month →',
    supportingNote: 'A regular gift towards one child’s schooling.',
  },
  {
    id: '30',
    amount: 30,
    frequency: 'monthly',
    title: 'School costs and meals',
    supportingCopy:
      'Towards school fees, meals and supplies.',
    ctaText: 'Give $30/month →',
    isPopular: true,
  },
  {
    id: '300',
    amount: 300,
    frequency: 'annual',
    title: 'A year of school costs',
    supportingCopy:
      'Towards a year of school costs.',
    ctaText: 'Give $300/year →',
  },
];

interface GivingOptionsProps {
  onTierSelect?: (tierId: string, amount: number, frequency: 'monthly' | 'annual' | 'once') => void;
  selectedTierId?: string;
  selectedCause?: string;
  /** The pillar the donor chose in the four-pillar section (null = not chosen yet). */
  selectedPillarId?: GivingPillarId | null;
  /** Scrolls the donor down to the four pillars so they can choose or change one. */
  onChoosePillar?: () => void;
}

export const GivingOptions: React.FC<GivingOptionsProps> = ({
  onTierSelect,
  selectedTierId = '30',
  selectedCause,
  selectedPillarId = null,
  onChoosePillar,
}) => {
  const selectedPillar = findPillarById(selectedPillarId);
  const fundId = selectedPillar?.givebutterFundId || undefined;

  const [selectedTier, setSelectedTier] = useState<'15' | '30' | '300' | 'custom'>(
    (selectedTierId as any) || '30'
  );
  const [customAmount, setCustomAmount] = useState<number>(50);
  const [customFrequency, setCustomFrequency] = useState<'monthly' | 'once'>('monthly');
  const [activeCustomPreset, setActiveCustomPreset] = useState<number | 'other'>(50);

  React.useEffect(() => {
    if (selectedTierId) {
      setSelectedTier(selectedTierId as any);
    }
  }, [selectedTierId]);

  const customPresets = [20, 50, 100, 250];

  const handleSelectTier = (tier: GivingTierData) => {
    setSelectedTier(tier.id);
    if (onTierSelect) {
      onTierSelect(tier.id, tier.amount, tier.frequency);
    }
  };

  const handleDirectGive = (tier: GivingTierData) => {
    const url = getGivebutterCheckoutUrl({
      amount: tier.amount,
      frequency: tier.frequency === 'annual' ? 'once' : 'monthly',
      cause: selectedCause && selectedCause !== 'Where Needed Most' ? `${selectedCause} - ${tier.title}` : tier.title,
      fundId,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCustomGive = () => {
    const finalAmount = customAmount > 0 ? customAmount : 50;
    const url = getGivebutterCheckoutUrl({
      amount: finalAmount,
      frequency: customFrequency,
      cause: selectedCause || 'Child Education & Community Support',
      fundId,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="giving-options-section"
      data-journey-id="giving-options"
      data-journey-role="action-resolution"
      data-journey-entry="top-center"
      data-journey-exit="bottom-center"
      className="py-10 sm:py-16 bg-[#faf7f2] relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1">
            Choose an amount
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-1.5">
            How much would you like to give?
          </h2>
          <p className="text-sm sm:text-base text-[#59524e] font-normal">
            Monthly gifts help us plan for the school year.
          </p>

          {/* Chosen pillar (picked in the four-pillar section just below) */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm" aria-live="polite">
            {selectedPillar ? (
              <>
                <span className="text-[#59524e]">Your gift supports:</span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-[#893d2d] text-[#893d2d] font-bold px-3 py-1 rounded-full">
                  <selectedPillar.icon className="w-3.5 h-3.5" />
                  {selectedPillar.title}
                </span>
                {onChoosePillar && (
                  <button type="button" onClick={onChoosePillar} className="text-[#893d2d] font-semibold underline underline-offset-2 cursor-pointer">
                    Change
                  </button>
                )}
              </>
            ) : (
              onChoosePillar && (
                <button
                  type="button"
                  onClick={onChoosePillar}
                  className="text-[#893d2d] font-semibold underline underline-offset-2 cursor-pointer"
                >
                  Choose an area for your gift: Education, Nutrition, Care & Mentorship or Discipleship ↓
                </button>
              )
            )}
          </div>
        </div>

        {/* Primary Giving Options (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch mb-8 sm:mb-10">
          {GIVING_TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;

            return (
              <div
                key={tier.id}
                id={`tier-card-${tier.id}`}
                data-journey-id={`tier-${tier.id}`}
                data-journey-role="tier-option"
                onClick={() => handleSelectTier(tier)}
                className={`relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-2 border-[#893d2d] shadow-lg ring-2 ring-[#893d2d]/10'
                    : 'bg-white/80 hover:bg-white border border-[#ebdcd0] hover:border-[#893d2d]/40 shadow-2xs'
                }`}
              >
                {/* Popular Badge */}
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#893d2d] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-2xs">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Amount & Frequency */}
                  {/* Frequency pill: red = monthly, gold = yearly, so the two are easy to tell apart */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-black text-[#893d2d] tracking-tight">
                      ${tier.amount}
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wide text-white shadow-sm ${
                        tier.frequency === 'annual' ? 'bg-[#b7791f]' : 'bg-[#893d2d]'
                      }`}
                    >
                      {tier.frequency === 'annual' ? 'Per year' : 'Per month'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#201a18] mb-2 leading-snug">
                    {tier.title}
                  </h3>

                  {/* Supporting Copy */}
                  <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed mb-5 font-normal">
                    {tier.supportingCopy}
                  </p>
                </div>

                <div>
                  {/* Primary CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDirectGive(tier);
                    }}
                    className={`w-full py-3 px-4 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#893d2d] hover:bg-[#733123] text-white shadow-sm'
                        : 'bg-[#faf8f5] hover:bg-[#893d2d] text-[#893d2d] hover:text-white border border-[#ebdcd0]'
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                  </button>

                  {/* Supporting Note for Monthly */}
                  {tier.supportingNote && (
                    <p className="text-[11px] text-[#717275] text-center mt-2.5 leading-tight">
                      {tier.supportingNote}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Giving Section */}
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-[#ebdcd0] p-5 sm:p-7 shadow-2xs">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-[#201a18] mb-0.5">
              I'd like to give another amount
            </h3>
            <p className="text-xs sm:text-sm text-[#717275]">
              Every gift helps Furaha support children in Kenya.
            </p>
          </div>

          {/* Frequency Toggle */}
          <div className="flex justify-center mb-4">
            <div className="bg-[#faf8f5] p-1 rounded-full border border-[#ebdcd0] inline-flex">
              <button
                type="button"
                onClick={() => setCustomFrequency('monthly')}
                className={`px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  customFrequency === 'monthly'
                    ? 'bg-[#893d2d] text-white shadow-2xs'
                    : 'text-[#717275] hover:text-[#201a18]'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setCustomFrequency('once')}
                className={`px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  customFrequency === 'once'
                    ? 'bg-[#893d2d] text-white shadow-2xs'
                    : 'text-[#717275] hover:text-[#201a18]'
                }`}
              >
                One-time
              </button>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {customPresets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setActiveCustomPreset(preset);
                  setCustomAmount(preset);
                  setSelectedTier('custom');
                }}
                className={`py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                  activeCustomPreset === preset && selectedTier === 'custom'
                    ? 'bg-[#893d2d] text-white border-[#893d2d] shadow-2xs'
                    : 'bg-[#faf8f5] text-[#201a18] border-[#ebdcd0] hover:border-[#893d2d]/50'
                }`}
              >
                ${preset}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setActiveCustomPreset('other');
                setSelectedTier('custom');
              }}
              className={`py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                activeCustomPreset === 'other' && selectedTier === 'custom'
                  ? 'bg-[#893d2d] text-white border-[#893d2d] shadow-2xs'
                  : 'bg-[#faf8f5] text-[#201a18] border-[#ebdcd0] hover:border-[#893d2d]/50'
              }`}
            >
              Custom
            </button>
          </div>

          {/* Custom Amount Input Field */}
          {activeCustomPreset === 'other' && (
            <div className="mb-4">
              <label htmlFor="custom-amount-input" className="block text-[11px] font-bold text-[#717275] uppercase tracking-wider mb-1.5">
                Enter Amount (USD)
              </label>
              <div className="relative rounded-2xl border border-[#ebdcd0] overflow-hidden focus-within:border-[#893d2d] focus-within:ring-2 focus-within:ring-[#893d2d]/20 transition-all">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-bold text-[#717275]">
                  $
                </span>
                <input
                  id="custom-amount-input"
                  type="number"
                  min="5"
                  max="10000"
                  value={customAmount || ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setCustomAmount(isNaN(val) ? 0 : val);
                  }}
                  className="w-full pl-7 pr-3 py-2.5 text-base font-bold text-[#201a18] bg-transparent outline-none"
                  placeholder="50"
                />
              </div>
            </div>
          )}

          {/* Continue Button */}
          <button
            onClick={handleCustomGive}
            id="custom-give-continue-btn"
            className="w-full bg-[#893d2d] hover:bg-[#733123] text-white font-bold py-3 px-5 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 text-sm sm:text-base cursor-pointer"
          >
            <span>Continue to Give ${customAmount || 50}{customFrequency === 'monthly' ? '/month' : ''} →</span>
          </button>
        </div>

      </div>
    </section>
  );
};
