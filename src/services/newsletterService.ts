/**
 * Mock Newsletter API Service for Furaha Ministries
 * Simulates backend newsletter subscription with validation, persistence, and latency.
 */

export interface NewsletterSubscriptionResponse {
  success: boolean;
  message: string;
  email?: string;
  timestamp?: string;
}

const STORAGE_KEY = 'furaha_newsletter_subscribers';

/**
 * Validates email with standard RFC 5322 regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

/**
 * Retrieves list of subscribed emails from local persistence
 */
export function getStoredSubscribers(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Subscribes an email to the Furaha Ministries newsletter via mock API service
 */
export async function subscribeToNewsletter(email: string): Promise<NewsletterSubscriptionResponse> {
  const trimmed = email.trim().toLowerCase();

  // Simulate network roundtrip latency (600ms - 900ms)
  await new Promise((resolve) => setTimeout(resolve, 750));

  if (!trimmed) {
    return {
      success: false,
      message: 'Please enter your email address.',
    };
  }

  if (!isValidEmail(trimmed)) {
    return {
      success: false,
      message: 'Please enter a valid email address (e.g., name@example.com).',
    };
  }

  try {
    const existing = getStoredSubscribers();
    if (existing.includes(trimmed)) {
      return {
        success: true,
        message: "You're already subscribed! Thank you for staying connected with Furaha Ministries.",
        email: trimmed,
        timestamp: new Date().toISOString(),
      };
    }

    const updated = [...existing, trimmed];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return {
      success: true,
      message: 'Thank you for subscribing! You will receive our monthly field dispatches and impact updates from Kenya.',
      email: trimmed,
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error('Newsletter subscription storage error:', err);
    return {
      success: true,
      message: 'Thank you for subscribing to Furaha Ministries updates!',
      email: trimmed,
      timestamp: new Date().toISOString(),
    };
  }
}
