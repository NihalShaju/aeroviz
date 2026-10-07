import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FileCheck2,
  RefreshCw,
  PlaneTakeoff,
  Users,
  Home,
  Package,
  Moon,
  Ticket,
  TreePine,
  Building2,
  Ship,
  Palmtree,
  ArrowRight,
  Globe2,
  CheckCircle2,
  Sparkles,
  LayoutGrid,
  Layers,
  RefreshCcw,
  Play,
  Pause,
  Hand,
} from 'lucide-react';
import { waLink } from '../lib/contact';
import { InteractiveCardStack } from './InteractiveCardStack';

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
  image?: string;
}

// ─── The Complete 12 Services Provided by Aeroviz ─────────────────────────────
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
    image: '/images/family-visa.jpg',
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
    title: 'Tour Packages',
    category: 'flight-travel',
    desc: 'Customized all-inclusive holiday packages combining flights, handpicked hotels, excursions, and transfers worldwide.',
    icon: Package,
    query: 'Tour and Holiday Packages',
    badge: 'All-Inclusive',
    feature: 'Domestic & Worldwide',
  },
  {
    id: 7,
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
    id: 8,
    title: 'Farm Stay',
    category: 'experience',
    desc: 'Private luxury farm retreats and countryside villas across the UAE. Private swimming pools, fruit orchards, outdoor BBQ, and relaxing family escapes.',
    icon: Palmtree,
    query: 'Farm Stay and Countryside Villas',
    badge: 'Nature Retreat',
    feature: 'Private Pool & Countryside',
    image: '/images/farm-stay.jpg',
  },
  {
    id: 9,
    title: 'Desert Safari',
    category: 'experience',
    desc: 'The iconic Arabian desert experience: 4x4 dune bashing, quad biking, camel rides, live shows, and authentic BBQ buffet dinner.',
    icon: TreePine,
    query: 'Desert Safari Adventure',
    badge: 'Top Experience',
    feature: 'Dune Bashing & BBQ Dinner',
  },
  {
    id: 10,
    title: 'City Tours',
    category: 'experience',
    desc: 'Guided sightseeing tours across Dubai, Abu Dhabi, Sharjah & Al Ain. Visit Burj Khalifa, Museum of the Future, Louvre & mosques.',
    icon: Building2,
    query: 'Dubai and UAE City Tours',
    feature: 'Dubai & Abu Dhabi Highlights',
  },
  {
    id: 11,
    title: 'Yacht Services',
    category: 'experience',
    desc: 'Private luxury yacht charters in Dubai Marina & Palm Jumeirah for sunset cruises, birthdays, VIP hospitality, and corporate events.',
    icon: Ship,
    query: 'Private Yacht Charter Services',
    badge: 'Luxury VIP',
    feature: 'Dubai Marina & Palm Jumeirah',
  },
  {
    id: 12,
    title: 'Hajj / Umrah Services',
    category: 'experience',
    desc: 'End-to-end spiritual pilgrimage packages with Umrah visas, flights, top-rated hotels in Makkah & Madinah, and ground support.',
    icon: Moon,
    query: 'Hajj and Umrah Services',
    badge: 'Spiritual',
    highlight: true,
    feature: 'Visa + Flights + Makkah Hotels',
  },
];

const TABS = [
  { id: 'all', label: 'All Services (12)' },
  { id: 'visa', label: 'Visas & Immigration' },
  { id: 'flight-travel', label: 'Flights & Travel' },
  { id: 'experience', label: 'Tours & Experiences' },
];

