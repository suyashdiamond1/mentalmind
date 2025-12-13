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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See How It Works
          </h2>
          <p className="text-xl text-gray-600">
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
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {feature?.title}
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {features?.[activeTab]?.title}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {features?.[activeTab]?.description}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-sm text-gray-600 mb-2 font-medium">Example:</div>
              <pre className="text-gray-800 whitespace-pre-wrap font-sans">
                {features?.[activeTab]?.example}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}