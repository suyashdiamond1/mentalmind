import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface SuccessStoryProps {
  story: {
    id: number;
    company: string;
    industry: string;
    logo: string;
    logoAlt: string;
    challenge: string;
    solution: string;
    results: {
      metric: string;
      value: string;
      description: string;
    }[];
    testimonial: string;
    author: string;
    authorRole: string;
    authorImage: string;
    authorImageAlt: string;
  };
}

export default function SuccessStory({ story }: SuccessStoryProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand-md transition-intelligent">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            <AppImage
              src={story.logo}
              alt={story.logoAlt}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-card-foreground">{story.company}</h4>
            <p className="text-sm text-muted-foreground">{story.industry}</p>
          </div>
        </div>
        <Icon name="StarIcon" size={20} className="text-warning" variant="solid" />
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <h5 className="text-sm font-semibold text-card-foreground mb-2 flex items-center">
            <Icon name="ExclamationTriangleIcon" size={16} className="text-destructive mr-2" />
            Challenge
          </h5>
          <p className="text-sm text-muted-foreground">{story.challenge}</p>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-card-foreground mb-2 flex items-center">
            <Icon name="LightBulbIcon" size={16} className="text-warning mr-2" />
            Solution
          </h5>
          <p className="text-sm text-muted-foreground">{story.solution}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-muted rounded-lg">
        {story.results.map((result, idx) => (
          <div key={idx} className="text-center">
            <p className="text-2xl font-bold text-primary mb-1">{result.value}</p>
            <p className="text-xs font-medium text-card-foreground mb-1">{result.metric}</p>
            <p className="text-xs text-muted-foreground">{result.description}</p>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-start space-x-3 mb-3">
          <Icon name="ChatBubbleLeftIcon" size={20} className="text-primary flex-shrink-0 mt-1" />
          <p className="text-sm text-muted-foreground italic">&quot;{story.testimonial}&quot;</p>
        </div>
        <div className="flex items-center space-x-3 ml-8">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <AppImage
              src={story.authorImage}
              alt={story.authorImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-card-foreground">{story.author}</p>
            <p className="text-xs text-muted-foreground">{story.authorRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
}