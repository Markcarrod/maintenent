'use client';

import React, { useState } from 'react';
import { X, Check, ShieldCheck, Zap, Globe, ArrowRight, Lock } from 'lucide-react';
import { PlanType } from '@/lib/types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessId: string;
  businessName: string;
  onSuccess: (plan: PlanType) => void;
}

export default function CheckoutModal({ isOpen, onClose, businessId, businessName, onSuccess }: CheckoutModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('WEBSITE_LEAD_149');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          plan: selectedPlan,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        onSuccess(selectedPlan);
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center max-w-md mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Keep This Website
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Choose a Plan for {businessName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Instant activation. Keep your website live and permanently connect your custom domain.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Plan 1: $79/mo */}
          <div
            onClick={() => setSelectedPlan('WEBSITE_79')}
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
              selectedPlan === 'WEBSITE_79'
                ? 'border-slate-950 bg-slate-50/70 shadow-md ring-2 ring-slate-950/10'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-slate-900 text-sm">Website Only</span>
                {selectedPlan === 'WEBSITE_79' && (
                  <span className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center text-xs">✓</span>
                )}
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-black text-slate-950">$79</span>
                <span className="text-xs text-slate-500 font-medium">/month</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Custom domain connection</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Fast cloud hosting & SSL certificate</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mobile-first responsive design</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Complete business info & direct CTAs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Regular maintenance & updates</span>
                </li>
              </ul>
            </div>
            <div className="text-center text-[11px] font-semibold text-slate-500">
              Cancel anytime. No lock-in contracts.
            </div>
          </div>

          {/* Plan 2: $149/mo (Recommended) */}
          <div
            onClick={() => setSelectedPlan('WEBSITE_LEAD_149')}
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all relative flex flex-col justify-between ${
              selectedPlan === 'WEBSITE_LEAD_149'
                ? 'border-emerald-600 bg-emerald-50/40 shadow-lg ring-2 ring-emerald-600/20'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="absolute -top-3 left-6 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
              Recommended & Highest ROI
            </div>

            <div>
              <div className="flex justify-between items-center mb-3 mt-1">
                <span className="font-bold text-slate-900 text-sm">Website + Lead System</span>
                {selectedPlan === 'WEBSITE_LEAD_149' && (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</span>
                )}
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-black text-slate-950">$149</span>
                <span className="text-xs text-slate-500 font-medium">/month</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 mb-6">
                <li className="flex items-center gap-2 font-semibold text-slate-900">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Everything in Website Plan</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Smart Lead Capture & Qualification Form</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant SMS/Email Lead Notifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Lead Pipeline Dashboard (New → Won)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Project & Service Request Details</span>
                </li>
              </ul>
            </div>
            <div className="text-center text-[11px] font-bold text-emerald-800">
              Captures qualified customers directly from your site.
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full py-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>
              {isProcessing
                ? 'Activating Website...'
                : `Activate Now — ${selectedPlan === 'WEBSITE_79' ? '$79/month' : '$149/month'}`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-4 text-slate-500 text-xs">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Secure 256-bit Encryption
            </span>
            <span>•</span>
            <span>Immediate custom domain connection</span>
          </div>
        </div>
      </div>
    </div>
  );
}
