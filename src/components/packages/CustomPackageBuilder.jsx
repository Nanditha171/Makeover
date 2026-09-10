// src/components/packages/CustomPackageBuilder.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Check } from 'lucide-react';

export const CustomPackageBuilder = ({ isEmbedded = false }) => {
  const { services, formatPrice, startBooking } = useApp();
  const [selectedIds, setSelectedIds] = useState(() => {
    return services.slice(0, 3).map(s => s.id);
  });
  const [packageName, setPackageName] = useState('My Custom Makeover Package');

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
  const rawTotal = selectedServices.reduce((sum, s) => sum + (s.price || 0), 0);

  // Discount rule: 10% off for 3+ items, 15% off for 5+ items
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
    <div className={isEmbedded ? '' : 'custom-package-builder section-padding'}>
      <div className={isEmbedded ? '' : 'container'}>
        {!isEmbedded && (
          <div className="section-header">
            <span className="section-subtitle">Interactive Calculator</span>
            <h2 className="section-title">Build Your Custom Package</h2>
            <p className="section-description">
              Select any services to bundle together. Bundle 3+ items for 10% OFF, or 5+ items for 15% OFF!
            </p>
          </div>
        )}

        <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'flex-start' }}>
          {/* Left Column: Services Selection Menu */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>1. Select Services to Bundle:</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {services.map(srv => {
                const isSelected = selectedIds.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    className="glass-card"
                    style={{
                      padding: '0.85rem 1.15rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderColor: isSelected ? 'var(--primary-rose)' : 'var(--border-subtle)',
                      background: isSelected ? 'rgba(212,106,134,0.08)' : 'var(--bg-card)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '6px',
                        border: isSelected ? '2px solid var(--primary-rose)' : '2px solid var(--border-subtle)',
                        background: isSelected ? 'var(--primary-rose)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF'
                      }}>
                        {isSelected && <Check size={15} strokeWidth={3} />}
                      </div>

                      <div>
                        <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{srv.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{srv.category}</span>
                      </div>
                    </div>

                    <strong style={{ fontSize: '1rem', color: isSelected ? 'var(--primary-rose-dark)' : 'var(--text-secondary)' }}>
                      {formatPrice(srv.price)}
                    </strong>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Price Summary Card */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="glass-card" style={{ padding: '1.75rem', border: '1px solid var(--border-rose)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Sparkles size={18} style={{ color: 'var(--primary-rose-dark)' }} />
                <h3 style={{ fontSize: '1.25rem' }}>Custom Package Summary</h3>
              </div>

              <div className="form-group">
                <label className="form-label">Package Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={packageName}
                  onChange={e => setPackageName(e.target.value)}
                  placeholder="e.g. My Bridal & Reception Package"
                />
              </div>

              {/* Selected Items List */}
              <div style={{ marginBottom: '1.25rem', maxHeight: '180px', overflowY: 'auto', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
                <label className="form-label">Selected Services ({selectedServices.length})</label>
                {selectedServices.map(s => (
                  <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>• {s.name}</span>
                    <span>{formatPrice(s.price)}</span>
                  </div>
                ))}
              </div>

              {/* Discount Banner */}
              {discountPercent > 0 ? (
                <div className="badge badge-rose" style={{ width: '100%', padding: '0.5rem', justifyContent: 'center', marginBottom: '1rem', background: 'var(--rose-gradient)', color: '#FFFFFF', border: 'none' }}>
                  🎉 {discountPercent}% Bundle Discount (Saved {formatPrice(discountAmount)})
                </div>
              ) : (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem', textAlign: 'center' }}>
                  💡 Select 3+ items to unlock a 10% Bundle Discount!
                </div>
              )}

              {/* Total Calculation */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Subtotal:</span>
                  <span style={{ textDecoration: discountPercent > 0 ? 'line-through' : 'none' }}>{formatPrice(rawTotal)}</span>
                </div>
                {discountPercent > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', color: '#2ecc71', fontSize: '0.9rem' }}>
                    <span>Discount:</span>
                    <span>- {formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-rose)' }}>
                  <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>Total Price:</span>
                  <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary-rose-dark)' }}>{formatPrice(finalPrice)}</span>
                </div>
              </div>

              {/* Booking CTAs */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleBookCustomPackage('salon')} className="btn btn-rose btn-sm" style={{ flex: 1 }}>
                  Book Salon
                </button>
                <button onClick={() => handleBookCustomPackage('home')} className="btn btn-outline-white btn-sm" style={{ flex: 1 }}>
                  Book Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
