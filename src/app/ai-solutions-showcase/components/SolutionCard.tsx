'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface SolutionCardProps {
  solution: {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    alt: string;
    complexity: string;
    implementationTime: string;
    industry: string[];
    metrics: {
      accuracy: string;
      performance: string;
      satisfaction: string;
    };
    features: string[];
  };
  onViewDetails: (id: number) => void;
}

export default function SolutionCard({ solution, onViewDetails }: SolutionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const complexityColors = {
    Beginner: 'bg-success text-success-foreground',
    Intermediate: 'bg-warning text-warning-foreground',
    Advanced: 'bg-destructive text-destructive-foreground',
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-brand-md transition-intelligent">
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={solution.image}
          alt={solution.alt}
          className="w-full h-full object-cover hover:scale-105 transition-intelligent"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${complexityColors[solution.complexity as keyof typeof complexityColors]}`}>
            {solution.complexity}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-card-foreground mb-1">{solution.title}</h3>
            <p className="text-sm text-accent font-medium">{solution.category}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{solution.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {solution.industry.slice(0, 3).map((ind, idx) => (
            <span key={idx} className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
              {ind}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-muted rounded-lg">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
            <p className="text-sm font-semibold text-card-foreground">{solution.metrics.accuracy}</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-xs text-muted-foreground mb-1">Performance</p>
            <p className="text-sm font-semibold text-card-foreground">{solution.metrics.performance}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Satisfaction</p>
            <p className="text-sm font-semibold text-card-foreground">{solution.metrics.satisfaction}</p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-sm text-primary hover:text-action-blue transition-intelligent mb-3"
        >
          <span className="font-medium">Key Features</span>
          <Icon name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={20} />
        </button>

        {isExpanded && (
          <ul className="space-y-2 mb-4">
            {solution.features.map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-muted-foreground">
                <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="ClockIcon" size={16} className="mr-1" />
            <span>{solution.implementationTime}</span>
          </div>
          <button
            onClick={() => onViewDetails(solution.id)}
            className="px-4 py-2 text-sm font-semibold text-primary-foreground bg-action-blue rounded-md hover:shadow-brand-md hover:scale-105 transition-intelligent"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}