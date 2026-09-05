import fs from 'fs';
import path from 'path';

const classified = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'scripts', 'ai-classified-gallery.json'), 'utf-8')
);

const CATEGORY_LABELS: Record<string, string> = {
  'faith-discipleship': 'Faith & Discipleship',
  'books-study': 'Books & Learning',
  'classroom-desks': 'Classrooms & Campus',
  'school-uniforms': 'Uniforms & Students',
  'nutrition-community': 'Nutrition & Community Relief',
  'sanitation-repairs': 'Sanitation & Facility Repairs',
};

// Select 5 best featured items across categories for the curated section
// 1 from faith, 1 from books, 1 from classrooms, 1 from uniforms, 1 from nutrition
const featuredCategoryPicks = [
  'faith-discipleship',
  'books-study',
  'classroom-desks',
  'school-uniforms',
  'nutrition-community',
];

const featuredIds = new Set<string>();
for (const cat of featuredCategoryPicks) {
  const match = classified.find((c: any) => c.aiCategory === cat && c.isFeaturedCandidate)
    || classified.find((c: any) => c.aiCategory === cat);
  if (match) {
    featuredIds.add(match.id);
  }
}

// Generate the updated items array
const updatedItems = classified.map((item: any) => {
  const isFeatured = featuredIds.has(item.id);
  return {
    id: item.id,
    type: 'photo' as const,
    title: item.suggestedTitle,
    subtitle: item.aiDetailedCaption,
    category: item.aiCategory,
    categoryLabel: CATEGORY_LABELS[item.aiCategory] || item.aiCategory,
    src: item.src,
    location: 'Kenya',
    objectPosition: item.objectPosition || 'object-center',
    layout: item.recommendedLayout || 'standard',
    isFeatured,
    aiVisualDescription: item.aiVisualDescription,
    detectedElements: item.detectedElements || [],
  };
});

// Write to updated galleryData.ts
const code = `export type GalleryCategory =
  | 'faith-discipleship'
  | 'books-study'
  | 'classroom-desks'
  | 'school-uniforms'
  | 'nutrition-community'
  | 'sanitation-repairs';

export interface GalleryCategoryMeta {
  id: GalleryCategory;
  label: string;
  description: string;
}

export const GALLERY_CATEGORIES: GalleryCategoryMeta[] = [
  {
    id: 'faith-discipleship',
    label: 'Faith & Discipleship',
    description: 'Christian fellowship, Sunday school, prayer circles, and discipleship gatherings.',
  },
  {
    id: 'books-study',
    label: 'Books & Learning',
    description: 'Course textbooks, notebooks, literacy materials, and student study supplies.',
  },
  {
    id: 'classroom-desks',
    label: 'Classrooms & Campus',
    description: 'Classroom buildings, wooden study desks, campus grounds, and learning spaces.',
  },
  {
    id: 'school-uniforms',
    label: 'Uniforms & Students',
    description: 'School uniforms, sweaters, footwear, student dignity, and campus life.',
  },
  {
    id: 'nutrition-community',
    label: 'Nutrition & Community Relief',
    description: 'Food care packages, dry grain supplies, community pantry support, and relief.',
  },
  {
    id: 'sanitation-repairs',
    label: 'Sanitation & Facility Repairs',
    description: 'Ventilated washrooms, plumbing installations, clean facilities, and repairs.',
  },
];

export type GalleryLayout = 'standard' | 'wide' | 'portrait';

export interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  subtitle?: string;
  category: GalleryCategory;
  categoryLabel: string;
  src: string;
  poster?: string;
  location?: string;
  duration?: string;
  objectPosition?: string;
  layout?: GalleryLayout;
  isFeatured?: boolean;
  aiVisualDescription?: string;
  detectedElements?: string[];
}

export const GALLERY_ITEMS: GalleryItem[] = ${JSON.stringify(updatedItems, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'src/components/gallery/galleryData.ts'), code, 'utf-8');
console.log('Successfully updated src/components/gallery/galleryData.ts with AI classified data!');
