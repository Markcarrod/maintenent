'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe, Laptop, CheckCircle2, Building, Utensils, Wrench, Clock, Play } from 'lucide-react';
import { TEMPLATE_REGISTRY } from '@/lib/template-recommender';

export default function HomePage() {
  const [quickName, setQuickName] = useState('');
  const [quickCity, setQuickCity] = useState('');
  const [quickIndustry, setQuickIndustry] = useState('handyman');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleQuickGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim() || !quickCity.trim()) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/admin/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quickName,
          city: quickCity,
          industry: quickIndustry,
        }),
      });
      const data = await res.json();
      if (data.business?.slug) {
        window.location.href = `/preview/${data.business.slug}`;
      }
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };

  const templatesList = Object.values(TEMPLATE_REGISTRY);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Top Banner */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Automated Local-Business Website Preview & Conversion SaaS
          </span>
          <Link href="/admin" className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1">
            <span>Admin Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center font-black">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-xl text-slate-950 block leading-tight">PreviewSaaS</span>
              <span className="text-[11px] text-slate-500 font-medium">Local Business Website Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>Admin Management</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Turn Any Local Business Lead into a Production Website in Minutes</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
            The Website Does Most of the Selling.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            No blank canvases or generic website builders. We import real business data, auto-select from 15 high-converting niche templates, and generate a live 7-day personalized preview link.
          </p>

          {/* Quick Lead Generator Form */}
          <div className="pt-4 max-w-2xl mx-auto">
            <form onSubmit={handleQuickGenerate} className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-200 shadow-xl space-y-3 text-left">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                ⚡ Generate Live Website Preview Instantly
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  required
                  type="text"
                  value={quickName}
                  onChange={(e) => setQuickName(e.target.value)}
                  placeholder="Business Name (e.g. Apex Plumbing)"
                  className="p-3 text-xs rounded-xl border border-slate-300 focus:border-slate-950 outline-hidden"
                />
                <input
                  required
                  type="text"
                  value={quickCity}
                  onChange={(e) => setQuickCity(e.target.value)}
                  placeholder="City, State (e.g. Denver, CO)"
                  className="p-3 text-xs rounded-xl border border-slate-300 focus:border-slate-950 outline-hidden"
                />
                <select
                  value={quickIndustry}
                  onChange={(e) => setQuickIndustry(e.target.value)}
                  className="p-3 text-xs rounded-xl border border-slate-300 focus:border-slate-950 outline-hidden bg-white font-medium"
                >
                  <option value="handyman">Handyman Services</option>
                  <option value="cleaning">Cleaning Services</option>
                  <option value="restaurant">Restaurant / Dining</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{isGenerating ? 'Building Personalized Website...' : 'Generate & Open Live Preview'}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3 Core Pre-Seeded Lead Scenarios */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Acceptance Test Scenarios
          </span>
          <h2 className="text-3xl font-black text-slate-950">Test The 3 Core Industry Previews</h2>
          <p className="text-slate-600 text-sm">
            Experience the first-visit 7-day timer, preview bar, lead qualification system, and checkout flow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mike's Handyman */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-bold flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5" /> Handyman
                </span>
                <span className="text-xs font-mono text-slate-400">Template H1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-950">Mike's Handyman Services</h3>
                <p className="text-xs text-slate-500 mt-0.5">Austin, TX • 4.9 Stars (42 Reviews)</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                General handyman & home repairs with large hero, service cards, why choose us, verified reviews, and free quote triggers.
              </p>
            </div>
            <div className="p-6 pt-0">
              <Link
                href="/preview/mikes-handyman-services"
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <span>Open Handyman Preview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Sparkling Horizon Cleaning */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-cyan-50 text-cyan-800 text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Cleaning Services
                </span>
                <span className="text-xs font-mono text-slate-400">Template C1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-950">Sparkling Horizon Cleaning</h3>
                <p className="text-xs text-slate-500 mt-0.5">Seattle, WA • 4.9 Stars (56 Reviews)</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Residential & maid cleaning with bright modern layout, how-it-works, checklist, and instant quote estimator.
              </p>
            </div>
            <div className="p-6 pt-0">
              <Link
                href="/preview/sparkling-horizon-cleaning"
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <span>Open Cleaning Preview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bella Vista Trattoria */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-800 text-xs font-bold flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" /> Restaurant
                </span>
                <span className="text-xs font-mono text-slate-400">Template R1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-950">Bella Vista Trattoria</h3>
                <p className="text-xs text-slate-500 mt-0.5">Chicago, IL • 4.8 Stars (89 Reviews)</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Handmade pasta & wine bar in West Loop with categorized dish menu, prices, reservation requests, and hours.
              </p>
            </div>
            <div className="p-6 pt-0">
              <Link
                href="/preview/bella-vista-trattoria"
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <span>Open Restaurant Preview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The 15 Templates Showcase */}
      <section className="py-16 px-4 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">15 Production Templates</span>
            <h2 className="text-3xl font-black text-slate-950">All 15 Specialized Niche Designs</h2>
            <p className="text-xs text-slate-500">
              Each template has distinct layouts, hero structures, typography, section ordering, and CTAs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templatesList.map((tpl) => (
              <div key={tpl.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {tpl.id}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {tpl.badge}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{tpl.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{tpl.style}</p>
                <div className="text-[11px] text-slate-400 pt-1">
                  Target: <span className="text-slate-600">{tpl.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-12 px-4 text-xs text-center border-t border-slate-800">
        <div className="max-w-6xl mx-auto space-y-2">
          <p className="text-slate-300 font-bold text-sm">Local Business Website Preview SaaS Foundation</p>
          <p>© {new Date().getFullYear()} Preview Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
