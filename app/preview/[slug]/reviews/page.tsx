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
  Star,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  Phone,
  ThumbsUp,
  Quote,
} from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function DedicatedReviewsPage() {
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
        setError(err.message || 'Error loading reviews page');
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
        <p className="text-slate-600 text-sm font-semibold">Loading reviews...</p>
      </div>
    );
  }

  if (error || !business || !website) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Reviews Not Available</h1>
        <p className="text-slate-600 text-sm mb-6">Could not load reviews for {slug}.</p>
        <Link
          href={`/preview/${slug}`}
          className="px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold"
        >
          Return to Website
        </Link>
      </div>
    );
  }

  const reviews = business.reviews && business.reviews.length > 0
    ? business.reviews
    : [
        {
          id: 'def-rev-1',
          author: 'Robert M.',
          rating: 5,
          date: '1 week ago',
          comment: `Exceptional service from start to finish. ${business.name} was communicative, punctual, and completed the job with great precision.`,
          serviceOrDish: 'Verified Service',
          verified: true,
        },
        {
          id: 'def-rev-2',
          author: 'Jennifer S.',
          rating: 5,
          date: '3 weeks ago',
          comment: 'Very fair pricing and honest assessment. It is so refreshing to find reliable local pros who do what they promise.',
          serviceOrDish: 'Local Project',
          verified: true,
        },
        {
          id: 'def-rev-3',
          author: 'Michael B.',
          rating: 5,
          date: 'Last month',
          comment: `Highly recommend ${business.name} to anyone in ${business.city}. They will be our first call for future projects!`,
          serviceOrDish: 'Top Recommendation',
          verified: true,
        },
      ];

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

      {/* 3. Hero Header */}
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
            <span className="text-white font-bold">Customer Reviews</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400" />
              ))}
            </div>
            <span>{business.rating} Rating • {business.reviewCount} Verified Experiences</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            What Neighbors Say About {business.name}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Real feedback from local homeowners and clients across {business.city}, {business.state}.
          </p>
        </div>
      </div>

      {/* 4. Scorecard Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-7 relative z-20 w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl sm:text-5xl font-black text-slate-950">
              {business.rating}
            </div>
            <div className="space-y-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Overall score across {business.reviewCount} verified local reviews
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
            >
              Leave Client Feedback
            </button>
            <button
              onClick={() => setIsLeadModalOpen(true)}
              style={{ backgroundColor: website.theme.primaryColor }}
              className="px-5 py-2.5 rounded-xl text-white text-xs font-black shadow-md hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <span>Book With Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Reviews Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev: any) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">
                    {rev.date || 'Verified Review'}
                  </span>
                </div>

                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-slate-950 text-sm">{rev.author}</div>
                  <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Client</span>
                  </div>
                </div>

                {rev.serviceOrDish && (
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {rev.serviceOrDish}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Confidence Guarantee Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Satisfaction Guarantee</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Work with confidence. Your satisfaction is our benchmark.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We stand firmly behind our work. If any detail falls short of your expectations, we will return promptly to rectify it.
            </p>
          </div>

          <button
            onClick={() => setIsLeadModalOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs transition-colors shrink-0 shadow-lg"
          >
            Schedule a Consultation
          </button>
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
      />

      {/* Mobile Sticky Bottom Bar */}
      <MobileStickyBar
        business={business}
        theme={website.theme}
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
      />
    </div>
  );
}
