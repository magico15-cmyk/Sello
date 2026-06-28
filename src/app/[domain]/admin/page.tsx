"use client";
import { useState, useEffect } from "react";
import { CubeIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [storeName, setStoreName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem('sello_store_name');
    if (savedName) {
      setStoreName(savedName);
    }
  }, []);

  const orderStats = [
    { label: "Today", value: "0" },
    { label: "Yesterday", value: "0" },
    { label: "This week", value: "0" },
    { label: "This month", value: "0" },
    { label: "This year", value: "0" },
    { label: "All time", value: "3" },
  ];

  const earningsStats = [
    { label: "Today", value: "MAD 0.00" },
    { label: "Yesterday", value: "MAD 0.00" },
    { label: "This week", value: "MAD 0.00" },
    { label: "This month", value: "MAD 0.00" },
    { label: "This year", value: "MAD 0.00" },
    { label: "All time", value: "MAD 31,136.00" },
  ];

  return (
    <div className="p-4 md:p-8 w-full space-y-6 flex-1 min-w-0">
      {/* Welcome Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Welcome back, <span className="text-brand-500">{storeName}</span>
        </h1>
        <p className="text-gray-500 mt-1">Here is what's happening with your store today.</p>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30">
          <h2 className="text-lg font-bold text-gray-900">Overview dashboard</h2>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {/* Orders Card */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100/80 shrink-0">
                <CubeIcon className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Orders</h3>
            </div>
            
            <ul className="divide-y divide-gray-100 -mb-2">
              {orderStats.map((stat) => (
                <li key={stat.label} className="flex justify-between items-center py-4 text-[15px]">
                  <span className="text-gray-500 font-medium">{stat.label}</span>
                  <span className="text-gray-900 font-bold">{stat.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Earnings Card */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100/80 shrink-0">
                <CurrencyDollarIcon className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Earnings</h3>
            </div>
            
            <ul className="divide-y divide-gray-100 -mb-2">
              {earningsStats.map((stat) => (
                <li key={stat.label} className="flex justify-between items-center py-4 text-[15px]">
                  <span className="text-gray-500 font-medium">{stat.label}</span>
                  <span className="text-gray-900 font-bold">{stat.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
