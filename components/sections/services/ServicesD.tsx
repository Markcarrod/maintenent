import React from 'react';
import { SectionComponentProps } from '../types';
import { ArrowRight } from 'lucide-react';

export default function ServicesD({ section, business, theme, onOpenLeadModal }: SectionComponentProps) {
  const { content, settings } = section;
  const isDark = settings.backgroundStyle === 'dark';

  const fallbackServices = [
    { id: 'fb-1', name: 'Curated Architectural Finishes', description: 'Precision carpentry, bespoke fittings, and hand-finished touchups executed to perfection.' },
    { id: 'fb-2', name: 'Structural & Surface Detailing', description: 'Flawless surface restorations and high-standard repairs for discerning property owners.' },
    { id: 'fb-3', name: 'Private Estate Care & Upkeep', description: 'Discreet, scheduled maintenance and white-glove management for high-end properties.' },
  ];

  const items = (content.items && content.items.length > 0)
    ? content.items
    : (business.services && business.services.length > 0)
    ? business.services
    : fallbackServices;

  return (
    <section id="services" className={`py-24 font-serif scroll-mt-20 ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-stone-900'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4 font-sans">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-400 font-bold block mb-1">
              Curated Services
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl">
              {content.heading || 'Selected Disciplines & Care'}
            </h2>
          </div>
          <div className="text-xs text-stone-400 uppercase tracking-widest font-semibold">
            {business.city}, {business.state}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((svc: any) => (
            <div key={svc.id} className="space-y-4 border-b border-stone-200/40 pb-8">
              <h3 className="text-xl font-bold">{svc.name}</h3>
              <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                {svc.description}
              </p>
              <button
                onClick={() => onOpenLeadModal?.(svc.name)}
                style={{ color: theme.primaryColor }}
                className="font-sans text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 pt-2 hover:underline"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
