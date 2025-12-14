import React from 'react';
import '../styles/index.css';
import { AuthProvider } from '@/contexts/AuthContext';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Student Mental Health Support | AI Chatbot 24/7 | MentalMind',
  description: 'Free AI-powered mental health chatbot for students. 24/7 confidential support, mood tracking, and crisis resources. Used by 5000+ students.',
  keywords: ['mental health chatbot', 'student mental health', 'AI counselor', 'anxiety support', 'mood tracker', '24/7 support'],
  authors: [{ name: 'MentalMind Team' }],
  creator: 'MentalMind',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    type: 'website',
    url: 'https://mentalmind.in',
    title: 'Student Mental Health Support | AI Chatbot | MentalMind',
    description: 'Free AI mental health chatbot providing 24/7 confidential support for students worldwide.',
    siteName: 'MentalMind',
    locale: 'en_US',
    images: [{
      url: 'https://mentalmind.in/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'MentalMind - AI Mental Health Chatbot for Students',
      type: 'image/jpeg',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Mental Health Support | MentalMind AI Chatbot',
    description: 'Free 24/7 AI mental health support for students',
    image: 'https://mentalmind.in/twitter-image.jpg',
    creator: '@mentalmind',
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://mentalmind.in',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://mentalmind.in" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://static.rocket.new" />
        
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://mentalmind.in',
                },
              ],
            }),
          }}
        />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'MentalMind',
              url: 'https://mentalmind.in',
              logo: 'https://mentalmind.in/logo.png',
              description: 'AI-powered mental health support platform for students',
              foundingDate: '2024',
              areaServed: 'Worldwide',
              sameAs: [
                'https://twitter.com/mentalmind',
                'https://instagram.com/mentalmind',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Crisis Support',
                telephone: '988',
                contactOption: 'TollFree',
              },
            }),
          }}
        />
        
        {/* WebApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'MentalMind - Student Mental Health Support',
              url: 'https://mentalmind.in',
              applicationCategory: 'HealthApplication',
              description: 'AI-powered mental health chatbot with mood tracking and crisis support',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '5000',
                bestRating: '5',
                worstRating: '1',
              },
              featureList: [
                'AI Mental Health Chatbot',
                'Mood Tracking',
                'Resource Library',
                'Emergency Support',
                'Peer Support Groups',
                'Complete Privacy',
              ],
            }),
          }}
        />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fainexus5450back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.11" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.1" />
      </body>
    </html>
  );
}
