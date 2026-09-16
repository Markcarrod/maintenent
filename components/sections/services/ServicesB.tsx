import React from 'react';
import { SectionComponentProps } from '../types';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function ServicesB({ section, business, theme, onOpenLeadModal }: SectionComponentProps) {
  const { content } = section;
  const fallbackServices = [
    { id: 'fb-1', name: 'Comprehensive Inspection & Diagnostics', description: 'Full safety and functionality checks followed by detailed upfront scope and pricing.' },
    { id: 'fb-2', name: 'Precision Repairs & Upgrades', description: 'Expert execution using top-grade equipment and industry standard safety procedures.' },
    { id: 'fb-3', name: 'Scheduled Maintenance Upkeep', description: 'Regular preventative visits to keep your residential or commercial space operating smoothly.' },
  ];

  const items = (content.items && content.items.length > 0)
    ? content.items
    : (business.services && business.services.length > 0)
    ? business.services
    : fallbackServices;

  return (
    <section id="services" className="py-20 bg-white text-slate-900 border-t border-slate-100 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span
            style={{ color: theme.primaryColor }}
            className="text-xs font-bold uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full"
          >
            Thorough Deliverables
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            {content.heading || "What's Included in Every Service"}
          </h2>
          <p className="text-slate-600 text-sm">
            {content.subheading || 'Structured checklists ensure your space or project receives reliable care.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((svc: any) => (
            <div key={svc.id} className="bg-slate-50/80 rounded-3xl p-7 border border-slate-200/80 flex flex-col justify-between space-y-4 hover:shadow-lg transition-shadow">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h3 className="text-lg font-black text-slate-950">{svc.name}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">{svc.description}</p>
              </div>
              <div className="pt-3 border-t border-slate-200">
                <button
                  onClick={() => onOpenLeadModal?.(svc.name)}
                  style={{ color: theme.primaryColor }}
                  className="text-xs font-bold flex items-center gap-1 hover:underline"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