// ─── Service Card Content (Shared between Grid & 3D Stack) ─────────────────────
const ServiceCardContent: React.FC<{ service: Service; isStackCard?: boolean }> = ({ service, isStackCard = false }) => {
  const Icon = service.icon;
  const waUrl = waLink(
    `Hi Aeroviz, I'm interested in #${service.id}. ${service.title}. Please provide details, requirements, and pricing.`
  );

  return (
    <div
      className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border transition-all duration-300 h-full overflow-hidden ${
        isStackCard
          ? 'border-slate-200/90 shadow-lg bg-white'
          : service.highlight
          ? 'bg-white border-slate-200/80 hover:border-pink/40 shadow-sm'
          : 'bg-white border-slate-200/80 hover:border-pink/40 hover:bg-pink-50/30 shadow-sm'
      }`}
    >
      {/* Background Image if present */}
      {service.image && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Dimming overlay (calibrated so image is 30% more visible while text stays crisp) */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/40 to-white/65 backdrop-blur-[0.5px] transition-colors duration-300 group-hover:from-white/40 group-hover:via-white/35 group-hover:to-white/60" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Top Number & Badge Row */}
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-mono font-bold text-slate-600 bg-white/80 border border-slate-200/90 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-xs">
              #{service.id.toString().padStart(2, '0')}
            </span>
            {service.badge && (
              <span className="text-[11px] font-bold text-pink bg-pink/15 px-2.5 py-0.5 rounded-full border border-pink/25 backdrop-blur-sm">
                {service.badge}
              </span>
            )}
          </div>

          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110 ${
              service.highlight
                ? 'bg-pink text-white shadow-pinkGlow'
                : 'text-pink bg-white/80 border border-pink/30 group-hover:bg-pink group-hover:text-white backdrop-blur-sm shadow-xs'
            }`}
          >
            <Icon className="w-6 h-6" />
          </div>

          {/* Text */}
          <h3 className="text-lg font-heading font-bold text-slate-900 mb-2 leading-snug group-hover:text-pink transition-colors">
            {service.title}
          </h3>
          <p className={`text-sm leading-relaxed mb-4 ${service.image ? 'text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]' : 'text-slate-600'}`}>{service.desc}</p>
          {service.feature && (
            <div className="inline-flex items-center gap-1.5 text-xs text-slate-800 bg-white/85 px-2.5 py-1 rounded-lg border border-slate-200/90 mb-2 backdrop-blur-sm shadow-xs">
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
          onClick={(e) => e.stopPropagation()}
          className="mt-4 pt-3 border-t border-slate-300/80 inline-flex items-center justify-between text-xs font-bold text-pink hover:text-pink-700 transition-colors group-hover:translate-x-0.5"
          aria-label={`Ask about ${service.title} on WhatsApp`}
        >
          <span>Enquire on WhatsApp</span>
          <ArrowRight className="w-4 h-4 text-pink group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

// ─── Service Card for Grid ─────────────────────────────────────────────────────
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <ServiceCardContent service={service} isStackCard={false} />
    </motion.div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'stack'>('grid');
  const [stackResetKey, setStackResetKey] = useState<number>(0);
  const [autoplay, setAutoplay] = useState<boolean>(false);

  const filteredServices = activeTab === 'all'
    ? ALL_SERVICES
    : ALL_SERVICES.filter((s) => s.category === activeTab);

  // Memoized cards for InteractiveCardStack
  const stackCards = useMemo(() => {
    return filteredServices.map((service) => (
      <div key={service.id} className="w-full h-full select-none">
        <ServiceCardContent service={service} isStackCard={true} />
      </div>
    ));
  }, [filteredServices]);

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
            All 12 Services Provided by <br />
            <span className="text-pink">Aeroviz Travel & Tourism</span>
          </h2>
          <p className=" text-slate-600 text-base sm:text-lg leading-relaxed">
            From UAE tourist visas and status change trips to private farm stays, yacht charters, desert safaris, and flight tickets to every country — explore our complete range below.
          </p>
        </div>

        {/* Highlight Banner: Flight Tickets to Every Country */}
        <div className="mb-10 p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

        {/* Category Tabs & View Switcher Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-2 ${
                    active
                      ? 'bg-pink text-white shadow-pinkGlow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher: Grid vs 3D Interactive Deck */}
          <div className="flex items-center self-start sm:self-auto gap-1 p-1 bg-slate-100/90 rounded-2xl border border-slate-200 shrink-0 shadow-inner">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Show standard grid layout"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('stack')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'stack'
                  ? 'bg-pink text-white shadow-pinkGlow'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Switch to 3D interactive card deck"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3D Deck ({filteredServices.length})</span>
            </button>
          </div>
        </div>

        {/* View Mode Content */}
        {viewMode === 'grid' ? (
          /* Cards Grid */
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
        ) : (
          /* 3D Interactive Card Stack Showcase Stage */
          <motion.div
            key={`stack-${activeTab}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-6 sm:py-10"
          >
            {/* Ambient card pedestal with glow */}
            <div className="relative group w-full max-w-[340px] sm:max-w-[380px] h-[480px]">
              <div className="absolute -inset-6 bg-gradient-to-tr from-pink/25 via-pink/10 to-amber-100/30 rounded-[36px] blur-2xl -z-10 pointer-events-none opacity-80" />
              
              <InteractiveCardStack
                key={`${activeTab}-${stackResetKey}`}
                cards={stackCards}
                randomRotation={true}
                sendToBackOnClick={true}
                autoplay={autoplay}
                autoplayDelay={3500}
                pauseOnHover={true}
                sensitivity={140}
                className="w-full h-full"
              />
            </div>

            {/* Stack Controls Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setStackResetKey((prev) => prev + 1)}
                className="btn-glass px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm"
                title="Reset stack to initial order"
              >
                <RefreshCcw className="w-3.5 h-3.5 text-pink" />
                <span>Reset Deck</span>
              </button>

              <button
                onClick={() => setAutoplay(!autoplay)}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all ${
                  autoplay
                    ? 'bg-pink text-white border-pink shadow-pinkGlow'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-pink/40 shadow-sm'
                }`}
              >
                {autoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{autoplay ? 'Pause Cycle' : 'Auto Cycle'}</span>
              </button>

              <div className="text-xs text-slate-500 font-medium px-3.5 py-2 rounded-full bg-slate-100 border border-slate-200 flex items-center gap-1.5">
                <Hand className="w-3.5 h-3.5 text-pink" />
                <span>Drag to flick or click top card to cycle</span>
              </div>
            </div>
          </motion.div>
        )}

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

