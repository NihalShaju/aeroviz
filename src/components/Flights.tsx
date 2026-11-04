import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, ArrowRight, MessageCircle, Sparkles, Luggage, Clock } from 'lucide-react';
import { createFlightOptionWhatsAppUrl, createFlightWhatsAppUrl } from '../lib/whatsapp';

interface FlightOption {
  id: string;
  airline: string;
  carrierCode: string;
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  flightType: 'Direct' | '1-Stop';
  duration: string;
  frequency: string;
  baggage: string;
  cabin: 'Economy' | 'Premium Economy' | 'Business Class';
  tag: string;
  category: 'direct' | 'economy' | 'business' | 'holiday';
}

const FLIGHT_OPTIONS: FlightOption[] = [
  {
    id: 'dxb-lhr-dir',
    airline: 'Emirates / British Airways',
    carrierCode: 'EK / BA',
    fromCity: 'Dubai',
    fromCode: 'DXB',
    toCity: 'London',
    toCode: 'LHR',
    flightType: 'Direct',
    duration: '7h 35m',
    frequency: '6+ Flights Daily',
    baggage: '30kg Checked + 7kg Cabin',
    cabin: 'Economy',
    tag: 'Daily Direct Flights',
    category: 'direct',
  },
  {
    id: 'dxb-khi-dir',
    airline: 'Emirates / Flydubai',
    carrierCode: 'EK / FZ',
    fromCity: 'Dubai',
    fromCode: 'DXB',
    toCity: 'Karachi',
    toCode: 'KHI',
    flightType: 'Direct',
    duration: '2h 10m',
    frequency: 'Multiple Daily',
    baggage: '30kg to 40kg Allowance',
    cabin: 'Economy',
    tag: 'Best Value Route',
    category: 'economy',
  },
  {
    id: 'dxb-cok-dir',
    airline: 'Air India Express / Emirates / IndiGo / SpiceJet',
    carrierCode: 'IX / EK / 6E / SG',
    fromCity: 'Dubai',
    fromCode: 'DXB',
    toCity: 'Kochi (Cochin)',
    toCode: 'COK',
    flightType: 'Direct',
    duration: '4h 00m',
    frequency: '5+ Daily Direct Flights',
    baggage: '30kg Checked + 7kg Cabin',
    cabin: 'Economy',
    tag: 'High Demand Route',
    category: 'direct',
  },
  {
    id: 'dxb-blr-dir',
    airline: 'Emirates / IndiGo / Air India',
    carrierCode: 'EK / 6E / AI',
    fromCity: 'Dubai',
    fromCode: 'DXB',
    toCity: 'Bengaluru (Bangalore)',
    toCode: 'BLR',
    flightType: 'Direct',
    duration: '3h 50m',
    frequency: 'Multiple Daily Flights',
    baggage: '30kg Checked Allowance',
    cabin: 'Economy',
    tag: 'Silicon Hub Express',
    category: 'direct',
  },
  {
    id: 'dxb-del-dir',
    airline: 'Air India / Emirates / IndiGo',
    carrierCode: 'AI / EK / 6E',
    fromCity: 'Dubai',
    fromCode: 'DXB',
    toCity: 'Delhi',
    toCode: 'DEL',
    flightType: 'Direct',
    duration: '3h 40m',
    frequency: 'Hourly Departures',
    baggage: '30kg Checked Included',
    cabin: 'Economy',
    tag: 'Frequent Schedule',
    category: 'direct',
  },
  {
    id: 'dxb-mnl-dir',
    airline: 'Emirates / Philippine Airlines',
    carrierCode: 'EK / PR',
    fromCity: 'Dubai',
    fromCode: 'DXB',
    toCity: 'Manila',
    toCode: 'MNL',
    flightType: 'Direct',
    duration: '8h 50m',
    frequency: 'Daily Non-Stop',
    baggage: '2 x 23kg Checked Bags',
    cabin: 'Economy',
    tag: 'Extra Baggage Options',
    category: 'economy',
  },
  {
    id: 'dxb-cai-dir',
    airline: 'EgyptAir / Emirates / Flydubai',
    carrierCode: 'MS / EK',
    fromCity: 'Dubai',
    fromCode: 'DXB',
    toCity: 'Cairo',
    toCode: 'CAI',
    flightType: 'Direct',
    duration: '3h 50m',
    frequency: 'Morning & Evening Flights',
    baggage: '2 Pcs (46kg) or 30kg',
    cabin: 'Economy',
    tag: 'Express Regional Route',
    category: 'direct',
  },
  {
    id: 'dxb-ist-biz',
    airline: 'Turkish Airlines / Emirates',
    carrierCode: 'TK / EK',
    fromCity: 'Dubai',
    fromCode: 'DXB',
    toCity: 'Istanbul',
    toCode: 'IST',
    flightType: 'Direct',
    duration: '4h 45m',
    frequency: 'Daily Premium Service',
    baggage: '40kg Checked + Lounge Access',
    cabin: 'Business Class',
    tag: 'Luxury Business Tier',
    category: 'business',
  },
  {
    id: 'dxb-bkk-hol',
    airline: 'Emirates / Flydubai',
    carrierCode: 'EK / FZ',
    fromCity: 'Dubai',
    fromCode: 'DXB',
    toCity: 'Bangkok',
    toCode: 'BKK',
    flightType: 'Direct',
    duration: '6h 15m',
    frequency: 'Multiple Daily Departures',
    baggage: '30kg + Hotel Combos Available',
    cabin: 'Economy',
    tag: 'Top Holiday Choice',
    category: 'holiday',
  },
  {
    id: 'dxb-mle-hol',
    airline: 'Flydubai / Emirates',
    carrierCode: 'FZ / EK',
    fromCity: 'Dubai',
    fromCode: 'DXB',
    toCity: 'Maldives',
    toCode: 'MLE',
    flightType: 'Direct',
    duration: '4h 10m',
    frequency: 'Daily Direct Flights',
    baggage: '30kg + Resort Transfers',
    cabin: 'Economy',
    tag: 'Island Getaway',
    category: 'holiday',
  },
];

