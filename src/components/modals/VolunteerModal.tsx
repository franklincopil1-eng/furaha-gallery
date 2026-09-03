import React, { useState } from 'react';
import { Users, CheckCircle2, X, Send } from 'lucide-react';
import { supabaseDb } from '../../supabase/client';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    interests: [] as string[],
    availability: 'Flexible / As Needed',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const interestOptions = [
    'Tutoring & Educational Support',
    'Nutrition & Food Distribution',
    'Youth Mentorship & Discipleship',
    'Prayer Network & Intercession',
    'Event Planning & Fundraising',
    'Media, Photography & Storytelling',
  ];

  const handleCheckboxToggle = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    supabaseDb.recordVolunteer({
      full_name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      location: formData.location.trim(),
      interests: formData.interests,
      notes: formData.notes.trim(),
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-[28px] overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col border border-gray-100">
        {/* Header */}
        <div className="bg-[#893d2d] text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors font-bold"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-[#f4b83e] text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Join Our Mission</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
            Become a Furaha Volunteer
          </h3>
          <p className="text-xs sm:text-sm text-white/85 mt-1">
            Use your God-given gifts to walk alongside children in need.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h4 className="text-2xl font-bold text-[#893d2d] mb-2 font-display">
                Volunteer Application Received!
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Thank you, <strong>{formData.name}</strong>. Our volunteer coordination team will connect with you at <strong>{formData.email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-[#893d2d] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-[#733123]"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Mwangi"
                    className="w-full bg-[#fdfbf9] border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#893d2d] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@example.com"
                    className="w-full bg-[#fdfbf9] border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#893d2d] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+254 ... / +1 ..."
                    className="w-full bg-[#fdfbf9] border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#893d2d] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Location / Country</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Kenya, USA, UK"
                    className="w-full bg-[#fdfbf9] border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#893d2d] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Areas you would love to serve in:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {interestOptions.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(opt)}
                        onChange={() => handleCheckboxToggle(opt)}
                        className="rounded text-[#893d2d] focus:ring-[#893d2d]"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  How can you best contribute or any questions?
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share a little bit about your background, skills, or calling..."
                  className="w-full bg-[#fdfbf9] border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#893d2d] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#893d2d] hover:bg-[#733123] text-white font-bold text-base py-3.5 rounded-xl shadow-md transition-transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Volunteer Application</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
