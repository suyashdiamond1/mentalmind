'use client';

import { useRef } from 'react';
import HeroSection from './HeroSection';
import DemoCarousel from './DemoCarousel';
import TrustIndicators from './TrustIndicators';
import FeaturesGrid from './FeaturesGrid';
import CTASection from './CTASection';
import Footer from './Footer';

const HomepageInteractive = () => {
  const demoSectionRef = useRef<HTMLDivElement>(null);

  const handleExploreClick = () => {
    demoSectionRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <HeroSection onExploreClick={handleExploreClick} />
      <div ref={demoSectionRef}>
        <DemoCarousel />
      </div>
      <TrustIndicators />
      <FeaturesGrid />
      <CTASection />
      <Footer />
    </>
  );
};

export default HomepageInteractive;