'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Calendar, ArrowRight, UtensilsCrossed, ExternalLink } from 'lucide-react';
import { NormalizedBusiness, ThemeConfig } from '@/lib/types';
import { formatPhoneNumber } from '@/lib/utils';

interface MobileStickyBarProps {
  business: NormalizedBusiness;
  theme?: ThemeConfig;
  onOpenLeadModal?: () => void;
  // Also accept website for theme, for pages that pass website object
  website?: { theme: ThemeConfig };
}

export default function MobileStickyBar({ business, theme, website, onOpenLeadModal }: MobileStickyBarProps) {
  const isRestaurant = business.industry === 'restaurant';
  const resolvedTheme = theme || website?.theme;
  const primaryColor = resolvedTheme?.primaryColor || '#059669';

  if (isRestaurant) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden shadow-2xl">
        <div className="flex items-center gap-2">
          {/* View Menu */}
          <Link
            href={`/preview/${business.slug}/menu`}
            className="flex-1 py-3 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <UtensilsCrossed className="w-4 h-4 text-orange-400" />
            <span>View Menu</span>
          </Link>

          {/* Reserve or Order */}
          {business.reservationUrl ? (
            <a
              href={business.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: primaryColor }}
              className="flex-1 py-3 px-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve</span>
            </a>
          ) : business.orderUrl ? (
            <a
              href={business.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: primaryColor }}
              className="flex-1 py-3 px-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
            >
              <span>Order Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <Link
              href={`/preview/${business.slug}/reservations`}
              style={{ backgroundColor: primaryColor }}
              className="flex-1 py-3 px-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve</span>
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Non-restaurant: Call + Quote
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden shadow-2xl">
      <div className="flex items-center gap-2">
        {/* Call Button */}
        <a
          href={`tel:${business.phone}`}
          className="flex-1 py-3 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-emerald-400" />
          <span>Call Now</span>
        </a>

        {/* Quote Button */}
        <button
          onClick={onOpenLeadModal}
          style={{ backgroundColor: primaryColor }}
          className="flex-1 py-3 px-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
        >
          <span>Free Estimate</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
