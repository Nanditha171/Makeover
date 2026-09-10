// src/components/dashboard/AdminProductsTab.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Plus,
  Trash2,
  Edit2,
  Search,
  X
} from 'lucide-react';

export const AdminProductsTab = ({ searchQuery = '' }) => {
  const { products, addProduct, updateProduct, deleteProduct, formatPrice, showToast } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [localSearch, setLocalSearch] = useState('');

  const [formState, setFormState] = useState({
    name: '',
    brand: '',
    category: 'Base & Powders',
    sku: '',
    stock: 20,
    minStock: 5,
    unitPrice: 3500,
    supplier: 'Nykaa Luxury Pro',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80'
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormState({
      name: '',
      brand: '',
      category: 'Base & Powders',
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      stock: 20,
      minStock: 5,
      unitPrice: 3500,
      supplier: 'Nykaa Luxury Pro',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80'
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setFormState({
      name: p.name,
      brand: p.brand,
      category: p.category,
      sku: p.sku || '',
      stock: p.stock || 0,
      minStock: p.minStock || 5,
      unitPrice: p.unitPrice || 0,
      supplier: p.supplier || '',
      image: p.image || ''
    });
    setShowAddModal(true);
  };

  const handleRestock = (p, qty = 5) => {
    updateProduct({
      ...p,
      stock: (p.stock || 0) + qty,
      status: 'In Stock'
    });
    showToast(`Added +${qty} units to ${p.name} stock.`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name) return;

    const stockNum = parseInt(formState.stock) || 0;
    const minStockNum = parseInt(formState.minStock) || 5;
    const status = stockNum <= minStockNum ? 'Low Stock' : 'In Stock';

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...formState,
        stock: stockNum,
        minStock: minStockNum,
        unitPrice: parseInt(formState.unitPrice) || 0,
        status
      });
    } else {
      addProduct({
        ...formState,
        stock: stockNum,
        minStock: minStockNum,
        unitPrice: parseInt(formState.unitPrice) || 0,
        status
      });
    }

    setShowAddModal(false);
  };

  const effectiveSearch = (searchQuery || localSearch).toLowerCase().trim();
  const filteredProducts = (products || []).filter(p =>
    p.name.toLowerCase().includes(effectiveSearch) ||
    (p.brand || '').toLowerCase().includes(effectiveSearch) ||
    (p.category || '').toLowerCase().includes(effectiveSearch) ||
    (p.sku || '').toLowerCase().includes(effectiveSearch)
  );

  return (
    <div className="admin-subview">
      <div className="admin-card-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            Products & Cosmetic Inventory
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Track luxury cosmetic kits, TEMPTU airbrush supplies, lashes, and sanitization equipment.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="admin-search-box" style={{ width: '220px' }}>
            <Search size={15} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>

          <button onClick={handleOpenAdd} className="btn btn-rose btn-sm">
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      <div className="admin-white-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Product / Brand</th>
                <th>Category</th>
                <th>SKU</th>
                <th>Stock Level</th>
                <th>Unit Cost</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => {
                const isLowStock = p.stock <= p.minStock;
                return (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {p.image && (
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }}
                          />
                        )}
                        <div>
                          <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{p.name}</strong>
                          <span style={{ fontSize: '0.74rem', color: 'var(--primary-rose-dark)', fontWeight: '600' }}>
                            {p.brand}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-gray" style={{ fontSize: '0.72rem' }}>{p.category}</span>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>{p.sku || 'N/A'}</code>
                    </td>
                    <td>
                      <div style={{ fontWeight: '700', color: isLowStock ? '#e74c3c' : 'var(--text-primary)' }}>
                        {p.stock} units
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Min: {p.minStock}</span>
                    </td>
                    <td>
                      <strong>{formatPrice(p.unitPrice)}</strong>
                    </td>
                    <td>
                      <span className={`badge ${isLowStock ? 'badge-red' : 'badge-green'}`} style={{ fontSize: '0.7rem' }}>
                        {isLowStock ? '⚠️ Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          onClick={() => handleRestock(p, 10)}
                          className="btn btn-outline-white btn-sm"
                          style={{ color: '#27AE60', fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}
                          title="Restock +10"
                        >
                          +10 Restock
                        </button>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="btn btn-outline-white btn-sm"
                          style={{ padding: '0.25rem 0.45rem' }}
                          title="Edit Product"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="btn btn-outline-white btn-sm"
                          style={{ color: '#e74c3c', padding: '0.25rem 0.45rem' }}
                          title="Delete Product"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>
                {editingProduct ? 'Edit Product Item' : 'Add Inventory Product'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="btn btn-sm btn-outline-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. TEMPTU Airbrush Foundation 24Hr Pods"
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Brand</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. TEMPTU Pro"
                    value={formState.brand}
                    onChange={e => setFormState({ ...formState, brand: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control"
                    value={formState.category}
                    onChange={e => setFormState({ ...formState, category: e.target.value })}
                  >
                    <option value="Airbrush Cosmetics">Airbrush Cosmetics</option>
                    <option value="Base & Powders">Base & Powders</option>
                    <option value="Foundation & Concealer">Foundation & Concealer</option>
                    <option value="Eye Artistry">Eye Artistry</option>
                    <option value="Lashes & Adhesives">Lashes & Adhesives</option>
                    <option value="Hygiene & Equipment">Hygiene & Equipment</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">SKU</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="TMP-AIR-24"
                    value={formState.sku}
                    onChange={e => setFormState({ ...formState, sku: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Stock Count</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    value={formState.stock}
                    onChange={e => setFormState({ ...formState, stock: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Unit Price (₹)</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    value={formState.unitPrice}
                    onChange={e => setFormState({ ...formState, unitPrice: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Supplier / Distributor</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Nykaa Luxury Pro India"
                  value={formState.supplier}
                  onChange={e => setFormState({ ...formState, supplier: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Product Image URL</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://images.unsplash.com/..."
                  value={formState.image}
                  onChange={e => setFormState({ ...formState, image: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline-white btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-rose btn-sm">
                  {editingProduct ? 'Save Changes' : 'Add to Inventory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
