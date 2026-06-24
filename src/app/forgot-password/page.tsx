"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    const { error } = await requestPasswordReset(email);
    setLoading(false);
    if (error) {
      setError(error.message || 'Unable to send recovery email');
    } else {
      setMessage('If an account with that email exists, a recovery email has been sent.');
      // Optionally redirect to login after a short delay
      setTimeout(() => router.push('/login'), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold mb-4">Reset your password</h2>
        <p className="text-sm text-gray-600 mb-6">Enter your email and we'll send a secure recovery link.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {message && <div className="text-sm text-green-600">{message}</div>}

          <div className="flex items-center justify-between">
            <button type="submit" disabled={loading}
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg disabled:opacity-50">
              {loading ? 'Sending...' : 'Send recovery email'}
            </button>
            <Link href="/login" className="text-sm text-indigo-600 hover:underline">Back to sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
