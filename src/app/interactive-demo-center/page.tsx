import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import InteractiveDemoContent from './components/InteractiveDemoContent';

export const metadata: Metadata = {
  title: 'Interactive Demo Center - AI Nexus',
  description: 'Experience AI in action through hands-on demonstrations. Explore computer vision, natural language processing, predictive analytics, and neural networks with our comprehensive collection of interactive demos.',
};

export default function InteractiveDemoCenterPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <InteractiveDemoContent />
      </div>
    </main>
  );
}