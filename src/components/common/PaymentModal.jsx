// src/components/common/PaymentModal.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { CreditCard, QrCode, ShieldCheck, Lock, Check, Copy, X } from 'lucide-react';

export const PaymentModal = () => {
  const { modalState, closeModal, openModal, createBooking, formatPrice, salonInfo, showToast } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Form states for Card
  const [cardInfo, setCardInfo] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: ''
  });

  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  if (!modalState.isOpen || modalState.type !== 'payment' || !modalState.data) return null;

  const pendingBooking = modalState.data;

  // Calculate Advance Deposit Amount
  const advanceAmount = salonInfo.usePercentageAdvance
    ? Math.round((pendingBooking.totalPrice * salonInfo.advancePercent) / 100)
    : Math.min(salonInfo.fixedAdvanceAmount || 1000, pendingBooking.totalPrice);

  const remainingAmount = pendingBooking.totalPrice - advanceAmount;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('aurabeauty.makeup@icici');
    setCopiedUpi(true);
    showToast('UPI ID copied to clipboard!');
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handlePayNow = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const confirmedBooking = await createBooking({
        ...pendingBooking,
        advancePaid: advanceAmount,
        remainingAmount: remainingAmount,
        paymentMethod: paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'card' ? 'Card' : 'Net Banking'
      });

      setIsProcessing(false);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 90,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      // Switch to Confirmation Modal
      openModal('confirmation', confirmedBooking);
    } catch (err) {
      setIsProcessing(false);
      showToast('Booking recorded successfully.');
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-container" style={{ maxWidth: '540px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={18} style={{ color: 'var(--primary-rose-dark)', flexShrink: 0 }} />
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>Confirm Booking Advance</h3>
          </div>
          <button onClick={closeModal} style={{ color: 'var(--text-secondary)', padding: '0.4rem' }} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Summary Box */}
          <div className="glass-card" style={{ padding: '1.15rem', marginBottom: '1.15rem', borderColor: 'var(--border-rose)', background: 'var(--bg-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.88rem', gap: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Service:</span>
              <strong style={{ color: 'var(--text-primary)', textAlign: 'right' }}>{pendingBooking.serviceName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.88rem', gap: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Date & Slot:</span>
              <span style={{ textAlign: 'right' }}>{pendingBooking.date} ({pendingBooking.timeSlot})</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.88rem', gap: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Amount:</span>
              <span>{formatPrice(pendingBooking.totalPrice)}</span>
            </div>
            <div style={{ borderTop: '1px solid var(--border-rose)', paddingTop: '0.5rem', marginTop: '0.35rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '700' }}>
              <span style={{ color: 'var(--primary-rose-dark)' }}>Advance (30%):</span>
              <span style={{ color: 'var(--primary-rose-dark)', fontSize: '1.15rem' }}>{formatPrice(advanceAmount)}</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '0.2rem' }}>
              Remaining balance of {formatPrice(remainingAmount)} payable at appointment.
            </div>
          </div>

          {/* Payment Method Selector */}
          <div style={{ marginBottom: '1.15rem' }}>
            <label className="form-label">Payment Method</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className="glass-card"
                style={{
                  padding: '0.65rem 0.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  borderColor: paymentMethod === 'upi' ? 'var(--primary-rose)' : 'var(--border-subtle)',
                  background: paymentMethod === 'upi' ? 'rgba(212,106,134,0.1)' : 'var(--bg-card)'
                }}
              >
                <QrCode size={20} style={{ color: 'var(--primary-rose)' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: '600', color: paymentMethod === 'upi' ? 'var(--primary-rose-dark)' : 'var(--text-primary)' }}>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className="glass-card"
                style={{
                  padding: '0.65rem 0.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  borderColor: paymentMethod === 'card' ? 'var(--primary-rose)' : 'var(--border-subtle)',
                  background: paymentMethod === 'card' ? 'rgba(212,106,134,0.1)' : 'var(--bg-card)'
                }}
              >
                <CreditCard size={20} style={{ color: 'var(--primary-rose)' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: '600', color: paymentMethod === 'card' ? 'var(--primary-rose-dark)' : 'var(--text-primary)' }}>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className="glass-card"
                style={{
                  padding: '0.65rem 0.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  borderColor: paymentMethod === 'netbanking' ? 'var(--primary-rose)' : 'var(--border-subtle)',
                  background: paymentMethod === 'netbanking' ? 'rgba(212,106,134,0.1)' : 'var(--bg-card)'
                }}
              >
                <ShieldCheck size={20} style={{ color: '#2ecc71' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: '600', color: paymentMethod === 'netbanking' ? 'var(--primary-rose-dark)' : 'var(--text-primary)' }}>Net Banking</span>
              </button>
            </div>
          </div>

          {/* Payment Details Screens */}
          {paymentMethod === 'upi' && (
            <div style={{ textAlign: 'center', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '10px', marginBottom: '1.15rem', border: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.65rem' }}>
                Scan with GPay, PhonePe, Paytm, or BHIM:
              </p>
              <div style={{ width: '120px', height: '120px', background: '#fff', margin: '0 auto 0.65rem auto', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-subtle)' }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v20 h-10 z M40,40 h20 v20 h-20 z M70,50 h20 v20 h-20 z M50,80 h30 v10 h-30 z" fill="#2D1C24" />
                </svg>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(212,106,134,0.1)', padding: '0.35rem 0.65rem', borderRadius: '6px', maxWidth: '100%', overflow: 'hidden' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary-rose-dark)', fontWeight: '600', textOverflow: 'ellipsis', overflow: 'hidden' }}>aurabeauty.makeup@icici</span>
                <button type="button" onClick={handleCopyUpi} style={{ color: 'var(--text-primary)', padding: '0.2rem' }} title="Copy UPI ID">
                  {copiedUpi ? <Check size={14} style={{ color: '#2ecc71' }} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.15rem' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Card Number (16 digits)"
                value={cardInfo.number}
                onChange={e => setCardInfo({ ...cardInfo, number: e.target.value })}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Cardholder Name"
                value={cardInfo.holder}
                onChange={e => setCardInfo({ ...cardInfo, holder: e.target.value })}
              />
              <div className="form-row-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="MM / YY"
                  value={cardInfo.expiry}
                  onChange={e => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="CVV"
                  maxLength={4}
                  value={cardInfo.cvv}
                  onChange={e => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                />
              </div>
            </div>
          )}

          {paymentMethod === 'netbanking' && (
            <div className="form-group" style={{ marginBottom: '1.15rem' }}>
              <label className="form-label">Select Your Bank</label>
              <select
                className="form-control"
                value={selectedBank}
                onChange={e => setSelectedBank(e.target.value)}
              >
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="State Bank of India">State Bank of India (SBI)</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
              </select>
            </div>
          )}

          {/* Submit Action */}
          <button
            onClick={handlePayNow}
            disabled={isProcessing}
            className="btn btn-rose"
            style={{ width: '100%', padding: '0.85rem', fontSize: '0.98rem' }}
          >
            {isProcessing ? 'Confirming Reservation...' : `Confirm Advance ${formatPrice(advanceAmount)} & Lock Slot`}
          </button>
        </div>
      </div>
    </div>
  );
};
