import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Utensils, HeartHandshake, Compass, Layers, MapPin, ArrowRight } from 'lucide-react';
import { FieldStory } from './StoryModal';

interface ImpactByAreaProps {
  onSelectStory: (story: FieldStory) => void;
}

type CategoryFilter = 'ALL' | 'EDUCATION' | 'NUTRITION' | 'CARE' | 'FAITH';

const archiveItems: FieldStory[] = [
  {
    id: 'archive-1',
    date: 'August 2026',
    location: "Amani Children's Home",
    category: 'Education',
    title: 'Textbooks, stationery, and classroom support',
    summary:
      'Ensuring children have essential course books, writing materials, and tuition backing to participate in school.',
    whatHappened:
      'Organized and delivered core learning supplies to students at Amani Children’s Home.',
    fullStory:
      'Educational backing forms the foundation of sustainable development. Furaha provides practical school tuition support and learning supplies so children stay in class consistently.',
    image: '/Education.jpg',
    imageAlt: 'Students and books in Kenya',
    chips: ['Education', 'Tuition', 'Kenya'],
  },
  {
    id: 'archive-2',
    date: 'July 2026',
    location: 'West Hill',
    category: 'Nutrition',
    title: 'Staple grain supplies and balanced meals',
    summary:
      'Delivering essential dry staples like maize, beans, and rice to partner community centers.',
    whatHappened:
      'Food supplies were delivered directly to local pantry stores to support daily meal preparation.',
    fullStory:
      'Consistent nourishment supports physical health and school readiness. Furaha coordinates staple food relief with trusted local caregivers.',
    image: '/Nutrition.png',
    imageAlt: 'Food care packages, meals and nutrition in Kenya',
    chips: ['Nutrition', 'Staple Food', 'West Hill'],
  },
  {
    id: 'archive-3',
    date: 'June 2026',
    location: 'Huruma · Nairobi',
    category: 'Care',
    title: 'Youth clothing drive and basic hygiene kits',
    summary:
      'Providing sorted clothing items, footwear, and personal care supplies for vulnerable youth.',
    whatHappened:
      'Volunteers and mentors gathered with youth in Huruma for distribution and personal encouragement.',
    fullStory:
      'Relational presence and practical care restore dignity to young people facing hardship in urban informal settlements.',
    image: '/volunteer-selecting-organizing-clothes-donations-charity.jpg',
    imageAlt: 'Clothing and care supplies in Huruma',
    chips: ['Care', 'Clothing', 'Huruma'],
  },
  {
    id: 'archive-4',
    date: 'May 2026',
    location: 'Kenya Partner Centers',
    category: 'Faith',
    title: 'Youth Bible Study and Christian discipleship',
    summary:
      'Sharing the Gospel, devotional scripture readings, and prayer circles alongside children and caregivers.',
    whatHappened:
      'Ministry partners and local mentors held prayer, Bible reading, and discipleship fellowship with children in Kenya.',
    fullStory:
      'Our Christian foundation reminds every child that they are deeply loved and created with purpose by God.',
    image: '/video_frame_blessing.jpg',
    imageAlt: 'Community gathered in prayer and thanksgiving in Kenya',
    chips: ['Faith', 'Discipleship', 'Kenya'],
  },
];

export const ImpactByArea: React.FC<ImpactByAreaProps> = ({ onSelectStory }) => {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>('ALL');

  const filterOptions: { label: CategoryFilter; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: 'ALL', icon: Layers },
    { label: 'EDUCATION', icon: BookOpen },
    { label: 'NUTRITION', icon: Utensils },
    { label: 'CARE', icon: HeartHandshake },
    { label: 'FAITH', icon: Compass },
  ];

  const filteredItems = archiveItems.filter((item) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'EDUCATION' && item.category === 'Education') return true;
    if (selectedFilter === 'NUTRITION' && item.category === 'Nutrition') return true;
    if (selectedFilter === 'CARE' && item.category === 'Care') return true;
    if (selectedFilter === 'FAITH' && item.category === 'Faith') return true;
    return false;
  });

  return (
    <section className="py-14 sm:py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-2">
            Living Archive
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#201a18] tracking-tight mb-3">
            Impact by area
          </h2>
          <p className="text-sm sm:text-base text-[#59524e] font-normal leading-relaxed">
            Filter through real dispatches and documented activities across our core pillars.
          </p>
        </div>

        {/* Filter Navigation Bar (Horizontally scrollable on mobile) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar gap-2 sm:gap-3">
          {filterOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = selectedFilter === opt.label;
            return (
              <button
                key={opt.label}
                onClick={() => setSelectedFilter(opt.label)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#893d2d] text-white shadow-xs'
                    : 'bg-white text-[#59524e] border border-[#ebdcd0] hover:border-[#893d2d]/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filtered Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl overflow-hidden border border-[#ebdcd0] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#201a18]">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-white/90 text-[#893d2d] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1 text-[11px] text-[#717275]">
                      <MapPin className="w-3 h-3 text-[#893d2d]" />
                      <span>{item.location}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#201a18] tracking-tight leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#59524e] leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectStory(item)}
                    className="w-full inline-flex items-center justify-between text-xs font-semibold text-[#893d2d] hover:text-[#733123] pt-3 border-t border-[#ebdcd0]/70 cursor-pointer"
                  >
                    <span>Read dispatch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
