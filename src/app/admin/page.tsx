"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import PremiumNavbar from '@/components/admin/PremiumNavbar';

// Icons
const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="3,6 5,6 21,6" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);

export default function AdminPremiumDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: '', title: '', brand: 'YU.', price: '', old_price: '', save: '', image: '', link: ''
  });

  const fetchProducts = async () => {
    setLoading(true);
    let q = supabase.from('products').select('*').order('created_at', { ascending: true });
    if (search) {
      q = q.or(`title.ilike.%${search}%,id.ilike.%${search}%`);
    }
    const { data } = await q;
    if (data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('products').update(formData).eq('id', editingId);
    } else {
      await supabase.from('products').insert([formData]);
    }
    closeModal();
    fetchProducts();
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ id: '', title: '', brand: 'YU.', price: '', old_price: '', save: '', image: '', link: '' });
    setShowModal(true);
  };

  const openEditModal = (product: any) => {
    setFormData(product);
    setEditingId(product.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ id: '', title: '', brand: 'YU.', price: '', old_price: '', save: '', image: '', link: '' });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  // Calculate some stats for the premium header
  const totalProducts = products.length;
  const avgPrice = products.length > 0 ? (products.reduce((acc, p) => acc + parseFloat(p.price || 0), 0) / products.length).toFixed(2) : '0.00';

  return (
    <div className="min-h-screen bg-pattern relative overflow-hidden font-sans">
      <PremiumNavbar />

      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Premium Dashboard Header */}
        <div className="mb-10 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-3">
            Dashboard Overview
          </h1>
          <p className="text-lg text-gray-600 font-medium max-w-2xl">
            Welcome back to your Sello store admin. Manage your products, view metrics, and customize your storefront from this unified glass interface.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass-panel p-6 rounded-3xl hover-glow animate-fade-in-up stagger-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-sello flex items-center justify-center shadow-lg shadow-pink-500/30 mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-gray-500 font-bold text-sm tracking-widest uppercase mb-1">Total Products</h3>
            <p className="text-4xl font-black text-gray-900">{totalProducts}</p>
          </div>
          
          <div className="glass-panel p-6 rounded-3xl hover-glow animate-fade-in-up stagger-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-gray-500 font-bold text-sm tracking-widest uppercase mb-1">Avg Price</h3>
            <p className="text-4xl font-black text-gray-900">${avgPrice}</p>
          </div>

          <div className="glass-panel p-6 rounded-3xl hover-glow animate-fade-in-up stagger-3 flex flex-col justify-center">
            <button
              onClick={openAddModal}
              className="w-full py-5 rounded-2xl bg-gradient-sello text-white font-bold text-lg shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 animate-pulse-glow"
            >
              <PlusIcon />
              Add New Product
            </button>
          </div>
        </div>

        {/* Products Data Table */}
        <div className="glass-panel rounded-3xl overflow-hidden animate-fade-in-up">
          {/* Table Header Controls */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/40">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Inventory</h2>
              <p className="text-gray-500 font-medium mt-1">Manage your storefront listings in real-time.</p>
            </div>
            
            <div className="relative max-w-md w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search by title or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-white focus:border-[#f899a2] focus:ring-4 focus:ring-[#f899a2]/20 rounded-2xl text-[15px] text-gray-700 placeholder:text-gray-400 font-medium transition-all outline-none backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scroll">
            {loading ? (
              <div className="p-20 text-center text-lg text-gray-500 font-bold animate-pulse">
                Fetching inventory data...
              </div>
            ) : products.length === 0 ? (
              <div className="p-20 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-3xl bg-white/50 flex items-center justify-center shadow-inner mb-6">
                  <SearchIcon />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 font-medium mb-8">Try adjusting your search or add a new product.</p>
                <button
                  onClick={openAddModal}
                  className="px-8 py-3.5 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors shadow-lg"
                >
                  Create Product
                </button>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-white/40">
                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest w-24">Media</th>
                    <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Details</th>
                    <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Brand</th>
                    <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Pricing</th>
                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/40">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-white/60 transition-colors group">
                      <td className="px-8 py-4">
                        <div className="w-14 h-14 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 flex items-center justify-center">
                          <img src={p.image} alt={p.title} className="w-full h-full object-contain" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 text-[15px]">{p.title}</span>
                          <span className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">{p.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white font-bold text-sm text-gray-600 shadow-sm">
                          {p.brand}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-black text-lg text-gradient">${p.price}</span>
                          <div className="flex items-center gap-2">
                            {p.old_price && <span className="text-gray-400 line-through font-medium text-xs">${p.old_price}</span>}
                            {p.save && <span className="text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded font-black text-[10px]">-{p.save}%</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                          <button
                            onClick={() => openEditModal(p)}
                            className="w-10 h-10 rounded-xl bg-white text-gray-600 hover:text-blue-600 hover:shadow-md border border-gray-100 flex items-center justify-center transition-all hover:-translate-y-1"
                            title="Edit"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="w-10 h-10 rounded-xl bg-white text-gray-600 hover:text-red-500 hover:shadow-md border border-gray-100 flex items-center justify-center transition-all hover:-translate-y-1"
                            title="Delete"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* Premium Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md z-[200] flex items-center justify-center p-4 sm:p-6" onClick={closeModal}>
          <div 
            className="glass-panel w-full max-w-3xl rounded-[2rem] overflow-hidden shadow-2xl shadow-pink-500/20 transform animate-fade-in-up" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-white/50 flex items-center justify-between bg-white/30">
              <div>
                <h3 className="text-2xl font-black text-gray-900">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                <p className="text-sm font-medium text-gray-500 mt-1">Configure your product listings for the Sello store.</p>
              </div>
              <button 
                onClick={closeModal} 
                className="w-10 h-10 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-gray-900 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Product ID</label>
                    <input
                      required
                      name="id"
                      value={formData.id}
                      onChange={handleInputChange}
                      disabled={!!editingId}
                      className="w-full bg-white/70 border border-white focus:border-[#f899a2] focus:ring-4 focus:ring-[#f899a2]/20 rounded-xl py-3.5 px-4 font-medium text-gray-900 placeholder:text-gray-400 transition-all outline-none disabled:opacity-50 disabled:bg-gray-100/50 shadow-sm"
                      placeholder="e.g. turmeric-gummies"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Title</label>
                    <input
                      required
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full bg-white/70 border border-white focus:border-[#f899a2] focus:ring-4 focus:ring-[#f899a2]/20 rounded-xl py-3.5 px-4 font-medium text-gray-900 placeholder:text-gray-400 transition-all outline-none shadow-sm"
                      placeholder="e.g. Enhanced Bioactive Turmeric"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Brand</label>
                    <input
                      required
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full bg-white/70 border border-white focus:border-[#f899a2] focus:ring-4 focus:ring-[#f899a2]/20 rounded-xl py-3.5 px-4 font-medium text-gray-900 placeholder:text-gray-400 transition-all outline-none shadow-sm"
                      placeholder="e.g. YU."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Image URL</label>
                    <input
                      required
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full bg-white/70 border border-white focus:border-[#f899a2] focus:ring-4 focus:ring-[#f899a2]/20 rounded-xl py-3.5 px-4 font-medium text-gray-900 placeholder:text-gray-400 transition-all outline-none shadow-sm"
                      placeholder="e.g. /assets/bottle.png"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Product Link</label>
                    <input
                      required
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      className="w-full bg-white/70 border border-white focus:border-[#f899a2] focus:ring-4 focus:ring-[#f899a2]/20 rounded-xl py-3.5 px-4 font-medium text-gray-900 placeholder:text-gray-400 transition-all outline-none shadow-sm"
                      placeholder="e.g. /product/turmeric"
                    />
                  </div>
                  
                  {/* Pricing Group */}
                  <div className="md:col-span-2 grid grid-cols-3 gap-4 pt-4 border-t border-white/50">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Current Price</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-black">$</span>
                        <input
                          required
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full pl-8 bg-white/70 border border-white focus:border-[#f899a2] focus:ring-4 focus:ring-[#f899a2]/20 rounded-xl py-3.5 px-4 font-black text-gray-900 transition-all outline-none shadow-sm"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Old Price</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                        <input
                          name="old_price"
                          value={formData.old_price}
                          onChange={handleInputChange}
                          className="w-full pl-8 bg-white/70 border border-white focus:border-[#f899a2] focus:ring-4 focus:ring-[#f899a2]/20 rounded-xl py-3.5 px-4 font-bold text-gray-500 transition-all outline-none shadow-sm"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Save %</label>
                      <div className="relative">
                        <input
                          name="save"
                          value={formData.save}
                          onChange={handleInputChange}
                          className="w-full pr-8 bg-white/70 border border-white focus:border-[#f899a2] focus:ring-4 focus:ring-[#f899a2]/20 rounded-xl py-3.5 px-4 font-bold text-gray-900 transition-all outline-none shadow-sm"
                          placeholder="25"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-8 mt-8 border-t border-white/50">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-1/3 py-4 rounded-2xl bg-white text-gray-600 font-bold hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm border border-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-4 rounded-2xl bg-gradient-sello text-white font-black text-lg shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    {editingId ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
