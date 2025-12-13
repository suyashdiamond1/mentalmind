import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ContactCardProps {
  icon: string;
  title: string;
  description: string;
  action: string;
  onClick: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  description,
  action,
  onClick
}) => {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-brand-md transition-intelligent group">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-intelligent">
          <Icon name={icon as any} size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
          <p className="text-sm text-text-secondary mb-4">{description}</p>
          <button
            onClick={onClick}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-action-blue transition-intelligent"
          >
            {action}
            <Icon name="ArrowRightIcon" size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;