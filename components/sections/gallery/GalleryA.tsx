import React from 'react';
import { SectionComponentProps } from '../types';

export default function GalleryA({ section, business, theme }: SectionComponentProps) {
  const { content } = section;
  const images = content.images || business.photos.gallery || [];

  return (
    <section id="gallery" className="py-20 bg-white text-slate-900 border-t border-slate-100 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span
            style={{ color: theme.primaryColor }}
            className="text-xs font-bold uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full"
          >
            Portfolio & Projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-black">
            {content.heading || 'Recent Completed Work'}
          </h2>
          <p className="text-slate-600 text-sm">
            {content.subheading || `Quality results delivered across ${business.city}.`}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.slice(0, 4).map((img: string, idx: number) => (
            <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-slate-100 shadow-2xs group">
              <img
                src={img}
                alt={`Project ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
