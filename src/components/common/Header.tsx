"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/homepage" className="flex shrink-0 items-center gap-3">
          <Image src="/assets/images/logo.png" alt="MentalMind logo" width={64} height={64} className="rounded-full" priority />
          <span className="hidden md:inline-block whitespace-nowrap text-2xl font-bold text-emerald-700">Mental Health Support</span>
        </Link>
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="xl:hidden text-gray-700"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div id="main-navigation" className={`${isMenuOpen ? 'block' : 'hidden'} xl:flex xl:items-center gap-4 absolute xl:relative top-full left-0 right-0 bg-white xl:bg-transparent p-4 xl:p-0 shadow-md xl:shadow-none max-h-[calc(100dvh-96px)] overflow-y-auto xl:max-h-none xl:overflow-visible whitespace-nowrap`}>
          <Link href="/homepage" onClick={() => setIsMenuOpen(false)} className="block py-2 text-stone-600 hover:text-emerald-600 font-medium transition-colors">
            Home
          </Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block py-2 text-stone-600 hover:text-emerald-600 font-medium transition-colors">
            About Us
          </Link>
          <Link href="/funding-and-impact" onClick={() => setIsMenuOpen(false)} className="block py-2 text-stone-600 hover:text-emerald-600 font-medium transition-colors">
            Funding &amp; Impact
          </Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block py-2 text-stone-600 hover:text-emerald-600 font-medium transition-colors">
            Contact
          </Link>
          
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="block py-2 text-stone-600 hover:text-emerald-600 font-medium transition-colors">
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full xl:w-auto text-left xl:text-center py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block py-2 text-stone-600 hover:text-emerald-600 font-medium transition-colors">
                Login
              </Link>
              <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="block py-2 px-6 bg-emerald-700 text-white font-medium rounded-xl hover:bg-emerald-800 transition-colors shadow-sm">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
