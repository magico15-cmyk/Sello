"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: string;
}

export default function GlobalSearchModal({ isOpen, onClose, domain }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ type: string; id: any; title: string; subtitle?: string; icon: any; path?: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Debounce search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch(query.trim());
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const performSearch = async (searchTerm: string) => {
    setLoading(true);
    try {
      const lowerSearch = searchTerm.toLowerCase();

      // 0. Search Navigation Pages
      const navigationPages = [
        { title: "Overview Dashboard", path: "/admin", keywords: "home main dashboard overview" },
        { title: "Orders", path: "/admin/orders", keywords: "sales purchases orders" },
        { title: "All Products", path: "/admin/products", keywords: "items products catalog" },
        { title: "New Product", path: "/admin/products/new", keywords: "create add new product" },
        { title: "Categories", path: "/admin/products/categories", keywords: "product categories collections" },
        { title: "Customers", path: "/admin/customers", keywords: "users clients customers buyers" },
        { title: "Store General Settings", path: "/admin/store/general", keywords: "settings store general name" },
        { title: "Theme Settings", path: "/admin/store/theme", keywords: "design colors layout theme" },
        { title: "Homepage Builder", path: "/admin/store/homepage", keywords: "home page builder sections" },
        { title: "Checkout Settings", path: "/admin/store/checkout", keywords: "payment fields checkout" },
        { title: "Store Pages", path: "/admin/store/pages", keywords: "custom pages legal" },
        { title: "Menus & Navigation", path: "/admin/store/menus", keywords: "links navigation menus header footer" },
        { title: "Header & Footer", path: "/admin/store/footer", keywords: "bottom top header footer" },
        { title: "Domains", path: "/admin/store/domains", keywords: "url custom domain" },
        { title: "Roles & Permissions", path: "/admin/roles", keywords: "admin staff roles permissions" },
      ];

      const matchedPages = navigationPages.filter(
        p => p.title.toLowerCase().includes(lowerSearch) || p.keywords.includes(lowerSearch)
      );

      // 1. Search Products
      const { data: products } = await supabase
        .from("products")
        .select("id, name")
        .ilike("name", `%${searchTerm}%`)
        .limit(5);

      // 2. Search Orders
      // We will search by customer name or phone or order ID (if numerical)
      let ordersQuery = supabase
        .from("orders")
        .select("id, customer_name, customer_phone, created_at")
        .limit(5);
        
      if (!isNaN(Number(searchTerm))) {
        ordersQuery = ordersQuery.eq("id", Number(searchTerm));
      } else {
        ordersQuery = ordersQuery.or(`customer_name.ilike.%${searchTerm}%,customer_phone.ilike.%${searchTerm}%`);
      }
      
      const { data: orders } = await ordersQuery;

      const combinedResults: { type: string; id: any; title: string; subtitle?: string; icon: any; path?: string }[] = [];

      if (matchedPages.length > 0) {
        matchedPages.forEach(p => {
          combinedResults.push({
            type: "Page",
            id: p.path,
            title: p.title,
            subtitle: "Navigation",
            icon: <MagnifyingGlassIcon className="w-5 h-5" />,
            path: p.path
          });
        });
      }

      if (products) {
        products.forEach(p => {
          combinedResults.push({
            type: "Product",
            id: p.id,
            title: p.name || "Unnamed Product",
            subtitle: `Product ID: ${p.id}`,
            icon: <CubeIcon className="w-5 h-5" />,
          });
        });
      }

      if (orders) {
        orders.forEach(o => {
          const name = o.customer_name || "Unknown Customer";
          const phone = o.customer_phone || "";
          
          combinedResults.push({
            type: "Order",
            id: o.id,
            title: `Order #${o.id} - ${name}`,
            subtitle: phone,
            icon: <ShoppingBagIcon className="w-5 h-5" />,
          });
          
          // Also add to Customers pseudo-category just for UX
          if (!combinedResults.find(r => r.type === "Customer" && r.subtitle === phone)) {
             combinedResults.push({
              type: "Customer",
              id: phone,
              title: name,
              subtitle: phone,
              icon: <UserIcon className="w-5 h-5" />,
            });
          }
        });
      }

      setResults(combinedResults);
    } catch (err) {
      console.error("Search error", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Area */}
        <div className="flex items-center px-4 py-4 border-b border-gray-100">
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-lg text-gray-900 placeholder-gray-400 outline-none"
            placeholder="Search products, orders, or customers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-semibold hover:bg-gray-200"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.length < 2 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              Type at least 2 characters to search.
            </div>
          ) : loading ? (
            <div className="p-8 text-center text-gray-500 text-sm flex justify-center items-center gap-2">
              <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              No results found for "{query}".
            </div>
          ) : (
            <div className="space-y-1">
              {["Page", "Product", "Order", "Customer"].map(category => {
                const categoryResults = results.filter(r => r.type === category);
                if (categoryResults.length === 0) return null;
                
                return (
                  <div key={category} className="mb-4 last:mb-0">
                    <h3 className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {category}s
                    </h3>
                    {categoryResults.map((result, idx) => (
                      <button
                        key={`${result.type}-${result.id}-${idx}`}
                        className="w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-50 text-left transition-colors group"
                        onClick={() => {
                          onClose();
                          if (result.type === "Page" && result.path) {
                            router.push(result.path);
                          } else if (result.type === "Product") {
                            router.push(`/admin/products/${result.id}`);
                          } else if (result.type === "Order") {
                            router.push(`/admin/orders/${result.id}`);
                          } else if (result.type === "Customer") {
                            router.push(`/admin/customers`); // No specific customer page yet
                          }
                        }}
                      >
                        <div className="p-2 bg-gray-100 rounded-lg text-gray-500 group-hover:text-brand-600 group-hover:bg-brand-50 transition-colors">
                          {result.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{result.title}</p>
                          {result.subtitle && (
                            <p className="text-xs text-gray-500 mt-0.5">{result.subtitle}</p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
