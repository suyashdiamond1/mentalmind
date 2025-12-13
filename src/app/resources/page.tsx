'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '../../lib/supabase/client';
import Header from '@/components/common/Header';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  created_at: string;
}

export default function ResourcesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadResources();
    }
  }, [user]);

  const loadResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'all', label: 'All Resources', icon: '📚' },
    { value: 'anxiety', label: 'Anxiety', icon: '😰' },
    { value: 'depression', label: 'Depression', icon: '😔' },
    { value: 'stress', label: 'Stress Management', icon: '🧘' },
    { value: 'relationships', label: 'Relationships', icon: '💕' },
    { value: 'academic', label: 'Academic Pressure', icon: '📖' },
    { value: 'self_care', label: 'Self Care', icon: '💆' },
  ];

  const filteredResources = resources?.filter(
    (resource) => selectedCategory === 'all' || resource?.category === selectedCategory
  );

  const getCategoryIcon = (category: string) => {
    return categories?.find((c) => c?.value === category)?.icon || '📄';
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Mental Health Resources 📚</h1>
            <p className="text-gray-600">
              Helpful articles, guides, and tools for your mental wellbeing
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            {categories?.map((category) => (
              <button
                key={category?.value}
                onClick={() => setSelectedCategory(category?.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category?.value
                    ? 'bg-indigo-600 text-white' :'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                <span className="mr-2">{category?.icon}</span>
                {category?.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources?.length > 0 ? (
              filteredResources?.map((resource) => (
                <div
                  key={resource?.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{getCategoryIcon(resource?.category)}</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium capitalize">
                      {resource?.category?.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{resource?.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{resource?.description}</p>
                  <a
                    href={resource?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No resources found in this category</p>
                <p className="text-sm text-gray-400 mt-2">Try selecting a different category</p>
              </div>
            )}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4">📞 Crisis Support</h3>
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-semibold">National Crisis Hotline</p>
                  <p className="text-2xl font-bold">988</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-semibold">Crisis Text Line</p>
                  <p className="text-lg font-bold">Text HOME to 741741</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4">🏥 Campus Resources</h3>
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-semibold">Counseling Services</p>
                  <p className="text-lg">Visit your campus health center</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-semibold">Peer Support Groups</p>
                  <p className="text-lg">Connect with fellow students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}