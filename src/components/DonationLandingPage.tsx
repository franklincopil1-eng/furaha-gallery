import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { GivingOptions } from './donation/GivingOptions';
import { ImpactBreakdown } from './donation/ImpactBreakdown';
import { GiftJourney } from './donation/GiftJourney';
import { ImpactProof } from './donation/ImpactProof';
import { TrustSection } from './donation/TrustSection';
import { FounderSection } from './donation/FounderSection';
import { FinalDonationCTA } from './donation/FinalDonationCTA';
import { StickyMobileCTA } from './donation/StickyMobileCTA';

interface DonationLandingPageProps {
  onBackToHome: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  initialCause?: string;
  initialFrequency?: 'monthly' | 'annual' | 'once';
  initialAmount?: number;
}

export const DonationLandingPage: React.FC<DonationLandingPageProps> = ({
  onBackToHome,
  onNavigateToSection,
  initialFrequency = 'monthly',
  initialAmount = 30,
}) => {
  const [selectedTierId, setSelectedTierId] = useState<string>(
    initialAmount === 15 ? '15' : initialAmount === 300 ? '300' : '30'
  );
  const [currentAmount, setCurrentAmount] = useState<number>(initialAmount || 30);
  const [currentFrequency, setCurrentFrequency] = useState<'monthly' | 'annual' | 'once'>(
    initialFrequency
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Donate to Furaha Ministries | Support Children in Kenya';
  }, []);

  useEffect(() => {
    if (initialAmount) {
      setCurrentAmount(initialAmount);
      setSelectedTierId(
        initialAmount === 15 ? '15' : initialAmount === 300 ? '300' : '30'
      );
    }
    if (initialFrequency) {
      setCurrentFrequency(initialFrequency);
    }
  }, [initialAmount, initialFrequency]);

  const scrollToGivingSection = () => {
    const el = document.getElementById('giving-options-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTierSelected = (tierId: string, amount: number, freq: 'monthly' | 'annual' | 'once') => {
    setSelectedTierId(tierId);
    setCurrentAmount(amount);
    setCurrentFrequency(freq);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#201a18] flex flex-col font-sans selection:bg-[#893d2d] selection:text-white relative overflow-hidden">
      {/* Top Navigation Bar: Reassuring, Clear, Effortless return */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#ebdcd0] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#59524e] hover:text-[#893d2d] transition-colors cursor-pointer py-1.5 px-2.5 -ml-2.5 rounded-lg hover:bg-[#faf7f2]"
            aria-label="Return to Home"
          >
            <ArrowLeft className="w-4 h-4 text-[#893d2d]" />
            <span>Home</span>
          </button>

          <div className="text-center px-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#893d2d]">
              Furaha Ministries · Kenya
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#717275]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="hidden sm:inline font-medium">Secure Giving via Givebutter</span>
            <span className="sm:hidden font-medium">Secure</span>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-16 lg:pb-0 relative z-10">
        {/* 1. The Giving Moment (Directly at the top: $15, $30, $300 & Custom Giving) */}
        <GivingOptions
          selectedTierId={selectedTierId}
          onTierSelect={handleTierSelected}
        />

        {/* 2. Where Support Goes */}
        <ImpactBreakdown />

        {/* 3. The Journey of Your Gift (01 → 02 → 03 → 04) */}
        <GiftJourney />

        {/* 4. Evidence of the Work (Real People, Real Work, Real Kenya) */}
        <ImpactProof />

        {/* 5. Accountability (Where We Work, What We Support, Payment Processing, Direct Contact) */}
        <TrustSection
          onNavigateToSection={onNavigateToSection}
          onBackToHome={onBackToHome}
        />

        {/* 6. Leadership & Calling (Founder Story - Maggie Mburu) */}
        <FounderSection
          onLearnMore={() => {
            if (onNavigateToSection) {
              onNavigateToSection('story');
            } else {
              onBackToHome();
            }
          }}
        />

        {/* 7. Your Opportunity to Help (Final Call to Action) */}
        <FinalDonationCTA />
      </main>

      {/* Mobile Sticky CTA for easy giving */}
      <StickyMobileCTA
        onScrollToGiving={scrollToGivingSection}
        selectedAmount={currentAmount}
        selectedFrequency={currentFrequency}
      />
    </div>
  );
};
