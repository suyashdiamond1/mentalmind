'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '../../lib/supabase/client';
import Header from '@/components/common/Header';

interface MoodEntry {
  id: string;
  mood_level: string;
  notes: string | null;
  created_at: string;
}

export default function MoodTrackerPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentEntries, setRecentEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadRecentEntries();
    }
  }, [user]);

  const loadRecentEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setRecentEntries(data || []);
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('mood_entries').insert({
        user_id: user?.id,
        mood_level: selectedMood,
        notes: notes?.trim() || null,
      });

      if (error) throw error;

      // Reset form
      setSelectedMood('');
      setNotes('');
      
      // Reload entries
      await loadRecentEntries();

      alert('Mood entry saved successfully!');
    } catch (error) {
      console.error('Error saving mood:', error);
      alert('Failed to save mood entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const moods = [
    { value: 'very_happy', emoji: '😄', label: 'Very Happy', color: 'bg-green-500' },
    { value: 'happy', emoji: '😊', label: 'Happy', color: 'bg-green-400' },
    { value: 'neutral', emoji: '😐', label: 'Neutral', color: 'bg-yellow-400' },
    { value: 'sad', emoji: '😔', label: 'Sad', color: 'bg-orange-400' },
    { value: 'very_sad', emoji: '😢', label: 'Very Sad', color: 'bg-red-500' },
  ];

  const getMoodData = (moodValue: string) => {
    return moods?.find((m) => m?.value === moodValue);
  };

  if (authLoading) {
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Mood Tracker 📊</h1>
            <p className="text-gray-600">
              Track your emotional wellbeing and identify patterns over time
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How are you feeling?</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-5 gap-3">
                  {moods?.map((mood) => (
                    <button
                      key={mood?.value}
                      type="button"
                      onClick={() => setSelectedMood(mood?.value)}
                      className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                        selectedMood === mood?.value
                          ? 'border-indigo-600 bg-indigo-50 scale-105' :'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <span className="text-4xl mb-2">{mood?.emoji}</span>
                      <span className="text-xs text-gray-700 text-center">{mood?.label}</span>
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="How are you feeling? What's on your mind?"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedMood || loading}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Saving...' : 'Save Mood Entry'}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Entries</h2>
              {recentEntries?.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recentEntries?.map((entry) => {
                    const moodData = getMoodData(entry?.mood_level);
                    return (
                      <div key={entry?.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{moodData?.emoji}</span>
                            <div>
                              <p className="font-medium text-gray-900 capitalize">
                                {entry?.mood_level?.replace('_', ' ')}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(entry?.created_at)?.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        {entry?.notes && (
                          <p className="text-sm text-gray-700 mt-2 pl-12">{entry?.notes}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No mood entries yet</p>
                  <p className="text-sm text-gray-400 mt-2">Start tracking your mood today!</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-2">💡 Why Track Your Mood?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Identify patterns and triggers</li>
              <li>• Better understand your emotional wellbeing</li>
              <li>• Share insights with counselors or therapists</li>
              <li>• Track progress over time</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}