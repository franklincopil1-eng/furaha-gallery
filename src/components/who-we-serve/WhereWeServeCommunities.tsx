import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

interface WhereWeServeCommunitiesProps {
  onSupportCommunity?: (communityName: string) => void;
  onExploreWork?: () => void;
}

export const WhereWeServeCommunities: React.FC<WhereWeServeCommunitiesProps> = ({
  onSupportCommunity,
  onExploreWork,
}) => {
  const communities = [
    {
      id: 'amani',
      name: "Amani Children's Home",
      location: 'Kenya',
      image: '/images/field-community-6.jpg',
      imageAlt: "Children gathered in fellowship at Amani Children's Home",
      description: "A home in Kenya providing care, shelter, and a family-like environment for orphaned and vulnerable children.",
      whoWeServe: 'Children and young people in need of schooling stability, meals, and caring mentorship.',
      whatFurahaDoes: [
        'School fees, exams, and classroom supplies',
        'Daily warm meals and food supplies',
        'Mentorship and spiritual encouragement',
      ],
      ctaText: "Support Amani",
    },
    {
      id: 'west-hill',
      name: 'West Hill',
      location: 'Kenya',
      image: '/images/uniform.jpeg',
      imageAlt: 'West Hill students wearing school uniforms in Kenya',
      description: 'A local learning and youth center supporting children who face financial barriers to attending school.',
      whoWeServe: 'Students and young learners in need of learning materials and school fee support.',
      whatFurahaDoes: [
        'Textbooks, stationery, and learning materials',
        'Nutritional and meal support',
        'Tutoring guidance and youth encouragement',
      ],
      ctaText: 'Support West Hill',
    },
  ];

  return (
    <section id="where-we-serve-section" className="py-10 sm:py-16 bg-[#faf7f2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1.5">
            Partner Communities
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#201a18] tracking-tight mb-2.5">
            Where we serve
          </h2>
          <p className="text-sm sm:text-base text-[#59524e] font-normal leading-relaxed">
            Furaha partners directly with these local communities and homes in Kenya.
          </p>
        </div>

        {/* 3 Dedicated Human Community Cards */}
        <div className="space-y-6 sm:space-y-8">
          {communities.map((community, index) => (
            <div
              key={community.id}
              id={`community-${community.id}`}
              data-journey-id={`community-${community.id}`}
              data-journey-role="community-destination"
              data-journey-entry={index % 2 === 1 ? 'right-fold' : 'left-fold'}
              className="bg-white rounded-2xl sm:rounded-3xl border border-[#ebdcd0] p-5 sm:p-7 lg:p-8 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-start">
                
                {/* 1. Real Image */}
                <div className="md:col-span-5">
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 aspect-[4/3] border border-[#ebdcd0]">
                    <picture>
                      <source
                        srcSet={community.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
                        type="image/webp"
                      />
                      <img
                        src={community.image}
                        alt={community.imageAlt}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    <div className="absolute top-2.5 left-2.5 bg-white/95 text-[#893d2d] text-xs font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{community.location}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Community Content */}
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    {/* Name & Location */}
                    <div className="mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#201a18] tracking-tight">
                        {community.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#893d2d] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{community.location}</span>
                      </p>
                    </div>

                    {/* Authentic Description */}
                    <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed mb-3">
                      {community.description}
                    </p>

                    {/* Who is served */}
                    <div className="mb-3">
                      <span className="text-[11px] font-bold text-[#717275] uppercase tracking-wider block mb-0.5">
                        Who we serve
                      </span>
                      <p className="text-xs sm:text-sm text-[#59524e]">
                        {community.whoWeServe}
                      </p>
                    </div>

                    {/* What Furaha does here */}
                    <div className="mb-5">
                      <span className="text-[11px] font-bold text-[#201a18] uppercase tracking-wider block mb-1.5">
                        What Furaha does here
                      </span>
                      <ul className="space-y-1">
                        {community.whatFurahaDoes.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#59524e]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#893d2d] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-3.5 border-t border-[#f0e6dc]">
                    {onSupportCommunity && (
                      <button
                        onClick={() => onSupportCommunity(community.name)}
                        className="inline-flex items-center gap-1.5 bg-[#893d2d] hover:bg-[#733123] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
                      >
                        <span>{community.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {onExploreWork && (
                      <button
                        onClick={onExploreWork}
                        className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#717275] hover:text-[#893d2d] px-2.5 py-1.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                      >
                        <span>See what Furaha does</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

