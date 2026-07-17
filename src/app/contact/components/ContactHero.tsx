'use client';

export default function ContactHero() {
  return (
    <section className="bg-stone-50 py-24 px-4 border-b border-stone-100">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-stone-800 flex items-center justify-center gap-3">
          <span className="text-4xl">👋</span> Get in Touch
        </h1>
        <p className="text-xl text-stone-500 font-medium">
          Have questions? Need support? We are here to help.
        </p>
      </div>
    </section>
  );
}