import { NormalizedBusiness, GeneratedContent } from './types';

export function generateIndustryContent(business: NormalizedBusiness): GeneratedContent {
  const { name, city, state, industry, category, description, services = [] } = business;
  const locationStr = city && state ? `${city}, ${state}` : city || 'your local area';
  const serviceNames = services.slice(0, 4).map(s => s.name).join(', ');

  if (industry === 'handyman') {
    return {
      headline: `Reliable Home Repairs & Maintenance in ${locationStr}`,
      subheadline: description || `Professional handyman services for homeowners and property managers throughout ${locationStr}. Prompt service, quality craftsmanship, and clear communication.`,
      primaryCta: 'Request a Free Quote',
      secondaryCta: 'Call Now',
      aboutStory: `${name} provides dependable repair, maintenance, and improvement services in ${locationStr}. We focus on doing the job right the first time, respecting your home, and delivering honest, upfront service without hassle.`,
      whyChooseUs: [
        {
          title: 'Clear Communication',
          desc: 'We arrive on time, explain the work clearly, and keep you informed every step of the way.',
        },
        {
          title: 'Quality Workmanship',
          desc: 'Careful attention to detail on every repair, installation, and improvement project.',
        },
        {
          title: 'Clean & Respectful',
          desc: 'We treat your home with care, lay down floor protection, and leave the workspace spotless.',
        },
        {
          title: 'Straightforward Service',
          desc: 'Transparent quotes with no surprise hidden fees before work begins.',
        },
      ],
      faqs: [
        {
          question: `What types of repairs do you handle in ${city || 'our area'}?`,
          answer: services.length > 0
            ? `We regularly handle ${serviceNames}, and a variety of other household repairs and installations.`
            : `We handle a wide range of residential repairs, carpentry, fixture replacements, drywall patching, and general maintenance. Contact us with details on your project!`,
        },
        {
          question: 'How do you quote projects?',
          answer: 'We review your project requirements, assess photos or visit on-site if needed, and provide an upfront quote before starting any work.',
        },
        {
          question: 'Do I need to supply the materials?',
          answer: 'You can supply your own fixtures (such as ceiling fans, faucets, or shelving) or we can source standard repair materials for you.',
        },
        {
          question: 'How quickly can you schedule service?',
          answer: 'We schedule work based on current availability. Contact us today or submit your request to confirm the next open service window.',
        },
      ],
      serviceAreaSummary: `Proudly serving homeowners, landlords, and businesses throughout ${locationStr} and neighboring communities.`,
      metaTitle: `${name} | Handyman & Home Repairs in ${locationStr}`,
      metaDescription: `Dependable handyman services in ${locationStr}. Experienced home maintenance, repairs, and installations. Contact ${name} for a free quote.`,
    };
  }

  if (industry === 'cleaning') {
    return {
      headline: `Spotless Cleaning Services in ${locationStr}`,
      subheadline: description || `Dedicated professional cleaning services tailored for homes and businesses across ${locationStr}. Enjoy a fresh, thoroughly cleaned space without lifting a finger.`,
      primaryCta: 'Get a Free Quote',
      secondaryCta: 'View Cleaning Services',
      aboutStory: `At ${name}, we take pride in delivering meticulous cleaning for our clients in ${locationStr}. Whether you need regular recurring upkeep, a deep clean, or specialized facility care, our dedicated team brings thorough standards to every visit.`,
      whyChooseUs: [
        {
          title: 'Detail-Oriented Cleaning',
          desc: 'Every surface, baseboard, and corner receives attentive, thorough care.',
        },
        {
          title: 'Customized Cleaning Plans',
          desc: 'Flexible scheduling designed around your lifestyle, home layout, or business hours.',
        },
        {
          title: 'Trusted & Professional',
          desc: 'Reliable, punctual, and respectful cleaners who treat your property like their own.',
        },
        {
          title: 'Consistent Quality',
          desc: 'Structured checklists ensure your space receives the same high standard every clean.',
        },
      ],
      faqs: [
        {
          question: 'Do you provide all cleaning supplies and equipment?',
          answer: 'Yes, we bring our own professional-grade supplies and equipment. If you prefer specific products used in your home, let us know and we are happy to accommodate.',
        },
        {
          question: 'How frequently can I schedule recurring cleaning?',
          answer: 'We offer weekly, bi-weekly, monthly, or one-time cleanings depending on your household or facility needs.',
        },
        {
          question: 'Do I need to be home during the cleaning?',
          answer: 'Not at all! Many clients provide key or code access. We treat your property with complete respect and lock up securely when finished.',
        },
        {
          question: `Which neighborhoods in ${locationStr} do you service?`,
          answer: `We serve clients throughout ${locationStr} and surrounding areas. Contact us with your zip code to confirm prompt availability.`,
        },
      ],
      serviceAreaSummary: `Available across ${locationStr} and surrounding neighborhoods for residential and commercial cleaning appointments.`,
      metaTitle: `${name} | Professional Cleaning in ${locationStr}`,
      metaDescription: `Top-rated residential and commercial cleaning in ${locationStr}. Discover reliable, detail-oriented cleaning services from ${name}. Request a quote today.`,
    };
  }

  // Restaurant
  return {
    headline: `Handcrafted Flavors & Welcoming Dining in ${locationStr}`,
    subheadline: description || `Fresh ingredients, authentic recipes, and warm hospitality in the heart of ${locationStr}. Dine in with us, order takeout, or cater your next gathering.`,
    primaryCta: 'View Menu',
    secondaryCta: 'Reserve a Table',
    aboutStory: `Welcome to ${name}! We are passionate about bringing vibrant flavors and genuine hospitality to ${locationStr}. Every dish is prepared with fresh ingredients, time-tested recipes, and a passion for good food enjoyed among good company.`,
    whyChooseUs: [
      {
        title: 'Fresh, Quality Ingredients',
        desc: 'Carefully chosen produce and meats sourced to elevate every flavor on the plate.',
      },
      {
        title: 'Crafted with Care',
        desc: 'From our kitchen to your table, each recipe is prepared from scratch with culinary pride.',
      },
      {
        title: 'Warm Hospitality',
        desc: 'A relaxed, inviting environment whether you are catching up with friends or celebrating a milestone.',
      },
      {
        title: 'Takeout & Catering',
        desc: 'Enjoy your favorites at home or let us cater your special event with ease.',
      },
    ],
    faqs: [
      {
        question: 'Do you take reservations or walk-ins?',
        answer: 'We gladly welcome walk-in guests! For larger parties or weekend evenings, reservations are recommended to minimize your wait time.',
      },
      {
        question: 'Can I order online for pickup or takeout?',
        answer: 'Yes, you can order ahead for convenient curbside or counter pickup during kitchen operating hours.',
      },
      {
        question: 'Do you cater private events or office lunches?',
        answer: 'We offer custom catering platters and packages for corporate lunches, birthdays, and private parties. Contact us for details.',
      },
      {
        question: 'Are there dietary accommodations available?',
        answer: 'Our menu features items clearly marked for vegetarian and gluten-conscious preferences. Please inform our staff of any food allergies.',
      },
    ],
    serviceAreaSummary: `Conveniently located at ${business.address || 'our dining room'} in ${locationStr}.`,
    metaTitle: `${name} | Fresh Dining & Takeout in ${locationStr}`,
    metaDescription: `Experience flavorful dining at ${name} in ${locationStr}. Fresh menus, convenient takeout, and friendly hospitality. View our menu and visit today.`,
  };
}
