"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/* ──────── Icon Components ──────── */
const ProductsIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);

const OrdersIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
);

const LogoutIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
  </svg>
);

/* ──────── Nav Item Interface ──────── */
interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

/* ──────── Component ──────── */
export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mainNav: NavItem[] = [
    { label: "Products", href: "/admin", icon: <ProductsIcon /> },
    { label: "Orders", href: "/admin/orders", icon: <OrdersIcon /> },
  ];

  const bottomNav: NavItem[] = [
    { label: "Settings", href: "/admin/settings", icon: <SettingsIcon /> },
  ];

  const isActive = (href: string) => pathname === href || (href === "/admin" && pathname === "/admin");

  return (
    <>
    <aside className="flex shrink-0 h-full overflow-visible">
      {/* ──── Left Icon Strip (always visible) ──── */}
      <div className="w-[72px] bg-white border-r border-gray-100 flex flex-col items-center py-4 gap-2 shrink-0 relative z-[1] overflow-visible">
        {/* Logo at top */}
        <div className="w-9 h-9 rounded-xl bg-[#f899a2] flex items-center justify-center mb-4 shadow-sm">
          <svg className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        {/* Workspace avatars */}
        <div className="flex flex-col items-center gap-2 w-full">
            <div className="workspace-item active">
            <div className="ws-icon-w">
                S
            </div>
            </div>
        </div>

        <div className="flex-1" />
      </div>

      {/* ──── Right Navigation Panel (expands/collapses) ──── */}
      <div className={`bg-[#fdf0f1] border-r border-[#f899a2]/20 flex flex-col transition-all duration-300 ease-in-out h-full relative overflow-visible ${isExpanded ? 'w-[240px]' : 'w-[68px]'}`}>

        {/* Collapse/Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-[11px] top-[23px] w-[22px] h-[22px] rounded-full bg-white border border-gray-200 hidden md:flex items-center justify-center text-gray-500 hover:text-[#f899a2] transition-all z-[100]"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        >
          <svg className={`w-[11px] h-[11px] ${isExpanded ? 'mr-[1px]' : 'ml-[1px]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={isExpanded ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
          </svg>
        </button>

        {/* Header area */}
        {isExpanded ? (
          <div className="pl-4 pr-3 pt-5 pb-3">
            <div className="flex items-center gap-2 bg-white/70 rounded-full px-3 py-2">
              <svg className="w-[11px] h-[11px] text-[#f899a2] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-[10.5px] font-bold text-gray-900 tracking-wide uppercase truncate">
                SELLO STORE
              </span>
            </div>
            {onClose && (
              <button onClick={onClose} className="md:hidden absolute top-3 right-3 w-5 h-5 rounded flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center pt-4 pb-2">
               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                 <span className="text-[#f899a2] font-bold text-[16px] leading-none">
                   S
                 </span>
               </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto custom-scroll pt-2">
          {/* Isolated Menu Card */}
          <div className={`menu-card ${isExpanded ? 'p-2 mx-3 rounded-2xl' : 'py-2 px-[10px] mx-2 !rounded-[24px]'} mb-4`}>
            <div className={`${isExpanded ? 'space-y-1' : 'space-y-0.5'}`}>
              {mainNav.map((item) => {
                const active = isActive(item.href);
                return isExpanded ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`w-full flex items-center gap-3 px-3 py-[9px] rounded-lg text-[13.5px] font-medium transition-all duration-100
                      ${active
                        ? "bg-[#f899a2] text-white"
                        : "text-gray-700 hover:bg-[#f899a2]/10 hover:text-gray-800"
                      }`}
                  >
                    <span className={`shrink-0 ${active ? "text-white" : "text-gray-500"}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`w-full flex items-center justify-center transition-all duration-100`}
                    title={item.label}
                  >
                    <span className={`w-[34px] h-[34px] rounded-full flex items-center justify-center transition-all duration-100
                      ${active
                        ? "bg-[#f899a2] text-white"
                        : "text-gray-600 hover:bg-white hover:text-[#f899a2] hover:shadow-sm"
                      }`}
                    >
                      {item.icon}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className={`${isExpanded ? 'space-y-1' : 'space-y-0.5'} pb-2 ${isExpanded ? 'px-3' : 'px-[10px]'}`}>
            {bottomNav.map((item) => {
              const active = isActive(item.href);
              return isExpanded ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-3 py-[9px] rounded-lg text-[13.5px] font-medium transition-all duration-100
                    ${active
                      ? "bg-white text-[#f899a2]"
                      : "text-gray-600 hover:bg-white hover:text-[#f899a2]"
                    }`}
                >
                  <span className={`shrink-0 ${active ? "text-[#f899a2]" : "text-gray-500"}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="w-full flex items-center justify-center transition-all duration-100"
                  title={item.label}
                >
                  <span className={`w-[34px] h-[34px] rounded-full flex items-center justify-center transition-all duration-100
                    ${active
                      ? "bg-white text-[#f899a2] shadow-sm"
                      : "text-gray-600 hover:bg-white hover:text-[#f899a2] hover:shadow-sm"
                    }`}
                  >
                    {item.icon}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {isExpanded ? (
          <div className="px-3 pb-3 mt-auto">
            <button
              className="w-full flex items-center gap-3 px-3 py-[9px] rounded-lg text-[13.5px] font-medium text-gray-500 hover:bg-white hover:text-red-600 transition-all duration-100 mt-1 group"
              onClick={() => router.push('/')}
            >
              <span className="shrink-0 text-gray-400 group-hover:text-red-500 transition-colors">
                <LogoutIcon />
              </span>
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center pb-3 mt-auto gap-2">
            <button
              className="w-[34px] h-[34px] flex items-center justify-center rounded-full text-gray-400 hover:bg-white hover:text-red-600 transition-all duration-100 group"
              title="Logout"
              onClick={() => router.push('/')}
            >
              <LogoutIcon />
            </button>
          </div>
        )}
      </div>
    </aside>
    </>
  );
}
