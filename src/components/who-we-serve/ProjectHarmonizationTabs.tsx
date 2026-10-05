import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  School,
  Home,
  Heart,
  MapPin,
  Users,
  BookOpen,
  Utensils,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  GraduationCap,
} from 'lucide-react';

export type HarmonizedProjectTab = 'all' | 'west-hill' | 'amani' | 'cry-of-a-young-one';

interface ProjectHarmonizationTabsProps {
  activeTab: HarmonizedProjectTab;
  onTabChange: (tab: HarmonizedProjectTab) => void;
  onDonateToCause: (cause: string) => void;
}

export const ProjectHarmonizationTabs: React.FC<ProjectHarmonizationTabsProps> = ({
  activeTab,
  onTabChange,
  onDonateToCause,
}) => {
  const tabs = [
    {
      id: 'all' as HarmonizedProjectTab,
      label: 'All Initiatives',
      shortLabel: 'Overview',
      icon: Layers,
      badge: 'All Communities',
    },
    {
      id: 'west-hill' as HarmonizedProjectTab,
      label: 'West Hill School',
      shortLabel: 'West Hill',
      icon: School,
      badge: '120+ Students',
    },
    {
      id: 'amani' as HarmonizedProjectTab,
      label: "Amani Children's Home",
      shortLabel: 'Amani Home',
      icon: Home,
      badge: '45+ Residents',
    },
    {
      id: 'cry-of-a-young-one' as HarmonizedProjectTab,
      label: 'Cry of a Young One',
      shortLabel: 'Cry of a Young One',
      icon: Heart,
      badge: '6 Orphaned Children',
    },
  ];

  return (
    <section id="project-tabs-section" className="py-8 sm:py-12 bg-[#fdfbf9] border-b border-[#eee3d8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#893d2d] mb-2">
            2027 Supported Field Initiatives
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#201a18] tracking-tight">
            Supported Projects in Kenya
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#5c544e] max-w-2xl mx-auto leading-relaxed">
            Heading into 2027, every initiative supported by Furaha is documented with distinct headcounts,
            operational needs, and stories—enabling donors to give directly to specific causes.
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex p-1.5 bg-[#f0e6dc] rounded-full border border-[#e2d5c8] max-w-full overflow-x-auto shadow-inner scrollbar-none gap-1 sm:gap-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#893d2d] text-white shadow-xs'
                      : 'text-[#61564f] hover:text-[#201a18] hover:bg-[#e7dbce]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-[#893d2d]'}`} />
                  <span>{tab.label}</span>
                  <span
                    className={`hidden sm:inline-block text-[11px] font-normal ${
                      isActive ? 'text-white/80' : 'text-[#7d7168]'
                    }`}
                  >
                    · {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'west-hill' && (
            <motion.div
              key="tab-west-hill"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-[#ebdcd0] p-6 sm:p-9 shadow-md overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Visual Banner */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 border border-[#ebdcd0] shadow-xs">
                    <img
                      src="/images/classimage-1.jpeg"
                      alt="West Hill students learning in classroom"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#0284c7] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5" />
                      <span>Community School</span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-white/95 text-[#201a18] text-xs font-semibold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 backdrop-blur-xs">
                      <MapPin className="w-3.5 h-3.5 text-[#893d2d]" />
                      <span>Central Kenya Highland Ridge</span>
                    </div>
                  </div>

                  {/* Teacher Spotlight */}
                  <div className="bg-[#fcf8f4] border border-[#f0dfd0] rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-[#893d2d]/10 text-[#893d2d] flex items-center justify-center font-bold">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#201a18]">Teacher Salim & Local Faculty</h4>
                        <p className="text-xs text-[#7d7168]">Guiding students through daily classroom lessons</p>
                      </div>
                    </div>
                    <p className="text-xs text-[#59524e] leading-relaxed italic">
                      "When school fees and supplies are secured, our children don't just stay in school—they
                      excel. Every child deserves to sit at a desk with textbooks and hope."
                    </p>
                  </div>
                </div>

                {/* Right Details & Metrics */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#893d2d] mb-1">
                      Central Kenya · Primary & Junior Secondary Education
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#201a18] tracking-tight">
                      West Hill School
                    </h3>
                    <p className="mt-2 text-sm text-[#59524e] leading-relaxed">
                      West Hill is a community learning center serving children who face severe economic barriers
                      to continuing their education. Without assistance for mandatory tuition levies, uniforms, and
                      books, students are often forced to stay home.
                    </p>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#faf6f0] p-3.5 rounded-xl border border-[#ebdcd0] text-center">
                      <span className="block text-2xl font-black text-[#893d2d]">120+</span>
                      <span className="text-[11px] font-bold text-[#6a5e55]">Students Supported</span>
                    </div>
                    <div className="bg-[#faf6f0] p-3.5 rounded-xl border border-[#ebdcd0] text-center">
                      <span className="block text-2xl font-black text-[#0284c7]">$15<span className="text-xs">/mo</span></span>
                      <span className="text-[11px] font-bold text-[#6a5e55]">Tuition Need / Child</span>
                    </div>
                    <div className="bg-[#faf6f0] p-3.5 rounded-xl border border-[#ebdcd0] text-center">
                      <span className="block text-2xl font-black text-[#16a34a]">100%</span>
                      <span className="text-[11px] font-bold text-[#6a5e55]">Uniform Assistance</span>
                    </div>
                    <div className="bg-[#faf6f0] p-3.5 rounded-xl border border-[#ebdcd0] text-center">
                      <span className="block text-2xl font-black text-[#d97706]">120</span>
                      <span className="text-[11px] font-bold text-[#6a5e55]">Daily Midday Lunches</span>
                    </div>
                  </div>

                  {/* What Furaha Provides & 2027 Goals */}
                  <div className="space-y-4 pt-1">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#201a18] mb-2">
                        Core Program Support:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#59524e]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                          <span>Tuition aid & KCPE/KPSEA examination fees</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                          <span>School uniforms, sturdy shoes & physical kits</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                          <span>Curriculum textbooks & stationery sets</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                          <span>Daily warm lunch prepared on campus</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#f5efe8] p-4 rounded-2xl border border-[#e8dccd]">
                      <h4 className="text-xs font-bold text-[#893d2d] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>2027 Harmonization Goals:</span>
                      </h4>
                      <p className="text-xs text-[#5c534d] leading-relaxed">
                        Onboard incoming Grade 1 students before January term, replace weathered wooden classroom desks,
                        and ensure full textbook coverage for the Grade 7 & 8 CBC junior secondary curriculum.
                      </p>
                    </div>
                  </div>

                  {/* Direct Donation Action */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onDonateToCause('West Hill School')}
                      className="inline-flex items-center gap-2 bg-[#893d2d] hover:bg-[#733123] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Give Directly to West Hill</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-[#71665e]">
                      $15/month covers tuition & supplies for 1 child
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'amani' && (
            <motion.div
              key="tab-amani"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-[#ebdcd0] p-6 sm:p-9 shadow-md overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Visual Banner */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 border border-[#ebdcd0] shadow-xs">
                    <img
                      src="/images/field-community-6.jpg"
                      alt="Children gathered in fellowship at Amani Children's Home"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#893d2d] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                      <Home className="w-3.5 h-3.5" />
                      <span>Residential Care & Home</span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-white/95 text-[#201a18] text-xs font-semibold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 backdrop-blur-xs">
                      <MapPin className="w-3.5 h-3.5 text-[#893d2d]" />
                      <span>Kiambu County, Central Kenya</span>
                    </div>
                  </div>

                  {/* Campus Features */}
                  <div className="bg-[#fcf8f4] border border-[#f0dfd0] rounded-2xl p-4 sm:p-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#893d2d] mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Campus Infrastructure & Living Care</span>
                    </h4>
                    <ul className="text-xs text-[#59524e] space-y-1.5">
                      <li>• Family-style cottage dormitories with house mothers</li>
                      <li>• Dedicated study hall, library, and homework tutoring</li>
                      <li>• Clean borehole water filtration & modern sanitation</li>
                      <li>• Sustainable kitchen garden providing fresh produce</li>
                    </ul>
                  </div>
                </div>

                {/* Right Details & Metrics */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#893d2d] mb-1">
                      Kiambu County · Residential Sanctuary & Family Care
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#201a18] tracking-tight">
                      Amani Children's Home
                    </h3>
                    <p className="mt-2 text-sm text-[#59524e] leading-relaxed">
                      A permanent sanctuary providing orphaned and vulnerable children with secure housing,
                      wholesome meals, educational sponsorships, and unconditional spiritual family care.
                    </p>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#faf6f0] p-3.5 rounded-xl border border-[#ebdcd0] text-center">
                      <span className="block text-2xl font-black text-[#893d2d]">45+</span>
                      <span className="text-[11px] font-bold text-[#6a5e55]">Resident Children</span>
                    </div>
                    <div className="bg-[#faf6f0] p-3.5 rounded-xl border border-[#ebdcd0] text-center">
                      <span className="block text-2xl font-black text-[#d97706]">135</span>
                      <span className="text-[11px] font-bold text-[#6a5e55]">Daily Warm Meals</span>
                    </div>
                    <div className="bg-[#faf6f0] p-3.5 rounded-xl border border-[#ebdcd0] text-center">
                      <span className="block text-2xl font-black text-[#16a34a]">100%</span>
                      <span className="text-[11px] font-bold text-[#6a5e55]">School Attendance</span>
                    </div>
                    <div className="bg-[#faf6f0] p-3.5 rounded-xl border border-[#ebdcd0] text-center">
                      <span className="block text-2xl font-black text-[#0284c7]">6+</span>
                      <span className="text-[11px] font-bold text-[#6a5e55]">Years in Partnership</span>
                    </div>
                  </div>

                  {/* What Furaha Provides & 2027 Goals */}
                  <div className="space-y-4 pt-1">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#201a18] mb-2">
                        What Furaha Provides at Amani:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#59524e]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                          <span>Full primary & secondary school sponsorships</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                          <span>3 daily nutritional meals & clean water</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                          <span>Textbooks, uniforms, and study supplies</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                          <span>Daily mentorship, counseling, and spiritual devotions</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#f5efe8] p-4 rounded-2xl border border-[#e8dccd]">
                      <h4 className="text-xs font-bold text-[#893d2d] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>2027 Harmonization Goals:</span>
                      </h4>
                      <p className="text-xs text-[#5c534d] leading-relaxed">
                        Secure secondary boarding school tuition sponsors for graduating Class 8 students, replenish bulk dry
                        pantry supplies (maize, beans, cooking oil), and expand study hall textbooks.
                      </p>
                    </div>
                  </div>

                  {/* Direct Donation Action */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onDonateToCause("Amani Children's Home")}
                      className="inline-flex items-center gap-2 bg-[#893d2d] hover:bg-[#733123] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Give Directly to Amani Home</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-[#71665e]">
                      $30/month provides full living care, meals & schooling
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'cry-of-a-young-one' && (
            <motion.div
              key="tab-cry"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-[#ebdcd0] p-6 sm:p-9 shadow-md overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Visual Banner */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 border border-[#ebdcd0] shadow-xs">
                    <img
                      src="/images/field-outreach-14.jpg"
                      alt="Cry of a Young One community outreach in Nairobi Kenya"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#b91c1c] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5" />
                      <span>Orphaned Siblings Initiative</span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-white/95 text-[#201a18] text-xs font-semibold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 backdrop-blur-xs">
                      <MapPin className="w-3.5 h-3.5 text-[#893d2d]" />
                      <span>Nairobi / Huruma, Kenya</span>
                    </div>
                  </div>

                  {/* Sibling Preservation Note */}
                  <div className="bg-[#fcf8f4] border border-[#f0dfd0] rounded-2xl p-4 sm:p-5">
                    <h4 className="text-sm font-bold text-[#201a18] mb-1">Keeping Siblings United</h4>
                    <p className="text-xs text-[#59524e] leading-relaxed">
                      Following the sudden loss of both parents, these 6 children faced immediate displacement and
                      separation across informal settlements. Furaha stepped in to secure an apartment home so they could
                      grow up together in safety and dignity.
                    </p>
                  </div>
                </div>

                {/* Right Details & Metrics */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#893d2d] mb-1">
                      Nairobi · Family Preservation & Housing Stability
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#201a18] tracking-tight">
                      Cry of a Young One
                    </h3>
                    <p className="mt-2 text-sm text-[#59524e] leading-relaxed">
                      A dedicated Nairobi initiative providing apartment living assistance, schooling tuition, and daily
                      sustenance for 6 orphaned children who lost both parents.
                    </p>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#faf6f0] p-3.5 rounded-xl border border-[#ebdcd0] text-center">
                      <span className="block text-2xl font-black text-[#893d2d]">6</span>
                      <span className="text-[11px] font-bold text-[#6a5e55]">Orphaned Children</span>
                    </div>
                    <div className="bg-[#faf6f0] p-3.5 rounded-xl border border-[#ebdcd0] text-center">
                      <span className="block text-2xl font-black text-[#16a34a]">1</span>
                      <span className="text-[11px] font-bold text-[#6a5e55]">Secure Apartment Home</span>
                    </div>
                    <div className="bg-[#faf6f0] p-3.5 rounded-xl border border-[#ebdcd0] text-center">
                      <span className="block text-2xl font-black text-[#0284c7]">100%</span>
                      <span className="text-[11px] font-bold text-[#6a5e55]">School Attendance</span>
                    </div>
                    <div className="bg-[#faf6f0] p-3.5 rounded-xl border border-[#ebdcd0] text-center">
                      <span className="block text-2xl font-black text-[#d97706]">3</span>
                      <span className="text-[11px] font-bold text-[#6a5e55]">Daily Meals Provided</span>
                    </div>
                  </div>

                  {/* What Furaha Provides & 2027 Goals */}
                  <div className="space-y-4 pt-1">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#201a18] mb-2">
                        What Furaha Provides for Cry of a Young One:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#59524e]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                          <span>Monthly apartment rent & safe housing stability</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                          <span>School fees, tuition, and term examination levies</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                          <span>Daily food, cooking gas, and basic domestic utilities</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                          <span>Textbooks, uniforms, and mentorship oversight</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#f5efe8] p-4 rounded-2xl border border-[#e8dccd]">
                      <h4 className="text-xs font-bold text-[#893d2d] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>2027 Harmonization Goals:</span>
                      </h4>
                      <p className="text-xs text-[#5c534d] leading-relaxed">
                        Establish dedicated recurring monthly rent sponsorship for the apartment, ensure steady tuition
                        coverage for the school year, and support the eldest children transitioning into secondary vocational studies.
                      </p>
                    </div>
                  </div>

                  {/* Direct Donation Action */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onDonateToCause('Cry of a Young One')}
                      className="inline-flex items-center gap-2 bg-[#893d2d] hover:bg-[#733123] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Give Directly to Cry of a Young One</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-[#71665e]">
                      Directly sponsors apartment living assistance & school tuition
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'all' && (
            <motion.div
              key="tab-all-overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="bg-[#faf7f2] rounded-3xl border border-[#ebdcd0] p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. West Hill Preview Card */}
                <div
                  onClick={() => onTabChange('west-hill')}
                  className="bg-white rounded-2xl border border-[#ebdcd0] p-5 shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-[#893d2d]/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-4 bg-stone-100">
                      <img
                        src="/images/classimage-1.jpeg"
                        alt="West Hill School"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-[#0284c7] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                        School
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#893d2d] mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Central Kenya</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#201a18]">West Hill School</h3>
                    <p className="text-xs text-[#59524e] mt-1.5 leading-relaxed line-clamp-2">
                      120+ students supported with tuition relief, mandatory uniforms, textbooks, and guidance from Teacher Salim.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#f0e6dc] flex items-center justify-between text-xs font-bold text-[#893d2d]">
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 2. Amani Children's Home Preview Card */}
                <div
                  onClick={() => onTabChange('amani')}
                  className="bg-white rounded-2xl border border-[#ebdcd0] p-5 shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-[#893d2d]/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-4 bg-stone-100">
                      <img
                        src="/images/field-community-6.jpg"
                        alt="Amani Children's Home"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-[#893d2d] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                        Residential Home
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#893d2d] mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Kiambu County</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#201a18]">Amani Children's Home</h3>
                    <p className="text-xs text-[#59524e] mt-1.5 leading-relaxed line-clamp-2">
                      A loving home providing permanent shelter, 135 daily warm meals, and full school sponsorship for 45+ children.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#f0e6dc] flex items-center justify-between text-xs font-bold text-[#893d2d]">
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 3. Cry of a Young One Preview Card */}
                <div
                  onClick={() => onTabChange('cry-of-a-young-one')}
                  className="bg-white rounded-2xl border border-[#ebdcd0] p-5 shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-[#893d2d]/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-4 bg-stone-100">
                      <img
                        src="/images/field-outreach-14.jpg"
                        alt="Cry of a Young One"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-[#b91c1c] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                        Orphan Initiative
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#893d2d] mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Nairobi / Huruma</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#201a18]">Cry of a Young One</h3>
                    <p className="text-xs text-[#59524e] mt-1.5 leading-relaxed line-clamp-2">
                      Apartment living assistance and schooling support preserving 6 orphaned siblings together following parental loss.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#f0e6dc] flex items-center justify-between text-xs font-bold text-[#893d2d]">
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
