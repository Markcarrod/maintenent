import React from 'react';
import { SectionComponentProps } from '../types';
import { Phone } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function CTAC({ section, business, theme, onOpenLeadModal }: SectionComponentProps) {
  const { content, settings } = section;
  const isDark = settings.backgroundStyle === 'dark';

  return (
    <section className={`py-20 ${isDark ? 'bg-zinc-950 text-white' : 'bg-stone-50 text-stone-900'} text-center px-6`}>
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold">
          {content.headline || 'We Look Forward to Welcoming You'}
        </h2>
        <p className="text-sm opacity-80 max-w-xl mx-auto leading-relaxed">
          {content.subheadline || `Experience genuine hospitality and quality care at ${business.name}.`}
        </p>
        <div className="pt-2 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => onOpenLeadModal?.()}
            style={{ backgroundColor: theme.primaryColor }}
            className="px-8 py-4 rounded-xl text-slate-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-sm"
          >
            {content.buttonText || 'Schedule / Inquire'}
          </button>
          <a
            href={`tel:${business.phone}`}
            className="px-8 py-4 rounded-xl border border-stone-300 text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{formatPhoneNumber(business.phone)}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
