import React from 'react';
import { ArrowRight, Home, School, HeartHandshake } from 'lucide-react';

interface ConnectCommunitiesProps {
  onNavigateToWhoWeServe: () => void;
}

export const ConnectCommunities: React.FC<ConnectCommunitiesProps> = ({ onNavigateToWhoWeServe }) => {
  const partnerSummaries = [
    {
      name: "Amani Children's Home",
      role: 'Residential care, education support, and daily nutrition for vulnerable children.',
      icon: Home,
    },
    {
      name: 'West Hill Community',
      role: 'Community learning support, study resources, and assistance for local students.',
      icon: School,
    },
  ];

  return (
    <section id="connect-communities" className="py-10 sm:py-14 bg-[#faf7f2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1.5">
          Locations
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-2">
          The work happens in real communities.
        </h2>

        <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed mb-6 max-w-xl mx-auto font-normal">
          Furaha walks alongside local partners, caregivers, and children across partner locations in Kenya.
        </p>

        {/* Compact Community Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 text-left max-w-2xl mx-auto">
          {partnerSummaries.map((partner, idx) => {
            const Icon = partner.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-[#ebdcd0] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-md bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#201a18]">
                      {partner.name}
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#59524e] leading-relaxed">
                    {partner.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Bridge to Who We Serve */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-[#ebdcd0] shadow-xs max-w-xl mx-auto">
          <div className="text-left text-xs text-[#59524e]">
            <strong className="text-[#201a18] block">Who We Serve</strong>
            <span>Explore the homes, communities, and partner locations in detail.</span>
          </div>
          <button
            onClick={onNavigateToWhoWeServe}
            id="connect-who-we-serve-cta"
            className="shrink-0 inline-flex items-center gap-1.5 bg-[#893d2d] hover:bg-[#733123] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <span>Who We Serve</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};

