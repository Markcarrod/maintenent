import React from 'react';
import { TemplateProps } from '../types';
import { Phone, MapPin, Star, ArrowRight, ShieldCheck, Compass, Check } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function TemplateH4_PremiumHomeImprovement({ business, content, onOpenLeadModal }: TemplateProps) {
  const { name, phone, address, city, state, zip, hours, rating, reviewCount, photos, services, reviews, serviceAreas } = business;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-serif antialiased">
      {/* Top Banner */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-6 tracking-widest uppercase font-sans text-center border-b border-stone-800">
        Bespoke Home Improvement & Artisan Carpentry in {city}, {state}
      </div>

      {/* Elegant Editorial Header */}
      <header className="border-b border-stone-200 bg-stone-50/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between font-sans">
          <div className="text-center sm:text-left">
            <span className="font-serif text-2xl font-bold tracking-wider text-stone-950 block">
              {name}
            </span>
            <span className="text-[10px] tracking-widest text-stone-500 uppercase">
              Fine Architectural Repairs & Finish Carpentry
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-stone-600 font-semibold">
            <a href="#services" className="hover:text-stone-950">Services</a>
            <a href="#portfolio" className="hover:text-stone-950">Our Work</a>
            <a href="#philosophy" className="hover:text-stone-950">Philosophy</a>
            <a href="#testimonials" className="hover:text-stone-950">Client Notes</a>
          </nav>

          <button
            onClick={() => onOpenLeadModal?.()}
            className="px-6 py-3 border border-stone-900 bg-stone-950 text-stone-50 text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors"
          >
            Inquire
          </button>
        </div>
      </header>

      {/* Hero: Spacious, Editorial, Luxury */}
      <section className="py-20 lg:py-28 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="font-sans text-xs tracking-widest uppercase text-stone-500 flex items-center gap-2">
              <span className="w-8 h-px bg-stone-400 inline-block" />
              <span>Dedicated Craftsmanship</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-950 leading-[1.15]">
              Every detail considered. Every repair executed to perfection.
            </h1>

            <p className="font-sans text-base text-stone-600 leading-relaxed max-w-xl">
              {business.description}
            </p>

            <div className="font-sans pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onOpenLeadModal?.()}
                className="px-8 py-4 bg-stone-950 text-stone-50 text-xs uppercase tracking-widest font-bold hover:bg-stone-800 transition-colors"
              >
                Schedule Consultation
              </button>
              <a
                href={`tel:${phone}`}
                className="px-8 py-4 border border-stone-300 text-stone-900 text-xs uppercase tracking-widest font-bold hover:bg-stone-100 transition-colors flex items-center justify-center gap-2"
              >
                <span>Call {formatPhoneNumber(phone)}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/5] bg-stone-200 overflow-hidden shadow-2xl relative">
              <img
                src={photos.hero}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services: High-end Minimal Layout */}
      <section id="services" className="py-24 bg-white border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-6 font-sans">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-stone-400 font-bold block mb-1">Expertise</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-950">Selected Disciplines</h2>
            </div>
            <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
              Serving Discriminating Homeowners in {city}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((svc) => (
              <div key={svc.id} className="space-y-4 border-b border-stone-200 pb-8">
                <div className="aspect-[16/10] overflow-hidden bg-stone-100 mb-4">
                  <img
                    src={svc.image || photos.hero}
                    alt={svc.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-950">{svc.name}</h3>
                <p className="text-sm text-stone-600 leading-relaxed font-sans">{svc.description}</p>
                <button
                  onClick={() => onOpenLeadModal?.(svc.name)}
                  className="text-xs uppercase tracking-wider font-bold text-stone-950 hover:text-stone-600 flex items-center gap-1.5 pt-2"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="py-24 bg-stone-900 text-stone-100 font-sans">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">Our Philosophy</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-50 leading-relaxed">
            "True luxury in home maintenance is when the repair is completely invisible, and the craftsmanship endures for decades."
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed max-w-2xl mx-auto">
            {content.aboutStory}
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6 font-sans">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-bold block mb-2">Verified Feedback</span>
            <h2 className="font-serif text-3xl text-stone-950">Client Endorsements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white p-8 border border-stone-200 shadow-sm space-y-4">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />)}
                </div>
                <p className="font-serif text-stone-700 italic text-sm leading-relaxed">"{r.comment}"</p>
                <div className="pt-4 border-t border-stone-100 font-sans text-xs">
                  <div className="font-bold text-stone-900">{r.author}</div>
                  <div className="text-stone-400">{r.serviceOrDish}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-16 px-6 font-sans text-xs border-t border-stone-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-serif text-lg text-stone-100 mb-1">{name}</div>
            <div>{address} • {city}, {state}</div>
          </div>
          <div>
            Direct Inquiries: <a href={`tel:${phone}`} className="text-stone-200 underline">{formatPhoneNumber(phone)}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
