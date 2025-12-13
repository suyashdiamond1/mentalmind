'use client';

import Icon from '@/components/ui/AppIcon';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Icon name="MagnifyingGlassIcon" size={20} />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search demos by name or tag..."
        className="w-full pl-10 pr-4 py-3 text-sm bg-surface border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-intelligent"
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-intelligent"
          aria-label="Clear search"
        >
          <Icon name="XMarkIcon" size={20} />
        </button>
      )}
    </div>
  );
}