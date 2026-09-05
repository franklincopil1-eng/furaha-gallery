import React from 'react';
import { Search, Users, Gift, TrendingUp, ArrowRight, Info } from 'lucide-react';

export const FollowOneGift: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'A need is identified',
      description:
        'Local caregivers, teachers, or community partners notice a child facing school interruption, lack of textbooks, or meal scarcity.',
      icon: Search,
      image: '/images/Education.webp',
      imageAlt: 'Students and caregivers in a Kenyan classroom identifying learning needs',
    },
    {
      step: '02',
      title: 'The community responds',
      description:
        'Furaha coordinates with trusted on-ground leaders to assess real requirements and determine practical assistance.',
      icon: Users,
      image: '/images/maggienew2.jpg',
      imageAlt: 'Furaha founder Maggie Mburu coordinating community support in Kenya',
    },
    {
      step: '03',
      title: 'Practical support is provided',
      description:
        'School tuition is paid, essential learning materials and textbooks are supplied, and food stores are replenished.',
      icon: Gift,
      image: '/images/volunteer-helping-with-donation-box1.jpeg',
      imageAlt: 'Providing food and essential supplies in Kenya',
    },
    {
      step: '04',
      title: 'The work continues',
      description:
        'The child remains consistently in class, receives steady nourishment, and is mentored with dignity in Christian faith.',
      icon: TrendingUp,
      image: '/images/volunteer-selecting-organizing-clothes-donations-charity.jpg',
      imageAlt: 'Youth care and mentorship in community outreach in Kenya',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-y border-[#ebdcd0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-2">
            The Journey of Support
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#201a18] tracking-tight mb-3">
            From a need to a response.
          </h2>
          
          {/* Transparent disclaimer banner */}
          <div className="inline-flex items-center gap-2 bg-[#faf8f5] border border-[#ebdcd0] px-4 py-2 rounded-full text-xs text-[#59524e] mt-1">
            <Info className="w-3.5 h-3.5 text-[#893d2d] shrink-0" />
            <span>A simplified example of how support can become practical action.</span>
          </div>
        </div>

        {/* 4-Step Interactive Visual Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#faf8f5] rounded-3xl overflow-hidden border border-[#ebdcd0] shadow-xs flex flex-col justify-between hover:border-[#893d2d]/30 transition-all hover:shadow-md group"
              >
                <div>
                  {/* Photo at the top of each card */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#201a18]">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#893d2d] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      Step {item.step}
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>

                    <h3 className="text-base font-bold text-[#201a18] tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#59524e] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-4 pt-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#717275] flex items-center justify-between border-t border-[#ebdcd0]/60 pt-3">
                    <span>Stage {idx + 1} of 4</span>
                    {idx < steps.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-[#893d2d] hidden lg:block" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
