"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  UserIcon, 
  Cog6ToothIcon
} from "@heroicons/react/24/outline";

const settingsNav = [
  { name: "Account", href: "/admin/settings/account", icon: UserIcon },
  { name: "Tracking Pixels", href: "/admin/settings/pixels", icon: Cog6ToothIcon },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  
  const currentTab = settingsNav.find(item => pathname.includes(item.href))?.name || "Account";

  return (
    <div className="flex-1 bg-gray-50 min-h-full">
      <div className="w-full mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{currentTab} settings</h1>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <nav className="flex flex-col py-2">
              {settingsNav.map((item) => {
                const isActive = pathname.includes(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                      isActive 
                        ? "border-brand-500 text-brand-500 bg-brand-50/50" 
                        : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 w-full bg-white rounded-xl shadow-sm border border-gray-100 min-h-[500px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
