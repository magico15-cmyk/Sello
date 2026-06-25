import React from 'react';
import { Menu, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export const Header = ({ store }: { store?: any }) => {
  const mainMenu = store?.menus?.find((m: any) => m.slug === 'main-menu');

  return (
    <header className="header relative grid grid-cols-3 items-center">
      <div className="flex items-center justify-start gap-6">
        <button className="menu-btn md:hidden" aria-label="Menu">
          <Menu size={26} />
        </button>
        <nav className="hidden md:flex items-center gap-8 font-semibold text-[13px] tracking-[0.1em] uppercase text-gray-600">
          {mainMenu ? (
            mainMenu.items.map((item: any, i: number) => (
              <Link key={i} href={item.url} className="group relative py-1 hover:text-[var(--primary-pink)] transition-colors duration-200">
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--primary-pink)] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </Link>
            ))
          ) : (
            <>
              <Link href="/" className="group relative py-1 hover:text-[var(--primary-pink)] transition-colors duration-200">
                Home
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--primary-pink)] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </Link>
              <Link href="/pages/about-us" className="group relative py-1 hover:text-[var(--primary-pink)] transition-colors duration-200">
                About Us
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--primary-pink)] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </Link>
              <Link href="/pages/shipping" className="group relative py-1 hover:text-[var(--primary-pink)] transition-colors duration-200">
                Shipping
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--primary-pink)] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </Link>
              <Link href="/pages/faq" className="group relative py-1 hover:text-[var(--primary-pink)] transition-colors duration-200">
                FAQ
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--primary-pink)] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </Link>
            </>
          )}
        </nav>
      </div>

      <div className="flex justify-center">
        <Link href={store?.domain ? `/${store.domain}` : '/'} className="logo">
          {store?.logo_url ? (
            <img src={store.logo_url} alt={store?.store_name || "Store Logo"} className="max-h-8 w-auto max-w-[220px] object-contain" />
          ) : (
            <div className="logo-circle">Yu.</div>
          )}
        </Link>
      </div>

      <div className="flex items-center justify-end">
        <button className="cart-btn" aria-label="Cart" style={{ position: 'relative' }}>
          <ShoppingBag size={26} />
        </button>
      </div>
    </header>
  );
};
