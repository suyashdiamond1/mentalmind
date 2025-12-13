interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  milestone: string;
}

interface TimelineSectionProps {
  events: TimelineEvent[];
}

export default function TimelineSection({ events }: TimelineSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Key milestones that shaped AI Nexus into what it is today
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border"></div>

          <div className="space-y-12">
            {events.map((event, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex-1 md:pr-8 md:pl-8">
                  <div
                    className={`bg-surface p-6 rounded-xl border border-border shadow-brand-sm hover:shadow-brand-md transition-intelligent ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}
                  >
                    <div className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-3">
                      {event.milestone}
                    </div>
                    <h3 className="text-2xl font-bold text-secondary mb-2">
                      {event.year}
                    </h3>
                    <h4 className="text-xl font-semibold text-primary mb-3">
                      {event.title}
                    </h4>
                    <p className="text-text-secondary leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-surface shadow-brand-sm"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}