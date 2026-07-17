'use client';

export default function HeroSection() {
  return (
    <section className="bg-stone-50 py-24 px-4 border-b border-stone-100">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-semibold mb-6 text-stone-800 flex items-center justify-center gap-3">
          <span className="text-4xl">🌱</span> About Our Mission
        </h1>
        <p className="text-xl text-stone-600 leading-relaxed font-medium">
          We believe every student deserves access to mental health support. Our AI-powered platform provides confidential, 
          accessible care when and where you need it most.
        </p>
      </div>
    </section>
  );
}