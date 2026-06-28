"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function GlobalFooter({ store }: { store?: any }) {
  const pathname = usePathname();

  // Do not render the storefront footer on admin or login pages
  if (pathname?.includes('/admin') || pathname?.includes('/login')) {
    return null;
  }
  const primaryColor = store?.primary_color || '#111111';

  const isProductPage = pathname?.includes('/product/');
  const footerPaddingBottom = isProductPage ? '100px' : '0px';

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .wave-1 path { fill: ${primaryColor}; opacity: 0.4; }
        .wave-2 path { fill: ${primaryColor}; opacity: 1; }
        .wave-3 path { fill: ${primaryColor}; opacity: 0.7; }
        .site-footer { background-color: ${primaryColor}; padding-bottom: ${footerPaddingBottom}; }
      `}} />
      <Footer store={store} />
    </>
  );
}
