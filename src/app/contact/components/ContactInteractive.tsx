'use client';

import React, { useState, useEffect } from 'react';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import LocationMap from './LocationMap';

type FormType = 'student' | 'researcher' | 'industry' | 'general' | null;

const ContactInteractive: React.FC = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeForm, setActiveForm] = useState<FormType>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const contactOptions = [
    {
      icon: 'AcademicCapIcon',
      title: 'Students & Educators',
      description: 'Learning opportunities, educational partnerships, and career guidance for students and academic institutions.',
      action: 'Start Student Inquiry',
      formType: 'student' as FormType
    },
    {
      icon: 'BeakerIcon',
      title: 'Research Collaboration',
      description: 'Partner with us on cutting-edge AI research, methodology sharing, and academic publications.',
      action: 'Propose Collaboration',
      formType: 'researcher' as FormType
    },
    {
      icon: 'BuildingOfficeIcon',
      title: 'Industry Partnerships',
      description: 'Enterprise AI solutions, implementation consulting, and custom development for your organization.',
      action: 'Request Partnership',
      formType: 'industry' as FormType
    }
  ];

  return (
    <>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Choose Your Path
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Select the option that best describes your inquiry for a tailored response
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {contactOptions.map((option, index) => (
              <ContactCard
                key={index}
                icon={option.icon}
                title={option.title}
                description={option.description}
                action={option.action}
                onClick={() => setActiveForm(option.formType)}
              />
            ))}
          </div>

          <div className="bg-surface border border-border rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              General Inquiry
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Have a question that doesn't fit the categories above? We're here to help.
            </p>
            <button
              onClick={() => setActiveForm('general')}
              className="inline-flex items-center px-6 py-2 text-sm font-semibold text-primary border border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-intelligent"
            >
              Send General Message
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ContactInfo />
            </div>
            <div>
              <LocationMap />
            </div>
          </div>
        </div>
      </section>

      {activeForm && (
        <ContactForm
          formType={activeForm}
          onClose={() => setActiveForm(null)}
        />
      )}
    </>
  );
};

export default ContactInteractive;