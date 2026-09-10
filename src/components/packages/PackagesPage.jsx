// src/components/packages/PackagesPage.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const PackagesPage = ({ isEmbedded = false }) => {
  const { packages, formatPrice, startBooking, setActiveTab } = useApp();

  return (
    <div className={isEmbedded ? '' : 'packages-page section-padding'}>
      <div className={isEmbedded ? '' : 'container'}>
        {!isEmbedded && (
          <div className="section-header">
            <span className="section-subtitle">Bridal Bundles</span>
            <h2 className="section-title">Exclusive Bridal Makeup Packages</h2>
            <p className="section-description">
              Complete head-to-toe bridal makeover packages designed for maximum beauty, convenience, and savings.
            </p>
          </div>
        )}

        {packages.length === 0 ? (
          <div className="glass-card empty-state">
            <div className="empty-state-icon">
              <Sparkles size={28} />
            </div>
            <h3 className="empty-state-title">No Packages Available</h3>
            <p className="empty-state-desc">
              No bridal packages are currently listed. You can build a customized package with your selected services.
            </p>
            <button onClick={() => setActiveTab('custom-package')} className="btn btn-rose btn-sm">
              Launch Custom Package Builder
            </button>
          </div>
        ) : (
          <div className="grid-3" style={{ gap: '1.75rem', marginBottom: isEmbedded ? '2rem' : '4rem' }}>
            {packages.map(pkg => (
              <div key={pkg.id} className="glass-card" style={{
                padding: '2rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                borderColor: pkg.badge === 'Most Booked' ? 'var(--primary-rose)' : 'var(--border-subtle)'
              }}>
                {pkg.badge && (
                  <span className="badge badge-rose" style={{ position: 'absolute', top: '-0.65rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--rose-gradient)', color: '#FFFFFF', border: 'none' }}>
                    {pkg.badge}
                  </span>
                )}

                <div>
                  <h3 style={{ fontSize: '1.45rem', textAlign: 'center', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>{pkg.name}</h3>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--primary-rose-dark)' }}>
                      {formatPrice(pkg.price)}
                    </span>
                    {pkg.originalPrice && (
                      <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', marginLeft: '0.6rem', fontSize: '1.05rem' }}>
                        {formatPrice(pkg.originalPrice)}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: 'center', lineHeight: 1.5 }}>
                    {pkg.description}
                  </p>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.15rem', marginBottom: '1.5rem' }}>
                    <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--primary-rose-dark)', marginBottom: '0.75rem', letterSpacing: '0.04em', fontWeight: '700' }}>
                      What's Included:
                    </h5>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem' }}>
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)' }}>
                          <CheckCircle2 size={15} style={{ color: 'var(--primary-rose-dark)', flexShrink: 0 }} />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => startBooking(pkg, 'salon')} className="btn btn-rose btn-sm" style={{ flex: 1 }}>
                    Book Salon
                  </button>
                  <button onClick={() => startBooking(pkg, 'home')} className="btn btn-outline-white btn-sm" style={{ flex: 1 }}>
                    Book Home
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
