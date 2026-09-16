import React from 'react';
import { TemplateProps } from '../types';
import { Phone, MapPin, Star, ArrowRight, CheckCircle2, Calendar, ClipboardCheck, Ruler, Sparkles } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function TemplateH2_ProjectFocused({ business, content, onOpenLeadModal }: TemplateProps) {
  const { name, phone, address, city, state, zip, hours, rating, reviewCount, photos, services, reviews, serviceAreas } = business;

  const projectSteps = [
    {
      step: '01',
      title: 'Consultation & Scope',
      desc: 'We discuss your project goals, take accurate measurements, and inspect the existing condition.',
      icon: Ruler
    },
    {
      step: '02',
      title: 'Transparent Proposal',
      desc: 'You receive a detailed, itemized plan with realistic timelines and clear material specifications.',
      icon: ClipboardCheck
    },
    {
      step: '03',
      title: 'Craftsmanship & Execution',
      desc: 'We protect your home, work cleanly and methodically, and keep you updated at every stage.',
      icon: Calendar
    },
    {
      step: '04',
      title: 'Final Walkthrough',
      desc: 'We inspect every detail together to ensure the finished work meets our exacting standards.',
      icon: Sparkles
    }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased">
      {/* Header */}
      <header className="border-b border-zinc-200 sticky top-0 z-40 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold tracking-tight text-zinc-950 block">
              {name}
            </span>
            <span className="text-xs text-amber-600 font-semibold tracking-wide uppercase">
              Residential Remodeling & Projects
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#projects" className="hover:text-zinc-950">Featured Projects</a>
            <a href="#services" className="hover:text-zinc-950">Capabilities</a>
            <a href="#process" className="hover:text-zinc-950">How It Works</a>
            <a href="#reviews" className="hover:text-zinc-950">Testimonials</a>
            <a href="#contact" className="hover:text-zinc-950">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href={`tel:${phone}`} className="hidden lg:flex items-center gap-1.5 text-sm font-bold text-zinc-800">
              <Phone className="w-4 h-4 text-amber-600" />
              <span>{formatPhoneNumber(phone)}</span>
            </a>
            <button
              onClick={() => onOpenLeadModal?.()}
              className="px-5 py-2.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-semibold transition-all shadow-sm"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </header>

      {/* Hero: Large Project Photography */}
      <section className="relative bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={photos.hero}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Specialized Project Contractor in {city}, {state}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Transforming Homes with Meticulous Craftsmanship
            </h1>

            <p className="text-lg text-zinc-300 max-w-2xl leading-relaxed">
              {business.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => onOpenLeadModal?.()}
                className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-base transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#projects"
                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-sm border border-white/20 transition-all text-center"
              >
                View Project Gallery
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects / Before-After style visual showcase */}
      <section id="projects" className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Portfolio of Work</span>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 mt-2">
              Featured Remodeling & Carpentry Projects
            </h2>
            <p className="text-zinc-600 mt-3 text-base">
              Explore completed residential transformations across {city}. We focus on precision, durability, and clean architectural lines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {photos.gallery.slice(0, 4).map((img, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-sm group">
                <div className="aspect-[16/10] overflow-hidden bg-zinc-100 relative">
                  <img
                    src={img}
                    alt={`Project ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-zinc-950/80 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                    Project #{idx + 1}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">
                    {services[idx % services.length]?.name || 'Custom Home Enhancement'}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                    {services[idx % services.length]?.description || 'Custom build and installation executed on time with premium materials and finish.'}
                  </p>
                  <button
                    onClick={() => onOpenLeadModal?.(services[idx % services.length]?.name)}
                    className="text-amber-600 hover:text-amber-700 text-sm font-bold flex items-center gap-1"
                  >
                    <span>Request Similar Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Core Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 mt-2">Comprehensive Project Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div key={svc.id} className="p-6 rounded-xl border border-zinc-200 hover:border-amber-500/60 transition-colors">
                <h3 className="text-lg font-bold text-zinc-950 mb-2">{svc.name}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed mb-4">{svc.description}</p>
                <button
                  onClick={() => onOpenLeadModal?.(svc.name)}
                  className="text-xs font-bold text-zinc-900 hover:text-amber-600 flex items-center gap-1"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="py-24 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Structured Process</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">How We Execute Your Project</h2>
            <p className="text-zinc-400 mt-2">No guesswork. A predictable, organized approach from estimate to completion.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="bg-zinc-800/60 border border-zinc-700 p-6 rounded-2xl relative">
                  <div className="text-4xl font-black text-zinc-700 mb-4">{step.step}</div>
                  <Icon className="w-6 h-6 text-amber-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Client Feedback</span>
              <h2 className="text-3xl font-black text-zinc-950 mt-2">What Homeowners Say</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
              </div>
              <span className="font-bold text-zinc-900">{rating} Rating ({reviewCount} Projects)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r) => (
              <div key={r.id} className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                <p className="text-zinc-700 text-sm leading-relaxed mb-6 italic">"{r.comment}"</p>
                <div className="font-bold text-zinc-950 text-sm">{r.author}</div>
                <div className="text-xs text-zinc-500">{r.serviceOrDish}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section id="contact" className="py-20 bg-zinc-100 border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl font-black text-zinc-950">Let's Discuss Your Upcoming Project</h2>
          <p className="text-zinc-600 max-w-xl mx-auto">
            Contact us today for an initial consultation and structured estimate for your home in {city}.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => onOpenLeadModal?.()}
              className="px-8 py-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-base transition-colors"
            >
              Start Your Project
            </button>
            <a
              href={`tel:${phone}`}
              className="px-8 py-4 rounded-xl bg-white border border-zinc-300 text-zinc-950 font-bold text-base hover:bg-zinc-50 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>{formatPhoneNumber(phone)}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="font-bold text-white text-base mb-1">{name}</div>
            <div className="text-zinc-500">© {new Date().getFullYear()} {name}. All rights reserved.</div>
          </div>
          <div>
            <div className="text-zinc-300 font-semibold mb-1">Serving {city}, {state} and surrounding areas</div>
            <div>{address}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
