'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface DemoCardProps {
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
  };
  onLaunch: (demoId: number) => void;
}

export default function DemoCard({ demo, onLaunch }: DemoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const difficultyColors = {
    Beginner: 'bg-success text-success-foreground',
    Intermediate: 'bg-warning text-warning-foreground',
    Advanced: 'bg-destructive text-destructive-foreground',
  };

  return (
    <div
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-brand-lg transition-smooth"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={demo.image}
          alt={demo.alt}
          className={`w-full h-full object-cover transition-smooth ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              difficultyColors[demo.difficulty as keyof typeof difficultyColors]
            }`}
          >
            {demo.difficulty}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 text-xs font-medium text-accent bg-accent/10 rounded">
            {demo.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Icon name="ClockIcon" size={14} />
            <span>{demo.duration}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-card-foreground mb-2">
          {demo.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {demo.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {demo.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs text-text-secondary bg-muted rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => onLaunch(demo.id)}
          className="w-full px-4 py-2 text-sm font-semibold text-primary-foreground bg-action-blue rounded-md hover:shadow-cta-hover hover:scale-105 transition-intelligent flex items-center justify-center gap-2"
        >
          <Icon name="PlayIcon" size={16} variant="solid" />
          Launch Demo
        </button>
      </div>
    </div>
  );
}