// src/components/common/BookingConfirmationModal.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Calendar, Clock, MapPin, User, Download, MessageCircle, X } from 'lucide-react';

export const BookingConfirmationModal = () => {
  const { modalState, closeModal, formatPrice, salonInfo } = useApp();

  if (!modalState.isOpen || modalState.type !== 'confirmation' || !modalState.data) return null;

  const booking = modalState.data;

  // Google Calendar Integration Link Generator
  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Aura Beauty Makeover: ${booking.serviceName}`);
    const details = encodeURIComponent(`Booking ID: ${booking.id}\nCustomer: ${booking.customerName}\nAdvance Paid: ${formatPrice(booking.advancePaid)}\nBalance Due: ${formatPrice(booking.remainingAmount)}`);
    const location = encodeURIComponent(booking.type === 'home' ? booking.address : salonInfo.address);

    const dateStr = booking.date ? booking.date.replace(/-/g, '') : '20260315';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateStr}T100000Z/${dateStr}T120000Z`;
  };

  // WhatsApp Share Message
  const shareToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${salonInfo.name}! My appointment is confirmed (Booking ID: ${booking.id}) for ${booking.serviceName} on ${booking.date} at ${booking.timeSlot}. Thank you!`
    );
    window.open(`https://wa.me/${salonInfo.whatsapp}?text=${text}`, '_blank');
  };

  // Print Receipt
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-container" style={{ maxWidth: '560px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ background: 'var(--rose-gradient)', color: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <CheckCircle2 size={22} style={{ color: '#FFFFFF' }} />
            <h3 style={{ fontSize: '1.18rem', fontWeight: '700', color: '#FFFFFF' }}>Booking Confirmed!</h3>
          </div>
          <button onClick={closeModal} style={{ color: '#FFFFFF', padding: '0.4rem' }} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ textAlign: 'center', marginBottom: '1.15rem' }}>
            <div className="badge badge-rose" style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem', marginBottom: '0.4rem' }}>
              Booking Reference: #{booking.id}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
              Your appointment has been reserved. A confirmation has been logged to your account.
            </p>
          </div>

          {/* Booking Summary Box */}
          <div className="glass-card" style={{ padding: '1.15rem', marginBottom: '1.15rem', borderColor: 'var(--border-rose)', background: 'var(--bg-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '0.65rem', gap: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Service / Package:</span>
              <strong style={{ color: 'var(--primary-rose-dark)', fontSize: '0.92rem', textAlign: 'right' }}>{booking.serviceName}</strong>
            </div>

            <div className="form-row-2" style={{ gap: '0.5rem', fontSize: '0.86rem', marginBottom: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} style={{ color: 'var(--primary-rose-dark)', flexShrink: 0 }} />
                <span>Date: <strong>{booking.date}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={14} style={{ color: 'var(--primary-rose-dark)', flexShrink: 0 }} />
                <span>Time: <strong>{booking.timeSlot}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={14} style={{ color: 'var(--primary-rose-dark)', flexShrink: 0 }} />
                <span>Client: <strong>{booking.customerName}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={14} style={{ color: 'var(--primary-rose-dark)', flexShrink: 0 }} />
                <span>Type: <strong>{booking.type === 'home' ? 'Home Service' : 'Studio'}</strong></span>
              </div>
            </div>

            {booking.type === 'home' && booking.address && (
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', background: '#FFFFFF', padding: '0.5rem 0.75rem', borderRadius: '6px', marginBottom: '0.65rem', border: '1px solid var(--border-subtle)', wordBreak: 'break-word' }}>
                <strong>Address:</strong> {booking.address} {booking.landmark ? `(${booking.landmark})` : ''}
              </div>
            )}

            {/* Financial Breakdown */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.55rem', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Amount:</span>
                <span>{formatPrice(booking.totalPrice)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', color: '#2ecc71' }}>
                <span>Advance Paid:</span>
                <span>- {formatPrice(booking.advancePaid)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '0.98rem', color: 'var(--primary-rose-dark)', paddingTop: '0.35rem', borderTop: '1px dashed var(--border-rose)' }}>
                <span>Balance Due at Appointment:</span>
                <span>{formatPrice(booking.remainingAmount)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div className="btn-group-responsive">
              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-white btn-sm"
                style={{ flex: 1, textDecoration: 'none' }}
              >
                <Calendar size={15} /> Add to Calendar
              </a>
              <button
                onClick={shareToWhatsApp}
                className="btn btn-outline-white btn-sm"
                style={{ flex: 1, color: '#2ecc71', borderColor: 'rgba(46,204,113,0.3)' }}
              >
                <MessageCircle size={15} /> Chat on WhatsApp
              </button>
            </div>

            <div className="btn-group-responsive">
              <button onClick={handlePrint} className="btn btn-outline-white btn-sm" style={{ flex: 1 }}>
                <Download size={15} /> Print Receipt
              </button>
              <button onClick={closeModal} className="btn btn-rose btn-sm" style={{ flex: 1 }}>
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
