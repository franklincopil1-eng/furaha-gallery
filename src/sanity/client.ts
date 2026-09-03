/**
 * Sanity CMS Client & GROQ Query Integration
 * Connects to Sanity.io API with fallback content for offline/static deployment.
 */

import {
  SanityCauseSchema,
  SanityStorySchema,
  SanityTestimonialSchema,
  SanitySiteSettingsSchema,
} from './schema';

export interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
  useCdn: boolean;
}

export const sanityConfig: SanityConfig = {
  projectId: (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SANITY_PROJECT_ID) || 'furaha-production',
  dataset: (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SANITY_DATASET) || 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
};

// GROQ Queries for fetching content
export const GROQ_QUERIES = {
  getSiteSettings: `*[_type == "siteSettings"][0]`,
  getStory: `*[_type == "story"][0]`,
  getAllCauses: `*[_type == "cause"] | order(order asc)`,
  getFeaturedTestimonials: `*[_type == "testimonial"] | order(_createdAt desc)`,
  getStaff: `*[_type == "staffMember"] | order(order asc)`,
};

// Default fallback data matching Furaha Ministries branding & content
export const fallbackSiteSettings: SanitySiteSettingsSchema = {
  _id: 'siteSettings-default',
  _type: 'siteSettings',
  siteTitle: 'Furaha Ministries',
  tagline: 'Faith in Action. Hope in Every Life.',
  contactEmail: 'info@meetfuraha.org',
  givebutterCampaignUrl: 'https://givebutter.com/givetofuraha',
  heroHeadline: 'REACHING THE OVERLOOKED',
  heroSubheadline: 'Restoring dignity, nutrition, education, and Christ-centered hope to vulnerable children across Kenya.',
};

export const fallbackStoryData: SanityStorySchema = {
  _id: 'story-default',
  _type: 'story',
  headline: 'Our Story',
  subheadline: 'Furaha Ministries, Non-Profit Organization',
  bodyText: [
    'Furaha ministries was founded with a passion to serve the neediest of the needy that may be overlooked. We focus on orphans, abandoned children and youth at risk - and offer holistic support that nurtures their body mind and spirit.',
    'Our programs are tailored to meeting critical community needs by partnering with schools, children’s programs, churches and clinics. We walk with each child and young person through their journey of healing growth and empowerment.',
  ],
  missionStatement: 'To provide a bridge that furnish a sustainable, spiritual, nutritional and educational growth to overlooked children in Kenya.',
  visionStatement: 'A Kenya where overlooked children are spiritually transformed and practically equipped in an environment that can sustain them.',
  featuredImage: {
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
    alt: 'School supplies, backpacks, and uniforms for Kenyan students',
  },
};
