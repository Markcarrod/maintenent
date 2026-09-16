import React from 'react';
import { SectionComponentProps } from '../types';

export default function FAQA({ section, business, theme }: SectionComponentProps) {
  const { content, settings } = section;
  const faqs = content.faqs || [];
  const isDark = settings.backgroundStyle === 'dark';

  return (
    <section className={`py-20 ${isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'} border-t border-slate-200`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 space-y-2">
          <span
            style={{ color: theme.primaryColor }}
            className="text-xs font-bold uppercase tracking-wider"
          >
            Clear Answers
          </span>
          <h2 className="text-3xl font-black">{content.heading || 'Frequently Asked Questions'}</h2>
          <p className="text-xs text-slate-500">Everything you need to know about scheduling and work quality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq: any, idx: number) => (
            <div
              key={idx}
              className={`p-6 rounded-xl border ${
                isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <h3 className="text-base font-bold mb-2">{faq.question}</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
