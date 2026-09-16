import React from 'react';
import { SectionComponentProps } from '../types';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export default function AboutB({ section, business, theme }: SectionComponentProps) {
  const { content, settings } = section;
  const isDark = settings.backgroundStyle === 'dark';
  const image = content.image || business.photos.about || business.photos.hero;

  return (
    <section id="about" className={`py-24 scroll-mt-20 ${isDark ? 'bg-stone-900 text-stone-100' : 'bg-stone-100 text-stone-900'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 sm:aspect-square bg-stone-200">
              <img
                src={image}
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>Verified Local Craftsmen</span>
                </div>
                <div className="font-serif text-lg font-bold">{business.name}</div>
                <div className="text-xs text-stone-300">{business.city}, {business.state}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Quote & Story */}
          <div className="lg:col-span-7 space-y-6 font-sans">
            <span
              style={{ color: theme.primaryColor }}
              className="text-xs uppercase tracking-widest font-bold block"
            >
              Our Philosophy & Standard
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl leading-snug">
              "True satisfaction is when every detail is executed cleanly, and the results endure for years."
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
              {content.story || business.description}
            </p>

            <div className="pt-4 border-t border-stone-300/40 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Upfront Estimates Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Locally Accountable in {business.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
