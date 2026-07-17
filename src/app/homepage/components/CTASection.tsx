'use client';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 px-4 bg-emerald-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-semibold mb-6">
          You Do Not Have to Face This Alone
        </h2>
        <p className="text-xl md:text-2xl mb-10 text-emerald-100/90 font-medium">
          Start your journey to better mental health today. Our AI chatbot is ready to listen, support, and guide you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="px-8 py-4 bg-white text-emerald-800 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-xl"
          >
            Get Started Free
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 bg-transparent border-2 border-white/80 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
          >
            Learn More About Us
          </Link>
        </div>
        <p className="mt-10 text-sm text-emerald-200/80">
          If you are experiencing a mental health emergency, call 988 or go to your nearest emergency room
        </p>
      </div>
    </section>
  );
}