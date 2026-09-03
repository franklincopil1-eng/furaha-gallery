import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { subscribeToNewsletter } from '../services/newsletterService';

interface NewsletterSubscribeProps {
  className?: string;
  variant?: 'footer' | 'card';
}

export const NewsletterSubscribe: React.FC<NewsletterSubscribeProps> = ({
  className = '',
  variant = 'footer',
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === 'loading') return;

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const res = await subscribeToNewsletter(email);
      if (res.success) {
        setStatus('success');
        setFeedbackMessage(res.message);
        setSubscribedEmail(res.email || email.trim());
        setEmail('');
      } else {
        setStatus('error');
        setFeedbackMessage(res.message);
      }
    } catch {
      setStatus('error');
      setFeedbackMessage('Something went wrong connecting to the service. Please try again.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFeedbackMessage('');
    setEmail('');
  };

  return (
    <div
      id="newsletter-subscription"
      aria-label="Newsletter Subscription"
      className={`relative rounded-2xl transition-all duration-300 ${
        variant === 'footer'
          ? 'bg-black/15 border border-white/20 p-5 sm:p-6 text-white'
          : 'bg-[#faf8f5] border border-[#e9eaeb] p-6 text-[#2e2e2e]'
      } ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left column: Title & explanation */}
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
              <Mail className="w-3.5 h-3.5" />
            </span>
            <h4
              id="newsletter-heading"
              className="text-sm sm:text-base font-bold tracking-tight text-white m-0"
            >
              Stay Connected With Our Mission
            </h4>
          </div>
          <p className="text-white/85 text-xs sm:text-[13px] leading-relaxed m-0 font-normal">
            Subscribe for monthly field dispatches, prayer updates, and firsthand stories of hope from Kenya.
          </p>
        </div>

        {/* Right column: Form or Success Confirmation */}
        <div className="w-full lg:max-w-md">
          {status === 'success' ? (
            <div
              id="newsletter-success-box"
              className="bg-white/95 text-[#201a18] rounded-xl p-3.5 sm:p-4 shadow-sm border border-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#2e7d32] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#1f2937] leading-snug">
                    Subscription Confirmed!
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#555] leading-normal mt-0.5">
                    {feedbackMessage}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                id="newsletter-reset-btn"
                className="text-[11px] font-semibold text-[#893d2d] hover:underline shrink-0 self-end sm:self-center cursor-pointer"
              >
                Add another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} id="newsletter-form" className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <label htmlFor="newsletter-email-input" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email-input"
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email address..."
                    disabled={status === 'loading'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#201a18] placeholder-[#8c8c8c] text-xs sm:text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:bg-white shadow-xs transition-all disabled:opacity-70"
                  />
                </div>
                <button
                  type="submit"
                  id="newsletter-submit-btn"
                  disabled={status === 'loading' || !email.trim()}
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#893d2d] hover:bg-[#733123] text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-98 shrink-0 border border-white/20"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Status or Error Message */}
              {status === 'error' && (
                <div
                  id="newsletter-error-message"
                  className="flex items-center gap-1.5 text-xs text-[#ffebee] bg-[#c62828]/80 px-3 py-1.5 rounded-lg font-medium"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {/* Trust disclaimer */}
              <p className="text-[11px] text-white/75 m-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#f7e4b7]" />
                <span>We respect your privacy. Unsubscribe anytime.</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
