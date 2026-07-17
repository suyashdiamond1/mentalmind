'use client';
import Header from '@/components/common/Header';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50/50 selection:bg-emerald-200">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 text-stone-600 text-sm font-semibold mb-8 shadow-sm">
            <span className="text-xl">👋</span> Nice to meet you
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-stone-800 tracking-tight mb-6">
            Building a <span className="text-emerald-700">safe space</span> for students everywhere.
          </h1>
          <p className="text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto">
            MentalMind was born out of a simple realization: students need accessible, private, and judgment-free mental health support right in their pockets.
          </p>
        </div>
      </section>

      {/* Founder Section with Blended Image */}
      <section className="py-20 px-4 bg-white border-y border-stone-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-16">
          
          {/* Photo Container with stunning blending effect */}
          <div className="w-full md:w-5/12 relative group md:sticky md:top-32 mb-8 md:mb-0">
            {/* Decorative background blobs */}
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100 to-teal-50 rounded-[3rem] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-stone-100 border border-white shadow-2xl">
              <img 
                src="/founder.png" 
                alt="Suyash Verma - Founder of MentalMind"
                className="w-full h-full object-cover mix-blend-multiply filter contrast-125 saturate-50 transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
                }}
              />
              {/* Premium gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-emerald-900/20 to-transparent mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent mix-blend-color"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-sm font-bold uppercase tracking-widest text-emerald-200 mb-1">Founder & Developer</p>
                <h3 className="text-3xl font-semibold">Suyash Verma</h3>
              </div>
            </div>
          </div>

          <div className="w-full md:w-7/12 space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-6">The Story Behind MentalMind</h2>
              <p className="text-stone-600 leading-relaxed text-lg mb-4">
                As a student, I witnessed firsthand the silent epidemic of academic burnout and the immense pressure placed on our generation. I also saw the friction involved in seeking immediate, private help when things felt overwhelming. I built MentalMind to eliminate that friction.
              </p>
              <p className="text-stone-600 leading-relaxed text-lg mb-4">
                MentalMind is an AI companion engineered to provide high-quality emotional support without sacrificing privacy or performance.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-stone-800 mb-4">Zero-Egress Architecture</h3>
              <p className="text-stone-600 leading-relaxed text-lg mb-4">
                Most AI platforms operate as simple wrappers, transmitting sensitive user inputs to third-party cloud servers. In digital healthcare, this is a massive privacy liability.
              </p>
              <p className="text-stone-600 leading-relaxed text-lg mb-4">
                To solve this, MentalMind leverages a custom zero-egress architecture. By applying rigorous algorithmic optimization and extreme mixed-precision quantization, I compressed a 1.1-billion parameter neural network (TinyLlama) to run entirely within the browser via WebGPU. Your text never leaves your local RAM. By shifting inference completely to the edge device, MentalMind guarantees absolute data privacy, zero network latency, and infinite scalability.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-stone-800 mb-4">Built for Institutional Integration</h3>
              <p className="text-stone-600 leading-relaxed text-lg mb-4">
                MentalMind is engineered to function beyond a standalone personal companion. Because its decentralized compute model inherently bypasses massive data-governance hurdles, the platform is designed to be integrated seamlessly into broader university support ecosystems. It acts as a highly secure, private triage layer, autonomously bridging the gap between student hesitation and professional campus resources.
              </p>
            </div>

            <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-3xl">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">About the Founder: Suyash Verma</h3>
              <p className="text-emerald-800 leading-relaxed text-lg">
                Suyash is a systems architecture and algorithms enthusiast dedicated to leveraging computational rigor for social impact. Operating at the intersection of competitive programming and applied machine learning, he built MentalMind to solve the real-world technical and ethical bottlenecks in digital healthcare access.
              </p>
            </div>
            
            <div className="p-6 bg-red-50 border border-red-100 rounded-2xl">
              <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Important Clinical Disclaimer
              </h4>
              <p className="text-sm text-red-700 leading-relaxed">
                MentalMind is an AI-driven emotional support companion, not a licensed medical professional, therapist, or crisis intervention service. It cannot diagnose or treat mental health conditions. If you are experiencing a mental health emergency, severe distress, or having thoughts of self-harm, please contact emergency services or a national crisis lifeline immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4 bg-emerald-900 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-800/50 rounded-full blur-3xl -z-10 opacity-50"></div>
        <div className="max-w-3xl mx-auto z-10 relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Our Mission</h2>
          <p className="text-xl text-emerald-100/90 leading-relaxed font-medium">
            "To democratize mental health support by providing every student with a private, intelligent, and compassionate digital companion, entirely for free."
          </p>
        </div>
      </section>
    </div>
  );
}