import React from 'react';
import { MapPin, ArrowRight, Heart } from 'lucide-react';

interface ImpactStoriesProps {
  onNavigateToDonate: (cause?: string) => void;
}

export const ImpactStories: React.FC<ImpactStoriesProps> = ({
  onNavigateToDonate,
}) => {
  const verifiedStories = [
    {
      id: 'story-amani',
      name: "Children at Amani Home",
      community: "Amani Children's Home · Kenya",
      category: 'Education & Care',
      image: '/DSCF0817.jpg',
      imageAlt: 'Students and community learning together in Kenya',
      whatWasHappening:
        'Children arriving at the home faced interrupted school careers due to extreme household poverty and missing fees.',
      whatFurahaDid:
        'Provided direct school fee payments, supplied exercise books, stationery, and supported daily meal needs.',
      whatHappenedNext:
        'Children resumed regular schooling and continue their studies in a supportive, stable environment.',
    },
    {
      id: 'story-westhill',
      name: 'Students in West Hill',
      community: 'West Hill Community · Kenya',
      category: 'Nutrition & Learning',
      image: '/volunteer-helping-with-donation-box1.jpeg',
      imageAlt: 'Food care supplies and students in Kenya',
      whatWasHappening:
        'Food shortages and lack of learning supplies made consistent daily study difficult for vulnerable learners.',
      whatFurahaDid:
        'Coordinated staple food boxes (maize, beans, cooking oil) and supplied core learning textbooks.',
      whatHappenedNext:
        'Students receive reliable daily nutrition and have essential learning books to prepare for class lessons.',
    },
    {
      id: 'story-sanitation',
      name: 'Sanitation & Living Dignity',
      community: "Amani Children's Home · Kenya",
      category: 'Infrastructure & Health',
      image: '/video_frame_new_bathrooms.jpg',
      imageAlt: 'Completed clean sanitation and washroom facility at Amani',
      whatWasHappening:
        'Outdated washroom facilities and limited plumbing posed hygiene and health challenges for residential children.',
      whatFurahaDid:
        'Funded construction and plumbing repairs for modern, hygienic washroom blocks with clean water access.',
      whatHappenedNext:
        'Children now have clean, dignified, private sanitation facilities that protect daily health and wellbeing.',
    },
  ];

  return (
    <section id="impact-stories" className="py-14 sm:py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-2">
            Human Impact
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#201a18] tracking-tight mb-3">
            Stories from the people we walk alongside.
          </h2>
          <p className="text-sm sm:text-base text-[#59524e] font-normal leading-relaxed">
            Dignified, verified accounts of practical assistance and community companionship in Kenya.
          </p>
        </div>

        {/* 3 Story Cards with Before / Support / After structure */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {verifiedStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#ebdcd0] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Large photograph */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#201a18]">
                  <img
                    src={story.image}
                    alt={story.imageAlt}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#f7e4b7]" />
                    <span>{story.community}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 text-[#893d2d] text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                    {story.category}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#201a18] tracking-tight">
                    {story.name}
                  </h3>

                  {/* Before -> Support -> After structured blocks */}
                  <div className="space-y-3 text-xs">
                    
                    <div className="bg-[#faf8f5] p-3 rounded-xl border border-[#ebdcd0]">
                      <span className="font-bold text-[#893d2d] uppercase tracking-wider text-[10px] block mb-1">
                        1. What was happening
                      </span>
                      <p className="text-[#59524e] leading-relaxed font-normal">
                        {story.whatWasHappening}
                      </p>
                    </div>

                    <div className="bg-[#faf8f5] p-3 rounded-xl border border-[#ebdcd0]">
                      <span className="font-bold text-[#893d2d] uppercase tracking-wider text-[10px] block mb-1">
                        2. What Furaha did
                      </span>
                      <p className="text-[#201a18] leading-relaxed font-normal">
                        {story.whatFurahaDid}
                      </p>
                    </div>

                    <div className="bg-[#faf8f5] p-3 rounded-xl border border-[#ebdcd0]">
                      <span className="font-bold text-[#893d2d] uppercase tracking-wider text-[10px] block mb-1">
                        3. What happened next
                      </span>
                      <p className="text-[#59524e] leading-relaxed font-normal">
                        {story.whatHappenedNext}
                      </p>
                    </div>

                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-transparent">
                <button
                  onClick={() => onNavigateToDonate(story.category)}
                  className="w-full inline-flex items-center justify-between text-xs font-semibold text-[#893d2d] hover:text-[#733123] py-2.5 px-4 rounded-xl bg-[#faf8f5] hover:bg-[#ebdcd0]/40 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5" />
                    <span>Support similar assistance</span>
                  </span>
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
