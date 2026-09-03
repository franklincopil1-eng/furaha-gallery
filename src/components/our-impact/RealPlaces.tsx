import React from 'react';
import { MapPin, ArrowRight, Home, School, HeartHandshake } from 'lucide-react';

interface RealPlacesProps {
  onNavigateToWhoWeServe: () => void;
}

export const RealPlaces: React.FC<RealPlacesProps> = ({
  onNavigateToWhoWeServe,
}) => {
  const verifiedLocations = [
    {
      id: 'amani',
      name: "Amani Children's Home",
      role: 'Residential care, education support, and daily meals for children.',
      image: '/DSCF0856.jpg',
      imageAlt: "Children at Amani Children's Home smiling and learning together in Kenya",
      icon: Home,
      tag: 'Residential Partner',
    },
    {
      id: 'westhill',
      name: 'West Hill',
      role: 'Community learning support, study resources, and nutritional assistance.',
      image: '/Purity.jpg',
      imageAlt: 'West Hill community center in Kenya',
      icon: School,
      tag: 'Learning Community',
    },
  ];

  return (
    <section id="real-places" className="py-14 sm:py-20 bg-white border-y border-[#ebdcd0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-2">
              Geographic Presence
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#201a18] tracking-tight mb-2">
              The work has a place.
            </h2>
            <p className="text-sm sm:text-base text-[#59524e] font-normal leading-relaxed">
              These are not abstract ideas. Furaha is grounded in specific, real communities across Kenya.
            </p>
          </div>

          <button
            onClick={onNavigateToWhoWeServe}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#893d2d] hover:text-[#733123] px-4 py-2.5 rounded-full bg-[#faf8f5] hover:bg-[#ebdcd0]/40 border border-[#ebdcd0] transition-colors cursor-pointer shrink-0 self-start md:self-auto"
          >
            <span>Explore Who We Serve</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Real Places Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {verifiedLocations.map((loc) => {
            const Icon = loc.icon;
            return (
              <div
                key={loc.id}
                onClick={onNavigateToWhoWeServe}
                className="group bg-[#faf8f5] rounded-3xl overflow-hidden border border-[#ebdcd0] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#201a18]">
                    <picture>
                      <source
                        srcSet={loc.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
                        type="image/webp"
                      />
                      <img
                        src={loc.image}
                        alt={loc.imageAlt}
                        className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#f7e4b7]" />
                      <span>Kenya</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 text-[#893d2d] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {loc.tag}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#201a18] tracking-tight group-hover:text-[#893d2d] transition-colors">
                        {loc.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed">
                      {loc.role}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 pt-0">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#893d2d] pt-3 border-t border-[#ebdcd0]/70">
                    <span>View partner details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
