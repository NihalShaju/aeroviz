import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { CONTACT, waLink } from '../lib/contact';

export const TopBar: React.FC = () => {
  return (
    <div className="hidden md:block  bg-slate-100  text-slate-700 text-xs h-9  border-b border-slate-200 z-40 relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Left: Desk description */}
        <div className="flex items-center gap-2  text-slate-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-pink animate-pulse" />
          <span>UAE-based visa and worldwide travel desk</span>
        </div>

        {/* Right: Direct Phone and WhatsApp links */}
        <div className="flex items-center gap-5">
          {CONTACT.phones.map((phone, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <a
                href={`tel:${phone.tel}`}
                className="flex items-center gap-1.5  text-slate-700 :text-white hover:text-slate-900 transition-colors tabular-nums font-medium"
                title={`Call ${phone.display}`}
              >
                <Phone className="w-3.5 h-3.5 text-pink" />
                <span>{phone.display}</span>
              </a>
              <span className=" text-slate-300">·</span>
              <a
                href={waLink("Hi Aeroviz, I need assistance with visa / travel services.", phone.wa)}
                target="_blank"
                rel="noopener noreferrer"
                className=" text-slate-600 hover:text-pink transition-colors p-0.5 rounded focus-visible:outline-pink flex items-center gap-1 text-[11px]"
                title={`WhatsApp ${phone.display}`}
                aria-label={`Chat on WhatsApp with ${phone.display}`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>WA {idx + 1}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
