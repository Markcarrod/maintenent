import React from 'react';
import { SectionComponentProps } from '../types';
import { Phone, Star, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function HeroA({ section, business, theme, onOpenLeadModal }: SectionComponentProps) {
  const { content, settings } = section;
  const isDark = settings.backgroundStyle === 'dark';

  return (
    <section className={`relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden ${
      isDark ? 'bg-slate-950 text-white' : 'bg-gradient-to-b from-slate-50 to-white text-slate-900'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          {content.badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{content.badge}</span>
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
            {content.headline || business.name}
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed max-w-xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {content.subheadline || business.description}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => onOpenLeadModal?.()}
              style={{ backgroundColor: theme.primaryColor }}
              className="px-6 py-3.5 rounded-xl text-white font-semibold text-base shadow-md hover:brightness-110 transition-all text-center"
            >
              {content.primaryCta || 'Request a Free Quote'}
            </button>
            <a
              href={`tel:${business.phone}`}
              className={`px-6 py-3.5 rounded-xl border-2 font-semibold text-base transition-colors flex items-center justify-center gap-2 ${
                isDark ? 'border-slate-700 hover:bg-slate-900 text-white' : 'border-slate-200 hover:border-slate-300 text-slate-900 bg-white'
              }`}
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>{content.secondaryCta || `Call ${formatPhoneNumber(business.phone)}`}</span>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 max-w-lg">
            <div>
              <div className="text-2xl font-black">{business.reviewCount}+</div>
              <div className="text-xs text-slate-500 font-medium">Happy Neighbors</div>
            </div>
            <div>
              <div className="text-2xl font-black">Upfront</div>
              <div className="text-xs text-slate-500 font-medium">Clear Estimates</div>
            </div>
            <div>
              <div className="text-2xl font-black">100%</div>
              <div className="text-xs text-slate-500 font-medium">Local & Vetted</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] lg:aspect-[5/6] bg-slate-100">
            <img
              src={content.image || business.photos.hero}
              alt={business.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-slate-100 text-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-slate-400">Direct Local Service</div>
                  <div className="text-sm font-bold text-slate-900">{business.name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
