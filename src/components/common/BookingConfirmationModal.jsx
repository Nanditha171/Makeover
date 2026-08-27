// src/components/common/BookingConfirmationModal.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Calendar, Clock, MapPin, User, Download, Share2, MessageCircle, X } from 'lucide-react';

export const BookingConfirmationModal = () => {
  const { modalState, closeModal, formatPrice, salonInfo } = useApp();

  if (!modalState.isOpen || modalState.type !== 'confirmation' || !modalState.data) return null;

  const booking = modalState.data;

  // Google Calendar Integration Link Generator
  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Aura Beauty Appointment: ${booking.serviceName}`);
    const details = encodeURIComponent(`Booking ID: ${booking.id}\nArtist: ${booking.artistName}\nAdvance Paid: ${formatPrice(booking.advancePaid)}\nBalance Due: ${formatPrice(booking.remainingAmount)}`);
    const location = encodeURIComponent(booking.type === 'home' ? booking.address : salonInfo.address);

    const dateStr = booking.date.replace(/-/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateStr}T100000Z/${dateStr}T120000Z`;
  };

  // WhatsApp Share Message
  const shareToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${salonInfo.name}! My Booking ID is ${booking.id} for ${booking.serviceName} on ${booking.date} at ${booking.timeSlot}. Looking forward!`
    );
    window.open(`https://wa.me/${salonInfo.whatsapp}?text=${text}`, '_blank');
  };

  // Print Receipt
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" style={{ maxWidth: '620px' }}>
        <div className="modal-header" style={{ background: 'var(--gold-gradient)', color: '#000' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <CheckCircle2 size={24} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#000' }}>Booking Confirmed!</h3>
          </div>
          <button onClick={closeModal} style={{ color: '#000', padding: '0.2rem' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ background: 'var(--bg-card)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div className="badge badge-gold" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem', marginBottom: '0.5rem' }}>
              Booking ID: #{booking.id}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              A confirmation WhatsApp message & receipt email have been sent to <strong>{booking.phone}</strong>.
            </p>
          </div>

          {/* Booking Summary Box */}
          <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border-gold)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Service / Package</span>
              <strong style={{ color: 'var(--primary-gold)' }}>{booking.serviceName}</strong>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={16} style={{ color: 'var(--primary-rose)' }} />
                <span>Date: {booking.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} style={{ color: 'var(--primary-gold)' }} />
                <span>Slot: {booking.timeSlot}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={16} style={{ color: 'var(--primary-rose)' }} />
                <span>Customer: {booking.customerName}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={16} style={{ color: 'var(--primary-gold)' }} />
                <span>Type: {booking.type === 'home' ? 'Home Service' : 'Salon Appointment'}</span>
              </div>
            </div>

            {booking.type === 'home' && (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '6px', marginBottom: '0.75rem' }}>
                <strong>Address:</strong> {booking.address} ({booking.landmark})
              </div>
            )}

            {/* Financial Breakdown */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span>Total Amount:</span>
                <span>{formatPrice(booking.totalPrice)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: '#2ecc71' }}>
                <span>Advance Paid (30% / Deposit):</span>
                <span>- {formatPrice(booking.advancePaid)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.05rem', color: 'var(--primary-gold)', paddingTop: '0.4rem', borderTop: '1px dashed var(--border-gold)' }}>
                <span>Balance Due at Appointment:</span>
                <span>{formatPrice(booking.remainingAmount)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-white btn-sm"
                style={{ flex: 1, textDecoration: 'none' }}
              >
                <Calendar size={16} /> Add to Calendar
              </a>
              <button
                onClick={shareToWhatsApp}
                className="btn btn-outline-gold btn-sm"
                style={{ flex: 1, color: '#2ecc71', borderColor: '#2ecc71' }}
              >
                <MessageCircle size={16} /> Send to WhatsApp
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={handlePrint} className="btn btn-outline-white btn-sm" style={{ flex: 1 }}>
                <Download size={16} /> Download Receipt / Print
              </button>
              <button onClick={closeModal} className="btn btn-gold btn-sm" style={{ flex: 1 }}>
                Done & Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
