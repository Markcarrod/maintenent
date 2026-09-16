'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NormalizedBusiness, PreviewData, GeneratedContent, PlanType, StructuredWebsite } from '@/lib/types';
import { renderTemplate } from '@/templates';
import PreviewBar from '@/components/PreviewBar';
import FeedbackModal from '@/components/FeedbackModal';
import CheckoutModal from '@/components/CheckoutModal';
import CustomDomainModal from '@/components/CustomDomainModal';
import LeadQualificationModal from '@/components/LeadQualificationModal';
import SectionRenderer from '@/components/sections/SectionRenderer';
import SiteHeader from '@/components/sections/SiteHeader';
import MobileStickyBar from '@/components/MobileStickyBar';
import { ShieldCheck, AlertCircle, ArrowRight, RefreshCw, Lock } from 'lucide-react';

export default function PreviewPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [business, setBusiness] = useState<NormalizedBusiness | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [website, setWebsite] = useState<StructuredWebsite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDomainOpen, setIsDomainOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedServiceForLead, setSelectedServiceForLead] = useState<string | undefined>();

  const loadPreview = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/preview/${slug}`);
      if (!res.ok) {
        throw new Error('Business not found or error loading preview');
      }
      const data = await res.json();
      setBusiness(data.business);
      setPreview(data.preview);
      setContent(data.content);
      setWebsite(data.website || null);
    } catch (err: any) {
      setError(err.message || 'Error loading preview');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      loadPreview();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4" />
        <p className="text-slate-600 text-sm font-semibold">Generating customized website preview...</p>
      </div>
    );
  }

  if (error || !business || !preview || !content) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-950 mb-2">Preview Not Available</h1>
        <p className="text-slate-600 text-sm max-w-md mb-6">
          We couldn't locate a website for <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">{slug}</code>.
        </p>
        <a
          href="/admin"
          className="px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold"
        >
          Return to Admin Dashboard
        </a>
      </div>
    );
  }

  // Check if expired
  const isExpired = preview.status === 'EXPIRED';

  if (isExpired) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-950">This Website Preview Has Expired</h1>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              The 7-day preview period for <strong>{business.name}</strong> has completed. All design assets, services, and content have been preserved safely.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Keep My Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Request Changes / Ask Question
            </button>
          </div>

          <div className="text-[11px] text-slate-400">
            Website data is retained and can be reactivated anytime.
          </div>
        </div>

        {/* Keep modals accessible on expired page so owner can activate */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          businessId={business.id}
          businessName={business.name}
          onSuccess={(plan: PlanType) => {
            setIsCheckoutOpen(false);
            loadPreview();
            setIsDomainOpen(true);
          }}
        />

        <FeedbackModal
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
          businessId={business.id}
          businessName={business.name}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Preview Top Bar with 7-day countdown */}
      <PreviewBar
        business={business}
        preview={preview}
        onKeepWebsite={() => setIsCheckoutOpen(true)}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
      />

      {/* 2. Structured Component-Based Website or Legacy Template */}
      {website && website.pages && website.pages[0]?.sections ? (
        <>
          <SiteHeader
            business={business}
            theme={website.theme}
            navigation={website.navigation}
            currentSlug={business.slug}
            onOpenLeadModal={() => setIsLeadModalOpen(true)}
          />
          <main className="flex-1">
            {website.pages[0].sections
              .filter((sec) => sec.visible)
              .map((sec) => (
                <SectionRenderer
                  key={sec.id}
                  section={sec}
                  business={business}
                  theme={website.theme}
                  onOpenLeadModal={(svc) => {
                    setSelectedServiceForLead(svc);
                    setIsLeadModalOpen(true);
                  }}
                  onOpenFeedbackModal={() => setIsFeedbackOpen(true)}
                />
              ))}
          </main>
        </>
      ) : (
        <main className="flex-1">
          {renderTemplate(business.templateId, {
            business,
            content,
            onOpenLeadModal: (svc) => {
              setSelectedServiceForLead(svc);
              setIsLeadModalOpen(true);
            },
            onOpenFeedbackModal: () => setIsFeedbackOpen(true),
          })}
        </main>
      )}

      {/* 3. Feedback Drawer / Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        businessId={business.id}
        businessName={business.name}
      />

      {/* 4. Checkout Modal ($79 vs $149) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        businessId={business.id}
        businessName={business.name}
        onSuccess={(plan) => {
          setIsCheckoutOpen(false);
          loadPreview();
          setIsDomainOpen(true); // Seamlessly offer custom domain setup right after checkout!
        }}
      />

      {/* 5. Custom Domain Wizard */}
      <CustomDomainModal
        isOpen={isDomainOpen}
        onClose={() => {
          setIsDomainOpen(false);
          loadPreview();
        }}
        businessId={business.id}
        businessName={business.name}
        defaultSubdomain={`${business.slug}.previewplatform.com`}
      />

      {/* 6. Lead Qualification Modal (Triggered by website CTAs) */}
      <LeadQualificationModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        businessId={business.id}
        businessName={business.name}
        industry={business.industry}
        defaultService={selectedServiceForLead}
      />

      {/* 7. Mobile Conversion Sticky Bottom Bar */}
      <MobileStickyBar
        business={business}
        theme={website?.theme}
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
      />
    </div>
  );
}
