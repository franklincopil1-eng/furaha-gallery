import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, FileCheck } from 'lucide-react';

interface OurImpactTransitionProps {
  onExploreImpact: () => void;
}

export const OurImpactTransition: React.FC<OurImpactTransitionProps> = ({ onExploreImpact }) => {
  return (
    <section id="our-impact-transition" className="py-10 sm:py-16 bg-white border-y border-[#f0e6dc]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1.5">
          Outcomes & Evidence
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-2">
          What happens because of the work?
        </h2>

        <p className="text-xs sm:text-sm text-[#59524e] font-normal leading-relaxed mb-6 max-w-xl mx-auto">
          <strong>Our Work</strong> explains what Furaha does. <strong>Our Impact</strong> shows the projects, updates, stories and progress that result from that work.
        </p>

        {/* 2 Clear Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 max-w-lg mx-auto text-left">
          <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#ebdcd0]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#893d2d] mb-1">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Our Work</span>
            </div>
            <p className="text-[11px] text-[#59524e]">
              Activities, programs, and the holistic four-pillar approach in Kenya.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#ebdcd0]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#893d2d] mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Our Impact</span>
            </div>
            <p className="text-[11px] text-[#59524e]">
              Documented updates, project reports, and stories from the field.
            </p>
          </div>
        </div>

        <button
          onClick={onExploreImpact}
          id="our-work-explore-impact-cta"
          className="inline-flex items-center gap-1.5 bg-[#893d2d] hover:bg-[#733123] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <span>Explore Our Impact</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </section>
  );
};
