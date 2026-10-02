import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, FileText, UserCheck, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { createServiceWhatsAppUrl } from '../lib/whatsapp';

interface VisaDetail {
  id: string;
  name: string;
  badge: string;
  summary: string;
  suits: string;
  documents: string;
  validity: string;
  processing: string;
  stayDuration: string;
}

const VISA_OPTIONS: Record<string, VisaDetail> = {
  '30-single': {
    id: '30-single',
    name: '30 Days — Single Entry Visa',
    badge: 'Popular Holiday Choice',
    summary: 'Allows 1 entry into the UAE for a duration of up to 30 days from the date of entry.',
    suits: 'Tourists, short family visits, holidaymakers, and event/exhibition attendees.',
    documents: 'Clear passport copy (min 6 months validity), passport-size photo, [additional docs if required].',
    validity: 'Valid for entry within 60 days from issuance [to be confirmed by Aeroviz]',
    processing: '24 to 72 hours [to be confirmed by Aeroviz]',
    stayDuration: '30 Days from entry date',
  },
  '30-multi': {
    id: '30-multi',
    name: '30 Days — Multiple Entry Visa',
    badge: 'Multi-Trip & Cruises',
    summary: 'Enter and exit the UAE multiple times within the 30-day validity period without needing new visas.',
    suits: 'Cruisers hopping between Gulf ports, regional business travelers, and visitors doing side trips.',
    documents: 'Passport copy, passport-size photo, onward travel itinerary, [additional docs if required].',
    validity: '30 days duration of stay [to be confirmed by Aeroviz]',
    processing: '24 to 72 hours [to be confirmed by Aeroviz]',
    stayDuration: '30 Days multiple entries',
  },
  '60-single': {
    id: '60-single',
    name: '60 Days — Single Entry Visa',
    badge: 'Extended Vacation',
    summary: 'Single entry permit giving you 60 continuous days to explore the UAE or spend time with family.',
    suits: 'Extended vacations, remote workers on leisure trips, and visiting close family members.',
    documents: 'Passport copy, passport-size photo with white background, [additional docs if required].',
    validity: 'Valid for entry within 60 days from issuance [to be confirmed by Aeroviz]',
    processing: '24 to 72 hours [to be confirmed by Aeroviz]',
    stayDuration: '60 Days continuous stay',
  },
  '60-multi': {
    id: '60-multi',
    name: '60 Days — Multiple Entry Visa',
    badge: 'Most Flexible',
    summary: 'Freely enter and exit the Emirates multiple times over a 60-day period.',
    suits: 'Frequent flyers, corporate executives, cross-border consultants, and split-family trips.',
    documents: 'Passport copy, passport photo, [additional documents depending on nationality].',
    validity: '60 days total duration [to be confirmed by Aeroviz]',
    processing: '24 to 72 hours [to be confirmed by Aeroviz]',
    stayDuration: '60 Days multiple entries',
  },
  '90-jobseeker': {
    id: '90-jobseeker',
    name: '90 Days — Long Term / Job Seeker Visa',
    badge: 'Career & Long Stays',
    summary: 'Long-term single entry visa designed for job exploration, business exploration, or extended family stays.',
    suits: 'Professionals seeking career opportunities in UAE, long-term visitors, and winter residents.',
    documents: 'Passport copy, photo, degree/qualifications if applicable, [to be confirmed by Aeroviz].',
    validity: '90 days from arrival [to be confirmed by Aeroviz]',
    processing: '3 to 5 business days [to be confirmed by Aeroviz]',
    stayDuration: '90 Days stay in UAE',
  },
  'inside-country': {
    id: 'inside-country',
    name: 'Inside-Country Visa Change / Extension',
    badge: 'No Airport Exit Needed',
    summary: 'Extend or change your UAE tourist visa status without leaving the country or booking airport flights.',
    suits: 'Tourists whose visas are nearing expiry, residents transitioning status or cancelling previous visas.',
    documents: 'Passport copy, current visa copy/UID number, previous entry stamp, [case-by-case docs].',
    validity: '30 or 60 days renewal [to be confirmed by Aeroviz]',
    processing: 'Same day to 48 hours [to be confirmed by Aeroviz]',
    stayDuration: 'Extended for 30 or 60 Days',
  },
  '5yr-multi': {
    id: '5yr-multi',
    name: '5-Year Multiple Entry Tourist Visa',
    badge: 'Long-Term Self Sponsored',
    summary: 'Five-year self-sponsored multi-entry tourist visa allowing stays of up to 90 days per visit (extendable to 180 days).',
    suits: 'Property owners, frequent business visitors, global investors, and families regularly visiting UAE.',
    documents: 'Passport copy, photo, 6-month bank statement with required balance, UAE health insurance.',
    validity: '5 Years validity [to be confirmed by Aeroviz]',
    processing: '5 to 7 working days [to be confirmed by Aeroviz]',
    stayDuration: '90 days per trip, up to 180 days/year',
  },
};

