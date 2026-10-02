import React, { useEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';

export const FlightPath: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const [planePos, setPlanePos] = useState({ x: 20, y: 100, angle: 90 });
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const path = pathRef.current;
      if (!path) return;

      const totalLength = path.getTotalLength();
      const currentLength = Math.min(Math.max(progress * totalLength, 0), totalLength);
      
      const p1 = path.getPointAtLength(currentLength);
      // Small lookahead for rotation tangent
      const p2 = path.getPointAtLength(Math.min(currentLength + 2, totalLength));

      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

      setPlanePos({
        x: p1.x,
        y: p1.y,
        angle: angle || 90,
      });
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div 
      aria-hidden="true" 
      className="hidden lg:block absolute inset-y-0 left-4 xl:left-8 w-16 pointer-events-none z-10 overflow-visible select-none"
    >
      <svg 
        className="w-full h-full overflow-visible" 
        viewBox="0 0 60 5000" 
        fill="none" 
        preserveAspectRatio="none"
      >
        {/* Dotted Pink SVG Flight Path */}
        <path
          ref={pathRef}
          d="M 30,120 Q 55,500 25,900 T 40,1600 T 20,2400 T 45,3200 T 25,4000 T 30,4800"
          stroke="#e02f78"
          strokeWidth="2.5"
          strokeDasharray="3 12"
          strokeLinecap="round"
          className="opacity-40"
        />

        {/* Animated Traveling Plane */}
        <g 
          transform={`translate(${planePos.x}, ${planePos.y}) rotate(${planePos.angle + 90})`}
          className="transition-transform duration-75"
        >
          {/* Subtle glow circle */}
          <circle cx="0" cy="0" r="14" fill="#e02f78" fillOpacity="0.15" />
          {/* Plane Icon */}
          <path
            d="M0,-10 L3,-4 L10,0 L10,2 L3,1 L2,8 L5,10 L5,12 L0,10.5 L-5,12 L-5,10 L-2,8 L-3,1 L-10,2 L-10,0 L-3,-4 Z"
            fill="#e02f78"
          />
        </g>
      </svg>
    </div>
  );
};
