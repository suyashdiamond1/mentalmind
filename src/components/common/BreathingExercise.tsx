'use client';
import { useState, useEffect } from 'react';

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Switch phases
            if (phase === 'Inhale') {
              setPhase('Hold');
              return 7;
            } else if (phase === 'Hold') {
              setPhase('Exhale');
              return 8;
            } else {
              setPhase('Inhale');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setPhase('Inhale');
      setTimeLeft(4);
    }

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const toggleExercise = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="bg-white rounded-[2rem] border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 text-center h-full flex flex-col justify-center items-center">
      <h3 className="text-xl font-semibold text-stone-800 mb-2">4-7-8 Breathing</h3>
      <p className="text-stone-500 mb-8 text-sm">Calm your mind before continuing</p>
      
      <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
        {/* Outer Ring */}
        <div 
          className={`absolute inset-0 rounded-full border-4 border-emerald-100 transition-all duration-[4000ms] ease-in-out ${
            isActive && phase === 'Inhale' ? 'scale-110' : 
            isActive && phase === 'Exhale' ? 'scale-90' : 'scale-100'
          }`}
        ></div>
        
        {/* Inner Circle (Lungs) */}
        <div 
          className={`absolute rounded-full bg-emerald-50 flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${
            isActive && phase === 'Inhale' ? 'w-40 h-40 bg-emerald-100' : 
            isActive && phase === 'Exhale' ? 'w-24 h-24 bg-emerald-50' : 'w-32 h-32'
          }`}
        >
          <div className="text-center">
            <div className="text-sm font-semibold text-emerald-800 uppercase tracking-widest">{isActive ? phase : 'Ready'}</div>
            {isActive && <div className="text-2xl font-bold text-emerald-700 mt-1">{timeLeft}s</div>}
          </div>
        </div>
      </div>

      <button
        onClick={toggleExercise}
        className={`px-8 py-3 rounded-xl font-medium transition-colors w-full sm:w-auto ${
          isActive 
            ? 'bg-stone-100 text-stone-700 hover:bg-stone-200' 
            : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm'
        }`}
      >
        {isActive ? 'Stop Exercise' : 'Start Breathing'}
      </button>
    </div>
  );
}
