import React from 'react';
import { SectionComponentProps } from '../types';
import { Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function ContactB({ section, business, theme, onOpenLeadModal }: SectionComponentProps) {
  return (
    <footer id="contact" className="bg-zinc-950 text-zinc-400 py-14 px-6 text-xs border-t border-zinc-800 scroll-mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="space-y-1.5">
          <div className="font-extrabold text-white text-lg">{business.name}</div>
          <div>{business.address}, {business.city}, {business.state} {business.zip}</div>
          <div className="text-zinc-500 text-[11px] pt-1">
            © {new Date().getFullYear()} {business.name}. Proudly serving {business.city} and surrounding areas.
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`tel:${business.phone}`}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs flex items-center gap-2 border border-zinc-700 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            <span>{formatPhoneNumber(business.phone)}</span>
          </a>

          <button
            onClick={() => onOpenLeadModal?.()}
            style={{ backgroundColor: theme.primaryColor }}
            className="px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-md hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <span>{business.industry === 'restaurant' ? 'Book Table' : 'Get Free Quote'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
