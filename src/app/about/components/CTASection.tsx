import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CTAButton {
  label: string;
  href: string;
  icon: string;
  variant: 'primary' | 'secondary';
}

interface CTASectionProps {
  title: string;
  description: string;
  buttons: CTAButton[];
}

export default function CTASection({ title, description, buttons }: CTASectionProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-action-blue">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttons.map((button, index) => (
            <Link
              key={index}
              href={button.href}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-intelligent ${
                button.variant === 'primary' ?'bg-surface text-primary hover:shadow-brand-lg hover:scale-105' :'bg-primary-foreground/10 text-primary-foreground border-2 border-primary-foreground/30 hover:bg-primary-foreground/20'
              }`}
            >
              <Icon name={button.icon as any} size={24} />
              {button.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}