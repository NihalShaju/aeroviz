import React from 'react';
import { MessageCircle, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { CONTACT, waLink } from '../lib/contact';
import { AerovizLogo } from './AerovizLogo';

export const FinalCTA: React.FC = () => {
  const primaryPhone = CONTACT.phones[0];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden  bg-slate-100 transition-colors">
      {/* Background Soft Pink and Navy Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px]  bg-pink/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-dark rounded-[36px] p-8 sm:p-14 lg:p-16 border  border-slate-200 shadow-2xl relative overflow-hidden">
          {/* Decorative floating dark glass chips at edges */}
          <div 
            aria-hidden="true"
            className="hidden lg:block absolute top-8 right-10 glass-dark px-4 py-2 rounded-2xl border  border-slate-200 text-xs font-semibold  text-slate-700 shadow-md"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Direct Embassy & GDRFA Submission</span>
            </div>
          </div>

          <div 
            aria-hidden="true"
            className="hidden lg:block absolute bottom-8 left-10 glass-dark px-4 py-2 rounded-2xl border  border-slate-200 text-xs font-semibold  text-slate-700 shadow-md"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink" />
              <span>Flight Options Sent in Minutes</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Authentic Brand Logo */}
            <div className="flex justify-center">
              <AerovizLogo size="xl" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold  text-slate-900 tracking-tight leading-tight">
                Send us your passport copy and we'll take it from there.
              </h2>
              <p className="text-base sm:text-lg  text-slate-600 max-w-2xl mx-auto leading-relaxed">
                No forms to fight with. Message us and get a clear answer on documents, cost and time.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={waLink("Hi Aeroviz, I want to send my passport copy for review.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pink px-8 py-4 rounded-full text-base font-bold flex items-center gap-2.5 shadow-pinkGlow"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Start on WhatsApp</span>
              </a>

              <a
                href={`tel:${primaryPhone.tel}`}
                className="   :bg-white/20 bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200 px-8 py-4 rounded-full text-base font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <Phone className="w-5 h-5 text-pink" />
                <span>Call now</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs  text-slate-600 font-medium">
              <span className="tabular-nums">Desk 1: {CONTACT.phones[0].display}</span>
              <span>·</span>
              <span className="tabular-nums">Desk 2: {CONTACT.phones[1].display}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
