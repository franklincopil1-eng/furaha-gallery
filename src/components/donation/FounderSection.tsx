import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FounderSectionProps {
  onLearnMore?: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ onLearnMore }) => {
  return (
    <section className="py-10 sm:py-14 bg-white border-y border-[#f0e6dc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Founder Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[260px] sm:w-[300px] h-[320px] sm:h-[360px] rounded-[20px] overflow-hidden shadow-xl border border-gray-100 group relative bg-[#f0eae1]">
              <picture>
                <source srcSet="/images/maggienew2.webp" type="image/webp" />
                <img
                  src="/images/maggienew2.jpg"
                  alt="Maggie Mburu - Founder of Furaha Ministries"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Founder Narrative */}
          <div className="lg:col-span-7">
            <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1">
              Leadership & Calling
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-3">
              Why we started Furaha
            </h2>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#59524e] leading-relaxed mb-5 font-normal">
              <p>
                "As a young girl growing up in Kenya, I witnessed how quickly a child's education could be halted by unpaid fees, a missing uniform, or an empty stomach. Furaha was born out of a conviction to walk alongside these overlooked children, one by one."
              </p>
              <p>
                "Furaha means <em>joy</em> in Swahili. Our heartbeat is to restore that joy through education, nourishment, mentorship, and the steadfast hope of Christ."
              </p>
            </div>

            <div className="flex items-center gap-4 pt-2 border-t border-[#f2e6dc]">
              <div>
                <p className="font-bold text-[#201a18] text-sm leading-none">Maggie Mburu</p>
                <p className="text-[11px] text-[#717275] mt-0.5">Founder, Furaha Ministries</p>
              </div>

              {onLearnMore && (
                <button
                  onClick={onLearnMore}
                  className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-[#893d2d] hover:text-[#6a2618] py-1.5 px-3 rounded-full hover:bg-[#893d2d]/5 transition-colors cursor-pointer"
                >
                  <span>Learn more about Furaha</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
