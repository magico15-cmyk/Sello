"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';

import { TopBar } from './TopBar';

export function GlobalHeader({ store }: { store?: any }) {
  const pathname = usePathname();

  // Do not render the storefront header on admin pages
  if (pathname?.includes('/admin')) {
    return null;
  }

  return (
    <>
      <TopBar />
      <Header store={store} />
    </>
  );
}
