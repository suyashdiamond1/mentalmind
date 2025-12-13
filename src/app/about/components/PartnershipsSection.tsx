import AppImage from '@/components/ui/AppImage';

interface Partner {
  name: string;
  logo: {
    src: string;
    alt: string;
  };
  category: string;
}

interface PartnershipsSectionProps {
  partners: Partner[];
}

export default function PartnershipsSection({ partners }: PartnershipsSectionProps) {
  const categories = Array.from(new Set(partners.map(p => p.category)));

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Trusted Partnerships
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Collaborating with leading institutions and organizations to advance AI research and education
          </p>
        </div>

        {categories.map((category, catIndex) => (
          <div key={catIndex} className="mb-12 last:mb-0">
            <h3 className="text-xl font-semibold text-primary mb-6 text-center">
              {category}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {partners
                .filter(p => p.category === category)
                .map((partner, index) => (
                  <div
                    key={index}
                    className="bg-background p-6 rounded-xl border border-border flex items-center justify-center hover:shadow-brand-md transition-intelligent group"
                  >
                    <div className="relative w-full h-20">
                      <AppImage
                        src={partner.logo.src}
                        alt={partner.logo.alt}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition-intelligent"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}