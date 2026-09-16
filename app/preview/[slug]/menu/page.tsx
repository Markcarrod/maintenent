'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  NormalizedBusiness,
  PreviewData,
  StructuredWebsite,
  MenuCategory,
  MenuItemStructured,
} from '@/lib/types';
import PreviewBar from '@/components/PreviewBar';
import SiteHeader from '@/components/sections/SiteHeader';
import FeedbackModal from '@/components/FeedbackModal';
import CheckoutModal from '@/components/CheckoutModal';
import CustomDomainModal from '@/components/CustomDomainModal';
import LeadQualificationModal from '@/components/LeadQualificationModal';
import MobileStickyBar from '@/components/MobileStickyBar';
import { Search, ShoppingBag, ExternalLink, ChevronRight, Clock } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 2,
  }).format(price);
}

const TAG_CONFIG: Record<string, { bg: string; text: string; label: string; icon?: string }> = {
  vegan:            { bg: 'bg-green-100',   text: 'text-green-800',   label: 'Vegan' },
  vegetarian:       { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Vegetarian' },
  'gluten-free':    { bg: 'bg-yellow-100',  text: 'text-yellow-800',  label: 'Gluten-Free' },
  popular:          { bg: 'bg-orange-100',  text: 'text-orange-800',  label: 'Popular' },
  spicy:            { bg: 'bg-red-100',     text: 'text-red-800',     label: '🌶 Spicy' },
  'chef-signature': { bg: 'bg-purple-100',  text: 'text-purple-800',  label: '⭐ Chef\'s Special' },
  'non-alcoholic':  { bg: 'bg-blue-100',    text: 'text-blue-800',    label: 'Non-Alcoholic' },
};

// ─── MenuItemCard ────────────────────────────────────────────────────────────

function MenuItemCard({
  item,
  currency,
}: {
  item: MenuItemStructured;
  currency: string;
}) {
  const isPopular = item.tags?.includes('popular');
  const isChef = item.tags?.includes('chef-signature');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-shadow">
      {/* Image */}
      {item.image && (
        <div className="relative sm:w-36 sm:shrink-0 h-44 sm:h-auto">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          {(isPopular || isChef) && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {isPopular && (
                <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-wide shadow">
                  Popular
                </span>
              )}
              {isChef && (
                <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-black uppercase tracking-wide shadow">
                  ⭐ Chef's Pick
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Name + Price */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-black text-slate-900 leading-tight">{item.name}</h3>
            {!item.image && (isPopular || isChef) && (
              <>
                {isPopular && (
                  <span className="px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold">
                    Popular
                  </span>
                )}
                {isChef && (
                  <span className="px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                    ⭐ Chef's Pick
                  </span>
                )}
              </>
            )}
          </div>
          <span className="text-sm font-black text-slate-900 shrink-0">
            {formatPrice(item.price, currency)}
          </span>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{item.description}</p>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
            {item.tags.map((tag) => {
              const cfg = TAG_CONFIG[tag];
              if (!cfg) return null;
              return (
                <span
                  key={tag}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${cfg.bg} ${cfg.text}`}
                >
                  {cfg.label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function RestaurantMenuPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [business, setBusiness] = useState<NormalizedBusiness | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [website, setWebsite] = useState<StructuredWebsite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('');

  // Modals
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDomainOpen, setIsDomainOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/preview/${slug}`);
        if (!res.ok) throw new Error('Business preview not found');
        const data = await res.json();
        setBusiness(data.business);
        setPreview(data.preview);
        setWebsite(data.website);
        if (data.business?.menuCategories?.length > 0) {
          setActiveCategory(data.business.menuCategories[0].id);
        }
      } catch (err: any) {
        setError(err.message || 'Error loading menu page');
      } finally {
        setLoading(false);
      }
    }
    if (slug) loadData();
  }, [slug]);

  // Observe which category is in view for active tab highlighting
  useEffect(() => {
    if (!business?.menuCategories) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id.replace('cat-', ''));
          }
        });
      },
      { rootMargin: '-160px 0px -60% 0px', threshold: 0 }
    );
    business.menuCategories.forEach((cat) => {
      const el = document.getElementById(`cat-${cat.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [business]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4" />
        <p className="text-slate-600 text-sm font-semibold">Loading Menu...</p>
      </div>
    );
  }

  if (error || !business || !website) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Page Not Available</h1>
        <p className="text-slate-600 text-sm mb-6">Could not load information for {slug}.</p>
        <Link
          href={`/preview/${slug}`}
          className="px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold"
        >
          Return to Website
        </Link>
      </div>
    );
  }

  const currency = business.currency || 'USD';
  const categories: MenuCategory[] = business.menuCategories || [];
  const hasMenu = categories.length > 0;

  // Filter items by search query
  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => {
        if (!searchQuery) return item.available !== false;
        const q = searchQuery.toLowerCase();
        return (
          item.available !== false &&
          (item.name.toLowerCase().includes(q) ||
            item.description?.toLowerCase().includes(q) ||
            item.tags?.some((t) => t.toLowerCase().includes(q)))
        );
      }),
    }))
    .filter((cat) => cat.items.length > 0);

  const scrollToCategory = (catId: string) => {
    const el = document.getElementById(`cat-${catId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveCategory(catId);
  };

  const primaryColor = website.theme.primaryColor || '#111827';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* 1. Preview Top Bar */}
      {preview && (
        <PreviewBar
          business={business}
          preview={preview}
          onKeepWebsite={() => setIsCheckoutOpen(true)}
          onOpenFeedback={() => setIsFeedbackOpen(true)}
        />
      )}

      {/* 2. Site Header */}
      <SiteHeader
        business={business}
        theme={website.theme}
        navigation={website.navigation}
        currentSlug={business.slug}
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
      />

      {/* 3. Hero Banner */}
      <div
        className="relative py-14 px-4 sm:px-6 overflow-hidden text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${business.photos.hero})` }}
        />
        <div className="max-w-5xl mx-auto relative z-10 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/60 font-semibold">
            <Link href={`/preview/${slug}`} className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-white font-bold">Menu</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {business.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
            {business.cuisine && (
              <span className="font-semibold">{business.cuisine}</span>
            )}
            {business.cuisine && business.city && (
              <span className="text-white/40">·</span>
            )}
            {business.city && (
              <span>{business.city}, {business.state}</span>
            )}
          </div>

          {business.orderUrl && (
            <a
              href={business.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-black shadow-lg hover:scale-105 transition-transform mt-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Order Online
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          )}
        </div>
      </div>

      {hasMenu ? (
        <>
          {/* 4. Sticky Category Tabs + Search */}
          <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
            {/* Search bar */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-3 pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search menu items…"
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>
            </div>

            {/* Category tabs */}
            <div
              ref={tabsRef}
              className="flex gap-1 overflow-x-auto scrollbar-none px-4 sm:px-6 pb-2 max-w-5xl mx-auto"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  style={
                    activeCategory === cat.id
                      ? { backgroundColor: primaryColor }
                      : {}
                  }
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Menu Sections */}
          <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-12 flex-1">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-semibold text-sm">No items match &quot;{searchQuery}&quot;</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-xs underline text-slate-400 hover:text-slate-700"
                >
                  Clear search
                </button>
              </div>
            ) : (
              filteredCategories.map((cat) => (
                <section
                  key={cat.id}
                  id={`cat-${cat.id}`}
                  className="scroll-mt-40 space-y-4"
                >
                  {/* Category Header */}
                  <div className="space-y-1 border-b border-slate-200 pb-3">
                    <h2 className="text-xl font-black text-slate-900">{cat.name}</h2>
                    {cat.description && (
                      <p className="text-xs text-slate-500">{cat.description}</p>
                    )}
                  </div>

                  {/* Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cat.items.map((item) => (
                      <MenuItemCard key={item.id} item={item} currency={currency} />
                    ))}
                  </div>
                </section>
              ))
            )}
          </main>

          {/* 6. Footer: Hours + Links */}
          <section className="bg-slate-950 text-white py-12 px-4 sm:px-6 mt-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Hours */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Opening Hours
                  </span>
                </div>
                <div className="space-y-1.5">
                  {Object.entries(business.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-xs">
                      <span className="text-slate-400 capitalize w-24">{day}</span>
                      <span className="text-white font-semibold">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col gap-3 sm:items-end justify-center">
                <Link
                  href={`/preview/${slug}/reservations`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-black hover:scale-105 transition-transform"
                >
                  Reserve a Table
                  <ChevronRight className="w-4 h-4" />
                </Link>
                {business.orderUrl && (
                  <a
                    href={business.orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Order Online
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                )}
                <a
                  href={`tel:${business.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                >
                  Call {formatPhoneNumber(business.phone)}
                </a>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* No Menu State */
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 gap-5">
          <ShoppingBag className="w-14 h-14 text-slate-300" />
          <h2 className="text-2xl font-black text-slate-900">Menu Coming Soon</h2>
          <p className="text-slate-500 text-sm max-w-sm">
            We are still building our digital menu. In the meantime, please call us for today&apos;s
            specials and availability.
          </p>
          <a
            href={`tel:${business.phone}`}
            style={{ backgroundColor: primaryColor }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-xs font-black shadow-lg hover:scale-105 transition-transform"
          >
            Call {formatPhoneNumber(business.phone)}
          </a>
        </div>
      )}

      {/* Modals */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        businessId={business.id}
        businessName={business.name}
        onSuccess={() => {
          setIsCheckoutOpen(false);
          setIsDomainOpen(true);
        }}
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        businessId={business.id}
        businessName={business.name}
      />

      <CustomDomainModal
        isOpen={isDomainOpen}
        onClose={() => setIsDomainOpen(false)}
        businessId={business.id}
        businessName={business.name}
        defaultSubdomain={`${business.slug}.previewplatform.com`}
      />

      <LeadQualificationModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        businessId={business.id}
        businessName={business.name}
        industry={business.industry}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar
        business={business}
        theme={website.theme}
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
      />
    </div>
  );
}