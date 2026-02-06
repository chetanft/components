import React from 'react';

/**
 * Loading spinner icon - Single arc spinner matching Figma design
 * 
 * Design: A single dark grey arc that rotates continuously.
 * The arc forms approximately 270 degrees of a circle with a small gap.
 * Uses stroke with rounded line caps for smooth appearance.
 * 
 * The arc starts at the top (12 o'clock) and curves clockwise to bottom-left (9 o'clock),
 * leaving a gap at the bottom-right quadrant.
 */
export const Loading: React.FC = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Single arc spinner - approximately 270 degrees */}
    {/* Circle center: (8, 8), radius: 6.5 */}
    {/* Arc: starts at top (8, 1.5), curves clockwise 270° to bottom-left (1.5, 8) */}
    <path
      d="M 8 1.5 A 6.5 6.5 0 1 1 1.5 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export default Loading;
