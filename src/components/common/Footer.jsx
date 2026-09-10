// src/components/common/Footer.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, MapPin, Clock, Camera } from 'lucide-react';

export const Footer = () => {
  const { salonInfo, setActiveTab, isAdminAuthenticated } = useApp();

  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '3.5rem',
      paddingBottom: '2rem',
      color: 'var(--text-secondary)'
    }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: '2.5rem', gap: '2rem' }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'var(--rose-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FFFFFF', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(212,106,134,0.25)'
              }}>A</div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                AURA BEAUTY
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', marginBottom: '1.25rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
              Hyderabad’s luxury makeup studio and doorstep vanity service specializing in Bridal HD & Airbrush Makeovers.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <a href={`https://instagram.com/${salonInfo.instagram}`} target="_blank" rel="noreferrer" className="glass-card" style={{ padding: '0.55rem', borderRadius: '50%', color: 'var(--primary-rose-dark)' }} title="Instagram">
                <Camera size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1rem' }}>Studio Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem' }}>
              <li><button onClick={() => handleNav('services')} style={{ color: 'inherit' }}>Services & Rates</button></li>
              <li><button onClick={() => handleNav('portfolio')} style={{ color: 'inherit' }}>Makeup Portfolio</button></li>
              <li><button onClick={() => handleNav('offers')} style={{ color: 'inherit' }}>Promotional Offers</button></li>
              <li><button onClick={() => handleNav('about')} style={{ color: 'inherit' }}>About Artist & Studio</button></li>
              <li><button onClick={() => handleNav('my-account')} style={{ color: 'inherit' }}>My Bookings</button></li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1rem' }}>Studio Hours</h4>
            <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.88rem', marginBottom: '0.75rem' }}>
              <Clock size={16} style={{ color: 'var(--primary-rose-dark)', flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <p style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Open All 7 Days</p>
                <p>{salonInfo.hours}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--primary-rose-dark)', marginTop: '0.3rem', fontWeight: '500' }}>
                  * Early morning wedding venue vanity services start from 5:00 AM upon reservation.
                </p>
              </div>
            </div>
          </div>

          {/* Location & Appointment */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1rem' }}>Location</h4>
            <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.88rem', marginBottom: '1rem' }}>
              <MapPin size={16} style={{ color: 'var(--primary-rose)', flexShrink: 0, marginTop: '0.2rem' }} />
              <span>{salonInfo.address}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button onClick={() => startBooking(null, 'salon')} className="btn btn-rose btn-sm" style={{ width: '100%' }}>
                Book Salon Slot
              </button>
              <button onClick={() => startBooking(null, 'home')} className="btn btn-outline-white btn-sm" style={{ width: '100%' }}>
                Book Home Service
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem'
        }}>
          <div>
            © {new Date().getFullYear()} {salonInfo.name}. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <button onClick={() => handleNav('contact')} style={{ color: 'inherit' }}>Policies & Terms</button>
            <button
              onClick={() => handleNav('admin')}
              style={{
                color: isAdminAuthenticated ? 'var(--primary-rose-dark)' : 'var(--text-muted)',
                fontWeight: isAdminAuthenticated ? '600' : '400',
                textDecoration: 'underline'
              }}
            >
              {isAdminAuthenticated ? 'Admin Portal' : 'Owner Login'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
