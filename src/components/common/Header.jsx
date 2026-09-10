// src/components/common/Header.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Calendar, Menu, X, User, ShieldCheck } from 'lucide-react';

export const Header = () => {
  const { activeTab, setActiveTab, startBooking, isAdminAuthenticated } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services & Packages' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'offers', label: 'Offers' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact & Policies' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 999,
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      {/* Top Banner Bar */}
      <div style={{
        background: 'rgba(212, 106, 134, 0.08)',
        borderBottom: '1px solid rgba(212, 106, 134, 0.12)',
        padding: '0.35rem 0',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-rose-dark)', fontWeight: '600' }}>
            <Sparkles size={13} /> Luxury Bridal & Professional Beauty Studio • Jubilee Hills
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button
              onClick={() => handleNavClick('my-account')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: activeTab === 'my-account' ? 'var(--primary-rose-dark)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'my-account' ? '700' : '500'
              }}
            >
              <User size={13} /> My Bookings
            </button>

            {isAdminAuthenticated && (
              <button
                onClick={() => handleNavClick('admin')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: 'var(--primary-rose)',
                  fontWeight: '600'
                }}
              >
                <ShieldCheck size={13} /> Admin Portal
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container" style={{ padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--rose-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            boxShadow: '0 2px 10px rgba(212,106,134,0.3)'
          }}>
            A
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: '700', lineHeight: 1.1, color: 'var(--text-primary)' }}>
              AURA
            </div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--primary-rose-dark)', fontWeight: '600' }}>
              Beauty & Makeup Artistry
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                fontSize: '0.9rem',
                fontWeight: activeTab === item.id ? '700' : '500',
                color: activeTab === item.id ? 'var(--primary-rose-dark)' : 'var(--text-secondary)',
                borderBottom: activeTab === item.id ? '2px solid var(--primary-rose)' : '2px solid transparent',
                paddingBottom: '0.2rem',
                transition: 'var(--transition-fast)'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => startBooking(null, 'salon')}
            className="btn btn-rose btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Calendar size={15} /> Book Appointment
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            aria-label="Toggle Navigation Menu"
            style={{ display: 'none', color: 'var(--text-primary)', padding: '0.4rem' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: '#FFFFFF',
          borderBottom: '1px solid var(--border-rose)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                textAlign: 'left',
                fontSize: '0.95rem',
                fontWeight: activeTab === item.id ? '700' : '500',
                color: activeTab === item.id ? 'var(--primary-rose-dark)' : 'var(--text-primary)',
                padding: '0.4rem 0'
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('my-account')}
            style={{
              textAlign: 'left',
              fontSize: '0.95rem',
              color: activeTab === 'my-account' ? 'var(--primary-rose-dark)' : 'var(--text-secondary)',
              padding: '0.4rem 0'
            }}
          >
            My Bookings
          </button>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              onClick={() => { startBooking(null, 'salon'); setMobileMenuOpen(false); }}
              className="btn btn-rose btn-sm"
              style={{ flex: 1 }}
            >
              Salon Appointment
            </button>
            <button
              onClick={() => { startBooking(null, 'home'); setMobileMenuOpen(false); }}
              className="btn btn-outline-rose btn-sm"
              style={{ flex: 1 }}
            >
              Home Service
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};