export const Flights: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'direct' | 'economy' | 'business' | 'holiday'>('all');

  const filteredOptions = filter === 'all' 
    ? FLIGHT_OPTIONS 
    : FLIGHT_OPTIONS.filter(o => o.category === filter);

  return (
    <section id="flights" className="py-20 lg:py-28 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 text-pink-300 font-semibold text-xs mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-pink-300" />
              <span>Worldwide Airline Ticketing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
              Flight tickets to <span className="text-pink-300">every country.</span>
            </h2>
            <p className="text-base sm:text-lg text-white/85 mt-3 drop-shadow">
              Aeroviz helps with booking flight tickets to every country across the globe. Compare direct carriers, value economy routes, baggage allowances, and premium business cabins with live confirmed fares.
            </p>
          </div>

          {/* Filter Pills (Mobile Horizontal Scroll) */}
          <div className="flex items-center gap-2 p-1.5 bg-black/45 border border-white/20 backdrop-blur-xl rounded-2xl overflow-x-auto no-scrollbar max-w-full">
            {[
              { key: 'all', label: 'All Routes' },
              { key: 'direct', label: 'Direct Flights' },
              { key: 'economy', label: 'Value Economy' },
              { key: 'business', label: 'Business Class' },
              { key: 'holiday', label: 'Holiday Routes' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                  filter === tab.key
                    ? 'bg-pink text-white shadow-pinkGlow font-bold'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Flight Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {filteredOptions.map((flight) => (
              <motion.div
                key={flight.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="glass glass--tile p-6 flex flex-col justify-between group hover:border-pink/50 transition-all duration-300 border-white/15 shadow-xl"
              >
                <div>
                  {/* Top Badge & Cabin Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-bold text-pink-200 bg-pink/25 px-2.5 py-0.5 rounded-full border border-pink/40">
                      {flight.tag}
                    </span>
                    <span className="text-[10px] font-semibold text-white/80 bg-white/10 px-2 py-0.5 rounded-full border border-white/15">
                      {flight.cabin}
                    </span>
                  </div>

                  {/* Route & Airport Codes */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/15">
                    <div>
                      <span className="text-2xl font-heading font-extrabold text-white">{flight.fromCode}</span>
                      <span className="text-xs text-white/65 block">{flight.fromCity}</span>
                    </div>

                    <div className="flex flex-col items-center px-2">
                      <span className="text-[10px] font-semibold text-pink-300 mb-0.5">{flight.flightType}</span>
                      <div className="w-16 h-[1px] bg-pink/60 relative flex items-center justify-center">
                        <Plane className="w-3.5 h-3.5 text-pink-300 absolute rotate-90" />
                      </div>
                      <span className="text-[9px] text-white/65 mt-0.5">{flight.duration}</span>
                    </div>

                    <div className="text-end">
                      <span className="text-2xl font-heading font-extrabold text-white">{flight.toCode}</span>
                      <span className="text-xs text-white/65 block">{flight.toCity}</span>
                    </div>
                  </div>

                  {/* Details List */}
                  <div className="py-4 space-y-2.5 text-xs text-white/85">
                    <div className="flex items-center gap-2">
                      <Plane className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                      <span className="truncate">{flight.airline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                      <span>{flight.frequency}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Luggage className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                      <span className="truncate">{flight.baggage}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Option WhatsApp Action */}
                <div className="pt-3 border-t border-white/15">
                  <a
                    href={createFlightOptionWhatsAppUrl({
                      airline: flight.airline,
                      route: `${flight.fromCity} (${flight.fromCode}) → ${flight.toCity} (${flight.toCode})`,
                      flightType: flight.flightType,
                      cabin: flight.cabin,
                      timing: flight.frequency,
                      baggage: flight.baggage,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pink w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm group-hover:shadow-pinkGlow"
                  >
                    <span>Check Live Fare &amp; Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Custom Flight Route Inquiries Banner */}
        <div className="glass glass--panel p-6 sm:p-8 border border-white/15 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pink flex items-center justify-center text-white shadow-pinkGlow shrink-0">
              <Plane className="w-6 h-6 rotate-45" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-white">
                Flying to another destination or need complex routing?
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                We search 100+ global airlines for multi-city, group bookings, and date-flexible deals.
              </p>
            </div>
          </div>

          <a
            href={createFlightWhatsAppUrl({
              from: 'Dubai (DXB)',
              to: 'Any City / Custom Route',
              tripType: 'Round-trip',
              departDate: 'Flexible',
              passengers: 1
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pink py-3.5 px-7 rounded-2xl font-bold text-sm whitespace-nowrap flex items-center gap-2 shadow-pinkGlow shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Request Custom Route Fares</span>
          </a>
        </div>
      </div>
    </section>
  );
};
