'use client';

import { useState, useEffect } from 'react';
import DemoCard from './DemoCard';
import CategoryFilter from './CategoryFilter';
import DifficultyFilter from './DifficultyFilter';
import SearchBar from './SearchBar';
import DemoModal from './DemoModal';
import StatsCard from './StatsCard';
import Icon from '@/components/ui/AppIcon';


interface Demo {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  image: string;
  alt: string;
  tags: string[];
  fullDescription: string;
  features: string[];
  learningOutcomes: string[];
}

const mockDemos: Demo[] = [
{
  id: 1,
  title: "Image Classification Neural Network",
  description: "Train and test a convolutional neural network to classify images across multiple categories with real-time accuracy metrics.",
  category: "Computer Vision",
  difficulty: "Beginner",
  duration: "15 min",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_100fe6a31-1764099907114.png",
  alt: "Close-up of computer screen displaying colorful neural network visualization with interconnected nodes and data flow patterns",
  tags: ["CNN", "Deep Learning", "Classification"],
  fullDescription: "Explore the fundamentals of image classification using convolutional neural networks. This interactive demo allows you to upload images, adjust network parameters, and observe how the model learns to distinguish between different object categories. Perfect for understanding the basics of computer vision and deep learning.",
  features: [
  "Real-time image classification with adjustable confidence thresholds",
  "Interactive network architecture visualization showing layer-by-layer processing",
  "Performance metrics dashboard with accuracy, precision, and recall",
  "Pre-trained models for immediate experimentation",
  "Custom dataset upload capability for personalized training"],

  learningOutcomes: [
  "Understand how convolutional layers extract visual features",
  "Learn about activation functions and their impact on model performance",
  "Grasp the concept of transfer learning and fine-tuning",
  "Interpret classification results and confidence scores"]

},
{
  id: 2,
  title: "Sentiment Analysis Engine",
  description: "Analyze text sentiment using advanced NLP models. Process customer reviews, social media posts, and feedback in real-time.",
  category: "Natural Language",
  difficulty: "Intermediate",
  duration: "20 min",
  image: "https://images.unsplash.com/photo-1628401259831-92fa5c5c51d1",
  alt: "Person typing on laptop with floating holographic text bubbles showing positive and negative sentiment indicators in blue and red colors",
  tags: ["NLP", "Sentiment", "Text Analysis"],
  fullDescription: "Dive into natural language processing with this comprehensive sentiment analysis tool. Learn how AI models interpret emotions, opinions, and attitudes expressed in text. Experiment with different text inputs and see how the model handles nuanced language, sarcasm, and context.",
  features: [
  "Multi-language sentiment detection supporting 15+ languages",
  "Emotion classification beyond positive/negative (joy, anger, sadness, surprise)",
  "Entity recognition to identify key subjects in text",
  "Batch processing for analyzing multiple texts simultaneously",
  "Confidence scoring with detailed explanation of model decisions"],

  learningOutcomes: [
  "Master the fundamentals of natural language processing",
  "Understand tokenization and text preprocessing techniques",
  "Learn about word embeddings and semantic similarity",
  "Explore real-world applications in customer service and market research"]

},
{
  id: 3,
  title: "Time Series Forecasting",
  description: "Predict future trends using historical data patterns. Ideal for sales forecasting, stock prediction, and demand planning.",
  category: "Predictive Analytics",
  difficulty: "Advanced",
  duration: "30 min",
  image: "https://images.unsplash.com/photo-1583373325529-501e03a3a8e7",
  alt: "Financial chart on computer monitor showing upward trending line graph with candlesticks and volume bars in green and red",
  tags: ["Forecasting", "Time Series", "LSTM"],
  fullDescription: "Master the art of time series forecasting with this advanced demo featuring LSTM neural networks. Learn to identify patterns, handle seasonality, and make accurate predictions about future values. This demo includes real-world datasets and industry-standard evaluation metrics.",
  features: [
  "Multiple forecasting algorithms (ARIMA, LSTM, Prophet) for comparison",
  "Automatic seasonality detection and trend decomposition",
  "Interactive parameter tuning with immediate visual feedback",
  "Confidence intervals and prediction uncertainty visualization",
  "Export forecasts in multiple formats (CSV, JSON, Excel)"],

  learningOutcomes: [
  "Understand time series components: trend, seasonality, and noise",
  "Learn to preprocess and normalize temporal data",
  "Master LSTM architecture for sequence prediction",
  "Evaluate forecast accuracy using MAE, RMSE, and MAPE metrics"]

},
{
  id: 4,
  title: "Object Detection System",
  description: "Detect and locate multiple objects in images and video streams with bounding boxes and confidence scores.",
  category: "Computer Vision",
  difficulty: "Intermediate",
  duration: "25 min",
  image: "https://images.unsplash.com/photo-1729945467551-35602712b59c",
  alt: "Autonomous vehicle dashboard camera view with multiple colored bounding boxes detecting pedestrians, cars, and traffic signs on city street",
  tags: ["YOLO", "Detection", "Real-time"],
  fullDescription: "Experience state-of-the-art object detection powered by YOLO (You Only Look Once) architecture. This demo showcases real-time detection capabilities, allowing you to upload images or use your webcam to detect and classify multiple objects simultaneously with impressive accuracy.",
  features: [
  "Real-time object detection with webcam integration",
  "Support for 80+ object categories from COCO dataset",
  "Adjustable detection threshold and non-maximum suppression",
  "Batch processing for multiple images",
  "Performance metrics including FPS and inference time"],

  learningOutcomes: [
  "Understand the difference between classification and detection",
  "Learn about anchor boxes and region proposals",
  "Explore IoU (Intersection over Union) metrics",
  "Discover applications in autonomous vehicles and surveillance"]

},
{
  id: 5,
  title: "Chatbot Conversation AI",
  description: "Build and test conversational AI models. Create intelligent chatbots that understand context and provide relevant responses.",
  category: "Natural Language",
  difficulty: "Beginner",
  duration: "15 min",
  image: "https://images.unsplash.com/photo-1712002641124-2950ba667e78",
  alt: "Smartphone screen displaying chat interface with AI assistant conversation bubbles in blue and white against gradient background",
  tags: ["Chatbot", "Dialogue", "Transformers"],
  fullDescription: "Create your first conversational AI chatbot using transformer-based language models. This beginner-friendly demo guides you through the process of building a chatbot that can understand context, maintain conversation flow, and provide intelligent responses across various topics.",
  features: [
  "Pre-built conversation templates for common use cases",
  "Context-aware responses that remember conversation history",
  "Personality customization to match brand voice",
  "Intent recognition and entity extraction",
  "Multi-turn dialogue management"],

  learningOutcomes: [
  "Understand the basics of conversational AI architecture",
  "Learn about intent classification and slot filling",
  "Explore transformer models and attention mechanisms",
  "Design effective conversation flows and fallback strategies"]

},
{
  id: 6,
  title: "Anomaly Detection System",
  description: "Identify unusual patterns and outliers in data streams. Essential for fraud detection, system monitoring, and quality control.",
  category: "Predictive Analytics",
  difficulty: "Advanced",
  duration: "35 min",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1226bce9d-1764099907205.png",
  alt: "Dark computer screen showing colorful data visualization with red alert markers highlighting anomalous data points in network traffic graph",
  tags: ["Anomaly", "Unsupervised", "Autoencoder"],
  fullDescription: "Master advanced anomaly detection techniques using autoencoders and isolation forests. This comprehensive demo teaches you to identify rare events, outliers, and suspicious patterns in complex datasets. Perfect for cybersecurity, fraud detection, and predictive maintenance applications.",
  features: [
  "Multiple detection algorithms (Isolation Forest, One-Class SVM, Autoencoder)",
  "Real-time streaming data analysis",
  "Customizable sensitivity and threshold settings",
  "Visualization of normal vs. anomalous behavior",
  "Alert system with configurable notification rules"],

  learningOutcomes: [
  "Understand unsupervised learning for anomaly detection",
  "Learn about reconstruction error and distance-based methods",
  "Master feature engineering for anomaly detection",
  "Evaluate detection performance using precision-recall curves"]

},
{
  id: 7,
  title: "Face Recognition & Verification",
  description: "Implement facial recognition technology for identity verification, access control, and personalized experiences.",
  category: "Computer Vision",
  difficulty: "Intermediate",
  duration: "20 min",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_13b0ca655-1764099908647.png",
  alt: "Person's face with digital scanning grid overlay showing facial recognition points and biometric identification markers in blue light",
  tags: ["Face Recognition", "Biometrics", "Deep Learning"],
  fullDescription: "Explore cutting-edge facial recognition technology using deep learning embeddings. This demo demonstrates how AI can identify and verify individuals with high accuracy while addressing privacy concerns and ethical considerations in biometric systems.",
  features: [
  "Face detection and alignment preprocessing",
  "1:1 verification and 1:N identification modes",
  "Liveness detection to prevent spoofing attacks",
  "Privacy-preserving face embeddings",
  "Performance metrics across different demographics"],

  learningOutcomes: [
  "Understand facial landmark detection and alignment",
  "Learn about face embeddings and similarity metrics",
  "Explore ethical considerations in facial recognition",
  "Master techniques for handling pose and lighting variations"]

},
{
  id: 8,
  title: "Recommendation Engine",
  description: "Build personalized recommendation systems using collaborative filtering and content-based approaches.",
  category: "Predictive Analytics",
  difficulty: "Intermediate",
  duration: "25 min",
  image: "https://images.unsplash.com/photo-1649424221016-58857288854e",
  alt: "Tablet screen showing personalized product recommendations with star ratings and suggested items in grid layout with shopping cart icon",
  tags: ["Recommendations", "Collaborative Filtering", "Matrix Factorization"],
  fullDescription: "Create sophisticated recommendation systems that power modern e-commerce and content platforms. Learn how Netflix, Amazon, and Spotify suggest relevant items to users by analyzing behavior patterns and preferences using advanced machine learning algorithms.",
  features: [
  "Hybrid recommendation combining collaborative and content-based filtering",
  "Cold start problem handling for new users and items",
  "Real-time recommendation updates based on user interactions",
  "Diversity and serendipity optimization",
  "A/B testing framework for recommendation strategies"],

  learningOutcomes: [
  "Master collaborative filtering techniques (user-based and item-based)",
  "Understand matrix factorization and latent factor models",
  "Learn to evaluate recommendation quality using precision@k and NDCG",
  "Explore the cold start problem and potential solutions"]

},
{
  id: 9,
  title: "Neural Style Transfer",
  description: "Transform images using artistic styles from famous paintings. Combine content and style using deep neural networks.",
  category: "Computer Vision",
  difficulty: "Advanced",
  duration: "30 min",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dbae91a4-1764099909182.png",
  alt: "Split-screen comparison showing original photograph on left and artistic neural style transfer result on right with Van Gogh painting style",
  tags: ["Style Transfer", "GANs", "Creative AI"],
  fullDescription: "Unleash your creativity with neural style transfer, a fascinating application of deep learning that merges the content of one image with the artistic style of another. This advanced demo uses convolutional neural networks to create stunning artistic renditions of your photos.",
  features: [
  "Multiple pre-loaded artistic styles from famous painters",
  "Custom style image upload for unique transformations",
  "Adjustable style strength and content preservation",
  "High-resolution output generation",
  "Batch processing for multiple images"],

  learningOutcomes: [
  "Understand how CNNs extract content and style features",
  "Learn about Gram matrices and style representation",
  "Explore the optimization process in style transfer",
  "Discover applications in creative industries and design"]

},
{
  id: 10,
  title: "Speech Recognition System",
  description: "Convert spoken language into text with high accuracy. Support for multiple languages and accents.",
  category: "Natural Language",
  difficulty: "Beginner",
  duration: "15 min",
  image: "https://images.unsplash.com/photo-1709846486283-de18cb67bc67",
  alt: "Professional microphone with sound wave visualization in blue and purple colors showing audio signal processing on dark background",
  tags: ["Speech-to-Text", "ASR", "Audio Processing"],
  fullDescription: "Experience the power of automatic speech recognition (ASR) technology that converts spoken words into written text. This demo showcases modern deep learning approaches to speech recognition, including handling of background noise, accents, and multiple speakers.",
  features: [
  "Real-time speech-to-text transcription",
  "Support for 20+ languages and dialects",
  "Punctuation and capitalization restoration",
  "Speaker diarization for multi-speaker scenarios",
  "Custom vocabulary and domain adaptation"],

  learningOutcomes: [
  "Understand audio signal processing and feature extraction",
  "Learn about acoustic models and language models",
  "Explore attention mechanisms in sequence-to-sequence models",
  "Discover applications in accessibility and voice interfaces"]

},
{
  id: 11,
  title: "Reinforcement Learning Agent",
  description: "Train AI agents to make decisions through trial and error. Watch agents learn optimal strategies in game environments.",
  category: "Neural Networks",
  difficulty: "Advanced",
  duration: "40 min",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a70e2bbf-1764099907591.png",
  alt: "3D rendered game environment with AI agent navigating maze-like structure with glowing path indicators showing learned optimal route",
  tags: ["RL", "Q-Learning", "Policy Gradient"],
  fullDescription: "Dive into the fascinating world of reinforcement learning where AI agents learn to make decisions by interacting with their environment. This advanced demo demonstrates how agents discover optimal strategies through exploration and exploitation, similar to how humans learn from experience.",
  features: [
  "Multiple RL algorithms (DQN, A3C, PPO) for comparison",
  "Interactive environment visualization showing agent behavior",
  "Reward shaping and hyperparameter tuning interface",
  "Training progress monitoring with learning curves",
  "Pre-trained agents for immediate demonstration"],

  learningOutcomes: [
  "Understand the RL framework: states, actions, rewards, and policies",
  "Learn about exploration vs. exploitation trade-offs",
  "Master value functions and policy optimization",
  "Explore applications in robotics, gaming, and autonomous systems"]

},
{
  id: 12,
  title: "Generative Text Model",
  description: "Generate human-like text using transformer-based language models. Create stories, articles, and creative content.",
  category: "Natural Language",
  difficulty: "Advanced",
  duration: "25 min",
  image: "https://images.unsplash.com/photo-1718241905450-a26e6c964239",
  alt: "Laptop keyboard with holographic text and words floating above keys showing AI-generated content in glowing blue letters",
  tags: ["GPT", "Text Generation", "Language Models"],
  fullDescription: "Explore the capabilities of large language models in generating coherent, contextually relevant text. This demo showcases how transformer architectures can create human-like content across various styles and topics, from creative writing to technical documentation.",
  features: [
  "Multiple generation modes (creative, factual, conversational)",
  "Temperature and top-k sampling controls for output diversity",
  "Prompt engineering guidance and best practices",
  "Content filtering and safety mechanisms",
  "Export generated text in multiple formats"],

  learningOutcomes: [
  "Understand transformer architecture and self-attention",
  "Learn about tokenization and vocabulary management",
  "Master prompt engineering techniques",
  "Explore ethical considerations in text generation"]

}];


