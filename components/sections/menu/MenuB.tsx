import React from 'react';
import { SectionComponentProps } from '../types';

export default function MenuB({ section, business, theme }: SectionComponentProps) {
  const { content } = section;
  const items = content.items || business.menu || [];

  return (
    <section id="services" className="py-20 bg-amber-50/40 text-amber-950 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span
            style={{ color: theme.primaryColor }}
            className="text-xs font-bold uppercase tracking-wider block mb-2"
          >
            Homestyle Cooking
          </span>
          <h2 className="text-3xl font-black">{content.heading || 'Customer Favorite Dishes'}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item: any) => (
            <div key={item.id} className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-2xs flex justify-between gap-4">
              <div>
                <h3 className="font-bold text-amber-950 text-base">{item.name}</h3>
                <p className="text-xs text-amber-900/70 mt-1 leading-relaxed">{item.description}</p>
                {item.dietary && (
                  <div className="flex gap-1 mt-2">
                    {item.dietary.map((d: string, i: number) => (
                      <span key={i} className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span
                style={{ color: theme.primaryColor }}
                className="font-bold text-base shrink-0"
              >
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
