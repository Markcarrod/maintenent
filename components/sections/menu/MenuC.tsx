import React from 'react';
import { SectionComponentProps } from '../types';

export default function MenuC({ section, business, theme }: SectionComponentProps) {
  const { content, settings } = section;
  const items = content.items || business.menu || [];
  const isDark = settings.backgroundStyle === 'dark';

  return (
    <section id="services" className={`py-24 font-serif scroll-mt-20 ${isDark ? 'bg-stone-900/60 text-stone-100' : 'bg-white text-stone-900'}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-2 font-sans">
          <span
            style={{ color: theme.primaryColor }}
            className="text-xs uppercase tracking-widest font-bold"
          >
            Tasting Experience
          </span>
          <h2 className="font-serif text-4xl">{content.heading || 'Featured Courses & Pairings'}</h2>
        </div>

        <div className="space-y-8">
          {items.map((item: any) => (
            <div key={item.id} className="border-b border-stone-800 pb-8 flex justify-between items-baseline gap-6">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl">{item.name}</h3>
                  {item.popular && (
                    <span className="font-sans text-[9px] uppercase tracking-wider bg-amber-500/20 text-amber-400 px-2 py-0.5 border border-amber-400/30">
                      Signature
                    </span>
                  )}
                </div>
                <p className="font-sans text-xs text-stone-400 mt-1 max-w-xl leading-relaxed">{item.description}</p>
              </div>
              <div
                style={{ color: theme.primaryColor }}
                className="text-xl font-sans font-medium shrink-0"
              >
                {item.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
