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
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function DedicatedContactPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [business, setBusiness] = useState<NormalizedBusiness | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [website, setWebsite] = useState<StructuredWebsite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    urgency: 'Standard (This Week)',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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
        setError(err.message || 'Error loading contact page');
      } finally {
        setLoading(false);
      }
    }
    if (slug) loadData();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setFormError('Please provide your name and phone number so we can reach you.');
      return;
    }

    setFormSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: business?.id,
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          serviceRequested: formData.service || 'General Inquiry',
          answers: {
            Urgency: formData.urgency,
            Notes: formData.message,
          },
        }),
      });

      if (!res.ok) throw new Error('Failed to submit message');
      setFormSuccess(true);
    } catch (err: any) {
      setFormError(err.message || 'Something went wrong. Please try calling directly.');
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4" />
        <p className="text-slate-600 text-sm font-semibold">Loading contact information...</p>
      </div>
    );
  }

  if (error || !business || !website) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Contact Page Not Available</h1>
        <p className="text-slate-600 text-sm mb-6">Could not load details for {slug}.</p>
        <Link
          href={`/preview/${slug}`}
          className="px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold"
        >
          Return to Website
        </Link>
      </div>
    );
  }

  const mapsUrl =
    business.googleMapsUrl ||
    `https://maps.google.com/?q=${encodeURIComponent(`${business.address} ${business.city} ${business.state} ${business.zip}`)}`;

  const servicesList = business.industry === 'restaurant'
    ? (business.menu?.map(m => m.name) || ['Table Reservation', 'Catering Request', 'Private Dining'])
    : (business.services?.map(s => s.name) || ['General Repair', 'Scheduled Maintenance', 'Urgent Inspection']);

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
            <span className="text-white font-bold">Contact & Booking</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fast Turnaround & Same-Day Inquiries</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Contact {business.name}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Have questions about an upcoming project or want an upfront quote? Reach our team directly by phone, email, or by submitting the contact form below.
          </p>
        </div>
      </div>

      {/* 4. Main Two-Column Contact Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Contact Cards & Operating Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center gap-4">
              <div
                style={{ backgroundColor: website.theme.primaryColor }}
                className="w-12 h-12 rounded-2xl text-white flex items-center justify-center font-bold shrink-0 shadow-xs"
              >
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                  Direct Telephone
                </span>
                <a
                  href={`tel:${business.phone}`}
                  className="text-lg font-black text-slate-950 hover:underline block"
                >
                  {formatPhoneNumber(business.phone)}
                </a>
                <span className="text-[11px] text-slate-500 block">Mon-Sat responsive call answering</span>
              </div>
            </div>

            {/* Email Card */}
            {business.email && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                    Email Correspondence
                  </span>
                  <a
                    href={`mailto:${business.email}`}
                    className="text-sm font-bold text-slate-950 hover:underline block truncate max-w-xs"
                  >
                    {business.email}
                  </a>
                  <span className="text-[11px] text-slate-500 block">Typical response within 2-4 hours</span>
                </div>
              </div>
            )}

            {/* Location & Directions Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                    Location & Base of Operations
                  </span>
                  <div className="text-sm font-black text-slate-950">
                    {business.address}, {business.city}, {business.state} {business.zip}
                  </div>
                </div>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-1"
              >
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-black text-slate-950">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Weekly Operating Schedule</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                  Open This Week
                </span>
              </div>

              <div className="space-y-2 text-xs divide-y divide-slate-100">
                {Object.entries(business.hours || {}).map(([day, hrs]) => (
                  <div key={day} className="flex items-center justify-between pt-2">
                    <span className="text-slate-600 font-medium">{day}</span>
                    <span className="font-bold text-slate-950">{hrs}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Areas */}
            {business.serviceAreas && business.serviceAreas.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Service Area Coverage in {business.city}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {business.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Interactive Lead & Quote Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
              <div>
                <span
                  style={{ color: website.theme.primaryColor }}
                  className="text-xs font-bold uppercase tracking-widest block mb-1"
                >
                  Direct Inquiry Form
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                  Send a Message or Request a Quote
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  Fill out the details below and a team member from {business.name} will reach back out promptly.
                </p>
              </div>

              {formSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-emerald-950">Message Sent Successfully!</h3>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Thank you! Your inquiry has been received by {business.name}. We will review your project details and contact you at {formData.phone || 'your phone number'} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSuccess(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        service: '',
                        message: '',
                        urgency: 'Standard (This Week)',
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Miller"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. (512) 555-0199"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. john@example.com"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                      >
                        <option value="">Select a service category...</option>
                        {servicesList.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Timeline / Desired Timing
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                    >
                      <option value="Urgent / Emergency (ASAP)">Urgent / Emergency (ASAP)</option>
                      <option value="Standard (This Week)">Standard (This Week)</option>
                      <option value="Flexible (Next 2-3 Weeks)">Flexible (Next 2-3 Weeks)</option>
                      <option value="Planning / Looking for Quote">Planning / Looking for Quote</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Project Notes or Questions
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe what you need done, property location, or any specific details..."
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    style={{ backgroundColor: website.theme.primaryColor }}
                    className="w-full py-3.5 rounded-xl text-white font-black text-xs shadow-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                  >
                    {formSubmitting ? (
                      <span>Submitting Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry & Request Quote</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Your contact info is never shared or sold. 100% privacy protected.</span>
                  </div>
                </form>
              )}
            </div>
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
