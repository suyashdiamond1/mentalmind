'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '../../lib/supabase/client';
import Header from '@/components/common/Header';
import { useMLC } from '@/contexts/MLCContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are MentalMind, an empathetic, non-judgmental, and highly supportive AI mental health companion. 
Your goal is to listen actively, validate feelings, and provide thoughtful, grounded advice when appropriate. 
Keep your responses concise, warm, and conversational. Do not prescribe medication or provide professional medical diagnoses. 
If someone expresses extreme distress, gently encourage them to reach out to professional help or crisis lines.`;

function ChatContent() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSessionId = searchParams.get('session_id');
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [chatMode, setChatMode] = useState<'local' | 'server'>('server');
  
  // AI State from Context
  const { engine, isInitializing, loadingProgress, initLocalAI } = useMLC();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      if (urlSessionId && sessionId !== urlSessionId) {
        loadExistingSession(urlSessionId);
      } else if (!urlSessionId && !sessionId) {
        initializeSession();
      }
    }
  }, [user, sessionId, urlSessionId]);

  // Watch for the engine loading from the global context
  useEffect(() => {
    if (engine && messages.length > 0 && messages[messages.length - 1].content !== "I'm ready! The AI model is now fully loaded in your browser. How are you feeling today?" && chatMode === 'local') {
      // Optional: Add a subtle indicator that engine is ready
    }
  }, [engine]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loadingProgress]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
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
          content: "Hi! I'm your AI companion. I can run entirely in your browser for 100% privacy, or via our secure cloud servers. How are you feeling today?",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error initializing session:', error);
    }
  };

  const loadExistingSession = async (id: string) => {
    try {
      setSessionId(id);
      const { data: msgs, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (msgs && msgs.length > 0) {
        const formattedMessages: Message[] = msgs.map((m: any) => ({
          role: m.is_bot_response ? 'assistant' : 'user',
          content: m.message_content,
          timestamp: new Date(m.created_at)
        }));
        setMessages(formattedMessages);
      } else {
        setMessages([
          {
            role: 'assistant',
            content: "Welcome back! How can I help you today?",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error('Error loading existing session:', error);
    }
  };



  const handleSendMessage = async () => {
    if (!input?.trim() || isGenerating || !sessionId) return;
    if (chatMode === 'local' && !engine) return;

    const userMessageContent = input;
    const userMessage: Message = {
      role: 'user',
      content: userMessageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    try {
      // Save user message to database
      supabase.from('chat_messages').insert({
        session_id: sessionId,
        user_id: user?.id,
        message_content: userMessageContent,
        is_bot_response: false,
      }).then(({error}) => {
        if (error) {
          console.error('Database error saving user message:', error);
          alert('Failed to save message to database: ' + error.message);
        }
      });

      let aiResponseContent = '';

      if (chatMode === 'local') {
        // Format history for WebLLM
        const chatHistory = messages.filter(m => m.content !== "Hi! I'm your AI companion. I can run entirely in your browser for 100% privacy, or via our secure cloud servers. How are you feeling today?" && m.content !== "Welcome back! How can I help you today?").map(m => ({
          role: m.role,
          content: m.content
        }));

        // Generate response locally via WebGPU!
        const reply = await engine!.chat.completions.create({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...chatHistory,
            { role: 'user', content: userMessageContent }
          ]
        });
        aiResponseContent = reply.choices[0].message.content || 'Sorry, I failed to generate a response.';
      } else {
        // Generate response via Server API
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessageContent, sessionId })
        });
        
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.userMessage || data.message || 'Server error occurred');
        }
        
        aiResponseContent = data.message;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: aiResponseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Save assistant message to database
      supabase.from('chat_messages').insert({
        session_id: sessionId,
        user_id: user?.id,
        message_content: aiResponseContent,
        is_bot_response: true,
      }).then(({error}) => {
        if (error) {
          console.error('Database error saving AI message:', error);
          alert('Failed to save AI message to database: ' + error.message);
        }
      });

    } catch (error: any) {
      console.error('Local Inference Error:', error);
      
      const errorMessage: Message = {
        role: 'assistant',
        content: `Inference failed: ${error.message || 'Unknown error occurred.'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-stone-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      <div className="flex-1 pt-24 pb-6 px-4 flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">
          <div className="bg-white border border-stone-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] mb-6 p-6 text-center relative overflow-hidden flex flex-col items-center">
            <div className="flex justify-center md:absolute md:top-0 md:right-0 p-0 md:p-4 mb-4 md:mb-0 w-full md:w-auto">
              {chatMode === 'local' ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 transition-colors">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                  WebGPU Local AI
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 transition-colors">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                  Cloud Server AI
                </span>
              )}
            </div>
            
            <h1 className="text-2xl font-semibold text-stone-800 flex items-center justify-center gap-2">
              <span className="text-xl">🌿</span> Mental Health Support Chat
            </h1>
            <p className="text-stone-500 mt-1 mb-6">
              {chatMode === 'local' ? '100% Private • Processed Locally on Your Device' : 'Standard Speed • Cloud Processed'}
            </p>
            
            <div className="flex justify-center">
              <div className="bg-stone-100 p-1 rounded-full border border-stone-200 shadow-inner flex overflow-hidden">
                <button
                  onClick={() => setChatMode('server')}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${chatMode === 'server' ? 'bg-white text-stone-800 shadow-sm border border-stone-200/50' : 'text-stone-500 hover:text-stone-700'}`}
                >
                  Server AI
                </button>
                <button
                  onClick={() => setChatMode('local')}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${chatMode === 'local' ? 'bg-emerald-700 text-white shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                >
                  Offline AI (Secure)
                </button>
              </div>
            </div>
          </div>

          <div className="w-full bg-white border border-stone-100 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col h-[60vh] md:h-[75vh] min-h-[350px] md:min-h-[650px]">
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages?.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message?.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] px-4 sm:px-5 py-3 sm:py-4 text-[14px] sm:text-[15px] leading-relaxed shadow-sm ${
                      message?.role === 'user' 
                        ? 'bg-stone-100 text-stone-800 rounded-2xl rounded-tr-sm border border-stone-200' 
                        : 'bg-emerald-50 text-emerald-900 rounded-2xl rounded-tl-sm border border-emerald-100/50'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message?.content}</p>
                    <p
                      className={`text-[10px] sm:text-[11px] mt-1 sm:mt-2 font-medium ${
                        message?.role === 'user' ? 'text-stone-400 text-right' : 'text-emerald-600/70'
                      }`}
                    >
                      {message?.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Init Progress Indicator */}
              {loadingProgress && (
                <div className="flex justify-start mb-2">
                   <div className="max-w-[85%] px-4 py-3 bg-stone-50 text-stone-600 rounded-2xl border border-stone-100 flex flex-col gap-2 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-600 border-t-transparent"></div>
                        <span className="text-sm font-medium">Downloading AI Model...</span>
                      </div>
                      <p className="text-xs font-mono bg-white p-2 rounded border border-stone-200 overflow-hidden break-all">{loadingProgress}</p>
                      <p className="text-[10px] text-stone-400">This happens only once. The model is cached in your browser.</p>
                   </div>
                </div>
              )}

              {/* Generating Indicator */}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-emerald-50 rounded-2xl rounded-tl-sm border border-emerald-100/50 p-4 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-stone-50 border-t border-stone-100 p-3 sm:p-6">
              {chatMode === 'local' && !engine ? (
                <button
                  onClick={initLocalAI}
                  disabled={isInitializing}
                  className="w-full py-3 sm:py-4 bg-emerald-700 text-white rounded-2xl hover:bg-emerald-800 disabled:bg-stone-300 transition-colors font-medium shadow-sm flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isInitializing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                      Initializing Privacy-First AI...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      Load Local AI Engine (100% Private)
                    </>
                  )}
                </button>
              ) : (
                <div className="flex gap-2 sm:gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="flex-1 min-w-0 w-full px-4 sm:px-5 py-3 sm:py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors shadow-sm text-stone-700 text-sm sm:text-base"
                    disabled={isGenerating}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isGenerating || !input?.trim()}
                    className="px-4 sm:px-8 py-3 sm:py-4 bg-emerald-700 text-white rounded-2xl hover:bg-emerald-800 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed transition-colors font-medium shadow-sm flex items-center justify-center gap-2 shrink-0"
                  >
                    <span className="hidden sm:inline">Send</span>
                    <svg className="w-5 h-5 block sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    <svg className="w-4 h-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </button>
                </div>
              )}
              <p className="text-[11px] font-medium text-stone-400 mt-3 flex items-center justify-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                {chatMode === 'local' 
                  ? 'This conversation is processed entirely on your device.' 
                  : 'This conversation is processed securely via standard API.'}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-white border border-red-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-3xl p-6">
            <p className="text-sm text-stone-600 font-medium flex items-center gap-3">
              <span className="text-xl">🚨</span> 
              <span><strong className="text-red-800">Crisis Support:</strong> If you're in immediate danger, call 988 (National Crisis Hotline) or text HOME to 741741</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}