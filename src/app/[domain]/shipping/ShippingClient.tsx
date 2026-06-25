"use client";

import React from 'react';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Truck, Clock, HandCoins, CheckCircle } from 'lucide-react';

export default function ShippingClient({ store }: { store: any }) {
  const primaryColor = store?.primary_color || '#f899a2';
  const guaranteeColor = store?.guarantee_color || '#1fb6ff';

  return (
    <>
      <div dir="ltr">
        <TopBar />
      </div>
      <div dir={store?.language === 'ar' || store?.store_rtl ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col bg-gray-50">
        <Header store={store} />

        <main className="flex-1 w-full max-w-[900px] mx-auto px-5 py-12 md:py-20">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            
            <div className="border-b border-gray-100 px-8 py-10 md:p-12 text-center">
              <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Truck size={40} color={primaryColor} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shipping & Delivery</h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Fast, reliable delivery directly to your door. Inspect your order before you pay.
              </p>
            </div>

            <div className="p-8 md:p-12 space-y-12">
              
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 text-gray-900 border border-gray-100 shadow-sm">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Processing & Dispatch</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We know you're excited to receive your order. Once your order is confirmed, our team immediately begins processing it. Orders are typically dispatched within hours, ensuring the fastest possible delivery to your location.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 text-gray-900 border border-gray-100 shadow-sm">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">24 to 48 Hours Local Delivery</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We partner with the best local delivery services to ensure your package arrives quickly and safely. For most local areas, you can expect your order to be delivered within <strong>24 to 48 hours</strong>.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 text-gray-900 border border-gray-100 shadow-sm">
                  <HandCoins size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Cash on Delivery (COD)</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Your trust is our top priority. We operate strictly on a <strong>Cash on Delivery (COD)</strong> basis. This means you do not need to pay anything online.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-600">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>No upfront payments</strong> required.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-600">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Inspect before you pay.</strong> You have the right to check your product at the door.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-600">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Pay the courier in cash</strong> only when you are 100% satisfied.</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="bg-gray-50 p-8 text-center border-t border-gray-100">
              <p className="text-gray-600 font-medium">
                Need help with your delivery? Contact our support team and we'll assist you immediately.
              </p>
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
