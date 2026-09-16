import React from 'react';
import { SectionComponentProps } from '../types';
import { Star } from 'lucide-react';

export default function ReviewsB({ section, business, theme }: SectionComponentProps) {
  const { content } = section;
  const reviews = content.reviews || business.reviews || [];

  return (
    <section id="reviews" className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span
            style={{ color: theme.primaryColor }}
            className="text-xs font-bold uppercase tracking-wider"
          >
            Verified Track Record
          </span>
          <h2 className="text-3xl font-black">{content.heading || 'Wall of Verified Local Feedback'}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r: any) => (
            <div key={r.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(r.rating || 5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-700 text-sm italic">"{r.comment}"</p>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900">{r.author}</span>
                <span className="text-slate-400">{r.date || 'Verified'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
