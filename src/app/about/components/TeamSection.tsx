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
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-stone-800 mb-4 text-center">Our Team</h2>
        <p className="text-lg text-stone-500 text-center mb-16 max-w-2xl mx-auto">
          Mental health professionals, students, and technologists working together to support student wellbeing
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {team?.map((member, index) => (
            <div key={index} className="bg-stone-50 rounded-[2rem] border border-stone-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all">
              <h3 className="text-xl font-semibold text-stone-800 mb-2">{member?.name}</h3>
              <p className="text-emerald-700 font-medium mb-4 text-sm">{member?.role}</p>
              <p className="text-stone-600 leading-relaxed">{member?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}