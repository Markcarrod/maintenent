import React from 'react';
import { SectionComponentProps } from '../types';
import { MapPin, Phone, Clock, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function ContactA({ section, business, theme, onOpenLeadModal }: SectionComponentProps) {
  const { content, settings } = section;
  const isDark = settings.backgroundStyle === 'dark' || true; // standard footer is dark for contrast
  const mapsUrl = business.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(`${business.address} ${business.city} ${business.state}`)}`;

  return (
    <footer id="contact" className="py-16 bg-slate-950 text-slate-300 border-t border-slate-900 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        {/* Col 1: Business Brand */}
        <div className="space-y-3 md:col-span-1">
          <div className="text-base font-black text-white">{business.name}</div>
          <p className="text-slate-400 text-xs leading-relaxed">{business.description}</p>
          <div className="pt-2 text-slate-500">© {new Date().getFullYear()} {business.name}. All rights reserved.</div>
        </div>

        {/* Col 2: Operating Hours */}
        <div className="space-y-3">
          <div className="font-bold text-white text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Operating Hours</span>
          </div>
          <div className="space-y-1.5">
            {Object.entries(business.hours || {
              'Monday - Friday': '8:00 AM - 6:00 PM',
              'Saturday': '9:00 AM - 3:00 PM',
              'Sunday': 'Closed',
            }).map(([day, hrs]) => (
              <div key={day} className="flex justify-between border-b border-slate-800/80 pb-1 text-slate-400">
                <span>{day}</span>
                <span className="font-semibold text-white">{hrs}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Direct Contact */}
        <div className="space-y-3">
          <div className="font-bold text-white text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Service & Location</span>
          </div>
          <div className="space-y-2">
            <div>{business.address}, {business.city}, {business.state} {business.zip}</div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
            >
              <span>Get Directions on Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <div className="flex items-center gap-2 text-white font-bold pt-1">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <a href={`tel:${business.phone}`} className="hover:underline">{formatPhoneNumber(business.phone)}</a>
            </div>
            {business.email && (
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5" />
                <a href={`mailto:${business.email}`} className="hover:underline truncate">{business.email}</a>
              </div>
            )}
          </div>
        </div>

        {/* Col 4: Quick Action & Coverage */}
        <div className="space-y-3">
          <div className="font-bold text-white text-sm">Need Service?</div>
          <p className="text-slate-400 text-xs">
            Prompt scheduling and upfront estimates for clients across {business.city}.
          </p>
          <button
            onClick={() => onOpenLeadModal?.()}
            style={{ backgroundColor: theme.primaryColor }}
            className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
          >
            <span>{business.industry === 'restaurant' ? 'Reserve a Table' : 'Request Estimate'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          {business.serviceAreas && business.serviceAreas.length > 0 && (
            <div className="pt-2 text-[11px] text-slate-500">
              Areas: {business.serviceAreas.slice(0, 4).join(', ')}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
