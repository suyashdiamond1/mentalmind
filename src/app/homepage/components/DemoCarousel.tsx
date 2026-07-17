'use client';
import { useState } from 'react';

export default function DemoCarousel() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: 'Chat with Our AI Counselor',
      description: 'Have a conversation about what is on your mind. Our AI is trained to listen, understand, and provide supportive responses.',
      example: 'User: "I am feeling really overwhelmed with my coursework..."\nAI: "I hear you. Academic stress is very common. Let\'s break this down together. What specific aspects feel most overwhelming?"',
    },
    {
      title: 'Track Your Mood',
      description: 'Log your daily mood and see patterns over time. Understanding your emotional patterns is the first step to better mental health.',
      example: 'Today\'s Mood: 😊 Happy\nNotes: "Had a great study session with friends"\nActivities: Exercise, Socializing, Good Sleep',
    },
    {
      title: 'Access Resources',
      description: 'Browse our library of coping strategies, self-care tips, and professional help resources tailored for students.',
      example: 'Featured Resource:\n📖 "Managing Test Anxiety"\n- Deep breathing techniques\n- Study schedule planning\n- When to seek help',
    },
    {
      title: 'Emergency Support',
      description: 'Quick access to crisis hotlines and emergency mental health services when you need immediate help.',
      example: '🚨 Need Help Now?\n\nNational Crisis Hotline: 988\nCampus Counseling: 555-0123\nText Crisis Line: Text HOME to 741741',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-stone-800 mb-4">
            See How It Works
          </h2>
          <p className="text-lg text-stone-500">
            Explore the features that make mental health support accessible
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {features?.map((feature, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === index
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {feature?.title}
            </button>
          ))}
        </div>

        <div className="bg-stone-50 border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2rem] p-5 sm:p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-stone-800 mb-4">
                {features?.[activeTab]?.title}
              </h3>
              <p className="text-stone-600 leading-relaxed mb-6 text-lg">
                {features?.[activeTab]?.description}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-stone-100 shadow-sm">
              <div className="text-sm text-emerald-700 mb-3 font-medium uppercase tracking-wider">Example</div>
              <pre className="text-stone-700 whitespace-pre-wrap font-sans leading-relaxed text-sm sm:text-base">
                {features?.[activeTab]?.example}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}