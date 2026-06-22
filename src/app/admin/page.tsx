"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '', title: '', brand: 'YU.', price: '', old_price: '', save: '', image: '', link: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: true });
    if (data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('products').update(formData).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('products').insert([formData]);
    }
    setFormData({ id: '', title: '', brand: 'YU.', price: '', old_price: '', save: '', image: '', link: '' });
    fetchProducts();
  };

  const handleEdit = (product: any) => {
    setFormData(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-800">Store Admin</h1>
        <a href="/" className="text-blue-500 hover:underline">View Store</a>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required name="id" value={formData.id} onChange={handleInputChange} placeholder="ID (e.g. new-item)" className="border p-2 rounded" disabled={!!editingId} />
          <input required name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" className="border p-2 rounded" />
          <input required name="brand" value={formData.brand} onChange={handleInputChange} placeholder="Brand (e.g. YU.)" className="border p-2 rounded" />
          <input required name="price" value={formData.price} onChange={handleInputChange} placeholder="Price (e.g. 25.00)" className="border p-2 rounded" />
          <input name="old_price" value={formData.old_price} onChange={handleInputChange} placeholder="Old Price (e.g. 35.00)" className="border p-2 rounded" />
          <input name="save" value={formData.save} onChange={handleInputChange} placeholder="Save Percentage (e.g. 20)" className="border p-2 rounded" />
          <input required name="image" value={formData.image} onChange={handleInputChange} placeholder="Image URL (e.g. /assets/bottle.png)" className="border p-2 rounded" />
          <input required name="link" value={formData.link} onChange={handleInputChange} placeholder="Link URL (e.g. # or /product/new)" className="border p-2 rounded" />
          
          <div className="md:col-span-2 flex gap-2 mt-2">
            <button type="submit" className="bg-[#f899a2] text-white font-bold py-2 px-6 rounded hover:bg-[#e6828b]">
              {editingId ? 'Update Product' : 'Add Product'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ id: '', title: '', brand: 'YU.', price: '', old_price: '', save: '', image: '', link: '' }); }} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading products...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
                <th className="p-4 border-b">Image</th>
                <th className="p-4 border-b">Title</th>
                <th className="p-4 border-b">Price</th>
                <th className="p-4 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4">
                    <img src={p.image} alt={p.title} className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="p-4 font-medium text-gray-800">{p.title}</td>
                  <td className="p-4">
                    <span className="font-bold text-[#f899a2]">${p.price}</span>
                    {p.old_price && <span className="text-gray-400 line-through text-xs ml-2">${p.old_price}</span>}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleEdit(p)} className="text-blue-500 hover:text-blue-700 font-medium">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
