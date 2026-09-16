import React from 'react';
import { SectionComponentProps } from '../types';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function ServicesC({ section, business, theme, onOpenLeadModal }: SectionComponentProps) {
  const { content } = section;
  const fallbackServices = [
    { id: 'fb-1', name: 'Comprehensive Inspection & Scope', description: 'Detailed diagnostic assessment followed by an upfront, transparent line-item quote.' },
    { id: 'fb-2', name: 'Expert Installation & Fit', description: 'Experienced technicians delivering flawless workmanship and code-compliant installations.' },
    { id: 'fb-3', name: 'Maintenance & Service Contracts', description: 'Scheduled recurring checkups and priority turnaround for commercial and residential accounts.' },
  ];

  const items = (content.items && content.items.length > 0)
    ? content.items
    : (business.services && business.services.length > 0)
    ? business.services
    : fallbackServices;

  return (
    <section id="services" className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-14 space-y-2">
          <span
            style={{ color: theme.primaryColor }}
            className="text-xs font-bold uppercase tracking-wider block"
          >
            Capabilities & Scope
          </span>
          <h2 className="text-3xl font-black text-slate-950">
            {content.heading || 'Comprehensive Professional Capabilities'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((svc: any) => (
            <div key={svc.id} className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-slate-400 transition-all flex flex-col justify-between shadow-2xs hover:shadow-md">
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-950">{svc.name}</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-6">{svc.description}</p>
              </div>
              <button
                onClick={() => onOpenLeadModal?.(svc.name)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-xl text-xs font-bold transition-colors text-center"
              >
                Inquire For Scope
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
