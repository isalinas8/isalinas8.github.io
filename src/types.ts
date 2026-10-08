export type ScreenType = 'hub' | 'profile' | 'travels' | 'travel-detail' | 'contact';

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  label: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Seasonal';
  description: string;
  highlights: string[];
  technologies: string[];
  hideInOverview?: boolean;
  links?: { label: string; url: string }[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Machine Learning' | 'Data Engineering' | 'Full-Stack' | 'Robotics';
  imageUrl: string;
  technologies: string[];
  metrics?: string;
  githubUrl?: string;
  demoUrl?: string;
  demoLabel?: string;
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 1-100
    icon?: string;
    highlight?: boolean;
  }[];
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  subtitle: string;
  summary: string;
  activities: string[];
  placesToVisit?: {
    name: string;
    type?: string;
    note?: string;
    url?: string;
    link?: string;
  }[];
  restaurants?: {
    name: string;
    dish?: string;
    rating?: string;
    url?: string;
    link?: string;
  }[];
  tips?: string[];
  photos?: string[];
}

export interface TravelDestination {
  id: string;
  title: string;
  region: string;
  country: string;
  countryCode: string;
  year: string;
  category: 'Mountains' | 'Lakes' | 'Coastal' | 'Urban';
  durationDays: number;
  bestSeason: string;
  coverImage: string;
  gallery: string[];
  summary: string;
  itinerary: ItineraryDay[];
  generalTips: string[];
  recommendedGear?: string[];
  story: string;
  highlights: string[];
  cameraSpecs?: {
    camera: string;
    lens: string;
    aperture: string;
    shutterSpeed: string;
    iso: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  myMapsUrl?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  honors?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  icon?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  rank?: string;
  link?: string;
  badge?: string;
}
