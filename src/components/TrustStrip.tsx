import React from 'react';
import { FileCheck2, Headset, BadgeCheck, PlaneTakeoff } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: FileCheck2,
    text: 'Documents checked before submission',
  },
  {
    icon: Headset,
    text: 'Real people on WhatsApp and phone',
  },
  {
    icon: BadgeCheck,
    text: 'Fees confirmed before you pay',
  },
  {
    icon: PlaneTakeoff,
    text: 'Visas and flights from one team',
  },
];

export const TrustStrip: React.FC = () => {
  return (
    <section className="py-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass glass--panel p-5 sm:p-7 shadow-2xl border border-white/15 backdrop-blur-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
            {TRUST_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className={`flex items-center gap-4 pt-3 sm:pt-0 ${idx > 0 ? 'sm:ps-6' : ''}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-pink/20 flex items-center justify-center text-pink-300 shrink-0 border border-pink/40 shadow-pinkGlow">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-heading font-semibold text-white leading-snug">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
