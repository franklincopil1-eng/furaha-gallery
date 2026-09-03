/**
 * Sanity.io CMS Schema Definitions for Furaha Ministries
 * Designed for non-technical staff to manage website content, stories, causes, and media.
 */

export interface SanityDocBase {
  _id: string;
  _type: string;
  _createdAt?: string;
  _updatedAt?: string;
}

export interface SanityCauseSchema extends SanityDocBase {
  _type: 'cause';
  title: string;
  slug: { current: string };
  category: 'Nutrition' | 'Education' | 'Discipleship';
  coverImage: {
    url: string;
    alt: string;
  };
  shortDescription: string;
  bodyContent: string;
  impactMetrics: Array<{
    label: string;
    value: string;
  }>;
  order: number;
}

export interface SanityStorySchema extends SanityDocBase {
  _type: 'story';
  headline: string;
  subheadline: string;
  bodyText: string[];
  missionStatement: string;
  visionStatement: string;
  featuredImage: {
    url: string;
    alt: string;
  };
}

export interface SanityTestimonialSchema extends SanityDocBase {
  _type: 'testimonial';
  quote: string;
  authorName: string;
  role: string;
  location?: string;
  avatarImage: {
    url: string;
    alt: string;
  };
  featured: boolean;
}

export interface SanityStaffSchema extends SanityDocBase {
  _type: 'staffMember';
  name: string;
  role: string;
  bio: string[];
  photo: {
    url: string;
    alt: string;
  };
  email?: string;
}

export interface SanitySiteSettingsSchema extends SanityDocBase {
  _type: 'siteSettings';
  siteTitle: string;
  tagline: string;
  contactEmail: string;
  givebutterCampaignUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
}

export const sanitySchemaCode = `// Sanity Studio Schema Config (sanity.config.ts / schemas/)
import { defineType, defineField } from 'sanity'

export const causeSchema = defineType({
  name: 'cause',
  title: 'Causes & Programs',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Nutrition', 'Education', 'Discipleship'] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'shortDescription', title: 'Short Summary', type: 'text', rows: 3 }),
    defineField({ name: 'bodyContent', title: 'Full Narrative', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'impactMetrics',
      title: 'Impact Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Metric Value (e.g. 4,500+)', type: 'string' },
            { name: 'label', title: 'Metric Label (e.g. Meals Served)', type: 'string' },
          ],
        },
      ],
    }),
  ],
})

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Site Title', type: 'string' }),
    defineField({ name: 'contactEmail', title: 'Primary Contact Email', type: 'string' }),
    defineField({ name: 'givebutterCampaignUrl', title: 'Givebutter Campaign URL', type: 'url' }),
  ],
})
`;
