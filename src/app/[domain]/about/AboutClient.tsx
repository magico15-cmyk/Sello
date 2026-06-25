"use client";

import React from 'react';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Target, Heart } from 'lucide-react';

export default function AboutClient({ store }: { store: any }) {
  const primaryColor = store?.primary_color || '#f899a2';
  const guaranteeColor = store?.guarantee_color || '#1fb6ff';

  return (
    <>
      <div dir="ltr">
        <TopBar />
      </div>
      <div dir={store?.language === 'ar' || store?.store_rtl ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col bg-gray-50">
        <Header store={store} />

        <main className="flex-1 w-full max-w-[1000px] mx-auto px-5 py-12 md:py-20">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Hero Section */}
            <div 
              className="px-8 py-16 md:py-24 text-center text-white"
              style={{ backgroundColor: primaryColor }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
                We are dedicated to bringing you the highest quality products with an unmatched shopping experience.
              </p>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 space-y-16">
              
              {/* Our Story */}
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-4">
                  Founded with a simple mission: to make premium products accessible to everyone without compromising on quality or service. We realized that shopping online should be straightforward, reliable, and trustworthy.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Every product we offer is carefully curated and rigorously checked to ensure it meets our high standards. We believe in transparency and building long-lasting relationships with our customers.
                </p>
              </div>

              <hr className="border-gray-100" />

              {/* Core Values */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                    <Target size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To deliver exceptional value and quality directly to your doorstep, making your life easier and more enjoyable with every purchase.
                  </p>
                </div>

                <div className="text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                    <Heart size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Why Choose Us</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We prioritize your satisfaction above all else. From curated selections to lightning-fast support, we are here for you every step of the way.
                  </p>
                </div>

                <div className="text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                    <ShieldCheck size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Shop with Confidence</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your peace of mind is our priority. With our secure Cash on Delivery option, you inspect your items before you pay. Zero risk, 100% satisfaction.
                  </p>
                </div>
              </div>

              {/* Trust Statement */}
              <div className="bg-gray-50 rounded-2xl p-8 md:p-10 text-center border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">A Shopping Experience You Can Trust</h3>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  We know that ordering online requires trust. That's why we've built our entire business around reliability. Fast local shipping, responsive customer service, and a commitment to excellence are the cornerstones of our brand.
                </p>
              </div>

            </div>
          </div>
        </main>

        <Footer />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --primary-pink: ${primaryColor};
          --star-pink: ${primaryColor};
          --guarantee-color: ${guaranteeColor};
        }
        
        .wave-1 path { fill: ${primaryColor}; opacity: 0.4; }
        .wave-2 path { fill: ${primaryColor}; opacity: 1; }
        .wave-3 path { fill: ${primaryColor}; opacity: 0.7; }
      `}} />
    </>
  );
}
