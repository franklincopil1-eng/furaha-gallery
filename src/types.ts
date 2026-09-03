export interface CauseItem {
  id: string;
  title: string;
  category: 'Nutrition' | 'Education' | 'Discipleship';
  image: string;
  shortDesc: string;
  fullDesc: string;
  impactMetrics: {
    label: string;
    value: string;
  }[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  location?: string;
  image: string;
}

export interface DonationOption {
  amount: number | 'other';
  label: string;
  impactNote: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  purpose?: string;
}
