import Icon from '@/components/ui/AppIcon';

interface ImpactMetric {
  value: string;
  label: string;
  icon: string;
  description: string;
}

interface ImpactSectionProps {
  metrics: ImpactMetric[];
}

export default function ImpactSection({ metrics }: ImpactSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Our Impact
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Measuring success through real-world outcomes and community growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-surface p-8 rounded-xl border border-border text-center hover:shadow-brand-lg transition-intelligent"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={metric.icon as any} size={32} className="text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {metric.value}
              </div>
              <div className="text-lg font-semibold text-secondary mb-3">
                {metric.label}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}