// src/app/page.js
'use client';

import { useState } from 'react';
import { SeoForm } from '@/components/forms/seo-form';
import { ContentDisplay } from '@/components/results/content-display';
import './globals.css';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate content');
      }

      setResult(data.content);
    } catch (err) {
      setError(err.message || 'Failed to generate content');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <SeoForm onSubmit={handleSubmit} isLoading={loading} />
        
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}
        
        {result && <ContentDisplay content={result} />}
      </div>
    </main>
  );
}