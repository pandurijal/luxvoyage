export interface Upgrade {
  id: string;
  title: string;
  price: number;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  occupation: string;
  destination: string;
  quote: string;
  rating: number;
  image: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Package {
  id: string;
  title: string;
  location: string;
  shortDescription: string;
  description: string;
  price: number;
  duration: string;
  heroImage: string;
  gallery: string[];
  included: string[];
  upgrades: Upgrade[];
  itinerary: ItineraryDay[];
}

export type ViewState = 
  | { name: 'home' }
  | { name: 'package'; packageId: string }
  | { name: 'booking'; packageId: string }
  | { name: 'dashboard' }
  | { name: 'custom_request' };
