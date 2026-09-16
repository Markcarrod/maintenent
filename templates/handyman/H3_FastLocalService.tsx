import React from 'react';
import { TemplateProps } from '../types';
import { Phone, MapPin, Star, Zap, Clock, Shield, Check, ArrowRight } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function TemplateH3_FastLocalService({ business, content, onOpenLeadModal }: TemplateProps) {
  const { name, phone, city, state, hours, rating, reviewCount, services, reviews, serviceAreas } = business;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Urgent Availability Top Bar */}
      <div className="bg-red-600 text-white font-bold text-xs py-2.5 px-4 text-center flex items-center justify-center gap-2">
        <Zap className="w-4 h-4 fill-white" />
        <span>Need a repair quickly? Fast dispatch & prompt callbacks across {city}</span>
      </div>

      {/* Clean Mobile-First Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-black text-slate-950 block">{name}</span>
            <span className="text-xs text-slate-500 font-medium">Quick Handyman & Small Repairs</span>
          </div>
          <a
            href={`tel:${phone}`}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Phone className="w-4 h-4 fill-white" />
            <span>Call Now</span>
          </a>
        </div>
      </header>

      {/* Hero: Direct Phone & Quick Help Focus */}
      <section className="bg-white py-12 px-4 border-b border-slate-200">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
            <Clock className="w-3.5 h-3.5" />
            <span>Accepting Service Calls in {city} Today</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Fast, Reliable Repairs for Your Home
          </h1>

          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Small leaks, fixture swaps, drywall holes, broken hardware? We arrive on time and get your household repairs handled without delay.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <a
              href={`tel:${phone}`}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-lg font-black flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <Phone className="w-5 h-5 fill-white" />
              <span>Call {formatPhoneNumber(phone)}</span>
            </a>
            <button
              onClick={() => onOpenLeadModal?.()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-base font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Get Help Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 font-semibold pt-4">
            <span className="flex items-center gap-1">✓ No Service Call Surprise Fees</span>
            <span className="flex items-center gap-1">✓ Direct Local Contractor</span>
          </div>
        </div>
      </section>

      {/* Popular Repairs */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-950">Common Repairs We Fix Daily</h2>
            <span className="text-xs text-slate-500 font-medium">{services.length} Core Services</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((svc) => (
              <div
                key={svc.id}
                onClick={() => onOpenLeadModal?.(svc.name)}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-red-500/50 shadow-xs cursor-pointer transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 font-bold text-sm">
                  ⚡
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{svc.name}</h3>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed">{svc.description}</p>
                  <span className="text-red-600 text-xs font-bold inline-flex items-center gap-1 mt-2">
                    Request Fast Fix →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Customers Choose Us */}
      <section className="py-12 px-4 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-slate-950 text-center mb-8">Why Neighbors Call Us First</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center mx-auto font-black text-lg">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">Clear Upfront Rates</h3>
              <p className="text-slate-600 text-xs">We explain the cost before turning a single screw. No hidden surprises.</p>
            </div>
            <div className="p-4 space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center mx-auto font-black text-lg">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">Prompt Scheduling</h3>
              <p className="text-slate-600 text-xs">When you have a leaking fixture or broken lock, you need help without waiting weeks.</p>
            </div>
            <div className="p-4 space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center mx-auto font-black text-lg">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">Clean & Respectful</h3>
              <p className="text-slate-600 text-xs">We clean up after our work and leave your home as tidy as when we entered.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Reviews */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <div className="flex justify-center text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400" />)}
            </div>
            <h2 className="text-2xl font-black text-slate-950">{rating} Stars ({reviewCount} Verified Reviews)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white p-5 rounded-xl border border-slate-200 text-xs space-y-3">
                <p className="text-slate-700 italic">"{r.comment}"</p>
                <div className="font-bold text-slate-900 pt-2 border-t border-slate-100">{r.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Mobile Phone Bottom CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-slate-200 z-30 shadow-lg flex gap-2">
        <a
          href={`tel:${phone}`}
          className="flex-1 py-3 bg-red-600 text-white font-bold text-center rounded-lg text-sm flex items-center justify-center gap-1.5"
        >
          <Phone className="w-4 h-4 fill-white" />
          <span>Call {formatPhoneNumber(phone)}</span>
        </a>
        <button
          onClick={() => onOpenLeadModal?.()}
          className="flex-1 py-3 bg-slate-900 text-white font-bold text-center rounded-lg text-sm"
        >
          Get Help
        </button>
      </div>

      {/* Simple Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 px-4 text-center text-xs">
        <p className="text-slate-300 font-bold mb-1">{name} — Local Handyman in {city}, {state}</p>
        <p className="text-slate-500">Call {formatPhoneNumber(phone)} • Available {hours['Monday - Friday'] || 'Mon - Fri'}</p>
      </footer>
    </div>
  );
}
