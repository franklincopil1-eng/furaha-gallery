import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

export const VisualProofGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'amani' | 'westhill'>('all');

  const galleryItems = [
    {
      id: 1,
      title: 'West Hill School Uniforms & Study',
      category: 'westhill',
      categoryLabel: 'West Hill',
      location: 'Limuru, Kenya',
      image: '/images/uniform.jpeg',
      caption: 'West Hill students equipped with clean school uniforms, stationery, and learning dignity.',
    },
    {
      id: 2,
      title: 'Amani Study Sessions & Reading',
      category: 'amani',
      categoryLabel: "Amani Children's Home",
      location: 'Kenya',
      image: '/images/field-learning-1.jpg',
      caption: 'Children and caregivers gathered for focused reading and tutoring at Amani.',
    },
    {
      id: 3,
      title: 'Student Activities & Group Learning',
      category: 'westhill',
      categoryLabel: 'West Hill',
      location: 'Limuru, Kenya',
      image: '/images/field-activity-3.jpg',
      caption: 'Interactive group lessons and educational exercises with dedicated local teachers.',
    },
    {
      id: 4,
      title: 'Care, Fellowship & Warm Meals',
      category: 'amani',
      categoryLabel: "Amani Children's Home",
      location: 'Kenya',
      image: '/images/field-community-5.jpg',
      caption: 'Community life, warm nourishment, and devotional fellowship for residential children.',
    },
    {
      id: 5,
      title: 'Dedicated Classroom Environments',
      category: 'westhill',
      categoryLabel: 'West Hill',
      location: 'Limuru, Kenya',
      image: '/images/field-classroom-4.jpg',
      caption: 'Classroom settings with proper desks and revision books for students preparing for exams.',
    },
    {
      id: 6,
      title: 'Campus Life & Safe Grounds',
      category: 'amani',
      categoryLabel: "Amani Children's Home",
      location: 'Kenya',
      image: '/images/field-campus-7.jpg',
      caption: 'Safe campus grounds, dormitory cottages, and caring supervision at Amani Children\'s Home.',
    },
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section className="py-10 sm:py-14 bg-white border-y border-[#f0e6dc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1.5">
            Photographs
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-2">
            Daily life in the partner communities
          </h2>
          <p className="text-xs sm:text-sm text-[#59524e] font-normal leading-relaxed">
            Classroom learning, food distribution, and community visits in Kenya.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-5">
            <button
              onClick={() => setActiveFilter('all')}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#893d2d] text-white shadow-xs'
                  : 'bg-[#faf8f5] text-[#59524e] hover:bg-[#ebdcd0]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('amani')}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeFilter === 'amani'
                  ? 'bg-[#893d2d] text-white shadow-xs'
                  : 'bg-[#faf8f5] text-[#59524e] hover:bg-[#ebdcd0]'
              }`}
            >
              Amani Children's Home
            </button>
            <button
              onClick={() => setActiveFilter('westhill')}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeFilter === 'westhill'
                  ? 'bg-[#893d2d] text-white shadow-xs'
                  : 'bg-[#faf8f5] text-[#59524e] hover:bg-[#ebdcd0]'
              }`}
            >
              West Hill
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          {filteredItems.map((item) => {
            const isLeadership = item.id === 4;

            if (isLeadership) {
              return (
                <div
                  key={item.id}
                  className="bg-[#faf8f5] rounded-2xl overflow-hidden border border-[#ebdcd0] shadow-xs sm:col-span-2 p-5 sm:p-7 md:p-8"
                >
                  <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-10">
                    {/* Left Column: Image exactly like the one at Home (size & display) */}
                    <div className="shrink-0 flex justify-center w-full md:w-auto">
                      <div className="w-[290px] min-[380px]:w-[320px] sm:w-[350px] h-[350px] min-[380px]:h-[380px] sm:h-[400px] rounded-[20px] overflow-hidden shadow-xl border border-gray-100 group relative bg-[#f0eae1]">
                        <picture>
                          <source
                            srcSet={item.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
                            type="image/webp"
                          />
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                            loading="lazy"
                            decoding="async"
                          />
                        </picture>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                        {/* Badges positioned cleanly on the image */}
                        <div className="absolute top-3 left-3 bg-black/60 text-white text-[11px] font-normal px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur-xs">
                          <MapPin className="w-3 h-3 text-[#f7e4b7]" />
                          <span>{item.location}</span>
                        </div>
                        <div className="absolute top-3 right-3 bg-white/95 text-[#893d2d] text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-xs">
                          {item.categoryLabel}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Leadership Narrative */}
                    <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                      <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1.5">
                        Kenya · Leadership & Care
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#201a18] tracking-tight mb-2.5">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#59524e] font-medium leading-relaxed mb-3">
                        {item.caption}
                      </p>
                      <p className="text-xs sm:text-sm text-[#717275] leading-relaxed max-w-xl">
                        Regular, on-ground presence in Kenya ensures that every student&apos;s educational needs, hot daily meals, and personal spiritual mentorship are met with complete accountability and love.
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="bg-[#faf8f5] rounded-2xl overflow-hidden border border-[#ebdcd0] shadow-xs flex flex-col group"
              >
                <div className="relative aspect-[16/11] bg-stone-100 overflow-hidden">
                  <picture>
                    <source
                      srcSet={item.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
                      type="image/webp"
                    />
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute top-2.5 left-2.5 bg-black/60 text-white text-[11px] font-normal px-2 py-0.5 rounded-md flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#f7e4b7]" />
                    <span>{item.location}</span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-white/90 text-[#893d2d] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {item.categoryLabel}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#201a18] tracking-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#59524e] leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Media Note */}
        <p className="mt-6 text-center text-[11px] text-[#717275]">
          Photographs from Furaha visits and community programs in Kenya.
        </p>

      </div>
    </section>
  );
};

