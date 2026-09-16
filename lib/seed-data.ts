import { NormalizedBusiness } from './types';

export const INITIAL_LEADS: NormalizedBusiness[] = [
  {
    id: 'lead-mikes-handyman',
    slug: 'mikes-handyman-services',
    name: "Mike's Handyman Services",
    industry: 'handyman',
    category: 'Home Repairs & Light Remodeling',
    description: "Reliable residential handyman and home maintenance services serving Austin homeowners. Specializing in drywall repair, fixture replacements, carpentry, door adjustments, and exterior deck repairs.",
    tagline: 'Prompt, Honest, Quality Home Repairs in Austin',
    phone: '512-555-0194',
    email: 'mike@mikeshandymanaustin.com',
    address: '4209 S Congress Ave',
    city: 'Austin',
    state: 'TX',
    zip: '78745',
    hours: {
      'Monday - Friday': '7:30 AM - 6:00 PM',
      'Saturday': '8:00 AM - 2:00 PM',
      'Sunday': 'Closed'
    },
    rating: 4.9,
    reviewCount: 42,
    photos: {
      hero: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80',
      about: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80'
      ],
      services: [
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=600&q=80'
      ]
    },
    services: [
      {
        id: 'h-srv-1',
        name: 'Drywall Repair & Patching',
        description: 'Seamless wall and ceiling patches, texture matching, and painting touch-ups.',
        badge: 'Top Request',
        popular: true,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'h-srv-2',
        name: 'Light Fixture & Fan Installation',
        description: 'Replacement of chandeliers, ceiling fans, recessed LEDs, and dimmer switches.',
        badge: 'Fast Turnaround',
        popular: true,
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'h-srv-3',
        name: 'Interior & Exterior Door Fixes',
        description: 'Fix sticking doors, replace deadbolts, draft sealing, and hinge realignment.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'h-srv-4',
        name: 'Deck & Porch Maintenance',
        description: 'Board replacement, power washing, railing reinforcement, and weather staining.',
        image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'h-srv-5',
        name: 'Cabinet Hardware & Trim Carpentry',
        description: 'Baseboard installation, crown moulding, and fresh kitchen cabinet hardware.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-m1',
        author: 'David R.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Mike replaced three ceiling fans and patched drywall where we had an old thermostat. On time, super clean, and charged exactly what was quoted.',
        serviceOrDish: 'Drywall & Fan Install',
        verified: true
      },
      {
        id: 'rev-m2',
        author: 'Sarah L.',
        rating: 5,
        date: 'Last month',
        comment: 'Fantastic work fixing our front door alignment and back deck steps. Very polite and professional throughout. Highly recommend!',
        serviceOrDish: 'Door & Deck Repair',
        verified: true
      },
      {
        id: 'rev-m3',
        author: 'Brian T.',
        rating: 5,
        date: '2 months ago',
        comment: 'Hard to find trustworthy repair people these days. Mike arrived promptly and did great craftsmanship on our baseboards.',
        serviceOrDish: 'Trim Carpentry',
        verified: true
      }
    ],
    website: 'https://facebook.com/mikeshandymanaustin',
    facebookUrl: 'https://facebook.com/mikeshandymanaustin',
    googleMapsUrl: 'https://maps.google.com/?q=4209+S+Congress+Ave+Austin+TX',
    templateId: 'H1',
    serviceAreas: ['South Austin', 'Downtown', 'Zilker', 'Bouldin Creek', 'Oak Hill', 'Travis Heights']
  },
  {
    id: 'lead-sparkling-horizon',
    slug: 'sparkling-horizon-cleaning',
    name: 'Sparkling Horizon Cleaning',
    industry: 'cleaning',
    category: 'Residential & Light Commercial Cleaning',
    description: 'Detailed, eco-friendly house cleaning and small office janitorial services across Greater Seattle. Offering recurring weekly, bi-weekly, deep cleaning, and move-in/out services.',
    tagline: 'Breathable Clean Spaces for Busy Seattle Homes',
    phone: '206-555-0182',
    email: 'info@sparklinghorizonclean.com',
    address: '1420 5th Ave',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
    hours: {
      'Monday - Friday': '8:00 AM - 5:30 PM',
      'Saturday': '9:00 AM - 3:00 PM',
      'Sunday': 'Closed'
    },
    rating: 4.9,
    reviewCount: 56,
    photos: {
      hero: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
      about: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      ],
      services: [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80'
      ]
    },
    services: [
      {
        id: 'c-srv-1',
        name: 'Recurring Residential Cleaning',
        description: 'Weekly or bi-weekly complete home upkeep with custom checklist for kitchens, bathrooms, and living areas.',
        badge: 'Most Popular',
        popular: true,
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'c-srv-2',
        name: 'Deep Clean & Refresh',
        description: 'Comprehensive top-to-bottom scrub including baseboards, interior windows, cabinet fronts, and tile grout.',
        badge: 'Thorough Care',
        popular: true,
        image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'c-srv-3',
        name: 'Move-In / Move-Out Cleaning',
        description: 'Leave the old residence spotless for deposit return or prepare your new home for immediate move-in.',
        image: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'c-srv-4',
        name: 'Boutique Office Cleaning',
        description: 'Evening sanitation for creative studios, tech offices, and professional clinics.',
        image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-s1',
        author: 'Elena M.',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Sparkling Horizon does an incredible job with our bi-weekly clean. They bring their own supplies and leave the house smelling fresh and clean.',
        serviceOrDish: 'Bi-Weekly Cleaning',
        verified: true
      },
      {
        id: 'rev-s2',
        author: 'Marcus K.',
        rating: 5,
        date: '1 month ago',
        comment: 'Booked a move-out deep clean for our 2-bedroom condo in Capitol Hill. Got 100% of our deposit back without a single deduction.',
        serviceOrDish: 'Move-Out Deep Clean',
        verified: true
      },
      {
        id: 'rev-s3',
        author: 'Claire H.',
        rating: 5,
        date: '2 months ago',
        comment: 'Super communicative and punctual. It is such a relief coming home after their visits!',
        serviceOrDish: 'Residential Housekeeping',
        verified: true
      }
    ],
    facebookUrl: 'https://facebook.com/sparklinghorizonseattle',
    googleMapsUrl: 'https://maps.google.com/?q=1420+5th+Ave+Seattle+WA',
    templateId: 'C1',
    serviceAreas: ['Downtown Seattle', 'Capitol Hill', 'Ballard', 'Queen Anne', 'Fremont', 'Bellevue']
  },
  {
    id: 'lead-bella-vista',
    slug: 'bella-vista-trattoria',
    name: 'Bella Vista Trattoria',
    industry: 'restaurant',
    restaurantCategory: 'pizza',
    cuisine: 'Italian-American',
    category: 'Pizza & Italian',
    description: 'Handmade pasta, wood-fired seasonal pizzas, and classic Northern Italian specialties in Chicago\'s historic West Loop. Dine-in, heated patio seating, and catering available.',
    tagline: 'Handmade Pasta & Wood-Fired Tradition in West Loop',
    phone: '312-555-0149',
    email: 'reservations@bellavistachicago.com',
    address: '832 W Randolph St',
    city: 'Chicago',
    state: 'IL',
    zip: '60607',
    hours: {
      'Tuesday - Thursday': '4:30 PM - 10:00 PM',
      'Friday - Saturday': '4:00 PM - 11:00 PM',
      'Sunday': '4:00 PM - 9:30 PM',
      'Monday': 'Closed'
    },
    rating: 4.8,
    reviewCount: 89,
    photos: {
      hero: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
      about: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80'
      ],
      services: []
    },
    services: [],
    menuCategories: [
      {
        id: 'cat-antipasti',
        name: 'Antipasti',
        description: 'Starters and small plates',
        items: [
          {
            id: 'item-polpo',
            name: 'Polpo Grigliato',
            description: 'Charred Mediterranean octopus, fingerling potato confit, smoked paprika aioli, pickled shallots.',
            price: 22.00,
            tags: ['gluten-free'],
            available: true,
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'item-bruschetta',
            name: 'Bruschetta al Pomodoro',
            description: 'Grilled sourdough, heirloom tomatoes, fresh basil, aged balsamic, extra virgin olive oil.',
            price: 14.00,
            tags: ['vegan', 'popular'],
            available: true,
            image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80'
          }
        ]
      },
      {
        id: 'cat-pasta',
        name: 'Handmade Pasta',
        description: 'Fresh pasta made daily in-house',
        items: [
          {
            id: 'item-pappardelle',
            name: 'Pappardelle al Cinghiale',
            description: 'Wide ribbon pasta, slow-braised wild boar ragù, fresh rosemary, aged pecorino romano.',
            price: 26.00,
            tags: ['popular', 'chef-signature'],
            available: true,
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'item-tagliolini',
            name: 'Tagliolini al Tartufo',
            description: 'Delicate egg tagliolini, cultured Umbrian butter, shaved black winter truffle, Parmigiano-Reggiano.',
            price: 29.00,
            tags: ['vegetarian', 'chef-signature', 'popular'],
            available: true,
            image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=600&q=80'
          }
        ]
      },
      {
        id: 'cat-pizza',
        name: 'Wood-Fired Pizza',
        description: 'Authentic Neapolitan-style, baked in our wood-fire oven',
        items: [
          {
            id: 'item-margherita',
            name: 'Margherita Verace Pizza',
            description: 'San Marzano D.O.P. tomatoes, buffalo mozzarella, fresh basil, cold-pressed extra virgin olive oil.',
            price: 21.00,
            tags: ['vegetarian', 'popular'],
            available: true,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80'
          }
        ]
      },
      {
        id: 'cat-dolci',
        name: 'Dolci',
        description: 'Desserts',
        items: [
          {
            id: 'item-tiramisu',
            name: 'Classic Tiramisù Tradizionale',
            description: 'Espresso-soaked savoiardi ladyfingers, whipped mascarpone zabaione, Valrhona dark cocoa powder.',
            price: 12.00,
            tags: ['vegetarian', 'popular'],
            available: true,
            image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-b1',
        author: 'Gianna P.',
        rating: 5,
        date: '1 week ago',
        comment: 'The Pappardelle al Cinghiale was outstanding! Authentic flavors that transported me straight to Florence. Outstanding wine list too.',
        serviceOrDish: 'Pappardelle & Barolo',
        verified: true
      },
      {
        id: 'rev-b2',
        author: 'Robert D.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Celebrated our anniversary here on the heated patio. Fantastic attentive staff, wonderful ambiance, and best tiramisu in the West Loop.',
        serviceOrDish: 'Dinner for Two',
        verified: true
      },
      {
        id: 'rev-b3',
        author: 'Jessica T.',
        rating: 5,
        date: 'Last month',
        comment: 'Authentic wood-fired crust and truly delicious handmade pasta. We make it a monthly tradition now.',
        serviceOrDish: 'Margherita & Tagliolini',
        verified: true
      }
    ],
    facebookUrl: 'https://facebook.com/bellavistachicago',
    googleMapsUrl: 'https://maps.google.com/?q=832+W+Randolph+St+Chicago+IL',
    instagramUrl: 'https://instagram.com/bellavistachicago',
    reservationUrl: 'https://resy.com/cities/chi/bella-vista',
    currency: 'USD',
    templateId: 'R1'
  },
  {
    id: 'lead-taco-libre',
    slug: 'taco-libre-austin',
    name: 'Taco Libre',
    industry: 'restaurant',
    restaurantCategory: 'mexican',
    cuisine: 'Mexican & Tex-Mex',
    category: 'Mexican & Latin',
    description: 'Bold street tacos, handcrafted margaritas, and festive atmosphere in the heart of East Austin. Family recipes passed down three generations.',
    tagline: 'Authentic Street Tacos & Handcrafted Margaritas',
    phone: '512-555-0372',
    email: 'hola@tacolibreaustin.com',
    address: '2214 E Cesar Chavez St',
    city: 'Austin',
    state: 'TX',
    zip: '78702',
    hours: {
      'Monday - Thursday': '11:00 AM - 10:00 PM',
      'Friday - Saturday': '11:00 AM - 12:00 AM',
      'Sunday': '10:00 AM - 9:00 PM'
    },
    rating: 4.7,
    reviewCount: 134,
    photos: {
      hero: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1600&q=80',
      about: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583835746434-cf1534674ad5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80'
      ],
      services: []
    },
    services: [],
    menuCategories: [
      {
        id: 'cat-tacos',
        name: 'Street Tacos',
        description: 'Traditional corn tortillas, two per order',
        items: [
          {
            id: 'item-al-pastor',
            name: 'Al Pastor',
            description: 'Achiote-marinated pork, grilled pineapple, white onion, fresh cilantro, salsa verde.',
            price: 4.50,
            tags: ['popular', 'spicy'],
            available: true,
            image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'item-carne-asada',
            name: 'Carne Asada',
            description: 'Grilled skirt steak, roasted jalapeño salsa, white onion, fresh cilantro, lime.',
            price: 5.50,
            tags: ['popular', 'gluten-free'],
            available: true,
            image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'item-veggie',
            name: 'Veggie & Cheese',
            description: 'Roasted seasonal vegetables, queso fresco, chipotle crema, pickled red onion.',
            price: 4.00,
            tags: ['vegetarian', 'vegan-available'],
            available: true,
            image: 'https://images.unsplash.com/photo-1583835746434-cf1534674ad5?auto=format&fit=crop&w=600&q=80'
          }
        ]
      },
      {
        id: 'cat-sides',
        name: 'Sides & Extras',
        items: [
          {
            id: 'item-guac',
            name: 'Fresh Guacamole',
            description: 'Made to order with Hass avocados, serrano chile, lime, and cilantro. Served with house chips.',
            price: 8.00,
            tags: ['vegan', 'gluten-free', 'popular'],
            available: true,
            image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'item-elote',
            name: 'Mexican Street Corn (Elote)',
            description: 'Grilled corn on the cob, cotija cheese, chipotle mayo, chili powder, lime.',
            price: 6.00,
            tags: ['vegetarian', 'popular'],
            available: true,
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80'
          }
        ]
      },
      {
        id: 'cat-drinks',
        name: 'Drinks',
        items: [
          {
            id: 'item-margarita',
            name: 'House Margarita',
            description: 'El Jimador blanco, fresh lime, agave nectar. On the rocks or frozen.',
            price: 11.00,
            tags: ['popular'],
            available: true,
          },
          {
            id: 'item-horchata',
            name: 'Horchata',
            description: 'House-made rice milk with cinnamon and vanilla. Non-alcoholic.',
            price: 4.50,
            tags: ['non-alcoholic', 'vegan'],
            available: true,
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-tl1',
        author: 'Marcus B.',
        rating: 5,
        date: '3 days ago',
        comment: 'Best al pastor tacos in Austin, hands down. The pineapple on top makes it perfect. Will be back weekly.',
        serviceOrDish: 'Al Pastor Tacos',
        verified: true
      },
      {
        id: 'rev-tl2',
        author: 'Sofia R.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Incredible brunch! The Sunday hours are perfect. Huevos rancheros and fresh horchata — unbeatable combo.',
        serviceOrDish: 'Sunday Brunch',
        verified: true
      },
      {
        id: 'rev-tl3',
        author: 'Jake T.',
        rating: 4,
        date: 'Last month',
        comment: 'Great vibe, great food. The guacamole is made fresh right in front of you. Margaritas are strong and well-priced.',
        serviceOrDish: 'Guac & Margaritas',
        verified: true
      }
    ],
    facebookUrl: 'https://facebook.com/tacolibreaustin',
    googleMapsUrl: 'https://maps.google.com/?q=2214+E+Cesar+Chavez+St+Austin+TX',
    instagramUrl: 'https://instagram.com/tacolibreaustin',
    orderUrl: 'https://order.tacolibreaustin.com',
    currency: 'USD',
    templateId: 'R2'
  },
  {
    id: 'lead-big-stack',
    slug: 'big-stack-burgers',
    name: 'Big Stack Burgers',
    industry: 'restaurant',
    restaurantCategory: 'fastfood',
    cuisine: 'American Burgers & Fast Food',
    category: 'Fast Food & Burgers',
    description: 'Smash burgers, thick-cut fries, and classic shakes served fast in Houston\'s Midtown. No shortcuts — just real beef, real cheese, real flavor.',
    tagline: 'Real Beef. Real Flavor. Served Fast.',
    phone: '713-555-0841',
    email: 'order@bigstackburgers.com',
    address: '3810 Milam St',
    city: 'Houston',
    state: 'TX',
    zip: '77006',
    hours: {
      'Monday - Thursday': '11:00 AM - 10:00 PM',
      'Friday - Saturday': '11:00 AM - 11:00 PM',
      'Sunday': '12:00 PM - 9:00 PM'
    },
    rating: 4.6,
    reviewCount: 211,
    photos: {
      hero: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=80',
      about: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80'
      ],
      services: []
    },
    services: [],
    menuCategories: [
      {
        id: 'cat-burgers',
        name: 'Burgers',
        description: 'All burgers smashed fresh on the flat-top',
        items: [
          {
            id: 'item-big-stack',
            name: 'The Big Stack',
            description: 'Double smash patties, American cheese, shredded lettuce, tomato, pickles, Big Stack sauce.',
            price: 13.00,
            tags: ['popular', 'signature'],
            available: true,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'item-classic',
            name: 'Classic Single',
            description: 'Smash patty, cheddar, onion, mustard, ketchup, pickles. Old-school done right.',
            price: 9.00,
            tags: ['popular'],
            available: true,
            image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'item-mushroom',
            name: 'Mushroom Swiss',
            description: 'Smash patty, sautéed cremini mushrooms, Swiss cheese, garlic aioli, arugula.',
            price: 12.00,
            tags: [],
            available: true,
            image: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&w=600&q=80'
          }
        ]
      },
      {
        id: 'cat-sides-bs',
        name: 'Sides',
        items: [
          {
            id: 'item-fries',
            name: 'Thick-Cut Fries',
            description: 'Hand-cut russet potatoes, fried golden, seasoned with sea salt.',
            price: 5.00,
            tags: ['vegan', 'popular'],
            available: true,
            image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'item-rings',
            name: 'Onion Rings',
            description: 'Beer-battered Vidalia onion rings with smoky chipotle dip.',
            price: 6.00,
            tags: ['vegetarian'],
            available: true,
          }
        ]
      },
      {
        id: 'cat-shakes',
        name: 'Shakes',
        items: [
          {
            id: 'item-vanilla-shake',
            name: 'Classic Vanilla Shake',
            description: 'Whole milk vanilla bean ice cream, blended thick.',
            price: 7.00,
            tags: ['vegetarian', 'popular'],
            available: true,
          },
          {
            id: 'item-chocolate-shake',
            name: 'Chocolate Fudge Shake',
            description: 'Rich chocolate ice cream with hot fudge swirl.',
            price: 7.00,
            tags: ['vegetarian'],
            available: true,
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-bs1',
        author: 'Derrick W.',
        rating: 5,
        date: '1 week ago',
        comment: 'The Big Stack is everything. Perfectly smashed, crispy edges, and that sauce is addictive. Best burger in Houston Midtown.',
        serviceOrDish: 'The Big Stack',
        verified: true
      },
      {
        id: 'rev-bs2',
        author: 'Tanya M.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Fast, fresh, and delicious. The fries are perfectly thick and not soggy. Great value for the quality.',
        serviceOrDish: 'Classic Single & Fries',
        verified: true
      },
      {
        id: 'rev-bs3',
        author: 'Chris P.',
        rating: 4,
        date: 'Last month',
        comment: 'Mushroom Swiss burger was incredible. Shakes are thick and cold. Parking can be rough but worth it.',
        serviceOrDish: 'Mushroom Swiss',
        verified: true
      }
    ],
    facebookUrl: 'https://facebook.com/bigstackburgers',
    googleMapsUrl: 'https://maps.google.com/?q=3810+Milam+St+Houston+TX',
    instagramUrl: 'https://instagram.com/bigstackburgers',
    orderUrl: 'https://order.bigstackburgers.com',
    currency: 'USD',
    templateId: 'R3'
  },
  {
    id: 'lead-dragon-palace',
    slug: 'dragon-palace-sf',
    name: 'Dragon Palace',
    industry: 'restaurant',
    restaurantCategory: 'asian',
    cuisine: 'Cantonese & Asian Fusion',
    category: 'Chinese & Asian Fusion',
    description: 'Elevated Cantonese cuisine with a modern Asian fusion twist in San Francisco\'s Richmond District. Dim sum weekends, full dinner service, and private dining rooms available.',
    tagline: 'Elevated Cantonese Cuisine & Modern Asian Fusion',
    phone: '415-555-0293',
    email: 'info@dragonpalacesf.com',
    address: '618 Clement St',
    city: 'San Francisco',
    state: 'CA',
    zip: '94118',
    hours: {
      'Monday - Friday': '11:30 AM - 2:30 PM, 5:00 PM - 10:00 PM',
      'Saturday': '10:00 AM - 2:30 PM (Dim Sum), 5:00 PM - 10:30 PM',
      'Sunday': '10:00 AM - 2:30 PM (Dim Sum), 5:00 PM - 9:30 PM'
    },
    rating: 4.9,
    reviewCount: 178,
    photos: {
      hero: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1600&q=80',
      about: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1618898303370-94b0b56d5843?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80'
      ],
      services: []
    },
    services: [],
    menuCategories: [
      {
        id: 'cat-dim-sum',
        name: 'Dim Sum',
        description: 'Served weekends 10am–2:30pm',
        items: [
          {
            id: 'item-har-gow',
            name: 'Har Gow (Shrimp Dumplings)',
            description: 'Delicate steamed shrimp dumplings in translucent rice flour wrapper. 4 pieces.',
            price: 9.00,
            tags: ['popular', 'gluten-free'],
            available: true,
            image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'item-siu-mai',
            name: 'Siu Mai (Pork & Shrimp)',
            description: 'Open-topped dumplings with pork, tiger shrimp, and water chestnut. 4 pieces.',
            price: 9.00,
            tags: ['popular'],
            available: true,
            image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=600&q=80'
          }
        ]
      },
      {
        id: 'cat-mains-dp',
        name: 'Signature Mains',
        description: 'Dinner service, daily',
        items: [
          {
            id: 'item-peking-duck',
            name: 'Peking Duck (Half)',
            description: 'Lacquered duck, crispy skin, hoisin sauce, steamed pancakes, scallion, cucumber. Serves 2–3.',
            price: 48.00,
            tags: ['popular', 'chef-signature'],
            available: true,
            image: 'https://images.unsplash.com/photo-1618898303370-94b0b56d5843?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'item-mapo-tofu',
            name: 'Mapo Tofu',
            description: 'Silken tofu in spiced Sichuan bean paste, ground pork, chili oil, Sichuan peppercorn.',
            price: 18.00,
            tags: ['spicy', 'gluten-free-available'],
            available: true,
            image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'item-fried-rice',
            name: 'Wok-Fried Yang Chow Rice',
            description: 'Day-old jasmine rice, BBQ pork, shrimp, egg, peas, scallion, light soy.',
            price: 16.00,
            tags: ['popular'],
            available: true,
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-dp1',
        author: 'Linda C.',
        rating: 5,
        date: '5 days ago',
        comment: 'Possibly the best Peking Duck in San Francisco. The skin was impossibly crispy and the pancakes were perfect. A special occasion staple.',
        serviceOrDish: 'Peking Duck',
        verified: true
      },
      {
        id: 'rev-dp2',
        author: 'Kevin Y.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Weekend dim sum is a must. Har gow was delicate and fresh, not frozen. Elegant space that feels special without being stuffy.',
        serviceOrDish: 'Dim Sum Brunch',
        verified: true
      },
      {
        id: 'rev-dp3',
        author: 'Michelle L.',
        rating: 5,
        date: 'Last month',
        comment: 'We had our team dinner here — private room, seamless service, and the food was consistently exceptional. Highly recommend for groups.',
        serviceOrDish: 'Private Dining',
        verified: true
      }
    ],
    facebookUrl: 'https://facebook.com/dragonpalacesf',
    googleMapsUrl: 'https://maps.google.com/?q=618+Clement+St+San+Francisco+CA',
    instagramUrl: 'https://instagram.com/dragonpalacesf',
    reservationUrl: 'https://resy.com/cities/sf/dragon-palace',
    currency: 'USD',
    templateId: 'R4'
  },
  {
    id: 'lead-rusty-fork',
    slug: 'the-rusty-fork-diner',
    name: 'The Rusty Fork Diner',
    industry: 'restaurant',
    restaurantCategory: 'american',
    cuisine: 'American Southern & BBQ',
    category: 'American Diner & BBQ',
    description: 'A Nashville institution since 1978. All-day breakfast, slow-smoked BBQ, and homestyle Southern plates in a classic diner setting on Broadway.',
    tagline: 'Nashville\'s Favorite All-Day Diner Since 1978',
    phone: '615-555-0466',
    email: 'hello@therustyfork.com',
    address: '428 Broadway',
    city: 'Nashville',
    state: 'TN',
    zip: '37203',
    hours: {
      'Monday - Friday': '7:00 AM - 10:00 PM',
      'Saturday': '7:00 AM - 11:00 PM',
      'Sunday': '8:00 AM - 9:00 PM'
    },
    rating: 4.8,
    reviewCount: 302,
    photos: {
      hero: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1600&q=80',
      about: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1529543544282-ea669407fca3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1494488900571-297f16dfdb0d?auto=format&fit=crop&w=800&q=80'
      ],
      services: []
    },
    services: [],
    menuCategories: [
      {
        id: 'cat-breakfast',
        name: 'All-Day Breakfast',
        description: 'Served 7am until close',
        items: [
          {
            id: 'item-grand-slam',
            name: 'The Grand Slam',
            description: 'Two eggs any style, two strips of smoked bacon, country sausage patty, hash browns, and buttermilk biscuit.',
            price: 14.00,
            tags: ['popular'],
            available: true,
            image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'item-chicken-waffles',
            name: 'Nashville Hot Chicken & Waffles',
            description: 'Crispy hot chicken thigh on a buttermilk waffle, hot honey drizzle, dill pickle chips.',
            price: 17.00,
            tags: ['popular', 'spicy', 'chef-signature'],
            available: true,
            image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=600&q=80'
          }
        ]
      },
      {
        id: 'cat-bbq',
        name: 'BBQ Plates',
        description: 'Slow-smoked over hickory wood, served with two sides',
        items: [
          {
            id: 'item-brisket',
            name: 'Smoked Brisket Plate',
            description: '12-hour hickory-smoked brisket, two sides (choose from: mac & cheese, collard greens, baked beans, coleslaw).',
            price: 22.00,
            tags: ['popular', 'gluten-free'],
            available: true,
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'item-pulled-pork',
            name: 'Pulled Pork Sandwich',
            description: 'Slow-smoked pork shoulder on a brioche bun, house BBQ sauce, apple cider slaw.',
            price: 14.00,
            tags: ['popular'],
            available: true,
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'item-ribs',
            name: 'Half Rack Pork Ribs',
            description: 'St. Louis-style spare ribs, dry-rubbed and smoked 6 hours, two sides.',
            price: 28.00,
            tags: ['gluten-free'],
            available: true,
          }
        ]
      },
      {
        id: 'cat-desserts-rf',
        name: 'Desserts',
        items: [
          {
            id: 'item-pie',
            name: 'Pecan Pie Slice',
            description: 'Classic Southern pecan pie, buttery flaky crust, served warm with vanilla ice cream.',
            price: 7.00,
            tags: ['vegetarian', 'popular'],
            available: true,
            image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&w=600&q=80'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-rf1',
        author: 'Tommy J.',
        rating: 5,
        date: '4 days ago',
        comment: 'The brisket is everything you dream of — tender, smoky, and perfectly bark-crusted. Best BBQ on Broadway by a mile.',
        serviceOrDish: 'Smoked Brisket',
        verified: true
      },
      {
        id: 'rev-rf2',
        author: 'Anita K.',
        rating: 5,
        date: '1 week ago',
        comment: 'Nashville Hot Chicken & Waffles for breakfast? Yes please. The hot honey on top is addictive. Classic diner with real soul.',
        serviceOrDish: 'Chicken & Waffles',
        verified: true
      },
      {
        id: 'rev-rf3',
        author: 'Brad H.',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Been coming since I was a kid. Nothing has changed and that\'s exactly the point. Comfort food done perfectly. The pecan pie is the best.',
        serviceOrDish: 'Full Breakfast & Pecan Pie',
        verified: true
      }
    ],
    facebookUrl: 'https://facebook.com/therustyforkdiner',
    googleMapsUrl: 'https://maps.google.com/?q=428+Broadway+Nashville+TN',
    instagramUrl: 'https://instagram.com/therustyfork',
    orderUrl: 'https://order.therustyfork.com',
    currency: 'USD',
    templateId: 'R5'
  }
];
