'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  category: string;
  complexity: string;
  industry: string;
  searchQuery: string;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    complexity: 'All',
    industry: 'All',
    searchQuery: '',
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      onFilterChange(filters);
    }
  }, [filters, isHydrated, onFilterChange]);

  const categories = ['All', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Automation', 'Recommendation Systems'];
  const complexityLevels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const industries = ['All', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Education', 'Technology'];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      category: 'All',
      complexity: 'All',
      industry: 'All',
      searchQuery: '',
    });
  };

  if (!isHydrated) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        className="lg:hidden w-full mb-4 px-4 py-3 bg-primary text-primary-foreground rounded-lg flex items-center justify-center space-x-2 hover:bg-action-blue transition-intelligent"
      >
        <Icon name="AdjustmentsHorizontalIcon" size={20} />
        <span className="font-semibold">Filters</span>
      </button>

      <div className={`bg-card border border-border rounded-lg p-6 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-card-foreground">Filters</h3>
          <button
            onClick={handleReset}
            className="text-sm text-primary hover:text-action-blue transition-intelligent flex items-center"
          >
            <Icon name="ArrowPathIcon" size={16} className="mr-1" />
            Reset
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-3">
              <Icon name="MagnifyingGlassIcon" size={16} className="inline mr-2" />
              Search Solutions
            </label>
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              placeholder="Search by name or description..."
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-3">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-3">Complexity Level</label>
            <div className="space-y-2">
              {complexityLevels.map((level) => (
                <label key={level} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="complexity"
                    value={level}
                    checked={filters.complexity === level}
                    onChange={(e) => handleFilterChange('complexity', e.target.value)}
                    className="mr-2 accent-primary"
                  />
                  <span className="text-sm text-muted-foreground">{level}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-3">Industry</label>
            <select
              value={filters.industry}
              onChange={(e) => handleFilterChange('industry', e.target.value)}
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}