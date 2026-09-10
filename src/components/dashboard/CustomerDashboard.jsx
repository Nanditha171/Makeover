// src/components/dashboard/CustomerDashboard.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, XCircle, FileText, User, Search, ArrowRight } from 'lucide-react';

export const CustomerDashboard = () => {
  const { bookings, myBookingIds, updateBookingStatus, formatPrice, openModal, setActiveTab } = useApp();
  const [searchPhone, setSearchPhone] = useState('');

  // Determine displayed bookings:
  // 1. If user entered a search query (phone or booking ID), filter by that.
  // 2. Otherwise, filter by bookings placed in this device session (myBookingIds).
  const displayedBookings = bookings.filter(b => {
    if (searchPhone.trim().length > 0) {
      const q = searchPhone.trim().toLowerCase();
      const phoneMatch = b.phone && b.phone.toLowerCase().includes(q);
      const idMatch = b.id && b.id.toLowerCase().includes(q);
      const nameMatch = b.customerName && b.customerName.toLowerCase().includes(q);
      return phoneMatch || idMatch || nameMatch;
    }
    // Default: Show bookings belonging to current user device
    return myBookingIds && myBookingIds.includes(b.id);
  });

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking? Advance deposit rules apply according to policy.')) {
      updateBookingStatus(id, 'Cancelled');
    }
  };

  return (
    <div className="customer-dashboard section-padding">
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="section-header">
          <span className="section-subtitle">Customer Portal</span>
          <h2 className="section-title">My Bookings</h2>
          <p className="section-description">
            View your upcoming salon appointments, home vanity services, booking invoices, and payment statuses.
          </p>
        </div>

        {/* Lookup Bar */}
        <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-control"
              placeholder="Look up appointment by Phone Number or Booking ID (e.g. GLOW-1234)..."
              value={searchPhone}
              onChange={e => setSearchPhone(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
          {searchPhone && (
            <button
              onClick={() => setSearchPhone('')}
              className="btn btn-outline-white btn-sm"
            >
              Clear
            </button>
          )}
        </div>

        {/* Bookings List or Clean Empty State */}
        {displayedBookings.length === 0 ? (
          <div className="glass-card empty-state">
            <div className="empty-state-icon">
              <Calendar size={32} />
            </div>
            <h3 className="empty-state-title">
              {searchPhone ? 'No Bookings Found' : 'No Appointments Yet'}
            </h3>
            <p className="empty-state-desc">
              {searchPhone
                ? `No reservation records match "${searchPhone}". Please verify the phone number or booking reference code.`
                : 'You have not made any appointments on this device yet. Explore our bridal packages and beauty services to schedule your session.'}
            </p>
            <button
              onClick={() => setActiveTab('services')}
              className="btn btn-rose btn-sm"
            >
              Explore Services & Book Now <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {displayedBookings.map(b => {
              const isCancelled = b.status === 'Cancelled';
              return (
                <div key={b.id} className="glass-card" style={{ padding: '1.5rem', borderColor: isCancelled ? 'rgba(231,76,60,0.25)' : 'var(--border-rose)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '0.85rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span className="badge badge-rose">#{b.id}</span>
                        <span className={`badge ${isCancelled ? 'badge-red' : 'badge-green'}`}>
                          {b.status}
                        </span>
                        <span className="badge badge-rose" style={{ textTransform: 'capitalize' }}>
                          {b.type === 'home' ? 'Home Service' : 'Salon Studio'}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{b.serviceName}</h3>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Amount</span>
                      <div style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--primary-rose-dark)' }}>
                        {formatPrice(b.totalPrice)}
                      </div>
                    </div>
                  </div>

                  <div className="grid-3" style={{ gap: '0.75rem', fontSize: '0.88rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Calendar size={15} style={{ color: 'var(--primary-rose-dark)' }} />
                      <span>Date: <strong>{b.date}</strong></span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={15} style={{ color: 'var(--primary-rose-dark)' }} />
                      <span>Time: <strong>{b.timeSlot}</strong></span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <User size={15} style={{ color: 'var(--primary-rose-dark)' }} />
                      <span>Client: <strong>{b.customerName}</strong></span>
                    </div>
                  </div>

                  {b.type === 'home' && b.address && (
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '0.65rem 0.85rem', borderRadius: '6px', marginBottom: '1rem', border: '1px solid var(--border-subtle)' }}>
                      <MapPin size={13} style={{ display: 'inline', marginRight: '0.35rem', color: 'var(--primary-rose)' }} />
                      <strong>Address:</strong> {b.address} {b.landmark ? `(${b.landmark})` : ''}
                    </div>
                  )}

                  {/* Financial Breakdown */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(212,106,134,0.06)', padding: '0.65rem 0.85rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
                    <span>Advance Paid: <strong style={{ color: '#2ecc71' }}>{formatPrice(b.advancePaid)}</strong></span>
                    <span>Remaining Balance: <strong style={{ color: 'var(--primary-rose-dark)' }}>{formatPrice(b.remainingAmount)}</strong></span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'flex-end' }}>
                    <button onClick={() => openModal('confirmation', b)} className="btn btn-outline-rose btn-sm">
                      <FileText size={14} /> View Receipt / Invoice
                    </button>
                    {!isCancelled && (
                      <button onClick={() => handleCancel(b.id)} className="btn btn-outline-white btn-sm" style={{ color: '#e74c3c' }}>
                        <XCircle size={14} /> Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
