// src/components/offers/OffersPage.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Calendar, Sparkles, ArrowRight, Clock } from 'lucide-react';

export const OffersPage = () => {
  const { offers, formatPrice, startBooking } = useApp();

  return (
    <div className="offers-page section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Special Discounts</span>
          <h2 className="section-title">Current Promotional Offers & Deals</h2>
          <p className="section-description">
            Take advantage of seasonal bridal discounts, group party savings, and introductory pampering packages.
          </p>
        </div>

        <div className="grid-3" style={{ gap: '2rem' }}>
          {offers.map(off => (
            <div key={off.id} className="glass-card" style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              borderColor: 'var(--border-gold)',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <div>
                <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                  <img src={off.image} alt={off.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="badge badge-rose" style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', fontSize: '0.85rem' }}>
                    SAVE {formatPrice(off.savings)}
                  </span>
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>{off.category}</span>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{off.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                    {off.description}
                  </p>

                  <div style={{ background: 'rgba(212,175,55,0.06)', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px dashed var(--border-gold)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Promo Code:</span>
                      <div style={{ fontWeight: '700', color: 'var(--primary-gold)', letterSpacing: '0.05em' }}>{off.code}</div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                      <Clock size={12} style={{ display: 'inline', marginRight: '0.2rem' }} />
                      Valid Till: {off.validTill}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
                    <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1rem' }}>
                      {formatPrice(off.regularPrice)}
                    </span>
                    <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-gold)' }}>
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
                  className="btn btn-gold"
                  style={{ width: '100%' }}
                >
                  <Sparkles size={16} /> Book Offer Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
