"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase/client';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { user, updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    // Verify that a recovery session is active (user arrived via password reset link)
    const checkRecoverySession = async () => {
      try {
        // Check if there's an active session (restored from URL tokens by Supabase client)
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // No active session - user may not have clicked the recovery link or it expired
          setError('No recovery session found. Please click the password reset link from your email.');
          return;
        }

        // Session exists - recovery link worked and tokens were restored
        setSessionReady(true);
      } catch (err) {
        console.error('Error checking recovery session:', err);
        setError('Unable to verify recovery session. Please try the password reset link again.');
      }
    };

    checkRecoverySession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    // Validate inputs
    if (!password || !confirm) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    // Verify session is still active before attempting update
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Your recovery session has expired. Please request a new password reset email.');
        setLoading(false);
        return;
      }

      // Session is valid - attempt password update
      const { error } = await updatePassword(password);
      setLoading(false);

      if (error) {
        console.error('Password update error:', error);
        setError(
          error.message === 'NewPasswordSameAsOld'
            ? 'Your new password must be different from your current password.'
            : error.message || 'Unable to update password. Please request a new recovery email and try again.'
        );
      } else {
        setMessage('Password updated successfully — redirecting to sign in...');
        setTimeout(() => router.push('/login'), 2500);
      }
    } catch (err) {
      console.error('Unexpected error during password reset:', err);
      setError('An unexpected error occurred. Please try again or request a new recovery email.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold mb-4">Choose a new password</h2>
        <p className="text-sm text-gray-600 mb-6">Create a new password for your account.</p>

        {/* Show error if no recovery session */}
        {!sessionReady && !error && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent"></div>
            <span className="ml-3 text-sm text-gray-600">Verifying recovery link...</span>
          </div>
        )}

        {/* Show validation error if recovery session check failed */}
        {error && !sessionReady && (
          <div className="space-y-4">
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">{error}</div>
            <button
              onClick={() => router.push('/forgot-password')}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
            >
              Request new recovery email
            </button>
          </div>
        )}

        {/* Show form only if recovery session is ready */}
        {sessionReady && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">{error}</div>}
            {message && <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded p-2">{message}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating password...' : 'Set new password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
