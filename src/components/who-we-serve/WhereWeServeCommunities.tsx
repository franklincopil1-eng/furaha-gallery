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
      id: 'west-hill',
      name: 'West Hill School',
      location: 'Central Kenya',
      image: '/images/classimage-1.jpeg',
      imageAlt: 'West Hill students wearing school uniforms in Kenya classroom',
      description: 'A local learning center keeping vulnerable children enrolled through tuition aid, textbooks, uniforms, and mentorship led by Teacher Salim.',
      whoWeServe: '120+ primary and junior secondary students facing financial barriers to continuing education.',
      whatFurahaDoes: [
        'Tuition fees, exams, and desk assistance',
        'School uniforms, books, and learning stationery',
        'Daily midday school meal program',
        'Teacher guidance and remedial tutoring',
      ],
      ctaText: 'Support West Hill',
    },
    {
      id: 'amani',
      name: "Amani Children's Home",
      location: 'Kiambu County, Kenya',
      image: '/images/field-community-6.jpg',
      imageAlt: "Children gathered in fellowship at Amani Children's Home",
      description: "A permanent home in Kenya providing shelter, education, and family-style love for orphaned and vulnerable children.",
      whoWeServe: '45+ full-time resident children and vulnerable youth needing housing, daily meals, and schooling.',
      whatFurahaDoes: [
        'Full school fees, exams, and classroom supplies',
        '135 warm nutritious daily meals prepared fresh',
        'Clean borehole water and safe cottage housing',
        'Mentorship and spiritual encouragement',
      ],
      ctaText: "Support Amani",
    },
    {
      id: 'cry-of-a-young-one',
      name: 'Cry of a Young One',
      location: 'Nairobi / Huruma, Kenya',
      image: '/images/field-outreach-14.jpg',
      imageAlt: 'Children supported by Cry of a Young One initiative in Nairobi',
      description: 'A dedicated Nairobi initiative providing apartment living assistance and schooling support for 6 orphaned children whose parents passed away.',
      whoWeServe: '6 orphaned siblings kept safe and united under one roof with stable living and academic care.',
      whatFurahaDoes: [
        'Apartment rent, domestic utilities, and living security',
        'Full school tuition, uniforms, and books for each child',
        'Daily warm nutritious meals and domestic groceries',
        'Caring mentorship, guardian support, and spiritual care',
      ],
      ctaText: 'Support Cry of a Young One',
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

