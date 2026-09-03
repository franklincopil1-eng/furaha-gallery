-- =========================================================
-- Supabase / PostgreSQL Database Schema for Furaha Ministries
-- Production tables for metrics, Givebutter webhooks, inquiries, & volunteer applications
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DONATIONS TABLE (Populated via Givebutter Webhooks & direct pledges)
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    givebutter_transaction_id VARCHAR(100) UNIQUE,
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    frequency VARCHAR(20) DEFAULT 'once' CHECK (frequency IN ('once', 'monthly', 'quarterly', 'yearly')),
    cause_designated VARCHAR(100) DEFAULT 'Where Needed Most',
    status VARCHAR(50) DEFAULT 'succeeded' CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')),
    raw_payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CONTACT INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. VOLUNTEER APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.volunteers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(100),
    interests TEXT[] DEFAULT '{}',
    notes TEXT,
    status VARCHAR(50) DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'contacted', 'approved', 'declined')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. SCHOLARSHIP SPONSORSHIPS TABLE
CREATE TABLE IF NOT EXISTS public.scholarship_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sponsor_name VARCHAR(255) NOT NULL,
    sponsor_email VARCHAR(255) NOT NULL,
    target_tier VARCHAR(100) DEFAULT 'Secondary Boarding & Tuition',
    status VARCHAR(50) DEFAULT 'inquiry' CHECK (status IN ('inquiry', 'matched', 'active')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. LIVE METRICS TABLE (For high-frequency aggregated counters)
CREATE TABLE IF NOT EXISTS public.live_metrics (
    metric_key VARCHAR(100) PRIMARY KEY,
    metric_value BIGINT NOT NULL DEFAULT 0,
    label VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed initial public metrics
INSERT INTO public.live_metrics (metric_key, metric_value, label)
VALUES 
    ('total_meals_served', 4500, 'Hot Meals Served Monthly'),
    ('students_supported', 1200, 'Students Equipped with Supplies'),
    ('active_scholarships', 85, 'Secondary Scholarships Awarded'),
    ('total_funds_raised', 38450, 'Total Dollars Raised')
ON CONFLICT (metric_key) DO NOTHING;

-- Row Level Security (RLS) Policies
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_metrics ENABLE ROW LEVEL SECURITY;

-- Allow public read access to live metrics
CREATE POLICY "Public live metrics are viewable by everyone" 
ON public.live_metrics FOR SELECT USING (true);

-- Allow public insertions for forms
CREATE POLICY "Anyone can submit a contact inquiry" 
ON public.contacts FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can submit volunteer applications" 
ON public.volunteers FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can submit scholarship sponsorship inquiries" 
ON public.scholarship_applications FOR INSERT WITH CHECK (true);
