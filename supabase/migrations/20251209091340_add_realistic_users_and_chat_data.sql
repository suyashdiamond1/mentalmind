-- Location: supabase/migrations/20251209091340_add_realistic_users_and_chat_data.sql
-- Schema Analysis: Existing mental health platform with user_profiles, chat_sessions, chat_messages
-- Integration Type: Additive - Adding realistic user data and chat messages
-- Dependencies: user_profiles, chat_sessions, chat_messages tables

-- Create 328 realistic user signups and generate authentic chat history
DO $$
DECLARE
    user_counter INTEGER := 0;
    current_user_id UUID;
    session_id UUID;
    messages_count INTEGER;
    i INTEGER;
    
    -- Arrays of realistic data
    first_names TEXT[] := ARRAY[
        'Emily', 'Michael', 'Sarah', 'James', 'Jessica', 'David', 'Ashley', 'Christopher',
        'Amanda', 'Matthew', 'Melissa', 'Joshua', 'Stephanie', 'Daniel', 'Jennifer', 'Andrew',
        'Rachel', 'Ryan', 'Lauren', 'Kevin', 'Brittany', 'Brandon', 'Nicole', 'Justin',
        'Amber', 'Tyler', 'Taylor', 'Zachary', 'Samantha', 'Aaron', 'Megan', 'Kyle',
        'Hannah', 'Jonathan', 'Kayla', 'Nathan', 'Alexis', 'Jordan', 'Victoria', 'Nicholas',
        'Danielle', 'Austin', 'Morgan', 'Jacob', 'Jasmine', 'Ethan', 'Sydney', 'Benjamin',
        'Olivia', 'William', 'Emma', 'Alexander', 'Sophia', 'Mason', 'Isabella', 'Liam',
        'Ava', 'Noah', 'Mia', 'Lucas', 'Charlotte', 'Oliver', 'Amelia', 'Elijah'
    ];
    
    last_names TEXT[] := ARRAY[
        'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
        'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
        'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris',
        'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright',
        'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson',
        'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Phillips',
        'Evans', 'Turner', 'Parker', 'Collins', 'Edwards', 'Stewart', 'Morris', 'Rogers',
        'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Cooper', 'Richardson'
    ];
    
    universities TEXT[] := ARRAY[
        'Harvard University', 'Stanford University', 'MIT', 'Yale University', 'Princeton University',
        'Columbia University', 'University of Chicago', 'Duke University', 'Northwestern University',
        'Cornell University', 'UCLA', 'UC Berkeley', 'University of Michigan', 'Boston University',
        'NYU', 'Georgetown University', 'USC', 'Carnegie Mellon', 'University of Texas',
        'University of Washington', 'Emory University', 'Vanderbilt University', 'Rice University',
        'University of Virginia', 'Georgia Tech', 'Penn State', 'Ohio State University',
        'University of Florida', 'Arizona State University', 'Rutgers University'
    ];
    
    user_messages TEXT[] := ARRAY[
        'I have been feeling really overwhelmed with my coursework lately.',
        'Sometimes I struggle to get out of bed in the morning.',
        'I am having trouble concentrating on my studies.',
        'I feel anxious about upcoming exams.',
        'Lately I have been feeling disconnected from my friends.',
        'I am worried about my academic performance.',
        'I have been experiencing more stress than usual.',
        'I find it hard to relax even during breaks.',
        'My sleep schedule has been really inconsistent.',
        'I am struggling to balance everything in my life.',
        'I feel like I am not doing enough.',
        'Sometimes I worry about what comes after graduation.',
        'I have been feeling isolated lately.',
        'I am having trouble managing my time effectively.',
        'I feel pressure to maintain high grades.'
    ];
    
    bot_responses TEXT[] := ARRAY[
        'Thank you for sharing that with me. It takes courage to open up about what you are experiencing.',
        'I hear you, and what you are feeling is valid. Many students experience similar challenges.',
        'It sounds like you are going through a difficult time. Can you tell me more about what has been happening?',
        'Those feelings are completely understandable given what you are dealing with.',
        'I appreciate you being so honest about your struggles. How long have you been feeling this way?',
        'That must be really hard for you. What do you think might help you feel better?',
        'It is okay to not be okay sometimes. Have you considered reaching out to campus counseling services?',
        'Your wellbeing matters. What kind of support do you think would be most helpful right now?',
        'I can see that this is affecting you significantly. What coping strategies have you tried?',
        'Thank you for trusting me with these feelings. Remember that seeking help is a sign of strength.',
        'It sounds like you are carrying a lot right now. What would make things feel more manageable?',
        'Many students face similar challenges. You are not alone in this.',
        'That is a lot to deal with. Have you been able to talk to anyone else about this?',
        'I want you to know that these feelings are temporary and things can improve.',
        'It is important to be kind to yourself during difficult times like these.'
    ];
    
