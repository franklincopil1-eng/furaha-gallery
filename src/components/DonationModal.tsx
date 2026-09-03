import React, { useState } from 'react';
import { Heart, Check, ExternalLink, Lock, BookOpen, X } from 'lucide-react';
import { DonationOption } from '../types';
import { supabaseDb } from '../supabase/client';
import { getGivebutterCheckoutUrl } from '../lib/givebutter';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCause?: string;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  initialCause,
}) => {
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [selectedAmount, setSelectedAmount] = useState<number | 'other'>(50);
  const [customAmount, setCustomAmount] = useState<string>('75');
  const [selectedCause, setSelectedCause] = useState<string>(
    initialCause || 'Where Needed Most'
  );
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const donationOptions: DonationOption[] = [
    {
      amount: 25,
      label: '$25',
      impactNote: 'Provides one week of warm nutritious meals & clean water for a child.',
    },
    {
      amount: 50,
      label: '$50',
      impactNote: 'Covers full school supplies, shoes, uniform, and books for a semester.',
    },
    {
      amount: 100,
      label: '$100',
      impactNote: 'Provides comprehensive healthcare, nutritional support & mentorship.',
    },
    {
      amount: 500,
      label: '$500',
      impactNote: 'Equips an entire learning center with classroom resources & nutrition.',
    },
    {
      amount: 'other',
      label: 'Other',
      impactNote: 'Every contribution brings hope and transforming love to a child.',
    },
  ];

  const currentAmountValue =
    selectedAmount === 'other' ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleGiveButterRedirect = () => {
    const url = getGivebutterCheckoutUrl({
      amount: currentAmountValue,
      frequency,
      cause: selectedCause,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSimulateDonation = (e: React.FormEvent) => {
    e.preventDefault();
    supabaseDb.recordDonation({
      donor_name: 'Faithful Donor (Pledged)',
      donor_email: 'pledge@furahaministries.org',
      amount: currentAmountValue,
      currency: 'USD',
      frequency,
      cause_designated: selectedCause,
      status: 'succeeded',
    });
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-[28px] overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col border border-gray-100">
        {/* Header with warm rust banner */}
        <div className="bg-[#893d2d] text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors font-bold"
            aria-label="Close donation modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#f4b83e] text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Direct Child Support</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
            Give Life & Hope to a Child
          </h3>
          <p className="text-xs sm:text-sm text-white/85 mt-1">
            Furaha Ministries • 100% committed to transparent stewardship
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="text-2xl font-black text-[#893d2d] mb-2 font-display">
                Thank You for Your Generosity!
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto mb-6">
                Your pledge of <strong>${currentAmountValue} ({frequency})</strong> directed to{' '}
                <strong>{selectedCause}</strong> will touch lives in Kenya immediately. God bless you!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleGiveButterRedirect}
                  className="bg-[#893d2d] text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-[#733123] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Complete Online via GiveButter</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    onClose();
                  }}
                  className="bg-gray-100 text-gray-700 font-semibold text-sm px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Frequency Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2.5">
                  1. How often would you like to give?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFrequency('once')}
                    className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 ${
                      frequency === 'once'
                        ? 'bg-[#893d2d] text-white border-[#893d2d] shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#893d2d]/50'
                    }`}
                  >
                    Give Once
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 relative ${
                      frequency === 'monthly'
                        ? 'bg-[#893d2d] text-white border-[#893d2d] shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#893d2d]/50'
                    }`}
                  >
                    <span>Give Monthly</span>
                    <span className="absolute -top-2 right-2 bg-[#f4b83e] text-[#2d1e16] text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                      Best Impact
                    </span>
                  </button>
                </div>
              </div>

              {/* Amount Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2.5">
                  2. Choose the amount
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-3">
                  {donationOptions.map((opt) => (
                    <button
                      key={String(opt.amount)}
                      type="button"
                      onClick={() => setSelectedAmount(opt.amount)}
                      className={`py-3 px-2 rounded-xl text-sm font-extrabold transition-all border-2 ${
                        selectedAmount === opt.amount
                          ? 'bg-[#893d2d] text-white border-[#893d2d] shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-[#893d2d]/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                {selectedAmount === 'other' && (
                  <div className="mt-3 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">
                      $
                    </span>
                    <input
                      type="number"
                      min="1"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter custom amount"
                      className="w-full bg-[#fdfbf9] border-2 border-[#893d2d] rounded-xl pl-9 pr-4 py-3 text-base font-bold text-[#2e2e2e] focus:outline-none"
                    />
                  </div>
                )}

                {/* Dynamic Impact Note */}
                <div className="mt-3 bg-[#faedd0]/60 p-3.5 rounded-xl border border-[#f0dfb8] text-xs text-[#6e2e21] flex items-start gap-2">
                  <BookOpen className="w-4 h-4 shrink-0 mt-0.5 text-[#893d2d]" />
                  <span>
                    {donationOptions.find((o) => o.amount === selectedAmount)?.impactNote ||
                      'Every gift empowers a child to step out of vulnerability.'}
                  </span>
                </div>
              </div>

              {/* Designation / Cause */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  3. Direct your gift
                </label>
                <select
                  value={selectedCause}
                  onChange={(e) => setSelectedCause(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#893d2d]"
                >
                  <option value="Where Needed Most">Where Needed Most (General Fund)</option>
                  <option value="Nutrition">Nutrition & Daily Meal Program</option>
                  <option value="Education">Education & School Scholarship Fund</option>
                  <option value="Discipleship">Discipleship & Spiritual Mentorship</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleGiveButterRedirect}
                  className="w-full bg-[#893d2d] hover:bg-[#733123] text-white font-bold text-base py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>
                    Give ${currentAmountValue || 0} {frequency === 'monthly' ? '/ Month' : 'Now'} via GiveButter
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleSimulateDonation}
                  className="w-full bg-[#f4f1ed] hover:bg-[#e8e2d8] text-[#555] font-semibold text-xs py-2.5 rounded-xl transition-colors text-center"
                >
                  Submit Pledge or offline inquiry
                </button>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-2">
                <Lock className="w-3.5 h-3.5 text-neutral-600" />
                <span>Secure 256-bit encrypted donation • Givebutter verified</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
