'use client';

import React, { useState, useEffect } from 'react';
import { PreviewData, NormalizedBusiness } from '@/lib/types';
import { Clock, CheckCircle, Sparkles, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { formatTimeRemaining } from '@/lib/utils';

interface PreviewBarProps {
  business: NormalizedBusiness;
  preview: PreviewData;
  onKeepWebsite: () => void;
  onOpenFeedback: () => void;
}

export default function PreviewBar({ business, preview, onKeepWebsite, onOpenFeedback }: PreviewBarProps) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; expired: boolean }>({
    days: 6,
    hours: 23,
    minutes: 59,
    expired: false,
  });

  useEffect(() => {
    if (!preview.previewExpiresAt) return;

    const updateTimer = () => {
      const expiry = new Date(preview.previewExpiresAt!).getTime();
      const now = new Date().getTime();
      const diff = expiry - now;
      setTimeLeft(formatTimeRemaining(diff));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // update every minute
    return () => clearInterval(interval);
  }, [preview.previewExpiresAt]);

  const isActive = preview.status === 'ACTIVE' || preview.paymentStatus === 'PAID';

  if (isActive) {
    return (
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>This website is ACTIVE & Published for {business.name}</span>
            {business.customDomain && (
              <span className="bg-emerald-800 px-2 py-0.5 rounded text-[11px] text-emerald-200">
                🌐 {business.customDomain}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenFeedback}
              className="text-xs text-emerald-200 hover:text-white flex items-center gap-1 underline"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Request Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside aria-label="Website preview banner" className="bg-slate-950 text-slate-100 text-xs py-2.5 px-4 sticky top-0 z-50 border-b border-slate-800 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-medium">
            This website preview is reserved for <strong className="text-white font-bold">{business.name}</strong> for{' '}
            <span className="text-emerald-400 font-bold">
              {timeLeft.days} days {timeLeft.hours} hours
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenFeedback}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Have Feedback?</span>
          </button>

          <button
            onClick={onKeepWebsite}
            className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-sm transition-all flex items-center gap-1"
          >
            <span>Keep This Website</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
