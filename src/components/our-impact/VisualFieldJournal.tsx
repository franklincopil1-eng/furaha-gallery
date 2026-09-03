import React from 'react';
import { MapPin, Calendar, ArrowRight, BookOpen, Utensils, HeartHandshake, Compass } from 'lucide-react';
import { FieldStory } from './StoryModal';

interface VisualFieldJournalProps {
  onSelectStory: (story: FieldStory) => void;
}

export const fieldStoriesData: FieldStory[] = [
  {
    id: 'field-1',
    date: 'August 2026',
    location: "Amani Children's Home",
    category: 'Education',
    title: 'A day of learning, care and community',
    summary:
      'Providing classroom textbooks, stationery sets, and school tuition backing for children so their daily study continues smoothly.',
    whatHappened:
      'Educational supplies and classroom provisions were organized and delivered to the children at Amani to support ongoing school attendance.',
    fullStory:
      'When families face steep economic barriers, basic schooling needs like textbooks and term fees are often out of reach. At Amani Children’s Home, Furaha walks alongside local caregivers to ensure every child has access to essential study materials and classroom guidance.',
    image: '/Education.jpg',
    imageAlt: 'Children learning and participating in community study in Kenya',
    chips: ['Education', 'Amani', 'Kenya'],
  },
  {
    id: 'field-2',
    date: 'July 2026',
    location: 'West Hill Community',
    category: 'Nutrition',
    title: 'Staple grain supplies and nutritious daily meals',
    summary:
      'Supplying staple dry goods including maize, beans, and fresh cooking staples to ensure reliable meal preparation for children.',
    whatHappened:
      'Bulk nutrition provisions were coordinated with community leaders to replenish the food storage pantry for daily meal distribution.',
    fullStory:
      'Children cannot concentrate in class when their stomachs are empty. Furaha collaborates directly with community partners to supply core staples that support balanced daily meals for developing minds and bodies.',
    image: '/Nutrition.png',
    imageAlt: 'Volunteers and caregivers organizing food boxes, nutritious meals and dry staples in Kenya',
    chips: ['Nutrition', 'West Hill', 'Kenya'],
  },
  {
    id: 'field-3',
    date: 'June 2026',
    location: 'Huruma · Nairobi',
    category: 'Care',
    title: 'Clothing care packages and hygiene essentials for youth',
    summary:
      'Organizing clothing distributions, hygiene kits, and essential care packages alongside community mentorship for vulnerable youth.',
    whatHappened:
      'Outreach workers gathered with young people in Huruma to distribute sorted clothing, footwear, and personal hygiene packs.',
    fullStory:
      'In high-density informal settlements like Huruma, relational dignity and practical care go hand in hand. Sorting and distributing essentials gives young people practical support while letting them know they are valued and supported.',
    image: '/volunteer-selecting-organizing-clothes-donations-charity.jpg',
    imageAlt: 'Sorting clothing items and care packages in Huruma community',
    chips: ['Care & Mentorship', 'Huruma', 'Nairobi'],
  },
  {
    id: 'field-4',
    date: 'May 2026',
    location: 'Kenya Partner Centers',
    category: 'Faith',
    title: 'Youth Bible Study, Mentorship & Prayer Gatherings',
    summary:
      'Children and youth gathering for interactive scripture study, prayer circles, and Christ-centered mentorship.',
    whatHappened:
      'Youth leaders and caregivers hosted weekly Bible fellowship, prayed over children and their families, and shared devotional encouragement.',
    fullStory:
      'Furaha is rooted in Christian faith and love. Beyond material aid, we believe nurturing hope and spiritual resilience in Christ transforms lives. Discipleship gatherings provide a safe, joyful environment where children learn scripture, build character, and know they are deeply loved by God.',
    image: '/video_frame_blessing.jpg',
    imageAlt: 'Staff and community leaders gathered in prayer and Christian dedication in Kenya',
    chips: ['Discipleship', 'Mentorship', 'Kenya'],
  },
];

