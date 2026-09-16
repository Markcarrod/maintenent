import React from 'react';
import { SectionComponentProps } from '../types';
import { Phone, ArrowRight, Zap, Clock } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function HeroC({ section, business, theme, onOpenLeadModal }: SectionComponentProps) {
  const { content } = section;

  return (
    <section className="bg-white py-14 px-4 border-b border-slate-200">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
          <Clock className="w-3.5 h-3.5" />
          <span>Active Service Windows in {business.city} Today</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          {content.headline || business.name}
        </h1>

        <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          {content.subheadline || business.description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <a
            href={`tel:${business.phone}`}
            style={{ backgroundColor: theme.primaryColor }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-white text-lg font-black flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition-all"
          >
            <Phone className="w-5 h-5 fill-white" />
            <span>Call {formatPhoneNumber(business.phone)}</span>
          </a>
          <button
            onClick={() => onOpenLeadModal?.()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-base font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <span>{content.primaryCta || 'Get Help Today'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 text-xs text-slate-500 font-semibold pt-2">
          <span>✓ Direct Local Team</span>
          <span>✓ Upfront Honest Estimates</span>
          <span>✓ Reliable Turnaround</span>
        </div>
      </div>
    </section>
  );
}
