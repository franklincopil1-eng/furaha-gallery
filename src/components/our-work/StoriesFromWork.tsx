import React from 'react';
import { MapPin, ArrowRight, BookOpen, Utensils, Heart } from 'lucide-react';

interface StoriesFromWorkProps {
  onExploreImpact: () => void;
}

export const StoriesFromWork: React.FC<StoriesFromWorkProps> = ({ onExploreImpact }) => {
  const spotlights = [
    {
      id: 1,
      title: 'School Attendance & Learning Supplies',
      location: 'Kenya',
      image: '/Education.jpg',
      imageAlt: 'Students and community learning in Kenya',
      icon: BookOpen,
      category: 'Education Support',
      description:
        'Helping children stay in the classroom through school fee assistance, learning materials, and basic academic support in partner communities.',
    },
    {
      id: 2,
      title: 'Daily Meal & Nutrition Provisions',
      location: 'Kenya',
      image: '/Nutrition.png',
      imageAlt: 'Food care packages, hot meals, and nutrition support in Kenya',
      icon: Utensils,
      category: 'Nutrition Support',
      description:
        'Supporting partner children’s centers and local households with staple food supplies and reliable daily meals.',
    },
    {
      id: 3,
      title: 'Care Packages & Community Outreach',
      location: 'Huruma · Nairobi',
      image: '/volunteer-selecting-organizing-clothes-donations-charity.jpg',
      imageAlt: 'Outreach and supply sorting in Huruma',
      icon: Heart,
      category: 'Outreach & Care',
      description:
        'Providing clothing, hygiene essentials, and personal guidance for vulnerable youth and families in the community.',
    },
  ];

  return (
    <section id="stories-from-work" className="py-10 sm:py-16 bg-[#faf7f2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1.5">
            Initiative Spotlights
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-2">
            Focus areas in action
          </h2>
          <p className="text-xs sm:text-sm text-[#59524e] font-normal leading-relaxed">
            How our four pillars translate into practical support across partner locations in Kenya.
          </p>
        </div>

        {/* Spotlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-6">
          {spotlights.map((spotlight) => (
            <div
              key={spotlight.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#ebdcd0] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/11] bg-stone-100 overflow-hidden">
                  <img
                    src={spotlight.image}
                    alt={spotlight.imageAlt}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-normal px-2 py-0.5 rounded-md flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#f7e4b7]" />
                    <span>{spotlight.location}</span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[#893d2d] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {spotlight.category}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-sm sm:text-base font-bold text-[#201a18] tracking-tight mb-2 leading-snug">
                    {spotlight.title}
                  </h3>
                  <p className="text-xs text-[#59524e] leading-relaxed">
                    {spotlight.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={onExploreImpact}
                  className="w-full inline-flex items-center justify-between text-xs font-semibold text-[#893d2d] hover:text-[#733123] py-2 px-3 rounded-lg bg-[#faf8f5] hover:bg-[#ebdcd0]/40 transition-colors cursor-pointer"
                >
                  <span>View impact reports</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

