import React from 'react';
import { SectionComponentProps } from '../types';
import { Star, ShieldCheck, Award, ThumbsUp, UserCheck, Phone } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function HeroE({ section, business, theme, onOpenLeadModal }: SectionComponentProps) {
  const { content } = section;

  return (
    <section className="bg-slate-50 py-16 lg:py-20 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Established Reputation in {business.city}, {business.state}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {content.headline || `The ${business.category} Your Neighbors Trust`}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {content.subheadline || business.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onOpenLeadModal?.()}
                style={{ backgroundColor: theme.primaryColor }}
                className="px-7 py-4 rounded-xl text-white font-bold text-base shadow-md hover:brightness-110 transition-all text-center"
              >
                {content.primaryCta || 'Request Free Estimate'}
              </button>
              <a
                href={`tel:${business.phone}`}
                className="px-7 py-4 rounded-xl bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-900 font-bold text-base transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call {formatPhoneNumber(business.phone)}</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="text-xs font-bold text-slate-700">Direct Operator</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="text-xs font-bold text-slate-700">Reliable & Clean</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="text-xs font-bold text-slate-700">{business.reviewCount}+ Local Reviews</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-2xl border-2 border-blue-100 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400" />)}
                </div>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  Verified Local Feedback
                </span>
              </div>
              <p className="text-slate-800 text-base italic leading-relaxed">
                "{business.reviews[0]?.comment || 'Outstanding service from start to finish. Arrived right on time and handled everything cleanly.'}"
              </p>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{business.reviews[0]?.author || 'Verified Neighbor'}</div>
                  <div className="text-xs text-slate-500">{business.city}, {business.state}</div>
                </div>
                <span className="text-xs text-slate-600 font-semibold bg-slate-100 px-2.5 py-1 rounded">
                  {business.reviews[0]?.serviceOrDish || 'Customer'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