export const VisualFieldJournal: React.FC<VisualFieldJournalProps> = ({
  onSelectStory,
}) => {
  return (
    <section id="field-journal" className="py-14 sm:py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-2">
            The Visual Field Journal
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#201a18] tracking-tight mb-3">
            From the field
          </h2>
          <p className="text-sm sm:text-base text-[#59524e] font-normal leading-relaxed">
            Follow the people, places and practical work behind Furaha's mission.
          </p>
        </div>

        {/* Varied Editorial Stream */}
        <div className="space-y-10 sm:space-y-14">
          
          {/* Story 1: Large Cinematic Image + Side Content */}
          {fieldStoriesData[0] && (
            <div className="bg-white rounded-3xl border border-[#ebdcd0] overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[300px] overflow-hidden bg-[#201a18]">
                  <img
                    src={fieldStoriesData[0].image}
                    alt={fieldStoriesData[0].imageAlt}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#f7e4b7]" />
                    <span>{fieldStoriesData[0].date}</span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs text-[#893d2d] font-bold uppercase tracking-wider">
                      <BookOpen className="w-4 h-4" />
                      <span>{fieldStoriesData[0].category} · {fieldStoriesData[0].location}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#201a18] tracking-tight leading-snug">
                      {fieldStoriesData[0].title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed">
                      {fieldStoriesData[0].summary}
                    </p>

                    {/* What Happened Pill */}
                    <div className="bg-[#faf8f5] p-3.5 rounded-2xl border border-[#ebdcd0] text-xs text-[#201a18]">
                      <strong className="block text-[#893d2d] text-[11px] uppercase tracking-wider mb-1">
                        What Happened
                      </strong>
                      {fieldStoriesData[0].whatHappened}
                    </div>

                    {/* Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {fieldStoriesData[0].chips.map((chip, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md bg-[#faf8f5] border border-[#ebdcd0] text-[11px] text-[#59524e]"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#ebdcd0]/70 mt-6">
                    <button
                      onClick={() => onSelectStory(fieldStoriesData[0])}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#893d2d] hover:text-[#733123] transition-colors cursor-pointer group"
                    >
                      <span>Open this story</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stories 2 & 3: Asymmetric Split Grid (Split image/text + Portrait Story) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Story 2: Nutrition Focus */}
            {fieldStoriesData[1] && (
              <div className="bg-white rounded-3xl border border-[#ebdcd0] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#201a18]">
                    <img
                      src={fieldStoriesData[1].image}
                      alt={fieldStoriesData[1].imageAlt}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#f7e4b7]" />
                      <span>{fieldStoriesData[1].date}</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 text-[#893d2d] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {fieldStoriesData[1].category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#717275]">
                      <MapPin className="w-3.5 h-3.5 text-[#893d2d]" />
                      <span>{fieldStoriesData[1].location}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#201a18] tracking-tight">
                      {fieldStoriesData[1].title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed">
                      {fieldStoriesData[1].summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {fieldStoriesData[1].chips.map((chip, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#faf8f5] border border-[#ebdcd0] text-[10px] text-[#59524e]"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-transparent">
                  <button
                    onClick={() => onSelectStory(fieldStoriesData[1])}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#893d2d] hover:text-[#733123] transition-colors cursor-pointer group"
                  >
                    <span>View story</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Story 3: Care & Mentorship Focus */}
            {fieldStoriesData[2] && (
              <div className="bg-white rounded-3xl border border-[#ebdcd0] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#201a18]">
                    <img
                      src={fieldStoriesData[2].image}
                      alt={fieldStoriesData[2].imageAlt}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#f7e4b7]" />
                      <span>{fieldStoriesData[2].date}</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 text-[#893d2d] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {fieldStoriesData[2].category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#717275]">
                      <MapPin className="w-3.5 h-3.5 text-[#893d2d]" />
                      <span>{fieldStoriesData[2].location}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#201a18] tracking-tight">
                      {fieldStoriesData[2].title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed">
                      {fieldStoriesData[2].summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {fieldStoriesData[2].chips.map((chip, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#faf8f5] border border-[#ebdcd0] text-[10px] text-[#59524e]"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-transparent">
                  <button
                    onClick={() => onSelectStory(fieldStoriesData[2])}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#893d2d] hover:text-[#733123] transition-colors cursor-pointer group"
                  >
                    <span>View story</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Story 4: Full-Width Portrait & Discipleship Moment */}
          {fieldStoriesData[3] && (
            <div className="bg-[#201a18] text-white rounded-3xl overflow-hidden shadow-lg border border-[#382e2b]">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                <div className="md:col-span-5 aspect-[4/3] md:aspect-auto md:h-full relative overflow-hidden">
                  <img
                    src={fieldStoriesData[3].image}
                    alt={fieldStoriesData[3].imageAlt}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#201a18]/80 hidden md:block" />
                </div>

                <div className="md:col-span-7 p-6 sm:p-10 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#f7e4b7] uppercase">
                    <Compass className="w-4 h-4" />
                    <span>{fieldStoriesData[3].category} · {fieldStoriesData[3].location}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
                    {fieldStoriesData[3].title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#e0deda] leading-relaxed font-light">
                    {fieldStoriesData[3].summary}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {fieldStoriesData[3].chips.map((chip, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 text-xs"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => onSelectStory(fieldStoriesData[3])}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#f7e4b7] hover:text-white transition-colors cursor-pointer"
                    >
                      <span>Read the full dispatch</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
