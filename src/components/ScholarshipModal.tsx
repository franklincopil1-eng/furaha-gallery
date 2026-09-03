import React, { useState } from 'react';
import { GraduationCap, Heart, CheckCircle2, X, BookOpen, Award, Sparkles } from 'lucide-react';
import { supabaseDb } from '../supabase/client';

interface ScholarshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSponsorClick: () => void;
}

export const ScholarshipModal: React.FC<ScholarshipModalProps> = ({
  isOpen,
  onClose,
  onSponsorClick,
}) => {
  const [partnerType, setPartnerType] = useState<'individual' | 'church' | 'school'>('individual');
  const [submitted, setSubmitted] = useState(false);
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorEmail, setSponsorEmail] = useState('');

  if (!isOpen) return null;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    supabaseDb.recordScholarship({
      sponsor_name: sponsorName.trim(),
      sponsor_email: sponsorEmail.trim(),
      target_tier: partnerType === 'school' ? 'Classroom Partner' : 'Secondary Boarding & Tuition ($65/mo)',
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-[28px] overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col border border-gray-100">
        {/* Header */}
        <div className="bg-[#893d2d] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors font-bold"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-[#f4b83e] text-xs font-bold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Furaha Academic Pathways</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
            Furaha Scholarship Program
          </h3>
          <p className="text-xs sm:text-sm text-white/85 mt-1">
            Breaking the cycle of poverty by providing tuition, books, uniforms, and mentorship.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h4 className="text-2xl font-bold text-[#893d2d] mb-2 font-display">
                Scholarship Sponsorship Inquiry Received
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md mx-auto">
                Thank you, <strong>{sponsorName}</strong>. Our student sponsorship director will email you student profiles and sponsorship matching details at <strong>{sponsorEmail}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-[#893d2d] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-[#733123]"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* How it works */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#faedd0]/40 p-4 rounded-2xl border border-[#faedd0] text-center">
                  <div className="w-8 h-8 rounded-full bg-[#893d2d] text-white flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                    1
                  </div>
                  <h5 className="font-bold text-xs text-[#893d2d] uppercase">Identification</h5>
                  <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                    Identifying vulnerable orphans and high-potential students in risk zones.
                  </p>
                </div>
                <div className="bg-[#faedd0]/40 p-4 rounded-2xl border border-[#faedd0] text-center">
                  <div className="w-8 h-8 rounded-full bg-[#893d2d] text-white flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                    2
                  </div>
                  <h5 className="font-bold text-xs text-[#893d2d] uppercase">Full Equipping</h5>
                  <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                    School fees, uniforms, textbooks, shoes, meals, and medical coverage.
                  </p>
                </div>
                <div className="bg-[#faedd0]/40 p-4 rounded-2xl border border-[#faedd0] text-center">
                  <div className="w-8 h-8 rounded-full bg-[#893d2d] text-white flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                    3
                  </div>
                  <h5 className="font-bold text-xs text-[#893d2d] uppercase">Christian Mentorship</h5>
                  <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                    Spiritual discipleship and career guidance throughout secondary school.
                  </p>
                </div>
              </div>

              {/* Sponsorship Tiers */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200">
                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#893d2d]" />
                  <span>Sponsorship Options</span>
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900">Primary Student Equipping</p>
                      <p className="text-gray-500">Uniforms, books, meals & learning essentials</p>
                    </div>
                    <span className="font-black text-[#893d2d] text-sm">$35/mo</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#fef8f0] border border-[#f7e4b7]">
                    <div>
                      <p className="font-bold text-gray-900">Secondary Boarding & Tuition</p>
                      <p className="text-gray-500">Full high school tuition, room & board, mentorship</p>
                    </div>
                    <span className="font-black text-[#893d2d] text-sm">$65/mo</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                  Request a Student Profile to Sponsor
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={sponsorName}
                    onChange={(e) => setSponsorName(e.target.value)}
                    className="w-full bg-[#fdfbf9] border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#893d2d] focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={sponsorEmail}
                    onChange={(e) => setSponsorEmail(e.target.value)}
                    className="w-full bg-[#fdfbf9] border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#893d2d] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#893d2d] hover:bg-[#733123] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
                  >
                    Match Me with a Student
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSponsorClick();
                    }}
                    className="bg-[#faedd0] hover:bg-[#f7e4b7] text-[#893d2d] font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Give Direct to Scholarship Fund</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
