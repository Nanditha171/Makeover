// src/components/booking/SalonBookingWizard.jsx
import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar as CalendarIcon, Clock, User, CheckCircle2, AlertCircle, Sparkles, MapPin, ArrowRight } from 'lucide-react';

export const SalonBookingWizard = () => {
  const {
    services,
    packages,
    salonInfo,
    selectedBookingItem,
    checkSlotStatus,
    formatPrice,
    openModal
  } = useApp();

  // Wizard state
  const [selectedItem, setSelectedItem] = useState(selectedBookingItem || services[0]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);

  // Customer info state
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const availableTimeSlots = [
    '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM'
  ];

  // Auto update item if selectedBookingItem changed globally
  useEffect(() => {
    if (selectedBookingItem) {
      setSelectedItem(selectedBookingItem);
    }
  }, [selectedBookingItem]);

  const handleProceedToPayment = (e) => {
    e.preventDefault();

    if (!selectedTimeSlot) {
      alert('Please select an available time slot for your appointment.');
      return;
    }

    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    const itemPrice = selectedItem.price * guestsCount;

    const pendingBooking = {
      type: 'salon',
      serviceName: selectedItem.name,
      serviceId: selectedItem.id,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      guestsCount: guestsCount,
      totalPrice: itemPrice,
      customerName: customerInfo.name,
      phone: customerInfo.phone,
      email: customerInfo.email,
      notes: customerInfo.notes
    };

    openModal('payment', pendingBooking);
  };

  return (
    <div className="salon-booking-wizard section-padding">
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className="section-header">
          <span className="section-subtitle">Online Reservation</span>
          <h2 className="section-title">Book Salon Appointment</h2>
          <p className="section-description">
            Select your preferred treatment, date, makeup artist, and time slot. Real-time availability system prevents double-booking.
          </p>
        </div>

        <form onSubmit={handleProceedToPayment} className="grid-2" style={{ gap: '2.5rem', alignItems: 'flex-start' }}>
          {/* Left Column: Booking Form Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Step 1: Service Selection */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary-gold)', color: '#000', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>1</div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Select Service or Package</h3>
              </div>

              <div className="form-group">
                <select
                  className="form-control"
                  value={selectedItem.id}
                  onChange={(e) => {
                    const found = services.find(s => s.id === e.target.value) || packages.find(p => p.id === e.target.value);
                    if (found) setSelectedItem(found);
                  }}
                >
                  <optgroup label="Popular Services">
                    {services.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {formatPrice(s.price)}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Bridal Packages">
                    {packages.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {formatPrice(p.price)}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Number of People / Clients</label>
                <select
                  className="form-control"
                  value={guestsCount}
                  onChange={e => setGuestsCount(parseInt(e.target.value))}
                >
                  <option value={1}>1 Person</option>
                  <option value={2}>2 Persons (Bridal + 1 Bridesmaid)</option>
                  <option value={3}>3 Persons (Group)</option>
                  <option value={4}>4+ Persons (Bridal Party)</option>
                </select>
              </div>
            </div>

            {/* Step 2: Date & Available Time Slot */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary-gold)', color: '#000', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>2</div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Pick Appointment Date & Time</h3>
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Appointment Date</label>
                <input
                  type="date"
                  className="form-control"
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={e => {
                    setSelectedDate(e.target.value);
                    setSelectedTimeSlot('');
                  }}
                />
              </div>

              {/* Real-time Time Slots Grid */}
              <div>
                <label className="form-label" style={{ marginBottom: '0.6rem' }}>Available Time Slots for {selectedDate}</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                  {availableTimeSlots.map(slot => {
                    const status = checkSlotStatus(selectedDate, slot);
                    const isSelected = selectedTimeSlot === slot;
                    const isDisabled = status === 'blocked' || status === 'booked';

                    let badgeColor = '#2ecc71';
                    if (isDisabled) badgeColor = '#e74c3c';

                    return (
                      <button
                        type="button"
                        key={slot}
                        disabled={isDisabled}
                        onClick={() => setSelectedTimeSlot(slot)}
                        style={{
                          padding: '0.75rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          border: isSelected ? '2px solid var(--primary-gold)' : '1px solid var(--border-subtle)',
                          background: isSelected ? 'rgba(212,175,55,0.15)' : isDisabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
                          color: isDisabled ? 'var(--text-muted)' : 'var(--text-primary)',
                          cursor: isDisabled ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.2rem',
                          opacity: isDisabled ? 0.5 : 1
                        }}
                      >
                        <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>{slot}</span>
                        <span style={{ fontSize: '0.68rem', color: badgeColor, fontWeight: '700' }}>
                          {status === 'available' ? '● Available' : '✕ Booked'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Customer Details */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary-gold)', color: '#000', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>3</div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Customer Details</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Radhika Sen"
                    value={customerInfo.name}
                    onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={customerInfo.phone}
                    onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address (for receipt)</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="radhika@gmail.com"
                  value={customerInfo.email}
                  onChange={e => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Special Skin Requests / Preferences</label>
                <textarea
                  rows={2}
                  className="form-control"
                  placeholder="e.g. Sensitive skin, request natural nude lip shade..."
                  value={customerInfo.notes}
                  onChange={e => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Price Summary Card */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border-gold)', boxShadow: 'var(--shadow-glow)' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Booking Summary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Service:</span>
                  <strong style={{ color: 'var(--primary-gold)' }}>{selectedItem.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>People:</span>
                  <span>{guestsCount} Person(s)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Date:</span>
                  <span>{selectedDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Time Slot:</span>
                  <span style={{ color: selectedTimeSlot ? 'var(--primary-rose)' : '#e74c3c', fontWeight: '600' }}>
                    {selectedTimeSlot || 'Not Selected Yet'}
                  </span>
                </div>
              </div>

              {/* Price Calculation */}
              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Total Amount:</span>
                  <span>{formatPrice(selectedItem.price * guestsCount)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary-gold)', fontWeight: '600' }}>
                  <span>Advance Deposit (30%):</span>
                  <span>{formatPrice(Math.round((selectedItem.price * guestsCount * salonInfo.advancePercent) / 100))}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                  <span>Remaining at Salon:</span>
                  <span>{formatPrice((selectedItem.price * guestsCount) - Math.round((selectedItem.price * guestsCount * salonInfo.advancePercent) / 100))}</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-gold"
                style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}
              >
                Proceed to Payment <ArrowRight size={18} />
              </button>

              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem' }}>
                🔒 100% Secure Transaction. Free cancellation up to 7 days before appointment.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
