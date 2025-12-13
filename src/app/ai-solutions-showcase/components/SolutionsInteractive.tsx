'use client';

import { useState, useEffect, useCallback } from 'react';
import SolutionCard from './SolutionCard';
import FilterPanel, { FilterState } from './FilterPanel';
import ComparisonTool from './ComparisonTool';
import PerformanceMetrics from './PerformanceMetrics';
import CodeSnippet from './CodeSnippet';
import SuccessStory from './SuccessStory';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Solution {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  complexity: string;
  implementationTime: string;
  industry: string[];
  metrics: {
    accuracy: string;
    performance: string;
    satisfaction: string;
  };
  features: string[];
}

interface SuccessStoryData {
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
}

export default function SolutionsInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [filteredSolutions, setFilteredSolutions] = useState<Solution[]>([]);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockSolutions: Solution[] = [
  {
    id: 1,
    title: "Sentiment Analysis Engine",
    category: "Natural Language Processing",
    description: "Advanced NLP model that analyzes customer feedback, social media posts, and reviews to extract sentiment, emotions, and key themes with industry-leading accuracy.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
    alt: "Data analytics dashboard showing sentiment analysis graphs with colorful pie charts and trend lines on computer screen",
    complexity: "Intermediate",
    implementationTime: "2-3 weeks",
    industry: ["Retail", "Finance", "Technology"],
    metrics: {
      accuracy: "96%",
      performance: "150ms",
      satisfaction: "4.8/5"
    },
    features: [
    "Multi-language support for 25+ languages",
    "Real-time sentiment scoring and classification",
    "Emotion detection (joy, anger, sadness, surprise)",
    "Custom training on domain-specific data",
    "API integration with existing systems"]

  },
  {
    id: 2,
    title: "Object Detection System",
    category: "Computer Vision",
    description: "State-of-the-art computer vision solution for real-time object detection, classification, and tracking in images and video streams with exceptional precision.",
    image: "https://images.unsplash.com/photo-1726530015387-9b7dcb79392a",
    alt: "Robotic arm with camera sensor detecting and sorting colorful objects on industrial conveyor belt in modern factory",
    complexity: "Advanced",
    implementationTime: "4-6 weeks",
    industry: ["Manufacturing", "Retail", "Healthcare"],
    metrics: {
      accuracy: "94%",
      performance: "45ms",
      satisfaction: "4.9/5"
    },
    features: [
    "Detect 80+ object categories out-of-the-box",
    "Custom object training capabilities",
    "Real-time video stream processing",
    "Bounding box and segmentation masks",
    "Edge device deployment support"]

  },
  {
    id: 3,
    title: "Demand Forecasting Model",
    category: "Predictive Analytics",
    description: "Machine learning model that predicts future demand patterns based on historical data, seasonal trends, and external factors to optimize inventory and resource allocation.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_152bf2b44-1764099908717.png",
    alt: "Business analyst reviewing predictive analytics charts showing upward trending sales forecasts on multiple monitors",
    complexity: "Intermediate",
    implementationTime: "3-4 weeks",
    industry: ["Retail", "Manufacturing", "Finance"],
    metrics: {
      accuracy: "91%",
      performance: "200ms",
      satisfaction: "4.7/5"
    },
    features: [
    "Time series forecasting with ARIMA and LSTM",
    "Seasonal pattern recognition",
    "External factor integration (weather, events)",
    "Confidence interval predictions",
    "Automated model retraining"]

  },
  {
    id: 4,
    title: "Intelligent Process Automation",
    category: "Automation",
    description: "AI-powered automation platform that streamlines repetitive business processes, reduces manual errors, and increases operational efficiency through smart decision-making.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_189343752-1764099907192.png",
    alt: "Futuristic robotic process automation interface with glowing blue circuits and automated workflow diagrams",
    complexity: "Beginner",
    implementationTime: "1-2 weeks",
    industry: ["Finance", "Healthcare", "Technology"],
    metrics: {
      accuracy: "98%",
      performance: "80ms",
      satisfaction: "4.9/5"
    },
    features: [
    "Visual workflow designer",
    "Pre-built automation templates",
    "Document processing and data extraction",
    "Exception handling and human-in-the-loop",
    "Integration with 100+ business applications"]

  },
  {
    id: 5,
    title: "Personalized Recommendation Engine",
    category: "Recommendation Systems",
    description: "Collaborative filtering and content-based recommendation system that delivers personalized product, content, and service suggestions to enhance user engagement and conversion.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_10449d833-1764099922204.png",
    alt: "Young woman browsing personalized product recommendations on tablet showing curated fashion items and accessories",
    complexity: "Intermediate",
    implementationTime: "3-4 weeks",
    industry: ["Retail", "Education", "Technology"],
    metrics: {
      accuracy: "93%",
      performance: "120ms",
      satisfaction: "4.8/5"
    },
    features: [
    "Hybrid recommendation algorithms",
    "Real-time personalization",
    "A/B testing framework",
    "Cold-start problem handling",
    "Explainable recommendations"]

  },
  {
    id: 6,
    title: "Fraud Detection System",
    category: "Predictive Analytics",
    description: "Advanced anomaly detection system that identifies fraudulent transactions, suspicious activities, and security threats in real-time using machine learning algorithms.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18c2370db-1764099910200.png",
    alt: "Cybersecurity dashboard displaying fraud detection alerts with red warning indicators and network traffic analysis",
    complexity: "Advanced",
    implementationTime: "5-6 weeks",
    industry: ["Finance", "Retail", "Technology"],
    metrics: {
      accuracy: "97%",
      performance: "50ms",
      satisfaction: "4.9/5"
    },
    features: [
    "Real-time transaction monitoring",
    "Behavioral pattern analysis",
    "Multi-factor risk scoring",
    "Adaptive learning from new fraud patterns",
    "Low false-positive rate optimization"]

  }];


  const mockSuccessStories: SuccessStoryData[] = [
  {
    id: 1,
    company: "TechRetail Inc.",
    industry: "E-commerce",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c91792e7-1764099908642.png",
    logoAlt: "Modern tech retail company logo with geometric blue and white design",
    challenge: "Customer churn rate was increasing due to poor product recommendations and generic shopping experiences. Manual analysis of customer preferences was time-consuming and ineffective.",
    solution: "Implemented our Personalized Recommendation Engine with real-time behavioral tracking and collaborative filtering to deliver tailored product suggestions across all touchpoints.",
    results: [
    { metric: "Revenue", value: "+42%", description: "Increase in sales" },
    { metric: "Engagement", value: "+65%", description: "Higher click-through" },
    { metric: "Retention", value: "+38%", description: "Customer retention" }],

    testimonial: "The recommendation engine transformed our business. We're now delivering personalized experiences at scale, and our customers love it. The ROI was evident within the first quarter.",
    author: "Sarah Johnson",
    authorRole: "Chief Technology Officer",
    authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1bdbe6c11-1763300715032.png",
    authorImageAlt: "Professional headshot of Sarah Johnson, woman with short brown hair in navy blazer smiling confidently"
  },
  {
    id: 2,
    company: "FinSecure Bank",
    industry: "Financial Services",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e6c618c3-1764099909185.png",
    logoAlt: "Financial institution logo featuring gold shield emblem with secure banking symbolism",
    challenge: "Rising fraud incidents were causing significant financial losses and damaging customer trust. Traditional rule-based systems couldn't keep pace with evolving fraud tactics.",
    solution: "Deployed our Fraud Detection System with real-time anomaly detection and adaptive learning capabilities to identify and prevent fraudulent transactions instantly.",
    results: [
    { metric: "Fraud Loss", value: "-78%", description: "Reduction in losses" },
    { metric: "Detection", value: "99.2%", description: "Fraud catch rate" },
    { metric: "Response", value: "50ms", description: "Average detection time" }],

    testimonial: "This AI solution has been a game-changer for our security operations. We're catching fraud attempts we would have missed before, and our customers feel safer banking with us.",
    author: "Michael Chen",
    authorRole: "VP of Risk Management",
    authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9cc28cc-1763296010927.png",
    authorImageAlt: "Professional portrait of Michael Chen, Asian man in dark suit with glasses in modern office setting"
  },
  {
    id: 3,
    company: "MediCare Plus",
    industry: "Healthcare",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ee918ed5-1764099906613.png",
    logoAlt: "Healthcare provider logo with medical cross symbol in calming blue and white colors",
    challenge: "Manual processing of patient records and insurance claims was creating bottlenecks, leading to delayed treatments and frustrated patients. Staff was overwhelmed with paperwork.",
    solution: "Integrated our Intelligent Process Automation platform to automate document processing, data extraction, and claim validation with human oversight for complex cases.",
    results: [
    { metric: "Processing", value: "-85%", description: "Time reduction" },
    { metric: "Accuracy", value: "98%", description: "Data accuracy" },
    { metric: "Satisfaction", value: "+56%", description: "Patient satisfaction" }],

    testimonial: "The automation solution freed up our staff to focus on patient care instead of paperwork. Processing times dropped dramatically, and our patients are happier than ever.",
    author: "Dr. Emily Rodriguez",
    authorRole: "Chief Medical Officer",
    authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_155748a5d-1763296653785.png",
    authorImageAlt: "Professional photo of Dr. Emily Rodriguez, Hispanic woman doctor in white coat with stethoscope smiling warmly"
  }];


  const handleFilterChange = useCallback((filters: FilterState) => {
    let filtered = [...mockSolutions];

    if (filters.category !== 'All') {
      filtered = filtered.filter((s) => s.category === filters.category);
    }

    if (filters.complexity !== 'All') {
      filtered = filtered.filter((s) => s.complexity === filters.complexity);
    }

    if (filters.industry !== 'All') {
      filtered = filtered.filter((s) => s.industry.includes(filters.industry));
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter((s) =>
      s.title.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query) ||
      s.category.toLowerCase().includes(query)
      );
    }

    setFilteredSolutions(filtered);
  }, []);

  const handleViewDetails = (id: number) => {
    const solution = mockSolutions.find((s) => s.id === id);
    if (solution) {
      setSelectedSolution(solution);
    }
  };

  const handleNextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % mockSuccessStories.length);
  };

  const handlePrevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + mockSuccessStories.length) % mockSuccessStories.length);
  };

  const integrationCode = `// Initialize AI Nexus SDK
import { AIClient } from '@ai-nexus/sdk';
import AppImage from '@/components/ui/AppImage';


const client = new AIClient({
  apiKey: process.env.AI_NEXUS_API_KEY,
  region: 'us-east-1'
});

// Example: Sentiment Analysis
const result = await client.nlp.analyzeSentiment({
  text: "Your customer feedback text here",
  language: "en"
});

console.log(result.sentiment); // positive, negative, neutral
console.log(result.score); // 0.0 to 1.0
console.log(result.emotions); // joy, anger, sadness, etc.`;

  useEffect(() => {
    if (isHydrated) {
      setFilteredSolutions(mockSolutions);
    }
  }, [isHydrated]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="w-full px-4 md:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="h-96 bg-muted rounded-lg"></div>
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) =>
                <div key={i} className="h-96 bg-muted rounded-lg"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="w-full px-4 md:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">AI Solutions Showcase</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore our comprehensive suite of AI-powered solutions designed to transform your business operations. From natural language processing to computer vision, discover the perfect solution for your needs.
          </p>
        </div>

        <div className="mb-8">
          <ComparisonTool solutions={mockSolutions} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          <div className="lg:col-span-1">
            <FilterPanel onFilterChange={handleFilterChange} />
          </div>

          <div className="lg:col-span-3">
            {filteredSolutions.length === 0 ?
            <div className="bg-card border border-border rounded-lg p-12 text-center">
                <Icon name="MagnifyingGlassIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">No solutions found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
              </div> :

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSolutions.map((solution) =>
              <SolutionCard
                key={solution.id}
                solution={solution}
                onViewDetails={handleViewDetails} />

              )}
              </div>
            }
          </div>
        </div>

        <div className="mb-12">
          <PerformanceMetrics />
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Integration Examples</h2>
              <p className="text-sm text-muted-foreground">Quick-start code snippets to integrate our AI solutions</p>
            </div>
          </div>
          <CodeSnippet
            title="Sentiment Analysis Integration"
            language="JavaScript"
            code={integrationCode} />

        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Customer Success Stories</h2>
              <p className="text-sm text-muted-foreground">Real-world impact and measurable outcomes from our AI solutions</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevStory}
                className="p-2 border border-border rounded-md hover:bg-muted transition-intelligent"
                aria-label="Previous story">

                <Icon name="ChevronLeftIcon" size={20} />
              </button>
              <span className="text-sm text-muted-foreground">
                {currentStoryIndex + 1} / {mockSuccessStories.length}
              </span>
              <button
                onClick={handleNextStory}
                className="p-2 border border-border rounded-md hover:bg-muted transition-intelligent"
                aria-label="Next story">

                <Icon name="ChevronRightIcon" size={20} />
              </button>
            </div>
          </div>
          <SuccessStory story={mockSuccessStories[currentStoryIndex]} />
        </div>

        <div className="bg-gradient-to-r from-primary to-action-blue rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Schedule a personalized demo to see how our AI solutions can address your specific challenges and drive measurable results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <a
              href="/interactive-demo-center"
              className="px-6 py-3 bg-white text-primary font-semibold rounded-md hover:shadow-brand-lg hover:scale-105 transition-intelligent">

              Explore Interactive Demo
            </a>
            <a
              href="/contact"
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-primary transition-intelligent">

              Contact Sales Team
            </a>
          </div>
        </div>
      </div>

      {selectedSolution &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-card-foreground">{selectedSolution.title}</h3>
              <button
              onClick={() => setSelectedSolution(null)}
              className="p-2 hover:bg-muted rounded-md transition-intelligent">

                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <AppImage
                src={selectedSolution.image}
                alt={selectedSolution.alt}
                className="w-full h-64 object-cover rounded-lg" />

              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-card-foreground mb-2">Category</h4>
                  <p className="text-sm text-muted-foreground">{selectedSolution.category}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-card-foreground mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedSolution.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-card-foreground mb-2">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedSolution.features.map((feature, idx) =>
                  <li key={idx} className="flex items-start text-sm text-muted-foreground">
                        <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                  )}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-card-foreground mb-2">Complexity</h4>
                    <p className="text-sm text-muted-foreground">{selectedSolution.complexity}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-card-foreground mb-2">Implementation</h4>
                    <p className="text-sm text-muted-foreground">{selectedSolution.implementationTime}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-card-foreground mb-2">Industries</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSolution.industry.map((ind, idx) =>
                  <span key={idx} className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                        {ind}
                      </span>
                  )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

}