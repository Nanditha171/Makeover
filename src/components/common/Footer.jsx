// src/components/common/Footer.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, MapPin, Phone, Mail, Clock, Camera, MessageCircle, Heart } from 'lucide-react';

export const Footer = () => {
  const { salonInfo, setActiveTab, startBooking } = useApp();

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '4rem',
      paddingBottom: '2rem',
      color: 'var(--text-secondary)'
    }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: '3rem', gap: '2.5rem' }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'var(--gold-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#000', fontWeight: 'bold'
              }}>A</div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--primary-gold)' }}>
                AURA BEAUTY
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              Hyderabad’s premiere luxury makeup studio and beauty salon specializing in Bridal HD & Airbrush Makeovers, engagement glam, and bespoke salon rituals.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href={`https://instagram.com/${salonInfo.instagram}`} target="_blank" rel="noreferrer" className="glass-card" style={{ padding: '0.6rem', borderRadius: '50%', color: 'var(--primary-rose)' }}>
                <Camera size={18} />
              </a>
              <a href={`https://wa.me/${salonInfo.whatsapp}`} target="_blank" rel="noreferrer" className="glass-card" style={{ padding: '0.6rem', borderRadius: '50%', color: '#25D366' }}>
                <MessageCircle size={18} />
              </a>
              <a href={`tel:${salonInfo.phone}`} className="glass-card" style={{ padding: '0.6rem', borderRadius: '50%', color: 'var(--primary-gold)' }}>
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.2rem', fontSize: '1.1rem' }}>Explore Studio</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li><button onClick={() => setActiveTab('services')} style={{ color: 'inherit' }}>Services & Pricing</button></li>
              <li><button onClick={() => setActiveTab('packages')} style={{ color: 'inherit' }}>Bridal Packages</button></li>
              <li><button onClick={() => setActiveTab('custom-package')} style={{ color: 'inherit' }}>Customize Package</button></li>
              <li><button onClick={() => setActiveTab('portfolio')} style={{ color: 'inherit' }}>Portfolio & Gallery</button></li>
              <li><button onClick={() => setActiveTab('offers')} style={{ color: 'inherit' }}>Special Discount Offers</button></li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.2rem', fontSize: '1.1rem' }}>Studio Hours</h4>
            <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              <Clock size={18} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
              <div>
                <p style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Open Daily</p>
                <p>{salonInfo.hours}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--primary-rose)', marginTop: '0.3rem' }}>
                  * Bridal / Event Home Services available starting 5:00 AM on request.
                </p>
              </div>
            </div>
          </div>

          {/* Location & CTA */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.2rem', fontSize: '1.1rem' }}>Visit Salon</h4>
            <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.88rem', marginBottom: '1rem' }}>
              <MapPin size={18} style={{ color: 'var(--primary-rose)', flexShrink: 0 }} />
              <span>{salonInfo.address}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button onClick={() => startBooking(null, 'salon')} className="btn btn-gold btn-sm">
                Book Salon Appointment
              </button>
              <button onClick={() => startBooking(null, 'home')} className="btn btn-outline-gold btn-sm">
                Book Home Service
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.5rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.82rem'
        }}>
          <div>
            © {new Date().getFullYear()} {salonInfo.name}. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button onClick={() => setActiveTab('contact')} style={{ color: 'inherit' }}>Terms & Policies</button>
            <button onClick={() => setActiveTab('about')} style={{ color: 'inherit' }}>Hygiene Standards</button>
            <button onClick={() => setActiveTab('admin')} style={{ color: 'var(--primary-gold)' }}>Owner Login</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
