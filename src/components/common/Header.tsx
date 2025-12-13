'use client';
import Link from 'next/link';
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
        <Link href="/homepage" className="text-2xl font-bold text-indigo-600">
          🧠 Mental Health Support
        </Link>
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center gap-6 absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none`}>
          <Link href="/homepage" className="block py-2 text-gray-700 hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link href="/contact" className="block py-2 text-gray-700 hover:text-indigo-600 transition-colors">
            Contact
          </Link>
          
          {user ? (
            <>
              <Link href="/dashboard" className="block py-2 text-gray-700 hover:text-indigo-600 transition-colors">
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full md:w-auto text-left md:text-center py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block py-2 text-gray-700 hover:text-indigo-600 transition-colors">
                Login
              </Link>
              <Link href="/signup" className="block py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}