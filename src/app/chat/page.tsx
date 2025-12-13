'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '../../lib/supabase/client';
import Header from '@/components/common/Header';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      initializeSession();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeSession = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert({
          user_id: user?.id,
          title: `Chat Session - ${new Date().toLocaleDateString()}`,
          session_status: 'active',
        })
        .select()
        .single();

      if (error) throw error;
      setSessionId(data?.id);

      // Welcome message
      setMessages([
        {
          role: 'assistant',
          content: "Hi! I'm here to listen and support you. How are you feeling today?",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error initializing session:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!input?.trim() || loading || !sessionId) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userMessageContent = input;
    setInput('');
    setLoading(true);

    try {
      // Save user message to database
      const { error: dbError } = await supabase.from('chat_messages').insert({
        session_id: sessionId,
        user_id: user?.id,
        message_content: userMessageContent,
        is_bot_response: false,
      });

      if (dbError) {
        console.error('Database error saving user message:', dbError);
      }

      // Call OpenAI API through our API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessageContent, 
          sessionId 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle different error types with appropriate messages
        const errorMessage = data?.userMessage || data?.message || 'Failed to get response';
        throw new Error(errorMessage);
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data?.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Save assistant message to database
      const { error: aiDbError } = await supabase.from('chat_messages').insert({
        session_id: sessionId,
        user_id: user?.id,
        message_content: data?.message,
        is_bot_response: true,
      });

      if (aiDbError) {
        console.error('Database error saving AI message:', aiDbError);
      }

    } catch (error: any) {
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('❌ CHAT ERROR');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('Error:', error);
      console.error('Message:', error?.message);
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      // Display user-friendly error message
      let errorContent = "I'm having trouble connecting right now. Please try again in a moment.";
      
      if (error?.message) {
        // Use the error message from API which is already user-friendly
        errorContent = error.message;
      }
      
      // Add specific guidance based on error type
      if (error?.message?.includes('not configured')) {
        errorContent += '\n\n💡 Tip: If you\'re the administrator, make sure the OpenAI API key is configured in your deployment settings.';
      } else if (error?.message?.includes('quota') || error?.message?.includes('unavailable')) {
        errorContent += '\n\n💡 Tip: You can try again in a few minutes or contact support if the issue persists.';
      }
      
      const errorMessage: Message = {
        role: 'assistant',
        content: errorContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 pt-20 pb-6 px-4 flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">
          <div className="bg-white rounded-xl shadow-lg mb-4 p-4">
            <h1 className="text-2xl font-bold text-gray-900">Mental Health Support Chat</h1>
            <p className="text-gray-600">Confidential support available 24/7</p>
          </div>

          <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages?.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message?.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      message?.role === 'user' ?'bg-indigo-600 text-white' :'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message?.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message?.role === 'user' ? 'text-indigo-200' : 'text-gray-500'
                      }`}
                    >
                      {message?.timestamp?.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={loading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading || !input?.trim()}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Send
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                🔒 This conversation is confidential and secure
              </p>
            </div>
          </div>

          <div className="mt-4 bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
            <p className="text-sm text-red-900">
              <strong>Crisis Support:</strong> If you're in immediate danger, call 988 (National
              Crisis Hotline) or text HOME to 741741
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}