// src/components/dashboard/CustomerDashboard.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, FileText, User } from 'lucide-react';

export const CustomerDashboard = () => {
  const { bookings, updateBookingStatus, formatPrice, openModal, setActiveTab } = useApp();

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking? Advance refund rules will apply according to policy.')) {
      updateBookingStatus(id, 'Cancelled');
    }
  };

  return (
    <div className="customer-dashboard section-padding">
      <div className="container" style={{ maxWidth: '950px' }}>
        <div className="section-header">
          <span className="section-subtitle">Customer Portal</span>
          <h2 className="section-title">My Account & Bookings</h2>
          <p className="section-description">
            Track your upcoming salon appointments, home service orders, payments, and invoices.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
            <Calendar size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No Bookings Found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>You haven't placed any salon or home service bookings yet.</p>
            <button onClick={() => setActiveTab('services')} className="btn btn-gold">
              Explore Services & Book
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {bookings.map(b => {
              const isCancelled = b.status === 'Cancelled';
              return (
                <div key={b.id} className="glass-card" style={{ padding: '1.75rem', borderColor: isCancelled ? 'rgba(231,76,60,0.3)' : 'var(--border-gold)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                        <span className="badge badge-gold">#{b.id}</span>
                        <span className={`badge ${isCancelled ? 'badge-red' : 'badge-green'}`}>
                          {b.status}
                        </span>
                        <span className="badge badge-rose" style={{ textTransform: 'capitalize' }}>
                          {b.type === 'home' ? 'Home Delivery' : 'Salon Appointment'}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>{b.serviceName}</h3>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Amount</span>
                      <div style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--primary-gold)' }}>
                        {formatPrice(b.totalPrice)}
                      </div>
                    </div>
                  </div>

                  <div className="grid-3" style={{ gap: '1rem', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={16} style={{ color: 'var(--primary-rose)' }} />
                      <span>Date: <strong>{b.date}</strong></span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={16} style={{ color: 'var(--primary-gold)' }} />
                      <span>Time: <strong>{b.timeSlot}</strong></span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <User size={16} style={{ color: 'var(--primary-rose)' }} />
                      <span>Customer: <strong>{b.customerName}</strong></span>
                    </div>
                  </div>

                  {b.type === 'home' && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
                      <MapPin size={14} style={{ display: 'inline', marginRight: '0.4rem', color: 'var(--primary-gold)' }} />
                      <strong>Address:</strong> {b.address} ({b.landmark})
                    </div>
                  )}

                  {/* Financial Breakdown */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(212,175,55,0.04)', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
                    <span>Advance Paid: <strong style={{ color: '#2ecc71' }}>{formatPrice(b.advancePaid)}</strong></span>
                    <span>Remaining Balance: <strong style={{ color: 'var(--primary-gold)' }}>{formatPrice(b.remainingAmount)}</strong></span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                    <button onClick={() => openModal('confirmation', b)} className="btn btn-outline-gold btn-sm">
                      <FileText size={15} /> View Receipt & Invoice
                    </button>
                    {!isCancelled && (
                      <button onClick={() => handleCancel(b.id)} className="btn btn-outline-white btn-sm" style={{ color: '#e74c3c' }}>
                        <XCircle size={15} /> Cancel Booking
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
