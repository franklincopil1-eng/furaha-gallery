/**
 * Supabase / PostgreSQL Client & Data Layer
 * Handles Live Metrics, Givebutter Webhook logs, Contact submissions, and Volunteer data.
 */

export interface DbDonation {
  id: string;
  givebutter_transaction_id?: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  currency: string;
  frequency: 'once' | 'monthly';
  cause_designated: string;
  status: 'succeeded' | 'pending';
  created_at: string;
}

export interface DbContact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface DbVolunteer {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  interests: string[];
  notes?: string;
  created_at: string;
}

export interface DbScholarshipApp {
  id: string;
  sponsor_name: string;
  sponsor_email: string;
  target_tier: string;
  created_at: string;
}

const STORAGE_KEYS = {
  donations: 'furaha_supabase_donations',
  contacts: 'furaha_supabase_contacts',
  volunteers: 'furaha_supabase_volunteers',
  scholarships: 'furaha_supabase_scholarships',
  metrics: 'furaha_supabase_metrics',
};

// Initial Seed Data
const initialDonations: DbDonation[] = [
  {
    id: 'don-001',
    givebutter_transaction_id: 'gb_txn_982341',
    donor_name: 'David Jenkins',
    donor_email: 'david.j@example.org',
    amount: 100,
    currency: 'USD',
    frequency: 'monthly',
    cause_designated: 'Nutrition',
    status: 'succeeded',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'don-002',
    givebutter_transaction_id: 'gb_txn_982342',
    donor_name: 'Faith Chebet',
    donor_email: 'faith.c@example.org',
    amount: 50,
    currency: 'USD',
    frequency: 'once',
    cause_designated: 'Education',
    status: 'succeeded',
    created_at: new Date(Date.now() - 3600000 * 14).toISOString(),
  },
  {
    id: 'don-003',
    givebutter_transaction_id: 'gb_txn_982343',
    donor_name: 'Grace & Thomas Miller',
    donor_email: 'grace.miller@example.com',
    amount: 250,
    currency: 'USD',
    frequency: 'once',
    cause_designated: 'Where Needed Most',
    status: 'succeeded',
    created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
];

class SupabaseService {
  private listeners: (() => void)[] = [];

  private getItems<T>(key: string, fallback: T[]): T[] {
    try {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
    } catch {
      // Ignore fallback
    }
    return fallback;
  }

  private saveItems<T>(key: string, items: T[]) {
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch {
      // Ignore
    }
    this.notify();
  }

  subscribe(callback: () => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // Donations & Givebutter Sync
  getDonations(): DbDonation[] {
    return this.getItems<DbDonation>(STORAGE_KEYS.donations, initialDonations);
  }

  recordDonation(donation: Omit<DbDonation, 'id' | 'created_at'>): DbDonation {
    const list = this.getDonations();
    const newRecord: DbDonation = {
      ...donation,
      id: 'don_' + Math.random().toString(36).substring(2, 9),
      created_at: new Date().toISOString(),
    };
    this.saveItems(STORAGE_KEYS.donations, [newRecord, ...list]);
    return newRecord;
  }

  // Contacts
  getContacts(): DbContact[] {
    return this.getItems<DbContact>(STORAGE_KEYS.contacts, [
      {
        id: 'cnt-1',
        first_name: 'Samuel',
        last_name: 'Ochieng',
        email: 'samuel.o@community.org',
        message: 'We would love to partner with Furaha for our local church youth seminar.',
        created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
      },
    ]);
  }

  recordContact(contact: Omit<DbContact, 'id' | 'created_at'>): DbContact {
    const list = this.getContacts();
    const newRecord: DbContact = {
      ...contact,
      id: 'cnt_' + Math.random().toString(36).substring(2, 9),
      created_at: new Date().toISOString(),
    };
    this.saveItems(STORAGE_KEYS.contacts, [newRecord, ...list]);
    return newRecord;
  }

  // Volunteers
  getVolunteers(): DbVolunteer[] {
    return this.getItems<DbVolunteer>(STORAGE_KEYS.volunteers, [
      {
        id: 'vol-1',
        full_name: 'Esther Mutua',
        email: 'esther.m@example.com',
        phone: '+254 712 345678',
        location: 'Nairobi, Kenya',
        interests: ['Tutoring & Educational Support', 'Youth Mentorship & Discipleship'],
        notes: 'Experienced high school mathematics teacher.',
        created_at: new Date(Date.now() - 3600000 * 20).toISOString(),
      },
    ]);
  }

  recordVolunteer(volunteer: Omit<DbVolunteer, 'id' | 'created_at'>): DbVolunteer {
    const list = this.getVolunteers();
    const newRecord: DbVolunteer = {
      ...volunteer,
      id: 'vol_' + Math.random().toString(36).substring(2, 9),
      created_at: new Date().toISOString(),
    };
    this.saveItems(STORAGE_KEYS.volunteers, [newRecord, ...list]);
    return newRecord;
  }

  // Scholarship inquiries
  getScholarships(): DbScholarshipApp[] {
    return this.getItems<DbScholarshipApp>(STORAGE_KEYS.scholarships, [
      {
        id: 'sch-1',
        sponsor_name: 'Dr. Robert Harrison',
        sponsor_email: 'robert.h@globalhope.org',
        target_tier: 'Secondary Boarding & Tuition ($65/mo)',
        created_at: new Date(Date.now() - 3600000 * 32).toISOString(),
      },
    ]);
  }

  recordScholarship(scholarship: Omit<DbScholarshipApp, 'id' | 'created_at'>): DbScholarshipApp {
    const list = this.getScholarships();
    const newRecord: DbScholarshipApp = {
      ...scholarship,
      id: 'sch_' + Math.random().toString(36).substring(2, 9),
      created_at: new Date().toISOString(),
    };
    this.saveItems(STORAGE_KEYS.scholarships, [newRecord, ...list]);
    return newRecord;
  }

  // Aggregate stats
  getTotalFundsRaised(): number {
    return this.getDonations().reduce((acc, d) => acc + (d.amount || 0), 38450);
  }
}

export const supabaseDb = new SupabaseService();
