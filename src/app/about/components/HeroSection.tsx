'use client';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">About Our Mission</h1>
        <p className="text-xl text-blue-100 leading-relaxed">
          We believe every student deserves access to mental health support. Our AI-powered platform provides confidential, 
          accessible care when and where you need it most.
        </p>
      </div>
    </section>
  );
}