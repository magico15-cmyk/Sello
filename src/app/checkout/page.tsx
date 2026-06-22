"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const packages = [
  { id: 1, title: "1 Bottle", originalPrice: "$50.00", price: "$40.00", image: "https://fitabic.com/cdn/shop/files/Turmeric1_2e630cc6-d184-4d8e-ba6a-360e5a9539d9.png" },
  { id: 2, title: "2 Bottles", originalPrice: "$100.00", price: "$69.00", image: "https://fitabic.com/cdn/shop/files/Turmeric2_de38b4bd-baab-443b-8511-2eb2ce0d3596.png" },
  { id: 3, title: "Bundle", originalPrice: "$148.00", price: "$102.00", image: "https://fitabic.com/cdn/shop/files/Turmeric3_f812d3cd-75d5-455a-bd5b-b9d9360ccf02.png" }
];

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const packageId = parseInt(searchParams.get('package') || '2');
  
  const selectedPkg = packages.find(p => p.id === packageId) || packages[1];
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    city: '',
    address: ''
  });

  const [orderComplete, setOrderComplete] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally we would submit this data to a backend API here
    console.log("Order Submitted:", { package: selectedPkg, ...formData });
    setOrderComplete(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] flex flex-col items-center justify-center p-5">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-[#eaeaea] max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#f899a2] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-[#f899a2]" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you, <strong>{formData.fullName}</strong>. Your order for <strong>{selectedPkg.title}</strong> has been received and will be shipped to your address via Cash on Delivery.
          </p>
          <a href="/" className="inline-block bg-[#f899a2] text-white font-extrabold px-8 py-4 rounded-full text-lg shadow-sm hover:bg-[#f6808b] transition-colors">
            Return to Store
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] font-sans pb-20">
      {/* Minimal Header */}
      <header className="bg-white border-b border-[#eaeaea] w-full">
        <div className="w-full max-w-[1200px] mx-auto flex justify-center items-center py-4">
          <a href="/" className="logo cursor-pointer"><div className="logo-circle">Yu.</div></a>
        </div>
      </header>

      <main className="w-full max-w-[1200px] mx-auto px-5 lg:px-[20px] pt-8 lg:pt-12 flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
        
        {/* Left Column - Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-[20px] shadow-sm border border-[#eaeaea]">
            <h2 className="text-2xl font-extrabold mb-6 text-[#222]">Delivery Information</h2>
            
            <div className="bg-[#f899a2] bg-opacity-10 border border-[#f899a2] text-[#f899a2] px-4 py-3 rounded-xl mb-8 text-[15px] font-bold flex items-center gap-3">
              <Truck size={20} /> 
              <span>Cash On Delivery is selected. Pay when you receive your order.</span>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f899a2] focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f899a2] focus:border-transparent transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-2">City</label>
                <input 
                  type="text" 
                  id="city" 
                  name="city" 
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f899a2] focus:border-transparent transition-all"
                  placeholder="New York"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-bold text-gray-700 mb-2">Full Address</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f899a2] focus:border-transparent transition-all"
                  placeholder="123 Main St, Apt 4B"
                />
              </div>
            </div>

            <div className="mt-10">
              <button 
                type="submit"
                className="w-full bg-[#f899a2] hover:bg-[#f6808b] text-white font-extrabold rounded-[30px] text-[20px] py-4 transition-colors shadow-md flex items-center justify-center tracking-wide"
              >
                COMPLETE ORDER
              </button>
            </div>
            
            <div className="mt-5 flex items-center justify-center text-[#666] text-sm font-medium gap-2">
              <ShieldCheck size={18} className="text-green-500" />
              100% Secure & Encrypted Checkout
            </div>
          </form>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:w-[420px]">
          <div className="bg-white p-6 sm:p-8 rounded-[20px] shadow-sm border border-[#eaeaea] sticky top-6">
            <h2 className="text-xl font-extrabold mb-6 text-[#222]">Order Summary</h2>
            
            <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
              <div className="w-[80px] h-[80px] bg-gray-50 rounded-lg flex items-center justify-center p-2 border border-gray-100 flex-shrink-0">
                <Image 
                  src={selectedPkg.image} 
                  alt={selectedPkg.title} 
                  width={60} 
                  height={60} 
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#222] truncate text-base mb-1">Enhanced Bioactive Turmeric</h3>
                <p className="text-sm text-gray-500 font-medium">{selectedPkg.title}</p>
              </div>
              <div className="font-extrabold text-[#222] text-lg">
                {selectedPkg.price}
              </div>
            </div>

            <div className="py-5 space-y-3 border-b border-gray-100">
              <div className="flex justify-between items-center text-gray-600 font-medium">
                <span>Subtotal</span>
                <span>{selectedPkg.price}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600 font-medium">
                <span>Shipping</span>
                <span className="text-green-500 font-bold">FREE</span>
              </div>
            </div>

            <div className="pt-5 flex justify-between items-end">
              <div>
                <span className="block text-gray-500 text-sm font-bold mb-1">Total Due</span>
                <span className="text-2xl font-extrabold text-[#f899a2]">{selectedPkg.price}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pay On Delivery</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
