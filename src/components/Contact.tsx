import React, { useState } from 'react';
import { Phone, MessageCircle, Clock, MapPin, Send, AlertCircle, Plane, Sparkles } from 'lucide-react';
import { CONTACT, waLink } from '../lib/contact';
import { MOST_TRAVELED_COUNTRIES } from '../lib/countries';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [service, setService] = useState('11. Flight Tickets to Every Country');
  const [isFlight, setIsFlight] = useState(true);
  
  // Flight Specific Fields
  const [flightFrom, setFlightFrom] = useState('Dubai (DXB)');
  const [flightTo, setFlightTo] = useState('');
  const [tripType, setTripType] = useState('Round-trip');
  const [flightClass, setFlightClass] = useState('Economy');
  const [passengers, setPassengers] = useState(1);
  
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');

  const handleServiceChange = (val: string) => {
    setService(val);
    setIsFlight(val.toLowerCase().includes('flight'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    setFormError('');

    let formattedMessage = `Hi Aeroviz, my name is ${name.trim()}${phoneInput ? ` (${phoneInput.trim()})` : ''}.\n• Service: ${service}`;
    
    if (isFlight) {
      formattedMessage += `\n• Route: ${flightFrom || 'Dubai (DXB)'} → ${flightTo || 'Everywhere / Any'}\n• Trip Type: ${tripType} | Class: ${flightClass} | Passengers: ${passengers}`;
    }

    if (message.trim()) {
      formattedMessage += `\n• Notes/Dates: ${message.trim()}`;
    }

    const url = waLink(formattedMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full    bg-pink/10 border-pink/20 text-pink-700 font-semibold text-xs mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-pink" />
            <span>Direct Support Desk & Flight Bookings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold  text-slate-900 tracking-tight leading-tight mb-4">
            Talk to the Aeroviz team.
          </h2>
          <p className="text-base sm:text-lg  text-slate-600 leading-relaxed">
            Call or message either number. We confirm flight fares to every country and verify visa documents on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Direct Phone Cards + Contact Info */}
          <div className="lg:col-span-6 space-y-6">
            {/* Direct Phone Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONTACT.phones.map((phone, idx) => (
                <div 
                  key={idx} 
                  className="glass glass--tile p-6 flex flex-col justify-between shadow-md   bg-white border-slate-200/80"
                >
                  <div>
                    <span className="text-xs font-semibold  text-slate-500 block mb-1">
                      Desk Line {idx + 1}
                    </span>
                    <h3 className="text-lg font-heading font-bold  text-slate-900 tabular-nums mb-6">
                      {phone.display}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2 pt-3 border-t  border-slate-200">
                    <a
                      href={`tel:${phone.tel}`}
                      className="btn-glass py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2  text-slate-800  bg-slate-100 border border-slate-200 hover:bg-slate-200"
                    >
                      <Phone className="w-3.5 h-3.5 text-pink" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href={waLink("Hi Aeroviz, I need assistance.", phone.wa)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pink py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-pinkGlow"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Desk</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Real Office Address & Business Details from Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Office Address */}
              <div className="glass glass--tile p-6 shadow-md   bg-white border-slate-200/80">
                <div className="flex items-center gap-2  text-slate-900 font-bold text-sm mb-2">
                  <MapPin className="w-4 h-4 text-pink" />
                  <span>Dubai Office Location</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold    text-slate-800 bg-slate-100 border border-slate-200 p-3.5 rounded-xl leading-relaxed">
                  {CONTACT.address}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs  text-slate-500">
                  <span>{CONTACT.shortAddress}</span>
                  <a
                    href="https://maps.google.com/?q=Al+Qusais+2+Dubai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink hover:underline font-semibold"
                  >
                    View map →
                  </a>
                </div>
              </div>

              {/* Email & Team Contacts */}
              <div className="glass glass--tile p-6 shadow-md   bg-white border-slate-200/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2  text-slate-900 font-bold text-sm mb-2">
                    <Clock className="w-4 h-4 text-pink" />
                    <span>Support & Email</span>
                  </div>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-xs sm:text-sm font-semibold text-pink hover:underline   bg-slate-100 border border-slate-200 p-3.5 rounded-xl block mb-3 break-all"
                  >
                    {CONTACT.email}
                  </a>
                </div>

                <div className="space-y-1.5 pt-2 border-t  border-slate-200 text-xs">
                  {CONTACT.team.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="font-bold  text-slate-800">{m.name}</span>
                      <span className="text-pink text-[11px] font-medium">{m.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive WhatsApp Enquiry Form with Flight Options */}
          <div className="lg:col-span-6">
            <div className="glass glass--panel p-6 sm:p-9 shadow-xl   bg-white border border-slate-200/80 backdrop-blur-2xl">
              <h3 className="text-xl sm:text-2xl font-heading font-bold  text-slate-900 mb-2">
                Quick Enquiry & Flight Quotes
              </h3>
              <p className="text-xs sm:text-sm  text-slate-600 mb-6">
                Tell us what you need and we will generate instant live quotes on WhatsApp.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold  text-slate-700 mb-1.5">
                      Your name <span className="text-pink">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder="e.g. Tariq Khan"
                      className="w-full px-4 py-2.5 rounded-2xl    :text-white/40 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-base sm:text-sm font-medium focus:border-pink focus:outline-none transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold  text-slate-700 mb-1.5">
                      Phone number (optional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="e.g. +971 50 000 0000"
                      className="w-full px-4 py-2.5 rounded-2xl    :text-white/40 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-base sm:text-sm font-medium focus:border-pink focus:outline-none transition-all shadow-inner tabular-nums"
                    />
                  </div>
                </div>

                {/* What do you need? Section */}
                <div>
                  <label htmlFor="contact-service" className="block text-xs font-semibold  text-slate-700 mb-1.5">
                    What do you need? <span className="text-pink">*</span>
                  </label>
                  <select
                    id="contact-service"
                    value={service}
                    onChange={(e) => handleServiceChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl    bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm font-medium focus:border-pink focus:outline-none transition-all shadow-inner cursor-pointer"
                  >
                    <option value="11. Flight Tickets to Every Country" className="  bg-white text-slate-900">✈️ 11. Flight Tickets to Every Country (Worldwide)</option>
                    <option value="1. Tourist Visa (30/60 Days)" className="  bg-white text-slate-900">1. Tourist Visa (30/60 Days)</option>
                    <option value="2. Visa Change by Flight & Bus" className="  bg-white text-slate-900">2. Visa Change by Flight and Bus</option>
                    <option value="3. Single / Multiple Entry Visa" className="  bg-white text-slate-900">3. Single / Multiple Entry Visa</option>
                    <option value="4. Family Visa Sponsorship" className="  bg-white text-slate-900">4. Family Visa</option>
                    <option value="5. 2-Year Residence Visa" className="  bg-white text-slate-900">5. 2 Years Residence Visa</option>
                    <option value="6. Transit Visa (48h/96h)" className="  bg-white text-slate-900">6. Transit Visa</option>
                    <option value="7. Airport Transfers" className="  bg-white text-slate-900">7. Airport Transfers (24/7)</option>
                    <option value="8. Tour Packages" className="  bg-white text-slate-900">8. Tour Packages</option>
                    <option value="9. Hajj & Umrah Services" className="  bg-white text-slate-900">9. Hajj / Umrah Services</option>
                    <option value="10. Saudi Visa" className="  bg-white text-slate-900">10. Saudi Visa (Tourist/Umrah/Business)</option>
                    <option value="12. Desert Safari Adventure" className="  bg-white text-slate-900">12. Desert Safari</option>
                    <option value="13. City Tours" className="  bg-white text-slate-900">13. City Tours (Dubai & Abu Dhabi)</option>
                    <option value="14. Yacht Services" className="  bg-white text-slate-900">14. Yacht Services (Dubai Marina)</option>
                  </select>
                </div>

                {/* Additional Flight Details (Shown when Flight is selected) */}
                {isFlight && (
                  <div className="p-3.5 rounded-2xl  bg-pink-50/50 border border-pink/30 space-y-3">
                    <div className="flex items-center justify-between text-xs text-pink font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 rotate-45" />
                        Flight Customization
                      </span>
                      <span className="text-[10px]  text-slate-500">500+ Airlines</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold  text-slate-700 mb-1">
                          From (Departure)
                        </label>
                        <input
                          type="text"
                          value={flightFrom}
                          onChange={(e) => setFlightFrom(e.target.value)}
                          placeholder="e.g. Dubai (DXB)"
                          className="w-full px-3 py-2 rounded-xl    :text-white/40 bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:border-pink focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold  text-slate-700 mb-1">
                          To (Destination Country / City)
                        </label>
                        <input
                          type="text"
                          value={flightTo}
                          onChange={(e) => setFlightTo(e.target.value)}
                          placeholder="e.g. London, Riyadh, Karachi, Bangkok..."
                          className="w-full px-3 py-2 rounded-xl    :text-white/40 bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:border-pink focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Quick Popular Country Buttons */}
                    <div>
                      <span className="block text-[10px]  text-slate-500 mb-1 font-medium">
                        Quick Popular Destinations:
                      </span>
                      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                        {MOST_TRAVELED_COUNTRIES.slice(0, 6).map((c) => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => setFlightTo(`${c.name} (${c.airportCode?.split(' ')[0] || c.code})`)}
                            className="px-2.5 py-1 rounded-lg  :bg-pink/20  bg-white hover:bg-pink-100 text-slate-700 hover:text-pink text-[11px] whitespace-nowrap transition-all border  border-slate-200 shrink-0"
                          >
                            <span>{c.flag} {c.name.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-semibold  text-slate-700 mb-1">Type</label>
                        <select
                          value={tripType}
                          onChange={(e) => setTripType(e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg    bg-white border border-slate-200 text-slate-900 text-xs focus:border-pink focus:outline-none cursor-pointer"
                        >
                          <option value="Round-trip">Round-trip</option>
                          <option value="One-way">One-way</option>
                          <option value="Multi-city">Multi-city</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold  text-slate-700 mb-1">Class</label>
                        <select
                          value={flightClass}
                          onChange={(e) => setFlightClass(e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg    bg-white border border-slate-200 text-slate-900 text-xs focus:border-pink focus:outline-none cursor-pointer"
                        >
                          <option value="Economy">Economy</option>
                          <option value="Premium Economy">Premium</option>
                          <option value="Business Class">Business</option>
                          <option value="First Class">First Class</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold  text-slate-700 mb-1">Passengers</label>
                        <input
                          type="number"
                          min={1}
                          max={20}
                          value={passengers}
                          onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                          className="w-full px-2 py-1.5 rounded-lg    bg-white border border-slate-200 text-slate-900 text-xs focus:border-pink focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold  text-slate-700 mb-1.5">
                    Dates or additional requests?
                  </label>
                  <textarea
                    id="contact-message"
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us your travel dates, preferred airline, or specific requirements..."
                    className="w-full px-4 py-2 rounded-2xl    :text-white/40 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-base sm:text-sm font-medium focus:border-pink focus:outline-none transition-all shadow-inner resize-none"
                  />
                </div>

                {formError && (
                  <div className="flex items-center gap-2 text-pink text-xs font-semibold bg-pink-500/10 p-2.5 rounded-xl border border-pink/30">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-pink w-full py-3.5 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 text-base shadow-pinkGlow"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Quick Enquiry on WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
