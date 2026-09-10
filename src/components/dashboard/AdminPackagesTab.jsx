// src/components/dashboard/AdminPackagesTab.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  Plus,
  Trash2,
  Check,
  Tag,
  Sparkles,
  X
} from 'lucide-react';

export const AdminPackagesTab = () => {
  const { packages, addPackage, deletePackage, formatPrice } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    price: '',
    originalPrice: '',
    badge: 'Popular Choice',
    description: '',
    inclusionsText: 'Bridal HD Makeup\nBridal Hairstyling\nSaree / Dupatta Draping\n3D Mink Lashes',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.price) return;

    const inclusionsList = formState.inclusionsText.split('\n').map(i => i.trim()).filter(Boolean);

    addPackage({
      name: formState.name,
      price: parseInt(formState.price),
      originalPrice: formState.originalPrice ? parseInt(formState.originalPrice) : null,
      badge: formState.badge,
      description: formState.description,
      inclusions: inclusionsList.length > 0 ? inclusionsList : ['Bridal HD Makeup', 'Hairstyling'],
      image: formState.image || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
    });

    setFormState({
      name: '',
      price: '',
      originalPrice: '',
      badge: 'Popular Choice',
      description: '',
      inclusionsText: '',
      image: ''
    });

    setShowAddModal(false);
  };

  return (
    <div className="admin-subview">
      <div className="admin-card-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            Makeup Packages & Bridal Combos
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Manage pre-bundled bridal packages, promotional bundles, and VIP all-inclusive rituals.
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-rose btn-sm">
          <Plus size={16} /> Create Package
        </button>
      </div>

      <div className="grid-3" style={{ gap: '1.5rem' }}>
        {packages.map(pkg => (
          <div key={pkg.id} className="admin-white-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ height: '160px', position: 'relative' }}>
              <img src={pkg.image} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {pkg.badge && (
                <span className="badge badge-gold" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                  <Sparkles size={11} style={{ marginRight: '3px' }} /> {pkg.badge}
                </span>
              )}
            </div>

            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)' }}>{pkg.name}</h3>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-rose-dark)' }}>{formatPrice(pkg.price)}</div>
                    {pkg.originalPrice && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        {formatPrice(pkg.originalPrice)}
                      </div>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  {pkg.description}
                </p>

                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Package Inclusions:
                  </span>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.35rem' }}>
                    {(pkg.inclusions || []).map((inc, idx) => (
                      <li key={idx} style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '3px' }}>
                        <Check size={12} color="#27AE60" /> {inc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #F5E8EC', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  ID: #{pkg.id}
                </span>
                <button
                  onClick={() => deletePackage(pkg.id)}
                  className="btn btn-outline-white btn-sm"
                  style={{ color: '#e74c3c', padding: '0.3rem 0.5rem' }}
                  title="Delete Package"
                >
                  <Trash2 size={13} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Package Modal */}
      {showAddModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>Create Bridal Package</h3>
              <button onClick={() => setShowAddModal(false)} className="btn btn-sm btn-outline-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Package Name *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Sangeet & Reception Combo"
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Package Price (₹) *</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    placeholder="e.g. 22000"
                    value={formState.price}
                    onChange={e => setFormState({ ...formState, price: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Original Price (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 26000"
                    value={formState.originalPrice}
                    onChange={e => setFormState({ ...formState, originalPrice: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Badge</label>
                <select
                  className="form-control"
                  value={formState.badge}
                  onChange={e => setFormState({ ...formState, badge: e.target.value })}
                >
                  <option value="Popular Choice">Popular Choice</option>
                  <option value="Most Booked">Most Booked</option>
                  <option value="Royal Luxury">Royal Luxury</option>
                  <option value="Seasonal Special">Seasonal Special</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  rows={2}
                  className="form-control"
                  placeholder="Brief description of the package value..."
                  value={formState.description}
                  onChange={e => setFormState({ ...formState, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Inclusions (one per line)</label>
                <textarea
                  rows={3}
                  className="form-control"
                  placeholder="Bridal HD Makeup&#10;Hairstyling with Floral Art&#10;Saree Draping"
                  value={formState.inclusionsText}
                  onChange={e => setFormState({ ...formState, inclusionsText: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline-white btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-rose btn-sm">
                  Publish Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
