import React from 'react';
import { SectionComponentProps } from '../types';
import { Heart, MapPin, Users, Star } from 'lucide-react';

export default function AboutC({ section, business, theme }: SectionComponentProps) {
  const { content } = section;
  const image = content.image || business.photos.about || business.photos.hero;

  return (
    <section id="about" className="py-20 bg-white text-stone-900 border-y border-amber-100 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 rounded-full text-xs font-bold border border-amber-200/60">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Locally Rooted in {business.city}, {business.state}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-950">
            {content.heading || 'A Neighborhood Tradition'}
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {content.story || business.description}
          </p>
        </div>

        {/* Community Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-white text-amber-800 flex items-center justify-center mx-auto shadow-xs font-bold">
              <MapPin className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-sm text-stone-950">Neighborhood Focused</h3>
            <p className="text-xs text-stone-600">Proudly based right here in {business.city}, dedicated to our local community.</p>
          </div>

          <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-white text-amber-800 flex items-center justify-center mx-auto shadow-xs font-bold">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            </div>
            <h3 className="font-bold text-sm text-stone-950">{business.rating} Star Reputation</h3>
            <p className="text-xs text-stone-600">Backed by {business.reviewCount} verified reviews and years of client word-of-mouth.</p>
          </div>

          <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-white text-amber-800 flex items-center justify-center mx-auto shadow-xs font-bold">
              <Users className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="font-bold text-sm text-stone-950">Attentive Communication</h3>
            <p className="text-xs text-stone-600">Direct phone call access and prompt replies on every quote or reservation inquiry.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
