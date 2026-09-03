import React from 'react';
import { BookOpen, Utensils, HeartHandshake, Compass } from 'lucide-react';

export const OurWorkCoreIdea: React.FC = () => {
  const needs = [
    {
      title: 'Education',
      description: 'School fees and learning supplies help children stay in the classroom.',
      icon: BookOpen,
    },
    {
      title: 'Nutrition',
      description: 'Consistent food provides the daily nourishment needed to focus and learn.',
      icon: Utensils,
    },
    {
      title: 'Mentorship & Care',
      description: 'Guidance and practical care help young people navigate daily challenges.',
      icon: HeartHandshake,
    },
    {
      title: 'Christian Faith',
      description: 'Discipleship and spiritual encouragement provide enduring hope in Christ.',
      icon: Compass,
    },
  ];

  return (
    <section id="our-work-core-idea" className="py-10 sm:py-14 bg-white border-y border-[#f0e6dc]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1.5">
          Holistic Approach
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-3">
          A child needs more than one thing.
        </h2>

        <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed mb-8 max-w-xl mx-auto font-normal">
          Furaha brings education, nutrition, mentorship, and Christian faith together so children have the practical foundation to learn and grow.
        </p>

        {/* 4 Pillars Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
          {needs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#faf8f5] border border-[#ebdcd0] flex flex-col justify-between"
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center mb-2.5">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#201a18] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#59524e] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

