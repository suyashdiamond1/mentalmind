'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '../../lib/supabase/client';
import Header from '@/components/common/Header';
import Link from 'next/link';

interface MoodEntry {
  id: string;
  mood_level: string;
  notes: string | null;
  created_at: string;
}

interface ChatSession {
  id: string;
  title: string;
  session_status: string;
  created_at: string;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [recentMoods, setRecentMoods] = useState<MoodEntry[]>([]);
  const [recentChats, setRecentChats] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const [moodsResult, chatsResult] = await Promise.all([
        supabase
          .from('mood_entries')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('chat_sessions')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false })
          .limit(5),
      ]);

      if (moodsResult?.data) setRecentMoods(moodsResult.data);
      if (chatsResult?.data) setRecentChats(chatsResult.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodEmoji = (mood: string) => {
    const emojis: Record<string, string> = {
      very_happy: '😄',
      happy: '😊',
      neutral: '😐',
      sad: '😔',
      very_sad: '😢',
    };
    return emojis?.[mood] || '😐';
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="pt-32 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600">
              How are you feeling today?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Link
              href="/chat"
              className="bg-white border border-stone-100 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all transform hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">💬</div>
              <h3 className="text-xl font-semibold text-stone-800 mb-1">Start Chat</h3>
              <p className="text-sm text-stone-500">Talk to our AI companion</p>
            </Link>

            <Link
              href="/mood-tracker"
              className="bg-white border border-stone-100 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all transform hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="text-xl font-semibold text-stone-800 mb-1">Track Mood</h3>
              <p className="text-sm text-stone-500">Log how you are feeling</p>
            </Link>

            <Link
              href="/resources"
              className="bg-white border border-stone-100 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all transform hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">📚</div>
              <h3 className="text-xl font-semibold text-stone-800 mb-1">Resources</h3>
              <p className="text-sm text-stone-500">Browse helpful content</p>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-stone-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
              <h2 className="text-xl font-semibold text-stone-800 mb-6 flex items-center gap-2"><span className="text-xl">😊</span> Recent Moods</h2>
              {recentMoods?.length > 0 ? (
                <div className="space-y-4">
                  {recentMoods?.map((mood) => (
                    <div key={mood?.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100/50">
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="text-3xl bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm shrink-0">{getMoodEmoji(mood?.mood_level)}</span>
                        <div className="min-w-0 truncate pr-2">
                          <p className="font-medium text-stone-800 capitalize truncate">
                            {mood?.mood_level?.replace('_', ' ')}
                          </p>
                          {mood?.notes && (
                            <p className="text-sm text-stone-500 truncate">{mood?.notes}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs font-medium text-stone-400 bg-white px-3 py-1.5 rounded-full border border-stone-100 shrink-0">
                        {new Date(mood?.created_at)?.toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-100 border-dashed">
                  <p className="text-stone-500 text-sm">No mood entries yet.<br/>Start tracking today.</p>
                </div>
              )}
            </div>

            <div className="bg-white border border-stone-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
              <h2 className="text-xl font-semibold text-stone-800 mb-6 flex items-center gap-2"><span className="text-xl">💭</span> Recent Chats</h2>
              {recentChats?.length > 0 ? (
                <div className="space-y-4">
                  {recentChats?.map((chat) => (
                    <Link href={`/chat?session_id=${chat?.id}`} key={chat?.id} className="block p-4 bg-stone-50 rounded-2xl border border-stone-100/50 hover:bg-stone-100/80 cursor-pointer transition-colors group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-10 h-10 shrink-0 bg-white rounded-full flex items-center justify-center text-stone-400 shadow-sm border border-stone-100 group-hover:text-emerald-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                          </div>
                          <div className="min-w-0 truncate pr-2">
                            <p className="font-medium text-stone-800 truncate">{chat?.title}</p>
                            <p className="text-xs font-medium text-emerald-600 capitalize truncate">{chat?.session_status}</p>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-stone-400 bg-white px-3 py-1.5 rounded-full border border-stone-100 shrink-0">
                          {new Date(chat?.created_at)?.toLocaleDateString()}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-100 border-dashed">
                  <p className="text-stone-500 text-sm">No chat sessions yet.<br/>Start a conversation.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 bg-white border border-red-100 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="flex items-start">
              <span className="text-3xl mr-4">🚨</span>
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-2">Need Immediate Help?</h3>
                <p className="text-red-800 mb-3">
                  If you are experiencing a mental health crisis, please reach out for immediate support:
                </p>
                <div className="space-y-2 text-red-900">
                  <p className="font-medium">📞 National Crisis Hotline: 988</p>
                  <p className="font-medium">💬 Crisis Text Line: Text HOME to 741741</p>
                  <p className="font-medium">🏥 Campus Counseling: 555-0123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}