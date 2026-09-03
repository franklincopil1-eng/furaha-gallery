import React from 'react';
import { BookOpen, Utensils, Shirt, HeartHandshake } from 'lucide-react';

export const ImpactBreakdown: React.FC = () => {
  const categories = [
    {
      title: 'Education',
      icon: BookOpen,
      items: [
        'School fees & registration',
        'Textbooks & syllabus books',
        'Classroom learning materials',
        'Term examination costs',
      ],
      badgeColor: 'bg-amber-100/70 text-amber-900',
    },
    {
      title: 'Nutrition',
      icon: Utensils,
      items: [
        'Daily warm school meals',
        'Targeted nutritional support',
      ],
      badgeColor: 'bg-orange-100/70 text-orange-900',
    },
    {
      title: 'Essentials',
      icon: Shirt,
      items: [
        'Tailored school uniforms',
        'Sturdy school shoes',
        'Pens, notebooks & stationery',
      ],
      badgeColor: 'bg-emerald-100/70 text-emerald-900',
    },
    {
      title: 'Care',
      icon: HeartHandshake,
      items: [
        'Mentorship & encouragement',
        'Child wellbeing check-ins',
        'Emergency household support',
      ],
      badgeColor: 'bg-rose-100/70 text-rose-900',
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-white border-y border-[#f0e6dc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1">
            Where Support Goes
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-2">
            Your gift becomes more than a donation.
          </h2>
          <p className="text-xs sm:text-sm text-[#59524e] font-normal leading-relaxed">
            It can help provide what a child needs to learn, grow, and stay enrolled.
          </p>
        </div>

        {/* 4 Pillars Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-[#faf8f5] rounded-2xl p-4 sm:p-5 border border-[#ebdcd0] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${cat.badgeColor}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-sm font-bold text-[#201a18]">
                      {cat.title}
                    </h3>
                  </div>

                  <ul className="space-y-1.5">
                    {cat.items.map((item, i) => (
                      <li key={i} className="text-xs text-[#59524e] flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#893d2d] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparency note */}
        <div className="bg-[#faf7f2] rounded-xl p-3.5 border border-[#ebdcd0] text-center max-w-xl mx-auto">
          <p className="text-xs text-[#59524e] font-medium leading-relaxed">
            Every child's circumstances are unique. Your gift helps Furaha direct funds where the need is greatest.
          </p>
        </div>

      </div>
    </section>
  );
};
