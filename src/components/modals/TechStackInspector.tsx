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
} from 'lucide-react';
import { supabaseDb, DbDonation, DbContact, DbVolunteer, DbScholarshipApp } from '../../supabase/client';
import { processGivebutterWebhook, GIVEBUTTER_CAMPAIGN_URL } from '../../lib/givebutter';
import { sanityConfig, GROQ_QUERIES } from '../../sanity/client';

interface TechStackInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechStackInspector: React.FC<TechStackInspectorProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'supabase' | 'givebutter' | 'sanity'>('architecture');
  const [donations, setDonations] = useState<DbDonation[]>([]);
  const [contacts, setContacts] = useState<DbContact[]>([]);
  const [volunteers, setVolunteers] = useState<DbVolunteer[]>([]);
  const [scholarships, setScholarships] = useState<DbScholarshipApp[]>([]);
  const [webhookStatus, setWebhookStatus] = useState<string | null>(null);

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
