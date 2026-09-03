export type GalleryCategory =
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
    description: 'New ventilated washrooms, plumbing installations, clean facilities, and repairs.',
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
  // ==========================================
  // 1. FAITH & DISCIPLESHIP (5 distinct photos)
  // ==========================================
  {
    id: 'photo-discipleship-church',
    type: 'photo',
    title: 'Sunday Fellowship Gathering',
    subtitle: 'Sunday school and youth discipleship',
    category: 'faith-discipleship',
    categoryLabel: 'Faith & Discipleship',
    src: '/images/discipleship-kibera-church.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-field-outreach-13',
    type: 'photo',
    title: 'Community Fellowship',
    subtitle: 'Mentorship and family fellowship',
    category: 'faith-discipleship',
    categoryLabel: 'Faith & Discipleship',
    src: '/images/field-outreach-13.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-field-outreach-14',
    type: 'photo',
    title: 'Youth Ministry & Prayer',
    subtitle: 'Weekly youth prayer circle',
    category: 'faith-discipleship',
    categoryLabel: 'Faith & Discipleship',
    src: '/images/field-outreach-14.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-field-outreach-18',
    type: 'photo',
    title: 'Praise & Fellowship',
    subtitle: 'Worship and celebration',
    category: 'faith-discipleship',
    categoryLabel: 'Faith & Discipleship',
    src: '/images/field-outreach-18.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-community-fellowship',
    type: 'photo',
    title: "Amani Children's Fellowship",
    subtitle: 'Caregivers and children gathered in fellowship',
    category: 'faith-discipleship',
    categoryLabel: 'Faith & Discipleship',
    src: '/images/DSCF0856.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },

  // ==========================================
  // 2. BOOKS & LEARNING (4 distinct photos)
  // ==========================================
  {
    id: 'photo-students-holding-books',
    type: 'photo',
    title: 'Textbooks Distribution',
    subtitle: 'Primary students with curriculum readers',
    category: 'books-study',
    categoryLabel: 'Books & Learning',
    src: '/images/education-books-students.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-study-books-desks',
    type: 'photo',
    title: 'Study Materials & Desks',
    subtitle: 'Exercise books and study materials',
    category: 'books-study',
    categoryLabel: 'Books & Learning',
    src: '/images/DSCF0024.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-field-learning-1',
    type: 'photo',
    title: 'Classroom Reading Session',
    subtitle: 'Literacy and guided reading practice',
    category: 'books-study',
    categoryLabel: 'Books & Learning',
    src: '/images/field-learning-1.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-learning-supplies-delivery',
    type: 'photo',
    title: 'Educational Supplies Delivery',
    subtitle: 'Distribution of textbooks and stationery',
    category: 'books-study',
    categoryLabel: 'Books & Learning',
    src: '/images/volunteer-helping-with-donation-box1.jpeg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },

  // ==========================================
  // 3. CLASSROOMS & CAMPUS (4 distinct photos)
  // ==========================================
  {
    id: 'photo-amani-classroom-desks',
    type: 'photo',
    title: "Amani Learning Desks",
    subtitle: 'Classroom study benches and desks',
    category: 'classroom-desks',
    categoryLabel: 'Classrooms & Campus',
    src: '/images/DSCF0007.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-purity-teacher',
    type: 'photo',
    title: 'Teacher Purity',
    subtitle: 'Community learning center classroom',
    category: 'classroom-desks',
    categoryLabel: 'Classrooms & Campus',
    src: '/images/Purity.jpg',
    location: 'Kenya',
    objectPosition: 'object-top',
  },
  {
    id: 'photo-field-classroom-4',
    type: 'photo',
    title: 'Classroom Instruction',
    subtitle: 'Active teacher-student lesson in session',
    category: 'classroom-desks',
    categoryLabel: 'Classrooms & Campus',
    src: '/images/field-classroom-4.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-field-campus-7',
    type: 'photo',
    title: 'School Compound',
    subtitle: 'Classrooms and outdoor learning grounds',
    category: 'classroom-desks',
    categoryLabel: 'Classrooms & Campus',
    src: '/images/field-campus-7.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },

  // ==========================================
  // 4. UNIFORMS & STUDENTS (6 distinct photos)
  // ==========================================
  {
    id: 'photo-westhill-uniforms',
    type: 'photo',
    title: 'Students in Uniform',
    subtitle: 'Community primary students',
    category: 'school-uniforms',
    categoryLabel: 'Uniforms & Students',
    src: '/images/DSCF0817.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-uniform-wardrobe',
    type: 'photo',
    title: 'School Uniform Set',
    subtitle: 'Uniform sweater, shirt, and shoes',
    category: 'school-uniforms',
    categoryLabel: 'Uniforms & Students',
    src: '/images/uniform.jpeg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-field-students-10',
    type: 'photo',
    title: 'Morning Assembly',
    subtitle: 'Students gathered before class begins',
    category: 'school-uniforms',
    categoryLabel: 'Uniforms & Students',
    src: '/images/field-students-10.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-field-portrait-12',
    type: 'photo',
    title: 'Student Portrait',
    subtitle: 'Student in classroom uniform',
    category: 'school-uniforms',
    categoryLabel: 'Uniforms & Students',
    src: '/images/field-portrait-12.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-field-activity-3',
    type: 'photo',
    title: 'Campus Recreation',
    subtitle: 'Children during outdoor play',
    category: 'school-uniforms',
    categoryLabel: 'Uniforms & Students',
    src: '/images/field-activity-3.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-maggie-founder',
    type: 'photo',
    title: 'Maggie Mburu — Founder',
    subtitle: 'Furaha Ministries leadership in Kenya',
    category: 'school-uniforms',
    categoryLabel: 'Uniforms & Students',
    src: '/images/maggienew2.jpg',
    location: 'Kenya',
    objectPosition: 'object-top',
  },

  // ==========================================
  // 5. NUTRITION & COMMUNITY RELIEF (5 distinct photos)
  // ==========================================
  {
    id: 'photo-nutrition-food-support',
    type: 'photo',
    title: 'Daily Meal Support',
    subtitle: 'Warm nourishing school meals',
    category: 'nutrition-community',
    categoryLabel: 'Nutrition & Community Relief',
    src: '/images/Nutrition.png',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-field-community-5',
    type: 'photo',
    title: 'Community Food Distribution',
    subtitle: 'Dry grain and flour distribution',
    category: 'nutrition-community',
    categoryLabel: 'Nutrition & Community Relief',
    src: '/images/field-community-5.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-field-outreach-15',
    type: 'photo',
    title: 'Food Pantry Supplies',
    subtitle: 'Staple food provisions for families',
    category: 'nutrition-community',
    categoryLabel: 'Nutrition & Community Relief',
    src: '/images/field-outreach-15.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-foodbank-volunteers',
    type: 'photo',
    title: 'Food Preparation',
    subtitle: 'Preparing meal parcels',
    category: 'nutrition-community',
    categoryLabel: 'Nutrition & Community Relief',
    src: '/images/group-people-volunteering-foodbank-poor-people.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-clothes-supplies-sorting',
    type: 'photo',
    title: 'Essential Clothing Distribution',
    subtitle: 'Sorting clothing donations',
    category: 'nutrition-community',
    categoryLabel: 'Nutrition & Community Relief',
    src: '/images/volunteer-selecting-organizing-clothes-donations-charity.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },

  // ==========================================
  // 6. SANITATION & FACILITY REPAIRS (6 distinct photos)
  // ==========================================
  {
    id: 'photo-new-washrooms-completed',
    type: 'photo',
    title: 'Completed Washrooms',
    subtitle: 'Clean ventilated facility block',
    category: 'sanitation-repairs',
    categoryLabel: 'Sanitation & Facility Repairs',
    src: '/images/video_frame_new_bathrooms.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-sanitation-construction',
    type: 'photo',
    title: 'Foundation & Masonry',
    subtitle: 'Facility construction',
    category: 'sanitation-repairs',
    categoryLabel: 'Sanitation & Facility Repairs',
    src: '/images/video_frame_construction.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-carpentry-doors',
    type: 'photo',
    title: 'Carpentry Framing',
    subtitle: 'Doors and ventilation framing',
    category: 'sanitation-repairs',
    categoryLabel: 'Sanitation & Facility Repairs',
    src: '/images/video_frame_carpentry.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-plumbing-materials',
    type: 'photo',
    title: 'Plumbing & Pipes',
    subtitle: 'Quality piping and fittings',
    category: 'sanitation-repairs',
    categoryLabel: 'Sanitation & Facility Repairs',
    src: '/images/video_frame_materials.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-documented-sanitation-need',
    type: 'photo',
    title: 'Site Assessment',
    subtitle: 'Sanitation inspection before construction',
    category: 'sanitation-repairs',
    categoryLabel: 'Sanitation & Facility Repairs',
    src: '/images/video_frame_need.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-old-bathrooms-before',
    type: 'photo',
    title: 'Facility Before Repairs',
    subtitle: 'Latrines prior to replacement',
    category: 'sanitation-repairs',
    categoryLabel: 'Sanitation & Facility Repairs',
    src: '/images/video_frame_old_bathrooms.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
];
