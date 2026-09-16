import React from 'react';
import { TemplateProps } from '../types';
import { Phone, MapPin, Clock, Star, Calendar, Wine, Compass } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function TemplateR3_PremiumDining({ business, content, onOpenLeadModal }: TemplateProps) {
  const { name, phone, address, city, state, zip, hours, rating, photos, menu = [], reviews } = business;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-serif antialiased">
      {/* Top Header */}
      <header className="border-b border-stone-800/60 sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between font-sans">
          <div className="text-left">
            <span className="font-serif text-2xl tracking-widest text-stone-100 block uppercase">
              {name}
            </span>
            <span className="text-[10px] tracking-widest uppercase text-amber-400 font-medium">
              Fine Dining & Wine Bar • {city}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase text-stone-400 font-semibold">
            <a href="#tasting" className="hover:text-stone-100">The Menu</a>
            <a href="#experience" className="hover:text-stone-100">Experience</a>
            <a href="#reservations" className="hover:text-stone-100">Reservations</a>
          </nav>

          <button
            onClick={() => onOpenLeadModal?.('Fine Dining Reservation')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-widest transition-all"
          >
            Reserve Table
          </button>
        </div>
      </header>

      {/* Hero: Luxury, Minimal, Editorial */}
      <section className="relative py-28 lg:py-36 px-6 max-w-5xl mx-auto text-center space-y-8">
        <div className="font-sans text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center justify-center gap-2">
          <Wine className="w-4 h-4" />
          <span>An Uncompromising Culinary Journey</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal text-stone-100 tracking-tight leading-[1.15]">
          Culinary artistry celebrating time, fire, and provenance.
        </h1>

        <p className="font-sans text-stone-400 text-base max-w-xl mx-auto leading-relaxed">
          {business.description}
        </p>

        <div className="font-sans pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => onOpenLeadModal?.('Fine Dining Reservation')}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs uppercase tracking-widest font-bold transition-all"
          >
            Request Evening Reservation
          </button>
          <a
            href="#tasting"
            className="px-8 py-4 border border-stone-800 text-stone-300 text-xs uppercase tracking-widest font-bold hover:bg-stone-900 transition-all text-center"
          >
            Explore Courses
          </a>
        </div>
      </section>

      {/* Hero Photo Banner */}
      <div className="max-w-6xl mx-auto px-6 mb-24">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
          <img src={photos.hero} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Tasting / Menu Courses */}
      <section id="tasting" className="py-24 border-t border-stone-900 bg-stone-900/40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-2">
            <span className="font-sans text-xs uppercase tracking-widest text-amber-400 font-bold">Selected Offerings</span>
            <h2 className="text-4xl text-stone-100">Featured Courses & Specialties</h2>
          </div>

          <div className="space-y-8">
            {menu.map((item) => (
              <div key={item.id} className="border-b border-stone-800 pb-8 flex justify-between items-baseline gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl text-stone-100">{item.name}</h3>
                    {item.popular && (
                      <span className="font-sans text-[9px] uppercase tracking-wider bg-amber-500/20 text-amber-400 px-2 py-0.5 border border-amber-400/30">
                        Signature
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-xs text-stone-400 mt-1 max-w-xl leading-relaxed">{item.description}</p>
                </div>
                <div className="text-xl text-amber-400 font-sans font-medium shrink-0">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Reservations */}
      <section id="reservations" className="py-24 border-t border-stone-900">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 font-sans">
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-100">Reservations & Private Dining</h2>
          <p className="text-stone-400 text-sm max-w-lg mx-auto leading-relaxed">
            Seating is intimate. We accommodate reservations up to 30 days in advance. For private dining or buyouts, please contact our concierge directly.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => onOpenLeadModal?.('Fine Dining Reservation')}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs uppercase tracking-widest font-bold"
            >
              Book Table
            </button>
            <a
              href={`tel:${phone}`}
              className="px-8 py-4 border border-stone-800 text-stone-200 text-xs uppercase tracking-widest font-bold hover:bg-stone-900"
            >
              Concierge: {formatPhoneNumber(phone)}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-stone-900 text-center font-sans text-xs text-stone-500">
        <p className="font-serif text-stone-300 text-base mb-1">{name}</p>
        <p>{address}, {city}, {state} {zip}</p>
      </footer>
    </div>
  );
}
