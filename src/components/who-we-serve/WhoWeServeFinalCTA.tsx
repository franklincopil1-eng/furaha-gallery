import React from 'react';
import { ArrowRight, Heart, Lock } from 'lucide-react';

interface WhoWeServeFinalCTAProps {
  onDonate: () => void;
  onOurWork: () => void;
}

export const WhoWeServeFinalCTA: React.FC<WhoWeServeFinalCTAProps> = ({
  onDonate,
  onOurWork,
}) => {
  return (
    <section className="py-10 sm:py-14 bg-[#faf7f2] relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Eyebrow */}
        <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1.5">
          Support the Work
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-2 leading-tight">
          Help make this work possible.
        </h2>

        <p className="text-xs sm:text-sm text-[#59524e] font-normal mb-6 max-w-md mx-auto leading-relaxed">
          Your donation helps provide school fees, textbooks, meals, and mentorship for children in Kenya.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 max-w-sm mx-auto mb-5">
          <button
            onClick={onDonate}
            id="who-we-serve-final-donate-btn"
            className="flex-1 min-w-[140px] bg-[#893d2d] hover:bg-[#733123] text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Donate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOurWork}
            id="who-we-serve-final-work-btn"
            className="flex-1 min-w-[130px] bg-white hover:bg-stone-50 border border-[#ebdcd0] text-[#201a18] hover:text-[#893d2d] text-xs sm:text-sm font-medium py-2.5 px-4 rounded-full shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Our Work</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-[11px] text-[#717275] flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          <span>Secure giving powered by Givebutter</span>
        </p>

      </div>
    </section>
  );
};

