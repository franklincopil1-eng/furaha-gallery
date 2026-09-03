import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface DonationHeroProps {
  onPrimaryCtaClick: () => void;
  onSecondaryCtaClick: () => void;
}

export const DonationHero: React.FC<DonationHeroProps> = ({
  onPrimaryCtaClick,
  onSecondaryCtaClick,
}) => {
  return (
    <section className="relative pt-6 sm:pt-10 pb-10 sm:pb-14 overflow-hidden bg-gradient-to-b from-[#faf7f2] via-[#f7f0e6] to-[#faf8f5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Focused, Dignified Headline & Action */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#893d2d]/10 text-[#893d2d] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5">
              <span>Join the Work</span>
            </div>

            <h1
              id="hero-headline"
              className="text-[30px] sm:text-[40px] md:text-[46px] leading-[1.12] font-bold text-[#201a18] tracking-tight mb-3 sm:mb-4"
            >
              Every child deserves to know they'll be in school tomorrow.
            </h1>

            <p
              id="hero-subheadline"
              className="text-[#59524e] text-base sm:text-lg font-normal leading-relaxed mb-6 max-w-xl"
            >
              For some children in Kenya, school depends on things many of us take for granted — fees, a uniform, books, a meal and someone willing to stand beside them.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onPrimaryCtaClick}
                id="hero-primary-cta"
                className="inline-flex items-center justify-center gap-2 bg-[#893d2d] hover:bg-[#733123] text-white text-sm sm:text-base font-bold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-98 cursor-pointer"
              >
                <span>Help a Child Stay in School</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onSecondaryCtaClick}
                id="hero-secondary-cta"
                className="inline-flex items-center justify-center gap-1.5 text-[#717275] hover:text-[#893d2d] text-xs sm:text-sm font-semibold px-3 py-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
              >
                <span>See How Your Gift Helps</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Authentic, Dignified Kenyan Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-stone-200/80 bg-stone-100 aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] max-h-[360px] lg:max-h-[400px]">
              <img
                src="/images/volunteer-helping-with-donation-box1.jpeg"
                alt="Kenyan children receiving education support and mentorship in Nairobi"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium leading-snug drop-shadow-sm">
                <span>Furaha learning and community support center · Nairobi, Kenya</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
