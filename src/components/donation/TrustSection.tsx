import React from 'react';
import { MapPin, Heart, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';
import { GIVEBUTTER_CAMPAIGN_URL } from '../../lib/givebutter';

interface TrustSectionProps {
  onNavigateToSection?: (sectionId: string) => void;
  onBackToHome?: () => void;
}

export const TrustSection: React.FC<TrustSectionProps> = ({
  onNavigateToSection,
  onBackToHome,
}) => {
  const handleNav = (sectionId: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else if (onBackToHome) {
      onBackToHome();
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-[#faf7f2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1">
            Accountability
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight">
            You deserve to know who you're giving to.
          </h2>
        </div>

        {/* 4 Trust Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Where we work */}
          <div className="bg-white rounded-2xl p-5 border border-[#ebdcd0] shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-amber-100/70 text-amber-900 flex items-center justify-center mb-3">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-[#717275] uppercase tracking-wider block mb-0.5">
              Where We Work
            </span>
            <h3 className="text-sm font-bold text-[#201a18] mb-0.5">
              Kenya
            </h3>
            <p className="text-xs text-[#59524e] leading-relaxed">
              Nairobi and surrounding underserved communities across East Africa.
            </p>
          </div>

          {/* What we support */}
          <div className="bg-white rounded-2xl p-5 border border-[#ebdcd0] shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-orange-100/70 text-orange-900 flex items-center justify-center mb-3">
              <Heart className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-[#717275] uppercase tracking-wider block mb-0.5">
              What We Support
            </span>
            <h3 className="text-sm font-bold text-[#201a18] mb-0.5">
              Holistic Care
            </h3>
            <p className="text-xs text-[#59524e] leading-relaxed">
              Education · Nutrition · Care · Faith
            </p>
          </div>

          {/* How giving is processed */}
          <div className="bg-white rounded-2xl p-5 border border-[#ebdcd0] shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-100/70 text-emerald-900 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-[#717275] uppercase tracking-wider block mb-0.5">
              Payment Processing
            </span>
            <h3 className="text-sm font-bold text-[#201a18] mb-0.5">
              Givebutter
            </h3>
            <p className="text-xs text-[#59524e] leading-relaxed">
              Secure 256-bit encrypted giving with transparent receipts.
            </p>
          </div>

          {/* How to contact us */}
          <div className="bg-white rounded-2xl p-5 border border-[#ebdcd0] shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-rose-100/70 text-rose-900 flex items-center justify-center mb-3">
              <Mail className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-[#717275] uppercase tracking-wider block mb-0.5">
              Direct Contact
            </span>
            <h3 className="text-sm font-bold text-[#201a18] mb-0.5">
              Reach Out
            </h3>
            <a
              href="mailto:info@meetfuraha.org"
              className="text-xs text-[#893d2d] font-bold hover:underline break-all"
            >
              info@meetfuraha.org
            </a>
          </div>

        </div>

        {/* Quick Links for Further Exploration */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-[#717275]">
          <button
            onClick={() => handleNav('story')}
            className="hover:text-[#893d2d] inline-flex items-center gap-1 cursor-pointer bg-white px-3.5 py-1.5 rounded-full border border-[#ebdcd0]"
          >
            <span>About Furaha & Our Story</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
          
          <button
            onClick={() => handleNav('causes')}
            className="hover:text-[#893d2d] inline-flex items-center gap-1 cursor-pointer bg-white px-3.5 py-1.5 rounded-full border border-[#ebdcd0]"
          >
            <span>Explore Our Causes</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          <a
            href={GIVEBUTTER_CAMPAIGN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#893d2d] inline-flex items-center gap-1 bg-white px-3.5 py-1.5 rounded-full border border-[#ebdcd0]"
          >
            <span>Givebutter Campaign</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
};
