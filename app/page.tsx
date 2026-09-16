'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Laptop,
  CheckCircle2,
  Utensils,
  Wrench,
  Clock,
  ExternalLink,
  Check,
} from 'lucide-react';
import { TEMPLATE_REGISTRY } from '@/lib/template-recommender';

export default function HomePage() {
  const [quickName, setQuickName] = useState('');
  const [quickCity, setQuickCity] = useState('');
  const [quickIndustry, setQuickIndustry] = useState('restaurant');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'restaurant' | 'handyman' | 'cleaning'>('restaurant');

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
              Live Platform
            </span>
            <span>15 Production Templates • 7-Day Auto-Preview Countdown • Multi-Tenant Engine</span>
          </div>
          <Link
            href="/admin"
            className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
          >
            <span>Open Admin Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. NAVBAR */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-xl text-white block leading-tight tracking-tight">Maintenent</span>
              <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">Local Website Engine</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#demos" className="hover:text-white transition-colors">Live Demos</a>
            <a href="#templates" className="hover:text-white transition-colors">15 Templates</a>
            <a href="#workflow" className="hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>

          {/* Header CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-bold transition-colors hidden sm:inline-flex"
            >
              Admin Pipeline
            </Link>
            <a
              href="#generator"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create Preview</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 px-4 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-emerald-400 text-xs font-bold shadow-inner">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Automated Local Business Website Generator SaaS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08]">
            The Website Does <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Most of the Selling.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
            Turn offline local businesses into high-converting clients. We import real business data, auto-match from 15 custom industry templates, and generate a personalized 7-day live preview link.
          </p>

          {/* Quick Lead Generator Form */}
          <div id="generator" className="pt-4 max-w-3xl mx-auto scroll-mt-28">
            <form
              onSubmit={handleQuickGenerate}
              className="bg-slate-900/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-2xl shadow-emerald-950/40 space-y-4 text-left"
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Sparkles className="w-4 h-4" /> Generate Personalized Website Preview
                </span>
                <span className="text-[10px] text-slate-500 font-mono">100% Zero-Fabrication</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  required
                  type="text"
                  value={quickName}
                  onChange={(e) => setQuickName(e.target.value)}
                  placeholder="Business Name (e.g. Apex Grill)"
                  className="p-3.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-hidden transition-colors"
                />
                <input
                  required
                  type="text"
                  value={quickCity}
                  onChange={(e) => setQuickCity(e.target.value)}
                  placeholder="City, State (e.g. Austin, TX)"
                  className="p-3.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-hidden transition-colors"
                />
                <select
                  value={quickIndustry}
                  onChange={(e) => setQuickIndustry(e.target.value)}
                  className="p-3.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-hidden transition-colors font-medium"
                >
                  <option value="restaurant">🍽 Restaurant & Food</option>
                  <option value="handyman">🔨 Handyman Services</option>
                  <option value="cleaning">🧹 Cleaning Services</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all active:scale-[0.99] disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? 'Building Personalized Website...' : 'Generate & Open Live Preview'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="pt-6 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>15 Production Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>7-Day Preview Countdown</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Client Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-emerald-400" />
              <span>Live Visual Editor</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE DEMOS SHOWCASE */}
      <section id="demos" className="py-20 px-4 bg-slate-900 border-t border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Interactive Live Websites
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Explore Live Client Previews</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Click any demo to test the personalized 7-day preview countdown bar, dedicated subpages, visual editor, and reservation/lead captures.
            </p>
          </div>

          {/* Niche Filter Tabs */}
          <div className="flex justify-center gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('restaurant')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'restaurant'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Restaurants (5)</span>
            </button>
            <button
              onClick={() => setActiveTab('handyman')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'handyman'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Handyman (5)</span>
            </button>
            <button
              onClick={() => setActiveTab('cleaning')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'cleaning'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Cleaning (5)</span>
            </button>
          </div>

          {/* TAB: RESTAURANTS */}
          {activeTab === 'restaurant' && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-orange-500/50 transition-all group">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                      R1 • Pizza/Italian
                    </span>
                    <span className="text-xs text-amber-400 font-bold">★ 4.8</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-orange-400 transition-colors">
                    Bella Vista Trattoria
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Chicago, IL • Wood-fired pizza, handmade pasta, dish categories & table reservations.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <Link
                    href="/preview/bella-vista-trattoria"
                    className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>Open Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-orange-500/50 transition-all group">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                      R2 • Mexican & Latin
                    </span>
                    <span className="text-xs text-amber-400 font-bold">★ 4.7</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-orange-400 transition-colors">
                    Taco Libre
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Austin, TX • Bold street tacos, fresh guacamole, handcrafted margaritas & online orders.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <Link
                    href="/preview/taco-libre-austin"
                    className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>Open Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-red-500/50 transition-all group">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                      R3 • Burgers & Fast Food
                    </span>
                    <span className="text-xs text-amber-400 font-bold">★ 4.6</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-red-400 transition-colors">
                    Big Stack Burgers
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Houston, TX • Smashed patties, thick milkshakes, quick ordering, dark modern design.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <Link
                    href="/preview/big-stack-burgers"
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>Open Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-amber-500/50 transition-all group">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      R4 • Asian Fusion
                    </span>
                    <span className="text-xs text-amber-400 font-bold">★ 4.9</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                    Dragon Palace
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    San Francisco, CA • Cantonese dim sum, Peking duck, elegant gold and deep navy theme.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <Link
                    href="/preview/dragon-palace-sf"
                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>Open Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-blue-500/50 transition-all group">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      R5 • Diner & BBQ
                    </span>
                    <span className="text-xs text-amber-400 font-bold">★ 4.8</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors">
                    The Rusty Fork Diner
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Nashville, TN • All-day breakfast, 12-hour hickory smoked brisket, Southern comfort food.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <Link
                    href="/preview/the-rusty-fork-diner"
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>Open Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB: HANDYMAN */}
          {activeTab === 'handyman' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    Template H1 • Classic Handyman
                  </span>
                  <h3 className="font-bold text-xl text-white">Mike's Handyman Services</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Austin, TX • General home repairs, drywall, fixtures, why choose us cards, and lead capture.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/preview/mikes-handyman-services"
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Open Handyman Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    Template H2 • Renovations
                  </span>
                  <h3 className="font-bold text-xl text-white">Project-Focused Remodeling</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Kitchen, bathroom, and structural renovations with gallery-first composition and quote estimators.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/preview/mikes-handyman-services"
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>View Template H2</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    Template H3 • 24/7 Emergency
                  </span>
                  <h3 className="font-bold text-xl text-white">Rapid Response Repairs</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Urgent electrical, plumbing, and roof leak repairs with prominent call buttons and emergency hours.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/preview/mikes-handyman-services"
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>View Template H3</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CLEANING */}
          {activeTab === 'cleaning' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                    Template C1 • Professional Cleaning
                  </span>
                  <h3 className="font-bold text-xl text-white">Sparkling Horizon Cleaning</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Seattle, WA • Residential maid service, checklist breakdown, verified reviews, and instant estimate request.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/preview/sparkling-horizon-cleaning"
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Open Cleaning Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                    Template C3 • Commercial & Janitorial
                  </span>
                  <h3 className="font-bold text-xl text-white">Office & Corporate Cleans</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Tailored for B2B contracts, office buildings, medical facilities, and scheduled recurring services.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/preview/sparkling-horizon-cleaning"
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>View Template C3</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                    Template C4 • Luxury Estate
                  </span>
                  <h3 className="font-bold text-xl text-white">High-End Luxury Cleans</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    White-glove residential cleaning, deep sanitization, premium typography, and bespoke quote flows.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/preview/sparkling-horizon-cleaning"
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>View Template C4</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. WORKFLOW */}
      <section id="workflow" className="py-20 px-4 bg-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              The 4-Step Engine
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">How Maintenent Generates Revenue</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Automate the entire sales cycle without writing manual code for each business lead.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative">
              <span className="text-4xl font-black text-slate-800 font-mono">01</span>
              <h3 className="font-bold text-lg text-white">Import Business</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter business details or import via CSV/Google Maps. The system pulls reviews, hours, phone, and services.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative">
              <span className="text-4xl font-black text-slate-800 font-mono">02</span>
              <h3 className="font-bold text-lg text-white">Auto-Pick Template</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Smart recommendation picks the best layout from 15 high-converting designs matching their specific niche.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative">
              <span className="text-4xl font-black text-emerald-500/30 font-mono">03</span>
              <h3 className="font-bold text-lg text-white">7-Day Preview Starts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Owner receives a temporary link. The 7-day countdown starts automatically on their very first visit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative">
              <span className="text-4xl font-black text-emerald-400/50 font-mono">04</span>
              <h3 className="font-bold text-lg text-white">Monthly Subscription</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Owner pays $99–$149/mo to keep the website active, unlock the client visual dashboard, and attach a custom domain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 15 TEMPLATES SHOWCASE */}
      <section id="templates" className="py-20 px-4 bg-slate-900 border-t border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Template Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">15 Specialized Niche Templates</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Each template contains tailored visual themes, typography pairings, section ordering, and conversion CTAs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templatesList.map((tpl) => (
              <div
                key={tpl.id}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-950/80 hover:border-slate-700 transition-all space-y-2.5"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-white bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                    {tpl.id}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    {tpl.badge}
                  </span>
                </div>
                <h4 className="font-bold text-white text-base">{tpl.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{tpl.style}</p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
                  Target: <span className="text-slate-300 font-medium">{tpl.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRICING SECTION */}
      <section id="pricing" className="py-20 px-4 bg-slate-950 border-t border-slate-800 scroll-mt-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Predictable Monthly Plans
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Turn-Key Website Subscriptions</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Clients keep their live website with hosting, continuous updates, visual editor access, and custom domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Starter Plan</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">$79</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-400">Essential standalone website for solo trades & local cleaners.</p>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Full 5-page responsive website</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Free SSL & Fast Hosting</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Client Edit Portal</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom Domain Support</li>
                </ul>
              </div>
              <a
                href="#generator"
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition-colors block"
              >
                Choose Starter
              </a>
            </div>

            <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border-2 border-emerald-500 p-8 flex flex-col justify-between space-y-6 shadow-2xl shadow-emerald-950/50 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                Most Popular
              </span>
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Pro Growth Plan</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">$99</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-400">Ideal for restaurants, busy contractors, and growing cleaning services.</p>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Everything in Starter</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Interactive Menu / Services CMS</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Table Reservations & Quote Flow</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Online Order & Delivery Links</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Priority Support & Maintenance</li>
                </ul>
              </div>
              <a
                href="#generator"
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs text-center transition-all shadow-lg shadow-emerald-500/25 block"
              >
                Start Free 7-Day Preview
              </a>
            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Elite Growth Plan</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">$149</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-400">Full marketing & lead qualification engine with SMS/Email alerts.</p>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Everything in Pro</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Instant Lead SMS/Email Delivery</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Blog CMS & Content Publishing</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Monthly SEO & Content Updates</li>
                </ul>
              </div>
              <a
                href="#generator"
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition-colors block"
              >
                Choose Elite
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-950 text-slate-500 py-12 px-4 text-xs text-center border-t border-slate-800">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex justify-center items-center gap-6 font-semibold text-slate-400">
            <Link href="/admin" className="hover:text-emerald-400 transition-colors">Admin Dashboard</Link>
            <a href="#demos" className="hover:text-emerald-400 transition-colors">Live Demos</a>
            <a href="#templates" className="hover:text-emerald-400 transition-colors">15 Templates</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
          </div>
          <p className="text-slate-400 font-bold text-sm">Maintenent • Automated Local Business Website Platform</p>
          <p>© {new Date().getFullYear()} Maintenent. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

