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
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-stone-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-stone-800 mb-2">Mood Tracker <span className="text-3xl">🌿</span></h1>
            <p className="text-stone-500 font-medium">
              Track your emotional wellbeing and identify patterns over time
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 p-8">
              <h2 className="text-2xl font-semibold text-stone-800 mb-6">How are you feeling?</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-5 gap-3">
                  {moods?.map((mood) => (
                    <button
                      key={mood?.value}
                      type="button"
                      onClick={() => setSelectedMood(mood?.value)}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                        selectedMood === mood?.value
                          ? 'border-emerald-600 bg-emerald-50/50 scale-[1.02] shadow-sm' :'border-stone-100 hover:border-emerald-200 hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-4xl mb-2 transition-transform">{mood?.emoji}</span>
                      <span className="text-xs text-stone-600 font-medium text-center">{mood?.label}</span>
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="How are you feeling? What's on your mind?"
                    rows={4}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors shadow-sm text-stone-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedMood || loading}
                  className="w-full px-6 py-3.5 bg-emerald-700 text-white rounded-xl font-medium hover:bg-emerald-800 disabled:bg-stone-300 disabled:text-stone-500 transition-colors shadow-sm"
                >
                  {loading ? 'Saving...' : 'Save Mood Entry'}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 p-8">
              <h2 className="text-2xl font-semibold text-stone-800 mb-6">Recent Entries</h2>
              {recentEntries?.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recentEntries?.map((entry) => {
                    const moodData = getMoodData(entry?.mood_level);
                    return (
                      <div key={entry?.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{moodData?.emoji}</span>
                            <div>
                              <p className="font-medium text-stone-800 capitalize">
                                {entry?.mood_level?.replace('_', ' ')}
                              </p>
                              <p className="text-xs text-stone-500">
                                {new Date(entry?.created_at)?.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        {entry?.notes && (
                          <p className="text-sm text-stone-600 mt-2 pl-12 leading-relaxed">{entry?.notes}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-stone-500 font-medium">No mood entries yet</p>
                  <p className="text-sm text-stone-400 mt-2">Start tracking your mood today!</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 bg-stone-50 border border-stone-200 rounded-[2rem] p-8 shadow-sm">
            <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <span className="text-xl">💡</span> Why Track Your Mood?
            </h3>
            <ul className="text-sm text-stone-600 space-y-3">
              <li className="flex items-center gap-2"><span>✨</span> Identify patterns and triggers</li>
              <li className="flex items-center gap-2"><span>✨</span> Better understand your emotional wellbeing</li>
              <li className="flex items-center gap-2"><span>✨</span> Share insights with counselors or therapists</li>
              <li className="flex items-center gap-2"><span>✨</span> Track progress over time</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}