'use client';

import Link from 'next/link';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white py-32 px-4 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 opacity-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-colorful-waves-loop-44408-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Floating Elements for visual appeal */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-16 text-5xl animate-bounce" style={{ animationDuration: '3s' }}>✨</div>
        <div className="absolute top-1/3 right-24 text-5xl animate-pulse" style={{ animationDuration: '4s' }}>🧠</div>
        <div className="absolute bottom-1/4 left-20 text-6xl animate-bounce" style={{ animationDuration: '4.5s' }}>💖</div>
        <div className="absolute top-16 right-1/4 text-4xl animate-pulse" style={{ animationDuration: '2.5s' }}>🌱</div>
        <div className="absolute bottom-1/3 right-12 text-5xl animate-bounce" style={{ animationDuration: '3.5s' }}>🌟</div>
      </div>

      <div className="relative max-w-6xl mx-auto text-center z-10">
        <div className="mb-8 animate-fade-in-down">
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full text-sm font-medium backdrop-blur-lg shadow-lg">
            <span className="animate-pulse">🤗</span>
            <span>Safe, Confidential, Always Available</span>
          </span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in-up">
          Your Mental Health
          <br />
          <span className="text-yellow-300 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
            Matters
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fade-in">
          Talk to our AI-powered mental health chatbot anytime, anywhere. Get support, track your mood, and access helpful resources designed specifically for students.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12 animate-fade-in-up animation-delay-500">
          <Link
            href="/login"
            className="group px-10 py-5 bg-white text-indigo-600 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-indigo-700 transition-all transform hover:scale-110 shadow-2xl flex items-center gap-3"
          >
            <span>Start Chatting Now</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <button
            onClick={onExploreClick}
            className="group px-10 py-5 bg-transparent border-3 border-white text-white rounded-full font-bold text-lg hover:bg-white/20 hover:border-yellow-300 transition-all backdrop-blur-sm shadow-xl flex items-center gap-3"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>Watch Demo</span>
          </button>
        </div>
        
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in animation-delay-1000">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:scale-105 shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-4xl">🔒</span>
              <span className="text-3xl font-bold">100%</span>
            </div>
            <span className="text-blue-100 font-medium">Confidential & Secure</span>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:scale-105 shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-4xl">💬</span>
              <span className="text-3xl font-bold">24/7</span>
            </div>
            <span className="text-blue-100 font-medium">Available Support</span>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:scale-105 shadow-xl">
              <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-4xl">🎓</span>
              <span className="text-3xl font-bold">56k+</span>
            </div>
            <span className="text-blue-100 font-medium">Students Helped</span>
          </div>
        </div>

        {/* Chat Mockup Card */}
        <div className="mt-16 max-w-4xl mx-auto animate-fade-in animation-delay-1500">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-white/10 backdrop-blur-md p-6 sm:p-8 text-left transition-all hover:border-white/40">
            {/* Window Controls */}
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            
            {/* Chat Messages */}
            <div className="space-y-6">
              {/* User Message */}
              <div className="flex justify-end animate-fade-in-up animation-delay-2000">
                <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-2xl rounded-tr-sm max-w-[85%] sm:max-w-[70%] border border-white/10 shadow-lg">
                  <p className="text-lg">I've been feeling really overwhelmed with my exams coming up. It's hard to focus. 😔</p>
                </div>
              </div>
              
              {/* AI Message */}
              <div className="flex justify-start animate-fade-in-up animation-delay-4000">
                <div className="flex items-end gap-3 max-w-[95%] sm:max-w-[85%]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-indigo-900 font-bold text-lg">AI</span>
                  </div>
                  <div className="bg-indigo-900/60 backdrop-blur-md text-white px-6 py-4 rounded-2xl rounded-tl-sm border border-indigo-500/30 shadow-lg">
                    <p className="text-lg">I hear you. It's completely normal to feel that way during exam season. Let's take a deep breath together. Would you like to try a quick 2-minute grounding exercise to help clear your mind?</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap justify-start ml-13 sm:ml-14 gap-3 animate-fade-in-up" style={{ animationDelay: '4.5s', opacity: 0, animationFillMode: 'forwards' }}>
                <button className="bg-white/10 hover:bg-white/20 text-white text-sm px-5 py-2.5 rounded-full border border-white/20 transition-all flex items-center gap-2 shadow-sm">
                  <span>🧘‍♀️</span> Yes, let's do it
                </button>
                <button className="bg-white/5 hover:bg-white/10 text-white text-sm px-5 py-2.5 rounded-full border border-white/10 transition-all shadow-sm">
                  Just talk for now
                </button>
              </div>
            </div>
            
            {/* Chat Input */}
            <div className="mt-8 relative animate-fade-in" style={{ animationDelay: '5s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="text-xl">✨</span>
              </div>
              <input 
                type="text" 
                placeholder="Type your message..." 
                disabled
                className="w-full bg-white/5 border border-white/20 text-white rounded-full py-4 pl-12 pr-16 focus:outline-none placeholder-blue-200/50 backdrop-blur-sm"
              />
              <button className="absolute inset-y-2 right-2 bg-yellow-400 hover:bg-yellow-300 text-indigo-900 rounded-full w-10 h-10 flex items-center justify-center transition-all shadow-md">
                <svg className="w-5 h-5 translate-x-[1px]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-blue-100 mt-6 text-lg font-medium flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
            Experience empathetic, real-time support tailored for you
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
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
        .animation-delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
}