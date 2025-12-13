'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CodeSnippetProps {
  title: string;
  language: string;
  code: string;
}

export default function CodeSnippet({ title, language, code }: CodeSnippetProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleCopy = () => {
    if (isHydrated && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isHydrated) {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-1/3 mb-3"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-muted border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="CodeBracketIcon" size={20} className="text-primary" />
          <span className="text-sm font-semibold text-card-foreground">{title}</span>
          <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 rounded transition-intelligent"
        >
          <Icon name={copied ? 'CheckIcon' : 'ClipboardDocumentIcon'} size={16} />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="p-4 bg-secondary/5 overflow-x-auto">
        <pre className="text-sm text-card-foreground font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}