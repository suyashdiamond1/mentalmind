'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const [debug, setDebug] = useState<any>({});

  useEffect(() => {
    const handle = async () => {
      const href = typeof window !== 'undefined' ? window.location.href : '';
      const search = typeof window !== 'undefined' ? window.location.search : '';
      const hash = typeof window !== 'undefined' ? window.location.hash : '';

      const searchParams = Object.fromEntries(new URLSearchParams(search));
      const hashParams = Object.fromEntries(new URLSearchParams(hash.replace(/^#/, '')));
      const parsedParams = { ...searchParams, ...hashParams };

      console.debug('OAuth callback - URL', { href, search, hash, parsedParams });
      setDebug({ href, search, hash, parsedParams });

      try {
        const sessionRes = await supabase.auth.getSession();
        console.debug('getSession result:', sessionRes);
        setDebug((d: any) => ({ ...d, getSessionResult: sessionRes }));
      } catch (err) {
        console.error('Error getting session:', err);
        setDebug((d: any) => ({ ...d, getSessionError: String(err) }));
      }

      // Inspect localStorage keys that may contain the session
      try {
        const keys = Object.keys(window.localStorage || {}).filter((k) => k.toLowerCase().includes('supabase') || k.toLowerCase().includes('sb') || k.toLowerCase().includes('session'));
        setDebug((d: any) => ({ ...d, localStorageKeys: keys }));
      } catch (e) {
        setDebug((d: any) => ({ ...d, localStorageError: String(e) }));
      }

      // If session exists, navigate to dashboard
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) {
          router.replace('/dashboard');
          return;
        }
      } catch (e) {
        // fall through and show debug info
      }
    };

    handle();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-3">OAuth Callback Debug</h2>
        <p className="text-sm text-gray-600 mb-4">This page inspects the redirect URL and attempts to restore the Supabase session.</p>

        <div className="space-y-2 text-xs text-gray-700">
          <div>
            <strong>URL:</strong> <span className="break-all">{debug?.href}</span>
          </div>
          <div>
            <strong>Search:</strong> <span className="break-all">{debug?.search}</span>
          </div>
          <div>
            <strong>Hash:</strong> <span className="break-all">{debug?.hash}</span>
          </div>
          <div>
            <strong>Parsed Params:</strong>
            <pre className="bg-gray-50 p-2 rounded mt-1 text-xs overflow-auto">{JSON.stringify(debug?.parsedParams, null, 2)}</pre>
          </div>
          <div>
            <strong>getSessionFromUrl result:</strong>
            <pre className="bg-gray-50 p-2 rounded mt-1 text-xs overflow-auto">{JSON.stringify(debug?.getSessionFromUrlResult, null, 2)}</pre>
          </div>
          <div>
            <strong>getSession result:</strong>
            <pre className="bg-gray-50 p-2 rounded mt-1 text-xs overflow-auto">{JSON.stringify(debug?.getSessionResult, null, 2)}</pre>
          </div>
          <div>
            <strong>LocalStorage Keys:</strong>
            <pre className="bg-gray-50 p-2 rounded mt-1 text-xs overflow-auto">{JSON.stringify(debug?.localStorageKeys, null, 2)}</pre>
          </div>
          {debug?.getSessionFromUrlError && (
            <div className="text-red-600">
              <strong>getSessionFromUrl Error:</strong> {debug.getSessionFromUrlError}
            </div>
          )}
          {debug?.getSessionError && (
            <div className="text-red-600">
              <strong>getSession Error:</strong> {debug.getSessionError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
