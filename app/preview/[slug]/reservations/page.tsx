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
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

// ─── Time options ─────────────────────────────────────────────────────────────

const TIME_OPTIONS = [
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '1:00 PM',
  '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM',
];

const PARTY_OPTIONS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function todayString(): string {
  return new Date().toISOString().split('T')[0];
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ReservationsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [business, setBusiness] = useState<NormalizedBusiness | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [website, setWebsite] = useState<StructuredWebsite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

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
        setError(err.message || 'Error loading reservations page');
      } finally {
        setLoading(false);
      }
    }
    if (slug) loadData();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(`/api/leads/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit_lead',
          answers: {
            name,
            email,
            phone,
            date,
            time,
            partySize,
            specialRequests,
          },
        }),
      });
      if (!res.ok) throw new Error('Failed to submit reservation request. Please try again.');
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4" />
        <p className="text-slate-600 text-sm font-semibold">Loading Reservations...</p>
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
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/60 font-semibold">
            <Link href={`/preview/${slug}`} className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-white font-bold">Reservations</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>Table Reservations</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Reserve Your Table at {business.name}
          </h1>

          <p className="text-white/70 text-sm sm:text-base max-w-xl leading-relaxed">
            {business.tagline || `Experience exceptional dining at ${business.name} in ${business.city}.`}
          </p>
        </div>
      </div>

      {/* 4. Main Content */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 flex-1 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Booking Section */}
        <div className="lg:col-span-3 space-y-6">
          {business.reservationUrl ? (
            /* ── External Booking Link ── */
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-black text-slate-900">Book Online</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Reserve your table instantly through our online booking system powered by{' '}
                  <span className="font-semibold text-slate-700">
                    {extractDomain(business.reservationUrl)}
                  </span>
                  .
                </p>
              </div>

              <a
                href={business.reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: primaryColor }}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-black text-sm shadow-lg hover:scale-[1.02] transition-transform"
              >
                <Calendar className="w-5 h-5" />
                Book on {extractDomain(business.reservationUrl)}
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>

              {/* Divider */}
              <div className="flex items-center gap-3 text-slate-300">
                <div className="flex-1 border-t border-slate-200" />
                <span className="text-xs font-semibold text-slate-400">or call us directly</span>
                <div className="flex-1 border-t border-slate-200" />
              </div>

              <a
                href={`tel:${business.phone}`}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-black text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call {formatPhoneNumber(business.phone)}
              </a>
            </div>
          ) : submitted ? (
            /* ── Success State ── */
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-10 flex flex-col items-center text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-500" />
              <h2 className="text-xl font-black text-slate-900">Request Received!</h2>
              <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                Thank you, {name}! We have received your reservation request for{' '}
                <span className="font-semibold text-slate-700">{date}</span> at{' '}
                <span className="font-semibold text-slate-700">{time}</span> for{' '}
                <span className="font-semibold text-slate-700">{partySize} guest{partySize === '1' ? '' : 's'}</span>.
                We will confirm by phone or email within 24 hours.
              </p>
              <a
                href={`tel:${business.phone}`}
                className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call {formatPhoneNumber(business.phone)}
              </a>
            </div>
          ) : (
            /* ── Reservation Request Form ── */
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900">Reservation Request</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Fill in the details below and we will confirm your reservation by phone or email
                  within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 000-0000"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="date"
                        required
                        min={todayString()}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 appearance-none"
                      >
                        <option value="">Select a time</option>
                        {TIME_OPTIONS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Party Size */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Party Size <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select
                      required
                      value={partySize}
                      onChange={(e) => setPartySize(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 appearance-none"
                    >
                      <option value="">Select party size</option>
                      {PARTY_OPTIONS.map((n) => (
                        <option key={n} value={n}>{n} {n === '1' ? 'guest' : 'guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Special Requests <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={3}
                    placeholder="Allergies, high chair needed, anniversary celebration…"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 resize-none"
                  />
                </div>

                {/* Disclaimer */}
                <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
                  <span className="font-bold text-slate-500">Reservation Request — </span>
                  We will confirm your reservation by phone or email within 24 hours. This is not
                  an instant confirmation.
                </p>

                {/* Error */}
                {submitError && (
                  <p className="text-xs text-red-600 font-semibold bg-red-50 rounded-xl px-4 py-2.5 border border-red-200">
                    {submitError}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ backgroundColor: primaryColor }}
                  className="w-full py-3.5 rounded-2xl text-white font-black text-sm shadow-lg hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending Request…
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      Send Reservation Request
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right: Info Sidebar */}
        <div className="lg:col-span-2 space-y-5">
          {/* Opening Hours */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Opening Hours
              </span>
            </div>
            <div className="space-y-2">
              {Object.entries(business.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 capitalize font-medium">{day}</span>
                  <span className="text-slate-900 font-semibold">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact + Address */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Contact
              </span>
            </div>

            <div className="space-y-3">
              <a
                href={`tel:${business.phone}`}
                className="flex items-center gap-3 text-sm font-semibold text-slate-900 hover:text-slate-600 transition-colors"
              >
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                {formatPhoneNumber(business.phone)}
              </a>

              {business.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-900 hover:text-slate-600 transition-colors truncate"
                >
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  {business.email}
                </a>
              )}

              {business.address && (
                <div className="flex items-start gap-3 text-sm text-slate-700">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    {business.address},<br />
                    {business.city}, {business.state} {business.zip}
                  </span>
                </div>
              )}

              {business.googleMapsUrl && (
                <a
                  href={business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Get Directions on Google Maps
                </a>
              )}
            </div>
          </div>

          {/* View Menu Link */}
          <Link
            href={`/preview/${slug}/menu`}
            className="flex items-center justify-between px-5 py-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow text-sm font-black text-slate-900"
          >
            <span>View Our Menu</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
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

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar
        business={business}
        theme={website.theme}
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
      />
    </div>
  );
}