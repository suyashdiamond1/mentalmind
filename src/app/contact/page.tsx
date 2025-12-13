import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import FAQSection from './components/FAQSection';

export const metadata: Metadata = {
  title: 'Contact Us - Student Mental Health Support',
  description: 'Get in touch with our team. We are here to help with questions, feedback, or support.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <ContactHero />
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
          <ContactForm />
          <ContactInfo />
        </div>
        <FAQSection />
      </div>
    </main>
  );
}