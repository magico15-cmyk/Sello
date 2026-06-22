"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { X, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const packages = [
  { id: 1, title: "1 Bottle", originalPrice: "$50.00", price: "$45.00", image: "/assets/bottle.png" },
  { id: 2, title: "2 Bottles", originalPrice: "$100.00", price: "$79.00", image: "/assets/bundle.png" },
  { id: 3, title: "Bundle", originalPrice: "$150.00", price: "$106.00", image: "/assets/bundle.png" }
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
    console.log("Order Submitted:", { package: selectedPkg, ...formData });
    setOrderComplete(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#e8f0ed] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#42a02b] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-[#42a02b]" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you, <strong>{formData.fullName}</strong>. Your order for <strong>{selectedPkg.title}</strong> has been received and will be shipped to your address via Cash on Delivery.
          </p>
          <a href="/" className="inline-block bg-[#42a02b] text-white font-bold px-8 py-4 rounded-lg text-lg shadow-sm hover:bg-[#388924] transition-colors w-full">
            Return to Store
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8f0ed] font-sans py-10 px-4 flex justify-center items-start">
      <div className="bg-white w-full max-w-[480px] rounded-xl shadow-2xl overflow-hidden relative border border-gray-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900 tracking-wide">CASH ON DELIVERY</h1>
          <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </Link>
        </div>

        {/* Product Row */}
        <div className="px-5 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-[65px] h-[65px] bg-white rounded-md border border-gray-200 flex items-center justify-center overflow-hidden p-1 shadow-sm">
                <img 
                  src={selectedPkg.image} 
                  alt={selectedPkg.title} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-gray-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                1
              </div>
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-[15px] mb-0.5 underline decoration-gray-300 underline-offset-2">Enhanced Bioactive Turmeric</h2>
              <p className="text-[13px] text-gray-500">{selectedPkg.title}</p>
            </div>
          </div>
          <div className="font-extrabold text-gray-900 text-[15px]">
            {selectedPkg.price}
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="px-5 pb-5">
          <div className="bg-[#f5f5f5] rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center text-[14px] text-gray-600 font-medium">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">{selectedPkg.price}</span>
            </div>
            <div className="flex justify-between items-center text-[14px] text-gray-600 font-medium">
              <span>Shipping</span>
              <span className="font-bold text-gray-900">Free</span>
            </div>
            <div className="border-t border-gray-300 my-2 pt-2 flex justify-between items-center">
              <span className="font-extrabold text-gray-900 text-[16px]">Total</span>
              <span className="font-extrabold text-gray-900 text-[16px]">{selectedPkg.price}</span>
            </div>
          </div>
        </div>

        {/* Shipping Form */}
        <div className="px-5 pt-2 pb-6 border-t border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-[19px] font-bold text-gray-900 mb-1">Enter your shipping address</h2>
            <p className="text-[13px] text-gray-500 max-w-[300px] mx-auto leading-relaxed">
              You will be contacted by one of our operators to confirm your order before shipping.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-[13px] font-bold text-gray-900 mb-1.5">
                Full name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-[15px] text-gray-900 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors bg-white shadow-sm"
                placeholder="Example: John Smith"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-[13px] font-bold text-gray-900 mb-1.5">
                Phone number <span className="text-red-500">*</span>
              </label>
              <input 
                type="tel" 
                id="phoneNumber" 
                name="phoneNumber" 
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-[15px] text-gray-900 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors bg-white shadow-sm"
                placeholder="Phone number for delivery"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-[13px] font-bold text-gray-900 mb-1.5">
                City <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="city" 
                name="city" 
                required
                value={formData.city}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-[15px] text-gray-900 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors bg-white shadow-sm"
                placeholder="Example: New York"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-[13px] font-bold text-gray-900 mb-1.5">
                Address (Road, House number) <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="address" 
                name="address" 
                required
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-[15px] text-gray-900 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors bg-white shadow-sm"
                placeholder="Example: Minx Road 505 c/b"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="w-full bg-[#42a02b] hover:bg-[#388924] text-white font-bold rounded-md text-[17px] py-4 transition-colors shadow-sm flex items-center justify-center tracking-wide"
              >
                COMPLETE ORDER - {selectedPkg.price}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
