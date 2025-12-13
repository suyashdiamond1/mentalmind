'use client';
import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Is this service confidential?',
      answer: 'Yes, absolutely. All conversations are encrypted and completely confidential. We do not share your data with anyone. However, if you express intent to harm yourself or others, we may need to connect you with emergency services for your safety.',
    },
    {
      question: 'Can the AI chatbot replace therapy?',
      answer: 'No, our AI chatbot is designed to provide support and resources, but it cannot replace professional therapy. We encourage you to seek professional help for serious mental health concerns. Our chatbot can be a helpful complement to therapy.',
    },
    {
      question: 'Is this service free?',
      answer: 'Yes, our basic service is completely free for students. We offer this at no cost because we believe mental health support should be accessible to everyone.',
    },
    {
      question: 'How does the AI understand mental health?',
      answer: 'Our AI is trained by licensed mental health professionals using evidence-based therapeutic approaches. It continuously learns from interactions while maintaining strict privacy standards.',
    },
    {
      question: 'What if I am in crisis?',
      answer: 'If you are experiencing a mental health emergency, please call 988 (National Crisis Hotline) immediately or go to your nearest emergency room. Our chatbot can provide support but is not designed for crisis intervention.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs?.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq?.question}</span>
                <span className="text-2xl text-indigo-600">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">{faq?.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}