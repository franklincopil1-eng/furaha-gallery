import React, { useRef } from 'react';
import { Search, Users, Gift, TrendingUp, ArrowDown, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

export const JourneyOfSupport: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'center 40%'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [
    {
      number: '1',
      title: 'Identifying Needs',
      description: 'Local caregivers, teachers, and community partners identify children facing school disruptions or food insecurity.',
      icon: Search,
    },
    {
      number: '2',
      title: 'Coordinating Support',
      description: 'Furaha collaborates directly with local leaders and homes to assess practical requirements.',
      icon: Users,
    },
    {
      number: '3',
      title: 'Direct Assistance',
      description: 'Providing school fees, required textbooks, food staples, or basic essentials directly to children and partners.',
      icon: Gift,
    },
    {
      number: '4',
      title: 'Ongoing Encouragement',
      description: 'Supporting continued learning, healthy nourishment, and Christian mentorship with dignity.',
      icon: TrendingUp,
    },
  ];

  return (
    <section ref={containerRef} id="journey-of-support" className="py-10 sm:py-16 bg-white border-y border-[#f0e6dc] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1.5">
            Approach
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-2">
            A typical journey of support
          </h2>
          <p className="text-xs sm:text-sm text-[#59524e] font-normal leading-relaxed">
            How Furaha connects practical assistance with the real needs of children and partners in Kenya.
          </p>
        </div>

        {/* Desktop Horizontal Connecting Thread */}
        <div className="hidden md:block absolute left-12 right-12 top-[60%] -translate-y-1/2 z-0 pointer-events-none" aria-hidden="true">
          <svg className="w-full h-8" viewBox="0 0 1000 32" fill="none" preserveAspectRatio="none">
            <line
              x1="50"
              y1="16"
              x2="950"
              y2="16"
              stroke="#ebdcd0"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
            {!shouldReduceMotion && (
              <motion.line
                x1="50"
                y1="16"
                x2="950"
                y2="16"
                stroke="#893d2d"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ pathLength, opacity: 0.45 }}
              />
            )}
          </svg>
        </div>

        {/* 4-Step Horizontal/Vertical Progression */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div key={idx} className="relative flex flex-col justify-between">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8f5] border border-[#ebdcd0] h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center font-bold text-xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-[#893d2d] bg-white px-2 py-0.5 rounded-full border border-[#ebdcd0]">
                        Step {step.number}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#201a18] mb-1.5 leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs text-[#59524e] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow connector between steps (desktop) */}
                {!isLast && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white border border-[#ebdcd0] items-center justify-center text-[#893d2d] shadow-xs pointer-events-none">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
                
                {/* Arrow connector (mobile) */}
                {!isLast && (
                  <div className="md:hidden flex justify-center my-1 text-[#893d2d]">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

