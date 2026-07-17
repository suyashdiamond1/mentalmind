import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-100 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="text-xl font-bold text-stone-800">MentalMind</span>
          </div>
          <p className="text-sm text-stone-500 font-medium">
            100% Private AI Mental Health Companion
          </p>
        </div>
        
        <nav className="flex items-center gap-8">
          <Link href="/about" className="text-sm font-semibold text-stone-500 hover:text-emerald-600 transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-semibold text-stone-500 hover:text-emerald-600 transition-colors">
            Contact
          </Link>
          <Link href="/resources" className="text-sm font-semibold text-stone-500 hover:text-emerald-600 transition-colors">
            Resources
          </Link>
        </nav>
        
        <div className="text-sm text-stone-400">
          &copy; {new Date().getFullYear()} MentalMind. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
