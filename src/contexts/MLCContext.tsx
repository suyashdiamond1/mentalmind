'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { CreateMLCEngine, MLCEngine } from '@mlc-ai/web-llm';

interface MLCContextType {
  engine: MLCEngine | null;
  isInitializing: boolean;
  loadingProgress: string;
  initLocalAI: () => Promise<void>;
}

const MLCContext = createContext<MLCContextType | undefined>(undefined);

export function MLCProvider({ children }: { children: ReactNode }) {
  const [engine, setEngine] = useState<MLCEngine | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState<string>('');

  const initLocalAI = async () => {
    if (engine || isInitializing) return;
    
    setIsInitializing(true);
    setLoadingProgress('Initializing WebGPU engine...');
    
    try {
      const initProgressCallback = (progress: any) => {
        setLoadingProgress(progress.text);
      };

      // Using WebLLM's officially supported Llama 3.2 1B model.
      const selectedModel = 'Llama-3.2-1B-Instruct-q4f16_1-MLC';
      
      const newEngine = await CreateMLCEngine(
        selectedModel,
        { initProgressCallback }
      );
      
      setEngine(newEngine);
      setLoadingProgress('');
    } catch (err: any) {
      console.error('Failed to init WebLLM:', err);
      setLoadingProgress(`Error: ${err.message || 'Browser might not support WebGPU.'}`);
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <MLCContext.Provider value={{ engine, isInitializing, loadingProgress, initLocalAI }}>
      {children}
    </MLCContext.Provider>
  );
}

export function useMLC() {
  const context = useContext(MLCContext);
  if (context === undefined) {
    throw new Error('useMLC must be used within an MLCProvider');
  }
  return context;
}
