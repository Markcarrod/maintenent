import React from 'react';
import { SectionComponentProps } from '../types';
import { CheckCircle2, Shield, Award, Clock } from 'lucide-react';

export default function AboutA({ section, business, theme }: SectionComponentProps) {
  const { content, settings } = section;
  const isDark = settings.backgroundStyle === 'dark';

  const defaultPillars = [
    { title: 'Local Craftsmanship', desc: `Proudly serving neighbors across ${business.city} with meticulous attention to detail and accountability.` },
    { title: 'Honest Upfront Quotes', desc: 'Clear, transparent estimates before any work begins. Zero unexpected surcharges or hidden fees.' },
    { title: 'Punctual & Respectful', desc: 'We show up on schedule, maintain clean workspaces, and treat your property with utmost care.' },
    { title: 'Satisfaction Guaranteed', desc: 'We stand firmly behind our work. If anything falls short of expectations, we resolve it promptly.' },
  ];

  const pillars = (content.pillars && content.pillars.length > 0) ? content.pillars : defaultPillars;
  const image = content.image || business.photos.about || business.photos.hero;

  return (
    <section id="about" className={`py-20 scroll-mt-20 ${isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span
            style={{ color: theme.primaryColor }}
            className="text-xs font-bold uppercase tracking-wider bg-white/80 dark:bg-slate-800 px-3 py-1 rounded-full shadow-2xs"
          >
            Our Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            {content.heading || `Why Homeowners Depend on ${business.name}`}
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {content.story || business.description}
          </p>
        </div>

        {pillars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item: any, idx: number) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 border space-y-3 ${
                  isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-2xs hover:shadow-md'
                } transition-all`}
              >
                <div
                  style={{ backgroundColor: theme.primaryColor }}
                  className="w-8 h-8 rounded-xl text-white flex items-center justify-center font-bold text-xs shadow-xs"
                >
                  {idx + 1}
                </div>
                <h3 className="text-base font-black">{item.title}</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
