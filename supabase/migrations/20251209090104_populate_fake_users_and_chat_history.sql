-- Location: supabase/migrations/20251209090104_populate_fake_users_and_chat_history.sql
-- Schema Analysis: Existing mental health app with user_profiles, chat_sessions, and chat_messages
-- Integration Type: Data seeding - Adding 600 fake users with realistic chat history
-- Dependencies: auth.users, public.user_profiles, public.chat_sessions, public.chat_messages
-- FIX: Enhanced cleanup logic to prevent duplicate key violations by deleting ALL fake data before seeding

-- ============================================================================
-- CLEANUP: Remove ALL existing fake data before seeding new data
-- ============================================================================

DO $$
DECLARE
    deleted_messages INTEGER;
    deleted_sessions INTEGER;
    deleted_profiles INTEGER;
    deleted_auth_users INTEGER;
BEGIN
    -- Delete chat messages first (most dependent)
    DELETE FROM public.chat_messages 
    WHERE user_id IN (
        SELECT id FROM public.user_profiles 
        WHERE email LIKE 'student%@studenthelp.edu'
    );
    GET DIAGNOSTICS deleted_messages = ROW_COUNT;
    
    -- Delete chat sessions
    DELETE FROM public.chat_sessions 
    WHERE user_id IN (
        SELECT id FROM public.user_profiles 
        WHERE email LIKE 'student%@studenthelp.edu'
    );
    GET DIAGNOSTICS deleted_sessions = ROW_COUNT;
    
    -- Delete user profiles
    DELETE FROM public.user_profiles 
    WHERE email LIKE 'student%@studenthelp.edu';
    GET DIAGNOSTICS deleted_profiles = ROW_COUNT;
    
    -- Delete auth users (least dependent)
    DELETE FROM auth.users 
    WHERE email LIKE 'student%@studenthelp.edu';
    GET DIAGNOSTICS deleted_auth_users = ROW_COUNT;
    
    RAISE NOTICE 'Cleanup complete: % messages, % sessions, % profiles, % auth users deleted', 
                 deleted_messages, deleted_sessions, deleted_profiles, deleted_auth_users;
END $$;

-- ============================================================================
-- FAKE DATA GENERATION: 600 Users + Realistic Chat History
-- ============================================================================

DO $$
DECLARE
    -- Arrays for generating realistic fake data
    first_names TEXT[] := ARRAY[
        'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William',
        'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander',
        'Abigail', 'Michael', 'Emily', 'Daniel', 'Elizabeth', 'Matthew', 'Sofia', 'Jackson', 'Avery', 'David',
        'Ella', 'Joseph', 'Scarlett', 'Carter', 'Grace', 'Owen', 'Chloe', 'Wyatt', 'Victoria', 'John',
        'Riley', 'Jack', 'Aria', 'Luke', 'Lily', 'Jayden', 'Aubrey', 'Dylan', 'Zoey', 'Grayson'
    ];
    
    last_names TEXT[] := ARRAY[
        'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
        'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
        'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
        'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
        'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
    ];
    
    universities TEXT[] := ARRAY[
        'Harvard University', 'Stanford University', 'MIT', 'Yale University', 'Princeton University',
        'Columbia University', 'University of Pennsylvania', 'Cornell University', 'Duke University', 'Brown University',
        'Dartmouth College', 'Northwestern University', 'Johns Hopkins University', 'UC Berkeley', 'UCLA',
        'University of Michigan', 'NYU', 'Boston University', 'University of Chicago', 'Caltech'
    ];
    
    -- Chat message templates for realistic conversations
    user_greetings TEXT[] := ARRAY[
        'Hi there', 'Hello', 'Hey', 'Hi', 'Good morning', 'Good afternoon', 'Good evening',
        'I need some help', 'Can we talk?', 'I am feeling stressed'
    ];
    
    user_concerns TEXT[] := ARRAY[
        'I have been feeling really anxious lately about my upcoming exams',
        'I am having trouble sleeping and concentrating on my studies',
        'My relationship with my roommate has been stressful',
        'I feel overwhelmed with my coursework and cannot seem to catch up',
        'I have been feeling lonely since moving to campus',
        'My grades are not what I expected and I feel like I am failing',
        'I am worried about finding a job after graduation',
        'I cannot stop thinking about disappointing my parents',
        'I feel like I do not fit in with my peers',
        'I am having panic attacks before presentations'
    ];
    
    bot_responses TEXT[] := ARRAY[
        'Thank you for sharing that with me. It sounds like you are going through a challenging time. Can you tell me more about what is bothering you?',
        'I understand this must be difficult for you. Many students experience similar feelings. What specific situations trigger these feelings?',
        'It is brave of you to reach out. Let us explore some strategies that might help you cope with these feelings.',
        'I hear you, and your feelings are completely valid. Have you noticed any patterns in when these feelings occur?',
        'That sounds really tough. Remember that seeking help is a sign of strength, not weakness. How long have you been feeling this way?',
        'Thank you for trusting me with this. Let us work together to find some coping strategies that might help.',
        'I can see why that would be stressful. What support systems do you currently have in place?',
        'Those are common concerns among students. Let us break this down into smaller, manageable steps.',
        'Your mental health is important. Have you considered speaking with a campus counselor about this?',
        'I appreciate you opening up. What has helped you cope with stress in the past?'
    ];
    
    user_follow_ups TEXT[] := ARRAY[
        'I think it started when the semester began and the workload increased',
        'I have tried meditation but it does not seem to help much',
        'My friends are supportive but they do not really understand what I am going through',
        'I feel guilty taking time for myself when I have so much work to do',
        'Sometimes I wonder if I made the right choice coming to this university',
        'I have trouble asking for help because I do not want to seem weak',
        'My sleep schedule is completely messed up from late night studying',
        'I feel pressure to be perfect and it is exhausting',
        'I worry that my problems are not serious enough to get help',
        'I appreciate you listening to me, it helps to talk about this'
    ];
    
    -- Variables for the loop
    i INTEGER;
    current_user_id UUID;
    current_full_name TEXT;
    current_email TEXT;
    sessions_count INTEGER;
    session_id UUID;
    messages_per_session INTEGER;
    j INTEGER;
    k INTEGER;
    days_ago INTEGER;
    session_timestamp TIMESTAMPTZ;
    users_created INTEGER := 0;
    users_skipped INTEGER := 0;
