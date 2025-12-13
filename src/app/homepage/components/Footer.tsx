'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Student Mental Health</h3>
            <p className="text-sm">
              Providing confidential AI-powered mental health support for students worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/resources" className="hover:text-white transition-colors">Mental Health Resources</Link></li>
              <li><Link href="/crisis" className="hover:text-white transition-colors">Crisis Support</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Emergency</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-red-400 font-medium">🚨 Crisis Hotline: 988</li>
              <li>📞 Campus Counseling</li>
              <li>💬 Crisis Text Line</li>
              <li>🏥 Find Emergency Room</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2025 Student Mental Health Support. All rights reserved.</p>
          <p className="mt-2 text-gray-500">
            This service provides support but is not a replacement for professional mental health care.
          </p>
        </div>
      </div>
    </footer>
  );
}