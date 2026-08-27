// src/components/common/Header.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Phone, Calendar, Menu, X, User, ShieldCheck, ShoppingBag } from 'lucide-react';

export const Header = () => {
  const { activeTab, setActiveTab, userRole, setUserRole, salonInfo, startBooking, isAdminAuthenticated, adminLogout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services & Rates' },
    { id: 'packages', label: 'Packages' },
    { id: 'custom-package', label: 'Build Package' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'offers', label: 'Special Offers' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 999,
      background: 'rgba(12, 10, 15, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      {/* Top Banner Bar */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(212,175,55,0.15) 0%, rgba(230,164,180,0.15) 50%, rgba(212,175,55,0.15) 100%)',
        borderBottom: '1px solid rgba(212,175,55,0.15)',
        padding: '0.4rem 0',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--primary-gold)' }}>
              <Sparkles size={13} /> Bridal & Luxury Beauty Studio
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Phone size={13} /> {salonInfo.phone}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Account Link */}
            <button
              onClick={() => handleNavClick('my-account')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: activeTab === 'my-account' ? 'var(--primary-gold)' : 'var(--text-secondary)' }}
            >
              <User size={13} /> My Bookings
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container" style={{ padding: '0.9rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'var(--gold-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000',
            fontWeight: 'bold',
            fontSize: '1.3rem',
            boxShadow: 'var(--shadow-glow)'
          }}>
            A
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '700', lineHeight: 1.1, background: 'var(--gold-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AURA
            </div>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--primary-rose)' }}>
              Beauty & Makeup Artistry
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                fontSize: '0.88rem',
                fontWeight: activeTab === item.id ? '700' : '500',
                color: activeTab === item.id ? 'var(--primary-gold)' : 'var(--text-secondary)',
                borderBottom: activeTab === item.id ? '2px solid var(--primary-gold)' : '2px solid transparent',
                paddingBottom: '0.2rem',
                transition: 'var(--transition-fast)'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => startBooking(null, 'salon')}
            className="btn btn-gold btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Calendar size={15} /> Book Appointment
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{ display: 'none', color: 'var(--text-primary)', padding: '0.4rem' }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-gold)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.9rem'
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                textAlign: 'left',
                fontSize: '1rem',
                fontWeight: activeTab === item.id ? '700' : '500',
                color: activeTab === item.id ? 'var(--primary-gold)' : 'var(--text-primary)',
                padding: '0.4rem 0'
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              onClick={() => { handleNavClick('booking-salon'); setMobileMenuOpen(false); }}
              className="btn btn-gold btn-sm"
              style={{ flex: 1 }}
            >
              Salon Appointment
            </button>
            <button
              onClick={() => { handleNavClick('booking-home'); setMobileMenuOpen(false); }}
              className="btn btn-rose btn-sm"
              style={{ flex: 1 }}
            >
              Home Service
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};
