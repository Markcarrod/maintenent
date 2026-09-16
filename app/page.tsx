'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Smartphone,
  Zap,
  Search,
  ShieldCheck,
  Server,
  Layers,
  Sparkles,
  Utensils,
  Wrench,
  Sparkle,
  HardHat,
  Scissors,
  Car,
  Briefcase,
  ShoppingBag,
  ExternalLink,
  ChevronDown,
  Clock,
  MapPin,
  Calendar,
  MessageSquare,
  Star,
  Check,
  Menu as MenuIcon,
  X,
  Phone,
  Mail,
  Laptop,
} from 'lucide-react';

export default function AgencyLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [portfolioTab, setPortfolioTab] = useState<'all' | 'restaurant' | 'home-services' | 'cleaning' | 'contractor'>('all');
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  // Onboarding modal state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: 'Restaurant / Cafe',
    city: '',
    hasExistingWebsite: 'no',
    websiteGoal: 'New Customers & Local Visibility',
    fullName: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save lead submission to leads API
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'agency_inquiry',
          answers: formData,
        }),
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  const industries = [
    { name: 'Restaurants & Cafes', icon: Utensils, desc: 'Digital menus, opening hours, booking requests & location info.' },
    { name: 'Handyman & Home Services', icon: Wrench, desc: 'Service lists, direct quote requests & emergency call triggers.' },
    { name: 'Cleaning Companies', icon: Sparkle, desc: 'Residential & commercial pricing packages with online booking forms.' },
    { name: 'Contractors & Trades', icon: HardHat, desc: 'Project galleries, licensing credentials & estimate request forms.' },
    { name: 'Beauty & Wellness', icon: Scissors, desc: 'Treatment menus, stylist showcases & appointment scheduling.' },
    { name: 'Auto Services & Repair', icon: Car, desc: 'Service menus, mechanic credentials & rapid contact options.' },
    { name: 'Professional Services', icon: Briefcase, desc: 'Consultants, accountants & legal advisors with trust-first layouts.' },
    { name: 'Local Retail & Boutiques', icon: ShoppingBag, desc: 'Store hours, product catalogues, directions & featured stock.' },
  ];

  const portfolioProjects = [
    {
      id: 'la-trattoria',
      title: 'Trattoria Bella Vista',
      category: 'restaurant',
      categoryLabel: 'Restaurant & Dining',
      description: 'Modern Italian dining experience featuring digital menus, table reservation requests, and verified guest reviews.',
      accentColor: 'from-amber-600 to-rose-700',
      tag: 'Demo Website',
      features: ['Digital Menu', 'Table Booking', 'Google Reviews'],
      demoSlug: 'trattoria-bella-vista',
    },
    {
      id: 'apex-handyman',
      title: 'Apex Home Services',
      category: 'home-services',
      categoryLabel: 'Handyman & Repairs',
      description: 'High-conversion service business site with transparent rate tables, same-day quote forms, and direct click-to-call.',
      accentColor: 'from-blue-600 to-indigo-800',
      tag: 'Demo Website',
      features: ['Emergency Callouts', 'Instant Estimate Form', 'Service Checklists'],
      demoSlug: 'apex-home-services',
    },
    {
      id: 'sparkle-pro',
      title: 'Crystal Clear Cleaners',
      category: 'cleaning',
      categoryLabel: 'Cleaning Services',
      description: 'Pristine residential and commercial cleaning website with recurring service schedules and instant pricing estimates.',
      accentColor: 'from-emerald-600 to-teal-800',
      tag: 'Demo Website',
      features: ['Recurring Plans', 'Room Calculator', 'Eco-friendly Guarantee'],
      demoSlug: 'crystal-clear-cleaners',
    },
    {
      id: 'vanguard-builders',
      title: 'Vanguard Contracting',
      category: 'contractor',
      categoryLabel: 'General Contracting',
      description: 'High-ticket construction website highlighting completed remodel galleries, licensing, and detailed consultation requests.',
      accentColor: 'from-stone-700 to-slate-900',
      tag: 'Demo Website',
      features: ['Portfolio Gallery', 'License & Insurance', 'Consultation Request'],
      demoSlug: 'vanguard-contracting',
    },
  ];

  const filteredProjects = portfolioTab === 'all'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === portfolioTab);

  const faqs = [
    {
      q: 'Do I need an existing website to work with you?',
      a: 'No. We can build your complete website from scratch. We handle the design, structure, business copywriting foundations, and technical setup.',
    },
    {
      q: 'Can you redesign my existing website?',
      a: 'Yes. We can redesign and rebuild an outdated website to ensure it is modern, mobile-friendly, fast, and structured for better search clarity.',
    },
    {
      q: 'Will my website work on mobile phones and tablets?',
      a: 'Yes. Every website we build is fully responsive and thoroughly tested across modern smartphones, tablets, laptops, and desktop displays.',
    },
    {
      q: 'How does your local SEO foundation help search engines?',
      a: 'We build websites with clean semantic HTML, structured business data (schema.org), fast page load times, and clear geographical and service information to give search engines an unambiguous understanding of your business.',
    },
    {
      q: 'Can I use my own custom domain name?',
      a: 'Yes. We can easily connect your existing domain (e.g. yourbusiness.com) to your new website. If you do not have one yet, we will guide you through getting one.',
    },
    {
      q: 'Can I request updates and changes to my website?',
      a: 'Yes. Our monthly service plans include ongoing updates, content adjustments, menu/service refreshes, and technical maintenance so your site is never abandoned.',
    },
    {
      q: 'Can you add features like appointment booking or online menus?',
      a: 'Yes. Depending on your business needs, we integrate contact forms, reservation systems, digital menus, image galleries, review feeds, and external ordering links.',
    },
    {
      q: 'How long does it take to build and launch our website?',
      a: 'Most standard business websites are designed and ready for your review within 3 to 7 business days once we receive your business information.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-50 selection:text-indigo-700">
      {/* 3. STICKY RESPONSIVE HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Globe className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Buyer<span className="text-indigo-600">Radar</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Web Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Services
            </a>
            <a href="#portfolio" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Our Work
            </a>
            <a href="#process" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Process
            </a>
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => {
                setIsGetStartedOpen(true);
                setStep(1);
                setFormSubmitted(false);
              }}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md"
            >
              Services
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md"
            >
              Our Work
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md"
            >
              Process
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md"
            >
              FAQ
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsGetStartedOpen(true);
                  setStep(1);
                  setFormSubmitted(false);
                }}
                className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 4. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                <span>Web Design & Development for Local Businesses</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Professional Websites Built for Growing Businesses
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We design fast, modern websites that give your business a professional online presence and make it easier for potential customers to find, learn about, and contact you.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => {
                    setIsGetStartedOpen(true);
                    setStep(1);
                    setFormSubmitted(false);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-slate-900 hover:bg-indigo-600 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>

                <a
                  href="#portfolio"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all"
                >
                  View Our Work
                </a>
              </div>

              {/* Simple Assurance note */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center">
                  <Check className="w-4 h-4 text-emerald-500 mr-1.5" /> No tech experience required
                </span>
                <span className="flex items-center">
                  <Check className="w-4 h-4 text-emerald-500 mr-1.5" /> Complete design & setup
                </span>
                <span className="flex items-center">
                  <Check className="w-4 h-4 text-emerald-500 mr-1.5" /> Ongoing maintenance included
                </span>
              </div>
            </div>

            {/* Right Mockup — Realistic Business Website */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Browser Frame */}
                <div className="bg-slate-900 rounded-2xl shadow-2xl p-2.5 sm:p-3.5 border border-slate-800">
                  {/* Browser top controls */}
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-800/80 rounded-xl mb-3">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <div className="flex items-center px-4 py-1 bg-slate-900/90 rounded-md text-[11px] text-slate-400 font-mono tracking-wide">
                      <ShieldCheck className="w-3 h-3 text-emerald-400 mr-1.5" />
                      https://www.bellavista-bistro.com
                    </div>
                    <div className="w-4"></div>
                  </div>

                  {/* Rendered Website Interior Preview */}
                  <div className="bg-white rounded-xl overflow-hidden text-slate-900 shadow-inner">
                    {/* Mock Site Nav */}
                    <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Utensils className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Bella Vista Bistro</span>
                      </div>
                      <div className="flex items-center space-x-3 text-[11px] font-medium text-slate-600">
                        <span className="hidden sm:inline">Menu</span>
                        <span className="hidden sm:inline">About</span>
                        <span className="px-2.5 py-1 rounded bg-amber-600 text-white font-semibold text-[10px]">
                          Reserve Table
                        </span>
                      </div>
                    </div>

                    {/* Mock Site Hero */}
                    <div className="p-6 sm:p-8 bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 text-white relative">
                      <div className="max-w-xs space-y-2">
                        <span className="inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-semibold uppercase tracking-wider border border-amber-500/30">
                          Fresh Artisanal Dining
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold leading-tight">
                          Authentic Italian Cuisine in Downtown Austin
                        </h3>
                        <p className="text-[11px] text-slate-300">
                          Handmade pasta, wood-fired specialties, and seasonal farm ingredients.
                        </p>
                        <div className="pt-2 flex items-center space-x-2">
                          <span className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-[10px] font-bold">
                            View Menu
                          </span>
                          <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-[10px] font-semibold">
                            Call (512) 555-0198
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Mock Site Value Strip */}
                    <div className="p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded bg-white border border-slate-200/60 shadow-xs">
                        <Clock className="w-3.5 h-3.5 text-amber-600 mx-auto mb-1" />
                        <p className="text-[10px] font-bold text-slate-800">Open Daily</p>
                        <p className="text-[9px] text-slate-500">11:30 AM - 10 PM</p>
                      </div>
                      <div className="p-2 rounded bg-white border border-slate-200/60 shadow-xs">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 mx-auto mb-1" />
                        <p className="text-[10px] font-bold text-slate-800">Downtown</p>
                        <p className="text-[9px] text-slate-500">412 Congress Ave</p>
                      </div>
                      <div className="p-2 rounded bg-white border border-slate-200/60 shadow-xs">
                        <Star className="w-3.5 h-3.5 text-amber-500 mx-auto mb-1 fill-amber-500" />
                        <p className="text-[10px] font-bold text-slate-800">4.9 Stars</p>
                        <p className="text-[9px] text-slate-500">Verified Reviews</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Device Overlay Preview */}
                <div className="hidden sm:block absolute -bottom-6 -right-6 w-44 bg-slate-900 rounded-2xl p-2 shadow-2xl border border-slate-700">
                  <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-2"></div>
                  <div className="bg-white rounded-xl p-3 text-slate-900">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                      <span className="text-[9px] font-bold">Apex Handyman</span>
                      <Phone className="w-2.5 h-2.5 text-indigo-600" />
                    </div>
                    <div className="space-y-1 text-left">
                      <p className="text-[10px] font-bold leading-tight">Same-Day Home Repairs</p>
                      <p className="text-[8px] text-slate-500">Fast, licensed & insured services.</p>
                      <div className="pt-1">
                        <div className="bg-indigo-600 text-white text-[8px] text-center font-bold py-1 rounded">
                          Get Free Estimate
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRUST / VALUE STRIP */}
      <section className="py-8 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span className="text-sm font-semibold tracking-wide">Mobile Friendly</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span className="text-sm font-semibold tracking-wide">Fast & Modern</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span className="text-sm font-semibold tracking-wide">SEO Ready</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span className="text-sm font-semibold tracking-wide">Custom Designed</span>
            </div>
            <div className="col-span-2 md:col-span-1 flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span className="text-sm font-semibold tracking-wide">Easy to Manage</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICES SECTION */}
      <section id="services" className="py-20 bg-slate-50/70 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Agency Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything Your Business Needs Online
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              We provide full-service website design, development, and ongoing maintenance so you can focus on running your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Website Design</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Professional websites designed around your business, services, and customers. Crafted with clean aesthetics that establish instant credibility.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Mobile Optimization</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Websites that look and work properly across phones, tablets, and desktops. Smooth touch navigation, fast loading, and tap-to-call buttons.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Local SEO Foundations</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Technical and on-page foundations that help search engines understand your business, service areas, opening hours, and physical location.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Business Features</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Contact forms, booking requests, online ordering links, digital menus, service lists, review displays, and Google Maps integration.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hosting & Maintenance</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Keep your website online, secure, updated, and maintained on high-speed global cloud hosting with automatic SSL encryption.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Custom Development</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Need something specific? We can build custom functionality, multi-page layouts, specialized enquiry workflows, and tailored brand integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INDUSTRIES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Industry Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Websites Built Around Your Business
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              We understand the specific requirements, customer questions, and conversion layouts needed for local service and storefront businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, i) => {
              const IconComp = ind.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-indigo-50 text-slate-700 group-hover:text-indigo-600 flex items-center justify-center mb-4 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{ind.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{ind.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 font-medium">
              <span>Don&apos;t see your industry? We build custom websites around your specific business model.</span>
              <button
                onClick={() => {
                  setIsGetStartedOpen(true);
                  setStep(1);
                  setFormSubmitted(false);
                }}
                className="ml-3 text-indigo-600 font-semibold hover:underline"
              >
                Inquire now &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. OUR WORK / PORTFOLIO */}
      <section id="portfolio" className="py-20 bg-slate-50/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                Portfolio Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                See What We Build
              </h2>
              <p className="text-base text-slate-600">
                Explore our example website designs built for local service businesses and hospitality venues.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Projects' },
                { key: 'restaurant', label: 'Restaurants' },
                { key: 'home-services', label: 'Home Services' },
                { key: 'cleaning', label: 'Cleaning' },
                { key: 'contractor', label: 'Contractors' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setPortfolioTab(tab.key as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    portfolioTab === tab.key
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Mockup Top Banner */}
                  <div className={`h-48 sm:h-56 bg-gradient-to-br ${project.accentColor} p-6 text-white flex flex-col justify-between relative`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono tracking-wider uppercase bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-white/90 border border-white/10">
                        {project.categoryLabel}
                      </span>
                      <span className="text-[11px] font-semibold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded text-white border border-white/20">
                        {project.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-white/80 line-clamp-1">
                        Full bespoke website structure with dedicated service modules.
                      </p>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6">
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-medium text-slate-500">
                    Live Demo Ready
                  </span>
                  <Link
                    href={`/preview/${project.demoSlug}`}
                    className="inline-flex items-center text-xs font-bold text-indigo-600 group-hover:text-indigo-700 hover:underline"
                  >
                    View Project
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-slate-500">
            * Showcase designs are demonstration websites built to illustrate our layout and feature standards.
          </div>
        </div>
      </section>

      {/* 9. BEFORE / AFTER VALUE SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Clear Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              The Value of a Proper Website
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              A professional website gives potential customers an easy, confidence-inspiring way to learn about and contact your business.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left — Without */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Without a Professional Website</h3>
                  <p className="text-xs text-slate-500">Common challenges for local businesses</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 mr-3 flex-shrink-0"></span>
                  <span>Customers have limited or outdated information on services and pricing</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 mr-3 flex-shrink-0"></span>
                  <span>Important business details like hours, phone numbers, and service areas may be hard to find</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 mr-3 flex-shrink-0"></span>
                  <span>Business has no central online destination to direct social media or map visitors to</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 mr-3 flex-shrink-0"></span>
                  <span>Lack of modern mobile formatting makes phone browsing frustrating for visitors</span>
                </li>
              </ul>
            </div>

            {/* Right — With */}
            <div className="bg-gradient-to-br from-indigo-50/50 to-white rounded-2xl p-8 border border-indigo-200/80 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">With a Professional Website</h3>
                  <p className="text-xs text-indigo-700 font-medium">Built & maintained by BuyerRadar</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 mr-2.5 flex-shrink-0" />
                  <span>Clear, well-organized business information with complete service descriptions</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 mr-2.5 flex-shrink-0" />
                  <span>Services and products presented with high-end, clean visual layouts</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 mr-2.5 flex-shrink-0" />
                  <span>Easy contact options including quick quote forms, booking, and click-to-call</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 mr-2.5 flex-shrink-0" />
                  <span>Smooth, responsive experience optimized specifically for mobile visitors</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 mr-2.5 flex-shrink-0" />
                  <span>Clean structural foundation to support your online visibility and reputation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PROCESS SECTION */}
      <section id="process" className="py-20 bg-slate-900 text-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
              Simple 4-Step Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From Idea to Live Website
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              We take care of the heavy lifting. No coding, no complicated builders, and no technical headaches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 relative">
              <div className="text-3xl font-extrabold text-indigo-400 font-mono mb-4">01</div>
              <h3 className="text-lg font-bold text-white mb-2">Tell Us About Your Business</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We learn about your business, services, location, customer questions, and your primary online goals.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 relative">
              <div className="text-3xl font-extrabold text-indigo-400 font-mono mb-4">02</div>
              <h3 className="text-lg font-bold text-white mb-2">We Design</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We create a clean, modern website tailored to your business, formatted for mobile and desktop speed.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 relative">
              <div className="text-3xl font-extrabold text-indigo-400 font-mono mb-4">03</div>
              <h3 className="text-lg font-bold text-white mb-2">Review & Refine</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                You review the private live preview of your website and request any changes or text refinements.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 relative">
              <div className="text-3xl font-extrabold text-indigo-400 font-mono mb-4">04</div>
              <h3 className="text-lg font-bold text-white mb-2">Launch</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We connect your custom domain name, enable SSL security, and launch your website to the public.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FEATURES SECTION */}
      <section id="features" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Technical Specifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Built for Real Businesses
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Every website includes core business and technical features required for a reliable web presence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { title: 'Responsive Design', desc: 'Adapts seamlessly to phones, tablets, and computers.' },
              { title: 'Fast Loading', desc: 'Optimized assets and Next.js performance on global CDN.' },
              { title: 'SEO-Friendly Structure', desc: 'Semantic tags, metadata, and schema for search clarity.' },
              { title: 'Contact Forms', desc: 'Custom inquiry forms routed directly to your business email.' },
              { title: 'Google Maps Integration', desc: 'Interactive location maps so local visitors find you easily.' },
              { title: 'Social Media Links', desc: 'Direct links to Facebook, Instagram, Yelp, and LinkedIn.' },
              { title: 'Image Galleries', desc: 'Showcase your work, team, completed jobs, or venue photos.' },
              { title: 'Service Pages', desc: 'Dedicated pages detailing your individual service offerings.' },
              { title: 'Menu Pages', desc: 'Structured digital menus with tags for dietary options & specialties.' },
              { title: 'Booking Integration', desc: 'Direct booking requests or links to your reservation software.' },
              { title: 'Online Ordering', desc: 'Direct links to DoorDash, UberEats, or your direct ordering portal.' },
              { title: 'Custom Domains & SSL', desc: 'Secure HTTPS encryption on your chosen custom web address.' },
            ].map((feat, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-colors">
                <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center">
                  <Check className="w-3.5 h-3.5 text-indigo-600 mr-1.5 flex-shrink-0" />
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pl-5">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. PRICING */}
      <section id="pricing" className="py-20 bg-slate-50/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Clear & Simple Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Straightforward Website Plans
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              No large upfront agency retainers. Simple monthly plans that cover design, hosting, security, and maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan 1 — Standard Website */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900">Website</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Complete professional website with hosting and ongoing support.
                  </p>
                </div>

                <div className="mb-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900 font-mono">$99</span>
                  <span className="text-sm text-slate-500 font-medium ml-2">/ month</span>
                </div>

                <div className="border-t border-slate-100 pt-6 space-y-3.5">
                  <div className="flex items-center text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0" />
                    <span>Professional bespoke website design</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0" />
                    <span>Mobile & tablet responsive formatting</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0" />
                    <span>Custom business content & service layout</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0" />
                    <span>Fast cloud hosting & SSL certificate</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0" />
                    <span>Local SEO technical foundations</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0" />
                    <span>Contact form & Google Maps setup</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0" />
                    <span>Ongoing maintenance & content updates</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    setIsGetStartedOpen(true);
                    setStep(1);
                    setFormSubmitted(false);
                  }}
                  className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Plan 2 — Website + Growth */}
            <div className="bg-white rounded-2xl border-2 border-indigo-600 p-8 shadow-md flex flex-col justify-between relative">
              <div className="absolute -top-3.5 right-6 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider">
                Full Solution
              </div>

              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900">Website + Growth</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Everything in Website plus additional business & visibility features.
                  </p>
                </div>

                <div className="mb-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900 font-mono">$149</span>
                  <span className="text-sm text-slate-500 font-medium ml-2">/ month</span>
                </div>

                <div className="border-t border-slate-100 pt-6 space-y-3.5">
                  <div className="flex items-center text-xs font-semibold text-indigo-900">
                    <Check className="w-4 h-4 text-indigo-600 mr-2.5 flex-shrink-0" />
                    <span>Everything included in Website plan</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0" />
                    <span>Multi-page website (About, Services, Menu, Reviews)</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0" />
                    <span>Appointment booking or online ordering integration</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0" />
                    <span>Google Business profile optimization guidance</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0" />
                    <span>Interactive photo galleries & customer review showcase</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0" />
                    <span>Priority same-day update turnaround</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    setIsGetStartedOpen(true);
                    setStep(1);
                    setFormSubmitted(false);
                  }}
                  className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. DOMAIN SECTION */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center space-x-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider">
                  <Globe className="w-4 h-4" />
                  <span>Custom Domains Made Simple</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Already have a domain or need a new one?
                </h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>
                    <strong className="text-slate-900 font-semibold">Already have a domain?</strong> We can connect your existing domain name to your new website with simple DNS records.
                  </p>
                  <p>
                    <strong className="text-slate-900 font-semibold">Don&apos;t have one?</strong> We will assist you in selecting and setting up a clean domain name for your business.
                  </p>
                </div>
              </div>

              <div className="md:col-span-4 text-left md:text-right">
                <button
                  onClick={() => {
                    setIsGetStartedOpen(true);
                    setStep(1);
                    setFormSubmitted(false);
                  }}
                  className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-indigo-600 transition-colors"
                >
                  Ask About Domains
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FAQ */}
      <section id="faq" className="py-20 bg-slate-50/70 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-slate-600">
              Clear answers to help you understand our design and maintenance process.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  <span className="text-base pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                      activeFaq === idx ? 'transform rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. FINAL CTA */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider border border-indigo-500/30">
            Start Your Project
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto">
            Ready to Give Your Business a Better Online Presence?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s build a professional website that represents your business and gives your customers a clear place to learn more and get in touch.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setIsGetStartedOpen(true);
                setStep(1);
                setFormSubmitted(false);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-slate-900 bg-white hover:bg-indigo-50 shadow-lg hover:shadow-xl transition-all"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            <a
              href="#portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>

      {/* 16. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-indigo-400" />
                <span className="text-base font-bold text-white tracking-tight">
                  Buyer<span className="text-indigo-400">Radar</span>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Professional website design and ongoing management for local service businesses and hospitality.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Navigation</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#portfolio" className="hover:text-white transition-colors">Our Work</a></li>
                <li><a href="#process" className="hover:text-white transition-colors">Process</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Industries</h4>
              <ul className="space-y-2">
                <li><span>Restaurants & Dining</span></li>
                <li><span>Handyman & Home Repairs</span></li>
                <li><span>Residential Cleaning</span></li>
                <li><span>General Contractors</span></li>
                <li><span>Local Storefronts</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Portal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/admin/login" className="text-slate-500 hover:text-slate-300 transition-colors">
                    Client & Admin Sign In
                  </Link>
                </li>
                <li className="text-slate-500 pt-2">
                  Direct online communication & support.
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-850 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500">
            <p>&copy; {new Date().getFullYear()} BuyerRadar Agency. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <span className="hover:text-slate-400">Privacy Policy</span>
              <span className="hover:text-slate-400">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 17. ONBOARDING / GET STARTED MODAL */}
      {isGetStartedOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsGetStartedOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded">
                    Step {step} of 2 — Project Inquiry
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {step === 1 ? 'Tell Us About Your Business' : 'Contact Details'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {step === 1
                      ? 'Help us understand your business type and goals.'
                      : 'Where should we send your preliminary website preview?'}
                  </p>
                </div>

                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Apex Home Repairs, Bella Vista Cafe"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Industry *
                        </label>
                        <select
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
                        >
                          <option>Restaurant / Cafe</option>
                          <option>Handyman / Home Services</option>
                          <option>Cleaning Services</option>
                          <option>Contractor / Construction</option>
                          <option>Beauty / Wellness</option>
                          <option>Auto Services</option>
                          <option>Other Local Business</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          City & State *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Austin, TX"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Do you currently have an existing website?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, hasExistingWebsite: 'yes' })}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold border ${
                            formData.hasExistingWebsite === 'yes'
                              ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          Yes, redesign existing
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, hasExistingWebsite: 'no' })}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold border ${
                            formData.hasExistingWebsite === 'no'
                              ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          No, brand new site
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        disabled={!formData.businessName.trim() || !formData.city.trim()}
                        onClick={() => setStep(2)}
                        className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                      >
                        Continue to Step 2 &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. John Miller"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@yourbusiness.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    <div className="flex items-center space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-1/3 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.fullName.trim() || !formData.email.trim()}
                        className="w-2/3 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Inquiry Received!</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Thank you for submitting your details for <strong className="text-slate-900">{formData.businessName}</strong>. Our team will prepare a demonstration layout and email you shortly at <strong className="text-slate-900">{formData.email}</strong>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setIsGetStartedOpen(false)}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
