// src/components/dashboard/AdminOffersTab.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Tag,
  Plus,
  Trash2,
  Calendar,
  Percent,
  Sparkles,
  X
} from 'lucide-react';

export const AdminOffersTab = () => {
  const { offers, addOffer, deleteOffer, formatPrice } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  const [formState, setFormState] = useState({
    title: '',
    category: 'Bridal Special',
    regularPrice: '',
    offerPrice: '',
    code: '',
    validTill: '2026-12-31',
    description: '',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.title || !formState.offerPrice) return;

    const reg = parseInt(formState.regularPrice) || parseInt(formState.offerPrice);
    const off = parseInt(formState.offerPrice);
    const savings = reg - off > 0 ? reg - off : 1000;

    addOffer({
      title: formState.title,
      category: formState.category,
      regularPrice: reg,
      offerPrice: off,
      savings,
      code: (formState.code || 'GLOW').toUpperCase(),
      validTill: formState.validTill || '2026-12-31',
      description: formState.description,
      image: formState.image || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
    });

    setFormState({
      title: '',
      category: 'Bridal Special',
      regularPrice: '',
      offerPrice: '',
      code: '',
      validTill: '2026-12-31',
      description: '',
      image: ''
    });

    setShowAddModal(false);
  };

  return (
    <div className="admin-subview">
      <div className="admin-card-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            Promotions, Offers & Coupon Codes
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Publish festive beauty discounts, couple combos, and client promo vouchers.
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-rose btn-sm">
          <Plus size={16} /> Create Offer
        </button>
      </div>

      <div className="grid-2" style={{ gap: '1.5rem' }}>
        {offers.map(off => (
          <div key={off.id} className="admin-white-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <span className="badge badge-rose" style={{ marginBottom: '0.35rem' }}>{off.category}</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>{off.title}</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary-rose-dark)' }}>{formatPrice(off.offerPrice)}</div>
                  {off.regularPrice && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                      {formatPrice(off.regularPrice)}
                    </div>
                  )}
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {off.description}
              </p>

              <div style={{ background: '#FAF2F4', padding: '0.75rem 1rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>PROMO CODE</span>
                  <code style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary-rose-dark)', letterSpacing: '0.05em' }}>
                    {off.code}
                  </code>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>VALID UNTIL</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    📅 {off.validTill}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #F5E8EC', paddingTop: '0.75rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>
                Save {formatPrice(off.savings)}
              </span>
              <button
                onClick={() => deleteOffer(off.id)}
                className="btn btn-outline-white btn-sm"
                style={{ color: '#e74c3c' }}
              >
                <Trash2 size={14} /> Remove Offer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Offer Modal */}
      {showAddModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>Create Promotional Offer</h3>
              <button onClick={() => setShowAddModal(false)} className="btn btn-sm btn-outline-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Offer Title *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Festive Makeover Special"
                  value={formState.title}
                  onChange={e => setFormState({ ...formState, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control"
                    value={formState.category}
                    onChange={e => setFormState({ ...formState, category: e.target.value })}
                  >
                    <option value="Bridal Special">Bridal Special</option>
                    <option value="Combo Offer">Combo Offer</option>
                    <option value="Festival Deal">Festival Deal</option>
                    <option value="Doorstep Special">Doorstep Special</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Promo Coupon Code *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. BRIDALGLOW"
                    value={formState.code}
                    onChange={e => setFormState({ ...formState, code: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Regular Price (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="22000"
                    value={formState.regularPrice}
                    onChange={e => setFormState({ ...formState, regularPrice: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Offer Price (₹) *</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    placeholder="18999"
                    value={formState.offerPrice}
                    onChange={e => setFormState({ ...formState, offerPrice: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Valid Till</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formState.validTill}
                    onChange={e => setFormState({ ...formState, validTill: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  rows={2}
                  className="form-control"
                  placeholder="Offer details and inclusions..."
                  value={formState.description}
                  onChange={e => setFormState({ ...formState, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline-white btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-rose btn-sm">
                  Publish Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
