// src/components/packages/CustomPackageBuilder.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Check, Plus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

export const CustomPackageBuilder = () => {
  const { services, formatPrice, startBooking } = useApp();
  const [selectedIds, setSelectedIds] = useState(['srv-101', 'srv-402', 'srv-501']); // defaults: HD Makeup + Bridal Hair + Saree Draping
  const [packageName, setPackageName] = useState('My Custom Glam Package');

  const toggleService = (id) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(prev => prev.filter(i => i !== id));
      }
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const selectedServices = services.filter(s => selectedIds.includes(s.id));
  const rawTotal = selectedServices.reduce((sum, s) => sum + s.price, 0);

  // Discount rule: 10% off for 3+ items, 15% off for 5+ items!
  let discountPercent = 0;
  if (selectedIds.length >= 5) discountPercent = 15;
  else if (selectedIds.length >= 3) discountPercent = 10;

  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const finalPrice = rawTotal - discountAmount;

  const handleBookCustomPackage = (type = 'salon') => {
    const customPkg = {
      id: `custom-pkg-${Date.now()}`,
      name: packageName || 'Custom Beauty Package',
      price: finalPrice,
      originalPrice: rawTotal,
      category: 'Custom Package',
      description: `Custom package including: ${selectedServices.map(s => s.name).join(', ')}`,
      inclusions: selectedServices.map(s => s.name)
    };

    startBooking(customPkg, type);
  };

  return (
    <div className="custom-package-builder section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Interactive Tool</span>
          <h2 className="section-title">Build & Customize Your Package</h2>
          <p className="section-description">
            Select the exact services you require. Enjoy automated multi-service bundle discounts in real-time!
          </p>
        </div>

        <div className="grid-2" style={{ gap: '3rem', alignItems: 'flex-start' }}>
          {/* Left Column: Services Selection Menu */}
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>1. Select Services to Include:</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {services.map(srv => {
                const isSelected = selectedIds.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    className={`glass-card ${isSelected ? 'glass-card-rose' : ''}`}
                    style={{
                      padding: '1rem 1.25rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      borderColor: isSelected ? 'var(--primary-gold)' : 'var(--border-subtle)',
                      background: isSelected ? 'rgba(212,175,55,0.08)' : 'var(--bg-card)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        border: isSelected ? '2px solid var(--primary-gold)' : '2px solid var(--border-subtle)',
                        background: isSelected ? 'var(--primary-gold)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        color: '#000'
                      }}>
                        {isSelected && <Check size={16} strokeWidth={3} />}
                      </div>

                      <div>
                        <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{srv.name}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{srv.category}</span>
                      </div>
                    </div>

                    <strong style={{ fontSize: '1.1rem', color: isSelected ? 'var(--primary-gold)' : 'var(--text-secondary)' }}>
                      {formatPrice(srv.price)}
                    </strong>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Price Summary & Checkout Card */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border-gold)', boxShadow: 'var(--shadow-glow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Sparkles size={20} style={{ color: 'var(--primary-gold)' }} />
                <h3 style={{ fontSize: '1.35rem' }}>Package Summary</h3>
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Custom Package Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={packageName}
                  onChange={e => setPackageName(e.target.value)}
                  placeholder="e.g. My Reception Glam Package"
                />
              </div>

              {/* Selected Items List */}
              <div style={{ marginBottom: '1.5rem', maxHeight: '220px', overflowY: 'auto', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                <label className="form-label" style={{ marginBottom: '0.5rem' }}>Included Services ({selectedServices.length})</label>
                {selectedServices.map(s => (
                  <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>• {s.name}</span>
                    <span>{formatPrice(s.price)}</span>
                  </div>
                ))}
              </div>

              {/* Discount Banner */}
              {discountPercent > 0 ? (
                <div className="badge badge-gold" style={{ width: '100%', padding: '0.6rem', textAlign: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  🎉 Bundle Discount Applied: {discountPercent}% OFF! (Saved {formatPrice(discountAmount)})
                </div>
              ) : (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem', textAlign: 'center' }}>
                  💡 Select 3+ items to unlock a 10% Bundle Discount!
                </div>
              )}

              {/* Total Calculation */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Subtotal:</span>
                  <span style={{ textDecoration: discountPercent > 0 ? 'line-through' : 'none' }}>{formatPrice(rawTotal)}</span>
                </div>
                {discountPercent > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', color: '#2ecc71', fontSize: '0.95rem' }}>
                    <span>Bundle Discount:</span>
                    <span>- {formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.6rem', borderTop: '1px dashed var(--border-gold)' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>Total Price:</span>
                  <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-gold)' }}>{formatPrice(finalPrice)}</span>
                </div>
              </div>

              {/* Booking CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button onClick={() => handleBookCustomPackage('salon')} className="btn btn-gold" style={{ width: '100%' }}>
                  Book Custom Package at Salon
                </button>
                <button onClick={() => handleBookCustomPackage('home')} className="btn btn-rose" style={{ width: '100%' }}>
                  Book Custom Package for Home Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
