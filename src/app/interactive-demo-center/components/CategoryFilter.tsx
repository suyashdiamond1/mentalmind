'use client';

import Icon from '@/components/ui/AppIcon';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-intelligent flex items-center gap-2 ${
            activeCategory === category
              ? 'bg-primary text-primary-foreground shadow-brand-md'
              : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
          }`}
        >
          {category === 'All Demos' && <Icon name="Squares2X2Icon" size={16} />}
          {category === 'Computer Vision' && <Icon name="EyeIcon" size={16} />}
          {category === 'Natural Language' && <Icon name="ChatBubbleLeftRightIcon" size={16} />}
          {category === 'Predictive Analytics' && <Icon name="ChartBarIcon" size={16} />}
          {category === 'Neural Networks' && <Icon name="CpuChipIcon" size={16} />}
          {category}
        </button>
      ))}
    </div>
  );
}