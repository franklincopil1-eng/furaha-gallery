/**
 * Givebutter Payment & Webhook Integration
 * Connects Givebutter donation flows with Next.js/Vite API routes & Supabase logging.
 */

import { supabaseDb } from '../supabase/client';

export const GIVEBUTTER_CAMPAIGN_URL = 'https://givebutter.com/givetofuraha';

export interface GivebutterWebhookPayload {
  event: 'transaction.created' | 'transaction.succeeded' | 'subscription.created';
  data: {
    id: string;
    amount: number;
    currency: string;
    donor: {
      first_name: string;
      last_name: string;
      email: string;
      phone?: string;
    };
    campaign: {
      id: string;
      title: string;
    };
    frequency?: 'once' | 'monthly';
    cause?: string;
    created_at: string;
  };
}

/**
 * Generates the Givebutter checkout URL with prefilled parameters
 */
export function getGivebutterCheckoutUrl(options?: {
  amount?: number;
  frequency?: 'once' | 'monthly';
  cause?: string;
}): string {
  const url = new URL(GIVEBUTTER_CAMPAIGN_URL);
  if (options?.amount && options.amount > 0) {
    url.searchParams.set('amount', options.amount.toString());
  }
  if (options?.frequency) {
    url.searchParams.set('frequency', options.frequency);
  }
  return url.toString();
}

/**
 * Processes incoming Givebutter Webhook and syncs to Supabase / PostgreSQL
 */
export function processGivebutterWebhook(payload: GivebutterWebhookPayload) {
  const { data } = payload;
  const fullName = `${data.donor.first_name || ''} ${data.donor.last_name || ''}`.trim() || 'Anonymous Supporter';

  const donation = supabaseDb.recordDonation({
    givebutter_transaction_id: data.id,
    donor_name: fullName,
    donor_email: data.donor.email || 'donor@givebutter.com',
    amount: data.amount,
    currency: data.currency || 'USD',
    frequency: data.frequency || 'once',
    cause_designated: data.cause || 'Where Needed Most',
    status: 'succeeded',
  });

  return donation;
}
