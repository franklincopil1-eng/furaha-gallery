export interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  subtitle?: string;
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
    src: '/amani-sanitation.mp4',
    poster: '/video_frame_new_bathrooms.jpg',
    location: 'Kenya',
    duration: '1:18',
  },
  {
    id: 'vid-westhill',
    type: 'video',
    title: 'West Hill',
    subtitle: 'Learning Community',
    src: '/westhill_sanitation.mp4',
    poster: '/video_frame_construction.jpg',
    location: 'Limuru, Kenya',
    duration: '1:05',
  },
  {
    id: 'vid-furaha-work',
    type: 'video',
    title: 'Furaha Ministries',
    subtitle: 'Moments from the Work',
    src: '/video.mp4',
    poster: '/video_master_poster.jpg',
    location: 'Kenya',
    duration: '2:15',
  },

  // Photos
  {
    id: 'photo-amani-students',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Students',
    src: '/DSCF0817.jpg',
    location: 'Kenya',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-purity-teacher',
    type: 'photo',
    title: 'West Hill',
    subtitle: 'Teacher Purity & Students',
    src: '/Purity.jpg',
    location: 'Limuru, Kenya',
    objectPosition: 'object-top',
  },
  {
    id: 'photo-fellowship',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Joyful Gathering',
    src: '/video_frame_grateful_faces.jpg',
    location: 'Kenya',
  },
  {
    id: 'photo-discipleship',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Dedication & Prayer',
    src: '/video_frame_blessing.jpg',
    location: 'Kenya',
  },
  {
    id: 'photo-westhill-class',
    type: 'photo',
    title: 'West Hill',
    subtitle: 'Classroom',
    src: '/Education.jpg',
    location: 'Limuru, Kenya',
  },
  {
    id: 'photo-westhill-food',
    type: 'photo',
    title: 'West Hill',
    subtitle: 'Food Supplies',
    src: '/Nutrition.png',
    location: 'Limuru, Kenya',
  },
  {
    id: 'photo-huruma-clothes',
    type: 'photo',
    title: 'Huruma',
    subtitle: 'Community Outreach',
    src: '/volunteer-selecting-organizing-clothes-donations-charity.jpg',
    location: 'Nairobi, Kenya',
  },
  {
    id: 'photo-community-food-box',
    type: 'photo',
    title: 'Community Support',
    subtitle: 'Food Distribution',
    src: '/volunteer-helping-with-donation-box1.jpeg',
    location: 'Kenya',
  },
  {
    id: 'photo-volunteers',
    type: 'photo',
    title: 'Community Support',
    subtitle: 'Volunteers',
    src: '/group-people-volunteering-foodbank-poor-people.jpg',
    location: 'Kenya',
  },
  {
    id: 'photo-maggie',
    type: 'photo',
    title: 'Furaha Team',
    subtitle: 'Maggie',
    src: '/maggienew2.jpg',
    location: 'Kenya',
    objectPosition: 'object-top',
  },
  {
    id: 'photo-new-bathrooms',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'New Washrooms',
    src: '/video_frame_new_bathrooms.jpg',
    location: 'Kenya',
  },
  {
    id: 'photo-construction',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Construction Work',
    src: '/video_frame_construction.jpg',
    location: 'Kenya',
  },
  {
    id: 'photo-materials',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Building Materials',
    src: '/video_frame_materials.jpg',
    location: 'Kenya',
  },
  {
    id: 'photo-grateful-faces',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Children at Amani',
    src: '/video_frame_grateful_faces.jpg',
    location: 'Kenya',
  },
  {
    id: 'photo-blessing',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Community Blessing',
    src: '/video_frame_blessing.jpg',
    location: 'Kenya',
  },
  {
    id: 'photo-before-project',
    type: 'photo',
    title: "Amani Children's Home",
    subtitle: 'Before the Project',
    src: '/video_frame_old_bathrooms.jpg',
    location: 'Kenya',
  },
];
