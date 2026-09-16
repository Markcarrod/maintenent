import React from 'react';
import { TemplateProps } from '../types';
import { Phone, ShoppingBag, Clock, MapPin, Zap, ArrowRight, Star } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function TemplateR4_TakeoutFastCasual({ business, content, onOpenLeadModal }: TemplateProps) {
  const { name, phone, address, city, state, zip, hours, rating, reviewCount, menu = [] } = business;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* High-Conversion Order Banner */}
      <div className="bg-orange-600 text-white font-bold text-xs py-2.5 px-4 text-center flex items-center justify-center gap-2">
        <Zap className="w-4 h-4 fill-white" />
        <span>Fresh & Hot Ready in 15-25 Mins • Curbside Pickup & Delivery in {city}</span>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <span className="font-black text-2xl text-slate-950 block leading-tight">{name}</span>
            <span className="text-xs text-orange-600 font-bold uppercase">Fast Casual & Takeout</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${phone}`}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900"
            >
              <Phone className="w-4 h-4 text-orange-600" />
              <span>{formatPhoneNumber(phone)}</span>
            </a>
            <button
              onClick={() => onOpenLeadModal?.('Takeout Order')}
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm flex items-center gap-2 shadow-md transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Online</span>
            </button>
          </div>
        </div>
      </header>

      {/* Action-Oriented Hero */}
      <section className="py-12 px-4 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-none">
            Crave-Worthy Food Made Fresh & Fast
          </h1>

          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Skip the wait! Order your favorites ahead for seamless pickup or call our kitchen directly.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenLeadModal?.('Takeout Order')}
              className="px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-lg flex items-center justify-center gap-2 shadow-lg shadow-orange-600/25 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Start Takeout Order</span>
            </button>
            <a
              href={`tel:${phone}`}
              className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              <span>Call Kitchen: {formatPhoneNumber(phone)}</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 font-bold pt-2">
            <span>⏱️ 15-25 Min Prep Time</span>
            <span>📍 Easy Curbside Pickup</span>
            <span>⭐ {rating} Star Rated</span>
          </div>
        </div>
      </section>

      {/* Popular Menu Items Grid */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-950">Customer Favorites</h2>
            <p className="text-xs text-slate-500">Tap any item to order</p>
          </div>
          <button
            onClick={() => onOpenLeadModal?.('Online Order')}
            className="text-xs font-bold text-orange-600 hover:text-orange-700"
          >
            Full Menu →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLeadModal?.(item.name)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-orange-500 shadow-2xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                {item.image && (
                  <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-950 text-base">{item.name}</h3>
                    <span className="font-black text-orange-600 text-base shrink-0 ml-2">{item.price}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button className="w-full py-2 bg-orange-50 hover:bg-orange-600 text-orange-700 hover:text-white rounded-xl text-xs font-bold transition-colors">
                  + Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pickup & Location Information */}
      <section className="py-12 px-4 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h3 className="text-lg font-black text-slate-950 mb-1">Pickup Location</h3>
            <p className="text-xs text-slate-600">{address}, {city}, {state} {zip}</p>
            <p className="text-xs text-slate-500 mt-1">Convenient parking & curbside spots available.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onOpenLeadModal?.('Takeout Order')}
              className="px-6 py-3 rounded-xl bg-orange-600 text-white text-xs font-black"
            >
              Order Online Now
            </button>
          </div>
        </div>
      </section>

      {/* Sticky Mobile Order Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-slate-200 z-30 shadow-lg flex gap-2">
        <button
          onClick={() => onOpenLeadModal?.('Quick Order')}
          className="flex-1 py-3.5 bg-orange-600 text-white font-black text-center rounded-xl text-sm flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Order Online</span>
        </button>
        <a
          href={`tel:${phone}`}
          className="px-4 py-3.5 bg-slate-900 text-white rounded-xl text-sm flex items-center justify-center"
        >
          <Phone className="w-4 h-4" />
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-8 px-4 text-center text-xs">
        <p className="text-slate-300 font-bold mb-1">{name} Quick Service</p>
        <p>{city}, {state} • {formatPhoneNumber(phone)}</p>
      </footer>
    </div>
  );
}
