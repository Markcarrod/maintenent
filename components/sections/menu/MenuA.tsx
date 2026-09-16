import React, { useState } from 'react';
import { SectionComponentProps } from '../types';

export default function MenuA({ section, business, theme }: SectionComponentProps) {
  const { content, settings } = section;
  const items = content.items || business.menu || [];
  const categories = Array.from(new Set(items.map((m: any) => m.category))) as string[];
  const [selectedCat, setSelectedCat] = useState<string>(categories[0] || 'All');

  const filtered = selectedCat === 'All' ? items : items.filter((m: any) => m.category === selectedCat);

  return (
    <section id="services" className="py-24 bg-white text-zinc-900 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span
            style={{ color: theme.primaryColor }}
            className="text-xs font-bold uppercase tracking-widest"
          >
            Fresh Daily
          </span>
          <h2 className="font-serif text-4xl font-bold text-zinc-950">
            {content.heading || 'Current Kitchen Menu'}
          </h2>
          <p className="text-zinc-600 text-sm">
            {content.subheading || 'Crafted with authentic ingredients and culinary care.'}
          </p>
        </div>

        {categories.length > 1 && (
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            <button
              onClick={() => setSelectedCat('All')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCat === 'All' ? 'bg-zinc-950 text-white shadow-xs' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              All Courses
            </button>
            {categories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCat === cat ? 'bg-zinc-950 text-white shadow-xs' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item: any) => (
            <div key={item.id} className="border-b border-zinc-200 pb-6 flex gap-4">
              {item.image && (
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-serif text-lg font-bold text-zinc-950">{item.name}</h3>
                  <span
                    style={{ color: theme.primaryColor }}
                    className="font-serif text-base font-bold shrink-0 ml-4"
                  >
                    {item.price}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed mb-2">{item.description}</p>
                {item.dietary && (
                  <div className="flex gap-1">
                    {item.dietary.map((d: string, i: number) => (
                      <span key={i} className="text-[10px] bg-zinc-100 text-zinc-500 font-bold px-2 py-0.5 rounded">
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
