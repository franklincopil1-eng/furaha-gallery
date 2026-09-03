import React from 'react';
import { BookOpen, Utensils, Shirt, HeartHandshake, ShieldCheck } from 'lucide-react';

export const TransparencySection: React.FC = () => {
  const categories = [
    {
      title: 'Education',
      description: 'School-related support, tuition backing, textbooks, and learning supplies.',
      icon: BookOpen,
    },
    {
      title: 'Nutrition',
      description: 'Staple grain supplies, fresh food stores, and nutritional meal support.',
      icon: Utensils,
    },
    {
      title: 'Essentials',
      description: 'Clothing, footwear, hygiene supplies, and basic practical daily needs.',
      icon: Shirt,
    },
    {
      title: 'Care & Mentorship',
      description: 'Christian discipleship, wellbeing guidance, and community mentorship.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-2">
            Resource Allocation
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#201a18] tracking-tight mb-3">
            What your support helps make possible
          </h2>
          <p className="text-sm sm:text-base text-[#59524e] font-normal leading-relaxed">
            Resources are stewarded directly to meet the practical, ongoing needs of children and partners.
          </p>
        </div>

        {/* 4 Clean Visual Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-[#ebdcd0] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#201a18] tracking-tight mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Priority Clarification Statement */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#ebdcd0] flex items-start gap-3.5 max-w-3xl">
          <div className="w-8 h-8 rounded-full bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed font-normal">
            <strong className="text-[#201a18] font-semibold">Grounded in actual needs:</strong> Every child's circumstances are different. Support is directed according to verified needs and the priorities of the work in Kenya.
          </p>
        </div>

      </div>
    </section>
  );
};
