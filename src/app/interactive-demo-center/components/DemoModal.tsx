'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface DemoModalProps {
  demo: {
    id: number;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    duration: string;
    image: string;
    alt: string;
    tags: string[];
    fullDescription: string;
    features: string[];
    learningOutcomes: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ demo, isOpen, onClose }: DemoModalProps) {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (isRunning && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 10, 100));
      }, 500);
      return () => clearTimeout(timer);
    }
    if (progress === 100) {
      setIsRunning(false);
    }
  }, [isRunning, progress, isHydrated]);

  if (!isOpen || !demo) return null;

  const handleStartDemo = () => {
    setProgress(0);
    setIsRunning(true);
  };

  const handleResetDemo = () => {
    setProgress(0);
    setIsRunning(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-brand-lg animate-slide-in-bottom">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-card-foreground">{demo.title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-intelligent"
            aria-label="Close modal"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <AppImage
              src={demo.image}
              alt={demo.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 text-xs font-semibold bg-accent text-accent-foreground rounded-full">
                  {demo.category}
                </span>
                <span className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                  {demo.difficulty}
                </span>
                <div className="flex items-center gap-1 text-xs text-white">
                  <Icon name="ClockIcon" size={14} />
                  <span>{demo.duration}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">About This Demo</h3>
            <p className="text-sm text-muted-foreground">{demo.fullDescription}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-3">Key Features</h3>
            <ul className="space-y-2">
              {demo.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" variant="solid" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-3">Learning Outcomes</h3>
            <ul className="space-y-2">
              {demo.learningOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Icon name="AcademicCapIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-muted rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Interactive Playground</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Progress:</span>
                <span className="text-sm font-semibold text-primary">{progress}%</span>
              </div>
            </div>

            <div className="w-full bg-background rounded-full h-3 mb-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleStartDemo}
                disabled={isRunning}
                className="flex-1 px-4 py-3 text-sm font-semibold text-primary-foreground bg-action-blue rounded-md hover:shadow-cta-hover hover:scale-105 transition-intelligent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <Icon name="PlayIcon" size={16} variant="solid" />
                {isRunning ? 'Running...' : 'Start Demo'}
              </button>
              <button
                onClick={handleResetDemo}
                className="px-4 py-3 text-sm font-semibold text-primary border border-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-intelligent flex items-center justify-center gap-2"
              >
                <Icon name="ArrowPathIcon" size={16} />
                Reset
              </button>
            </div>

            {progress === 100 && (
              <div className="mt-4 p-4 bg-success/10 border border-success rounded-md flex items-start gap-3">
                <Icon name="CheckCircleIcon" size={24} className="text-success flex-shrink-0" variant="solid" />
                <div>
                  <h4 className="text-sm font-semibold text-success mb-1">Demo Completed!</h4>
                  <p className="text-xs text-muted-foreground">
                    Great job! You've successfully completed this interactive demo. Feel free to reset and try again or explore other demos.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {demo.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium text-text-secondary bg-muted rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}