// src/components/dashboard/AdminTopNav.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  UserCheck,
  LogOut,
  ExternalLink,
  Menu,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';

export const AdminTopNav = ({ searchQuery, setSearchQuery, onToggleDrawer }) => {
  const {
    adminLogout,
    setActiveTab,
    bookings,
    enquiries
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Unread notification count based on pending bookings + enquiries
  const pendingBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending');
  const pendingEnquiries = enquiries.filter(e => e.status === 'Pending');
  const totalAlerts = pendingBookings.length + pendingEnquiries.length;

  return (
    <header className="admin-top-nav">
      {/* Left: Mobile Toggle & Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleDrawer}
          className="btn btn-sm"
          style={{ display: 'none', padding: '0.4rem', border: '1px solid #EEDDE2', borderRadius: '8px' }}
          id="mobile-drawer-toggle"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} color="var(--text-primary)" />
        </button>

        <div className="admin-search-box">
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search Website Data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="admin-search-shortcut">⌘K</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="admin-top-actions">
        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            className="admin-notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <Bell size={18} />
            {totalAlerts > 0 && (
              <span className="admin-notification-badge">{totalAlerts > 9 ? '9+' : totalAlerts}</span>
            )}
          </button>

          {showNotifications && (
            <div
              className="glass-card"
              style={{
                position: 'absolute',
                top: '48px',
                right: '0',
                width: '320px',
                background: '#FFFFFF',
                borderRadius: '14px',
                boxShadow: '0 12px 32px rgba(45, 28, 36, 0.15)',
                border: '1px solid #EEDDE2',
                zIndex: 120,
                padding: '1rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid #F5E8EC' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>Recent Activity Alerts</h4>
                <span className="badge badge-rose" style={{ fontSize: '0.7rem' }}>{totalAlerts} Active</span>
              </div>

              <div style={{ maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {bookings.slice(0, 3).map(b => (
                  <div key={b.id} style={{ fontSize: '0.8rem', padding: '0.5rem', background: '#FDF7F8', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-rose-dark)', fontWeight: '600' }}>
                      <Calendar size={13} /> New Booking: {b.serviceName}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '2px' }}>
                      {b.customerName} • {b.date} ({b.timeSlot})
                    </div>
                  </div>
                ))}

                {enquiries.slice(0, 2).map(e => (
                  <div key={e.id} style={{ fontSize: '0.8rem', padding: '0.5rem', background: '#FDF7F8', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#C29547', fontWeight: '600' }}>
                      <Sparkles size={13} /> New Client Inquiry
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '2px' }}>
                      {e.name} • {e.phone}
                    </div>
                  </div>
                ))}

                {totalAlerts === 0 && (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', padding: '1rem 0' }}>
                    <CheckCircle2 size={24} color="#2ecc71" style={{ margin: '0 auto 0.4rem' }} />
                    All appointments and inquiries are up to date.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Super Admin Pill Badge */}
        <div className="admin-role-pill">
          <UserCheck size={14} />
          <span>Super Admin</span>
        </div>

        {/* Admin Profile Avatar & Dropdown */}
        <div style={{ position: 'relative' }}>
          <div
            className="admin-user-profile-pill"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="admin-avatar-circle">
              N
            </div>
            <div className="admin-profile-info">
              <div className="admin-profile-name">Nanditha J</div>
              <div className="admin-profile-email">nandithaj2005@gmail.com</div>
            </div>
          </div>

          {showUserMenu && (
            <div
              className="glass-card"
              style={{
                position: 'absolute',
                top: '52px',
                right: '0',
                width: '220px',
                background: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 10px 28px rgba(45, 28, 36, 0.12)',
                border: '1px solid #EEDDE2',
                zIndex: 120,
                padding: '0.5rem'
              }}
            >
              <button
                onClick={() => { setActiveTab('home'); setShowUserMenu(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  width: '100%',
                  padding: '0.6rem 0.8rem',
                  fontSize: '0.84rem',
                  color: 'var(--text-primary)',
                  borderRadius: '8px',
                  textAlign: 'left'
                }}
                className="btn-menu-hover"
              >
                <ExternalLink size={15} color="var(--primary-rose)" />
                <span>View Public Website</span>
              </button>

              <button
                onClick={() => { adminLogout(); setShowUserMenu(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  width: '100%',
                  padding: '0.6rem 0.8rem',
                  fontSize: '0.84rem',
                  color: '#e74c3c',
                  borderRadius: '8px',
                  textAlign: 'left',
                  marginTop: '0.2rem'
                }}
                className="btn-menu-hover"
              >
                <LogOut size={15} />
                <span>Log Out Admin</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
