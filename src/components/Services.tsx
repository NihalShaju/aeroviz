import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileCheck2,
  RefreshCw,
  PlaneTakeoff,
  Users,
  Home,
  Car,
  Package,
  Moon,
  Ticket,
  TreePine,
  Compass,
  Building2,
  Ship,
  ArrowRight,
  Globe2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { waLink } from '../lib/contact';

// ─── Types ───────────────────────────────────────────────────────────────────
export interface Service {
  id: number;
  title: string;
  category: 'visa' | 'flight-travel' | 'experience';
  desc: string;
  icon: React.ElementType;
  query: string;
  badge?: string;
  highlight?: boolean;
  feature?: string;
}

// ─── The Complete 14 Services Provided by Aeroviz ─────────────────────────────
export const ALL_SERVICES: Service[] = [
  {
    id: 1,
    title: 'Tourist Visa',
    category: 'visa',
    desc: 'Single and multiple-entry 30 & 60-day UAE tourist visas. Fast approvals with just your passport copy and photograph.',
    icon: FileCheck2,
    query: 'Tourist Visa (30/60 Days)',
    badge: 'Popular',
    highlight: true,
    feature: '24-72h Express Issuance',
  },
  {
    id: 2,
    title: 'Visa Change by Flight & Bus',
    category: 'visa',
    desc: 'Seamless status change packages via same-day direct flight runs or comfortable border luxury bus trips to Oman/Hatta.',
    icon: PlaneTakeoff,
    query: 'Visa Change by Flight and Bus',
    badge: 'Same Day / Budget',
    feature: 'Flight & Bus Options',
  },
  {
    id: 3,
    title: 'Single / Multiple Entry Visa',
    category: 'visa',
    desc: 'Tailored visa validity options (30, 60 & 90 days) giving you freedom for single vacations or unlimited re-entry trips.',
    icon: RefreshCw,
    query: 'Single and Multiple Entry Visa',
    feature: 'Flexible Multi-Entry',
  },
  {
    id: 4,
    title: 'Family Visa',
    category: 'visa',
    desc: 'Complete documentation and sponsorship guidance to bring your spouse, children, and parents to live with you in the UAE.',
    icon: Users,
    query: 'Family Visa Sponsorship',
    feature: 'Full Family Sponsorship',
  },
  {
    id: 5,
    title: '2 Years Residence Visa',
    category: 'visa',
    desc: 'Long-term UAE residence visas for investors, freelancers, partners, and employees with step-by-step Emirates ID assistance.',
    icon: Home,
    query: '2 Years Residence Visa',
    badge: 'Long Term',
    feature: 'Investor & Freelance Stays',
  },
  {
    id: 6,
    title: 'Transit Visa',
    category: 'visa',
    desc: '48-hour and 96-hour stopover visas for travelers transiting through UAE airports. Step out and explore Dubai between flights.',
    icon: Compass,
    query: 'UAE Transit Visa (48h / 96h)',
    feature: '48h & 96h Stopovers',
  },
  {
    id: 7,
    title: 'Airport Transfers',
    category: 'flight-travel',
    desc: '24/7 private, executive, and family airport transfers across DXB, DWC, AUH, and SHJ. On-time, comfortable door-to-door rides.',
    icon: Car,
    query: 'Airport Transfer Service',
    feature: '24/7 All UAE Airports',
  },
  {
    id: 8,
    title: 'Tour Packages',
    category: 'flight-travel',
    desc: 'Customized all-inclusive holiday packages combining flights, handpicked hotels, excursions, and transfers worldwide.',
    icon: Package,
    query: 'Tour and Holiday Packages',
    badge: 'All-Inclusive',
    feature: 'Domestic & Worldwide',
  },
  {
    id: 9,
    title: 'Hajj / Umrah Services',
    category: 'experience',
    desc: 'End-to-end spiritual pilgrimage packages with Umrah visas, flights, top-rated hotels in Makkah & Madinah, and ground support.',
    icon: Moon,
    query: 'Hajj and Umrah Services',
    badge: 'Spiritual',
    highlight: true,
    feature: 'Visa + Flights + Makkah Hotels',
  },
  {
    id: 10,
    title: 'Saudi Visa',
    category: 'visa',
    desc: 'Fast electronic visa processing for Saudi Arabia — tourist eVisas, Umrah visas, business visits, and multiple-entry GCC permits.',
    icon: FileCheck2,
    query: 'Saudi Arabia Visa (Tourist / Umrah / Business)',
    badge: 'GCC Travel',
    feature: 'Express Saudi eVisa',
  },
  {
    id: 11,
    title: 'Flight Tickets',
    category: 'flight-travel',
    desc: 'Aeroviz helps with booking flight tickets to every country! Best airfares, direct & connecting routes across 500+ global airlines.',
    icon: Ticket,
    query: 'Flight Tickets to Every Country',
    badge: 'Every Country',
    highlight: true,
    feature: 'Worldwide Flights to Every Country',
  },
  {
    id: 12,
    title: 'Desert Safari',
    category: 'experience',
    desc: 'The iconic Arabian desert experience: 4x4 dune bashing, quad biking, camel rides, live shows, and authentic BBQ buffet dinner.',
    icon: TreePine,
    query: 'Desert Safari Adventure',
    badge: 'Top Experience',
    feature: 'Dune Bashing & BBQ Dinner',
  },
  {
    id: 13,
    title: 'City Tours',
    category: 'experience',
    desc: 'Guided sightseeing tours across Dubai, Abu Dhabi, Sharjah & Al Ain. Visit Burj Khalifa, Museum of the Future, Louvre & mosques.',
    icon: Building2,
    query: 'Dubai and UAE City Tours',
    feature: 'Dubai & Abu Dhabi Highlights',
  },
  {
    id: 14,
    title: 'Yacht Services',
    category: 'experience',
    desc: 'Private luxury yacht charters in Dubai Marina & Palm Jumeirah for sunset cruises, birthdays, VIP hospitality, and corporate events.',
    icon: Ship,
    query: 'Private Yacht Charter Services',
    badge: 'Luxury VIP',
    feature: 'Dubai Marina & Palm Jumeirah',
  },
];

