import React from 'react';
import { TemplateProps } from '../types';
import { Phone, MapPin, Clock, Star, CheckCircle, ArrowRight, ShieldCheck, Wrench, Hammer, Check } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function TemplateH1_LocalPro({ business, content, onOpenLeadModal }: TemplateProps) {
  const { name, phone, address, city, state, zip, hours, rating, reviewCount, photos, services, reviews, serviceAreas } = business;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Serving {city}, {state} & Surrounding Communities
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Direct Local Contractor
            </span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call: {formatPhoneNumber(phone)}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-emerald-400 font-bold text-lg shadow-sm">
              <Hammer className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-black tracking-tight text-xl text-slate-900 leading-tight">
                {name}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Home Repairs & Handyman
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-slate-900 transition-colors">Services</a>
            <a href="#about" className="hover:text-slate-900 transition-colors">About Us</a>
            <a href="#gallery" className="hover:text-slate-900 transition-colors">Recent Work</a>
            <a href="#reviews" className="hover:text-slate-900 transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenLeadModal?.()}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{rating} Star Rated Local Contractor in {city}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
              {content.headline}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              {content.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onOpenLeadModal?.()}
                className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all text-center"
              >
                {content.primaryCta}
              </button>
              <a
                href={`tel:${phone}`}
                className="px-6 py-3.5 rounded-xl bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-900 font-semibold text-base transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call {formatPhoneNumber(phone)}</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 max-w-lg">
              <div>
                <div className="text-2xl font-black text-slate-900">{reviewCount}+</div>
                <div className="text-xs text-slate-500 font-medium">Satisfied Neighbors</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">Upfront</div>
                <div className="text-xs text-slate-500 font-medium">Clear Pricing</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">100%</div>
                <div className="text-xs text-slate-500 font-medium">Reliable Scheduling</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] lg:aspect-[5/6] bg-slate-100">
              <img
                src={photos.hero}
                alt={name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase text-slate-400">Trusted Local Service</div>
                    <div className="text-sm font-bold text-slate-900">Fast, Clean & On-Budget Repairs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/50">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Popular Handyman Services
            </h2>
            <p className="text-slate-600">
              Quality maintenance and repair work done right the first time. No job is too small.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="group bg-slate-50 hover:bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-slate-300 transition-all hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-colors shadow-sm">
                      <Wrench className="w-6 h-6" />
                    </div>
                    {svc.badge && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                        {svc.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 mb-2">
                    {svc.name}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {svc.description}
                  </p>
                </div>

                <button
                  onClick={() => onOpenLeadModal?.(svc.name)}
                  className="w-full py-2.5 px-4 rounded-lg bg-white group-hover:bg-slate-950 text-slate-800 group-hover:text-white border border-slate-200 group-hover:border-slate-950 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Request Quote for This</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full">
              Our Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Why Homeowners Depend on Us
            </h2>
            <p className="text-slate-400">
              Clear commitments and respectful service from initial call to final cleanup.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.whyChooseUs.map((item, idx) => (
              <div key={idx} className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Work Gallery */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/50">
                Recent Projects
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-2">
                Quality Work in Every Corner
              </h2>
            </div>
            <button
              onClick={() => onOpenLeadModal?.()}
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Have a repair project? Get an estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {photos.gallery.slice(0, 4).map((img, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden aspect-square bg-slate-100 shadow-sm">
                <img
                  src={img}
                  alt={`Project ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      {serviceAreas && serviceAreas.length > 0 && (
        <section className="py-14 bg-slate-50 border-y border-slate-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Service Areas in {city}, {state}
            </h3>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              {content.serviceAreaSummary}
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {serviceAreas.map((area, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs"
                >
                  📍 {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Verified Reviews */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/50">
              Verified Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Real Customer Experiences
            </h2>
            <div className="flex items-center justify-center gap-2 text-slate-600 text-sm">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-900">{rating} out of 5</span>
              <span>based on {reviewCount} local reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-7 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-400 gap-1 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm italic leading-relaxed mb-6">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{rev.author}</div>
                    <div className="text-xs text-slate-500">{rev.date}</div>
                  </div>
                  {rev.serviceOrDish && (
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded">
                      {rev.serviceOrDish}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl font-black text-slate-950">Frequently Asked Questions</h2>
            <p className="text-slate-600 text-sm">Everything you need to know about scheduling and our work.</p>
          </div>

          <div className="space-y-4">
            {content.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-2xs">
                <h3 className="text-base font-bold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA Banner */}
      <section id="contact" className="py-16 bg-emerald-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Ready to Get Your Project Fixed?</h2>
            <p className="text-emerald-100 text-sm mt-1">Get an upfront, honest quote from your local handyman in {city}.</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onOpenLeadModal?.()}
              className="px-6 py-3.5 rounded-xl bg-white text-emerald-900 font-bold text-sm shadow-md hover:bg-emerald-50 transition-colors"
            >
              Request Free Quote
            </button>
            <a
              href={`tel:${phone}`}
              className="px-6 py-3.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold text-sm border border-emerald-600 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>{formatPhoneNumber(phone)}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-black text-base text-white mb-2">{name}</div>
            <p className="text-slate-400 mb-4 max-w-xs">{content.subheadline}</p>
            <div className="text-slate-500">© {new Date().getFullYear()} {name}. All rights reserved.</div>
          </div>
          <div>
            <div className="font-bold text-slate-200 text-sm mb-3">Service Hours</div>
            <div className="space-y-1">
              {Object.entries(hours).map(([d, h]) => (
                <div key={d} className="flex justify-between max-w-xs">
                  <span>{d}</span>
                  <span className="text-slate-200">{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold text-slate-200 text-sm mb-3">Contact & Location</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{address}, {city}, {state} {zip}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{formatPhoneNumber(phone)}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
