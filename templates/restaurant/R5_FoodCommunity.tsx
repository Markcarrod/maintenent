import React from 'react';
import { TemplateProps } from '../types';
import { Phone, MapPin, Calendar, Heart, Users, Star, ArrowRight } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function TemplateR5_FoodCommunity({ business, content, onOpenLeadModal }: TemplateProps) {
  const { name, phone, address, city, state, zip, hours, rating, reviewCount, photos, menu = [], reviews } = business;

  const communityEvents = [
    { day: 'Tuesdays', title: 'Neighborhood Pasta & Wine Night', desc: 'Special pasta creations and featured Italian pairings.' },
    { day: 'Thursdays', title: 'Live Acoustic Evenings', desc: 'Local musicians performing on our dining patio.' },
    { day: 'Sundays', title: 'Family Table Dinners', desc: 'Shared family-style platters crafted from local market produce.' }
  ];

  return (
    <div className="min-h-screen bg-amber-50/20 text-stone-900 font-sans antialiased">
      {/* Header */}
      <header className="border-b border-amber-100 bg-white/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold text-stone-900 block">{name}</span>
              <span className="text-xs text-amber-800 font-medium">Food & Community Gathering in {city}</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600">
            <a href="#story" className="hover:text-amber-800">Our Story</a>
            <a href="#dishes" className="hover:text-amber-800">Food</a>
            <a href="#events" className="hover:text-amber-800">Events & Specials</a>
            <a href="#visit" className="hover:text-amber-800">Visit</a>
          </nav>

          <button
            onClick={() => onOpenLeadModal?.('Community Table / Catering')}
            className="px-5 py-2.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Gather With Us
          </button>
        </div>
      </header>

      {/* Hero: Storytelling & Photography Heavy */}
      <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Proudly Rooted in {city}, {state}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-950 leading-tight">
              A Gathering Place Built on Good Food and Great Friends
            </h1>

            <p className="text-base text-stone-600 leading-relaxed max-w-xl">
              {content.aboutStory}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#dishes"
                className="px-7 py-3.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm text-center transition-colors"
              >
                Explore Community Menu
              </a>
              <button
                onClick={() => onOpenLeadModal?.('Large Party / Private Event')}
                className="px-7 py-3.5 rounded-full bg-white border border-stone-300 text-stone-900 font-bold text-sm hover:bg-stone-50 transition-colors"
              >
                Plan a Private Event
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-xl">
              <img src={photos.hero} alt={name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section id="dishes" className="py-20 bg-white border-y border-amber-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">From the Kitchen</span>
            <h2 className="font-serif text-3xl font-bold text-stone-950">Shared Plates & House Favorites</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menu.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">{item.name}</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.description}</p>
                </div>
                <span className="font-bold text-amber-900 text-base shrink-0">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Events & Specials */}
      <section id="events" className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Weekly Happenings</span>
          <h2 className="font-serif text-3xl font-bold text-stone-950">Events at {name}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communityEvents.map((evt, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-amber-200/80 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">{evt.day}</span>
              <h3 className="font-serif text-lg font-bold text-stone-950">{evt.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{evt.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="visit" className="bg-stone-950 text-stone-400 py-12 px-4 text-xs text-center">
        <p className="font-serif text-base text-stone-200 mb-1">{name}</p>
        <p>{address}, {city}, {state} • {formatPhoneNumber(phone)}</p>
      </footer>
    </div>
  );
}
