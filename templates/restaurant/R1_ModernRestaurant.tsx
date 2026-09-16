import React, { useState } from 'react';
import { TemplateProps } from '../types';
import { Phone, MapPin, Clock, Star, Utensils, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function TemplateR1_ModernRestaurant({ business, content, onOpenLeadModal }: TemplateProps) {
  const { name, phone, address, city, state, zip, hours, rating, reviewCount, photos, menu = [], reviews } = business;

  const categories = Array.from(new Set(menu.map(m => m.category)));
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || 'All');

  const filteredMenu = selectedCategory === 'All'
    ? menu
    : menu.filter(m => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased">
      {/* Top Header */}
      <header className="border-b border-zinc-200 sticky top-0 z-40 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-zinc-950 block leading-tight">{name}</span>
            <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold">{city}, {state}</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#menu" className="hover:text-zinc-950">Menu</a>
            <a href="#about" className="hover:text-zinc-950">About</a>
            <a href="#hours" className="hover:text-zinc-950">Hours & Location</a>
            <a href="#reviews" className="hover:text-zinc-950">Reviews</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#menu"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-zinc-800 hover:text-zinc-950"
            >
              View Menu
            </a>
            <button
              onClick={() => onOpenLeadModal?.('Table Reservation')}
              className="px-5 py-2.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero: Large food photography */}
      <section className="relative bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-45">
          <img src={photos.hero} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />

        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-28 lg:py-36 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-zinc-200 text-xs font-semibold backdrop-blur-sm border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Modern Culinary Dining in {city}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Authentic Craft, Inspired Flavors
          </h1>

          <p className="text-lg text-zinc-300 max-w-xl mx-auto leading-relaxed">
            {business.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a
              href="#menu"
              className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-base transition-colors shadow-lg shadow-amber-500/10"
            >
              Explore the Menu
            </a>
            <button
              onClick={() => onOpenLeadModal?.('Table Reservation')}
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-sm border border-white/20 transition-colors"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Fresh Daily</span>
            <h2 className="font-serif text-4xl font-bold text-zinc-950">Our Current Menu</h2>
            <p className="text-zinc-600 text-sm">Prepared with seasonal produce and artisan techniques.</p>
          </div>

          {/* Category Tabs */}
          {categories.length > 1 && (
            <div className="flex justify-center flex-wrap gap-2 mb-12">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Menu Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredMenu.map((item) => (
              <div key={item.id} className="border-b border-zinc-200/80 pb-6 flex gap-4">
                {item.image && (
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-serif text-lg font-bold text-zinc-950">{item.name}</h3>
                    <span className="font-serif text-base font-bold text-amber-700 shrink-0 ml-4">{item.price}</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-2">{item.description}</p>
                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex gap-1.5">
                      {item.dietary.map((d, i) => (
                        <span key={i} className="text-[10px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                          {d}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section id="hours" className="py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-2">Visit Us</span>
            <h2 className="font-serif text-3xl font-bold text-zinc-950 mb-6">Dining Hours & Location</h2>
            <div className="space-y-4 text-sm text-zinc-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-zinc-900">{address}</div>
                  <div>{city}, {state} {zip}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <a href={`tel:${phone}`} className="font-bold hover:underline">
                  {formatPhoneNumber(phone)}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 text-base mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Weekly Kitchen Hours</span>
            </h3>
            <div className="space-y-2 text-xs">
              {Object.entries(hours).map(([day, time]) => (
                <div key={day} className="flex justify-between py-1.5 border-b border-zinc-100 last:border-0">
                  <span className="font-medium text-zinc-600">{day}</span>
                  <span className="font-bold text-zinc-900">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 bg-white border-t border-zinc-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center text-amber-400 mb-3">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400" />)}
          </div>
          <h2 className="font-serif text-3xl font-bold text-zinc-950 mb-10">Guest Reviews ({rating} Stars)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {reviews.map((r) => (
              <div key={r.id} className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 space-y-3">
                <p className="font-serif text-zinc-700 italic text-sm">"{r.comment}"</p>
                <div className="font-bold text-zinc-900 text-xs pt-2 border-t border-zinc-200">{r.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-12 px-4 text-xs text-center border-t border-zinc-800">
        <p className="font-serif text-base text-zinc-100 mb-1">{name}</p>
        <p>{address}, {city}, {state} • {formatPhoneNumber(phone)}</p>
      </footer>
    </div>
  );
}
