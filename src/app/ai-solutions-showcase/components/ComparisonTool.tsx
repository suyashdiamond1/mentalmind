'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Solution {
  id: number;
  title: string;
  category: string;
  metrics: {
    accuracy: string;
    performance: string;
    satisfaction: string;
  };
  implementationTime: string;
  complexity: string;
}

interface ComparisonToolProps {
  solutions: Solution[];
}

export default function ComparisonTool({ solutions }: ComparisonToolProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedSolutions, setSelectedSolutions] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const toggleSolution = (id: number) => {
    setSelectedSolutions(prev => {
      if (prev.includes(id)) {
        return prev.filter(sId => sId !== id);
      }
      if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const selectedSolutionData = solutions.filter(s => selectedSolutions.includes(s.id));

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center space-x-3">
          <Icon name="ScaleIcon" size={24} className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Compare Solutions</h3>
            <p className="text-sm text-muted-foreground">Select up to 3 solutions to compare</p>
          </div>
        </div>
        <Icon name={isOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={24} className="text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {solutions.slice(0, 6).map((solution) => (
              <button
                key={solution.id}
                onClick={() => toggleSolution(solution.id)}
                disabled={!selectedSolutions.includes(solution.id) && selectedSolutions.length >= 3}
                className={`p-4 border rounded-lg text-left transition-intelligent ${
                  selectedSolutions.includes(solution.id)
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                } ${!selectedSolutions.includes(solution.id) && selectedSolutions.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-card-foreground mb-1">{solution.title}</p>
                    <p className="text-xs text-muted-foreground">{solution.category}</p>
                  </div>
                  {selectedSolutions.includes(solution.id) && (
                    <Icon name="CheckCircleIcon" size={20} className="text-primary flex-shrink-0" variant="solid" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {selectedSolutionData.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-sm font-semibold text-card-foreground">Feature</th>
                    {selectedSolutionData.map((solution) => (
                      <th key={solution.id} className="text-left p-3 text-sm font-semibold text-card-foreground">
                        {solution.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 text-sm text-muted-foreground">Category</td>
                    {selectedSolutionData.map((solution) => (
                      <td key={solution.id} className="p-3 text-sm text-card-foreground">{solution.category}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-sm text-muted-foreground">Accuracy</td>
                    {selectedSolutionData.map((solution) => (
                      <td key={solution.id} className="p-3 text-sm text-card-foreground font-semibold">{solution.metrics.accuracy}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-sm text-muted-foreground">Performance</td>
                    {selectedSolutionData.map((solution) => (
                      <td key={solution.id} className="p-3 text-sm text-card-foreground font-semibold">{solution.metrics.performance}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-sm text-muted-foreground">Satisfaction</td>
                    {selectedSolutionData.map((solution) => (
                      <td key={solution.id} className="p-3 text-sm text-card-foreground font-semibold">{solution.metrics.satisfaction}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-sm text-muted-foreground">Complexity</td>
                    {selectedSolutionData.map((solution) => (
                      <td key={solution.id} className="p-3 text-sm text-card-foreground">{solution.complexity}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-sm text-muted-foreground">Implementation Time</td>
                    {selectedSolutionData.map((solution) => (
                      <td key={solution.id} className="p-3 text-sm text-card-foreground">{solution.implementationTime}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}