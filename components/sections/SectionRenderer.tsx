import React from 'react';
import { SectionComponentProps } from './types';

// Heroes
import HeroA from './heroes/HeroA';
import HeroB from './heroes/HeroB';
import HeroC from './heroes/HeroC';
import HeroD from './heroes/HeroD';
import HeroE from './heroes/HeroE';

// Services
import ServicesA from './services/ServicesA';
import ServicesB from './services/ServicesB';
import ServicesC from './services/ServicesC';
import ServicesD from './services/ServicesD';

// About
import AboutA from './about/AboutA';
import AboutB from './about/AboutB';
import AboutC from './about/AboutC';

// Gallery
import GalleryA from './gallery/GalleryA';
import GalleryB from './gallery/GalleryB';
import GalleryC from './gallery/GalleryC';

// Reviews
import ReviewsA from './reviews/ReviewsA';
import ReviewsB from './reviews/ReviewsB';
import ReviewsC from './reviews/ReviewsC';

// FAQ
import FAQA from './faq/FAQA';
import FAQB from './faq/FAQB';

// CTA
import CTAA from './cta/CTAA';
import CTAB from './cta/CTAB';
import CTAC from './cta/CTAC';

// Contact
import ContactA from './contact/ContactA';
import ContactB from './contact/ContactB';

// Menu
import MenuA from './menu/MenuA';
import MenuB from './menu/MenuB';
import MenuC from './menu/MenuC';

export const SECTION_COMPONENTS: Record<string, React.ComponentType<SectionComponentProps>> = {
  // Hero variants
  HeroA,
  HeroB,
  HeroC,
  HeroD,
  HeroE,

  // Services variants
  ServicesA,
  ServicesB,
  ServicesC,
  ServicesD,

  // About variants
  AboutA,
  AboutB,
  AboutC,

  // Gallery variants
  GalleryA,
  GalleryB,
  GalleryC,

  // Reviews variants
  ReviewsA,
  ReviewsB,
  ReviewsC,

  // FAQ variants
  FAQA,
  FAQB,

  // CTA variants
  CTAA,
  CTAB,
  CTAC,

  // Contact variants
  ContactA,
  ContactB,

  // Menu variants
  MenuA,
  MenuB,
  MenuC,
};

export default function SectionRenderer(props: SectionComponentProps) {
  const { section } = props;
  if (!section.visible) return null;

  const Component = SECTION_COMPONENTS[section.variant] || SECTION_COMPONENTS[`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}A`];

  if (!Component) {
    console.warn(`Section variant not found: ${section.variant} (${section.type})`);
    return null;
  }

  return <Component {...props} />;
}
