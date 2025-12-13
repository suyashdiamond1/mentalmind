import { NextRequest, NextResponse } from 'next/server';
import { openai, isOpenAIConfigured, getConfigStatus } from '@/lib/openai/client';

/**
 * POST /api/chat - Server-side OpenAI chat endpoint
 * 
 * This API route handles all OpenAI API calls server-side to keep the API key secure.
 * The frontend should ONLY call this endpoint, never OpenAI directly.
 * 
 * Environment Variables Required:
 * - OPENAI_API_KEY (server-side only)
 * 
 * Security Features:
 * - API key validation before processing
 * - Comprehensive error handling with user-friendly messages
 * - Request validation (message content, session ID)
 * - No API key exposure in responses
 * - Production-safe error messages (no debug info leaked)
 */

export async function POST(req: NextRequest) {
  try {
    // ==========================================
    // STEP 1: Validate OpenAI Configuration
    // ==========================================
    if (!isOpenAIConfigured()) {
      const configStatus = getConfigStatus();
      console.error('❌ OpenAI configuration check failed:', configStatus);
      
      return NextResponse.json(
        { 
          error: 'API_KEY_NOT_CONFIGURED',
          message: 'OpenAI API key is not configured properly.',
          userMessage: '⚠️ The AI service is not configured. Please contact the administrator.',
          instructions: process.env.NODE_ENV === 'development' ?'Add OPENAI_API_KEY to your .env file. Get your key from: https://platform.openai.com/api-keys'
            : 'The administrator needs to configure the OPENAI_API_KEY environment variable in the deployment platform (Netlify/Vercel).',
          configStatus: process.env.NODE_ENV === 'development' ? configStatus : undefined,
        },
        { status: 503 }
      );
    }

    // ==========================================
    // STEP 2: Parse and Validate Request Body
    // ==========================================
    const body = await req.json();
    const { message, sessionId } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      console.warn('⚠️ Invalid message in request');
      return NextResponse.json(
        { 
          error: 'INVALID_MESSAGE',
          message: 'Message is required and must be a non-empty string.',
          userMessage: 'Please enter a message to send.'
        },
        { status: 400 }
      );
    }

    if (!sessionId) {
      console.warn('⚠️ Missing session ID in request');
      return NextResponse.json(
        { 
          error: 'MISSING_SESSION_ID',
          message: 'Session ID is required.',
          userMessage: 'Session error. Please refresh the page and try again.'
        },
        { status: 400 }
      );
    }

    // ==========================================
    // STEP 3: Call OpenAI API (Server-side Only)
    // ==========================================
    console.log('📤 Sending request to OpenAI API...');
    console.log('   Message length:', message.length);
    console.log('   Session ID:', sessionId);
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a compassionate mental health support AI assistant specifically designed for students. Your role is to:

🎯 PRIMARY RESPONSIBILITIES:
- Provide empathetic, non-judgmental support
- Listen actively and validate feelings
- Offer practical coping strategies and resources
- Recognize signs of crisis and direct to appropriate help
- Maintain a warm, supportive, professional tone
- Focus on student-specific challenges (academic stress, social issues, anxiety, depression)

⚠️ IMPORTANT BOUNDARIES:
- Never diagnose or provide medical advice
- Never prescribe medications or treatments
- Always encourage professional help when needed
- Recognize when issues require immediate professional intervention

🆘 CRISIS PROTOCOLS:
If someone expresses suicidal thoughts, self-harm intentions, or immediate danger:
1. Take it seriously and respond with compassion
2. Direct them to immediate help:
   - National Crisis Hotline: 988
   - Crisis Text Line: Text HOME to 741741
   - Emergency Services: 911
3. Encourage them to reach out to trusted adults or counselors

📝 RESPONSE GUIDELINES:
- Keep responses concise but caring (2-3 paragraphs maximum)
- Use empathetic language and validate feelings
- Offer 1-2 actionable suggestions when appropriate
- Ask follow-up questions to understand better
- Maintain hope and positivity while being realistic`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    console.log('✅ OpenAI API response received successfully');
    console.log('   Response tokens:', response.usage?.completion_tokens);
    console.log('   Total tokens:', response.usage?.total_tokens);

    // ==========================================
    // STEP 4: Extract and Validate Response
    // ==========================================
    const aiMessage = response?.choices?.[0]?.message?.content?.trim();
    
    if (!aiMessage) {
      console.error('❌ Empty response from OpenAI');
      return NextResponse.json(
        { 
          error: 'EMPTY_RESPONSE',
          message: 'Received empty response from OpenAI',
          userMessage: 'I apologize, but I had trouble generating a response. Please try again.'
        },
        { status: 500 }
      );
    }

    // ==========================================
    // STEP 5: Return Success Response
    // ==========================================
    return NextResponse.json({ 
      message: aiMessage,
      metadata: {
        model: response.model,
        tokens: response.usage,
      }
    });

  } catch (error: any) {
    // ==========================================
    // STEP 6: Comprehensive Error Handling
    // ==========================================
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ OPENAI API ERROR');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('Error Type:', error?.constructor?.name);
    console.error('Status Code:', error?.status);
    console.error('Error Code:', error?.code);
    console.error('Error Type:', error?.type);
    console.error('Error Message:', error?.message);
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Detailed error handling with specific user messages
    let errorCode = 'UNKNOWN_ERROR';
    let errorMessage = 'An unexpected error occurred';
    let userFriendlyMessage = "I'm having trouble connecting right now. Please try again in a moment.";
    let statusCode = 500;
    
    if (error?.status === 401 || error?.code === 'invalid_api_key') {
      errorCode = 'INVALID_API_KEY';
      errorMessage = 'Invalid OpenAI API key';
      userFriendlyMessage = '⚠️ The AI service is not properly configured. Please contact support at support@example.com';
      statusCode = 503;
      
      console.error('🔑 API KEY ISSUE: The OPENAI_API_KEY is invalid or has been revoked');
      console.error('   Solution: Update the API key in environment variables (Netlify/Vercel settings)');
      
    } else if (error?.status === 429) {
      errorCode = 'RATE_LIMIT_EXCEEDED';
      errorMessage = 'Rate limit exceeded';
      userFriendlyMessage = '⏱️ Too many requests. Please wait a moment and try again.';
      statusCode = 429;
      
      console.error('📊 RATE LIMIT: Too many requests to OpenAI API');
      console.error('   Solution: Wait a few moments before trying again');
      
    } else if (error?.code === 'insufficient_quota') {
      errorCode = 'QUOTA_EXCEEDED';
      errorMessage = 'OpenAI API quota exceeded';
      userFriendlyMessage = '⚠️ Service temporarily unavailable. Please contact support.';
      statusCode = 503;
      
      console.error('💳 QUOTA EXCEEDED: OpenAI account has run out of credits');
      console.error('   Solution: Add billing information or upgrade plan at platform.openai.com');
      
    } else if (error?.status === 503 || error?.code === 'service_unavailable') {
      errorCode = 'SERVICE_UNAVAILABLE';
      errorMessage = 'OpenAI service temporarily unavailable';
      userFriendlyMessage = '🔧 The AI service is temporarily down. Please try again in a few minutes.';
      statusCode = 503;
      
      console.error('🔧 SERVICE UNAVAILABLE: OpenAI API is experiencing issues');
      console.error('   Check status: https://status.openai.com');
      
    } else if (error?.message?.includes('fetch') || error?.message?.includes('network') || error?.code === 'ECONNREFUSED') {
      errorCode = 'NETWORK_ERROR';
      errorMessage = 'Network error connecting to OpenAI';
      userFriendlyMessage = '🌐 Connection issue. Please check your internet and try again.';
      statusCode = 503;
      
      console.error('🌐 NETWORK ERROR: Unable to reach OpenAI API');
      console.error('   Check internet connection and firewall settings');
      
    } else if (error?.status === 400) {
      errorCode = 'INVALID_REQUEST';
      errorMessage = 'Invalid request to OpenAI API';
      userFriendlyMessage = 'Invalid request. Please try rephrasing your message.';
      statusCode = 400;
      
      console.error('📝 INVALID REQUEST: The request format is incorrect');
      console.error('   Error details:', error?.error?.message);
    }
    
    return NextResponse.json(
      { 
        error: errorCode,
        message: errorMessage,
        userMessage: userFriendlyMessage,
        timestamp: new Date().toISOString(),
        // Include additional debug info in development only
        ...(process.env.NODE_ENV === 'development' && {
          debugInfo: {
            errorType: error?.constructor?.name,
            errorCode: error?.code,
            errorStatus: error?.status,
          }
        })
      },
      { status: statusCode }
    );
  }
}