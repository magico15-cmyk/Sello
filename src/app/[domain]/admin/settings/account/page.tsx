"use client";

import { useState, useEffect } from "react";
import { UserIcon, PaperAirplaneIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/admin/ToastProvider";

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState("manage"); // "manage"
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const supabase = createClient();
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        
        if (user) {
          setEmail(user.email || "");
          setPhone(user.user_metadata?.phone || "");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchUser();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const updates: any = {};
      
      // Only include fields that have values to update
      if (email) updates.email = email;
      if (password) updates.password = password;
      updates.data = { phone }; // Store phone in user_metadata
      
      const { error } = await supabase.auth.updateUser(updates);
      
      if (error) throw error;
      
      showToast("Account settings updated successfully", "success");
      setPassword(""); // Clear password field for security
      
    } catch (error: any) {
      console.error("Error updating account:", error);
      showToast(error.message || "Failed to update account", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 px-8">
          <button
            onClick={() => setActiveTab("manage")}
            className={`py-4 text-sm font-medium transition-colors relative ${
              activeTab === "manage"
                ? "text-brand-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Manage account
            {activeTab === "manage" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-500" />
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex-1 flex flex-col">
        {activeTab === "manage" && (
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Account Details
            </h3>
            
            {isLoading ? (
              <div className="animate-pulse space-y-6">
                <div className="h-16 bg-gray-100 rounded-lg"></div>
                <div className="h-16 bg-gray-100 rounded-lg"></div>
                <div className="h-16 bg-gray-100 rounded-lg"></div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSave}>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    If you change your email, you may need to verify the new address.
                  </p>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors pr-10"
                        placeholder="Leave blank to keep current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <EyeIcon className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                    placeholder="Phone number"
                  />
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