export const VisaExplainer: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('30-single');
  const current = VISA_OPTIONS[selectedKey] || VISA_OPTIONS['30-single'];

  return (
    <section className="py-20 lg:py-28 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full    bg-pink/10 border-pink/20 text-pink-700 font-semibold text-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink" />
            <span>Multiple Visa Validity Options</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold  text-slate-900 tracking-tight">
            Pick the visa validity that fits your trip.
          </h2>
          <p className="text-base sm:text-lg  text-slate-600 mt-3">
            From quick 30-day single entry permits to 60-day multiple entries and inside-country status changes.
          </p>
        </div>

        {/* Horizontal Visa Category Selector Chips */}
        <div className="flex justify-start sm:justify-center mb-10 overflow-x-auto pb-3 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x">
          <div className="inline-flex p-1.5   bg-slate-100 border-slate-200 rounded-2xl border gap-1.5 shadow-md shrink-0">
            {[
              { key: '30-single', label: '30 Days Single' },
              { key: '30-multi', label: '30 Days Multi' },
              { key: '60-single', label: '60 Days Single' },
              { key: '60-multi', label: '60 Days Multi' },
              { key: '90-jobseeker', label: '90 Days Visit' },
              { key: 'inside-country', label: 'Inside-Country' },
              { key: '5yr-multi', label: '5-Year Visa' },
            ].map((tab) => {
              const isActive = selectedKey === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedKey(tab.key)}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap focus-visible:outline-pink ${
                    isActive 
                      ? 'text-white' 
                      : ' :text-white :bg-white/5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="visaDetailActivePill"
                      className="absolute inset-0 bg-pink rounded-xl shadow-pinkGlow"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Panel */}
        <div className="glass glass--panel p-6 sm:p-10 shadow-xl   bg-white border-slate-200/80 backdrop-blur-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: What it is & Suits & Documents */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink/20 text-pink text-xs font-bold mb-3 border border-pink/30 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{current.badge}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold  text-slate-900 mb-3">
                    {current.name}
                  </h3>
                  <p className="text-base sm:text-lg  text-slate-600 leading-relaxed font-normal">
                    {current.summary}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl   bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-pink uppercase tracking-wider">
                    <UserCheck className="w-4 h-4" />
                    <span>Who it suits</span>
                  </div>
                  <p className="text-sm  text-slate-800 font-medium">
                    {current.suits}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl   bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-pink uppercase tracking-wider">
                    <FileText className="w-4 h-4" />
                    <span>Documents we usually need</span>
                  </div>
                  <p className="text-sm  text-slate-800 font-medium">
                    {current.documents}
                  </p>
                </div>
              </div>

              {/* Right Column: Validity, Stay Duration, Processing & WhatsApp Button */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl   bg-slate-50 border border-slate-200 space-y-6 shadow-md">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink/20 flex items-center justify-center text-pink shadow-sm shrink-0 border border-pink/30">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs  text-slate-500 font-semibold block">Stay Duration</span>
                      <span className="text-sm font-heading font-bold  text-slate-900 block">
                        {current.stayDuration}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl   bg-pink/10 border border-pink/20 flex items-center justify-center text-pink shadow-sm shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs  text-slate-500 font-semibold block">Typical Validity Period</span>
                      <span className="text-sm font-heading font-bold  text-slate-900 block">
                        {current.validity}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl   bg-pink/10 border border-pink/20 flex items-center justify-center text-pink shadow-sm shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs  text-slate-500 font-semibold block">Typical Processing Time</span>
                      <span className="text-sm font-heading font-bold  text-slate-900 block">
                        {current.processing}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t  border-slate-200">
                  <a
                    href={createServiceWhatsAppUrl(current.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pink w-full py-4 px-6 rounded-2xl text-center font-bold text-[15px] flex items-center justify-center gap-2 shadow-pinkGlow"
                  >
                    <span>Enquire & Apply on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
