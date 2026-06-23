"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PremiumNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Orders', href: '/admin/orders' },
    { name: 'Analytics', href: '/admin/analytics' },
    { name: 'Settings', href: '/admin/settings' },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl glass-nav rounded-2xl z-[100] px-6 py-4 flex items-center justify-between transition-all duration-300">
      {/* Logo & Brand */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-sello flex items-center justify-center shadow-lg shadow-pink-500/30 animate-pulse-glow">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-xl font-extrabold tracking-tight text-gray-900 hidden sm:block">
          Sello<span className="text-gradient">Store</span>
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`px-5 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-300 relative group
                ${isActive ? 'text-[#f899a2]' : 'text-gray-600 hover:text-gray-900'}
              `}
            >
              {isActive && (
                <span className="absolute inset-0 bg-[#f899a2]/10 rounded-xl -z-10 animate-fade-in-up" />
              )}
              {link.name}
              <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#f899a2] transition-all duration-300
                ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-50'}
              `} />
            </Link>
          );
        })}
      </div>

      {/* User & Actions */}
      <div className="flex items-center gap-4">
        <a href="/" className="text-[13px] font-semibold text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">
          Storefront
        </a>
        <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#f899a2]/50 transition-all">
          <img src="https://ui-avatars.com/api/?name=Sello+Admin&background=f899a2&color=fff&bold=true" alt="Admin" className="w-full h-full object-cover" />
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        >
          <span className={`w-5 h-0.5 bg-gray-600 rounded-full transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-gray-600 rounded-full transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-gray-600 rounded-full transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-[calc(100%+10px)] left-0 w-full glass-panel rounded-2xl p-4 flex flex-col gap-2 md:hidden shadow-xl animate-fade-in-up">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`p-3 rounded-xl text-[15px] font-semibold transition-all ${
                pathname === link.href ? 'bg-[#f899a2]/10 text-[#f899a2]' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px w-full bg-gray-100 my-2" />
          <a href="/" className="p-3 text-[15px] font-semibold text-gray-600 text-center">View Storefront</a>
        </div>
      )}
    </nav>
  );
}
