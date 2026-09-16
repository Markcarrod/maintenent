import React from 'react';
import { SectionComponentProps } from '../types';
import { Sparkles, ArrowRight, Phone } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function HeroB({ section, business, theme, onOpenLeadModal }: SectionComponentProps) {
  const { content } = section;

  return (
    <section className="relative bg-zinc-950 text-white overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src={content.image || business.photos.hero}
          alt={business.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent z-10" />

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-zinc-200 text-xs font-semibold backdrop-blur-sm border border-white/15">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{content.badge || `Craftsmanship in ${business.city}, ${business.state}`}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
          {content.headline || business.name}
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          {content.subheadline || business.description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenLeadModal?.()}
            style={{ backgroundColor: theme.primaryColor }}
            className="px-8 py-4 rounded-xl text-zinc-950 font-black text-base shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <span>{content.primaryCta || 'Start Your Project'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={`tel:${business.phone}`}
            className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-sm border border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Call {formatPhoneNumber(business.phone)}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
