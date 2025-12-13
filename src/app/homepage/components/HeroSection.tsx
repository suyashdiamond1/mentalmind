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
              <span className="text-3xl font-bold">5,000+</span>
            </div>
            <span className="text-blue-100 font-medium">Students Helped</span>
          </div>
        </div>

        {/* Video Preview Card */}
        <div className="mt-16 max-w-4xl mx-auto animate-fade-in animation-delay-1500">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 hover:border-yellow-300/50 transition-all">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-video object-cover"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-person-typing-on-laptop-keyboard-at-night-4909-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent flex items-center justify-center">
              <button 
                onClick={onExploreClick}
                className="bg-white/90 backdrop-blur-sm text-indigo-600 rounded-full p-6 hover:bg-yellow-300 hover:scale-110 transition-all shadow-2xl"
              >
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </div>
          <p className="text-blue-100 mt-4 text-lg">See how our AI chatbot can help you manage stress and improve your well-being</p>
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