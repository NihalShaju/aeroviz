import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    text: 'Everything was so well organised from start to finish. The trip was smooth, comfortable, and genuinely memorable. Highly recommended!',
    author: 'Ahmed',
    role: 'Visitor from Pakistan',
    rating: 5,
    offsetClass: 'lg:mt-0',
  },
  {
    text: 'Excellent service and great attention to detail. The entire experience was hassle-free, and we got to see the best of Dubai without feeling rushed.',
    author: 'Sarah',
    role: 'Tourist from UK',
    rating: 5,
    offsetClass: 'lg:mt-8',
  },
  {
    text: 'Great service, beautiful experiences, and zero stress. Everything was exactly as promised!',
    author: 'Rahul',
    role: 'Business traveler from India',
    rating: 5,
    offsetClass: 'lg:mt-4',
  },
];

export const Reviews: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 text-pink-300 font-semibold text-xs mb-3 backdrop-blur-md">
            <span>Client Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight drop-shadow-lg">
            What clients say.
          </h2>
        </div>

        {/* 3 Glass Quote Tiles at slightly different heights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {REVIEWS.map((rev, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className={`glass glass--tile p-7 sm:p-8 flex flex-col justify-between shadow-xl border-white/15 relative ${rev.offsetClass}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Star row */}
                  <div className="flex items-center gap-1 text-pink-300">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-pink text-pink" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-white/25" />
                </div>

                {/* Review Text placeholder */}
                <p className="text-base text-white/90 font-medium italic leading-relaxed mb-6">
                  &quot;{rev.text}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-white/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink/25 border border-pink/40 flex items-center justify-center font-heading font-bold text-pink-200 text-sm">
                  {rev.author[0]}
                </div>
                <div>
                  <h4 className="text-sm font-heading font-bold text-white">
                    {rev.author}
                  </h4>
                  <span className="text-xs text-white/65">
                    {rev.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
