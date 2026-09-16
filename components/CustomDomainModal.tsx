'use client';

import React, { useState } from 'react';
import { X, Globe, CheckCircle2, Copy, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface CustomDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessId: string;
  businessName: string;
  defaultSubdomain: string;
}

export default function CustomDomainModal({
  isOpen,
  onClose,
  businessId,
  businessName,
  defaultSubdomain,
}: CustomDomainModalProps) {
  const [hasDomain, setHasDomain] = useState<boolean | null>(null);
  const [domainInput, setDomainInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const dnsRecords = [
    { type: 'A', host: '@', target: '76.76.21.21' },
    { type: 'CNAME', host: 'www', target: 'cname.vercel-dns.com' },
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleVerify = async () => {
    if (!domainInput.trim()) return;
    setIsVerifying(true);
    try {
      const res = await fetch('/api/domains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          domain: domainInput,
        }),
      });
      if (res.ok) {
        setVerified(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center mx-auto">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-950">Connect Your Custom Domain</h2>
          <p className="text-xs text-slate-600">
            Link your own domain name (e.g. {businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com)
          </p>
        </div>

        {hasDomain === null ? (
          <div className="space-y-4 py-4">
            <h3 className="text-sm font-bold text-slate-900 text-center">Do you already own a domain name?</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setHasDomain(true)}
                className="p-4 rounded-xl border-2 border-slate-200 hover:border-slate-900 font-bold text-sm text-slate-800 hover:bg-slate-50 transition-all text-center"
              >
                Yes, I have one
              </button>
              <button
                onClick={() => setHasDomain(false)}
                className="p-4 rounded-xl border-2 border-slate-200 hover:border-slate-900 font-bold text-sm text-slate-800 hover:bg-slate-50 transition-all text-center"
              >
                Not yet / Skip for now
              </button>
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              You will never need to provide your registrar password.
            </p>
          </div>
        ) : hasDomain === false ? (
          <div className="space-y-4 py-4 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
              <p className="font-semibold">No problem! Your website will continue working smoothly on:</p>
              <div className="font-mono text-emerald-700 font-bold bg-white p-2 rounded border border-slate-200">
                https://{defaultSubdomain}
              </div>
              <p className="text-slate-500 text-[11px]">
                You can easily connect a custom domain at any time in the future.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-slate-950 text-white text-xs font-bold w-full"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {!verified ? (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Enter Your Domain Name</label>
                  <input
                    type="text"
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    placeholder="e.g. mikeshandyman.com"
                    className="w-full p-3 text-sm rounded-xl border border-slate-300 focus:border-slate-950 outline-hidden font-medium"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Add These 2 DNS Records at your Registrar:</span>
                    <span className="text-[11px] text-slate-500">(GoDaddy, Namecheap, Cloudflare, etc.)</span>
                  </div>

                  <div className="space-y-2 font-mono text-xs">
                    {dnsRecords.map((rec, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                        <div className="flex gap-3 items-center">
                          <span className="font-bold text-slate-500 px-1.5 py-0.5 rounded bg-slate-100">{rec.type}</span>
                          <span className="text-slate-700">{rec.host}</span>
                          <span className="text-slate-400">→</span>
                          <span className="text-slate-900 font-bold">{rec.target}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(rec.target, i)}
                          className="text-slate-500 hover:text-slate-900 p-1"
                          title="Copy target"
                        >
                          {copiedIndex === i ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setHasDomain(null)}
                    className="px-4 py-3 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleVerify}
                    disabled={isVerifying || !domainInput.trim()}
                    className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors"
                  >
                    {isVerifying ? 'Verifying DNS Records...' : 'Verify & Connect Domain'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Domain Connected Successfully!</h3>
                <p className="text-xs text-slate-600">
                  <strong>{domainInput}</strong> is now configured for your website. SSL certificate generation will finalize shortly.
                </p>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-slate-950 text-white text-xs font-bold"
                >
                  Close & View Live Site
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
