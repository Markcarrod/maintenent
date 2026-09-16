import React from 'react';
import { SectionComponentProps } from '../types';
import { ArrowRight, Phone } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function HeroD({ section, business, theme, onOpenLeadModal }: SectionComponentProps) {
  const { content, settings } = section;
  const isDark = settings.backgroundStyle === 'dark';

  return (
    <section className={`py-20 lg:py-28 px-6 max-w-6xl mx-auto font-serif ${isDark ? 'text-white' : 'text-stone-900'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 space-y-8">
          <div className="font-sans text-xs tracking-widest uppercase text-stone-400 flex items-center gap-2 font-bold">
            <span className="w-8 h-px bg-stone-400 inline-block" />
            <span>Dedicated Excellence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.15]">
            {content.headline || business.name}
          </h1>

          <p className={`font-sans text-base leading-relaxed max-w-xl ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
            {content.subheadline || business.description}
          </p>

          <div className="font-sans pt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onOpenLeadModal?.()}
              style={{ backgroundColor: theme.primaryColor }}
              className="px-8 py-4 text-white text-xs uppercase tracking-widest font-bold hover:brightness-110 transition-all"
            >
              {content.primaryCta || 'Schedule Consultation'}
            </button>
            <a
              href={`tel:${business.phone}`}
              className={`px-8 py-4 border text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 ${
                isDark ? 'border-stone-700 text-stone-200 hover:bg-stone-900' : 'border-stone-300 text-stone-900 hover:bg-stone-100'
              }`}
            >
              <span>Call {formatPhoneNumber(business.phone)}</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="aspect-[4/5] bg-stone-200 overflow-hidden shadow-2xl relative rounded-xl">
            <img
              src={content.image || business.photos.hero}
              alt={business.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
