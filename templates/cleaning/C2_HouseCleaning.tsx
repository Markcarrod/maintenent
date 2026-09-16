import React from 'react';
import { TemplateProps } from '../types';
import { Phone, CheckCircle, Home, Bath, Utensils, Bed, ShieldCheck, Star, ArrowRight } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function TemplateC2_HouseCleaning({ business, content, onOpenLeadModal }: TemplateProps) {
  const { name, phone, city, state, rating, reviewCount, services, reviews } = business;

  const roomChecklist = [
    {
      room: 'Kitchen Care',
      icon: Utensils,
      items: ['Sanitize countertops & backsplashes', 'Scrub stove top & burner grates', 'Wipe exterior of all appliances', 'Deep scrub sink & chrome fixtures', 'Empty trash & disinfect bin']
    },
    {
      room: 'Bathrooms',
      icon: Bath,
      items: ['Scrub & disinfect tile showers and tubs', 'Clean and sanitize toilets inside & out', 'Streak-free polish of mirrors & glass', 'Disinfect vanity, faucets & counters', 'Mop and sanitize floor tiles']
    },
    {
      room: 'Bedrooms & Living Areas',
      icon: Bed,
      items: ['Dust ceiling fans, picture frames & lamps', 'Vacuum carpets, area rugs & hardwood', 'Wipe down window sills and ledges', 'Neaten bed linens & cushions', 'Clean high-touch door handles & switches']
    }
  ];

  return (
    <div className="min-h-screen bg-emerald-50/20 text-slate-800 font-sans antialiased">
      {/* Friendly Top Header */}
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl text-slate-900 block leading-tight">{name}</span>
              <span className="text-xs text-emerald-700 font-semibold">Residential House Cleaning in {city}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href={`tel:${phone}`} className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-slate-800">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>{formatPhoneNumber(phone)}</span>
            </a>
            <button
              onClick={() => onOpenLeadModal?.()}
              className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all shadow-sm"
            >
              Book House Clean
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-emerald-50/60 to-white px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Trusted House Cleaners in {city}, {state}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Come Home to a Truly Clean House
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {business.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenLeadModal?.()}
              className="px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-md transition-colors"
            >
              Get Your House Cleaning Quote
            </button>
            <a
              href={`tel:${phone}`}
              className="px-8 py-4 rounded-full bg-white border border-slate-300 text-slate-900 font-bold text-base hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>{formatPhoneNumber(phone)}</span>
            </a>
          </div>
        </div>
      </section>

      {/* What's Included: Room-by-Room Breakdown */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Thorough Checklist</span>
            <h2 className="text-3xl font-black text-slate-950">What's Included in Every Cleaning</h2>
            <p className="text-slate-600 text-sm">We don't cut corners. Here is exactly what our team takes care of in each room.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomChecklist.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className="bg-emerald-50/40 rounded-2xl p-7 border border-emerald-100 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{r.room}</h3>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {r.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-slate-950 text-center mb-12">Flexible Cleaning Schedules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div key={svc.id} className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-lg">{svc.name}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{svc.description}</p>
                <button
                  onClick={() => onOpenLeadModal?.(svc.name)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 pt-2"
                >
                  <span>Request for your home</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-black text-slate-950 mb-12">Loved by Busy Homeowners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {reviews.map((r) => (
              <div key={r.id} className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-slate-700 text-xs italic leading-relaxed">"{r.comment}"</p>
                <div className="font-bold text-slate-900 text-xs pt-2 border-t border-slate-200">{r.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 text-xs text-center">
        <p className="text-white font-bold text-sm mb-1">{name}</p>
        <p>{city}, {state} • Call {formatPhoneNumber(phone)}</p>
      </footer>
    </div>
  );
}
