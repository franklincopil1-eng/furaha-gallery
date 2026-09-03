import React from 'react';
import { Check } from 'lucide-react';

interface ChildStoryProps {
  onSponsorClick?: () => void;
}

export const ChildStory: React.FC<ChildStoryProps> = ({ onSponsorClick }) => {
  const needs = [
    { title: 'Education', desc: 'School fees and exam costs' },
    { title: 'Nutrition', desc: 'Daily school lunch support' },
    { title: 'Supplies', desc: 'Uniform, books and learning materials' },
    { title: 'Mentorship', desc: 'Guidance, encouragement and care' },
  ];

  return (
    <section
      id="child-story-section"
      data-journey-id="child-story"
      data-journey-role="narrative-portrait"
      data-journey-entry="left-margin"
      data-journey-exit="bottom-center"
      className="py-10 sm:py-14 bg-white border-t border-[#f0e6dc]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#faf8f5] rounded-3xl border border-[#ebdcd0] p-5 sm:p-8 lg:p-10 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* Left: Dignified Kenyan Classroom Portrait */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-sm bg-stone-200 aspect-[4/5] max-w-xs mx-auto">
                <img
                  src="/DSCF0817.jpg"
                  alt="Student supported in community school program in Limuru, Kenya"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#893d2d] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  Kenya
                </div>
              </div>
            </div>

            {/* Right: Dignified, Authentic Context & Support Breakdown */}
            <div className="lg:col-span-7">
              <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1">
                The Reality on the Ground
              </span>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-3">
                For a child in Kenya, continuity is everything.
              </h2>

              <p className="text-sm sm:text-base text-[#59524e] leading-relaxed mb-4">
                In many underserved communities in Nairobi, children are eager to learn but face interruptions whenever unpaid fees, missing textbooks, or lack of a daily meal arise.
              </p>

              {/* What helps a child stay connected to school? */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#ebdcd0] mb-4">
                <h3 className="text-xs sm:text-sm font-bold text-[#201a18] mb-2.5">
                  What helps a child stay in school and keep moving forward?
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {needs.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#59524e]">
                      <div className="w-4 h-4 rounded-full bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <div>
                        <strong className="font-bold text-[#201a18]">{item.title}:</strong>{' '}
                        <span>{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-[#717275]">
                  Your generosity helps Furaha provide steady support where it is needed most.
                </p>
                {onSponsorClick && (
                  <button
                    onClick={onSponsorClick}
                    className="shrink-0 text-xs font-bold text-[#893d2d] hover:text-[#733123] underline cursor-pointer"
                  >
                    See Giving Options ↓
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
