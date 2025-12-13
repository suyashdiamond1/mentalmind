'use client';

export default function TeamSection() {
  const team = [
    {
      name: 'Clinical Psychology Team',
      role: 'AI Training & Oversight',
      description: 'Licensed psychologists who train and monitor our AI responses',
    },
    {
      name: 'Student Advisory Board',
      role: 'User Experience',
      description: 'Students who provide feedback to make our platform more helpful',
    },
    {
      name: 'Technology Team',
      role: 'Platform Development',
      description: 'Engineers building secure, accessible mental health technology',
    },
    {
      name: 'Research Partners',
      role: 'Evidence-Based Care',
      description: 'University researchers ensuring our approach is scientifically sound',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Team</h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Mental health professionals, students, and technologists working together to support student wellbeing
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {team?.map((member, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{member?.name}</h3>
              <p className="text-indigo-600 font-medium mb-4">{member?.role}</p>
              <p className="text-gray-700">{member?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}