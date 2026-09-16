import React, { useState } from 'react';
import { SectionComponentProps } from '../types';
import { ChevronDown } from 'lucide-react';

export default function FAQB({ section, business, theme }: SectionComponentProps) {
  const { content } = section;
  const faqs = content.faqs || [];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black">{content.heading || 'Questions & Answers'}</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq: any, idx: number) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-sm flex justify-between items-center bg-slate-50/50 hover:bg-slate-100 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
