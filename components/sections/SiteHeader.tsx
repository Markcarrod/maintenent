'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NormalizedBusiness, ThemeConfig, NavigationItem } from '@/lib/types';
import { Phone, Menu as MenuIcon, X, ArrowRight } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

interface SiteHeaderProps {
  business: NormalizedBusiness;
  theme: ThemeConfig;
  navigation: NavigationItem[];
  currentSlug: string;
  onOpenLeadModal?: () => void;
}

export default function SiteHeader({ business, theme, navigation, currentSlug, onOpenLeadModal }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isSerif = theme.fontFamily === 'serif';

  const getNavHref = (pageSlug: string) => {
    if (pageSlug === 'home') return `/preview/${business.slug}`;
    if (pageSlug === 'about') return `/preview/${business.slug}/about`;
    if (pageSlug === 'services') return `/preview/${business.slug}/services`;
    if (pageSlug === 'menu') return `/preview/${business.slug}/menu`;
    if (pageSlug === 'reservations') return `/preview/${business.slug}/reservations`;
    if (pageSlug === 'contact') return `/preview/${business.slug}/contact`;
    if (pageSlug === 'blog') return `/preview/${business.slug}/blog`;
    if (pageSlug === 'reviews') return `/preview/${business.slug}/reviews`;
    return `/preview/${business.slug}#${pageSlug}`;
  };

  const isLinkActive = (pageSlug: string) => {
    if (!pathname) return false;
    const targetHref = getNavHref(pageSlug);
    if (pageSlug === 'home') {
      return pathname === `/preview/${business.slug}` || pathname === `/preview/${business.slug}/`;
    }
    return pathname.startsWith(targetHref);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={`/preview/${business.slug}`} className="flex items-center gap-3">
          {theme.logoType === 'image' && theme.logoUrl ? (
            <img src={theme.logoUrl} alt={business.name} className="h-10 w-auto object-contain" />
          ) : (
            <div className="space-y-0.5">
              <span className={`block font-black text-xl tracking-tight text-slate-950 leading-none ${isSerif ? 'font-serif' : 'font-sans'}`}>
                {theme.textLogo.line1 || business.name}
              </span>
              {theme.textLogo.line2 && (
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block">
                  {theme.textLogo.line2}
                </span>
              )}
            </div>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
          {navigation.filter(n => n.visible).map(nav => {
            const href = getNavHref(nav.pageSlug);
            const active = isLinkActive(nav.pageSlug);

            return (
              <Link
                key={nav.id}
                href={href}
                style={active ? { color: theme.primaryColor } : {}}
                className={`transition-colors py-1 relative font-medium ${
                  active ? 'font-bold' : 'hover:text-slate-950'
                }`}
              >
                {nav.label}
                {active && (
                  <span
                    style={{ backgroundColor: theme.primaryColor }}
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${business.phone}`}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-950"
          >
            <Phone className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
            <span>{formatPhoneNumber(business.phone)}</span>
          </a>

          <button
            onClick={onOpenLeadModal}
            style={{ backgroundColor: theme.primaryColor }}
            className={`px-4 py-2 text-white text-xs font-bold shadow-xs hover:brightness-110 transition-all flex items-center gap-1.5 ${
              theme.buttonStyle === 'pill' ? 'rounded-full' : theme.buttonStyle === 'square' ? 'rounded-none' : 'rounded-lg'
            }`}
          >
            <span>{business.industry === 'restaurant' ? 'Reserve Table' : 'Request Quote'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
          <nav className="flex flex-col gap-2">
            {navigation.filter(n => n.visible).map(nav => {
              const href = getNavHref(nav.pageSlug);
              const active = isLinkActive(nav.pageSlug);
              return (
                <Link
                  key={nav.id}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={active ? { color: theme.primaryColor } : {}}
                  className={`px-3 py-2.5 rounded-xl text-sm transition-colors ${
                    active ? 'font-black bg-slate-100' : 'font-semibold text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {nav.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${business.phone}`}
              className="p-3 bg-slate-100 rounded-xl text-xs font-bold text-center text-slate-900"
            >
              Call {formatPhoneNumber(business.phone)}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal?.();
              }}
              style={{ backgroundColor: theme.primaryColor }}
              className="p-3 rounded-xl text-xs font-bold text-center text-white"
            >
              {business.industry === 'restaurant' ? 'Reserve a Table' : 'Get Free Quote'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
