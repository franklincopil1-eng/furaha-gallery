import { BookOpen, Utensils, HeartHandshake, Compass } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Furaha's four pillars, as a donor can choose them on the Donate page.
 *
 * Names follow the Our Work page (FourWorkAreas.tsx): Education, Nutrition,
 * Care & Mentorship, Discipleship.
 *
 * GIVEBUTTER FUND IDS: a donor's choice only reaches Givebutter if each pillar
 * has a matching fund in the Givebutter dashboard. Create the four funds there,
 * then paste each fund's numeric ID into `givebutterFundId` below.
 * While an ID is empty, checkout still works, but that choice is NOT recorded.
 */
export type GivingPillarId = 'education' | 'nutrition' | 'care' | 'discipleship';

export interface GivingPillar {
  id: GivingPillarId;
  title: string;
  icon: LucideIcon;
  items: string[];
  badgeColor: string;
  givebutterFundId: string;
  /** Cause names other pages send to #donate, so the right pillar is pre-selected. */
  matchesCauses: string[];
}

export const GIVING_PILLARS: GivingPillar[] = [
  {
    id: 'education',
    title: 'Education',
    icon: BookOpen,
    items: [
      'School fees & registration',
      'Textbooks',
      'Uniforms, shoes & stationery',
      'Term examination costs',
    ],
    badgeColor: 'bg-amber-100/70 text-amber-900',
    givebutterFundId: '',
    matchesCauses: ['Education', 'Education & Scholarship Fund'],
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    icon: Utensils,
    items: [
      'School lunches',
      'Food for the home',
    ],
    badgeColor: 'bg-orange-100/70 text-orange-900',
    givebutterFundId: '',
    matchesCauses: ['Nutrition'],
  },
  {
    id: 'care',
    title: 'Care & Mentorship',
    icon: HeartHandshake,
    items: [
      'Mentorship & encouragement',
      'Visits and check-ins',
      'Help when a family is in crisis',
    ],
    badgeColor: 'bg-emerald-100/70 text-emerald-900',
    givebutterFundId: '',
    matchesCauses: ['Care & Mentorship'],
  },
  {
    id: 'discipleship',
    title: 'Discipleship',
    icon: Compass,
    items: [
      'Bibles',
      'Prayer',
      'Bible lessons at school',
    ],
    badgeColor: 'bg-rose-100/70 text-rose-900',
    givebutterFundId: '',
    matchesCauses: ['Discipleship'],
  },
];

export function findPillarById(id: GivingPillarId | null | undefined): GivingPillar | null {
  return GIVING_PILLARS.find((p) => p.id === id) ?? null;
}

export function findPillarByCause(cause: string | null | undefined): GivingPillar | null {
  if (!cause) return null;
  return GIVING_PILLARS.find((p) => p.matchesCauses.includes(cause)) ?? null;
}
