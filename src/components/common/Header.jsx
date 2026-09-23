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
      borderBottom: '1px solid var(--border-subtle)',
      width: '100%'
    }}>
      {/* Top Banner Bar */}
      <div style={{
        background: 'rgba(212, 106, 134, 0.08)',
        borderBottom: '1px solid rgba(212, 106, 134, 0.12)',
        padding: '0.35rem 0',
        fontSize: '0.78rem',
        color: 'var(--text-secondary)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-rose-dark)', fontWeight: '600', minWidth: 0 }}>
            <Sparkles size={13} style={{ flexShrink: 0 }} />
            <span className="header-top-tagline" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Luxury Bridal & Beauty Studio • Jubilee Hills
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
            <button
              onClick={() => handleNavClick('my-account')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: activeTab === 'my-account' ? 'var(--primary-rose-dark)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'my-account' ? '700' : '500',
                fontSize: '0.78rem'
              }}
            >
              <User size={12} /> <span>My Bookings</span>
            </button>

            {isAdminAuthenticated && (
              <button
                onClick={() => handleNavClick('admin')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: 'var(--primary-rose)',
                  fontWeight: '600',
                  fontSize: '0.78rem'
                }}
              >
                <ShieldCheck size={12} /> <span>Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container" style={{ padding: '0.75rem var(--container-padding)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--rose-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: '1.15rem',
            boxShadow: '0 2px 10px rgba(212,106,134,0.3)',
            flexShrink: 0
          }}>
            A
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '700', lineHeight: 1.1, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
              AURA
            </div>
            <div className="header-logo-subtitle" style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--primary-rose-dark)', fontWeight: '600', whiteSpace: 'nowrap' }}>
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

        {/* Action Button & Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <button
            onClick={() => startBooking(null, 'salon')}
            className="btn btn-rose btn-sm header-book-btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Calendar size={14} />
            <span className="btn-full-text">Book Appointment</span>
            <span className="btn-short-text">Book</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            aria-label="Toggle Navigation Menu"
            style={{
              display: 'none',
              color: 'var(--text-primary)',
              width: '40px',
              height: '40px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              background: mobileMenuOpen ? 'rgba(212,106,134,0.12)' : 'transparent',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: '#FFFFFF',
          borderBottom: '1px solid var(--border-rose)',
          padding: '1.15rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          boxShadow: 'var(--shadow-md)',
          animation: 'fadeIn 0.2s ease-out'
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
                padding: '0.6rem 0.5rem',
                borderRadius: '6px',
                background: activeTab === item.id ? 'rgba(212,106,134,0.08)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{item.label}</span>
              {activeTab === item.id && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-rose)' }} />}
            </button>
          ))}

          <button
            onClick={() => handleNavClick('my-account')}
            style={{
              textAlign: 'left',
              fontSize: '0.95rem',
              color: activeTab === 'my-account' ? 'var(--primary-rose-dark)' : 'var(--text-secondary)',
              padding: '0.6rem 0.5rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderTop: '1px solid var(--border-subtle)',
              marginTop: '0.25rem',
              paddingTop: '0.75rem'
            }}
          >
            <User size={15} /> My Bookings
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginTop: '0.75rem' }}>
            <button
              onClick={() => { startBooking(null, 'salon'); setMobileMenuOpen(false); }}
              className="btn btn-rose btn-sm"
              style={{ width: '100%', fontSize: '0.82rem', padding: '0.6rem 0.4rem' }}
            >
              Salon Booking
            </button>
            <button
              onClick={() => { startBooking(null, 'home'); setMobileMenuOpen(false); }}
              className="btn btn-outline-rose btn-sm"
              style={{ width: '100%', fontSize: '0.82rem', padding: '0.6rem 0.4rem' }}
            >
              Home Service
            </button>
          </div>
        </div>
      )}

      <style>{`
        .btn-short-text { display: none; }
        .btn-full-text { display: inline; }

        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }

        @media (max-width: 480px) {
          .btn-full-text { display: none; }
          .btn-short-text { display: inline; }
          .header-top-tagline { font-size: 0.72rem; }
          .header-logo-subtitle { display: none; }
          .header-book-btn { padding: 0.4rem 0.75rem; }
        }
      `}</style>
    </header>
  );
};
