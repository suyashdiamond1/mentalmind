'use client';

export default function MissionSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Mission</h2>
        <div className="prose prose-lg mx-auto text-gray-700">
          <p className="text-xl leading-relaxed mb-6">
            Student mental health is in crisis. Long wait times for counseling, stigma, and limited resources 
            create barriers to getting help. We are here to change that.
          </p>
          <p className="text-xl leading-relaxed mb-6">
            Our AI-powered chatbot provides immediate, confidential support for students struggling with stress, 
            anxiety, depression, and other mental health challenges. Available 24/7, our platform offers:
          </p>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start">
              <span className="text-2xl mr-3">💬</span>
              <span>Compassionate AI conversations trained on evidence-based mental health practices</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">📊</span>
              <span>Mood tracking to help you understand your emotional patterns</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">📚</span>
              <span>Curated resources for coping strategies and self-care</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">🔒</span>
              <span>Complete confidentiality and data privacy protection</span>
            </li>
          </ul>
          <p className="text-xl leading-relaxed mt-6">
            While we are not a replacement for professional therapy, we provide a safe first step and ongoing 
            support between counseling sessions. Our goal is to make mental health care more accessible, 
            reduce stigma, and help students thrive academically and personally.
          </p>
        </div>
      </div>
    </section>
  );
}