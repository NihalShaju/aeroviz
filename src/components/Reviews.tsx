import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    text: '[Replace with real client review]',
    author: 'Ahmed',
    role: 'Visitor from Pakistan',
    rating: 5,
    offsetClass: 'lg:mt-0',
  },
  {
    text: '[Replace with real client review]',
    author: 'Sarah',
    role: 'Tourist from UK',
    rating: 5,
    offsetClass: 'lg:mt-8',
  },
  {
    text: '[Replace with real client review]',
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full    bg-pink/10 border border-pink/20 text-pink-700 font-semibold text-xs mb-3">
            <span>Client Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold  text-slate-900 tracking-tight">
            What clients say.
          </h2>
        </div>

        {/* 3 Glass Quote Tiles at slightly different heights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {REVIEWS.map((rev, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className={`glass glass--tile p-7 sm:p-8 flex flex-col justify-between shadow-xl   bg-white border-slate-200/80 relative ${rev.offsetClass}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Star row */}
                  <div className="flex items-center gap-1 text-pink">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-pink text-pink" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6  text-slate-300" />
                </div>

                {/* Review Text placeholder */}
                <p className="text-base  text-slate-700 font-medium italic leading-relaxed mb-6">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t  border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink/20 border border-pink/30 flex items-center justify-center font-heading font-bold text-pink text-sm">
                  {rev.author[0]}
                </div>
                <div>
                  <h4 className="text-sm font-heading font-bold  text-slate-900">
                    {rev.author}
                  </h4>
                  <span className="text-xs  text-slate-500">
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
