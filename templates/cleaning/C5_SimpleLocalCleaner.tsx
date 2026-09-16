import React from 'react';
import { TemplateProps } from '../types';
import { Phone, Star, Sparkles, Check, ArrowRight, Heart } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function TemplateC5_SimpleLocalCleaner({ business, content, onOpenLeadModal }: TemplateProps) {
  const { name, phone, city, state, rating, reviewCount, services, reviews, serviceAreas } = business;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* Friendly Header */}
      <header className="border-b border-slate-100 py-4 px-4 sticky top-0 bg-white/95 backdrop-blur-sm z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <span className="font-bold text-lg text-slate-950 block">{name}</span>
            <span className="text-xs text-slate-500">Local Cleaner in {city}</span>
          </div>
          <a
            href={`tel:${phone}`}
            className="px-4 py-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{formatPhoneNumber(phone)}</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 px-4 text-center bg-teal-50/40">
        <div className="max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-teal-200 text-teal-800 text-xs font-semibold shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Friendly, Trusted Cleaning in {city}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 leading-tight">
            Reliable Cleaning Without the High Agency Fees
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed">
            {business.description}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onOpenLeadModal?.()}
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md"
            >
              Get a Fast Free Quote
            </button>
            <a
              href={`tel:${phone}`}
              className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-sm hover:bg-slate-50"
            >
              Call {formatPhoneNumber(phone)}
            </a>
          </div>
        </div>
      </section>

      {/* Simple Services */}
      <section className="py-12 px-4 max-w-3xl mx-auto space-y-6">
        <h2 className="text-xl font-bold text-slate-950 text-center">Services Offered</h2>
        <div className="space-y-3">
          {services.map((svc) => (
            <div
              key={svc.id}
              onClick={() => onOpenLeadModal?.(svc.name)}
              className="p-4 rounded-xl border border-slate-200 hover:border-teal-500 flex justify-between items-center cursor-pointer transition-colors"
            >
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{svc.name}</h3>
                <p className="text-slate-500 text-xs mt-0.5">{svc.description}</p>
              </div>
              <span className="text-teal-600 text-xs font-bold shrink-0 ml-4">Book →</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-10 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex justify-center text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
          </div>
          <p className="text-xs font-bold text-slate-600">{rating} Stars from {reviewCount} Local Neighbors</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
            {reviews.slice(0, 2).map((r) => (
              <div key={r.id} className="bg-white p-4 rounded-lg border border-slate-200 text-xs space-y-2">
                <p className="text-slate-700 italic">"{r.comment}"</p>
                <div className="font-bold text-slate-900">{r.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-500">
        <p>{name} • {city}, {state} • {formatPhoneNumber(phone)}</p>
      </footer>
    </div>
  );
}
