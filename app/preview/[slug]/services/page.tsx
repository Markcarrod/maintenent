'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { NormalizedBusiness, PreviewData, StructuredWebsite } from '@/lib/types';
import PreviewBar from '@/components/PreviewBar';
import SiteHeader from '@/components/sections/SiteHeader';
import FeedbackModal from '@/components/FeedbackModal';
import CheckoutModal from '@/components/CheckoutModal';
import CustomDomainModal from '@/components/CustomDomainModal';
import LeadQualificationModal from '@/components/LeadQualificationModal';
import MobileStickyBar from '@/components/MobileStickyBar';
import {
  Wrench,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Phone,
  Clock,
  Shield,
  Search,
  Tag,
  UtensilsCrossed,
} from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function DedicatedServicesPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [business, setBusiness] = useState<NormalizedBusiness | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [website, setWebsite] = useState<StructuredWebsite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDomainOpen, setIsDomainOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();

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
      } catch (err: any) {
        setError(err.message || 'Error loading services page');
      } finally {
        setLoading(false);
      }
    }
    if (slug) loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4" />
        <p className="text-slate-600 text-sm font-semibold">Loading catalog...</p>
      </div>
    );
  }

  if (error || !business || !website) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Services Not Available</h1>
        <p className="text-slate-600 text-sm mb-6">Could not load services for {slug}.</p>
        <Link
          href={`/preview/${slug}`}
          className="px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold"
        >
          Return to Website
        </Link>
      </div>
    );
  }

  const isRestaurant = business.industry === 'restaurant';

  // Handyman/Cleaning services or Restaurant menu items
  const rawItems = isRestaurant
    ? business.menu || []
    : business.services && business.services.length > 0
    ? business.services
    : [
        {
          id: 'def-1',
          name: 'Core General Maintenance',
          description: 'Comprehensive diagnostic, repairs, and scheduled upkeep handled with precision tools.',
          badge: 'Popular',
        },
        {
          id: 'def-2',
          name: 'Precision Installations & Upgrades',
          description: 'Seamless fixture replacements, fitting, and safety testing for residential and commercial spaces.',
          badge: 'Top Rated',
        },
        {
          id: 'def-3',
          name: 'Emergency & Urgent Assistance',
          description: 'Prompt turnaround for unexpected issues with upfront estimates and zero surprise fees.',
        },
      ];

  const categories = isRestaurant
    ? ['all', ...Array.from(new Set(rawItems.map((m: any) => m.category).filter(Boolean)))]
    : ['all'];

  const filteredItems = rawItems.filter((item: any) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenLead = (serviceName?: string) => {
    setSelectedService(serviceName);
    setIsLeadModalOpen(true);
  };

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
        onOpenLeadModal={() => handleOpenLead()}
      />

      {/* 3. Hero Header Banner */}
      <div className="bg-slate-950 text-white py-16 px-4 sm:px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${business.photos.hero})` }}
        />
        <div className="max-w-5xl mx-auto relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
            <Link href={`/preview/${slug}`} className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-white font-bold">
              {isRestaurant ? 'Menu & Specialties' : 'Services & Offerings'}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            {isRestaurant ? (
              <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Wrench className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span>Transparent Scope & Upfront Pricing</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {isRestaurant ? 'Handcrafted Daily Menu' : 'Our Professional Services'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            {isRestaurant
              ? `Explore authentic culinary creations made with seasonal ingredients in ${business.city}, ${business.state}.`
              : `High standard workmanship, punctual turnaround, and guaranteed satisfaction for ${business.city} homeowners.`}
          </p>
        </div>
      </div>

      {/* 4. Controls: Category Pills & Search */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-7 relative z-20 w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          {categories.length > 1 ? (
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all capitalize ${
                    selectedCategory === cat
                      ? 'bg-slate-950 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat === 'all' ? 'All Items' : cat}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {filteredItems.length} Services Available
            </div>
          )}

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services or dishes..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
            />
          </div>
        </div>
      </div>

      {/* 5. Main Catalog Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm space-y-3">
            <h3 className="text-lg font-bold text-slate-900">No items match your search</h3>
            <p className="text-xs text-slate-500">Try searching for a different keyword or reset filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-slate-950 text-white text-xs font-bold"
            >
              Reset Search
            </button>
          </div>
        ) : isRestaurant ? (
          /* Restaurant Menu Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item: any) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="flex gap-4">
                  {item.image && (
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-black text-slate-950">{item.name}</h3>
                      <span
                        style={{ color: website.theme.primaryColor }}
                        className="font-black text-base shrink-0"
                      >
                        {item.price}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                    {item.dietary && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.dietary.map((d: string, i: number) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200/60"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {item.category || 'Specialty'}
                  </span>
                  <button
                    onClick={() => handleOpenLead(`Order/Reserve: ${item.name}`)}
                    className="text-xs font-bold text-slate-950 hover:text-amber-600 flex items-center gap-1 transition-colors"
                  >
                    <span>Reserve / Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Handyman / Cleaning Service Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((svc: any) => (
              <div
                key={svc.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Optional Service Image Thumbnail */}
                {svc.image ? (
                  <div className="aspect-16/10 overflow-hidden bg-slate-100 relative">
                    <img
                      src={svc.image}
                      alt={svc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {svc.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                          {svc.badge}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 pb-0 flex items-center justify-between">
                    <div
                      style={{ color: website.theme.primaryColor }}
                      className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center font-bold"
                    >
                      <Wrench className="w-6 h-6" />
                    </div>
                    {svc.badge && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                        {svc.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-slate-950 group-hover:text-emerald-700 transition-colors">
                      {svc.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{svc.description}</p>
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Upfront, fixed quote before work begins</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Flexible scheduling in {business.city}</span>
                    </div>

                    <button
                      onClick={() => handleOpenLead(svc.name)}
                      style={{ backgroundColor: website.theme.primaryColor }}
                      className="w-full mt-2 py-2.5 px-4 rounded-xl text-white text-xs font-bold shadow-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <span>Request Quote for This</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Scope / Large Project Consultation Box */}
        <div className="mt-14 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Custom Project Requests
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              Don't see exactly what you're looking for?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              We frequently handle custom requests, multi-room renovations, commercial contracts, and special bookings. Speak directly with {business.name} to discuss your exact requirements.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => handleOpenLead('Custom Project')}
              className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black text-xs transition-colors shadow-md"
            >
              Inquire Custom Scope
            </button>
            <a
              href={`tel:${business.phone}`}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors text-center"
            >
              Call {formatPhoneNumber(business.phone)}
            </a>
          </div>
        </div>
      </main>

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
        defaultService={selectedService}
      />

      {/* Mobile Sticky Bottom Bar */}
      <MobileStickyBar
        business={business}
        theme={website.theme}
        onOpenLeadModal={() => handleOpenLead()}
      />
    </div>
  );
}
