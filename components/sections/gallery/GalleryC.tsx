import React from 'react';
import { SectionComponentProps } from '../types';

export default function GalleryC({ section, business, theme }: SectionComponentProps) {
  const { content, settings } = section;
  const images = content.images || business.photos.gallery || [];
  const isDark = settings.backgroundStyle === 'dark';

  return (
    <section id="gallery" className={`py-24 font-serif scroll-mt-20 ${isDark ? 'bg-stone-950 text-white' : 'bg-white text-stone-900'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 font-sans">
          <span className="text-xs uppercase tracking-widest text-stone-400 font-bold block mb-2">Portfolio</span>
          <h2 className="font-serif text-3xl sm:text-4xl">Selected Work Gallery</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.slice(0, 3).map((img: string, idx: number) => (
            <div key={idx} className="aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 shadow-md">
              <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
