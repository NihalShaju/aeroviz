import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'Can Aeroviz book flight tickets to any country worldwide?',
    a: 'Yes! Aeroviz helps with booking flight tickets to every country on the globe. We partner with over 500+ international and regional airlines to secure direct flights, complex multi-city routes, value economy fares, and luxury business cabins with confirmed live pricing.',
  },
  {
    q: 'What is the difference between Visa Change by Flight and Visa Change by Bus?',
    a: 'Visa Change by Flight (Airport to Airport / A2A) is a fast same-day option where you take a short flight to a neighboring hub and return on the same day with your new UAE visa. Visa Change by Bus is a budget-friendly overland trip to Oman (Hatta border) coordinated with luxury bus transport and visa clearance.',
  },
  {
    q: 'Do you process Saudi visas (Tourist, Umrah, and Business)?',
    a: 'Yes. We process Saudi Arabia tourist eVisas, Umrah pilgrimage visas, GCC resident permits, and business visas with fast electronic turnaround and step-by-step guidance.',
  },
  {
    q: 'What documents are required to apply for a UAE tourist visa?',
    a: 'In most cases, all you need is a clear color copy of your passport (valid for at least 6 months) and a recent passport-size photograph with a white background. We verify everything before submission to ensure smooth approval.',
  },
  {
    q: 'Can you assist with 2-Year Residence and Family Visas?',
    a: 'Yes. We handle end-to-end documentation, typing, medical fitness scheduling, and Emirates ID appointments for 2-year residence visas (investor, freelance, employment) as well as family sponsorship for spouse, children, and parents.',
  },
  {
    q: 'Do you offer desert safaris, city tours, and yacht charters?',
    a: 'Absolutely! We arrange private luxury yacht charters in Dubai Marina & Palm Jumeirah, full evening desert safaris with BBQ and dune bashing, airport transfers, and guided city sightseeing tours across Dubai and Abu Dhabi.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 relative z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full    bg-pink-50 border border-pink-200 text-pink-700 font-semibold text-xs mb-3">
            <span>Clear Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold  text-slate-900 tracking-tight">
            Questions people ask first.
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass glass--tile overflow-hidden shadow-xl   bg-white border border-slate-200 transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-6 sm:p-7 text-start flex items-center justify-between gap-4 focus-visible:outline-pink"
                >
                  <span className="text-base sm:text-lg font-heading font-bold  text-slate-900">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen 
                      ? 'bg-pink text-white shadow-pinkGlow' 
                      : '  bg-slate-100 text-slate-700'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-base  text-slate-600 leading-relaxed border-t  border-slate-200 font-normal">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
