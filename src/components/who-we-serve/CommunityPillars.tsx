import React from 'react';
import { BookOpen, Utensils, HeartHandshake, Compass, ArrowRight } from 'lucide-react';

interface CommunityPillarsProps {
  onSponsorEducation?: () => void;
}

export const CommunityPillars: React.FC<CommunityPillarsProps> = ({ onSponsorEducation }) => {
  const pillars = [
    {
      key: 'LEARN',
      title: 'LEARN',
      tagline: 'Education Support',
      icon: BookOpen,
      color: 'bg-[#893d2d]',
      lightColor: 'bg-[#893d2d]/10 text-[#893d2d]',
      description: 'Covering school fees, exams, uniforms, and learning supplies so children can stay in school.',
    },
    {
      key: 'EAT',
      title: 'EAT',
      tagline: 'Nutrition & Daily Meals',
      icon: Utensils,
      color: 'bg-[#9c4d38]',
      lightColor: 'bg-[#9c4d38]/10 text-[#9c4d38]',
      description: 'Providing daily meals and food staples in partnership with local community centers and homes.',
    },
    {
      key: 'GROW',
      title: 'GROW',
      tagline: 'Mentorship & Care',
      icon: HeartHandshake,
      color: 'bg-[#b05f48]',
      lightColor: 'bg-[#b05f48]/10 text-[#b05f48]',
      description: 'Pairing children with trusted local mentors, character coaching, and personal care essentials.',
    },
    {
      key: 'BELIEVE',
      title: 'BELIEVE',
      tagline: 'Faith & Encouragement',
      icon: Compass,
      color: 'bg-[#893d2d]',
      lightColor: 'bg-[#893d2d]/10 text-[#893d2d]',
      description: 'Sharing Christian values, hope, and spiritual fellowship through local community partnerships.',
    },
  ];

  return (
    <section id="community-pillars-section" className="py-10 sm:py-14 bg-[#faf8f5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1.5">
            Core Support Areas
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-2">
            What Furaha does
          </h2>
          <p className="text-xs sm:text-sm text-[#59524e] font-normal leading-relaxed">
            Our support in each community focuses on four core areas: education, nutrition, mentorship, and faith.
          </p>
        </div>

        {/* 4 Pillars Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.key}
                className="bg-white rounded-xl sm:rounded-2xl border border-[#ebdcd0] p-4 sm:p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-xs tracking-wider text-[#893d2d] bg-[#893d2d]/10 px-2 py-0.5 rounded">
                      {pillar.title}
                    </span>
                    <div className={`w-7 h-7 rounded-lg ${pillar.lightColor} flex items-center justify-center`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-[#201a18] mb-1.5 leading-snug">
                    {pillar.tagline}
                  </h3>

                  <p className="text-xs text-[#59524e] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiet sponsorship banner */}
        {onSponsorEducation && (
          <div className="mt-6 p-4 rounded-xl bg-white border border-[#ebdcd0] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-xs text-[#59524e]">
              Support a child’s schooling, meals, and daily care in Kenya.
            </p>
            <button
              onClick={onSponsorEducation}
              className="shrink-0 inline-flex items-center gap-1.5 bg-[#893d2d] hover:bg-[#733123] text-white text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer shadow-xs"
            >
              <span>Sponsor a Child</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