BEGIN
    RAISE NOTICE 'Starting creation of 328 realistic user profiles and chat data...';
    
    -- Create 328 users with realistic profiles
    FOR user_counter IN 1..328 LOOP
        current_user_id := gen_random_uuid();
        
        -- Insert into auth.users with complete fields
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
            lower(first_names[1 + (user_counter % array_length(first_names, 1))] || '.' || 
                  last_names[1 + ((user_counter * 7) % array_length(last_names, 1))]) || user_counter || '@university.edu',
            crypt('StudentPass2024!', gen_salt('bf', 10)),
            now() - (random() * interval '180 days'),
            now() - (random() * interval '180 days'),
            now() - (random() * interval '180 days'),
            jsonb_build_object(
                'full_name', 
                first_names[1 + (user_counter % array_length(first_names, 1))] || ' ' || 
                last_names[1 + ((user_counter * 7) % array_length(last_names, 1))]
            ),
            '{"provider": "email", "providers": ["email"]}'::jsonb,
            false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null
        )
        ON CONFLICT (id) DO NOTHING;
        
        -- Insert user profile
        INSERT INTO public.user_profiles (
            id, email, full_name, age, university, student_id, is_active, created_at, updated_at
        ) VALUES (
            current_user_id,
            lower(first_names[1 + (user_counter % array_length(first_names, 1))] || '.' || 
                  last_names[1 + ((user_counter * 7) % array_length(last_names, 1))]) || user_counter || '@university.edu',
            first_names[1 + (user_counter % array_length(first_names, 1))] || ' ' || 
            last_names[1 + ((user_counter * 7) % array_length(last_names, 1))],
            18 + (user_counter % 10),
            universities[1 + (user_counter % array_length(universities, 1))],
            'STU' || lpad(user_counter::text, 6, '0'),
            true,
            now() - (random() * interval '180 days'),
            now() - (random() * interval '90 days')
        )
        ON CONFLICT (id) DO NOTHING;
        
        -- Create 1-3 chat sessions per user
        FOR i IN 1..(1 + floor(random() * 3)::int) LOOP
            session_id := gen_random_uuid();
            
            INSERT INTO public.chat_sessions (
                id, user_id, title, session_status, started_at, created_at
            ) VALUES (
                session_id,
                current_user_id,
                'Chat Session - ' || to_char(now() - (random() * interval '120 days'), 'DD/MM/YYYY'),
                CASE WHEN random() > 0.7 THEN 'completed'::session_status ELSE 'active'::session_status END,
                now() - (random() * interval '120 days'),
                now() - (random() * interval '120 days')
            );
            
            -- Create 3-8 messages per session
            messages_count := 3 + floor(random() * 6)::int;
            
            FOR i IN 1..messages_count LOOP
                -- User message
                INSERT INTO public.chat_messages (
                    id, session_id, user_id, message_content, is_bot_response, 
                    sentiment_score, created_at
                ) VALUES (
                    gen_random_uuid(),
                    session_id,
                    current_user_id,
                    user_messages[1 + floor(random() * array_length(user_messages, 1))::int],
                    false,
                    0.3 + (random() * 0.4),
                    now() - (random() * interval '120 days') + (i * interval '2 minutes')
                );
                
                -- Bot response
                INSERT INTO public.chat_messages (
                    id, session_id, user_id, message_content, is_bot_response, 
                    sentiment_score, created_at
                ) VALUES (
                    gen_random_uuid(),
                    session_id,
                    current_user_id,
                    bot_responses[1 + floor(random() * array_length(bot_responses, 1))::int],
                    true,
                    0.7 + (random() * 0.3),
                    now() - (random() * interval '120 days') + (i * interval '2 minutes') + interval '30 seconds'
                );
            END LOOP;
        END LOOP;
        
        -- Progress logging every 50 users
        IF user_counter % 50 = 0 THEN
            RAISE NOTICE 'Created % users with chat history...', user_counter;
        END IF;
    END LOOP;
    
    RAISE NOTICE 'Successfully created 328 realistic users with authentic chat history!';
    RAISE NOTICE 'All users can login with password: StudentPass2024!';
END $$;