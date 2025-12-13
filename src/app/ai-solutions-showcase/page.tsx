import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import SolutionsInteractive from './components/SolutionsInteractive';

export const metadata: Metadata = {
  title: 'AI Solutions Showcase - AI Nexus',
  description: 'Explore comprehensive AI capabilities with hands-on demonstrations including Natural Language Processing, Computer Vision, Predictive Analytics, Automation, and Recommendation Systems. View real-world case studies, performance benchmarks, and integration examples.',
};

export default function AIShowcasePage() {
  return (
    <>
      <Header />
      <SolutionsInteractive />
    </>
  );
}