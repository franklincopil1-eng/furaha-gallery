import React, { useEffect, useRef, useState } from 'react';
import { X, Lock } from 'lucide-react';
import { GivingPillar } from '../../data/givingPillars';
import { getGivebutterCheckoutUrl } from '../../lib/givebutter';

interface PillarGiveModalProps {
  pillar: GivingPillar;
  onClose: () => void;
}

const PRESET_AMOUNTS = [15, 30, 50, 100];

/**
 * Opens when a donor picks one of the four areas, so the chosen area carries
 * straight through to checkout. Styled to match the Donate page itself:
 * cream panel, light centred header, and the same toggle, presets and button
 * as the "I'd like to give another amount" box in GivingOptions.
 * Bottom sheet on mobile, centred panel on larger screens.
 */
export const PillarGiveModal: React.FC<PillarGiveModalProps> = ({ pillar, onClose }) => {
  const [frequency, setFrequency] = useState<'monthly' | 'once'>('monthly');
  const [amount, setAmount] = useState<number>(30);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState<number>(50);
  const closeRef = useRef<HTMLButtonElement>(null);
  const Icon = pillar.icon;

  // Close on Escape, lock page scroll, and move focus into the panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const finalAmount = isCustom ? customAmount || 50 : amount;
  const freqLabel = frequency === 'monthly' ? '/month' : '';

  const handleGive = () => {
    const url = getGivebutterCheckoutUrl({
      amount: finalAmount,
      frequency,
      cause: pillar.title,
      fundId: pillar.givebutterFundId || undefined,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const presetClass = (active: boolean) =>
    `py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
      active
        ? 'bg-[#893d2d] text-white border-[#893d2d] shadow-2xs'
        : 'bg-[#faf8f5] text-[#201a18] border-[#ebdcd0] hover:border-[#893d2d]/50'
    }`;

  const toggleClass = (active: boolean) =>
    `px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
      active ? 'bg-[#893d2d] text-white shadow-2xs' : 'text-[#717275] hover:text-[#201a18]'
    }`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-[#201a18]/50 backdrop-blur-xs sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pillar-give-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-md bg-[#faf7f2] border border-[#ebdcd0] rounded-t-3xl sm:rounded-3xl shadow-lg max-h-[90vh] overflow-y-auto px-4 pt-5 pb-5 sm:px-6 sm:pt-6"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-[#ebdcd0] text-[#59524e] hover:text-[#201a18] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header: same pattern as the page's section headers */}
        <div className="text-center px-8 mb-4">
          <div className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center ${pillar.badgeColor}`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1">
            Your gift
          </span>
          <h3 id="pillar-give-title" className="text-2xl font-bold text-[#201a18] tracking-tight">
            Give to {pillar.title}
          </h3>
          <p className="text-sm text-[#59524e] mt-1">{pillar.summary}</p>
          <p className="text-xs text-[#717275] mt-1.5">{pillar.items.join(' · ')}</p>
        </div>

        {/* Amount card: same as "I'd like to give another amount" */}
        <div className="bg-white rounded-3xl border border-[#ebdcd0] p-5 shadow-2xs">
          <div className="flex justify-center mb-4">
            <div className="bg-[#faf8f5] p-1 rounded-full border border-[#ebdcd0] inline-flex">
              <button type="button" onClick={() => setFrequency('monthly')} className={toggleClass(frequency === 'monthly')}>
                Monthly
              </button>
              <button type="button" onClick={() => setFrequency('once')} className={toggleClass(frequency === 'once')}>
                One-time
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {PRESET_AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => {
                  setIsCustom(false);
                  setAmount(a);
                }}
                className={presetClass(!isCustom && amount === a)}
              >
                ${a}
              </button>
            ))}
            <button type="button" onClick={() => setIsCustom(true)} className={presetClass(isCustom)}>
              Custom
            </button>
          </div>

          {isCustom && (
            <div className="mb-4 relative rounded-2xl border border-[#ebdcd0] overflow-hidden focus-within:border-[#893d2d] focus-within:ring-2 focus-within:ring-[#893d2d]/20 transition-all">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-bold text-[#717275]">$</span>
              <input
                type="number"
                min="5"
                max="10000"
                autoFocus
                value={customAmount || ''}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setCustomAmount(isNaN(val) ? 0 : val);
                }}
                aria-label="Custom amount in US dollars"
                className="w-full pl-7 pr-3 py-2.5 text-base font-bold text-[#201a18] bg-transparent outline-none"
                placeholder="50"
              />
            </div>
          )}

          <button
            type="button"
            onClick={handleGive}
            className="w-full bg-[#893d2d] hover:bg-[#733123] text-white font-bold py-3 px-5 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 text-sm sm:text-base cursor-pointer"
          >
            <span>
              Give ${finalAmount}
              {freqLabel} to {pillar.title} →
            </span>
          </button>

          <p className="text-xs text-[#717275] flex items-center justify-center gap-1.5 mt-3">
            <Lock className="w-3 h-3" />
            Payments are handled by Givebutter.
          </p>
        </div>
      </div>
    </div>
  );
};
