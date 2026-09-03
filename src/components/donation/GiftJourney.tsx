import React, { useRef } from 'react';
import { Lock, HeartHandshake, Sparkles, MailCheck } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

export const GiftJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'center 40%'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [
    {
      num: '01',
      title: 'You give',
      desc: 'Your gift is securely processed through Givebutter.',
      icon: Lock,
    },
    {
      num: '02',
      title: 'Furaha puts your generosity to work',
      desc: 'Funds go directly to verified school fees, nutrition, and care in Kenya.',
      icon: HeartHandshake,
    },
    {
      num: '03',
      title: 'A child keeps moving forward',
      desc: 'Your support ensures learning continuity and stability for students.',
      icon: Sparkles,
    },
    {
      num: '04',
      title: 'You stay connected',
      desc: 'Receive transparent updates on the ongoing work and community impact.',
      icon: MailCheck,
    },
  ];

  return (
    <section ref={containerRef} className="py-10 sm:py-14 bg-[#faf7f2] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1">
            The Journey of Your Gift
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight">
            What happens after you give?
          </h2>
        </div>

        {/* Desktop Horizontal Connecting Thread */}
        <div className="hidden lg:block absolute left-12 right-12 top-[60%] -translate-y-1/2 z-0 pointer-events-none" aria-hidden="true">
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

        {/* 4 Connected Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-[#ebdcd0] shadow-2xs flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-black text-[#893d2d]">
                      {step.num}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-[#201a18] mb-1.5 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#59524e] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
