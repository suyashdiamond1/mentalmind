'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, metadata?: { full_name?: string; student_id?: string; university?: string; age?: number }) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  requestPasswordReset: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (password: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If an OAuth redirect just occurred the session tokens may be present
    // in the URL (hash or query). Parse them first so `getSession()` returns
    // the active session and `onAuthStateChange` fires correctly.
    const initAuth = async () => {
      if (typeof window !== 'undefined') {
        try {
          const hasHashTokens = window.location.hash.includes('access_token') || window.location.hash.includes('refresh_token');
          const hasQueryTokens = window.location.search.includes('access_token') || window.location.search.includes('type') || window.location.search.includes('error');

          if (hasHashTokens || hasQueryTokens) {
            console.debug('OAuth redirect detected in URL; allowing Supabase client to restore the session automatically.');
          }
        } catch (err) {
          console.error('Error checking URL for auth tokens:', err);
        }
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Error loading session:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Redirect to a dedicated callback page that parses the session
          // from the URL and then navigates to the dashboard.
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
          scopes: 'openid email profile',
          // Request offline access and force consent so we can obtain refresh tokens
          queryParams: {
            prompt: 'consent',
            access_type: 'offline',
            include_granted_scopes: 'true',
          },
        },
      });

      // When redirect happens the browser will leave the page; return any error for UI handling
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, metadata?: { full_name?: string; student_id?: string; university?: string; age?: number }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata || {}
        }
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      // Sends a password recovery email containing a secure link
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/reset` : undefined,
      } as any);
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      // When user follows the recovery link Supabase will restore the session
      // from the URL. With an active session, updateUser can change the password.
      const { error } = await supabase.auth.updateUser({ password } as any);
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    requestPasswordReset,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}