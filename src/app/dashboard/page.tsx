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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600">
              How are you feeling today?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/chat"
              className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-2">💬</div>
              <h3 className="text-xl font-bold">Start Chat</h3>
              <p className="text-sm text-blue-100">Talk to our AI counselor</p>
            </Link>

            <Link
              href="/mood-tracker"
              className="bg-gradient-to-br from-green-600 to-teal-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-2">📊</div>
              <h3 className="text-xl font-bold">Track Mood</h3>
              <p className="text-sm text-green-100">Log how you are feeling</p>
            </Link>

            <Link
              href="/resources"
              className="bg-gradient-to-br from-orange-600 to-red-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-2">📚</div>
              <h3 className="text-xl font-bold">Resources</h3>
              <p className="text-sm text-orange-100">Browse helpful content</p>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Moods</h2>
              {recentMoods?.length > 0 ? (
                <div className="space-y-3">
                  {recentMoods?.map((mood) => (
                    <div key={mood?.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{getMoodEmoji(mood?.mood_level)}</span>
                        <div>
                          <p className="font-medium text-gray-900 capitalize">
                            {mood?.mood_level?.replace('_', ' ')}
                          </p>
                          {mood?.notes && (
                            <p className="text-sm text-gray-600">{mood?.notes}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(mood?.created_at)?.toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No mood entries yet. Start tracking today!</p>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Chats</h2>
              {recentChats?.length > 0 ? (
                <div className="space-y-3">
                  {recentChats?.map((chat) => (
                    <div key={chat?.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{chat?.title}</p>
                          <p className="text-sm text-gray-600 capitalize">{chat?.session_status}</p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(chat?.created_at)?.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No chat sessions yet. Start a conversation!</p>
              )}
            </div>
          </div>

          <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
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