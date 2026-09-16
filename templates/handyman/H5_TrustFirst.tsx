import React from 'react';
import { TemplateProps } from '../types';
import { Phone, MapPin, Star, ShieldCheck, Award, ThumbsUp, CheckCircle, ArrowRight, UserCheck } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function TemplateH5_TrustFirst({ business, content, onOpenLeadModal }: TemplateProps) {
  const { name, phone, address, city, state, zip, rating, reviewCount, photos, services, reviews, serviceAreas } = business;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* Trust Header */}
      <header className="border-b border-slate-200 sticky top-0 z-40 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl text-slate-900 block leading-tight">{name}</span>
              <span className="text-xs text-blue-600 font-bold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Verified Local Handyman • {city}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <div className="flex items-center gap-1 text-amber-500 font-black text-sm">
                <Star className="w-4 h-4 fill-amber-500" />
                <span>{rating} Rating ({reviewCount} Verified Reviews)</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">100% Verified Local Customers</div>
            </div>
            <a
              href={`tel:${phone}`}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-xs transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>{formatPhoneNumber(phone)}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero: Trust & Reputation Front and Center */}
      <section className="bg-slate-50 py-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Established Reputation in {city}, {state}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                The Handyman Your Neighbors Know and Trust
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {business.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onOpenLeadModal?.()}
                  className="px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-md transition-colors text-center"
                >
                  Request a Free Estimate
                </button>
                <a
                  href={`tel:${phone}`}
                  className="px-7 py-4 rounded-xl bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-900 font-bold text-base transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Call {formatPhoneNumber(phone)}</span>
                </a>
              </div>

              {/* Trust Badge Grid */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-700">Direct Owner Operator</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-700">Prompt & Dependable</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-700">{reviewCount}+ Real Reviews</span>
                </div>
              </div>
            </div>

            {/* Testimonial Highlight Card */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 rounded-2xl border-2 border-blue-100 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400" />)}
                  </div>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    Verified Customer
                  </span>
                </div>

                <p className="text-slate-800 text-base italic leading-relaxed">
                  "{reviews[0]?.comment || 'Outstanding service from start to finish. Arrived right on time and fixed all our home issues cleanly.'}"
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{reviews[0]?.author || 'Local Homeowner'}</div>
                    <div className="text-xs text-slate-500">{city}, {state}</div>
                  </div>
                  <span className="text-xs text-slate-600 font-semibold bg-slate-100 px-2.5 py-1 rounded">
                    {reviews[0]?.serviceOrDish || 'Home Repair'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Reliable Work</span>
            <h2 className="text-3xl font-black text-slate-950">Services Backed by Real Experience</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div key={svc.id} className="p-6 rounded-xl border border-slate-200 hover:border-blue-500/50 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-slate-950 mb-2">{svc.name}</h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{svc.description}</p>
                <button
                  onClick={() => onOpenLeadModal?.(svc.name)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Request Estimate for This</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall of Verified Reviews */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Unfiltered Feedback</span>
            <h2 className="text-3xl font-black text-slate-950">What Neighbors Say About {name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">"{r.comment}"</p>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">{r.author}</span>
                  <span className="text-slate-400">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <div className="text-base font-black text-white">{name}</div>
            <div className="text-slate-400">{address}, {city}, {state} {zip}</div>
          </div>
          <div>
            <a href={`tel:${phone}`} className="text-white font-bold text-sm hover:underline">
              {formatPhoneNumber(phone)}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
