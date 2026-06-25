"use client";

import React from 'react';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function CustomPageClient({ store, page }: { store: any, page: any }) {
  const primaryColor = store?.primary_color || '#f899a2';
  const guaranteeColor = store?.guarantee_color || '#1fb6ff';

  return (
    <>
      <div dir="ltr">
        <TopBar />
      </div>
      <div dir={store?.language === 'ar' || store?.store_rtl ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col">
        <Header store={store} />

        <main className="flex-1 bg-gray-50">
          <div className="w-full max-w-[800px] mx-auto px-5 py-12 md:py-20">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-6 border-b border-gray-100">
                {page.title}
              </h1>
              
              <div 
                className="prose prose-gray max-w-none text-gray-700 leading-relaxed custom-page-content"
                dangerouslySetInnerHTML={{ __html: page.content || '' }}
              />
            </div>
          </div>
        </main>

        <Footer store={store} />
      </div>

      {/* Dynamic Theme Styles — same as StoreClient */}
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --primary-pink: ${primaryColor};
          --star-pink: ${primaryColor};
          --guarantee-color: ${guaranteeColor};
        }
        
        .wave-1 path { fill: ${primaryColor}; opacity: 0.4; }
        .wave-2 path { fill: ${primaryColor}; opacity: 1; }
        .wave-3 path { fill: ${primaryColor}; opacity: 0.7; }

        .custom-page-content h1 { font-size: 2em; font-weight: bold; margin-top: 1em; margin-bottom: 0.5em; color: #111827; }
        .custom-page-content h2 { font-size: 1.5em; font-weight: bold; margin-top: 1em; margin-bottom: 0.5em; color: #1f2937; }
        .custom-page-content h3 { font-size: 1.25em; font-weight: bold; margin-top: 1em; margin-bottom: 0.5em; color: #374151; }
        .custom-page-content p, .custom-page-content div, .custom-page-content span, .custom-page-content li { font-size: 16px !important; line-height: 1.6 !important; }
        .custom-page-content p { margin-top: 0; margin-bottom: 1em; }
        .custom-page-content ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1em; }
        .custom-page-content ol { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 1em; }
        .custom-page-content a { color: ${primaryColor}; text-decoration: underline; }
        .custom-page-content strong { font-weight: 600; color: #111827; }
        .custom-page-content em { font-style: italic; }
        .custom-page-content blockquote { border-left: 4px solid #e5e7eb; padding-left: 1em; color: #6b7280; font-style: italic; }
      `}} />
    </>
  );
}
