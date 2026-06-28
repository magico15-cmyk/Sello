"use client";

import { useState, useEffect } from "react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useToast } from "@/components/admin/ToastProvider";

type MetaPixel = {
  id: string;
  deliverabilityRate: number;
  conversionType: string;
};

export default function TrackingPixelsPage() {
  const [pixels, setPixels] = useState<MetaPixel[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  
  // Draft states for the new pixel form
  const [newPixelId, setNewPixelId] = useState("");
  const [newDeliverability, setNewDeliverability] = useState("100");
  const [newConversion, setNewConversion] = useState("purchase");
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchStore() {
      try {
        const res = await fetch("/api/store");
        if (res.ok) {
          const { store } = await res.json();
          if (store) {
            // Load JSONB pixels array
            if (store.meta_pixels && Array.isArray(store.meta_pixels)) {
              setPixels(store.meta_pixels);
            } else if (store.meta_pixel_ids && Array.isArray(store.meta_pixel_ids)) {
              // Migration from simple array to objects
              setPixels(store.meta_pixel_ids.map((id: string) => ({
                id,
                deliverabilityRate: store.meta_pixel_deliverability_rate || 100,
                conversionType: store.meta_pixel_conversion_type || "purchase"
              })));
            } else if (store.meta_pixel_id) {
              // Migration from single ID
              setPixels([{
                id: store.meta_pixel_id,
                deliverabilityRate: store.meta_pixel_deliverability_rate || 100,
                conversionType: store.meta_pixel_conversion_type || "purchase"
              }]);
            }
            setIsEnabled(!!store.meta_pixel_enabled);
          }
        }
      } catch (error) {
        console.error("Failed to fetch store settings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStore();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    
    try {
      const res = await fetch("/api/store/pixels", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meta_pixels: pixels,
          meta_pixel_enabled: isEnabled,
        })
      });

      if (!res.ok) throw new Error("Failed to save pixel settings");
      showToast("Pixel settings saved successfully", "success");
    } catch (error) {
      console.error(error);
      showToast("Failed to save pixel settings", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddPixel = () => {
    if (!newPixelId.trim()) return;
    
    setPixels([
      ...pixels, 
      {
        id: newPixelId.trim(),
        deliverabilityRate: parseInt(newDeliverability) || 100,
        conversionType: newConversion
      }
    ]);
    
    // Reset draft fields
    setNewPixelId("");
    setNewDeliverability("100");
    setNewConversion("purchase");
  };

  const removePixel = (indexToRemove: number) => {
    setPixels(pixels.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Header */}
      <div className="border-b border-gray-200 px-8 py-6">
        <h2 className="text-xl font-bold text-gray-900">Tracking Pixels</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your analytics and advertising pixels to track visitor behavior and campaign performance.
        </p>
      </div>

      {/* Content Area */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="max-w-3xl">
          
          {/* Meta/Facebook Pixel Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Meta (Facebook) Pixel</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Track conversions from Facebook ads, optimize ads, build targeted audiences, and remarket to people.
                  </p>
                </div>
              </div>
              
              {/* Toggle Switch */}
              <button 
                type="button"
                onClick={() => setIsEnabled(!isEnabled)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${isEnabled ? 'bg-brand-500' : 'bg-gray-200'}`}
                role="switch"
                aria-checked={isEnabled}
              >
                <span className="sr-only">Enable Meta Pixel</span>
                <span 
                  aria-hidden="true" 
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isEnabled ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>

            <div className="space-y-6">
              
              {/* Add New Pixel Form */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Add a new Pixel</h4>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Meta Pixel ID
                    </label>
                    <input
                      type="text"
                      value={newPixelId}
                      onChange={(e) => setNewPixelId(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors bg-white text-sm"
                      placeholder="123456789012345"
                      disabled={!isEnabled}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddPixel();
                        }
                      }}
                    />
                  </div>
                  
                  <div className="md:col-span-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Deliverability (COD)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={newDeliverability}
                        onChange={(e) => setNewDeliverability(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors bg-white pr-8 text-sm"
                        placeholder="100"
                        disabled={!isEnabled}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
                        %
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Conversion type
                    </label>
                    <select
                      value={newConversion}
                      onChange={(e) => setNewConversion(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors bg-white text-sm"
                      disabled={!isEnabled}
                    >
                      <option value="purchase">Purchase</option>
                      <option value="lead">Lead</option>
                      <option value="initiate_checkout">Initiate Checkout</option>
                      <option value="add_to_cart">Add to Cart</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 flex items-end">
                    <button
                      type="button"
                      disabled={!isEnabled || !newPixelId.trim()}
                      onClick={handleAddPixel}
                      className="w-full px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              
              {/* List of Added Pixels */}
              {pixels.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900">Active Pixels</h4>
                  {pixels.map((pixel, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">{pixel.id}</span>
                          <span className="text-xs text-gray-500">
                            {pixel.conversionType === 'purchase' ? 'Purchase' : pixel.conversionType === 'lead' ? 'Lead' : pixel.conversionType === 'initiate_checkout' ? 'Initiate Checkout' : 'Add to Cart'} • {pixel.deliverabilityRate}% Deliverability
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePixel(index)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="Remove Pixel"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500">
                  {isEnabled && pixels.length > 0 ? (
                    <span className="flex items-center text-green-600 font-medium">
                      <CheckCircleIcon className="w-5 h-5 mr-1.5" />
                      {pixels.length} active pixel{pixels.length > 1 ? 's' : ''}
                    </span>
                  ) : (
                    <span>Not tracking</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={(e) => handleSave(e)}
                  className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  disabled={!isEnabled || isLoading || isSaving}
                >
                  {isSaving ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
