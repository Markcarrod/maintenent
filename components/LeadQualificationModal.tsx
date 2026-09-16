'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, Calendar, MapPin, Clock, FileText } from 'lucide-react';
import { Industry } from '@/lib/types';

interface LeadQualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessId: string;
  businessName: string;
  industry: Industry;
  defaultService?: string;
}

export default function LeadQualificationModal({
  isOpen,
  onClose,
  businessId,
  businessName,
  industry,
  defaultService = '',
}: LeadQualificationModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [serviceRequested, setServiceRequested] = useState(defaultService);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleAnswerChange = (field: string, val: string) => {
    setAnswers(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          customerName,
          customerPhone,
          customerEmail,
          serviceRequested: serviceRequested || defaultService,
          answers,
        }),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
        }, 2200);
      }
    } catch (err) {
      console.error('Error submitting lead:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Request Sent Successfully!</h3>
            <p className="text-xs text-slate-600">
              The team at <strong>{businessName}</strong> has received your project details and will contact you promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Direct Inquiry
              </span>
              <h2 className="text-2xl font-black text-slate-950 mt-1">
                {industry === 'restaurant'
                  ? 'Reserve / Order / Inquiry'
                  : 'Get a Fast Project Estimate'}
              </h2>
              <p className="text-xs text-slate-500">
                Direct communication with {businessName}
              </p>
            </div>

            {/* Industry-specific qualification questions */}
            {industry === 'handyman' && (
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">What service or repair do you need?</label>
                  <input
                    type="text"
                    defaultValue={defaultService}
                    onChange={(e) => setServiceRequested(e.target.value)}
                    placeholder="e.g. Drywall repair, fixture replacement, deck staining"
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Where is the project located (Zip / Neighborhood)?</label>
                  <input
                    type="text"
                    onChange={(e) => handleAnswerChange('location', e.target.value)}
                    placeholder="e.g. South Austin, 78745"
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">How soon do you need it completed?</label>
                  <select
                    onChange={(e) => handleAnswerChange('timeline', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Urgent / Today">Urgent / Today or Tomorrow</option>
                    <option value="Within 1 Week">Within 1 Week</option>
                    <option value="Within 2-3 Weeks">Within 2-3 Weeks</option>
                    <option value="Flexible">Flexible / Planning Stage</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Tell us a bit about the project</label>
                  <textarea
                    rows={2}
                    onChange={(e) => handleAnswerChange('notes', e.target.value)}
                    placeholder="Provide measurements, photos description, or key details..."
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white resize-none"
                  />
                </div>
              </div>
            )}

            {industry === 'cleaning' && (
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Property Type</label>
                    <select
                      onChange={(e) => handleAnswerChange('propertyType', e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="Residential Home">Residential Home</option>
                      <option value="Apartment / Condo">Apartment / Condo</option>
                      <option value="Commercial Office">Commercial Office</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Cleaning Frequency</label>
                    <select
                      onChange={(e) => handleAnswerChange('frequency', e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="One-Time Deep Clean">One-Time Deep Clean</option>
                      <option value="Bi-Weekly Recurring">Bi-Weekly Recurring</option>
                      <option value="Weekly Recurring">Weekly Recurring</option>
                      <option value="Move-In / Move-Out">Move-In / Move-Out</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Approximate Size / Number of Bedrooms & Baths</label>
                  <input
                    type="text"
                    onChange={(e) => handleAnswerChange('size', e.target.value)}
                    placeholder="e.g. 3 bed, 2 bath (approx 1,800 sq ft)"
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Preferred Date</label>
                  <input
                    type="date"
                    onChange={(e) => handleAnswerChange('preferredDate', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </div>
            )}

            {industry === 'restaurant' && (
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Type of Request</label>
                  <select
                    onChange={(e) => setServiceRequested(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Table Reservation">Table Reservation</option>
                    <option value="Takeout Order">Takeout Order</option>
                    <option value="Catering / Event Inquiry">Catering / Event Inquiry</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Number of Guests</label>
                    <input
                      type="number"
                      min={1}
                      defaultValue={2}
                      onChange={(e) => handleAnswerChange('guests', e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Preferred Date</label>
                    <input
                      type="date"
                      onChange={(e) => handleAnswerChange('date', e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Special Request / Dietary Note</label>
                  <input
                    type="text"
                    onChange={(e) => handleAnswerChange('notes', e.target.value)}
                    placeholder="e.g. Patio seating, anniversary celebration, allergy..."
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </div>
            )}

            {/* Customer Contact Details */}
            <div className="space-y-2.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Your Full Name</label>
                <input
                  required
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Samantha Jones"
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 outline-hidden"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Phone Number</label>
                  <input
                    required
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-300 outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email Address</label>
                  <input
                    required
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="samantha@example.com"
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-300 outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Request'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
