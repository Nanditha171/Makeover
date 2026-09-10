// src/components/offers/OffersPage.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Sparkles, Clock, ArrowRight } from 'lucide-react';

export const OffersPage = () => {
  const { offers, formatPrice, startBooking, setActiveTab } = useApp();

  return (
    <div className="offers-page section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Promotions & Deals</span>
          <h2 className="section-title">Special Offers</h2>
          <p className="section-description">
            Take advantage of seasonal bridal packages, combo savings, and introductory makeover deals.
          </p>
        </div>

        {offers.length === 0 ? (
          <div className="glass-card empty-state">
            <div className="empty-state-icon">
              <Tag size={32} />
            </div>
            <h3 className="empty-state-title">No Active Offers Right Now</h3>
            <p className="empty-state-desc">
              We currently don't have any seasonal promotional discounts running. You can create your own bundle with our Custom Package Builder for up to 15% OFF.
            </p>
            <button
              onClick={() => setActiveTab('custom-package')}
              className="btn btn-rose btn-sm"
            >
              Build Custom Package <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="grid-3" style={{ gap: '1.75rem' }}>
            {offers.map(off => (
              <div key={off.id} className="glass-card" style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                borderColor: 'var(--border-rose)'
              }}>
                <div>
                  <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                    <img src={off.image} alt={off.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span className="badge badge-rose" style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', fontSize: '0.8rem', background: 'var(--rose-gradient)', color: '#FFFFFF', border: 'none' }}>
                      SAVE {formatPrice(off.savings)}
                    </span>
                  </div>

                  <div style={{ padding: '1.5rem' }}>
                    <span className="badge badge-rose" style={{ marginBottom: '0.5rem' }}>{off.category}</span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{off.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.15rem', lineHeight: 1.5 }}>
                      {off.description}
                    </p>

                    <div style={{ background: 'rgba(212,106,134,0.06)', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px dashed var(--border-rose)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Promo Code:</span>
                        <div style={{ fontWeight: '700', color: 'var(--primary-rose-dark)', letterSpacing: '0.04em', fontSize: '0.95rem' }}>{off.code}</div>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                        <Clock size={12} style={{ display: 'inline', marginRight: '0.2rem' }} />
                        Valid Till: {off.validTill}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                      <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        {formatPrice(off.regularPrice)}
                      </span>
                      <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--primary-rose-dark)' }}>
                        {formatPrice(off.offerPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
                  <button
                    onClick={() => startBooking({
                      id: off.id,
                      name: `${off.title} (Offer)`,
                      price: off.offerPrice
                    }, 'salon')}
                    className="btn btn-rose btn-sm"
                    style={{ width: '100%' }}
                  >
                    <Sparkles size={15} /> Book Offer Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
