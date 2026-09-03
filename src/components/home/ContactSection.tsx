import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, Send, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
    }, 900);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="section-padding bg-white overflow-hidden">
      <div id="section_6" className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Contact Information with staggered slide */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 pt-4"
          >
            <h2
              id="contact-title"
              className="text-[36px] sm:text-[42px] md:text-[46px] font-semibold text-[#893d2d] tracking-[-2px] mb-6"
            >
              Get in touch
            </h2>

            <p className="text-[#717275] text-[16px] leading-[1.65] font-light mb-8">
              We’d love to hear from you! Whether you’re a partner, donor, volunteer, or simply interested in learning more about our work, your voice matters to us.
            </p>

            <div className="border-t border-b border-gray-100 py-6 my-6">
              <h5
                id="contact-info-title"
                className="text-[22px] sm:text-[24px] font-semibold text-[#893d2d] tracking-[-1px] mb-3"
              >
                Contact Information
              </h5>

              <a
                href="mailto:info@meetfuraha.org"
                id="contact-email-link"
                className="inline-flex items-center gap-3 text-[#717275] hover:text-[#893d2d] text-base sm:text-lg font-medium transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#f7e4b7] flex items-center justify-center text-[#893d2d] group-hover:bg-[#893d2d] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>info@meetfuraha.org</span>
              </a>

              <div className="mt-6 text-sm text-[#717275] space-y-2 font-light">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#893d2d] shrink-0" />
                  <span><strong>Response Time:</strong> Typically within 24–48 hours</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form with rising card transition */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="contact-form shadow-md rounded-[20px] p-6 sm:p-10 border border-[#f0dfb8]">
              <h3
                id="contact-form-title"
                className="text-[28px] sm:text-[32px] font-semibold text-[#893d2d] tracking-[-1px] mb-1"
              >
                Contact form
              </h3>
              <p className="text-xs sm:text-sm text-[#717275] font-light mb-6">
                Or, you can just send an email:{' '}
                <a href="mailto:info@meetfuraha.org" className="text-[#893d2d] font-semibold hover:underline">
                  info@meetfuraha.org
                </a>
              </p>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-xl p-8 text-center shadow-xs"
                  >
                    <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-[24px] font-semibold text-[#893d2d] mb-2">
                      Thank You for Reaching Out!
                    </h4>
                    <p className="text-[#717275] text-sm leading-relaxed mb-6 font-light">
                      We have received your message and will get back to you shortly at your email address.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="custom-btn !py-2.5 !px-6 !text-xs !font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="custom-form space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="firstName"
                          id="contact-first-name"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First Name"
                          required
                          className="w-full bg-white text-[#2e2e2e] placeholder-gray-400 px-4 py-3.5 rounded-lg border border-[#e8d7b3] focus:outline-none focus:ring-2 focus:ring-[#893d2d] text-sm sm:text-base transition-all font-light"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="lastName"
                          id="contact-last-name"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last Name"
                          className="w-full bg-white text-[#2e2e2e] placeholder-gray-400 px-4 py-3.5 rounded-lg border border-[#e8d7b3] focus:outline-none focus:ring-2 focus:ring-[#893d2d] text-sm sm:text-base transition-all font-light"
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        required
                        className="w-full bg-white text-[#2e2e2e] placeholder-gray-400 px-4 py-3.5 rounded-lg border border-[#e8d7b3] focus:outline-none focus:ring-2 focus:ring-[#893d2d] text-sm sm:text-base transition-all font-light"
                      />
                    </div>

                    <div>
                      <textarea
                        name="message"
                        id="contact-message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        required
                        className="w-full bg-white text-[#2e2e2e] placeholder-gray-400 p-4 rounded-lg border border-[#e8d7b3] focus:outline-none focus:ring-2 focus:ring-[#893d2d] text-sm sm:text-base transition-all resize-y min-h-[120px] font-light"
                      />
                    </div>

                    <button
                      type="submit"
                      id="contact-form-submit-btn"
                      disabled={isSubmitting}
                      className="custom-btn w-full !py-3.5 sm:!py-4 shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] transition-all"
                    >
                      {isSubmitting ? (
                        <span className="inline-block animate-pulse">Sending Message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-1" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
