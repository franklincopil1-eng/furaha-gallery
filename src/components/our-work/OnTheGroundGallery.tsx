import React from 'react';
import { MapPin, Camera, ArrowRight, Film } from 'lucide-react';

interface OnTheGroundGalleryProps {
  onNavigateToGallery?: () => void;
}

export const OnTheGroundGallery: React.FC<OnTheGroundGalleryProps> = ({
  onNavigateToGallery,
}) => {
  const mediaItems = [
    {
      id: 1,
      title: 'Classroom & Learning Support',
      category: 'Education',
      location: 'West Hill · Kenya',
      image: '/images/field-classroom-4.jpg',
      caption: 'Educational support, textbooks, study materials, and classroom provisions for students in Kenya.',
    },
    {
      id: 2,
      title: 'Food & Nutrition Support',
      category: 'Nutrition',
      location: 'Kenya',
      image: '/images/group-people-volunteering-foodbank-poor-people.jpg',
      caption: 'Organizing and distributing essential food supplies and meals for partner centers and families.',
    },
    {
      id: 3,
      title: 'Facility & Sanitation Infrastructure',
      category: 'Facilities',
      location: "Amani Children's Home · Kenya",
      image: '/images/video_frame_new_bathrooms.jpg',
      caption: 'Completed washroom facilities, clean water infrastructure, and living environment improvements.',
    },
    {
      id: 4,
      title: 'Christian Discipleship & Prayer',
      category: 'Ministry & Faith',
      location: 'Kenya',
      image: '/images/field-outreach-15.jpg',
      caption: 'Staff and community leaders gathered together in fellowship, prayer, and thanksgiving for children in Kenya.',
    },
  ];

  return (
    <section id="on-the-ground-gallery" className="py-10 sm:py-16 bg-white border-y border-[#f0e6dc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1.5">
            Photographs
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-2">
            What this looks like on the ground.
          </h2>
          <p className="text-xs sm:text-sm text-[#59524e] font-normal leading-relaxed">
            Real photography from community visits, learning sessions, and outreach in Kenya.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#faf8f5] rounded-2xl overflow-hidden border border-[#ebdcd0] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/11] bg-stone-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-normal px-2.5 py-0.5 rounded-md flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#f7e4b7]" />
                    <span>{item.location}</span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[#893d2d] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-sm sm:text-base font-bold text-[#201a18] tracking-tight mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#59524e] leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-3.5 pt-2 border-t border-[#ebdcd0]/70 flex items-center justify-between text-[11px] text-[#717275]">
                <span className="flex items-center gap-1 text-[#59524e]">
                  <Camera className="w-3.5 h-3.5 text-[#893d2d]" />
                  <span>Field Photo</span>
                </span>
                <span className="font-medium text-[#893d2d]">{item.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Gallery Link */}
        {onNavigateToGallery && (
          <div className="mt-8 sm:mt-10 text-center">
            <button
              onClick={onNavigateToGallery}
              className="inline-flex items-center gap-2 bg-[#893d2d] hover:bg-[#733123] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Film className="w-4 h-4 text-[#e5b382]" />
              <span>Explore Complete Kenya Media Gallery & Field Videos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

