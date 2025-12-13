export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          student_id: string | null;
          university: string | null;
          age: number | null;
          avatar_url: string | null;
          phone: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          student_id?: string | null;
          university?: string | null;
          age?: number | null;
          avatar_url?: string | null;
          phone?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          student_id?: string | null;
          university?: string | null;
          age?: number | null;
          avatar_url?: string | null;
          phone?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      chat_sessions: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          session_status: 'active' | 'completed' | 'paused';
          started_at: string;
          ended_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string;
          session_status?: 'active' | 'completed' | 'paused';
          started_at?: string;
          ended_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          session_status?: 'active' | 'completed' | 'paused';
          started_at?: string;
          ended_at?: string | null;
          created_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          session_id: string;
          user_id: string;
          message_content: string;
          is_bot_response: boolean;
          sentiment_score: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          user_id: string;
          message_content: string;
          is_bot_response?: boolean;
          sentiment_score?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          user_id?: string;
          message_content?: string;
          is_bot_response?: boolean;
          sentiment_score?: number | null;
          created_at?: string;
        };
      };
      mood_entries: {
        Row: {
          id: string;
          user_id: string;
          mood_level: 'very_sad' | 'sad' | 'neutral' | 'happy' | 'very_happy';
          notes: string | null;
          activities: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          mood_level: 'very_sad' | 'sad' | 'neutral' | 'happy' | 'very_happy';
          notes?: string | null;
          activities?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          mood_level?: 'very_sad' | 'sad' | 'neutral' | 'happy' | 'very_happy';
          notes?: string | null;
          activities?: string[] | null;
          created_at?: string;
        };
      };
      resources: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: 'coping_strategies' | 'emergency_contacts' | 'self_care' | 'professional_help' | 'peer_support';
          content: string;
          url: string | null;
          phone_number: string | null;
          is_emergency: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: 'coping_strategies' | 'emergency_contacts' | 'self_care' | 'professional_help' | 'peer_support';
          content: string;
          url?: string | null;
          phone_number?: string | null;
          is_emergency?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: 'coping_strategies' | 'emergency_contacts' | 'self_care' | 'professional_help' | 'peer_support';
          content?: string;
          url?: string | null;
          phone_number?: string | null;
          is_emergency?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      saved_resources: {
        Row: {
          id: string;
          user_id: string;
          resource_id: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          resource_id: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          resource_id?: string;
          notes?: string | null;
          created_at?: string;
        };
      };
      emergency_contacts: {
        Row: {
          id: string;
          user_id: string;
          contact_name: string;
          relationship: string;
          phone_number: string;
          email: string | null;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          contact_name: string;
          relationship: string;
          phone_number: string;
          email?: string | null;
          is_primary?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          contact_name?: string;
          relationship?: string;
          phone_number?: string;
          email?: string | null;
          is_primary?: boolean;
          created_at?: string;
        };
      };
    };
  };
}