'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '@/components/ui/AppIcon';

export default function PerformanceMetrics() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<'accuracy' | 'performance'>('accuracy');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const accuracyData = [
    { name: 'NLP Solutions', accuracy: 96, benchmark: 92 },
    { name: 'Computer Vision', accuracy: 94, benchmark: 89 },
    { name: 'Predictive Analytics', accuracy: 91, benchmark: 85 },
    { name: 'Automation', accuracy: 98, benchmark: 95 },
    { name: 'Recommendations', accuracy: 93, benchmark: 88 },
  ];

  const performanceData = [
    { month: 'Jan', requests: 45000, responseTime: 120 },
    { month: 'Feb', requests: 52000, responseTime: 115 },
    { month: 'Mar', requests: 61000, responseTime: 110 },
    { month: 'Apr', requests: 68000, responseTime: 105 },
    { month: 'May', requests: 75000, responseTime: 100 },
    { month: 'Jun', requests: 82000, responseTime: 95 },
  ];

  if (!isHydrated) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="ChartBarIcon" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Live Performance Metrics</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('accuracy')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-intelligent ${
              activeTab === 'accuracy' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Accuracy
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-intelligent ${
              activeTab === 'performance'
                ? 'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Performance
          </button>
        </div>
      </div>

      {activeTab === 'accuracy' && (
        <div className="w-full h-80" aria-label="AI Solution Accuracy Comparison Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="accuracy" fill="#1E40AF" name="Our Accuracy (%)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="benchmark" fill="#06B6D4" name="Industry Benchmark (%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="w-full h-80" aria-label="Monthly Performance Trends Line Chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fill: '#6B7280', fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6B7280', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="requests"
                stroke="#1E40AF"
                strokeWidth={2}
                name="API Requests"
                dot={{ fill: '#1E40AF', r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="responseTime"
                stroke="#10B981"
                strokeWidth={2}
                name="Response Time (ms)"
                dot={{ fill: '#10B981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">99.9%</p>
          <p className="text-xs text-muted-foreground mt-1">Uptime</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">95ms</p>
          <p className="text-xs text-muted-foreground mt-1">Avg Response</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">82K</p>
          <p className="text-xs text-muted-foreground mt-1">Daily Requests</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">4.8/5</p>
          <p className="text-xs text-muted-foreground mt-1">User Rating</p>
        </div>
      </div>
    </div>
  );
}