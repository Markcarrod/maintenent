import React from 'react';
import { TemplateProps } from '../types';
import { Phone, Sparkles, CheckCircle2, Shield, Star, Clock, ArrowRight, MapPin, Check } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function TemplateC1_ProfessionalCleaning({ business, content, onOpenLeadModal }: TemplateProps) {
  const { name, phone, address, city, state, zip, hours, rating, reviewCount, photos, services, reviews, serviceAreas } = business;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* Top Banner */}
      <div className="bg-cyan-900 text-cyan-100 text-xs py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            Top-Rated Residential & Maid Cleaning in {city}, {state}
          </span>
          <a href={`tel:${phone}`} className="font-bold hover:text-white flex items-center gap-1">
            <Phone className="w-3 h-3" /> Call {formatPhoneNumber(phone)}
          </a>
        </div>
      </div>

      {/* Navigation */}
      <header className="border-b border-slate-100 sticky top-0 z-40 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-black shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-xl text-slate-950 block leading-tight">{name}</span>
              <span className="text-[11px] text-cyan-700 font-bold uppercase tracking-wider">Professional Cleaning Services</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#services" className="hover:text-cyan-700">Services</a>
            <a href="#how-it-works" className="hover:text-cyan-700">How It Works</a>
            <a href="#why-us" className="hover:text-cyan-700">Why Choose Us</a>
            <a href="#reviews" className="hover:text-cyan-700">Reviews</a>
            <a href="#faq" className="hover:text-cyan-700">FAQ</a>
          </nav>

          <button
            onClick={() => onOpenLeadModal?.()}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
          >
            <span>Get a Free Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-cyan-50/70 via-white to-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{rating} Stars ({reviewCount} Happy Homes in {city})</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
              {content.headline}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              {content.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onOpenLeadModal?.()}
                className="px-7 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-base shadow-lg hover:shadow-cyan-600/20 transition-all text-center"
              >
                Get Instant Quote
              </button>
              <a
                href={`tel:${phone}`}
                className="px-7 py-4 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-900 font-bold text-base transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-600" />
                <span>Call {formatPhoneNumber(phone)}</span>
              </a>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-600" /> All Supplies Provided</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-600" /> Strict Quality Checklist</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] lg:aspect-[5/6]">
              <img
                src={photos.hero}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cleaning Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">
              Tailored Cleaning
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950">
              Our Professional Services
            </h2>
            <p className="text-slate-600">Flexible cleaning packages designed for your home schedule.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div key={svc.id} className="bg-slate-50 rounded-2xl p-7 border border-slate-200/80 flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold mb-4">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 mb-2">{svc.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{svc.description}</p>
                </div>
                <button
                  onClick={() => onOpenLeadModal?.(svc.name)}
                  className="w-full py-2.5 rounded-lg bg-white hover:bg-cyan-600 text-slate-800 hover:text-white border border-slate-200 hover:border-cyan-600 text-xs font-bold transition-colors"
                >
                  Book This Service
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">Easy Booking</span>
            <h2 className="text-3xl font-black text-slate-950">How Simple It Is</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-full bg-cyan-600 text-white font-black text-lg flex items-center justify-center mx-auto">1</div>
              <h3 className="text-lg font-bold text-slate-950">Request Your Quote</h3>
              <p className="text-slate-600 text-xs leading-relaxed">Tell us your home size, preferred timing, and cleaning priorities.</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-full bg-cyan-600 text-white font-black text-lg flex items-center justify-center mx-auto">2</div>
              <h3 className="text-lg font-bold text-slate-950">We Clean Thoroughly</h3>
              <p className="text-slate-600 text-xs leading-relaxed">Our vetted cleaners arrive promptly with all equipment and supplies ready.</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-full bg-cyan-600 text-white font-black text-lg flex items-center justify-center mx-auto">3</div>
              <h3 className="text-lg font-bold text-slate-950">Enjoy Your Fresh Home</h3>
              <p className="text-slate-600 text-xs leading-relaxed">Walk into a sparkling clean home with zero hassle or stress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl font-black text-slate-950">Trusted by Families Across {city}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.id} className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-slate-700 text-sm italic leading-relaxed">"{r.comment}"</p>
                <div className="pt-2 border-t border-slate-200 font-bold text-slate-900 text-xs">
                  {r.author} — <span className="font-normal text-slate-500">{r.serviceOrDish}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <div className="text-base font-black text-white">{name}</div>
            <div>{address}, {city}, {state} {zip}</div>
          </div>
          <div>
            Call {formatPhoneNumber(phone)} • © {new Date().getFullYear()} {name}
          </div>
        </div>
      </footer>
    </div>
  );
}