BEGIN
    -- Generate 600 fake users
    FOR i IN 1..600 LOOP
        -- Generate unique user ID
        current_user_id := gen_random_uuid();
        
        -- Generate realistic name
        current_full_name := first_names[1 + (random() * (array_length(first_names, 1) - 1))::INTEGER] || ' ' ||
                            last_names[1 + (random() * (array_length(last_names, 1) - 1))::INTEGER];
        
        -- Generate unique email
        current_email := 'student' || i || '@studenthelp.edu';
        
        BEGIN
            -- Create auth.users record with all required fields
            INSERT INTO auth.users (
                id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
                created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
                is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
                recovery_token, recovery_sent_at, email_change_token_new, email_change,
                email_change_sent_at, email_change_token_current, email_change_confirm_status,
                reauthentication_token, reauthentication_sent_at, phone, phone_change,
                phone_change_token, phone_change_sent_at
            ) VALUES (
                current_user_id,
                '00000000-0000-0000-0000-000000000000',
                'authenticated',
                'authenticated',
                current_email,
                crypt('StudentPass123!', gen_salt('bf', 10)),
                NOW() - (random() * interval '90 days'),
                NOW() - (random() * interval '180 days'),
                NOW() - (random() * interval '30 days'),
                jsonb_build_object('full_name', current_full_name),
                '{"provider": "email", "providers": ["email"]}'::jsonb,
                false,
                false,
                '',
                NULL,
                '',
                NULL,
                '',
                '',
                NULL,
                '',
                0,
                '',
                NULL,
                NULL,
                '',
                '',
                NULL
            );
            
            -- Create user_profiles record
            INSERT INTO public.user_profiles (
                id,
                email,
                full_name,
                age,
                university,
                student_id,
                phone,
                avatar_url,
                is_active,
                created_at,
                updated_at
            ) VALUES (
                current_user_id,
                current_email,
                current_full_name,
                18 + (random() * 10)::INTEGER,
                universities[1 + (random() * (array_length(universities, 1) - 1))::INTEGER],
                'STU' || LPAD(i::TEXT, 6, '0'),
                CASE 
                    WHEN random() > 0.5 THEN '+1-555-' || LPAD((random() * 9999999)::INTEGER::TEXT, 7, '0')
                    ELSE NULL
                END,
                CASE
                    WHEN random() > 0.7 THEN 'https://ui-avatars.com/api/?name=' || replace(current_full_name, ' ', '+')
                    ELSE NULL
                END,
                true,
                NOW() - (random() * interval '180 days'),
                NOW() - (random() * interval '30 days')
            );
            
            users_created := users_created + 1;
            
        EXCEPTION
            WHEN unique_violation THEN
                -- Skip this user if duplicate key constraint is violated
                users_skipped := users_skipped + 1;
                RAISE NOTICE 'Skipped duplicate user: % (% of 600)', current_email, i;
                CONTINUE;
        END;
        
        -- Generate 1-5 chat sessions per user (weighted towards fewer sessions)
        sessions_count := CASE 
            WHEN random() < 0.4 THEN 1
            WHEN random() < 0.7 THEN 2
            WHEN random() < 0.9 THEN 3
            WHEN random() < 0.97 THEN 4
            ELSE 5
        END;
        
        -- Create chat sessions with realistic timestamps
        FOR j IN 1..sessions_count LOOP
            session_id := gen_random_uuid();
            days_ago := (random() * 90)::INTEGER;
            session_timestamp := NOW() - (days_ago || ' days')::INTERVAL - (random() * interval '23 hours');
            
            INSERT INTO public.chat_sessions (
                id,
                user_id,
                title,
                session_status,
                started_at,
                created_at,
                ended_at
            ) VALUES (
                session_id,
                current_user_id,
                'Chat Session - ' || to_char(session_timestamp, 'MM/DD/YYYY'),
                CASE
                    WHEN j = sessions_count AND random() > 0.3 THEN 'active'::session_status
                    ELSE 'completed'::session_status
                END,
                session_timestamp,
                session_timestamp,
                CASE
                    WHEN j < sessions_count OR random() > 0.3 
                    THEN session_timestamp + (random() * interval '2 hours')
                    ELSE NULL
                END
            );
            
            -- Generate 4-12 messages per session (realistic back-and-forth conversation)
            messages_per_session := 4 + (random() * 8)::INTEGER;
            
            -- First message: User greeting
            INSERT INTO public.chat_messages (
                id,
                session_id,
                user_id,
                message_content,
                is_bot_response,
                sentiment_score,
                created_at
            ) VALUES (
                gen_random_uuid(),
                session_id,
                current_user_id,
                user_greetings[1 + (random() * (array_length(user_greetings, 1) - 1))::INTEGER],
                false,
                NULL,
                session_timestamp + (interval '1 second')
            );
            
            -- Remaining messages: Alternating user concerns and bot responses
            FOR k IN 2..messages_per_session LOOP
                IF k % 2 = 0 THEN
                    -- Bot response (even messages)
                    INSERT INTO public.chat_messages (
                        id,
                        session_id,
                        user_id,
                        message_content,
                        is_bot_response,
                        sentiment_score,
                        created_at
                    ) VALUES (
                        gen_random_uuid(),
                        session_id,
                        current_user_id,
                        bot_responses[1 + (random() * (array_length(bot_responses, 1) - 1))::INTEGER],
                        true,
                        NULL,
                        session_timestamp + (k * interval '30 seconds')
                    );
                ELSE
                    -- User message (odd messages)
                    INSERT INTO public.chat_messages (
                        id,
                        session_id,
                        user_id,
                        message_content,
                        is_bot_response,
                        sentiment_score,
                        created_at
                    ) VALUES (
                        gen_random_uuid(),
                        session_id,
                        current_user_id,
                        CASE
                            WHEN k = 3 THEN user_concerns[1 + (random() * (array_length(user_concerns, 1) - 1))::INTEGER]
                            ELSE user_follow_ups[1 + (random() * (array_length(user_follow_ups, 1) - 1))::INTEGER]
                        END,
                        false,
                        NULL,
                        session_timestamp + (k * interval '30 seconds')
                    );
                END IF;
            END LOOP;
        END LOOP;
        
        -- Progress indicator (every 100 users)
        IF i % 100 = 0 THEN
            RAISE NOTICE 'Generated % users with chat history (% created, % skipped)...', i, users_created, users_skipped;
        END IF;
    END LOOP;
    
    RAISE NOTICE 'Completed: % users created, % users skipped due to duplicates', users_created, users_skipped;
END $$;