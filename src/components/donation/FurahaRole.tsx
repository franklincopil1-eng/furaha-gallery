import React from 'react';
import { ArrowRight, BookOpen, Utensils, HeartHandshake, Compass } from 'lucide-react';

export const FurahaRole: React.FC = () => {
  const pillars = [
    {
      action: 'LEARN',
      title: 'Education',
      desc: 'School fees, books & learning materials.',
      icon: BookOpen,
      color: 'text-amber-900 bg-amber-100/80',
    },
    {
      action: 'EAT',
      title: 'Nutrition',
      desc: 'Daily meals and nutritional support.',
      icon: Utensils,
      color: 'text-orange-900 bg-orange-100/80',
    },
    {
      action: 'GROW',
      title: 'Care & Mentorship',
      desc: 'Encouragement, wellbeing & guidance.',
      icon: HeartHandshake,
      color: 'text-emerald-900 bg-emerald-100/80',
    },
    {
      action: 'BELIEVE',
      title: 'Faith',
      desc: 'Christ-centered hope and discipleship.',
      icon: Compass,
      color: 'text-rose-900 bg-rose-100/80',
    },
  ];

  return (
    <section
      id="furaha-role-section"
      data-journey-id="furaha-role"
      data-journey-role="intervention"
      data-journey-entry="left-fold"
      data-journey-exit="bottom-right"
      className="py-10 sm:py-14 bg-[#faf7f2]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1">
            Our Approach
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-2">
            That's where Furaha comes in.
          </h2>
          <p className="text-sm sm:text-base text-[#59524e] font-normal leading-relaxed">
            Furaha walks alongside overlooked children and young people, helping address practical needs while supporting their education, wellbeing and growth.
          </p>
        </div>

        {/* Visual Flow: LEARN → EAT → GROW → BELIEVE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-5 border border-[#e8ded5] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-black tracking-wider text-[#893d2d] bg-[#893d2d]/10 px-2 py-0.5 rounded-md">
                      {pillar.action}
                    </span>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${pillar.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#201a18] mb-1">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#717275] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {idx < pillars.length - 1 && (
                  <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-[#893d2d]/30">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
