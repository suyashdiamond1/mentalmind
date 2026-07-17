'use client';

import Link from 'next/link';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section className="bg-stone-50 text-stone-800 py-24 lg:py-32 px-4 overflow-hidden relative">
      {/* Soft decorative background shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] bg-emerald-50 rounded-full mix-blend-multiply opacity-70"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[30rem] h-[30rem] bg-orange-50 rounded-full mix-blend-multiply opacity-70"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="text-left">
          <div className="mb-6 animate-fade-in-down">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-emerald-700 shadow-sm border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              A safe space for your mind
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-stone-800 tracking-tight leading-[1.1] animate-fade-in-up">
            Your mental <br/>
            <span className="text-emerald-700 italic font-serif">well-being</span> matters.
          </h1>
          
          <p className="text-lg lg:text-xl mb-10 text-stone-500 max-w-lg leading-relaxed animate-fade-in">
            Talk to our AI-powered mental health companion anytime, anywhere. Find clarity, track your mood, and take a deep breath.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-500" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
            <Link
              href="/login"
              className="px-8 py-4 bg-emerald-700 text-white rounded-full font-medium hover:bg-emerald-800 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              Start Chatting
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <button
              onClick={onExploreClick}
              className="px-8 py-4 bg-white text-stone-700 border border-stone-200 rounded-full font-medium hover:bg-stone-100 transition-colors shadow-sm"
            >
              Learn More
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex items-center gap-8 text-stone-500 animate-fade-in" style={{ animationDelay: '1s', opacity: 0, animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              <span className="text-sm font-medium">100% Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="text-sm font-medium">Available 24/7</span>
            </div>
          </div>
        </div>

        {/* Minimal Chat Mockup */}
        <div className="relative lg:h-[600px] flex items-center justify-center animate-fade-in animation-delay-1000" style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}>
          <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-stone-100 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8 border-b border-stone-50 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">AI</div>
                <div>
                  <h3 className="font-semibold text-stone-800">Support Companion</h3>
                  <p className="text-xs text-emerald-600 font-medium">Online</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-stone-50 text-stone-700 px-5 py-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm leading-relaxed border border-stone-100">
                  I'm feeling really anxious about my upcoming exams.
                </div>
              </div>
              
              {/* AI Message */}
              <div className="flex justify-start">
                <div className="bg-emerald-50 text-emerald-900 px-5 py-4 rounded-2xl rounded-tl-sm max-w-[90%] text-sm leading-relaxed">
                  I hear you. Exam stress is completely normal and can feel overwhelming. Let's take a deep breath together. Would you like to try a quick grounding exercise?
                </div>
              </div>

              {/* User Action */}
              <div className="flex justify-start pt-2">
                <button className="bg-white border border-stone-200 text-stone-600 px-4 py-2 rounded-full text-xs font-medium shadow-sm flex items-center gap-2 hover:bg-stone-50 transition-colors">
                  <span className="text-emerald-600">🌿</span> Yes, let's try that
                </button>
              </div>
            </div>
            
            <div className="mt-8 relative">
              <input 
                type="text" 
                placeholder="Type your message..." 
                disabled
                className="w-full bg-stone-50 border border-stone-100 text-stone-600 rounded-full py-3.5 pl-5 pr-12 focus:outline-none text-sm placeholder-stone-400"
              />
              <button className="absolute inset-y-1.5 right-1.5 bg-emerald-600 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 translate-x-[1px]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </section>
  );
}