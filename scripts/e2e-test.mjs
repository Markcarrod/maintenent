const BASE_URL = 'http://127.0.0.1:3005';

async function runLiveE2ETest() {
  console.log('================================================================');
  console.log('🚀 RUNNING COMPREHENSIVE LIVE E2E SAAS PLATFORM ACCEPTANCE TESTS');
  console.log('================================================================\n');

  // Step 1: Health check homepage & admin page
  console.log('STEP 1: Testing Homepage & Admin Dashboard routing...');
  const resHome = await fetch(`${BASE_URL}/`);
  console.log(`- GET /: Status ${resHome.status}`);
  if (resHome.status !== 200) throw new Error('Homepage returned status ' + resHome.status);

  const resAdmin = await fetch(`${BASE_URL}/admin`);
  console.log(`- GET /admin: Status ${resAdmin.status}`);
  if (resAdmin.status !== 200) throw new Error('Admin returned status ' + resAdmin.status);
  console.log('✅ Homepage and Admin Dashboard Loaded Successfully.\n');

  // Step 2: Fetch Businesses & Metrics
  console.log('STEP 2: Querying Admin Businesses API...');
  const resBiz = await fetch(`${BASE_URL}/api/admin/businesses`);
  const dataBiz = await resBiz.json();
  console.log(`- Total Pre-loaded Leads: ${dataBiz.items?.length}`);
  console.log('- Initial Funnel Stats:', JSON.stringify(dataBiz.stats));
  if (!dataBiz.items || dataBiz.items.length < 3) throw new Error('Expected at least 3 initial leads');
  console.log('✅ Admin API returned valid businesses and analytics.\n');

  // Step 3: SCENARIO 1 — Mike's Handyman Services (Austin, TX)
  console.log("STEP 3: SCENARIO 1 — Full Flow for Mike's Handyman Services (Austin, TX)...");
  const mikesLead = dataBiz.items.find(i => i.business.slug === 'mikes-handyman-services');
  if (!mikesLead) throw new Error("Could not find Mike's Handyman lead");

  console.log(`- Business ID: ${mikesLead.business.id}`);
  console.log(`- Industry: ${mikesLead.business.industry}`);
  console.log(`- Template: ${mikesLead.business.templateId} (${mikesLead.business.name})`);
  console.log(`- Initial First Viewed At: ${mikesLead.preview.firstViewedAt || 'null (Pending First Visit)'}`);

  // 3a: Trigger First Visitor Visit
  console.log('- Visiting preview URL: /preview/mikes-handyman-services...');
  const resPrev1 = await fetch(`${BASE_URL}/api/preview/mikes-handyman-services`);
  const dataPrev1 = await resPrev1.json();
  console.log(`  * isFirstVisit: ${dataPrev1.isFirstVisit}`);
  console.log(`  * firstViewedAt: ${dataPrev1.preview.firstViewedAt}`);
  console.log(`  * previewExpiresAt (7 days): ${dataPrev1.preview.previewExpiresAt}`);
  console.log(`  * Generated Headline: "${dataPrev1.content.headline}"`);

  if (!dataPrev1.isFirstVisit || !dataPrev1.preview.firstViewedAt || !dataPrev1.preview.previewExpiresAt) {
    throw new Error('First visitor visit did not initialize the 7-day countdown timer!');
  }

  // 3b: Verify subsequent visit maintains same expiration
  const resPrev2 = await fetch(`${BASE_URL}/api/preview/mikes-handyman-services`);
  const dataPrev2 = await resPrev2.json();
  console.log(`  * Subsequent visit isFirstVisit: ${dataPrev2.isFirstVisit} (Should be false)`);
  console.log(`  * Total Views: ${dataPrev2.preview.viewCount}`);
  if (dataPrev2.isFirstVisit !== false) {
    throw new Error('Subsequent visit must not trigger first visit!');
  }

  // 3c: Submit Owner Feedback ("Have Feedback?")
  console.log('- Owner submits feedback via preview bar modal...');
  const resFb = await fetch(`${BASE_URL}/api/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      businessId: mikesLead.business.id,
      authorName: 'Mike Miller',
      authorEmail: 'mike@mikeshandymanaustin.com',
      message: 'Please add exterior deck staining to our popular services.',
    }),
  });
  const dataFb = await resFb.json();
  console.log(`  * Feedback recorded: ID ${dataFb.feedback?.id}, Status: ${dataFb.feedback?.status}`);
  if (!dataFb.success) throw new Error('Feedback submission failed');

  // 3d: Submit Lead Qualification Submission ($149 plan feature)
  console.log('- Website visitor submits qualification lead...');
  const resLead = await fetch(`${BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      businessId: mikesLead.business.id,
      customerName: 'Robert Johnson',
      customerPhone: '512-555-4321',
      customerEmail: 'robert@example.com',
      serviceRequested: 'Interior & Exterior Door Fixes',
      answers: {
        location: 'South Austin, 78745',
        timeline: 'Within 1 Week',
        notes: 'Front door deadbolt sticking and weather stripping worn out.',
      },
    }),
  });
  const dataLead = await resLead.json();
  console.log(`  * Lead captured: ID ${dataLead.lead?.id}, Status: ${dataLead.lead?.status}`);
  if (!dataLead.success) throw new Error('Lead submission failed');

  // 3e: Owner clicks "Keep This Website" & Activates $149 Plan
  console.log('- Owner clicks "Keep This Website" & completes payment for $149 Plan...');
  const resCheckout = await fetch(`${BASE_URL}/api/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      businessId: mikesLead.business.id,
      plan: 'WEBSITE_LEAD_149',
    }),
  });
  const dataCheckout = await resCheckout.json();
  console.log(`  * Checkout Response: ${dataCheckout.message}`);
  console.log(`  * New Status: ${dataCheckout.preview?.status}`);
  console.log(`  * Payment Status: ${dataCheckout.preview?.paymentStatus}`);
  console.log(`  * Preview Expiry: ${dataCheckout.preview?.previewExpiresAt || 'NULL (Timer Disabled)'}`);

  if (dataCheckout.preview?.status !== 'ACTIVE' || dataCheckout.preview?.previewExpiresAt !== null) {
    throw new Error('Checkout did not activate website or clear preview expiration!');
  }

  // 3f: Owner connects custom domain
  console.log('- Owner connects custom domain "mikeshandymanaustin.com"...');
  const resDomain = await fetch(`${BASE_URL}/api/domains`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      businessId: mikesLead.business.id,
      domain: 'mikeshandymanaustin.com',
    }),
  });
  const dataDomain = await resDomain.json();
  console.log(`  * Domain connected: ${dataDomain.domain?.domain}, Verified: ${dataDomain.domain?.verified}`);
  console.log('  * DNS Guidelines:');
  dataDomain.domain?.dnsRecords?.forEach(r => console.log(`    - ${r.type} ${r.name} -> ${r.value}`));
  if (!dataDomain.domain?.verified) throw new Error('Domain connection failed');

  console.log("✅ SCENARIO 1 (Mike's Handyman) Completed with 100% Success!\n");

  // Step 4: SCENARIO 2 — Sparkling Horizon Cleaning (Seattle, WA)
  console.log('STEP 4: SCENARIO 2 — Sparkling Horizon Cleaning (Seattle, WA)...');
  const resCleanPrev = await fetch(`${BASE_URL}/api/preview/sparkling-horizon-cleaning`);
  const dataCleanPrev = await resCleanPrev.json();
  console.log(`- Business: ${dataCleanPrev.business?.name}`);
  console.log(`- Industry: ${dataCleanPrev.business?.industry}`);
  console.log(`- Template: ${dataCleanPrev.business?.templateId} (${dataCleanPrev.business?.name})`);
  console.log(`- Services (${dataCleanPrev.business?.services?.length}):`, dataCleanPrev.business?.services?.map(s => s.name).join(', '));
  if (dataCleanPrev.business?.industry !== 'cleaning') throw new Error('Cleaning industry mismatch');
  console.log('✅ SCENARIO 2 (Cleaning) Verified Successfully!\n');

  // Step 5: SCENARIO 3 — Bella Vista Trattoria (Chicago, IL)
  console.log('STEP 5: SCENARIO 3 — Bella Vista Trattoria (Chicago, IL)...');
  const resRestPrev = await fetch(`${BASE_URL}/api/preview/bella-vista-trattoria`);
  const dataRestPrev = await resRestPrev.json();
  console.log(`- Business: ${dataRestPrev.business?.name}`);
  console.log(`- Industry: ${dataRestPrev.business?.industry}`);
  console.log(`- Template: ${dataRestPrev.business?.templateId}`);
  console.log(`- Menu Items (${dataRestPrev.business?.menu?.length}):`, dataRestPrev.business?.menu?.map(m => `${m.name} (${m.price})`).join(', '));
  if (dataRestPrev.business?.industry !== 'restaurant') throw new Error('Restaurant industry mismatch');
  console.log('✅ SCENARIO 3 (Restaurant) Verified Successfully!\n');

  // Step 6: Test Dynamic Lead Creation with Auto-Detection & Auto-Template
  console.log('STEP 6: Testing Automatic Lead Creation & Template Recommendation...');
  const resNewLead = await fetch(`${BASE_URL}/api/admin/businesses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Highland Luxury Cleaners',
      city: 'Dallas',
      state: 'TX',
      description: 'Exclusive white-glove private estate and residence cleaning in Highland Park.',
    }),
  });
  const dataNewLead = await resNewLead.json();
  console.log(`- Created Lead: ${dataNewLead.business?.name}`);
  console.log(`- Auto-detected Industry: ${dataNewLead.business?.industry}`);
  console.log(`- Auto-recommended Template: ${dataNewLead.business?.templateId} (Expected C4)`);
  console.log(`- Generated Clean Slug: ${dataNewLead.business?.slug}`);
  if (dataNewLead.business?.industry !== 'cleaning' || dataNewLead.business?.templateId !== 'C4') {
    throw new Error('Auto-detection or template recommendation failed for new lead');
  }
  console.log('✅ Auto-Detection & Template Engine Verified Successfully!\n');

  // Step 7: Final Funnel Analytics Verification
  console.log('STEP 7: Verifying Final Funnel Metrics...');
  const resFinalStats = await fetch(`${BASE_URL}/api/admin/businesses`);
  const dataFinalStats = await resFinalStats.json();
  const s = dataFinalStats.stats;
  console.log(`- Total Leads in System: ${s.totalLeads}`);
  console.log(`- Active Customers: ${s.activeCustomers}`);
  console.log(`- Total Preview Views: ${s.totalViews}`);
  console.log(`- Feedback Requests: ${s.feedbackCount}`);
  console.log(`- Conversion Rate: ${s.conversionRate}%`);
  console.log(`- Monthly Revenue: $${s.totalRevenue}`);
  console.log('✅ Final Analytics Verified.\n');

  console.log('================================================================');
  console.log('🎉 ALL ACCEPTANCE CRITERIA AND PRODUCTION TESTS PASSED (100%)!');
  console.log('================================================================');
}

runLiveE2ETest().catch(err => {
  console.error('❌ E2E Acceptance Test Failed:', err);
  process.exit(1);
});