const TABS = [
  { id: 'all', label: 'All Services (14)' },
  { id: 'visa', label: 'Visas & Immigration' },
  { id: 'flight-travel', label: 'Flights & Travel' },
  { id: 'experience', label: 'Tours & Experiences' },
];

// ─── Service Card ─────────────────────────────────────────────────────────────
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const Icon = service.icon;
  const waUrl = waLink(
    `Hi Aeroviz, I'm interested in #${service.id}. ${service.title}. Please provide details, requirements, and pricing.`
  );

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border transition-all duration-300 shadow-lg h-full ${
        service.highlight
          ? '     bg-pink-50/70 border-pink-200/80 shadow-md hover:border-pink shadow-pinkGlow/10'
          : '  :bg-white/[0.08] bg-white border-slate-200/80 hover:border-pink/40 hover:bg-pink-50/30 shadow-sm'
      }`}
    >
      {/* Top Number & Badge Row */}
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-xs font-mono font-bold    text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
          #{service.id.toString().padStart(2, '0')}
        </span>
        {service.badge && (
          <span className="text-[11px] font-bold text-pink bg-pink/15 px-2.5 py-0.5 rounded-full border border-pink/25">
            {service.badge}
          </span>
        )}
      </div>

      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110 ${
          service.highlight
            ? 'bg-pink text-white shadow-pinkGlow'
            : ' text-pink  bg-pink/10 border border-pink/20 group-hover:bg-pink group-hover:text-white'
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="text-lg font-heading font-bold  text-slate-900 mb-2 leading-snug group-hover:text-pink transition-colors">
          {service.title}
        </h3>
        <p className="text-sm  text-slate-600 leading-relaxed mb-4">{service.desc}</p>
        {service.feature && (
          <div className="inline-flex items-center gap-1.5 text-xs    text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-pink shrink-0" />
            <span>{service.feature}</span>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 pt-3 border-t  border-slate-200 inline-flex items-center justify-between text-xs font-bold text-pink hover:text-pink-700 :text-white transition-colors group-hover:translate-x-0.5"
        aria-label={`Ask about ${service.title} on WhatsApp`}
      >
        <span>Enquire on WhatsApp</span>
        <ArrowRight className="w-4 h-4 text-pink group-hover:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredServices = activeTab === 'all'
    ? ALL_SERVICES
    : ALL_SERVICES.filter((s) => s.category === activeTab);

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-28 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full    bg-pink/10 border-pink/20 text-pink-700 font-semibold text-xs mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-pink" />
            <span>Complete Services Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold  text-slate-900 tracking-tight leading-tight mb-4">
            All 14 Services Provided by <br />
            <span className="text-pink">Aeroviz Travel & Tourism</span>
          </h2>
          <p className=" text-slate-600 text-base sm:text-lg leading-relaxed">
            From UAE tourist visas, Saudi visas, and status change trips to yacht charters, desert safaris, and flight tickets to every country — explore our complete range below.
          </p>
        </div>

        {/* Highlight Banner: Flight Tickets to Every Country */}
        <div className="mb-10 p-4 sm:p-6 rounded-2xl      bg-gradient-to-r from-pink-50 via-pink-100/40 to-white border border-pink-200 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-pink text-white flex items-center justify-center shrink-0 shadow-pinkGlow">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-heading font-bold  text-slate-900 flex items-center gap-2">
                <span>Flight Tickets to Every Country</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink bg-pink/20 border border-pink/30 px-2 py-0.5 rounded-full">Worldwide</span>
              </h4>
              <p className="text-xs sm:text-sm  text-slate-600 mt-0.5">
                Aeroviz helps with booking flight tickets to any country across 500+ international airlines. Best route connections & confirmed live fares.
              </p>
            </div>
          </div>
          <a
            href={waLink("Hi Aeroviz, I want to book a flight ticket to another country. Please check the best fares for my route.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pink shrink-0 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-pinkGlow w-full sm:w-auto justify-center"
          >
            <span>Book Flight Worldwide</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Category Tabs (Horizontal Scroll on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  active
                    ? 'bg-pink text-white shadow-pinkGlow'
                    : '  :bg-white/15 :text-white  bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* Bottom CTA strip */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl   bg-slate-100/80 border border-slate-200 backdrop-blur-md">
          <div>
            <p className=" text-slate-900 font-heading font-bold text-lg sm:text-xl">Looking for a custom travel or visa service?</p>
            <p className=" text-slate-600 text-sm mt-1">Talk directly with our Dubai travel desk — we answer all questions within minutes.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* WhatsApp Desk 1 */}
            <a
              href={waLink("Hi Aeroviz, I need help choosing the right visa / travel service for my situation.", "971567003467")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm hover:bg-emerald-500/30 transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Desk 1: +971 56 700 3467</span>
            </a>
            {/* WhatsApp Desk 2 */}
            <a
              href={waLink("Hi Aeroviz, I need help choosing the right visa / travel service for my situation.", "971507042125")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm hover:bg-emerald-500/30 transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Desk 2: +971 50 704 2125</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

