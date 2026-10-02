import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, FileCheck, HelpCircle, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { createVisaWhatsAppUrl, createFlightWhatsAppUrl, createOtherWhatsAppUrl } from '../lib/whatsapp';

type TabType = 'visa' | 'flight' | 'other';

const POPULAR_NATIONALITIES = [
  'Pakistani', 'Indian', 'Filipino', 'British', 'Russian', 'Egyptian', 
  'Bangladeshi', 'Sri Lankan', 'Nigerian', 'Nepalese', 'Canadian', 'American',
  'Jordanian', 'Lebanese', 'South African', 'Turkish', 'Kenyan', 'Moroccan'
];

const MONTHS = [
  'Immediate / This week', 'Next Week', 'January', 'February', 'March', 'April', 'May', 
  'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

const VISA_VALIDITY_OPTIONS = [
  { id: '30_single', label: '30 Days - Single Entry Tourist Visa', visaType: '30-Day Single Entry Tourist Visa', entry: 'Single entry' as const },
  { id: '30_multi', label: '30 Days - Multiple Entries Tourist Visa', visaType: '30-Day Multi-Entry Tourist Visa', entry: 'Multiple entries' as const },
  { id: '60_single', label: '60 Days - Single Entry Tourist Visa', visaType: '60-Day Single Entry Tourist Visa', entry: 'Single entry' as const },
  { id: '60_multi', label: '60 Days - Multiple Entries Tourist Visa', visaType: '60-Day Multi-Entry Tourist Visa', entry: 'Multiple entries' as const },
  { id: 'visa_change_flight', label: 'Visa Change by Flight (Same Day)', visaType: 'Visa Change by Flight (A2A)', entry: 'Single entry' as const },
  { id: 'visa_change_bus', label: 'Visa Change by Bus (Oman / Hatta)', visaType: 'Visa Change by Bus (Border Run)', entry: 'Single entry' as const },
  { id: 'saudi_visa', label: 'Saudi Arabia Visa (Tourist / Umrah / Business)', visaType: 'Saudi Arabia Visa', entry: 'Multiple entries' as const },
  { id: 'family_visa', label: 'Family Residence Visa Sponsorship', visaType: 'Family Residence Visa', entry: 'Multiple entries' as const },
  { id: '2yr_residence', label: '2-Year Residence Visa (Freelance / Investor)', visaType: '2-Year UAE Residence Visa', entry: 'Multiple entries' as const },
  { id: 'transit_visa', label: 'Transit Visa (48h / 96h Stopover)', visaType: 'UAE Transit Visa', entry: 'Single entry' as const },
  { id: '90_long', label: '90 Days - Long-Term / Job Seeker Visa', visaType: '90-Day Visit / Job Seeker Visa', entry: 'Single entry' as const },
];

export const EnquiryWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('visa');

  // Visa form state
  const [nationality, setNationality] = useState('');
  const [selectedValidity, setSelectedValidity] = useState('30_single');
  const [month, setMonth] = useState('Immediate / This week');
  const [visaError, setVisaError] = useState('');

  // Flight form state
  const [flightFrom, setFlightFrom] = useState('Dubai (DXB)');
  const [flightTo, setFlightTo] = useState('');
  const [tripType, setTripType] = useState<'Round-trip' | 'One-way' | 'Multi-city'>('Round-trip');
  const [cabinClass, setCabinClass] = useState<'Economy Saver' | 'Premium Economy' | 'Business Class' | 'First Class'>('Economy Saver');
  const [flightPreference, setFlightPreference] = useState<'Direct flight only' | 'Best value / Any' | 'Specific airline'>('Best value / Any');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [flightError, setFlightError] = useState('');

  // Other form state
  const [otherService, setOtherService] = useState('Hotel booking');
  const [otherNotes, setOtherNotes] = useState('');
  const [otherError, setOtherError] = useState('');

  const handleVisaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nationality.trim()) {
      setVisaError('Add your nationality so we can check the right rules.');
      return;
    }
    setVisaError('');
    
    const matchedOption = VISA_VALIDITY_OPTIONS.find(o => o.id === selectedValidity) || VISA_VALIDITY_OPTIONS[0];

    const url = createVisaWhatsAppUrl({
      nationality: nationality.trim(),
      visaType: matchedOption.visaType,
      validity: matchedOption.label,
      entry: matchedOption.entry,
      month,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightTo.trim()) {
      setFlightError('Please enter your destination city or airport.');
      return;
    }
    if (!departDate) {
      setFlightError('Please choose your intended departure date.');
      return;
    }
    setFlightError('');
    const url = createFlightWhatsAppUrl({
      from: flightFrom.trim(),
      to: flightTo.trim(),
      tripType,
      cabinClass,
      flightPreference,
      departDate,
      returnDate: returnDate ? returnDate : undefined,
      passengers,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOtherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otherNotes.trim()) {
      setOtherError('Please let us know your requirements or questions.');
      return;
    }
    setOtherError('');
    const url = createOtherWhatsAppUrl({
      service: otherService,
      notes: otherNotes.trim(),
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="glass glass--panel p-5 sm:p-7 shadow-xl relative z-20 w-full mt-8   bg-white border border-slate-200/90 backdrop-blur-2xl">
      {/* Tabs */}
      <div 
        role="tablist" 
        className="flex items-center gap-1.5 p-1.5   bg-slate-100 border border-slate-200 rounded-2xl mb-6"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'visa'}
          onClick={() => { setActiveTab('visa'); setVisaError(''); }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'visa' 
              ? 'bg-pink text-white shadow-pinkGlow' 
              : ' :text-white :bg-white/5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Visa</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'flight'}
          onClick={() => { setActiveTab('flight'); setFlightError(''); }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'flight' 
              ? 'bg-pink text-white shadow-pinkGlow' 
              : ' :text-white :bg-white/5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Plane className="w-4 h-4" />
          <span>Flight</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'other'}
          onClick={() => { setActiveTab('other'); setOtherError(''); }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'other' 
              ? 'bg-pink text-white shadow-pinkGlow' 
              : ' :text-white :bg-white/5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Other</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* Visa Tab Panel */}
        {activeTab === 'visa' && (
          <motion.form
            key="visa"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            onSubmit={handleVisaSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nationality */}
              <div>
                <label htmlFor="nationality-input" className="block text-xs font-semibold  text-slate-700 mb-1.5">
                  Passport Nationality <span className="text-pink">*</span>
                </label>
                <input
                  id="nationality-input"
                  type="text"
                  list="nationalities-list"
                  value={nationality}
                  onChange={(e) => {
                    setNationality(e.target.value);
                    if (visaError) setVisaError('');
                  }}
                  placeholder="e.g. Pakistani, Indian, British"
                  className="w-full px-4 py-2.5 rounded-2xl    :text-white/40 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:border-pink focus:outline-none focus:ring-1 focus:ring-pink transition-all shadow-inner"
                />
                <datalist id="nationalities-list">
                  {POPULAR_NATIONALITIES.map((nat) => (
                    <option key={nat} value={nat} />
                  ))}
                </datalist>
              </div>

              {/* Travel Month */}
              <div>
                <label htmlFor="travel-month-select" className="block text-xs font-semibold  text-slate-700 mb-1.5">
                  Intended Travel Month
                </label>
                <select
                  id="travel-month-select"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl    bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:border-pink focus:outline-none transition-all shadow-inner cursor-pointer"
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m} className="  bg-white text-slate-900">{m}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Multiple Visa Validity Options */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="visa-validity-select" className="text-xs font-semibold  text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink" />
                  <span>Choose Visa Validity & Entry Option</span>
                </label>
                <span className="text-[11px] text-pink font-semibold">Fast Processing</span>
              </div>
              
              <select
                id="visa-validity-select"
                value={selectedValidity}
                onChange={(e) => setSelectedValidity(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl    bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:border-pink focus:outline-none transition-all shadow-inner cursor-pointer"
              >
                {VISA_VALIDITY_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} className="  bg-white text-slate-900">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Chips for popular validities */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { id: '30_single', name: '30 Days Single' },
                { id: '30_multi', name: '30 Days Multi' },
                { id: '60_single', name: '60 Days Single' },
                { id: '60_multi', name: '60 Days Multi' },
                { id: 'inside_change', name: 'Inside Country' }
              ].map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setSelectedValidity(chip.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selectedValidity === chip.id
                      ? 'bg-pink text-white font-bold shadow-pinkGlow'
                      : '  :bg-white/15 bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {chip.name}
                </button>
              ))}
            </div>

            {visaError && (
              <div className="flex items-center gap-2 text-pink text-xs font-semibold bg-pink-500/10 p-2.5 rounded-xl border border-pink/30">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{visaError}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn-pink w-full py-3.5 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 text-base shadow-pinkGlow mt-3"
            >
              <span>Check requirements & cost on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>
        )}

        {/* Flight Tab Panel with Multiple Options */}
        {activeTab === 'flight' && (
          <motion.form
            key="flight"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            onSubmit={handleFlightSubmit}
            className="space-y-4"
          >
            {/* Worldwide Flight Highlight Pill */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-pink/10 border border-pink/20 text-xs  text-slate-800">
              <span className="font-semibold text-pink flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Flight tickets to every country
              </span>
              <span className="text-[10px]  text-slate-600">500+ Airlines Worldwide</span>
            </div>

            {/* Trip Type Selector */}
            <div className="grid grid-cols-3 gap-2">
              {(['Round-trip', 'One-way', 'Multi-city'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTripType(type)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                    tripType === type
                      ? 'bg-pink text-white shadow-pinkGlow'
                      : '  :bg-white/15 bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="flight-from" className="block text-xs font-semibold  text-slate-700 mb-1.5">
                  Departure City / Airport
                </label>
                <input
                  id="flight-from"
                  type="text"
                  value={flightFrom}
                  onChange={(e) => setFlightFrom(e.target.value)}
                  placeholder="e.g. Dubai (DXB)"
                  className="w-full px-4 py-2.5 rounded-2xl    :text-white/40 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:border-pink focus:outline-none transition-all shadow-inner"
                />
              </div>

              <div>
                <label htmlFor="flight-to" className="block text-xs font-semibold  text-slate-700 mb-1.5">
                  Destination City / Airport <span className="text-pink">*</span>
                </label>
                <input
                  id="flight-to"
                  type="text"
                  value={flightTo}
                  onChange={(e) => {
                    setFlightTo(e.target.value);
                    if (flightError) setFlightError('');
                  }}
                  placeholder="e.g. London (LHR), Karachi, Manila"
                  className="w-full px-4 py-2.5 rounded-2xl    :text-white/40 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:border-pink focus:outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="depart-date" className="block text-xs font-semibold  text-slate-700 mb-1.5">
                  Depart Date <span className="text-pink">*</span>
                </label>
                <input
                  id="depart-date"
                  type="date"
                  value={departDate}
                  onChange={(e) => {
                    setDepartDate(e.target.value);
                    if (flightError) setFlightError('');
                  }}
                  className="w-full px-3 py-2.5 rounded-2xl    bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:border-pink focus:outline-none transition-all shadow-inner"
                />
              </div>

              {tripType === 'Round-trip' ? (
                <div>
                  <label htmlFor="return-date" className="block text-xs font-semibold  text-slate-700 mb-1.5">
                    Return Date
                  </label>
                  <input
                    id="return-date"
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl    bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:border-pink focus:outline-none transition-all shadow-inner"
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="flight-pref" className="block text-xs font-semibold  text-slate-700 mb-1.5">
                    Flight Routing
                  </label>
                  <select
                    id="flight-pref"
                    value={flightPreference}
                    onChange={(e) => setFlightPreference(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-2xl    bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:border-pink focus:outline-none transition-all shadow-inner cursor-pointer"
                  >
                    <option value="Direct flight only" className="  bg-white text-slate-900">Direct flights only</option>
                    <option value="Best value / Any" className="  bg-white text-slate-900">Best value / Any</option>
                    <option value="Specific airline" className="  bg-white text-slate-900">Specific airline</option>
                  </select>
                </div>
              )}

              <div>
                <label htmlFor="cabin-select" className="block text-xs font-semibold  text-slate-700 mb-1.5">
                  Cabin Class
                </label>
                <select
                  id="cabin-select"
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-2xl    bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:border-pink focus:outline-none transition-all shadow-inner cursor-pointer"
                >
                  <option value="Economy Saver" className="  bg-white text-slate-900">Economy Saver</option>
                  <option value="Premium Economy" className="  bg-white text-slate-900">Premium Economy</option>
                  <option value="Business Class" className="  bg-white text-slate-900">Business Class</option>
                  <option value="First Class" className="  bg-white text-slate-900">First Class</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs  text-slate-700">Passengers:</span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, '5+'].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPassengers(typeof num === 'number' ? num : 5)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                      passengers === num || (num === '5+' && passengers >= 5)
                        ? 'bg-pink text-white shadow-pinkGlow'
                        : '  :bg-white/15 bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {flightError && (
              <div className="flex items-center gap-2 text-pink text-xs font-semibold bg-pink-500/10 p-2.5 rounded-xl border border-pink/30">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{flightError}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn-pink w-full py-3.5 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 text-base shadow-pinkGlow mt-3"
            >
              <span>Get flight fare options on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>
        )}

        {/* Other Tab Panel */}
        {activeTab === 'other' && (
          <motion.form
            key="other"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            onSubmit={handleOtherSubmit}
            className="space-y-4"
          >
            <div>
              <label htmlFor="other-service-select" className="block text-xs font-semibold  text-slate-700 mb-1.5">
                Service Required
              </label>
              <select
                id="other-service-select"
                value={otherService}
                onChange={(e) => setOtherService(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl    bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:border-pink focus:outline-none transition-all shadow-inner cursor-pointer"
              >
                <option value="Desert Safari Adventure" className="  bg-white text-slate-900">Desert Safari (Dune Bashing & BBQ Dinner)</option>
                <option value="City Tours (Dubai & Abu Dhabi)" className="  bg-white text-slate-900">City Tours (Dubai, Abu Dhabi & Sightseeing)</option>
                <option value="Private Yacht Charter" className="  bg-white text-slate-900">Yacht Services (Dubai Marina & Palm Cruising)</option>
                <option value="Hajj & Umrah Pilgrimage" className="  bg-white text-slate-900">Hajj / Umrah Services (Full Spiritual Package)</option>
                <option value="Airport Transfers" className="  bg-white text-slate-900">Airport Transfers (24/7 All UAE Airports)</option>
                <option value="Custom Tour Packages" className="  bg-white text-slate-900">Tour Packages (Domestic & International Holidays)</option>
                <option value="Saudi Visa Assistance" className="  bg-white text-slate-900">Saudi Visa (Tourist eVisa / Business / Umrah)</option>
                <option value="2-Year Residence Visa" className="  bg-white text-slate-900">2 Years Residence Visa (Freelance / Investor)</option>
                <option value="Family Visa Sponsorship" className="  bg-white text-slate-900">Family Visa Sponsorship & Documentation</option>
              </select>
            </div>

            <div>
              <label htmlFor="other-notes" className="block text-xs font-semibold  text-slate-700 mb-1.5">
                Tell us what you need <span className="text-pink">*</span>
              </label>
              <textarea
                id="other-notes"
                rows={3}
                value={otherNotes}
                onChange={(e) => {
                  setOtherNotes(e.target.value);
                  if (otherError) setOtherError('');
                }}
                placeholder="e.g. Need a 4-star hotel in downtown Dubai for 4 nights, or comprehensive travel insurance for Europe..."
                className="w-full px-4 py-2.5 rounded-2xl    :text-white/40 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:border-pink focus:outline-none transition-all shadow-inner resize-none"
              />
            </div>

            {otherError && (
              <div className="flex items-center gap-2 text-pink text-xs font-semibold bg-pink-500/10 p-2.5 rounded-xl border border-pink/30">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{otherError}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn-pink w-full py-3.5 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 text-base shadow-pinkGlow mt-3"
            >
              <span>Ask the team on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