const categories = [
"All Demos",
"Computer Vision",
"Natural Language",
"Predictive Analytics",
"Neural Networks"];


const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const stats = [
{ label: "Total Demos", value: "12", icon: "CubeIcon", color: "blue" },
{ label: "Active Users", value: "2.5K+", icon: "UsersIcon", color: "cyan" },
{ label: "Avg. Completion", value: "87%", icon: "ChartBarIcon", color: "green" },
{ label: "User Rating", value: "4.8/5", icon: "StarIcon", color: "amber" }];


export default function InteractiveDemoContent() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Demos");
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-4 md:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) =>
              <div key={i} className="h-32 bg-muted rounded"></div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) =>
              <div key={i} className="h-96 bg-muted rounded"></div>
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  const filteredDemos = mockDemos.filter((demo) => {
    const matchesCategory = activeCategory === "All Demos" || demo.category === activeCategory;
    const matchesDifficulty = activeDifficulty === "All" || demo.difficulty === activeDifficulty;
    const matchesSearch =
    demo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    demo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    demo.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const handleLaunchDemo = (demoId: number) => {
    const demo = mockDemos.find((d) => d.id === demoId);
    if (demo) {
      setSelectedDemo(demo);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDemo(null), 300);
  };

  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-background px-4 md:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Interactive Demo Center
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience AI in action through hands-on demonstrations. Explore, experiment, and learn with our comprehensive collection of interactive AI models and algorithms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) =>
            <StatsCard key={index} stat={stat} />
            )}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Explore Demos</h2>
                <p className="text-sm text-muted-foreground">
                  Filter by category, difficulty, or search for specific topics
                </p>
              </div>
              <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Category</h3>
                <CategoryFilter
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory} />

              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Difficulty Level</h3>
                <DifficultyFilter
                  difficulties={difficulties}
                  activeDifficulty={activeDifficulty}
                  onDifficultyChange={setActiveDifficulty} />

              </div>
            </div>
          </div>

          {filteredDemos.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDemos.map((demo) =>
            <DemoCard key={demo.id} demo={demo} onLaunch={handleLaunchDemo} />
            )}
            </div> :

          <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Icon name="MagnifyingGlassIcon" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No demos found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search query to find what you're looking for.
              </p>
              <button
              onClick={() => {
                setActiveCategory("All Demos");
                setActiveDifficulty("All");
                setSearchQuery("");
              }}
              className="px-6 py-3 text-sm font-semibold text-primary-foreground bg-action-blue rounded-md hover:shadow-cta-hover hover:scale-105 transition-intelligent">

                Reset Filters
              </button>
            </div>
          }
        </div>
      </section>

      <DemoModal demo={selectedDemo} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>);

}