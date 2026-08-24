import { Package } from './types';

export const packages: Package[] = [
  {
    id: 'swiss-alps',
    title: 'Swiss Alps Winter Retreat',
    location: 'Zermatt, Switzerland',
    shortDescription: 'Experience the ultimate alpine luxury with private chalets and exclusive ski access.',
    description: 'Immerse yourself in the breathtaking beauty of the Swiss Alps. This curated experience offers unparalleled luxury, combining thrilling winter sports with the warmth of a private, fully-staffed chalet in the shadow of the Matterhorn.',
    price: 125000000,
    duration: '7 Days, 6 Nights',
    heroImage: 'https://images.unsplash.com/photo-1520114881075-f5f84ce22c60?q=80&w=2670&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522792065601-5e6eaf661bfd?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601618365859-994bbfb9f848?q=80&w=2674&auto=format&fit=crop'
    ],
    included: [
      'First-Class Commercial Flights',
      'Private Helicopter Transfer',
      '5-Star Luxury Chalet Accommodation',
      'Personal Ski Instructor',
      'Private Chef & Butler Service',
      'Premium Ski Equipment Rental'
    ],
    upgrades: [
      {
        id: 'u1',
        title: 'Private Jet Charter',
        description: 'Upgrade your entire journey with a private jet charter from Jakarta to Geneva.',
        price: 350000000
      },
      {
        id: 'u2',
        title: 'Personal Photographer',
        description: 'A professional photographer to document your alpine adventures for 3 days.',
        price: 25000000
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Geneva & Helicopter Transfer',
        description: 'Arrive in Geneva where your private concierge awaits. Board a helicopter for a scenic transfer directly to your chalet in Zermatt. Enjoy a welcome dinner prepared by your private chef.'
      },
      {
        day: 2,
        title: 'Exclusive Skiing on the Glacier',
        description: 'Meet your personal ski instructor for a day of guided skiing on the pristine slopes of the Matterhorn Glacier Paradise. Return for après-ski champagne and spa treatments.'
      },
      {
        day: 3,
        title: 'Alpine Gastronomy & Relaxation',
        description: 'Take a break from the slopes. Enjoy a private snowshoeing tour followed by a gourmet lunch in a secluded mountain hut. Evening features a private wine tasting session.'
      }
    ]
  },
  {
    id: 'maldives-private',
    title: 'Maldives Private Atoll Escape',
    location: 'Baa Atoll, Maldives',
    shortDescription: 'Secluded overwater luxury with private yacht access and marine biology tours.',
    description: 'Escape to a world of absolute privacy in the heart of the Indian Ocean. This experience guarantees exclusive use of a premium overwater villa, complete with dedicated staff, a private yacht for exploration, and unparalleled marine encounters.',
    price: 95000000,
    duration: '5 Days, 4 Nights',
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2665&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=2592&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573271780447-3806fce2bcde?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2574&auto=format&fit=crop'
    ],
    included: [
      'Business Class Commercial Flights',
      'Luxury Seaplane Transfer',
      'Overwater Villa with Private Pool',
      '24/7 Dedicated Butler (Thakuru)',
      'All-Inclusive Premium Dining',
      'Guided Snorkeling with Marine Biologist'
    ],
    upgrades: [
      {
        id: 'u3',
        title: 'Private Yacht Sunset Dinner',
        description: 'A fully catered private dinner aboard a luxury yacht sailing into the sunset.',
        price: 15000000
      },
      {
        id: 'u4',
        title: 'Underwater Spa Experience',
        description: 'Exclusive 3-hour couple\'s treatment in an underwater glass-walled spa room.',
        price: 12000000
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Seaplane Arrival & Villa Check-in',
        description: 'Touch down in Malé and transfer immediately to a VIP seaplane. Arrive at your private atoll and settle into your overwater villa. Relax and acclimate.'
      },
      {
        day: 2,
        title: 'Manta Ray Encounter',
        description: 'Join a resident marine biologist for a private excursion to Hanifaru Bay to swim alongside majestic Manta Rays in their natural habitat.'
      },
      {
        day: 3,
        title: 'Spa & Sandbank Picnic',
        description: 'Morning dedicated to wellness with bespoke spa treatments. In the afternoon, enjoy a private picnic on a secluded, uninhabited sandbank.'
      }
    ]
  },
  {
    id: 'kyoto-ryokan',
    title: 'Kyoto Imperial Serenity',
    location: 'Kyoto, Japan',
    shortDescription: 'Authentic cultural immersion with private tea ceremonies and Michelin-starred kaiseki.',
    description: 'Step back in time to the elegant world of ancient Kyoto. This journey focuses on refined cultural experiences, staying in a meticulously restored heritage ryokan and enjoying private access to temples usually closed to the public.',
    price: 85000000,
    duration: '6 Days, 5 Nights',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1545569341-9eb8b3097314?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be1?q=80&w=2612&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?q=80&w=2574&auto=format&fit=crop'
    ],
    included: [
      'Business Class Flights',
      'Private Chauffeur Service',
      'Premium Ryokan Accommodation',
      'Daily Kaiseki Breakfast & Dinner',
      'Private Geisha Entertainment Evening',
      'VIP Temple Access'
    ],
    upgrades: [
      {
        id: 'u5',
        title: 'Helicopter Tour of Mount Fuji',
        description: 'A private day trip including a helicopter flight offering unparalleled views of Mount Fuji.',
        price: 45000000
      },
      {
        id: 'u6',
        title: 'Masterclass with a Katana Swordsmith',
        description: 'An exclusive half-day workshop with a traditional Japanese swordsmith.',
        price: 18000000
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kyoto',
        description: 'Arrive via first-class Shinkansen. Transfer by luxury sedan to your Ryokan. Enjoy a welcoming matcha tea ceremony in your private garden.'
      },
      {
        day: 2,
        title: 'Private Temple Tour',
        description: 'Early morning access to a renowned Zen temple before it opens to the public, guided by a head monk. Evening features an exclusive Kaiseki dinner.'
      },
      {
        day: 3,
        title: 'Gion District & Geisha Evening',
        description: 'Explore the historic Gion district with a cultural expert. In the evening, enjoy a private, traditional dinner attended by Geiko and Maiko.'
      }
    ]
  }
];

export const formatIDR = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const testimonials = [
  {
    id: 't1',
    name: 'Eleanor Vance',
    occupation: 'CEO, TechVentures',
    destination: 'Swiss Alps Winter Retreat',
    quote: 'Every detail was anticipated before we even asked. The private helicopter transfer and the sheer exclusivity of the chalet made this the most stress-free and luxurious escape we have ever experienced.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop'
  },
  {
    id: 't2',
    name: 'Jonathan Sterling',
    occupation: 'Managing Partner, Sterling & Co',
    destination: 'Kyoto Imperial Serenity',
    quote: 'Unparalleled access and absolute privacy. Our private temple tour before sunrise and the Michelin-starred kaiseki were magical. We did not feel like tourists; we felt like honored guests of the city.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop'
  },
  {
    id: 't3',
    name: 'Sarah & Marcus Chen',
    occupation: 'Founders, Chen Holdings',
    destination: 'Maldives Private Atoll',
    quote: 'The seamless transition from our flight to the private yacht was breathtaking. LuxVoyage curated a perfect balance of marine adventure and complete isolation. The underwater spa was unforgettable.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2574&auto=format&fit=crop'
  }
];

export const galleryImages = [
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=80&w=2672&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=2574&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512453979438-51f696684188?q=80&w=2670&auto=format&fit=crop'
];
