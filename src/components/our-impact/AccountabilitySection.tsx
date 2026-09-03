import React from 'react';
import { Camera, MapPin, RefreshCw, ShieldCheck } from 'lucide-react';

export const AccountabilitySection: React.FC = () => {
  const pillars = [
    {
      title: 'Real photography',
      description: 'Authentic media from Furaha activities and community visits in Kenya.',
      icon: Camera,
    },
    {
      title: 'Real communities',
      description: 'Specific locations and partners where the work actually takes place.',
      icon: MapPin,
    },
    {
      title: 'Real updates',
      description: 'Ongoing dispatches and reports as field initiatives develop.',
      icon: RefreshCw,
    },
    {
      title: 'Real accountability',
      description: 'Information published only when supported by Furaha records.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="accountability" className="py-14 sm:py-20 bg-white border-y border-[#ebdcd0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-2">
            Commitment to Truth
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#201a18] tracking-tight mb-3">
            We believe you should be able to see the work.
          </h2>
          <p className="text-sm sm:text-base text-[#59524e] font-normal leading-relaxed">
            Furaha shares real updates, authentic photographs, and documented accounts from the field, ensuring donors can witness the genuine fruit of their support.
          </p>
        </div>

        {/* 4 Accountability Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#faf8f5] rounded-3xl p-6 border border-[#ebdcd0] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#201a18] tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed">
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
