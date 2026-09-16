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
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  Clock,
  Award,
  HeartHandshake,
  Star,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function DedicatedAboutPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [business, setBusiness] = useState<NormalizedBusiness | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [website, setWebsite] = useState<StructuredWebsite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDomainOpen, setIsDomainOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

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
        setError(err.message || 'Error loading about page');
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
        <p className="text-slate-600 text-sm font-semibold">Loading About page...</p>
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

  // Retrieve about section content if customized in editor
  const aboutSec = website.pages[0]?.sections.find((s) => s.type === 'about');
  const customStory = aboutSec?.content?.story;
  const customHeading = aboutSec?.content?.heading;
  const customPillars = aboutSec?.content?.pillars;

  const defaultPillars = [
    {
      title: 'Local Craftsmanship & Accountability',
      desc: `We live and work in the ${business.city} area. Every customer is a neighbor, which is why we take immense personal pride in the longevity and quality of our work.`,
    },
    {
      title: 'Honest, Upfront Pricing',
      desc: 'No hidden charges, surprising add-ons, or sales pressure. We provide clear, itemized estimates so you can make informed decisions with complete peace of mind.',
    },
    {
      title: 'Punctual & Respectful Service',
      desc: 'We arrive on time, keep a tidy workspace throughout the project, and leave your property cleaner than we found it.',
    },
    {
      title: 'Satisfaction Guaranteed',
      desc: 'If anything does not meet your expectations, we will return promptly to make it right. Our 5-star reputation is built on standing behind our commitments.',
    },
  ];

  const pillars = customPillars && customPillars.length > 0 ? customPillars : defaultPillars;

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
      <div className="bg-slate-950 text-white py-16 px-4 sm:px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${business.photos.about || business.photos.hero})` }}
        />
        <div className="max-w-5xl mx-auto relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
            <Link href={`/preview/${slug}`} className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-white font-bold">About Us</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Dedicated Local Care Since Day One</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {customHeading || `About ${business.name}`}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            {business.tagline || `Providing trustworthy, high-caliber service to residents and businesses in ${business.city}, ${business.state}.`}
          </p>
        </div>
      </div>

      {/* 4. Story & Mission Section */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span
                style={{ color: website.theme.primaryColor }}
                className="text-xs font-bold uppercase tracking-widest block"
              >
                Our Background & Story
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Built on Trust, Precision, and Community Reputation
              </h2>
            </div>

            <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
              <p>
                {customStory || business.description}
              </p>
              <p>
                Whether assisting homeowners with urgent repair needs, scheduling recurring weekly maintenance, or delivering a memorable hospitality experience, our philosophy remains the same: treat every client with respect, give 100% effort to the small details, and never take shortcuts.
              </p>
              <p>
                We have cultivated long-term relationships with property owners throughout {business.city}, earning our status as one of the community's top-rated providers with {business.rating} stars across {business.reviewCount} local reviews.
              </p>
            </div>

            {/* Credibility Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950">
                  {business.rating} ★
                </div>
                <div className="text-xs text-slate-500 font-medium">Customer Rating</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950">
                  {business.reviewCount}+
                </div>
                <div className="text-xs text-slate-500 font-medium">Verified Reviews</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950">
                  100%
                </div>
                <div className="text-xs text-slate-500 font-medium">Upfront Quotes</div>
              </div>
            </div>
          </div>

          {/* Image & Trust Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3 sm:aspect-square bg-slate-100 border border-slate-200">
              <img
                src={business.photos.about || business.photos.hero}
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Licensed & Verified Local Pro</span>
                </span>
                <div className="font-extrabold text-lg">{business.name}</div>
                <div className="text-xs text-slate-300">{business.city}, {business.state}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Values & Principles */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span
              style={{ color: website.theme.primaryColor }}
              className="text-xs font-bold uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs"
            >
              The {business.name} Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Our 4 Pillars of Excellence
            </h2>
            <p className="text-slate-600 text-sm">
              The non-negotiable promises that guide every quote, project, and customer interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((item: any, idx: number) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{ backgroundColor: website.theme.primaryColor }}
                    className="w-9 h-9 rounded-xl text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs"
                  >
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-12">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Service Areas */}
      {business.serviceAreas && business.serviceAreas.length > 0 && (
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Serving Greater {business.city} Neighborhoods</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Convenient Service Right in Your Area
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
            {business.serviceAreas.map((area) => (
              <span
                key={area}
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              >
                {area}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 7. Bottom Conversion CTA */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-black">
            Ready to experience the {business.name} difference?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Get in touch with our team today for friendly service, reliable scheduling, and an upfront estimate.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsLeadModalOpen(true)}
              style={{ backgroundColor: website.theme.primaryColor }}
              className="px-6 py-3 rounded-xl text-white font-black text-xs transition-transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <span>Request a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${business.phone}`}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              Call {formatPhoneNumber(business.phone)}
            </a>
          </div>
        </div>
      </section>

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
