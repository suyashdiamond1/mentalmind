'use client';

import Icon from '@/components/ui/AppIcon';

interface StatsCardProps {
  stat: {
    label: string;
    value: string;
    icon: string;
    color: string;
  };
}

export default function StatsCard({ stat }: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-primary/10 text-primary',
    cyan: 'bg-accent/10 text-accent',
    green: 'bg-success/10 text-success',
    amber: 'bg-warning/10 text-warning',
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand-md transition-smooth">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
          <Icon name={stat.icon as any} size={24} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
        </div>
      </div>
    </div>
  );
}