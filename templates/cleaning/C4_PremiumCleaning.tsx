import React from 'react';
import { TemplateProps } from '../types';
import { Phone, Star, Sparkles, Gem, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function TemplateC4_PremiumCleaning({ business, content, onOpenLeadModal }: TemplateProps) {
  const { name, phone, city, state, rating, reviewCount, photos, services, reviews } = business;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
      {/* Top Banner */}
      <div className="border-b border-slate-800 py-2.5 px-6 text-center text-xs tracking-widest uppercase text-slate-400 font-medium">
        White-Glove Private Estate & Residence Care in {city}, {state}
      </div>

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div>
            <span className="text-xl font-light tracking-widest uppercase text-white block">
              {name}
            </span>
            <span className="text-[10px] tracking-widest uppercase text-emerald-400 font-semibold">
              Bespoke Housekeeping
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href={`tel:${phone}`} className="hidden sm:block text-xs font-bold text-slate-300 hover:text-white">
              {formatPhoneNumber(phone)}
            </a>
            <button
              onClick={() => onOpenLeadModal?.()}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs tracking-widest uppercase font-bold transition-all shadow-md"
            >
              Reserve Service
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-bold">
              <Gem className="w-4 h-4" />
              <span>Unrivaled Standards</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
              An Immaculate Sanctuary for Your Home
            </h1>

            <p className="text-slate-300 text-base leading-relaxed max-w-xl">
              {business.description}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onOpenLeadModal?.()}
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs uppercase tracking-widest font-bold transition-all"
              >
                Schedule Private Consultation
              </button>
              <a
                href={`tel:${phone}`}
                className="px-8 py-4 border border-slate-700 hover:border-slate-500 text-white text-xs uppercase tracking-widest font-bold transition-all text-center"
              >
                Direct Call: {formatPhoneNumber(phone)}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
              <img src={photos.hero} alt={name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* The Experience */}
      <section className="py-24 bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">The Experience</span>
            <h2 className="text-3xl font-light tracking-wide text-white">White-Glove Discretion & Detailing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div key={svc.id} className="bg-slate-900 p-8 border border-slate-800 space-y-4 rounded-xl">
                <h3 className="text-lg font-bold text-white tracking-wide">{svc.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{svc.description}</p>
                <button
                  onClick={() => onOpenLeadModal?.(svc.name)}
                  className="text-xs text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-1 pt-2"
                >
                  <span>Select Care Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div key={r.id} className="p-6 bg-slate-800/40 border border-slate-800 rounded-xl space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
              </div>
              <p className="text-slate-300 text-xs italic leading-relaxed">"{r.comment}"</p>
              <div className="pt-2 text-xs text-white font-bold">{r.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 text-center text-xs text-slate-500">
        <p className="text-slate-300 font-semibold mb-1">{name} Private Housekeeping</p>
        <p>{city}, {state} • {formatPhoneNumber(phone)}</p>
      </footer>
    </div>
  );
}
