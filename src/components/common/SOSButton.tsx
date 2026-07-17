'use client';
import { useState } from 'react';

export default function SOSButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 md:left-auto md:right-6 z-50 bg-rose-600 text-white p-4 rounded-full shadow-[0_8px_30px_rgb(225,29,72,0.3)] hover:bg-rose-700 hover:scale-105 transition-all flex items-center justify-center group"
        aria-label="Emergency Help"
      >
        <span className="text-2xl">🚨</span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold pl-0 group-hover:pl-3">
          Urgent Help
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-600 text-2xl leading-none"
            >
              &times;
            </button>
            
            <h2 className="text-2xl font-bold text-rose-600 mb-2 flex items-center gap-2">
              <span>🚨</span> Immediate Help Available
            </h2>
            <p className="text-stone-600 mb-8 text-sm">
              If you or someone you know is in immediate danger, please reach out to these resources immediately.
            </p>

            <div className="space-y-4">
              <a 
                href="tel:988" 
                className="block w-full bg-rose-50 border border-rose-100 p-4 rounded-2xl hover:bg-rose-100 transition-colors"
              >
                <div className="text-rose-900 font-bold mb-1">National Crisis Hotline</div>
                <div className="text-rose-700 text-sm">Call 988 (Available 24/7)</div>
              </a>

              <a 
                href="sms:741741" 
                className="block w-full bg-rose-50 border border-rose-100 p-4 rounded-2xl hover:bg-rose-100 transition-colors"
              >
                <div className="text-rose-900 font-bold mb-1">Crisis Text Line</div>
                <div className="text-rose-700 text-sm">Text HOME to 741741</div>
              </a>

              <a 
                href="tel:911" 
                className="block w-full bg-rose-600 text-white p-4 rounded-2xl hover:bg-rose-700 transition-colors text-center font-bold mt-6 shadow-md"
              >
                Call Emergency Services (911)
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
