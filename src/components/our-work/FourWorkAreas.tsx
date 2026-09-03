import React from 'react';
import { BookOpen, Utensils, HeartHandshake, Compass, ArrowRight, Check } from 'lucide-react';

interface FourWorkAreasProps {
  onSupportArea: (area: string) => void;
}

export const FourWorkAreas: React.FC<FourWorkAreasProps> = ({ onSupportArea }) => {
  const areas = [
    {
      id: 'learn',
      number: '01',
      pillarTag: 'LEARN',
      title: 'Education & School Support',
      tagline: 'Supporting access to the classroom',
      icon: BookOpen,
      imageWebp: '/images/education-books-students.webp',
      image: '/images/education-books-students.jpg',
      imageAlt: 'Students engaged in classroom learning and holding study textbooks in Kenya',
      description:
        'When families struggle with basic school expenses, children risk missing class. Furaha provides practical educational assistance so children can attend school and keep learning.',
      activities: [
        'School fees and tuition assistance',
        'Textbooks and essential learning supplies',
        'School uniforms and footwear',
        'Classroom study materials',
      ],
      ctaText: 'Support Education',
      causeName: 'Education',
    },
    {
      id: 'eat',
      number: '02',
      pillarTag: 'EAT',
      title: 'Nutrition & Food Support',
      tagline: 'Providing consistent daily nourishment',
      icon: Utensils,
      imageWebp: '/images/Nutrition.webp',
      image: '/images/Nutrition.png',
      imageAlt: 'Food care, nutrition, and meal distribution in Kenya',
      description:
        'Consistent nourishment is essential for children to stay healthy and focus in school. Furaha helps supply staple foods and daily meals through partner centers and community programs.',
      activities: [
        'Daily meals for children in partner centers',
        'Essential food staples (maize, beans, rice)',
        'Nutritional support for vulnerable households',
        'Meal assistance during periods of high need',
      ],
      ctaText: 'Support Nutrition',
      causeName: 'Nutrition',
    },
    {
      id: 'grow',
      number: '03',
      pillarTag: 'GROW',
      title: 'Care, Mentorship & Development',
      tagline: 'Encouraging character and personal growth',
      icon: HeartHandshake,
      imageWebp: '/images/field-community-5.webp',
      image: '/images/field-community-5.jpg',
      imageAlt: 'Community mentorship, fellowship, and care in Kenya',
      description:
        'Alongside education and meals, young people need positive guidance, character development, and everyday care to build confidence and resilience.',
      activities: [
        'Mentorship and personal encouragement',
        'Clothing and basic hygiene supplies',
        'Life skills guidance',
        'Safe spaces for study and fellowship',
      ],
      ctaText: 'Support Care & Mentorship',
      causeName: 'Where Needed Most',
    },
    {
      id: 'believe',
      number: '04',
      pillarTag: 'BELIEVE',
      title: 'Christian Faith & Discipleship',
      tagline: 'Sharing enduring hope in Jesus Christ',
      icon: Compass,
      imageWebp: '/images/discipleship-kibera-church.webp',
      image: '/images/discipleship-kibera-church.jpg',
      imageAlt: 'Furaha outreach, Sunday school, and children gathered in Christian fellowship and discipleship at New CEA Pentecost Kibera Church in Kenya',
      description:
        'Furaha is rooted in Christian faith. We share the love of Jesus Christ through scripture engagement, prayer, and loving discipleship.',
      activities: [
        'Bibles and scripture reading materials',
        'Prayer and spiritual encouragement',
        'Youth fellowship and devotional gatherings',
        'Faith-based mentorship and discipleship',
      ],
      ctaText: 'Support Faith & Discipleship',
      causeName: 'Discipleship',
    },
  ];

  return (
    <section id="four-work-areas" className="py-10 sm:py-16 bg-[#faf7f2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1.5">
            Core Areas of Work
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#201a18] tracking-tight mb-2.5">
            Four interconnected areas of support
          </h2>
          <p className="text-xs sm:text-sm text-[#59524e] font-normal leading-relaxed">
            Our initiatives in Kenya focus on these four practical dimensions of a child's wellbeing and growth.
          </p>
        </div>

        {/* 4 Alternating Deep-Dive Cards */}
        <div className="space-y-8 sm:space-y-10">
          {areas.map((area, index) => {
            const Icon = area.icon;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={area.id}
                id={`work-area-${area.id}`}
                data-journey-id={`work-area-${area.id}`}
                data-journey-role="pillar-destination"
                data-journey-entry={isReversed ? 'right-fold' : 'left-fold'}
                className="bg-white rounded-2xl sm:rounded-3xl border border-[#ebdcd0] p-5 sm:p-7 lg:p-8 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center ${isReversed ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Visual Column */}
                  <div className={`md:col-span-5 ${isReversed ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 aspect-[4/3] border border-[#ebdcd0]">
                      <picture className="w-full h-full block">
                        <source srcSet={area.imageWebp} type="image/webp" />
                        <img
                          src={area.image}
                          alt={area.imageAlt}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                      </picture>
                      <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#893d2d] text-xs font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1.5 border border-[#ebdcd0]">
                        <span className="font-mono text-[10px] text-[#893d2d] font-extrabold">{area.number}</span>
                        <Icon className="w-3.5 h-3.5" />
                        <span>{area.pillarTag}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`md:col-span-7 flex flex-col justify-between ${isReversed ? 'md:order-1' : 'md:order-2'}`}>
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[#893d2d] text-xs font-bold uppercase tracking-wider mb-1">
                        <span>{area.pillarTag}</span>
                        <span>·</span>
                        <span>{area.tagline}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#201a18] tracking-tight mb-2">
                        {area.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed mb-4">
                        {area.description}
                      </p>

                      {/* Activities Checklist */}
                      <div className="mb-5">
                        <span className="text-[11px] font-bold text-[#201a18] uppercase tracking-wider block mb-2">
                          Key Activities & Support
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {area.activities.map((activity, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-1.5 text-xs text-[#59524e]">
                              <div className="w-4 h-4 rounded-full bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                              <span className="leading-tight">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#f0e6dc]">
                      <button
                        onClick={() => onSupportArea(area.causeName)}
                        className="inline-flex items-center gap-1.5 bg-[#893d2d] hover:bg-[#733123] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
                      >
                        <span>{area.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

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

