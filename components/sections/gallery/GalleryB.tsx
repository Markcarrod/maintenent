import React from 'react';
import { SectionComponentProps } from '../types';
import { ArrowRight } from 'lucide-react';

export default function GalleryB({ section, business, theme, onOpenLeadModal }: SectionComponentProps) {
  const { content } = section;
  const images = content.images || business.photos.gallery || [];

  return (
    <section id="gallery" className="py-24 bg-zinc-50 text-zinc-950 border-t border-zinc-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-16">
          <span
            style={{ color: theme.primaryColor }}
            className="text-xs font-bold uppercase tracking-wider block mb-2"
          >
            Project Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-black">
            {content.heading || 'Featured Remodeling & Carpentry'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.slice(0, 4).map((img: string, idx: number) => (
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
                <h3 className="text-xl font-bold mb-2">Project Execution #{idx + 1}</h3>
                <p className="text-zinc-600 text-sm mb-4">
                  Custom build and installation executed with premium materials and clean craftsmanship.
                </p>
                <button
                  onClick={() => onOpenLeadModal?.()}
                  style={{ color: theme.primaryColor }}
                  className="text-sm font-bold flex items-center gap-1 hover:underline"
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
  );
}
