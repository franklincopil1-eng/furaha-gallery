import React, { useState } from 'react';
import { Camera, MapPin, ZoomIn, Eye, Play, Film } from 'lucide-react';
import { MediaItem, MediaLightboxModal } from './MediaLightboxModal';

export const mediaItemsData: MediaItem[] = [
  {
    id: 'media-video-washroom',
    image: '/images/video_frame_new_bathrooms.jpg',
    imageAlt: 'Community Washroom Renovation & Transformation field video in Kenya',
    caption: 'Community Washroom Renovation & Transformation',
    location: 'Kenya',
    date: 'Field Video Documentation',
    category: 'Facility Upgrades',
    context:
      'Field video footage documenting the transformation from makeshift pit latrines to clean, ceramic-tiled ventilated washrooms with handwashing facilities.',
    isVideo: true,
    videoSrc: '/videos/community-washroom-transformation.mp4',
    duration: '0:27',
  },
  {
    id: 'media-1',
    image: '/images/field-outreach-18.jpg',
    imageAlt: 'Furaha team and children gathered together in Christian fellowship and encouragement in Kenya',
    caption: 'Christian fellowship, encouragement, and community gathering',
    location: 'Kenya',
    date: 'Field Documentation',
    category: 'Faith & Discipleship',
    context:
      'Spiritual mentorship, prayer fellowship, and scripture engagement encouraging children with hope in Christ.',
  },
  {
    id: 'media-2',
    image: '/images/field-classroom-4.jpg',
    imageAlt: "Students engaged in classroom study at Amani Children's Home in Kenya",
    caption: 'Students engaged in classroom study and learning at Amani',
    location: "Amani Children's Home",
    date: 'Field Documentation',
    category: 'Education Support',
    context:
      'Learners utilizing school textbooks, stationery, and classroom support provided through community partner initiatives.',
  },
  {
    id: 'media-3',
    image: '/images/field-community-5.jpg',
    imageAlt: 'Food care, nutrition, and meal distribution in Kenya',
    caption: 'Staple grain supplies and food pantry distribution',
    location: 'West Hill Community',
    date: 'Field Documentation',
    category: 'Nutrition Program',
    context:
      'Coordinating staple food supplies and essential dry groceries to ensure children receive steady, nutritious daily meals.',
  },
  {
    id: 'media-4',
    image: '/images/video_frame_new_bathrooms.jpg',
    imageAlt: 'Completed modern washroom and sanitation block at Amani Children’s Home',
    caption: 'Modern washroom and sanitation facility completion',
    location: "Amani Children's Home",
    date: 'Field Documentation',
    category: 'Facility Upgrades',
    context:
      'Completed sanitary washroom blocks, secure plumbing, and clean water access ensuring dignity and health for residential children.',
  },
];

export const PhotoVideoGallery: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  return (
    <section className="py-14 sm:py-20 bg-white border-y border-[#ebdcd0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-2">
            Field Evidence
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#201a18] tracking-tight mb-3">
            Photographs & Video from the Ground
          </h2>
          <p className="text-sm sm:text-base text-[#59524e] font-normal leading-relaxed">
            Every image and video accurately describes what is known from genuine Furaha activities, infrastructure projects, and community visits in Kenya.
          </p>
        </div>

        {/* Media Wall Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {mediaItemsData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="group relative bg-[#faf8f5] rounded-3xl overflow-hidden border border-[#ebdcd0] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#201a18]">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 bg-white/90 text-[#201a18] text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                      {item.isVideo ? (
                        <>
                          <Play className="w-3.5 h-3.5 text-[#893d2d] fill-current" />
                          <span>Play video</span>
                        </>
                      ) : (
                        <>
                          <ZoomIn className="w-3.5 h-3.5 text-[#893d2d]" />
                          <span>View details</span>
                        </>
                      )}
                    </span>
                  </div>

                  {item.isVideo ? (
                    <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md text-[#f7e4b7] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 border border-white/20">
                      <Play className="w-2.5 h-2.5 fill-current text-[#ef802e]" />
                      <span>{item.duration || 'Video'}</span>
                    </div>
                  ) : (
                    <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {item.category}
                    </div>
                  )}

                  {item.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-[#893d2d]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform pl-0.5">
                        <Play className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-1.5">
                  <div className="flex items-center gap-1 text-[11px] text-[#717275]">
                    <MapPin className="w-3 h-3 text-[#893d2d]" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-[#201a18] leading-snug group-hover:text-[#893d2d] transition-colors">
                    {item.caption}
                  </h3>
                </div>
              </div>

              <div className="px-4 pb-3 pt-0">
                <div className="flex items-center justify-between text-[11px] text-[#717275] pt-2 border-t border-[#ebdcd0]/60">
                  <span className="flex items-center gap-1">
                    <Camera className="w-3 h-3 text-[#893d2d]" />
                    <span>Field Photo</span>
                  </span>
                  <span className="text-[#893d2d] font-semibold text-[11px] flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>Expand</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Dialog */}
      <MediaLightboxModal
        item={selectedMedia}
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </section>
  );
};
