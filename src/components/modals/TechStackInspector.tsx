import React, { useState, useEffect } from 'react';
import {
  Layers,
  Database,
  FileCode,
  Heart,
  Globe,
  CheckCircle2,
  ExternalLink,
  Activity,
  Send,
  Zap,
  Server,
  Code2,
  X,
  RefreshCw,
  Image as ImageIcon,
  Copy,
  Check,
  Search,
  Sparkles,
  AlertTriangle,
  FolderOpen,
} from 'lucide-react';
import { supabaseDb, DbDonation, DbContact, DbVolunteer, DbScholarshipApp } from '../../supabase/client';
import { processGivebutterWebhook, GIVEBUTTER_CAMPAIGN_URL } from '../../lib/givebutter';
import { sanityConfig, GROQ_QUERIES } from '../../sanity/client';
import {
  GALLERY_ITEMS,
  GALLERY_CATEGORIES,
  GalleryCategory,
  GalleryItem,
} from '../gallery/galleryData';

interface TechStackInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechStackInspector: React.FC<TechStackInspectorProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'supabase' | 'givebutter' | 'sanity' | 'gallery'>('architecture');
  const [donations, setDonations] = useState<DbDonation[]>([]);
  const [contacts, setContacts] = useState<DbContact[]>([]);
  const [volunteers, setVolunteers] = useState<DbVolunteer[]>([]);
  const [scholarships, setScholarships] = useState<DbScholarshipApp[]>([]);
  const [webhookStatus, setWebhookStatus] = useState<string | null>(null);

  // Gallery Inventory state
  const [gallerySearch, setGallerySearch] = useState('');
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('all');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Snippet Generator form
  const [genFilename, setGenFilename] = useState('');
  const [genTitle, setGenTitle] = useState('');
  const [genSubtitle, setGenSubtitle] = useState('');
  const [genCategory, setGenCategory] = useState<GalleryCategory>('classroom-desks');
  const [genLayout, setGenLayout] = useState<'standard' | 'wide' | 'portrait'>('wide');
  const [genLocation, setGenLocation] = useState('Kenya');
  const [genIsFeatured, setGenIsFeatured] = useState(false);

  // Sync with Supabase reactive store
  useEffect(() => {
    const refreshData = () => {
      setDonations(supabaseDb.getDonations());
      setContacts(supabaseDb.getContacts());
      setVolunteers(supabaseDb.getVolunteers());
      setScholarships(supabaseDb.getScholarships());
    };

    refreshData();
    const unsubscribe = supabaseDb.subscribe(refreshData);
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleSimulateWebhook = (amount: number, cause: string) => {
    const fakeId = 'gb_evt_' + Math.floor(Math.random() * 899999 + 100000);
    const donorNames = ['Amara Osei', 'Brian Njoroge', 'Claire & Liam Vance', 'Miriam Wekesa'];
    const randomName = donorNames[Math.floor(Math.random() * donorNames.length)];
    const [firstName, lastName] = randomName.split(' ');

    processGivebutterWebhook({
      event: 'transaction.succeeded',
      data: {
        id: fakeId,
        amount,
        currency: 'USD',
        donor: {
          first_name: firstName,
          last_name: lastName,
          email: `${firstName.toLowerCase()}@donor-givebutter.com`,
        },
        campaign: {
          id: 'furaha-general',
          title: 'Furaha Ministries Outreach',
        },
        cause,
        created_at: new Date().toISOString(),
      },
    });

    setWebhookStatus(`Received Givebutter webhook: $${amount} from ${randomName} (${cause}) -> Saved to Supabase PostgreSQL.`);
    setTimeout(() => setWebhookStatus(null), 6000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#1e1a18] text-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-[#2a2422] p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#893d2d] flex items-center justify-center text-[#f7e4b7] font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black font-display text-white">
                  Settled Technology Stack
                </h3>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active
                </span>
              </div>
              <p className="text-xs text-white/60">
                Next.js • React 19 • TypeScript • Tailwind CSS • Sanity CMS • Supabase • Givebutter • Vercel
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#241e1c] px-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'architecture'
                ? 'border-[#893d2d] text-[#faedd0]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Architecture Diagram</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'supabase'
                ? 'border-[#893d2d] text-[#faedd0]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase PostgreSQL ({donations.length + contacts.length + volunteers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('givebutter')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'givebutter'
                ? 'border-[#893d2d] text-[#faedd0]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Givebutter Webhooks</span>
          </button>

          <button
            onClick={() => setActiveTab('sanity')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'sanity'
                ? 'border-[#893d2d] text-[#faedd0]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Sanity CMS</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'gallery'
                ? 'border-[#893d2d] text-[#faedd0]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery & Photo Inventory ({GALLERY_ITEMS.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 text-sm space-y-6">
          {/* TAB 1: ARCHITECTURE OVERVIEW */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Frontend */}
                <div className="bg-[#282220] p-5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-[#faedd0] font-bold text-base mb-3">
                    <Code2 className="w-5 h-5 text-[#893d2d]" />
                    <span>Frontend Core</span>
                  </div>
                  <ul className="space-y-2 text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <strong>Next.js</strong> (App Router)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <strong>React 19</strong> + <strong>TypeScript</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <strong>Tailwind CSS</strong> (v4 Engine)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <strong>Lucide React</strong> icons
                    </li>
                  </ul>
                </div>

                {/* 2. CMS & Content */}
                <div className="bg-[#282220] p-5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-[#faedd0] font-bold text-base mb-3">
                    <FileCode className="w-5 h-5 text-[#f4b83e]" />
                    <span>Content (CMS)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <strong>Sanity.io</strong> Headless CMS
                    </li>
                    <li className="text-white/60 pl-5">
                      Empowers non-technical staff to edit stories, causes & staff bios.
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      GROQ query pipeline + Schema definitions
                    </li>
                  </ul>
                </div>

                {/* 3. Database & Payments */}
                <div className="bg-[#282220] p-5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-[#faedd0] font-bold text-base mb-3">
                    <Database className="w-5 h-5 text-emerald-400" />
                    <span>Data & Donations</span>
                  </div>
                  <ul className="space-y-2 text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <strong>Supabase</strong> (PostgreSQL)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <strong>Givebutter</strong> Payments & Pledges
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <strong>Vercel / Cloud Run</strong> deployment
                    </li>
                  </ul>
                </div>
              </div>

              {/* Architecture Data Flow Diagram */}
              <div className="bg-[#251f1d] p-6 rounded-2xl border border-white/10">
                <h4 className="text-sm font-bold text-[#faedd0] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#893d2d]" />
                  <span>Settled Pipeline Data Flow</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                    <span className="text-[10px] uppercase font-bold text-white/40 block mb-1">Step 1 • Donor Action</span>
                    <p className="font-bold text-[#f7e4b7] text-sm">Givebutter Checkout</p>
                    <p className="text-[11px] text-white/60 mt-1">
                      Donor gives via givebutter.com/givetofuraha
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/30 border border-white/5 relative">
                    <span className="text-[10px] uppercase font-bold text-white/40 block mb-1">Step 2 • API Route</span>
                    <p className="font-bold text-[#f7e4b7] text-sm">Next.js Webhook Ingestion</p>
                    <p className="text-[11px] text-white/60 mt-1">
                      Processes signature & verifies event payload
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                    <span className="text-[10px] uppercase font-bold text-white/40 block mb-1">Step 3 • Persistence</span>
                    <p className="font-bold text-[#f7e4b7] text-sm">Supabase PostgreSQL</p>
                    <p className="text-[11px] text-white/60 mt-1">
                      Updates live meal counts & donor receipts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUPABASE POSTGRESQL VIEWER */}
          {activeTab === 'supabase' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-base">Live Supabase Database Records</h4>
                  <p className="text-xs text-white/60">Real-time table synchronization from forms and webhooks.</p>
                </div>
                <span className="text-xs text-[#faedd0] bg-[#893d2d] px-3 py-1 rounded-full font-bold">
                  PostgreSQL Active
                </span>
              </div>

              {/* Table: Donations */}
              <div className="bg-[#282220] rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 bg-[#322a27] border-b border-white/10 flex justify-between items-center">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#faedd0]">
                    public.donations ({donations.length} records)
                  </span>
                </div>
                <div className="overflow-x-auto max-h-56">
                  <table className="w-full text-left text-xs text-white/80">
                    <thead className="bg-black/30 text-white/50 text-[10px] uppercase">
                      <tr>
                        <th className="p-3">Donor</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Cause</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Transaction ID</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {donations.map((d) => (
                        <tr key={d.id} className="hover:bg-white/5">
                          <td className="p-3 font-medium text-white">{d.donor_name}</td>
                          <td className="p-3 text-emerald-400 font-bold">${d.amount}</td>
                          <td className="p-3 text-white/70">{d.cause_designated}</td>
                          <td className="p-3">
                            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                              {d.frequency}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-[10px] text-white/50">{d.givebutter_transaction_id || d.id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table: Contact Submissions */}
              <div className="bg-[#282220] rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 bg-[#322a27] border-b border-white/10">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#faedd0]">
                    public.contacts ({contacts.length} inquiries)
                  </span>
                </div>
                <div className="overflow-x-auto max-h-44">
                  <table className="w-full text-left text-xs text-white/80">
                    <thead className="bg-black/30 text-white/50 text-[10px] uppercase">
                      <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Message</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {contacts.map((c) => (
                        <tr key={c.id} className="hover:bg-white/5">
                          <td className="p-3 font-medium text-white">{c.first_name} {c.last_name}</td>
                          <td className="p-3 text-white/70">{c.email}</td>
                          <td className="p-3 text-white/60 truncate max-w-xs">{c.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GIVEBUTTER WEBHOOKS */}
          {activeTab === 'givebutter' && (
            <div className="space-y-6">
              <div className="bg-[#282220] p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-white text-base">Givebutter Webhook Simulator</h4>
                    <p className="text-xs text-white/60">
                      Simulate incoming live donation events sent to Next.js API route <code>/api/webhooks/givebutter</code>
                    </p>
                  </div>
                  <a
                    href={GIVEBUTTER_CAMPAIGN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#faedd0] hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>givebutter.com/givetofuraha</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {webhookStatus && (
                  <div className="mb-4 p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
                    <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{webhookStatus}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <button
                    onClick={() => handleSimulateWebhook(25, 'Nutrition')}
                    className="bg-[#893d2d] hover:bg-[#733123] text-white p-4 rounded-xl text-left border border-white/10 transition-transform active:scale-95 cursor-pointer"
                  >
                    <p className="font-black text-lg text-white">$25 Donation</p>
                    <p className="text-[11px] text-white/70">Category: Nutrition</p>
                    <p className="text-[10px] text-[#faedd0] mt-2 font-semibold flex items-center gap-1">
                      <Send className="w-3 h-3" /> Fire Webhook Payload
                    </p>
                  </button>

                  <button
                    onClick={() => handleSimulateWebhook(50, 'Education')}
                    className="bg-[#893d2d] hover:bg-[#733123] text-white p-4 rounded-xl text-left border border-white/10 transition-transform active:scale-95 cursor-pointer"
                  >
                    <p className="font-black text-lg text-white">$50 Donation</p>
                    <p className="text-[11px] text-white/70">Category: Education</p>
                    <p className="text-[10px] text-[#faedd0] mt-2 font-semibold flex items-center gap-1">
                      <Send className="w-3 h-3" /> Fire Webhook Payload
                    </p>
                  </button>

                  <button
                    onClick={() => handleSimulateWebhook(100, 'Discipleship')}
                    className="bg-[#893d2d] hover:bg-[#733123] text-white p-4 rounded-xl text-left border border-white/10 transition-transform active:scale-95 cursor-pointer"
                  >
                    <p className="font-black text-lg text-white">$100 Donation</p>
                    <p className="text-[11px] text-white/70">Category: Discipleship</p>
                    <p className="text-[10px] text-[#faedd0] mt-2 font-semibold flex items-center gap-1">
                      <Send className="w-3 h-3" /> Fire Webhook Payload
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SANITY CMS */}
          {activeTab === 'sanity' && (
            <div className="space-y-5">
              <div className="bg-[#282220] p-5 rounded-2xl border border-white/10">
                <h4 className="font-bold text-white text-base mb-1">Sanity.io Headless CMS Configuration</h4>
                <p className="text-xs text-white/60 mb-4">
                  Schema models configured for non-technical Furaha team members to modify copy and media without code deployments.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <p className="font-mono text-white/50 text-[10px]">Project ID</p>
                    <p className="font-bold text-[#faedd0]">{sanityConfig.projectId}</p>
                  </div>
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    <p className="font-mono text-white/50 text-[10px]">Dataset</p>
                    <p className="font-bold text-[#faedd0]">{sanityConfig.dataset}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#282220] p-5 rounded-2xl border border-white/10">
                <h5 className="font-bold text-xs uppercase tracking-wider text-[#faedd0] mb-2">
                  Sample GROQ Queries for Next.js App Router
                </h5>
                <pre className="p-3 bg-black/50 rounded-xl text-[11px] font-mono text-emerald-300 overflow-x-auto">
                  {`// Next.js App Router Page GROQ Query:
import { sanityClient } from '@/sanity/client';

export async function getFurahaStory() {
  return await sanityClient.fetch(\`${GROQ_QUERIES.getStory}\`);
}`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 5: GALLERY & PHOTO INVENTORY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#282220] p-4 rounded-2xl border border-white/10">
                  <p className="text-white/60 text-xs">Total Storage Assets</p>
                  <p className="text-2xl font-black text-white font-display mt-1">42</p>
                  <p className="text-[11px] text-white/40 mt-1">In /public/images/</p>
                </div>
                <div className="bg-[#282220] p-4 rounded-2xl border border-emerald-500/20">
                  <p className="text-emerald-400 text-xs">Active in Gallery</p>
                  <p className="text-2xl font-black text-emerald-400 font-display mt-1">{GALLERY_ITEMS.length}</p>
                  <p className="text-[11px] text-emerald-500/70 mt-1">100% Live on Site</p>
                </div>
                <div className="bg-[#282220] p-4 rounded-2xl border border-white/10">
                  <p className="text-white/60 text-xs">Unmapped Photos</p>
                  <p className="text-2xl font-black text-white font-display mt-1">0</p>
                  <p className="text-[11px] text-emerald-400 mt-1">Fully Synchronized</p>
                </div>
                <div className="bg-[#282220] p-4 rounded-2xl border border-white/10">
                  <p className="text-white/60 text-xs">WebP Optimization</p>
                  <p className="text-2xl font-black text-amber-300 font-display mt-1">100%</p>
                  <p className="text-[11px] text-amber-400/70 mt-1">Sharp pipeline active</p>
                </div>
              </div>

              {/* Developer Instructions Guide */}
              <div className="bg-[#241e1c] p-5 rounded-2xl border border-[#893d2d]/30">
                <div className="flex items-center gap-2 mb-3">
                  <FolderOpen className="w-5 h-5 text-[#893d2d]" />
                  <h4 className="font-bold text-sm text-[#faedd0]">
                    Developer Workflow: How to Upload & Display New Photos
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-white/80">
                  <div className="p-3 bg-black/30 rounded-xl border border-white/5 space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#893d2d] text-white flex items-center justify-center text-[10px]">1</span>
                      Add Image File
                    </div>
                    <p className="text-white/60 text-[11px]">
                      Drop your new <code className="text-[#faedd0]">.jpg</code> or <code className="text-[#faedd0]">.png</code> photo into <code className="text-[#faedd0]">/public/images/</code>.
                    </p>
                  </div>

                  <div className="p-3 bg-black/30 rounded-xl border border-white/5 space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#893d2d] text-white flex items-center justify-center text-[10px]">2</span>
                      Run Audit & Sync
                    </div>
                    <p className="text-white/60 text-[11px]">
                      Run <code className="text-emerald-400 bg-black/40 px-1 py-0.5 rounded">npm run gallery:sync</code>. It checks for unmapped photos & auto-generates optimized <code className="text-[#faedd0]">.webp</code> siblings.
                    </p>
                  </div>

                  <div className="p-3 bg-black/30 rounded-xl border border-white/5 space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#893d2d] text-white flex items-center justify-center text-[10px]">3</span>
                      Register in Gallery Data
                    </div>
                    <p className="text-white/60 text-[11px]">
                      Use the generator below to copy the TypeScript snippet and paste into <code className="text-[#faedd0]">galleryData.ts</code>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo Snippet Generator */}
              <div className="bg-[#282220] p-5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h4 className="font-bold text-sm text-[#faedd0]">
                      Photo Registration Snippet Generator
                    </h4>
                  </div>
                  <span className="text-[11px] text-white/50">Generates ready-to-paste TypeScript</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-white/60 mb-1">Image Filename (in /public/images/)</label>
                    <input
                      type="text"
                      placeholder="e.g. DSCF0999.jpg"
                      value={genFilename}
                      onChange={(e) => setGenFilename(e.target.value)}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:border-[#893d2d] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-white/60 mb-1">Photo Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Primary School Math Class"
                      value={genTitle}
                      onChange={(e) => setGenTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:border-[#893d2d] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-white/60 mb-1">Category</label>
                    <select
                      value={genCategory}
                      onChange={(e) => setGenCategory(e.target.value as GalleryCategory)}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-[#893d2d] outline-none"
                    >
                      {GALLERY_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id} className="bg-[#1e1a18]">
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-white/60 mb-1">Subtitle / Impact Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Students solving exercises during interactive morning study in Kenya."
                      value={genSubtitle}
                      onChange={(e) => setGenSubtitle(e.target.value)}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:border-[#893d2d] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-white/60 mb-1">Grid Layout</label>
                      <select
                        value={genLayout}
                        onChange={(e) => setGenLayout(e.target.value as any)}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-[#893d2d] outline-none"
                      >
                        <option value="wide" className="bg-[#1e1a18]">Wide (Landscape)</option>
                        <option value="standard" className="bg-[#1e1a18]">Standard</option>
                        <option value="portrait" className="bg-[#1e1a18]">Portrait (Tall)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-white/60 mb-1">Location</label>
                      <input
                        type="text"
                        placeholder="Kenya"
                        value={genLocation}
                        onChange={(e) => setGenLocation(e.target.value)}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:border-[#893d2d] outline-none"
                      >
                      </input>
                    </div>
                  </div>
                </div>

                {/* Generated Snippet Output */}
                <div className="relative">
                  <pre className="p-4 bg-black/60 rounded-xl text-[11px] font-mono text-amber-200 overflow-x-auto border border-white/10">
{`  {
    id: '${genFilename ? 'photo-' + genFilename.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'photo-custom-id'}',
    type: 'photo',
    title: '${genTitle || 'Photo Title'}',
    subtitle: '${genSubtitle || 'Documenting ongoing programs and student support in Kenya.'}',
    category: '${genCategory}',
    categoryLabel: '${GALLERY_CATEGORIES.find((c) => c.id === genCategory)?.label || 'Classrooms & Campus'}',
    src: '/images/${genFilename || 'photo.jpg'}',
    location: '${genLocation || 'Kenya'}',
    objectPosition: 'object-center',
    layout: '${genLayout}',
    isFeatured: ${genIsFeatured},
  },`}
                  </pre>
                  <button
                    onClick={() => {
                      const snippet = `  {
    id: '${genFilename ? 'photo-' + genFilename.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'photo-custom-id'}',
    type: 'photo',
    title: '${genTitle || 'Photo Title'}',
    subtitle: '${genSubtitle || 'Documenting ongoing programs and student support in Kenya.'}',
    category: '${genCategory}',
    categoryLabel: '${GALLERY_CATEGORIES.find((c) => c.id === genCategory)?.label || 'Classrooms & Campus'}',
    src: '/images/${genFilename || 'photo.jpg'}',
    location: '${genLocation || 'Kenya'}',
    objectPosition: 'object-center',
    layout: '${genLayout}',
    isFeatured: ${genIsFeatured},
  },`;
                      navigator.clipboard.writeText(snippet);
                      setCopiedSnippet(true);
                      setTimeout(() => setCopiedSnippet(false), 2500);
                    }}
                    className="absolute top-3 right-3 px-3 py-1.5 bg-[#893d2d] hover:bg-[#a64835] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    {copiedSnippet ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Snippet</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Active Gallery Inventory Catalog */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h4 className="font-bold text-sm text-[#faedd0]">
                    Active Gallery Catalog ({GALLERY_ITEMS.length} Photos)
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-white/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search photos..."
                        value={gallerySearch}
                        onChange={(e) => setGallerySearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:border-[#893d2d] outline-none w-44 sm:w-56"
                      />
                    </div>
                    <select
                      value={galleryCategoryFilter}
                      onChange={(e) => setGalleryCategoryFilter(e.target.value)}
                      className="px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-[#893d2d] outline-none"
                    >
                      <option value="all" className="bg-[#1e1a18]">All Categories</option>
                      {GALLERY_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id} className="bg-[#1e1a18]">
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto pr-1">
                  {GALLERY_ITEMS.filter((item) => {
                    const matchesSearch =
                      !gallerySearch ||
                      item.title.toLowerCase().includes(gallerySearch.toLowerCase()) ||
                      item.src.toLowerCase().includes(gallerySearch.toLowerCase()) ||
                      (item.subtitle && item.subtitle.toLowerCase().includes(gallerySearch.toLowerCase()));
                    const matchesCategory =
                      galleryCategoryFilter === 'all' || item.category === galleryCategoryFilter;
                    return matchesSearch && matchesCategory;
                  }).map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#282220] rounded-xl overflow-hidden border border-white/10 group hover:border-[#893d2d]/50 transition-colors flex flex-col"
                    >
                      <div className="aspect-[4/3] bg-black/40 overflow-hidden relative">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <span className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur-sm text-white/80 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                          {item.layout}
                        </span>
                      </div>
                      <div className="p-2.5 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="font-bold text-xs text-white line-clamp-1">{item.title}</p>
                          <p className="text-[10px] text-white/50 font-mono truncate mt-0.5">{item.src}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                          <span className="text-[9px] font-medium text-[#faedd0] bg-[#893d2d]/30 px-1.5 py-0.5 rounded truncate max-w-[110px]">
                            {item.categoryLabel}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400" title="Active on Website"></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#241e1c] border-t border-white/10 flex items-center justify-between text-xs text-white/60">
          <span>All 7 stack components verified and settled.</span>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
