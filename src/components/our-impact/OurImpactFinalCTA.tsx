import React from 'react';
import { ArrowRight, Heart, Users, Lock } from 'lucide-react';

interface OurImpactFinalCTAProps {
  onDonate: () => void;
  onWhoWeServe: () => void;
}

export const OurImpactFinalCTA: React.FC<OurImpactFinalCTAProps> = ({
  onDonate,
  onWhoWeServe,
}) => {
  return (
    <section className="relative py-20 sm:py-28 bg-[#201a18] text-white overflow-hidden">
      {/* Background authentic photograph with dark gradient overlay */}
      <div className="absolute inset-0 z-0">
        <picture className="w-full h-full block">
          <source srcSet="/images/DSCF0817.webp" type="image/webp" />
          <img
            src="/images/DSCF0817.jpg"
            alt="Children and community members in Kenya"
            className="w-full h-full object-cover object-center opacity-25"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-[#201a18] via-[#201a18]/85 to-[#201a18]/90" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6 sm:space-y-8">
        
        <span className="text-[#f7e4b7] text-xs font-bold uppercase tracking-wider block">
          Be Part of the Story
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          The story is still <br className="hidden sm:inline" />
          <span className="text-[#f7e4b7]">being written.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#d4cfcb] leading-relaxed max-w-2xl mx-auto font-light">
          There are still children and communities who need someone to stand alongside them.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
          <button
            onClick={onDonate}
            id="impact-cta-donate-btn"
            className="inline-flex items-center justify-center gap-2 bg-[#893d2d] hover:bg-[#733123] text-white font-medium text-sm sm:text-base px-7 py-4 rounded-full transition-all shadow-lg hover:shadow-xl cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Give to Furaha</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onWhoWeServe}
            id="impact-cta-who-we-serve-btn"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm sm:text-base px-6 py-4 rounded-full transition-colors cursor-pointer backdrop-blur-sm"
          >
            <Users className="w-4 h-4 text-[#f7e4b7]" />
            <span>See who we serve</span>
          </button>
        </div>

        {/* Security & Transparency Note */}
        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-[#a8a29e]">
          <Lock className="w-3.5 h-3.5" />
          <span>Secure giving powered by Givebutter · Furaha Ministries Kenya</span>
        </div>

      </div>
    </section>
  );
};
