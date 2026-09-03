export type GalleryCategory =
  | 'classroom-desks'
  | 'books-study'
  | 'school-uniforms'
  | 'sanitation-repairs';

export interface GalleryCategoryMeta {
  id: GalleryCategory;
  label: string;
  description: string;
}

export const GALLERY_CATEGORIES: GalleryCategoryMeta[] = [
  {
    id: 'classroom-desks',
    label: 'Classroom & Desks',
    description: 'Classroom blocks, learning desks, and dedicated student study spaces.',
  },
  {
    id: 'books-study',
    label: 'Books & Study Materials',
    description: 'Textbooks, notebooks, revision materials, and learning supplies.',
  },
  {
    id: 'school-uniforms',
    label: 'School Uniforms',
    description: 'Clean uniforms, school footwear, and student dignity on campus.',
  },
  {
    id: 'sanitation-repairs',
    label: 'Sanitation & Facility Repairs',
    description: 'Clean washroom facilities, plumbing, and physical campus improvements.',
  },
];

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
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // Videos
  {
    id: 'vid-amani-sanitation',
    type: 'video',
    title: "Amani Children's Home",
    subtitle: 'Sanitation Project',
    category: 'sanitation-repairs',
    categoryLabel: 'Sanitation & Facility Repairs',
    src: '/amani-sanitation.mp4',
    poster: '/video_frame_new_bathrooms.jpg',
    location: 'Kenya',
    duration: '1:18',
  },
  {
    id: 'vid-westhill',
    type: 'video',
    title: 'West Hill',
    subtitle: 'Learning Facility Construction',
    category: 'sanitation-repairs',
    categoryLabel: 'Sanitation & Facility Repairs',
    src: '/westhill_sanitation.mp4',
    poster: '/video_frame_construction.jpg',
    location: 'Limuru, Kenya',
    duration: '1:05',
  },
  {
    id: 'vid-furaha-work',
    type: 'video',
    title: "Amani Children's Home",
    subtitle: 'Joy & Community Life',
    category: 'school-uniforms',
    categoryLabel: 'School Uniforms',
    src: '/video.mp4',
    poster: '/DSCF0856.jpg',
    location: 'Kenya',
    duration: '2:15',
  },

  // Photos - Classroom & Desks
  {
    id: 'photo-amani-desks',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Classroom & Learning Desks',
    category: 'classroom-desks',
    categoryLabel: 'Classroom & Desks',
    src: '/DSCF0007.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-amani-study',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Desk Study & Tutoring',
    category: 'classroom-desks',
    categoryLabel: 'Classroom & Desks',
    src: '/DSCF0009.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-purity-teacher',
    type: 'photo',
    title: 'West Hill',
    subtitle: 'Teacher Purity & Classroom Desks',
    category: 'classroom-desks',
    categoryLabel: 'Classroom & Desks',
    src: '/Purity.jpg',
    location: 'Limuru, Kenya',
    objectPosition: 'object-top',
  },

  // Photos - Books & Study Materials
  {
    id: 'photo-study-books',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Textbooks & Revision Materials',
    category: 'books-study',
    categoryLabel: 'Books & Study Materials',
    src: '/DSCF0024.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-learning-packs',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Study Supplies & Material Packs',
    category: 'books-study',
    categoryLabel: 'Books & Study Materials',
    src: '/volunteer-helping-with-donation-box1.jpeg',
    location: 'Kenya',
  },
  {
    id: 'photo-supplies-dist',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Core Learning Distribution',
    category: 'books-study',
    categoryLabel: 'Books & Study Materials',
    src: '/group-people-volunteering-foodbank-poor-people.jpg',
    location: 'Kenya',
  },

  // Photos - School Uniforms
  {
    id: 'photo-westhill-uniforms',
    type: 'photo',
    title: 'West Hill',
    subtitle: 'Students in School Uniforms',
    category: 'school-uniforms',
    categoryLabel: 'School Uniforms',
    src: '/DSCF0817.jpg',
    location: 'Limuru, Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-amani-fellowship',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Community Gathering & Fellowship',
    category: 'school-uniforms',
    categoryLabel: 'School Uniforms',
    src: '/DSCF0856.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-maggie-care',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'On-Ground Care & Mentorship',
    category: 'school-uniforms',
    categoryLabel: 'School Uniforms',
    src: '/maggienew2.jpg',
    location: 'Kenya',
    objectPosition: 'object-top',
  },

  // Photos - Sanitation & Facility Repairs
  {
    id: 'photo-new-bathrooms',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'New Washrooms Facility',
    category: 'sanitation-repairs',
    categoryLabel: 'Sanitation & Facility Repairs',
    src: '/video_frame_new_bathrooms.jpg',
    location: 'Kenya',
  },
  {
    id: 'photo-facility-construction',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Facility Construction in Progress',
    category: 'sanitation-repairs',
    categoryLabel: 'Sanitation & Facility Repairs',
    src: '/video_frame_construction.jpg',
    location: 'Kenya',
  },
  {
    id: 'photo-building-materials',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Building Supplies & Plumbing',
    category: 'sanitation-repairs',
    categoryLabel: 'Sanitation & Facility Repairs',
    src: '/video_frame_materials.jpg',
    location: 'Kenya',
  },
  {
    id: 'photo-before-repairs',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Facility Prior to Repairs',
    category: 'sanitation-repairs',
    categoryLabel: 'Sanitation & Facility Repairs',
    src: '/video_frame_old_bathrooms.jpg',
    location: 'Kenya',
  },
];
