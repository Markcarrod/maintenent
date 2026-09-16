import React from 'react';
import { SectionComponentProps } from '../types';
import { Star } from 'lucide-react';

export default function ReviewsA({ section, business, theme }: SectionComponentProps) {
  const { content, settings } = section;
  const reviews = content.reviews || business.reviews || [];
  const isDark = settings.backgroundStyle === 'dark';

  return (
    <section id="reviews" className={`py-20 scroll-mt-20 ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'} border-t border-slate-100`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span
            style={{ color: theme.primaryColor }}
            className="text-xs font-bold uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full"
          >
            Verified Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            {content.heading || 'Real Customer Experiences'}
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <span className="font-bold">{business.rating} out of 5</span>
            <span className="text-slate-400">({business.reviewCount} local reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev: any) => (
            <div
              key={rev.id}
              className={`p-7 rounded-2xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex text-amber-400 gap-1 mb-3">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className={`text-sm italic leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  "{rev.comment}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm">{rev.author}</div>
                  <div className="text-xs text-slate-400">{rev.date || 'Verified Customer'}</div>
                </div>
                {rev.serviceOrDish && (
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded">
                    {rev.serviceOrDish}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
