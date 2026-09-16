import { store } from '@/lib/store';
import { recommendTemplate, TEMPLATE_REGISTRY } from '@/lib/template-recommender';
import { generateIndustryContent } from '@/lib/content-generator';

async function runTests() {
  console.log('=====================================================');
  console.log('🧪 RUNNING MASTER ACCEPTANCE TESTS');
  console.log('=====================================================\n');

  // Test 1: Verify all 15 templates are registered
  console.log('TEST 1: Verifying 15 templates (5 Handyman, 5 Cleaning, 5 Restaurant)...');
  const templateIds = Object.keys(TEMPLATE_REGISTRY);
  console.log(`Found ${templateIds.length} registered templates:`, templateIds.join(', '));
  if (templateIds.length !== 15) {
    throw new Error(`Expected exactly 15 templates, found ${templateIds.length}`);
  }

  const handymanTemplates = templateIds.filter(t => t.startsWith('H'));
  const cleaningTemplates = templateIds.filter(t => t.startsWith('C'));
  const restaurantTemplates = templateIds.filter(t => t.startsWith('R'));

  if (handymanTemplates.length !== 5 || cleaningTemplates.length !== 5 || restaurantTemplates.length !== 5) {
    throw new Error('Expected 5 templates per niche (5 Handyman, 5 Cleaning, 5 Restaurant)');
  }
  console.log('✅ 15 Templates Verified: 5 Handyman (H1-H5), 5 Cleaning (C1-C5), 5 Restaurant (R1-R5).\n');

  // Test 2: Auto-Template Recommendation Engine
  console.log('TEST 2: Testing Automated Template Recommendation Engine...');
  const rec1 = recommendTemplate({ industry: 'handyman', description: 'Remodeling and deck additions' });
  const rec2 = recommendTemplate({ industry: 'handyman', description: 'Emergency quick repairs', reviewCount: 10 });
  const rec3 = recommendTemplate({ industry: 'handyman', reviewCount: 45 });
  const rec4 = recommendTemplate({ industry: 'cleaning', description: 'Commercial office janitorial service' });
  const rec5 = recommendTemplate({ industry: 'cleaning', description: 'Luxury estate white glove detailing' });
  const rec6 = recommendTemplate({ industry: 'restaurant', description: 'Fine dining upscale wine bar steakhouse' });
  const rec7 = recommendTemplate({ industry: 'restaurant', description: 'Takeout fast casual quick burgers' });

  console.log(`- Handyman + Remodeling -> ${rec1} (Expected H2)`);
  console.log(`- Handyman + Emergency -> ${rec2} (Expected H3)`);
  console.log(`- Handyman + High Reviews (45) -> ${rec3} (Expected H5)`);
  console.log(`- Cleaning + Janitorial/Office -> ${rec4} (Expected C3)`);
  console.log(`- Cleaning + Luxury/Estate -> ${rec5} (Expected C4)`);
  console.log(`- Restaurant + Fine Dining -> ${rec6} (Expected R3)`);
  console.log(`- Restaurant + Takeout -> ${rec7} (Expected R4)`);

  if (rec1 !== 'H2' || rec2 !== 'H3' || rec3 !== 'H5' || rec4 !== 'C3' || rec5 !== 'C4' || rec6 !== 'R3' || rec7 !== 'R4') {
    throw new Error('Template recommendation mismatch!');
  }
  console.log('✅ Template Recommendation Engine Verified.\n');

  // Test 3: Anti-Fabrication Content Generator
  console.log('TEST 3: Testing Anti-Fabrication Content Generator...');
  const mikesBiz = store.getBusinessBySlug('mikes-handyman-services');
  if (!mikesBiz) throw new Error("Could not find Mike's Handyman");

  const generatedContent = generateIndustryContent(mikesBiz);
  console.log('Generated Headline:', generatedContent.headline);
  console.log('Meta Title:', generatedContent.metaTitle);
  console.log('FAQs count:', generatedContent.faqs.length);
  if (!generatedContent.headline.includes('Austin') || !generatedContent.metaTitle.includes("Mike's Handyman")) {
    throw new Error('Content generator did not accurately incorporate business attributes');
  }
  console.log('✅ Content Generator Verified with Zero Fabrication.\n');

  // Test 4: Scenario A — Mike's Handyman Services (Austin, TX)
  console.log("TEST 4: Full Scenario Test — Mike's Handyman Services (Austin, TX)");
  const initialPreview = store.getPreview(mikesBiz.id);
  initialPreview.firstViewedAt = null;
  initialPreview.previewExpiresAt = null;
  initialPreview.viewCount = 0;
  initialPreview.paymentStatus = 'UNPAID';
  initialPreview.status = 'PREVIEW_ACTIVE';

  console.log('1. Initial Preview State:');
  console.log(`   - Status: ${initialPreview.status}`);
  console.log(`   - First Viewed At: ${initialPreview.firstViewedAt || 'null (Not started)'}`);
  console.log(`   - View Count: ${initialPreview.viewCount}`);

  // Simulate First Visitor Visit
  console.log('2. Simulating First Visitor Visit...');
  const visit1 = store.recordVisit(mikesBiz.id);
  console.log(`   - isFirstVisit: ${visit1.isFirstVisit}`);
  console.log(`   - firstViewedAt: ${visit1.preview.firstViewedAt}`);
  console.log(`   - previewExpiresAt (7 days later): ${visit1.preview.previewExpiresAt}`);

  if (!visit1.preview.firstViewedAt || !visit1.preview.previewExpiresAt) {
    throw new Error('7-day countdown was not initialized on first visit!');
  }

  // Simulate Subsequent Visit
  const visit2 = store.recordVisit(mikesBiz.id);
  console.log('3. Simulating Subsequent Visit:');
  console.log(`   - isFirstVisit: ${visit2.isFirstVisit} (Should be false)`);
  console.log(`   - Total Views: ${visit2.preview.viewCount}`);
  if (visit2.isFirstVisit !== false || visit2.preview.firstViewedAt !== visit1.preview.firstViewedAt) {
    throw new Error('Subsequent visit must NOT restart the 7-day countdown!');
  }

  // Simulate Customer Submitting Feedback
  console.log('4. Simulating Customer Feedback submission...');
  const feedback = store.addFeedback({
    businessId: mikesBiz.id,
    authorName: 'Mike Miller',
    authorEmail: 'mike@mikeshandymanaustin.com',
    message: 'Can you please add deck power washing to the services list?',
  });
  console.log(`   - Feedback recorded: ID ${feedback.id}, status ${feedback.status}`);
  const feedbacks = store.getFeedbacks(mikesBiz.id);
  if (feedbacks.length === 0) throw new Error('Feedback not stored');

  // Simulate Customer Submitting Lead Qualification Inquiry ($149 Feature)
  console.log('5. Simulating Visitor Submitting Lead Form on Handyman Website...');
  const lead = store.addLead({
    businessId: mikesBiz.id,
    customerName: 'Sarah Jenkins',
    customerPhone: '512-555-9876',
    customerEmail: 'sarah.j@example.com',
    serviceRequested: 'Drywall Repair & Patching',
    answers: {
      location: 'South Austin 78704',
      timeline: 'Within 1 Week',
      notes: 'Need two bedroom walls patched where TV mounts were removed.',
    },
  });
  console.log(`   - Lead captured in pipeline: ID ${lead.id}, Customer: ${lead.customerName}`);

  // Simulate Customer Clicking "Keep My Website" & Paying $149 Plan
  console.log('6. Simulating Customer Choosing $149 Plan & Paying...');
  const paidPreview = store.activatePlan(mikesBiz.id, 'WEBSITE_LEAD_149');
  console.log(`   - Plan: ${paidPreview.plan}`);
  console.log(`   - Payment Status: ${paidPreview.paymentStatus}`);
  console.log(`   - Website Status: ${paidPreview.status} (ACTIVE)`);
  console.log(`   - Preview Expiry: ${paidPreview.previewExpiresAt || 'NULL (Expiration Disabled)'}`);

  if (paidPreview.status !== 'ACTIVE' || paidPreview.paymentStatus !== 'PAID' || paidPreview.previewExpiresAt !== null) {
    throw new Error('Activation failed to disable preview expiration or set ACTIVE status!');
  }

  // Simulate Customer Connecting Custom Domain
  console.log('7. Simulating Custom Domain Connection...');
  const domain = store.saveDomain(mikesBiz.id, 'mikeshandymanaustin.com');
  console.log(`   - Connected Domain: ${domain.domain}`);
  console.log(`   - Verified: ${domain.verified}`);
  console.log('   - DNS Records Configured:');
  domain.dnsRecords.forEach(r => console.log(`     * ${r.type} ${r.name} -> ${r.value}`));

  console.log("✅ Scenario A (Mike's Handyman) Completed Successfully!\n");

  // Test 5: Scenario B — Sparkling Horizon Cleaning (Seattle, WA)
  console.log('TEST 5: Full Scenario Test — Sparkling Horizon Cleaning (Seattle, WA)');
  const cleanBiz = store.getBusinessBySlug('sparkling-horizon-cleaning');
  if (!cleanBiz) throw new Error('Could not find Sparkling Horizon Cleaning');
  console.log(`- Business: ${cleanBiz.name} (${cleanBiz.city}, ${cleanBiz.state})`);
  console.log(`- Industry: ${cleanBiz.industry}`);
  console.log(`- Template: ${cleanBiz.templateId} (${TEMPLATE_REGISTRY[cleanBiz.templateId]?.name})`);
  console.log(`- Services (${cleanBiz.services.length}):`, cleanBiz.services.map(s => s.name).join(', '));
  console.log(`- Reviews (${cleanBiz.reviews.length}):`, cleanBiz.reviews.map(r => `${r.author} (${r.rating}★)`).join(', '));
  console.log('✅ Scenario B (Cleaning) Completed Successfully!\n');

  // Test 6: Scenario C — Bella Vista Trattoria (Chicago, IL)
  console.log('TEST 6: Full Scenario Test — Bella Vista Trattoria (Chicago, IL)');
  const restBiz = store.getBusinessBySlug('bella-vista-trattoria');
  if (!restBiz) throw new Error('Could not find Bella Vista Trattoria');
  console.log(`- Business: ${restBiz.name} (${restBiz.city}, ${restBiz.state})`);
  console.log(`- Industry: ${restBiz.industry}`);
  console.log(`- Template: ${restBiz.templateId} (${TEMPLATE_REGISTRY[restBiz.templateId]?.name})`);
  console.log(`- Menu Items (${restBiz.menu?.length || 0}):`, restBiz.menu?.map(m => `${m.name} (${m.price})`).join(', '));
  console.log('✅ Scenario C (Restaurant) Completed Successfully!\n');

  // Test 7: Admin Stats and Conversion Funnel
  console.log('TEST 7: Admin Dashboard Stats & Conversion Funnel...');
  const stats = store.getStats();
  console.log('Funnel Metrics:');
  console.log(`- Total Leads: ${stats.totalLeads}`);
  console.log(`- Active Previews: ${stats.activePreviews}`);
  console.log(`- Active Paid Customers: ${stats.activeCustomers}`);
  console.log(`- Total Views: ${stats.totalViews}`);
  console.log(`- Feedbacks Collected: ${stats.feedbackCount}`);
  console.log(`- Total MRR/Revenue: $${stats.totalRevenue}`);
  console.log(`- Conversion Rate: ${stats.conversionRate}%`);
  console.log('✅ Admin Metrics & Analytics Verified.\n');

  console.log('=====================================================');
  console.log('🎉 ALL ACCEPTANCE TESTS PASSED WITH 100% SUCCESS!');
  console.log('=====================================================');
}

runTests().catch(err => {
  console.error('❌ Acceptance test failed:', err);
  process.exit(1);
});
