// src/components/packages/PackagesPage.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const PackagesPage = () => {
  const { packages, formatPrice, startBooking, setActiveTab } = useApp();

  return (
    <div className="packages-page section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Bridal Bundles</span>
          <h2 className="section-title">Exclusive Bridal Makeup Packages</h2>
          <p className="section-description">
            Complete head-to-toe bridal makeover packages designed for maximum beauty, convenience, and savings.
          </p>
        </div>

        <div className="grid-3" style={{ gap: '2rem', marginBottom: '4rem' }}>
          {packages.map(pkg => (
            <div key={pkg.id} className="glass-card" style={{
              padding: '2.25rem',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              borderColor: pkg.badge === 'Most Recommended' ? 'var(--primary-gold)' : 'var(--border-subtle)',
              boxShadow: pkg.badge === 'Most Recommended' ? 'var(--shadow-glow)' : 'var(--shadow-sm)'
            }}>
              {pkg.badge && (
                <span className="badge badge-gold" style={{ position: 'absolute', top: '-0.75rem', left: '50%', transform: 'translateX(-50%)' }}>
                  {pkg.badge}
                </span>
              )}

              <div>
                <h3 style={{ fontSize: '1.6rem', textAlign: 'center', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{pkg.name}</h3>
                <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--primary-gold)' }}>
                    {formatPrice(pkg.price)}
                  </span>
                  {pkg.originalPrice && (
                    <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', marginLeft: '0.6rem', fontSize: '1.1rem' }}>
                      {formatPrice(pkg.originalPrice)}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.75rem', textAlign: 'center', lineHeight: 1.5 }}>
                  {pkg.description}
                </p>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginBottom: '1.75rem' }}>
                  <h5 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--primary-rose)', marginBottom: '0.85rem', letterSpacing: '0.05em' }}>
                    What's Included:
                  </h5>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <button onClick={() => startBooking(pkg, 'salon')} className="btn btn-gold" style={{ width: '100%' }}>
                  Book Salon Package
                </button>
                <button onClick={() => startBooking(pkg, 'home')} className="btn btn-outline-gold btn-sm" style={{ width: '100%' }}>
                  Book as Home Service
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Banner to Custom Builder */}
        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(230,164,180,0.1) 0%, rgba(212,175,55,0.1) 100%)', borderColor: 'var(--border-rose)' }}>
          <Sparkles size={36} style={{ color: 'var(--primary-rose)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>Want a Fully Tailored Beauty Package?</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
            Mix and match individual makeup bases, hairstyles, draping, lashes, and pre-bridal treatments with our dynamic real-time price calculator.
          </p>
          <button onClick={() => setActiveTab('custom-package')} className="btn btn-rose btn-lg">
            Launch Custom Package Builder <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
