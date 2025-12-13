-- Location: supabase/migrations/20251125195149_student_mental_health_initial.sql
-- Schema Analysis: Fresh project - no existing schema
-- Integration Type: Complete new schema
-- Dependencies: None - initial migration

-- 1. Types
CREATE TYPE public.mood_level AS ENUM ('very_sad', 'sad', 'neutral', 'happy', 'very_happy');
CREATE TYPE public.session_status AS ENUM ('active', 'completed', 'paused');
CREATE TYPE public.resource_category AS ENUM ('coping_strategies', 'emergency_contacts', 'self_care', 'professional_help', 'peer_support');

-- 2. Core Tables
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    student_id TEXT,
    university TEXT,
    age INTEGER,
    avatar_url TEXT,
    phone TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Chat sessions with AI
CREATE TABLE public.chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'New Chat',
    session_status public.session_status DEFAULT 'active'::public.session_status,
    started_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Individual messages in chat
CREATE TABLE public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    message_content TEXT NOT NULL,
    is_bot_response BOOLEAN DEFAULT false,
    sentiment_score DECIMAL(3,2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Mood tracking
CREATE TABLE public.mood_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    mood_level public.mood_level NOT NULL,
    notes TEXT,
    activities TEXT[],
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Mental health resources
CREATE TABLE public.resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category public.resource_category NOT NULL,
    content TEXT NOT NULL,
    url TEXT,
    phone_number TEXT,
    is_emergency BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- User saved resources
CREATE TABLE public.saved_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, resource_id)
);

-- Emergency contacts
CREATE TABLE public.emergency_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    contact_name TEXT NOT NULL,
    relationship TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_chat_sessions_user_id ON public.chat_sessions(user_id);
CREATE INDEX idx_chat_sessions_status ON public.chat_sessions(session_status);
CREATE INDEX idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX idx_chat_messages_user_id ON public.chat_messages(user_id);
CREATE INDEX idx_mood_entries_user_id ON public.mood_entries(user_id);
CREATE INDEX idx_mood_entries_created_at ON public.mood_entries(created_at);
CREATE INDEX idx_resources_category ON public.resources(category);
CREATE INDEX idx_saved_resources_user_id ON public.saved_resources(user_id);
CREATE INDEX idx_emergency_contacts_user_id ON public.emergency_contacts(user_id);

-- 4. Functions (Before RLS)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, student_id, university, age, avatar_url, phone)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'student_id', ''),
        COALESCE(NEW.raw_user_meta_data->>'university', ''),
        COALESCE((NEW.raw_user_meta_data->>'age')::INTEGER, NULL),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
        COALESCE(NEW.raw_user_meta_data->>'phone', '')
    );
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 5. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies

-- Pattern 1: Core user table
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 2: Simple user ownership
CREATE POLICY "users_manage_own_chat_sessions"
ON public.chat_sessions
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_chat_messages"
ON public.chat_messages
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_mood_entries"
ON public.mood_entries
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_saved_resources"
ON public.saved_resources
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_emergency_contacts"
ON public.emergency_contacts
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Pattern 4: Public read, no write for resources
CREATE POLICY "anyone_can_read_resources"
ON public.resources
FOR SELECT
TO authenticated
USING (true);

-- 7. Triggers
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_resources_updated_at
    BEFORE UPDATE ON public.resources
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

-- 8. Mock Data
DO $$
DECLARE
    student1_id UUID := gen_random_uuid();
    student2_id UUID := gen_random_uuid();
    session1_id UUID := gen_random_uuid();
    session2_id UUID := gen_random_uuid();
    resource1_id UUID := gen_random_uuid();
    resource2_id UUID := gen_random_uuid();
    resource3_id UUID := gen_random_uuid();
    resource4_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (student1_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'alex.student@university.edu', crypt('student123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Alex Johnson", "student_id": "S12345", "university": "State University", "age": 20}'::jsonb,
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (student2_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'sam.smith@university.edu', crypt('student456', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Sam Smith", "student_id": "S67890", "university": "State University", "age": 22}'::jsonb,
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create chat sessions
    INSERT INTO public.chat_sessions (id, user_id, title, session_status) VALUES
        (session1_id, student1_id, 'Feeling overwhelmed with exams', 'completed'::public.session_status),
        (session2_id, student2_id, 'Need coping strategies', 'active'::public.session_status);

    -- Create chat messages
    INSERT INTO public.chat_messages (session_id, user_id, message_content, is_bot_response) VALUES
        (session1_id, student1_id, 'I am feeling really stressed about my upcoming exams', false),
        (session1_id, student1_id, 'I understand that exam stress is common. Let me share some helpful techniques. Have you tried breaking your study time into smaller chunks?', true),
        (session2_id, student2_id, 'What are some good ways to manage anxiety?', false),
        (session2_id, student2_id, 'Here are some evidence-based techniques: deep breathing exercises, mindfulness meditation, regular physical activity, and maintaining a consistent sleep schedule. Which would you like to explore first?', true);

    -- Create mood entries
    INSERT INTO public.mood_entries (user_id, mood_level, notes, activities) VALUES
        (student1_id, 'sad'::public.mood_level, 'Feeling anxious about deadlines', ARRAY['studying', 'skipped_meal']),
        (student1_id, 'neutral'::public.mood_level, 'Better after talking to counselor', ARRAY['therapy', 'exercise']),
        (student2_id, 'happy'::public.mood_level, 'Great day with friends', ARRAY['socializing', 'outdoor_activity']);

    -- Create resources
    INSERT INTO public.resources (id, title, description, category, content, url, phone_number, is_emergency) VALUES
        (resource1_id, 'National Crisis Hotline', 'Available 24/7 for immediate mental health support', 'emergency_contacts'::public.resource_category,
         'If you are in crisis or experiencing thoughts of suicide, please call this number immediately. Trained counselors are available around the clock.', 
         'https://988lifeline.org', '988', true),
        (resource2_id, 'Campus Counseling Center', 'Free counseling services for students', 'professional_help'::public.resource_category,
         'Our campus offers confidential counseling services at no cost. Services include individual therapy, group sessions, and crisis intervention.',
         'https://university.edu/counseling', '555-0123', false),
        (resource3_id, 'Deep Breathing Exercise', 'Simple technique to reduce anxiety', 'coping_strategies'::public.resource_category,
         '4-7-8 Breathing Technique: Breathe in through your nose for 4 counts, hold for 7 counts, exhale through your mouth for 8 counts. Repeat 3-4 times.',
         null, null, false),
        (resource4_id, 'Student Support Groups', 'Peer support meetings for students', 'peer_support'::public.resource_category,
         'Weekly meetings every Wednesday at 5 PM in the Student Union. Share experiences and connect with fellow students in a safe, supportive environment.',
         'https://university.edu/peer-support', null, false);

    -- Create saved resources
    INSERT INTO public.saved_resources (user_id, resource_id, notes) VALUES
        (student1_id, resource3_id, 'This really helps during panic attacks'),
        (student2_id, resource4_id, 'Attended last week, very helpful');

    -- Create emergency contacts
    INSERT INTO public.emergency_contacts (user_id, contact_name, relationship, phone_number, email, is_primary) VALUES
        (student1_id, 'Sarah Johnson', 'Mother', '555-1001', 'sarah.j@email.com', true),
        (student1_id, 'Dr. Emily Chen', 'Therapist', '555-2002', 'dr.chen@clinic.com', false),
        (student2_id, 'Michael Smith', 'Father', '555-3003', 'mike.s@email.com', true);
END $$;