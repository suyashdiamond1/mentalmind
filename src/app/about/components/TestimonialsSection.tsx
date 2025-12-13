'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: {
    src: string;
    alt: string;
  };
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            What People Say
          </h2>
          <p className="text-lg text-text-secondary">
            Real experiences from users of our 24/7 support platform
          </p>
        </div>

        <div className="relative bg-surface rounded-2xl border border-border shadow-brand-lg p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-primary/20">
              <AppImage
                src={currentTestimonial.image.src}
                alt={currentTestimonial.image.alt}
                fill
                className="object-cover"
              />
            </div>

            <Icon name="ChatBubbleLeftRightIcon" size={40} className="text-accent/30 mb-6" />

            <blockquote className="text-xl md:text-2xl text-text-primary font-medium leading-relaxed mb-8 max-w-3xl">
              "{currentTestimonial.quote}"
            </blockquote>

            <div className="space-y-1">
              <div className="text-lg font-bold text-secondary">
                {currentTestimonial.author}
              </div>
              <div className="text-primary font-semibold">
                {currentTestimonial.role}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-intelligent"
              aria-label="Previous testimonial"
            >
              <Icon name="ChevronLeftIcon" size={24} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-intelligent ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-border'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-intelligent"
              aria-label="Next testimonial"
            >
              <Icon name="ChevronRightIcon" size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}