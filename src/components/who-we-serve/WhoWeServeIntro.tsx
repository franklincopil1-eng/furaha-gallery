import React from 'react';
import { BookOpen, Utensils, HeartHandshake, MapPin, ArrowDown } from 'lucide-react';

interface WhoWeServeIntroProps {
  onFirstCommunityClick?: () => void;
  onViewCommunitiesClick?: () => void;
}

export const WhoWeServeIntro: React.FC<WhoWeServeIntroProps> = ({
  onFirstCommunityClick,
  onViewCommunitiesClick,
}) => {
  const handleFirstCommunityClick = () => {
    if (onFirstCommunityClick) {
      onFirstCommunityClick();
    } else {
      const el = document.getElementById('amani-childrens-home') || document.getElementById('where-we-serve-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewCommunitiesClick = () => {
    if (onViewCommunitiesClick) {
      onViewCommunitiesClick();
    } else {
      const el = document.getElementById('where-we-serve-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="who-we-serve-intro"
      className="relative z-20 bg-[#faf8f5] rounded-t-2xl sm:rounded-t-3xl pt-2 sm:pt-4 pb-10 sm:pb-14 border-b border-[#ebdcd0]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Connector Header Bar: Naturally bridges the hero and the community narrative */}
        <div className="pb-3.5 sm:pb-4 mb-6 sm:mb-8 border-b border-[#ebdcd0] flex flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* First Partner Link */}
          <button
            type="button"
            onClick={handleFirstCommunityClick}
            className="group text-left cursor-pointer transition-colors py-0.5 focus-visible:outline-2 focus-visible:outline-[#893d2d] rounded"
            aria-label="Go to Amani Children's Home"
          >
            <span className="block text-[10px] font-mono tracking-widest text-[#893d2d] uppercase mb-0.5 font-semibold">
              Partner Community
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-semibold text-[#201a18] group-hover:text-[#893d2d] transition-colors">
              <span className="font-mono text-[#893d2d] text-xs font-bold">01</span>
              <span className="text-[#a19a95]">—</span>
              <span className="tracking-wide">AMANI CHILDREN&apos;S HOME</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#893d2d] group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>

          {/* View Communities Action */}
          <button
            type="button"
            id="who-we-serve-secondary-cta"
            onClick={handleViewCommunitiesClick}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-medium tracking-wider uppercase text-[#59524e] hover:text-[#893d2d] transition-colors cursor-pointer py-1 group focus-visible:outline-2 focus-visible:outline-[#893d2d] rounded shrink-0"
            aria-label="View communities below"
          >
            <span className="tracking-wider">View communities</span>
            <span className="text-[#893d2d] inline-block transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </button>
        </div>

        {/* Core Narrative & Grounded Partner Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Documentary Photograph */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl sm:rounded-3xl p-2 bg-[#fbf8f4] border border-[#ebdcd0] shadow-xs">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100">
                <picture>
                  <source srcSet="/images/field-classroom-4.webp" type="image/webp" />
                  <img
                    src="/images/field-classroom-4.jpg"
                    alt="Community mentors and children in Kenya"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#893d2d] text-xs font-semibold px-3 py-1 rounded-full shadow-2xs border border-[#ebdcd0] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#893d2d]" />
                  <span>Kenya Community Programs</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-medium leading-tight drop-shadow-xs">
                  Working alongside local teachers, mentors, and caregivers in Kenya
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Grounded Human Narrative */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#893d2d]/10 text-[#893d2d] text-xs font-bold tracking-wider uppercase mb-3 border border-[#893d2d]/20">
              <span>Our Approach</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#201a18] tracking-tight mb-3 leading-[1.2]">
              Working directly with local partners in Kenya.
            </h2>

            <p className="text-base text-[#59524e] leading-relaxed mb-6 font-normal">
              Furaha works with children&apos;s homes, schools, and community leaders in Kenya to help children stay in school, receive regular meals, and grow with caring mentorship.
            </p>

            {/* Core Support Areas Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#fbf8f4] border border-[#ebdcd0] mb-4">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#201a18] block leading-tight">Education</span>
                  <span className="text-[11px] text-[#717275] leading-snug block mt-0.5">School fees, exams &amp; classroom supplies</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center shrink-0 mt-0.5">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#201a18] block leading-tight">Nutrition</span>
                  <span className="text-[11px] text-[#717275] leading-snug block mt-0.5">Daily meals &amp; reliable food supplies</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center shrink-0 mt-0.5">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#201a18] block leading-tight">Mentorship</span>
                  <span className="text-[11px] text-[#717275] leading-snug block mt-0.5">Care, guidance &amp; spiritual support</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#717275] flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#893d2d]" />
              <span>Support is delivered directly to our partner schools and children&apos;s homes.</span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

