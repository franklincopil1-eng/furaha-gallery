import React from 'react';
import { Shirt, Utensils, BookOpen, GraduationCap } from 'lucide-react';

export const HumanReality: React.FC = () => {
  const realityMoments = [
    {
      item: 'A uniform',
      keyword: 'Confidence',
      description:
        'A uniform can mean being able to walk through the school gate feeling ready to belong.',
      icon: Shirt,
      accent: 'bg-amber-50 text-amber-800 border-amber-200/80',
    },
    {
      item: 'A meal',
      keyword: 'Energy',
      description:
        'Nutrition can help a child concentrate, learn and grow.',
      icon: Utensils,
      accent: 'bg-orange-50 text-orange-800 border-orange-200/80',
    },
    {
      item: 'Books',
      keyword: 'Participation',
      description:
        'Learning materials give a child the tools to take part in school.',
      icon: BookOpen,
      accent: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    },
    {
      item: 'School fees',
      keyword: 'Continuity',
      description:
        'Education costs can determine whether a child remains in class.',
      icon: GraduationCap,
      accent: 'bg-rose-50 text-rose-800 border-rose-200/80',
    },
  ];

  return (
    <section
      id="human-reality-section"
      data-journey-id="human-reality"
      data-journey-role="problem-context"
      data-journey-entry="top-center"
      data-journey-exit="bottom-left"
      className="py-10 sm:py-14 bg-white border-y border-[#f0e6dc]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1">
            The Human Reality
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight">
            For a child, school is more than a classroom.
          </h2>
        </div>

        {/* 4 Concise Visual Moments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {realityMoments.map((moment, idx) => {
            const Icon = moment.icon;
            return (
              <div
                key={idx}
                className="bg-[#faf8f5] p-5 rounded-2xl border border-[#ebdcd0] flex flex-col justify-between"
              >
                <div>
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-3 ${moment.accent}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <span className="text-[11px] uppercase font-bold text-[#893d2d] tracking-wider block mb-0.5">
                    {moment.item}
                  </span>
                  
                  <h3 className="text-base font-bold text-[#201a18] mb-1.5">
                    {moment.keyword}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed font-normal">
                    {moment.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Closing Thought */}
        <div className="text-center max-w-xl mx-auto pt-4 border-t border-[#f2e6dc]">
          <h3 className="text-lg sm:text-xl font-bold text-[#201a18] mb-0.5">
            These aren't extras.
          </h3>
          <p className="text-sm sm:text-base text-[#717275] font-normal">
            They're part of what helps a child keep moving forward.
          </p>
        </div>

      </div>
    </section>
  );
};
