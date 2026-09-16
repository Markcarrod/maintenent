import React from 'react';
import { TemplateProps } from '../types';
import { Phone, MapPin, Clock, Star, Utensils, Heart, ArrowRight } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function TemplateR2_CasualLocalRestaurant({ business, content, onOpenLeadModal }: TemplateProps) {
  const { name, phone, address, city, state, zip, hours, rating, reviewCount, menu = [], reviews } = business;

  return (
    <div className="min-h-screen bg-amber-50/30 text-amber-950 font-sans antialiased">
      {/* Friendly Header */}
      <header className="bg-white border-b border-amber-200/80 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xl text-amber-950 block">{name}</span>
              <span className="text-xs text-amber-700 font-medium">Neighborhood Kitchen in {city}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href={`tel:${phone}`} className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-amber-900">
              <Phone className="w-4 h-4 text-amber-600" />
              <span>{formatPhoneNumber(phone)}</span>
            </a>
            <button
              onClick={() => onOpenLeadModal?.('Takeout or Table')}
              className="px-5 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-sm transition-colors"
            >
              Order / Reserve
            </button>
          </div>
        </div>
      </header>

      {/* Hero: Warm & Welcoming */}
      <section className="py-16 px-4 bg-gradient-to-b from-amber-100/60 to-transparent">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-amber-800 text-xs font-bold border border-amber-200 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>A Neighborhood Tradition in {city}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-amber-950 tracking-tight leading-tight">
            Homestyle Cooking with Generous Portions
          </h1>

          <p className="text-base text-amber-900/80 max-w-xl mx-auto leading-relaxed">
            {business.description}
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <a
              href="#menu"
              className="px-6 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm transition-colors"
            >
              See Our Menu
            </a>
            <a
              href={`tel:${phone}`}
              className="px-6 py-3 rounded-xl bg-white border border-amber-300 text-amber-950 font-bold text-sm hover:bg-amber-50 transition-colors"
            >
              Call for Takeout: {formatPhoneNumber(phone)}
            </a>
          </div>
        </div>
      </section>

      {/* Popular Items Showcase */}
      <section id="menu" className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Favorites</span>
          <h2 className="text-3xl font-black text-amber-950">Customer Favorite Dishes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menu.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-2xs flex justify-between gap-4">
              <div>
                <h3 className="font-bold text-amber-950 text-base">{item.name}</h3>
                <p className="text-xs text-amber-900/70 mt-1 leading-relaxed">{item.description}</p>
                {item.dietary && (
                  <div className="flex gap-1 mt-2">
                    {item.dietary.map((d, i) => (
                      <span key={i} className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="font-bold text-amber-800 text-base shrink-0">{item.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Hours & Location */}
      <section className="py-12 px-4 bg-white border-y border-amber-200/80">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-amber-950 mb-2">Visit Our Dining Room</h3>
            <p className="text-sm text-amber-800">{address}, {city}, {state} {zip}</p>
            <p className="text-sm text-amber-700 font-bold mt-1">Direct Line: {formatPhoneNumber(phone)}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs space-y-1">
            <div className="font-bold text-amber-950 mb-1">Open This Week:</div>
            {Object.entries(hours).slice(0, 3).map(([d, h]) => (
              <div key={d} className="flex justify-between gap-4 text-amber-900">
                <span>{d}</span>
                <span className="font-semibold">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-amber-800/80">
        <p>© {new Date().getFullYear()} {name} • Welcoming Families in {city}</p>
      </footer>
    </div>
  );
}
