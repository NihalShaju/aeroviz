import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, UploadCloud, Cpu, CheckCircle } from 'lucide-react';

const STEPS = [
  {
    num: '1',
    title: 'Tell us what you need',
    desc: 'Message or call us with the visa type, your nationality and your dates.',
    icon: MessageSquare,
  },
  {
    num: '2',
    title: 'Send your documents',
    desc: 'Share a passport copy and photo on WhatsApp. We check them before anything is submitted.',
    icon: UploadCloud,
  },
  {
    num: '3',
    title: 'We apply and keep you updated',
    desc: 'We submit the application, track it and message you at each stage.',
    icon: Cpu,
  },
  {
    num: '4',
    title: 'Receive your visa',
    desc: 'We send the approved visa to you, ready for travel.',
    icon: CheckCircle,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 relative z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full    bg-pink-50 border border-pink-200 text-pink-700 font-semibold text-xs mb-3">
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold  text-slate-900 tracking-tight">
            Four steps from message to visa.
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5  bg-slate-200 -translate-x-1/2">
            <motion.div
              className="w-full bg-pink origin-top shadow-pinkGlow"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </div>

          <div className="space-y-8 md:space-y-12">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 1;

              return (
                <div 
                  key={step.num}
                  className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step Card */}
                  <div className="w-full md:w-1/2">
                    <div className="glass glass--tile p-6 sm:p-8   bg-white border border-slate-200 shadow-xl transition-transform hover:-translate-y-1 duration-200">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-8 h-8 rounded-full bg-pink text-white font-heading font-bold text-sm flex items-center justify-center shadow-pinkGlow">
                          {step.num}
                        </span>
                        <h3 className="text-xl font-heading font-bold  text-slate-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-base  text-slate-600 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Icon */}
                  <div className="relative z-10 hidden md:flex items-center justify-center w-14 h-14 rounded-2xl  bg-white border-2 border-pink text-pink shadow-pinkGlow shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Empty placeholder for balanced flex grid */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
