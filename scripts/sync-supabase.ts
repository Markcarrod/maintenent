import { PrismaClient } from '@prisma/client';
import { INITIAL_LEADS } from '../lib/seed-data';
import { buildStructuredWebsite } from '../lib/template-compositions';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting Supabase Database Migration & Seed...');

  for (const b of INITIAL_LEADS) {
    console.log('Syncing business:', b.name, b.slug);

    const business = await prisma.business.upsert({
      where: { slug: b.slug },
      update: {
        name: b.name,
        industry: b.industry,
        restaurantCategory: b.restaurantCategory || null,
        cuisine: b.cuisine || null,
        category: b.category,
        description: b.description,
        tagline: b.tagline || null,
        phone: b.phone,
        email: b.email,
        address: b.address,
        city: b.city,
        state: b.state,
        zip: b.zip,
        hours: JSON.stringify(b.hours),
        rating: b.rating,
        reviewCount: b.reviewCount,
        reviews: JSON.stringify(b.reviews || []),
        photos: JSON.stringify(b.photos),
        services: JSON.stringify(b.services || []),
        menu: b.menu ? JSON.stringify(b.menu) : null,
        menuCategories: b.menuCategories ? JSON.stringify(b.menuCategories) : null,
        orderUrl: b.orderUrl || null,
        reservationUrl: b.reservationUrl || null,
        instagramUrl: b.instagramUrl || null,
        currency: b.currency || 'USD',
        facebookUrl: b.facebookUrl || null,
        googleMapsUrl: b.googleMapsUrl || null,
        templateId: b.templateId || 'H1',
      },
      create: {
        id: b.id,
        slug: b.slug,
        name: b.name,
        industry: b.industry,
        restaurantCategory: b.restaurantCategory || null,
        cuisine: b.cuisine || null,
        category: b.category,
        description: b.description,
        tagline: b.tagline || null,
        phone: b.phone,
        email: b.email,
        address: b.address,
        city: b.city,
        state: b.state,
        zip: b.zip,
        hours: JSON.stringify(b.hours),
        rating: b.rating,
        reviewCount: b.reviewCount,
        reviews: JSON.stringify(b.reviews || []),
        photos: JSON.stringify(b.photos),
        services: JSON.stringify(b.services || []),
        menu: b.menu ? JSON.stringify(b.menu) : null,
        menuCategories: b.menuCategories ? JSON.stringify(b.menuCategories) : null,
        orderUrl: b.orderUrl || null,
        reservationUrl: b.reservationUrl || null,
        instagramUrl: b.instagramUrl || null,
        currency: b.currency || 'USD',
        facebookUrl: b.facebookUrl || null,
        googleMapsUrl: b.googleMapsUrl || null,
        templateId: b.templateId || 'H1',
      },
    });

    // Seed preview record
    await prisma.preview.upsert({
      where: { businessId: business.id },
      update: {},
      create: {
        businessId: business.id,
        status: 'PREVIEW_ACTIVE',
        viewCount: 0,
        dmStatus: 'NOT_CONTACTED',
      },
    });

    // Seed structured website
    const structured = buildStructuredWebsite(b);
    await prisma.structuredWebsite.upsert({
      where: { businessId: business.id },
      update: {
        data: JSON.stringify(structured),
      },
      create: {
        businessId: business.id,
        data: JSON.stringify(structured),
      },
    });
  }

  console.log('✅ Successfully seeded all businesses, previews, and websites to Supabase!');
}

main()
  .catch((e) => {
    console.error('❌ Error during Supabase sync:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

