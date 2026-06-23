"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Sidebar from './Sidebar';
import Header from './Header';

/* ──── Mobile Bottom Nav Icons ──── */
const MobileNavItems = [
  {
    label: 'Products',
    href: '/admin',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    iconFilled: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.375 3.75C2.339 3.75 1.5 4.589 1.5 5.625v1.5c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-1.5c0-1.036-.84-1.875-1.875-1.875H3.375z" />
        <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zM9.75 11.25a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: 'Orders',
    href: '/admin/orders',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
      </svg>
    ),
    iconFilled: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path d="M9 22V12h6v10" fill="white" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" transform="translate(-0.01, 0.01)" d="
          M 6 13.5
          V 3.75
          m 0 9.75
          a 1.5 1.5 0 0 1 0 3
          m 0 -3
          a 1.5 1.5 0 0 0 0 3
          m 0 3.75
          V 16.5
          m 12 -3
          V 3.75
          m 0 9.75
          a 1.5 1.5 0 0 1 0 3
          m 0 -3
          a 1.5 1.5 0 0 0 0 3
          m 0 3.75
          V 16.5
          m -6 -9
          V 3.75
          m 0 3.75
          a 1.5 1.5 0 0 1 0 3
          m 0 -3
          a 1.5 1.5 0 0 0 0 3
          m 0 9.75
          V 10.5" />
      </svg>
    ),
    iconFilled: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" transform="translate(-0.01, 0.01)" d="
          M 6 13.5
          V 3.75
          m 0 9.75
          a 1.5 1.5 0 0 1 0 3
          m 0 -3
          a 1.5 1.5 0 0 0 0 3
          m 0 3.75
          V 16.5
          m 12 -3
          V 3.75
          m 0 9.75
          a 1.5 1.5 0 0 1 0 3
          m 0 -3
          a 1.5 1.5 0 0 0 0 3
          m 0 3.75
          V 16.5
          m -6 -9
          V 3.75
          m 0 3.75
          a 1.5 1.5 0 0 1 0 3
          m 0 -3
          a 1.5 1.5 0 0 0 0 3
          m 0 9.75
          V 10.5" />
      </svg>
    ),
  },
  {
    label: 'More',
    href: '#more',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </svg>
    ),
    iconFilled: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
      </svg>
    ),
  },
];

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href === '/admin' && pathname === '/admin');

  const handleMoreClick = () => {
    setIsMobileMenuOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafafc] m-0 p-0 text-gray-900">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] md:hidden transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
          onTouchEnd={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }}
          style={{ touchAction: 'manipulation' }}
        />
      )}

      {/* Sidebar - Drawer on mobile, static on desktop */}
      <div className={`
        fixed inset-y-0 left-0 z-[80] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:z-[61] overflow-visible
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto custom-scroll relative flex flex-col">
        {/* Header - only spans the content area */}
        <div className="sticky top-0 z-[60]">
          <Header
            onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
        <div className="p-3 sm:p-4 lg:p-6 flex-1 relative pb-20 md:pb-6">
          {children}
        </div>
      </main>

      {/* ──── Mobile Bottom Navigation Bar ──── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 safe-area-bottom">
        <div className="flex items-center justify-around px-2 h-16">
          {MobileNavItems.map((item) => {
            const active = item.href === '#more' ? false : isActive(item.href);
            const isMore = item.href === '#more';

            return isMore ? (
              <button
                key={item.label}
                onClick={handleMoreClick}
                onTouchEnd={(e) => { e.preventDefault(); handleMoreClick(); }}
                className="flex flex-col items-center justify-center gap-0.5 w-16 py-1 transition-colors text-gray-400 cursor-pointer"
                style={{ touchAction: 'manipulation' }}
              >
                {item.icon}
                <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
              </button>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 w-16 py-1 transition-colors relative ${
                  active ? 'text-[#f899a2]' : 'text-gray-400'
                }`}
              >
                {active && (
                  <span className="absolute -top-0 left-1/2 -translate-x-1/2 w-5 h-[3px] rounded-full bg-[#f899a2]" />
                )}
                {active ? item.iconFilled : item.icon}
                <span className={`text-[10px] font-medium mt-0.5 ${active ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
