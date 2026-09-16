import React from 'react';
import { SectionComponentProps } from '../types';
import { Phone, ArrowRight, Zap } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function CTAB({ section, business, theme, onOpenLeadModal }: SectionComponentProps) {
  const { content } = section;

  return (
    <section className="py-14 bg-red-600 text-white text-center px-4">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>Fast Scheduling</span>
        </div>

        <h2 className="text-3xl font-black">{content.headline || 'Need Urgent Service or Fast Repair?'}</h2>
        <p className="text-xs text-white/90 max-w-xl mx-auto">
          {content.subheadline || `We provide prompt response and reliable work throughout ${business.city}.`}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <a
            href={`tel:${business.phone}`}
            className="px-8 py-3.5 rounded-xl bg-white text-red-700 font-bold text-sm shadow-md hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call {formatPhoneNumber(business.phone)}</span>
          </a>
          <button
            onClick={() => onOpenLeadModal?.()}
            className="px-8 py-3.5 rounded-xl bg-black/30 hover:bg-black/40 text-white font-bold text-sm border border-white/30 transition-colors"
          >
            {content.buttonText || 'Request Online Now'}
          </button>
        </div>
      </div>
    </section>
  );
}
