import React from 'react';
import { TemplateProps } from '../types';
import { Phone, Building2, Shield, CheckCircle, FileText, ArrowRight, Star, Briefcase } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

export default function TemplateC3_CommercialCleaning({ business, content, onOpenLeadModal }: TemplateProps) {
  const { name, phone, address, city, state, zip, rating, reviewCount, services, reviews } = business;

  const industriesServed = [
    'Corporate & Tech Offices',
    'Medical & Dental Clinics',
    'Retail Showrooms & Boutiques',
    'Financial & Legal Practices',
    'Fitness Studios & Gyms',
    'Educational & Daycare Centers'
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* Corporate Header */}
      <header className="border-b border-slate-200 sticky top-0 z-40 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-teal-400 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl text-slate-950 block">{name}</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Commercial Janitorial & Facility Care</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href={`tel:${phone}`} className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-slate-800">
              <Phone className="w-4 h-4 text-teal-600" />
              <span>{formatPhoneNumber(phone)}</span>
            </a>
            <button
              onClick={() => onOpenLeadModal?.()}
              className="px-5 py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-white text-sm font-bold transition-all shadow-sm"
            >
              Request Commercial Proposal
            </button>
          </div>
        </div>
      </header>

      {/* Hero: B2B Focus */}
      <section className="bg-slate-900 text-white py-20 lg:py-28 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-950 text-teal-300 text-xs font-bold border border-teal-800">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Commercial Cleaning Partner in {city}, {state}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            Dependable Janitorial & Facility Cleaning Services
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Professional day-porter and night janitorial contracts tailored to keep your facility pristine, compliant, and welcoming for employees and clients.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenLeadModal?.()}
              className="px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-base shadow-md transition-colors"
            >
              Request RFP / Facility Quote
            </button>
            <a
              href={`tel:${phone}`}
              className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-base transition-colors flex items-center justify-center gap-2 border border-slate-700"
            >
              <Phone className="w-4 h-4 text-teal-400" />
              <span>Call {formatPhoneNumber(phone)}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Industries Served Matrix */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Client Sectors</span>
            <h2 className="text-3xl font-black text-slate-950">Industries We Specialize In</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {industriesServed.map((ind, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-teal-600 shrink-0" />
                <span className="font-bold text-slate-900 text-sm">{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Services */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-slate-950 text-center mb-14">Facility Cleaning Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div key={svc.id} className="p-6 rounded-xl border border-slate-200 hover:border-teal-500 transition-all flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{svc.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{svc.description}</p>
                </div>
                <button
                  onClick={() => onOpenLeadModal?.(svc.name)}
                  className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 text-xs font-bold transition-colors"
                >
                  Inquire For Facility
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <div className="font-bold text-white text-sm">{name} Commercial Services</div>
            <div>Serving {city}, {state} facilities</div>
          </div>
          <div>{address} • {formatPhoneNumber(phone)}</div>
        </div>
      </footer>
    </div>
  );
}
