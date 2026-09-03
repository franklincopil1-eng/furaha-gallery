import React from 'react';
import { BookOpen, Utensils, HeartHandshake, Compass, ArrowDown, Sparkles } from 'lucide-react';

interface OurWorkIntroProps {
  onSelectPillar?: (pillarId: string) => void;
  onExploreAreasClick?: () => void;
}

export const OurWorkIntro: React.FC<OurWorkIntroProps> = ({
  onSelectPillar,
  onExploreAreasClick,
}) => {
  const handlePillarClick = (pillarId: string) => {
    if (onSelectPillar) {
      onSelectPillar(pillarId);
    } else {
      const el = document.getElementById(`work-area-${pillarId}`) || document.getElementById('four-work-areas');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreAreasClick = () => {
    if (onExploreAreasClick) {
      onExploreAreasClick();
    } else {
      const el = document.getElementById('four-work-areas');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pillars = [
    {
      id: 'learn',
      number: '01',
      title: 'LEARN',
      subtitle: 'Education & Tuition',
      description: 'School fees, exams, uniforms, and textbooks to keep children learning.',
      icon: BookOpen,
    },
    {
      id: 'eat',
      number: '02',
      title: 'EAT',
      subtitle: 'Daily Nutrition',
      description: 'Staple foods, hot center meals, and household food security.',
      icon: Utensils,
    },
    {
      id: 'grow',
      number: '03',
      title: 'GROW',
      subtitle: 'Mentorship & Care',
      description: 'Character coaching, hygiene supplies, and loving adult guidance.',
      icon: HeartHandshake,
    },
    {
      id: 'believe',
      number: '04',
      title: 'BELIEVE',
      subtitle: 'Christian Faith',
      description: 'Bibles, devotional gatherings, and enduring hope in Jesus Christ.',
      icon: Compass,
    },
  ];

  return (
    <section
      id="our-work-intro"
      className="relative z-20 bg-[#faf8f5] rounded-t-2xl sm:rounded-t-3xl pt-2 sm:pt-4 pb-10 sm:pb-14 border-b border-[#ebdcd0]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Connector Header Bar: Naturally bridges the hero and the programmatic pillars */}
        <div className="pb-3.5 sm:pb-4 mb-6 sm:mb-8 border-b border-[#ebdcd0] flex flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Four Pillars Quick Spectrum Selector */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] font-mono tracking-widest text-[#893d2d] uppercase font-semibold hidden md:inline-block">
              Pillars of Care:
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => handlePillarClick(pillar.id)}
                    className="group inline-flex items-center gap-1 text-left cursor-pointer transition-colors py-1 px-2 rounded-md hover:bg-[#893d2d]/10 focus-visible:outline-2 focus-visible:outline-[#893d2d]"
                    aria-label={`Jump to ${pillar.title} Pillar`}
                  >
                    <span className="font-mono text-[#893d2d] text-xs font-bold">{pillar.number}</span>
                    <span className="text-xs font-semibold text-[#201a18] group-hover:text-[#893d2d] transition-colors tracking-wide">
                      {pillar.title}
                    </span>
                    <ArrowDown className="w-3 h-3 text-[#a19a95] group-hover:text-[#893d2d] group-hover:translate-y-0.5 transition-all hidden sm:inline-block" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explore Areas Action */}
          <button
            type="button"
            id="our-work-intro-explore-cta"
            onClick={handleExploreAreasClick}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-medium tracking-wider uppercase text-[#59524e] hover:text-[#893d2d] transition-colors cursor-pointer py-1 group focus-visible:outline-2 focus-visible:outline-[#893d2d] rounded shrink-0"
            aria-label="Explore all 4 interconnected areas below"
          >
            <span className="tracking-wider">Explore 4 Areas</span>
            <span className="text-[#893d2d] inline-block transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </button>
        </div>

        {/* Core Narrative & Programmatic Depth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Documentary Action Visual */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl sm:rounded-3xl p-2 bg-[#fbf8f4] border border-[#ebdcd0] shadow-xs">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100">
                <picture>
                  <source srcSet="/images/Nutrition.webp" type="image/webp" />
                  <img
                    src="/images/Nutrition.png"
                    alt="Food packages and daily nutrition in Kenya supported by Furaha Ministries"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#893d2d] text-xs font-semibold px-3 py-1 rounded-full shadow-2xs border border-[#ebdcd0] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#893d2d]" />
                  <span>Comprehensive Direct Delivery</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-medium leading-tight drop-shadow-xs">
                  Food staples, school kits &amp; mentorship delivered directly to Kenyan partner centers
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Grounded Human & Methodological Narrative */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#893d2d]/10 text-[#893d2d] text-xs font-bold tracking-wider uppercase mb-3 border border-[#893d2d]/20">
              <span>The Core Philosophy</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#201a18] tracking-tight mb-3 leading-[1.2]">
              A child needs more than one thing.
            </h2>

            <p className="text-base text-[#59524e] leading-relaxed mb-6 font-normal">
              A child cannot learn on an empty stomach, and tuition alone cannot heal emotional distress. Furaha unites four interconnected pillars so children in Kenya receive whole-person care that lasts.
            </p>

            {/* 4 Pillars Strip (Distinctive from Who We Serve's 3 items) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3.5 sm:p-4 rounded-2xl bg-[#fbf8f4] border border-[#ebdcd0] mb-4">
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handlePillarClick(item.id)}
                    className="flex items-start gap-2.5 text-left p-1.5 rounded-lg hover:bg-white/80 transition-colors cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#893d2d] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-[#893d2d] font-bold">{item.number}</span>
                        <span className="text-xs font-bold text-[#201a18] block leading-tight group-hover:text-[#893d2d] transition-colors">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#717275] leading-snug block mt-0.5">
                        {item.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-[#717275] flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#893d2d]" />
              <span>Each pillar is coordinated directly with Kenyan community leaders and caregiver staff.</span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
