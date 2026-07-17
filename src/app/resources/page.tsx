'use client';
import { useState } from 'react';
import Header from '@/components/common/Header';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  type: 'Article' | 'Tool' | 'App' | 'Video';
  readTime?: string;
  gradient: string;
}

const STATIC_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Understanding & Managing Anxiety',
    description: 'A comprehensive guide by NIMH on recognizing anxiety triggers and scientifically proven management techniques.',
    category: 'anxiety',
    url: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
    type: 'Article',
    readTime: '8 min read',
    gradient: 'from-blue-500 to-cyan-400'
  },
  {
    id: '2',
    title: 'The 5-4-3-2-1 Grounding Technique',
    description: 'An interactive walkthrough of the popular sensory grounding method to halt panic attacks in their tracks.',
    category: 'anxiety',
    url: 'https://www.urmc.rochester.edu/behavioral-health-partners/bhp-blog/april-2018/5-4-3-2-1-coping-technique-for-anxiety.aspx',
    type: 'Tool',
    readTime: '3 min read',
    gradient: 'from-emerald-400 to-teal-500'
  },
  {
    id: '3',
    title: 'Coping with Depression in College',
    description: 'Practical strategies and behavioral activation techniques designed specifically for university students.',
    category: 'depression',
    url: 'https://www.mayoclinic.org/diseases-conditions/depression/in-depth/depression/art-20045943',
    type: 'Article',
    readTime: '10 min read',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: '4',
    title: 'Headspace: Meditation & Sleep',
    description: 'Guided meditations, sleep casts, and mindful movement exercises. (Students often get significant discounts).',
    category: 'stress',
    url: 'https://www.headspace.com/studentplan',
    type: 'App',
    gradient: 'from-orange-400 to-amber-500'
  },
  {
    id: '5',
    title: 'Building Healthy Relationships',
    description: 'Learn communication boundaries, attachment styles, and how to navigate interpersonal conflicts effectively.',
    category: 'relationships',
    url: 'https://www.loveisrespect.org/healthy-relationships/',
    type: 'Article',
    readTime: '6 min read',
    gradient: 'from-rose-400 to-pink-500'
  },
  {
    id: '6',
    title: 'Overcoming Academic Burnout',
    description: 'Recognize the signs of burnout and learn how to restructure your study habits for sustainable success.',
    category: 'academic',
    url: 'https://www.apa.org/monitor/2021/01/ce-burnout',
    type: 'Article',
    readTime: '7 min read',
    gradient: 'from-stone-500 to-stone-700'
  }
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { value: 'all', label: 'All Resources', icon: '✨' },
    { value: 'anxiety', label: 'Anxiety', icon: '😰' },
    { value: 'depression', label: 'Depression', icon: '😔' },
    { value: 'stress', label: 'Stress Management', icon: '🧘' },
    { value: 'relationships', label: 'Relationships', icon: '💕' },
    { value: 'academic', label: 'Academic Pressure', icon: '📖' },
  ];

  const filteredResources = STATIC_RESOURCES.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50/50 selection:bg-emerald-200">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-emerald-50/80 to-stone-50/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 text-emerald-700 text-sm font-semibold mb-6 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Curated Mental Health Library
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6 tracking-tight">
            Knowledge is <span className="text-emerald-700">Empowerment.</span>
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Explore our hand-picked collection of clinically-backed articles, interactive tools, and digital applications designed to support your mental wellbeing journey.
          </p>

          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-stone-400 group-focus-within:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search resources, topics, or guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-stone-100 rounded-2xl focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm text-stone-700 placeholder:text-stone-400"
            />
          </div>
        </div>
      </section>

      <main className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Categories */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-5 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 shadow-sm border ${
                  selectedCategory === category.value
                    ? 'bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-800 transform hover:-translate-y-0.5' 
                    : 'bg-white text-stone-600 hover:bg-stone-50 border-stone-200 hover:border-emerald-200 hover:text-emerald-700'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-3xl border border-stone-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
                >
                  <div className={`h-2 w-full bg-gradient-to-r ${resource.gradient}`}></div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-5">
                      <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                        {resource.type}
                      </span>
                      {resource.readTime && (
                        <span className="text-xs font-medium text-stone-400 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {resource.readTime}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-stone-800 mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-tight">
                      {resource.title}
                    </h3>
                    <p className="text-stone-500 mb-8 line-clamp-3 leading-relaxed text-sm flex-1">
                      {resource.description}
                    </p>
                    <div className="flex items-center text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">
                      Access Resource 
                      <svg className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-full py-20 bg-white rounded-3xl border border-stone-100 text-center shadow-sm">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">No resources found</h3>
                <p className="text-stone-500">We couldn't find any resources matching your search. Try different keywords.</p>
                <button onClick={() => {setSearchQuery(''); setSelectedCategory('all');}} className="mt-6 px-6 py-2 bg-stone-100 text-stone-700 font-medium rounded-xl hover:bg-stone-200 transition-colors">
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Emergency Contacts */}
          <div className="mt-16 grid lg:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose-900 to-rose-950 p-8 sm:p-12 shadow-xl border border-rose-800/50 group">
              <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-700">
                <svg className="w-48 h-48 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 border border-rose-500/30 rounded-full text-rose-200 text-sm font-semibold mb-6">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span> Immediate Help
                </div>
                <h3 className="text-3xl font-bold text-white mb-8">Crisis Support</h3>
                
                <div className="space-y-4">
                  <a href="tel:988" className="block bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-colors group/item">
                    <p className="font-medium text-rose-200 mb-1 text-sm">National Crisis Hotline (24/7)</p>
                    <div className="flex items-center justify-between">
                      <p className="text-4xl font-bold text-white tracking-wider">988</p>
                      <div className="w-10 h-10 rounded-full bg-rose-500/30 flex items-center justify-center group-hover/item:bg-rose-500/50 transition-colors">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                      </div>
                    </div>
                  </a>
                  
                  <div className="block bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <p className="font-medium text-rose-200 mb-1 text-sm">Crisis Text Line (24/7)</p>
                    <p className="text-2xl font-bold text-white">Text HOME to 741741</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-stone-800 to-stone-900 p-8 sm:p-12 shadow-xl border border-stone-700/50 group">
               <div className="absolute top-0 right-0 p-12 opacity-5 transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-700">
                <svg className="w-48 h-48 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-500/20 border border-stone-500/30 rounded-full text-stone-300 text-sm font-semibold mb-6">
                  <span className="w-2 h-2 rounded-full bg-stone-400"></span> Local Resources
                </div>
                <h3 className="text-3xl font-bold text-white mb-8">Campus Support</h3>
                
                <div className="space-y-4">
                  <div className="block bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/5 transition-colors cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <span className="text-2xl">👩‍⚕️</span>
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg mb-1">Student Counseling Center</p>
                        <p className="text-stone-400 text-sm">Free, confidential psychological services and group therapy for registered students.</p>
                      </div>
                    </div>
                  </div>

                  <div className="block bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/5 transition-colors cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                        <span className="text-2xl">🤝</span>
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg mb-1">Peer Support Network</p>
                        <p className="text-stone-400 text-sm">Student-led initiatives and trained peer listeners available for drop-in sessions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}