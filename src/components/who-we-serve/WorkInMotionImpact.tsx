import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WorkInMotionImpactProps {
  onExploreImpact: () => void;
}

export const WorkInMotionImpact: React.FC<WorkInMotionImpactProps> = ({ onExploreImpact }) => {
  return (
    <section className="py-10 sm:py-14 bg-white border-y border-[#f0e6dc]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1.5">
          Accountability & Progress
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-2">
          Tracking our work and progress
        </h2>

        <p className="text-xs sm:text-sm text-[#59524e] font-normal leading-relaxed mb-6 max-w-xl mx-auto">
          We share regular updates on school attendance, food distributions, and community needs in Kenya.
        </p>

        {/* 3 Practical Areas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-left">
          <div className="p-3 rounded-xl bg-[#faf8f5] border border-[#ebdcd0]">
            <span className="text-xs font-bold text-[#201a18] block mb-0.5">School Attendance</span>
            <span className="text-[11px] text-[#59524e]">Keeping children enrolled in class</span>
          </div>

          <div className="p-3 rounded-xl bg-[#faf8f5] border border-[#ebdcd0]">
            <span className="text-xs font-bold text-[#201a18] block mb-0.5">Meal Distribution</span>
            <span className="text-[11px] text-[#59524e]">Regular food packages and school meals</span>
          </div>

          <div className="p-3 rounded-xl bg-[#faf8f5] border border-[#ebdcd0]">
            <span className="text-xs font-bold text-[#201a18] block mb-0.5">Local Mentorship</span>
            <span className="text-[11px] text-[#59524e]">Guidance from teachers and house leaders</span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onExploreImpact}
            id="explore-impact-cta"
            className="inline-flex items-center gap-1.5 bg-[#893d2d] hover:bg-[#733123] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <span>Explore Our Impact</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};

