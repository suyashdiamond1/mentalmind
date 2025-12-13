'use client';

export default function FeaturesGrid() {
  const features = [
    {
      icon: '💬',
      title: 'AI Mental Health Chatbot',
      description: 'Chat with our compassionate AI trained to provide mental health support and coping strategies.',
    },
    {
      icon: '📊',
      title: 'Mood Tracking',
      description: 'Monitor your emotional wellbeing over time with our intuitive mood tracking system.',
    },
    {
      icon: '📚',
      title: 'Resource Library',
      description: 'Access curated mental health resources, coping techniques, and self-care guides.',
    },
    {
      icon: '🚨',
      title: 'Emergency Support',
      description: 'Quick access to crisis hotlines and emergency mental health services when you need them.',
    },
    {
      icon: '👥',
      title: 'Peer Support Groups',
      description: 'Connect with other students facing similar challenges in safe, moderated spaces.',
    },
    {
      icon: '🔒',
      title: 'Complete Privacy',
      description: 'Your conversations and data are encrypted and kept completely confidential.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How We Support You
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive mental health tools designed specifically for students
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{feature?.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature?.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}