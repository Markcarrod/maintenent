import React from 'react';
import { SectionComponentProps } from '../types';
import { Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ServicesA({ section, business, theme, onOpenLeadModal }: SectionComponentProps) {
  const { content, settings } = section;
  const isDark = settings.backgroundStyle === 'dark';

  const fallbackServices = [
    {
      id: 'fb-1',
      name: business.industry === 'restaurant' ? 'Artisanal Main Courses' : 'Comprehensive Diagnostics & Repair',
      description: 'Handled with utmost precision, professional tooling, and verified satisfaction guarantee.',
      badge: 'Popular',
    },
    {
      id: 'fb-2',
      name: business.industry === 'restaurant' ? 'Chef Seasonal Tasting Selections' : 'Installation & Upgrades',
      description: 'Carefully curated deliverables with upfront pricing and honest scheduling.',
      badge: 'High Quality',
    },
    {
      id: 'fb-3',
      name: business.industry === 'restaurant' ? 'Catering & Event Menus' : 'Preventative & Routine Care',
      description: `Tailored for homeowners and businesses in ${business.city} looking for dependable service.`,
    },
  ];

  const rawItems = (content.items && content.items.length > 0)
    ? content.items
    : (business.services && business.services.length > 0)
    ? business.services
    : (business.menu && business.menu.length > 0)
    ? business.menu
    : fallbackServices;

  return (
    <section id="services" className={`py-20 scroll-mt-20 ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span
            style={{ color: theme.primaryColor }}
            className="text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full"
          >
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            {content.heading || (business.industry === 'restaurant' ? 'Culinary Highlights & Offerings' : 'Core Services & Capabilities')}
          </h2>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            {content.subheading || 'Quality craftsmanship and dependable maintenance done right.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rawItems.map((svc: any) => (
            <div
              key={svc.id}
              className={`rounded-3xl overflow-hidden border transition-all flex flex-col justify-between group ${
                isDark
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-50/80 hover:bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xl'
              }`}
            >
              {svc.image ? (
                <div className="aspect-16/10 overflow-hidden bg-slate-100 relative">
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {svc.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 text-white text-[10px] font-bold">
                        {svc.badge}
                      </span>
                    </div>
                  )}
                </div>
              ) : null}

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {!svc.image && (
                    <div className="flex items-center justify-between mb-3">
                      <div
                        style={{ color: theme.primaryColor }}
                        className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold shadow-2xs"
                      >
                        <Wrench className="w-5 h-5" />
                      </div>
                      {svc.badge && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          {svc.badge}
                        </span>
                      )}
                    </div>
                  )}
                  <h3 className="text-lg font-black text-slate-950 dark:text-white mb-2">{svc.name}</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {svc.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800">
                  <button
                    onClick={() => onOpenLeadModal?.(svc.name)}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-950 hover:text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Request Quote for This</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
