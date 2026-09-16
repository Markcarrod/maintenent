import React from 'react';
import { SectionComponentProps } from '../types';
import { Star } from 'lucide-react';

export default function ReviewsC({ section, business, theme }: SectionComponentProps) {
  const { content } = section;
  const review = business.reviews[0];

  return (
    <section id="reviews" className="py-20 bg-white text-slate-900 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <div className="flex justify-center text-amber-400 gap-1">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400" />)}
        </div>

        <p className="text-2xl sm:text-3xl font-medium italic text-slate-900 leading-snug">
          "{review?.comment || 'Exceptional professionalism, transparent pricing, and punctual service from start to finish.'}"
        </p>

        <div className="pt-2">
          <div className="font-bold text-slate-950 text-base">{review?.author || 'Local Homeowner'}</div>
          <div className="text-xs text-slate-500">{business.city}, {business.state}</div>
        </div>
      </div>
    </section>
  );
}
