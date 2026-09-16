import React from 'react';
import { SectionComponentProps } from '../types';
import { Phone } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function CTAA({ section, business, theme, onOpenLeadModal }: SectionComponentProps) {
  const { content } = section;

  return (
    <section
      style={{ backgroundColor: theme.primaryColor }}
      className="py-16 text-white"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <h2 className="text-3xl font-black tracking-tight">
            {content.headline || `Ready to Get Started with ${business.name}?`}
          </h2>
          <p className="text-white/80 text-sm mt-1">
            {content.subheadline || `Dependable, professional service for ${business.city}, ${business.state}.`}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => onOpenLeadModal?.()}
            className="px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm shadow-md hover:bg-slate-100 transition-colors"
          >
            {content.buttonText || 'Request Free Quote'}
          </button>
          <a
            href={`tel:${business.phone}`}
            className="px-6 py-3.5 rounded-xl bg-black/20 hover:bg-black/30 text-white font-bold text-sm border border-white/30 transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>{formatPhoneNumber(business.phone)}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
