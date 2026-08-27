// src/components/common/PaymentModal.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { CreditCard, QrCode, ShieldCheck, Lock, Sparkles, Check, ArrowRight, X } from 'lucide-react';

export const PaymentModal = () => {
  const { modalState, closeModal, openModal, createBooking, formatPrice, salonInfo } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [isProcessing, setIsProcessing] = useState(false);

  if (!modalState.isOpen || modalState.type !== 'payment' || !modalState.data) return null;

  const pendingBooking = modalState.data;

  // Calculate Advance Deposit Amount
  const advanceAmount = salonInfo.usePercentageAdvance
    ? Math.round((pendingBooking.totalPrice * salonInfo.advancePercent) / 100)
    : Math.min(salonInfo.fixedAdvanceAmount, pendingBooking.totalPrice);

  const remainingAmount = pendingBooking.totalPrice - advanceAmount;

  const handlePayNow = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      // Create actual booking record in state & localStorage
      const confirmedBooking = createBooking({
        ...pendingBooking,
        advancePaid: advanceAmount,
        remainingAmount: remainingAmount,
        paymentMethod: paymentMethod
      });

      setIsProcessing(false);

      // Trigger Confetti Celebration!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Switch to Confirmation Modal
      openModal('confirmation', confirmedBooking);
    }, 1200);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" style={{ maxWidth: '580px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={18} style={{ color: 'var(--primary-gold)' }} />
            <h3 style={{ fontSize: '1.2rem' }}>Secure Booking Advance Payment</h3>
          </div>
          <button onClick={closeModal} style={{ color: 'var(--text-secondary)' }}><X size={20} /></button>
        </div>

        <div className="modal-body">
          {/* Summary Box */}
          <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'rgba(212, 175, 55, 0.04)', borderColor: 'var(--border-gold)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              <span>Booking Item:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{pendingBooking.serviceName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              <span>Scheduled Date & Time:</span>
              <span>{pendingBooking.date} at {pendingBooking.timeSlot}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              <span>Total Service Price:</span>
              <span>{formatPrice(pendingBooking.totalPrice)}</span>
            </div>
            <div style={{ borderTop: '1px solid var(--border-gold)', paddingTop: '0.6rem', display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
              <span style={{ color: 'var(--primary-rose)' }}>Advance Deposit Required ({salonInfo.advancePercent}%):</span>
              <span style={{ color: 'var(--primary-gold)', fontSize: '1.2rem' }}>{formatPrice(advanceAmount)}</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '0.2rem' }}>
              Remaining {formatPrice(remainingAmount)} payable at appointment.
            </div>
          </div>

          {/* Payment Method Selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ marginBottom: '0.75rem' }}>Select Payment Method</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`glass-card ${paymentMethod === 'upi' ? 'glass-card-rose' : ''}`}
                style={{
                  padding: '0.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.4rem',
                  borderColor: paymentMethod === 'upi' ? 'var(--primary-gold)' : 'var(--border-subtle)',
                  background: paymentMethod === 'upi' ? 'rgba(212,175,55,0.1)' : 'transparent'
                }}
              >
                <QrCode size={24} style={{ color: 'var(--primary-gold)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>UPI / QR Code</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`glass-card ${paymentMethod === 'card' ? 'glass-card-rose' : ''}`}
                style={{
                  padding: '0.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.4rem',
                  borderColor: paymentMethod === 'card' ? 'var(--primary-gold)' : 'var(--border-subtle)',
                  background: paymentMethod === 'card' ? 'rgba(212,175,55,0.1)' : 'transparent'
                }}
              >
                <CreditCard size={24} style={{ color: 'var(--primary-rose)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Cards / EMI</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`glass-card ${paymentMethod === 'netbanking' ? 'glass-card-rose' : ''}`}
                style={{
                  padding: '0.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.4rem',
                  borderColor: paymentMethod === 'netbanking' ? 'var(--primary-gold)' : 'var(--border-subtle)',
                  background: paymentMethod === 'netbanking' ? 'rgba(212,175,55,0.1)' : 'transparent'
                }}
              >
                <ShieldCheck size={24} style={{ color: '#2ecc71' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Net Banking</span>
              </button>
            </div>
          </div>

          {/* Payment Method Screen Details */}
          {paymentMethod === 'upi' && (
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Scan with Google Pay, PhonePe, Paytm, or BHIM:
              </p>
              <div style={{ width: '140px', height: '140px', background: '#fff', margin: '0 auto 0.75rem auto', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v20 h-10 z M40,40 h20 v20 h-20 z M70,50 h20 v20 h-20 z M50,80 h30 v10 h-30 z" fill="#000" />
                </svg>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--primary-gold)', fontWeight: '600' }}>UPI ID: aura.studio@icici</p>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <input type="text" className="form-control" placeholder="Card Number (4000 1234 5678 9010)" defaultValue="4242 4242 4242 4242" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <input type="text" className="form-control" placeholder="MM/YY" defaultValue="12/28" />
                <input type="password" className="form-control" placeholder="CVV" defaultValue="123" />
              </div>
            </div>
          )}

          {paymentMethod === 'netbanking' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <select className="form-control">
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>State Bank of India</option>
                <option>Axis Bank</option>
              </select>
            </div>
          )}

          {/* Pay Button */}
          <button
            onClick={handlePayNow}
            disabled={isProcessing}
            className="btn btn-gold"
            style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}
          >
            {isProcessing ? 'Processing Secure Payment...' : `Pay Advance Deposit ${formatPrice(advanceAmount)} & Confirm`}
          </button>
        </div>
      </div>
    </div>
  );
};
