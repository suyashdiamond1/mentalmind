# Google Analytics 4 (GA4) Setup Guide for MentalMind

**Date:** December 16, 2025
**Status:** Step-by-Step Implementation Guide

---

## Overview

This guide provides complete instructions for setting up Google Analytics 4 (GA4) for mentalmind.in. GA4 will help us track user behavior, measure the success of our mental health support platform, and identify areas for improvement.

## Part 1: Create GA4 Property (Manual Setup)

### Step 1: Access Google Analytics

1. Go to [https://analytics.google.com](https://analytics.google.com)
2. Sign in with your Google account
3. Click **"Create"** (or **"+ Create Account"** if you don't have one)

### Step 2: Create a New Account

1. **Account Name:** MentalMind Analytics
2. **Data Collection & Uses:** Accept Google Analytics terms
3. Click **Create**

### Step 3: Set Up Property

1. **Property Name:** mentalmind.in
2. **Reporting Time Zone:** Asia/Kolkata (for India) or UTC
3. **Currency:** USD (or INR based on preference)
4. Click **Create**

### Step 4: Create Data Stream (Web)

1. **Platform:** Web
2. **Website URL:** https://mentalmind.in
3. **Stream Name:** MentalMind Web Stream
4. Click **Create Stream**

### Step 5: Get Your Measurement ID

✅ **IMPORTANT:** You'll receive a **Measurement ID** (format: G-XXXXXXXXXX)
- Copy this ID - you'll need it for the Next.js implementation
- Example format: `G-ABC123DEF45`

---

## Part 2: Implement GA4 in Next.js

### Option A: Using Google Tag Manager (Recommended)

#### Step 1: Install Dependencies

```bash
npm install @next/third-parties @googlemaps/js-api-loader
```

#### Step 2: Create `/app/layout.tsx` Configuration

Add this to your `layout.tsx` file in the `<head>` section:

```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Other meta tags */}
      </head>
      <body>
        {children}
        <GoogleAnalytics gaId="G-YOUR_MEASUREMENT_ID" />
      </body>
    </html>
  )
}
```

**Replace `G-YOUR_MEASUREMENT_ID` with your actual Measurement ID**

#### Step 2b: Alternative - Manual gtag Implementation

If you prefer more control, add this to your `layout.tsx`:

```typescript
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-YOUR_MEASUREMENT_ID`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YOUR_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## Part 3: Track Key Events

### Event Tracking Setup

Add this utility file: `/lib/analytics.ts`

```typescript
// /lib/analytics.ts

declare global {
  interface Window {
    gtag: any
  }
}

export const trackEvent = (eventName: string, eventData?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData)
  }
}

// Pre-defined events for mentalmind.in

export const trackSignup = (userType: string) => {
  trackEvent('sign_up', {
    method: 'email',
    user_type: userType,
    timestamp: new Date().toISOString(),
  })
}

export const trackChatbotStart = () => {
  trackEvent('chatbot_start', {
    feature: 'ai_mental_health_chatbot',
    timestamp: new Date().toISOString(),
  })
}

export const trackChatbotMessage = (messageCount: number) => {
  trackEvent('chatbot_interaction', {
    message_number: messageCount,
    timestamp: new Date().toISOString(),
  })
}

export const trackMoodTrackingStart = () => {
  trackEvent('mood_tracking_start', {
    feature: 'mood_tracker',
    timestamp: new Date().toISOString(),
  })
}

export const trackMoodLogged = (mood: string, intensity: number) => {
  trackEvent('mood_logged', {
    mood: mood,
    intensity: intensity,
    timestamp: new Date().toISOString(),
  })
}

export const trackResourceDownload = (resourceName: string) => {
  trackEvent('resource_download', {
    resource: resourceName,
    category: 'mental_health_resources',
    timestamp: new Date().toISOString(),
  })
}

export const trackCrisisHotlineClick = (hotlineType: string) => {
  trackEvent('crisis_resource_accessed', {
    resource_type: hotlineType,
    action: 'hotline_click',
    timestamp: new Date().toISOString(),
  })
}

export const trackPageView = (pageName: string, pagePath: string) => {
  trackEvent('page_view', {
    page_title: pageName,
    page_location: pagePathuate,
  })
}
```

### Using the Analytics Hooks in Components

```typescript
// Example: Signup Component
import { trackSignup } from '@/lib/analytics'

export default function SignupButton() {
  const handleSignup = () => {
    trackSignup('student')
    // ... rest of signup logic
  }

  return <button onClick={handleSignup}>Sign Up</button>
}

// Example: Chatbot Component
import { trackChatbotStart, trackChatbotMessage } from '@/lib/analytics'

export default function ChatInterface() {
  useEffect(() => {
    trackChatbotStart()
  }, [])

  const handleSendMessage = (messageCount: number) => {
    trackChatbotMessage(messageCount)
    // ... message logic
  }
}
```

---

## Part 4: GA4 Configuration in Dashboard

### Create Custom Conversions

1. In GA4, go to **Admin** → **Conversions**
2. Click **New Conversion Event**
3. Set up these conversions:

**Conversion 1: User Signup**
- Event Name: `sign_up`
- Mark as Conversion: ✅

**Conversion 2: Chatbot Usage**
- Event Name: `chatbot_start`
- Mark as Conversion: ✅

**Conversion 3: Mood Tracking**
- Event Name: `mood_tracking_start`
- Mark as Conversion: ✅

**Conversion 4: Crisis Resources Access**
- Event Name: `crisis_resource_accessed`
- Mark as Conversion: ✅

### Create Custom Dimensions

1. Go to **Admin** → **Custom Definitions** → **Custom Dimensions**
2. Create these dimensions:

**Dimension 1: User Type**
- Dimension Name: `user_type`
- Scope: `User`
- Event Parameter: `user_type`

**Dimension 2: Feature Name**
- Dimension Name: `feature_used`
- Scope: `Event`
- Event Parameter: `feature`

---

## Part 5: Key Metrics to Monitor

### Dashboard KPIs

Set up a custom dashboard to track:

1. **User Acquisition**
   - New users per day
   - Signup conversion rate
   - Traffic source distribution

2. **Engagement Metrics**
   - Average session duration
   - Pages per session
   - Bounce rate
   - Feature usage (chatbot, mood tracking, resources)

3. **Conversions**
   - Signups completed
   - Chatbot interactions
   - Mood entries logged
   - Resource downloads
   - Crisis hotline accesses

4. **User Behavior**
   - Most visited pages
   - Time spent on each feature
   - Feature adoption rate
   - User retention

### Create Custom Reports

**Report 1: Feature Adoption**
- Event: `chatbot_start`, `mood_tracking_start`
- Breakdown by date
- Compare features over time

**Report 2: User Journey**
- Track: Landing page → Signup → Feature usage
- Identify drop-off points

**Report 3: Crisis Resource Usage**
- Events: `crisis_resource_accessed`
- Track which resources are most accessed

---

## Part 6: Data Privacy & Compliance

### GDPR & Privacy Considerations

1. **Update Privacy Policy**
   - Add section about GA4 data collection
   - Link to Google's Privacy Policy
   - Explain user tracking

2. **Implement Consent Management** (Optional but Recommended)
   ```typescript
   // Only load GA4 if user consents
   const loadGoogleAnalytics = (consent: boolean) => {
     if (consent) {
       // Load GA4 script
     }
   }
   ```

3. **Anonymize IP Addresses**
   - In GA4 Admin → Data Settings → Data Collection
   - Enable "Anonymize IP"

---

## Part 7: Testing & Verification

### Test GA4 Implementation

1. **Real-Time Debugging**
   - Go to GA4 dashboard
   - Navigate to **Real-time** report
   - Visit your website
   - You should see events appearing in real-time

2. **Use Google Analytics Debugger Extension**
   - Install Chrome extension: "Google Analytics Debugger"
   - Monitor event firing in console

3. **Test Each Event**
   ```typescript
   // In browser console
   window.gtag('event', 'test_event', {test: true})
   ```

---

## Part 8: Expected Timeline

- **Implementation:** 30-60 minutes
- **First Data:** Real-time within 5 minutes of installation
- **Full Reports:** 24-48 hours for historical data
- **Conversion Tracking:** 7-14 days for sufficient data

---

## Troubleshooting

### GA4 Not Tracking

**Problem:** Events not appearing in GA4
**Solutions:**
1. Verify Measurement ID is correct
2. Check browser console for errors
3. Ensure GA4 script is loaded (check Network tab)
4. Wait 24 hours for data to appear

### Consent Banner Blocking GA4

**Solution:** Load GA4 after consent granted

```typescript
const loadAnalytics = (consent: boolean) => {
  if (consent) {
    // Add GA4 script dynamically
  }
}
```

---

## Next Steps

1. ✅ Create GA4 property (You'll do this manually)
2. ✅ Get Measurement ID
3. ✅ Implement in Next.js (Using code above)
4. ✅ Add event tracking to components
5. ✅ Configure conversions in GA4 Dashboard
6. ✅ Create custom reports
7. ✅ Monitor for insights

---

## Resources

- [Google Analytics 4 Official Guide](https://support.google.com/analytics/answer/10089681)
- [Next.js Google Analytics Integration](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries)
- [GA4 Event Tracking Best Practices](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GA4 Custom Events Documentation](https://support.google.com/analytics/answer/9267744)

---

**Last Updated:** December 16, 2025
**Status:** Ready for Implementation
