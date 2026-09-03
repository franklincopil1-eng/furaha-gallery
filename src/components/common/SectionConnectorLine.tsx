import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface SectionConnectorLineProps {
  /** Height in pixels or Tailwind classes (default: 64px) */
  height?: number;
  /** Primary color (default: #893d2d) */
  color?: string;
  /** Optional dashed style */
  dashed?: boolean;
  /** Optional label or icon at the center node */
  nodeLabel?: string;
  className?: string;
}

/**
 * Reusable vertical micro-connector that draws in as the section scrolls into focus.
 * Perfect for connecting step 01 -> 02 -> 03 or card-to-card transitions.
 */
export const SectionConnectorLine: React.FC<SectionConnectorLineProps> = ({
  height = 64,
  color = '#893d2d',
  dashed = false,
  nodeLabel,
  className = '',
}) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 90%', 'center center'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const nodeScale = useTransform(scrollYProgress, [0.4, 1], [0.7, 1]);
  const nodeOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);

  if (shouldReduceMotion) {
    return (
      <div
        ref={lineRef}
        className={`flex flex-col items-center justify-center my-3 pointer-events-none ${className}`}
        aria-hidden="true"
      >
        <div
          className="w-[1.5px] bg-[#893d2d]/25"
          style={{ height: `${height}px` }}
        />
        {nodeLabel && (
          <span className="text-[10px] font-semibold text-[#893d2d] bg-[#fdfbf9] px-2 py-0.5 rounded-full border border-[#893d2d]/20 mt-1">
            {nodeLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      ref={lineRef}
      className={`flex flex-col items-center justify-center my-2 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        width="20"
        height={height}
        viewBox={`0 0 20 ${height}`}
        fill="none"
        className="overflow-visible"
      >
        {/* Background track */}
        <line
          x1="10"
          y1="0"
          x2="10"
          y2={height}
          stroke="#ebdcd0"
          strokeWidth="1"
          strokeDasharray={dashed ? '3 3' : undefined}
          strokeLinecap="round"
        />

        {/* Animated Drawing Line */}
        <motion.line
          x1="10"
          y1="0"
          x2="10"
          y2={height}
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={dashed ? '3 3' : undefined}
          style={{ pathLength }}
        />

        {/* Center Node Dot */}
        <motion.circle
          cx="10"
          cy={height / 2}
          r="3"
          fill="#ffffff"
          stroke={color}
          strokeWidth="1.5"
          style={{
            scale: nodeScale,
            opacity: nodeOpacity,
          }}
        />
      </svg>

      {nodeLabel && (
        <motion.span
          style={{ opacity: nodeOpacity, scale: nodeScale }}
          className="text-[9px] uppercase tracking-wider font-bold text-[#893d2d] bg-[#fdfbf9] px-2 py-0.5 rounded-full border border-[#893d2d]/20 mt-1 shadow-2xs"
        >
          {nodeLabel}
        </motion.span>
      )}
    </div>
  );
};
