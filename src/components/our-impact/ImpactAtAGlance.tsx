import React from 'react';
import { ShieldCheck, MapPin, Sparkles, HeartHandshake } from 'lucide-react';

export const ImpactAtAGlance: React.FC = () => {
  const verifiedStats = [
    {
      title: 'Real Work',
      subtitle: 'Documented from the field',
      icon: Sparkles,
      tag: 'Verified',
    },
    {
      title: 'Kenya',
      subtitle: 'Grounded in local communities',
      icon: MapPin,
      tag: 'On-the-ground',
    },
    {
      title: 'Four Areas',
      subtitle: 'Education · Nutrition · Care · Faith',
      icon: HeartHandshake,
      tag: 'Holistic',
    },
    {
      title: 'Active Support',
      subtitle: 'Tuition, meals & basic essentials',
      icon: ShieldCheck,
      tag: 'Direct Action',
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-[#ebdcd0]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Context Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1">
              Credibility & Scope
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#201a18] tracking-tight">
              Impact at a glance
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#717275] max-w-md font-normal">
            Ground-level initiatives centered on verified community needs across partner locations in Kenya.
          </p>
        </div>

        {/* 4 Grounded Metric/Truth Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {verifiedStats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#faf8f5] rounded-2xl p-5 border border-[#ebdcd0] shadow-xs flex flex-col justify-between hover:border-[#893d2d]/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#893d2d] bg-[#893d2d]/10 px-2 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#201a18] tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#59524e] leading-relaxed">
                    {item.subtitle}
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
