// src/components/booking/SalonBookingWizard.jsx
import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar as CalendarIcon, Clock, User, CheckCircle2, MapPin, ArrowRight, Home, Sparkles, Building2 } from 'lucide-react';

export const SalonBookingWizard = ({ initialMode = 'salon' }) => {
  const {
    services,
    packages,
    salonInfo,
    selectedBookingItem,
    bookingType,
    setBookingType,
    checkSlotStatus,
    formatPrice,
    openModal
  } = useApp();

  // Wizard state
  const [bookingMode, setBookingMode] = useState(bookingType || initialMode); // 'salon' | 'home'
  const [selectedItem, setSelectedItem] = useState(() => selectedBookingItem || services[0] || {});
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
    address: '',
    landmark: '',
    notes: ''
  });

  const availableTimeSlots = [
    '06:00 AM', '08:30 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM'
  ];

  // Auto update item if selectedBookingItem changed globally
  useEffect(() => {
    if (selectedBookingItem) {
      setSelectedItem(selectedBookingItem);
    }
  }, [selectedBookingItem]);

  useEffect(() => {
    if (bookingType) {
      setBookingMode(bookingType);
    }
  }, [bookingType]);

  // Price calculations
  const baseServicePrice = (selectedItem?.price || 0) * guestsCount;
  const travelFee = bookingMode === 'home' ? (salonInfo.homeServiceCharge || 500) : 0;
  const totalOrderPrice = baseServicePrice + travelFee;

  const advanceDeposit = salonInfo.usePercentageAdvance
    ? Math.round((totalOrderPrice * salonInfo.advancePercent) / 100)
    : Math.min(salonInfo.fixedAdvanceAmount || 1000, totalOrderPrice);

  const remainingBalance = totalOrderPrice - advanceDeposit;

  const handleProceedToPayment = (e) => {
    e.preventDefault();

    if (!selectedTimeSlot) {
      alert('Please select an available appointment time slot.');
      return;
    }

    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please enter your full name and phone number.');
      return;
    }

    if (bookingMode === 'home' && !customerInfo.address) {
      alert('Please enter your venue or home address for doorstep service.');
      return;
    }

    const pendingBooking = {
      type: bookingMode,
      serviceName: selectedItem.name,
      serviceId: selectedItem.id,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      guestsCount: guestsCount,
      totalPrice: totalOrderPrice,
      homeServiceFee: travelFee,
      customerName: customerInfo.name,
      phone: customerInfo.phone,
      email: customerInfo.email,
      address: bookingMode === 'home' ? customerInfo.address : salonInfo.address,
      landmark: customerInfo.landmark,
      notes: customerInfo.notes
    };

    openModal('payment', pendingBooking);
  };

  return (
    <div className="booking-wizard section-padding">
      <div className="container" style={{ maxWidth: '980px' }}>
        <div className="section-header">
          <span className="section-subtitle">Online Reservation</span>
          <h2 className="section-title">Book an Appointment</h2>
          <p className="section-description">
            Choose between visiting our Jubilee Hills studio or enjoying doorstep vanity service at your home or wedding venue.
          </p>
        </div>

        {/* Location Type Selector Switch */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
          <button
            type="button"
            onClick={() => { setBookingMode('salon'); setBookingType('salon'); }}
            className="glass-card"
            style={{
              padding: '1.25rem',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              borderColor: bookingMode === 'salon' ? 'var(--primary-rose)' : 'var(--border-subtle)',
              background: bookingMode === 'salon' ? 'rgba(212,106,134,0.08)' : 'var(--bg-card)'
            }}
          >
            <div style={{
              width: '42px', height: '42px', borderRadius: '50%',
              background: bookingMode === 'salon' ? 'var(--rose-gradient)' : 'rgba(212,106,134,0.1)',
              color: bookingMode === 'salon' ? '#FFFFFF' : 'var(--text-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Building2 size={22} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1.05rem', color: bookingMode === 'salon' ? 'var(--primary-rose-dark)' : 'var(--text-primary)' }}>
                At Salon Studio
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Plot 42, Jubilee Hills Studio
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => { setBookingMode('home'); setBookingType('home'); }}
            className="glass-card"
            style={{
              padding: '1.25rem',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              borderColor: bookingMode === 'home' ? 'var(--primary-rose)' : 'var(--border-subtle)',
              background: bookingMode === 'home' ? 'rgba(212,106,134,0.08)' : 'var(--bg-card)'
            }}
          >
            <div style={{
              width: '42px', height: '42px', borderRadius: '50%',
              background: bookingMode === 'home' ? 'var(--rose-gradient)' : 'rgba(212,106,134,0.1)',
              color: bookingMode === 'home' ? '#FFFFFF' : 'var(--text-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Home size={22} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1.05rem', color: bookingMode === 'home' ? 'var(--primary-rose-dark)' : 'var(--text-primary)' }}>
                Doorstep Home & Venue Service
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Certified artist visits with vanity setup (+₹500)
              </div>
            </div>
          </button>
        </div>

        <form onSubmit={handleProceedToPayment} className="grid-2" style={{ gap: '2.5rem', alignItems: 'flex-start' }}>
          {/* Left Column: Booking Form Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Step 1: Service Selection */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                1. Select Treatment / Package
              </h3>

              <div className="form-group">
                <label className="form-label">Service or Bridal Package</label>
                <select
                  className="form-control"
                  value={selectedItem?.id || ''}
                  onChange={(e) => {
                    const found = services.find(s => s.id === e.target.value) || packages.find(p => p.id === e.target.value);
                    if (found) setSelectedItem(found);
                  }}
                >
                  <optgroup label="Services">
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
                  <option value={2}>2 Persons (Bride + 1 Guest)</option>
                  <option value={3}>3 Persons (Group)</option>
                  <option value={4}>4+ Persons (Bridal Party)</option>
                </select>
              </div>
            </div>

            {/* Step 2: Date & Available Time Slot */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                2. Pick Date & Available Time Slot
              </h3>

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

              {/* Time Slots Grid */}
              <div>
                <label className="form-label" style={{ marginBottom: '0.6rem' }}>Available Time Slots for {selectedDate}</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {availableTimeSlots.map(slot => {
                    const status = checkSlotStatus(selectedDate, slot);
                    const isSelected = selectedTimeSlot === slot;
                    const isDisabled = status === 'blocked' || status === 'booked';

                    return (
                      <button
                        type="button"
                        key={slot}
                        disabled={isDisabled}
                        onClick={() => setSelectedTimeSlot(slot)}
                        style={{
                          padding: '0.65rem 0.4rem',
                          borderRadius: 'var(--radius-sm)',
                          border: isSelected ? '2px solid var(--primary-rose)' : '1px solid var(--border-subtle)',
                          background: isSelected ? 'rgba(212,106,134,0.14)' : isDisabled ? 'rgba(0,0,0,0.03)' : '#FFFFFF',
                          color: isDisabled ? 'var(--text-muted)' : isSelected ? 'var(--primary-rose-dark)' : 'var(--text-primary)',
                          cursor: isDisabled ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.2rem',
                          opacity: isDisabled ? 0.4 : 1,
                          fontWeight: isSelected ? '700' : '500'
                        }}
                      >
                        <span style={{ fontSize: '0.84rem' }}>{slot}</span>
                        <span style={{ fontSize: '0.65rem', color: isDisabled ? '#e74c3c' : '#2ecc71', fontWeight: '700' }}>
                          {status === 'available' ? 'Available' : 'Booked'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Customer Details & Address */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                3. Customer Contact Details
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Enter full name"
                    value={customerInfo.name}
                    onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder="Enter contact number"
                    value={customerInfo.phone}
                    onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email (for confirmation receipt)</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="your.email@example.com"
                  value={customerInfo.email}
                  onChange={e => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                />
              </div>

              {bookingMode === 'home' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Full Venue / Home Address *</label>
                    <textarea
                      rows={2}
                      required
                      className="form-control"
                      placeholder="Enter flat/house no., building name, street, area..."
                      value={customerInfo.address}
                      onChange={e => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Landmark</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Near Apollo Hospital, Road No 36"
                      value={customerInfo.landmark}
                      onChange={e => setCustomerInfo({ ...customerInfo, landmark: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Special Requests / Preferences</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Sensitive skin, skin prep inquiry..."
                  value={customerInfo.notes}
                  onChange={e => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Price Summary Card */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <div className="glass-card" style={{ padding: '1.75rem', border: '1px solid var(--border-rose)' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Booking Summary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Location:</span>
                  <span style={{ fontWeight: '600', color: 'var(--primary-rose-dark)' }}>
                    {bookingMode === 'home' ? 'Doorstep Home Service' : 'Jubilee Hills Studio'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Service:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{selectedItem?.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>People:</span>
                  <span>{guestsCount} Person(s)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Date & Time:</span>
                  <span>{selectedDate} ({selectedTimeSlot || 'Slot not selected'})</span>
                </div>
              </div>

              {/* Price Calculation */}
              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Service Cost:</span>
                  <span>{formatPrice(baseServicePrice)}</span>
                </div>
                {travelFee > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.9rem', color: 'var(--primary-rose-dark)' }}>
                    <span>Home Service Travel Fee:</span>
                    <span>+{formatPrice(travelFee)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '1rem', fontWeight: '700' }}>
                  <span>Total Order Price:</span>
                  <span style={{ color: 'var(--primary-rose-dark)' }}>{formatPrice(totalOrderPrice)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2ecc71', fontWeight: '600', fontSize: '0.9rem', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-subtle)' }}>
                  <span>Advance Deposit (30%):</span>
                  <span>{formatPrice(advanceDeposit)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  <span>Remaining Balance Due:</span>
                  <span>{formatPrice(remainingBalance)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-rose"
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }}
              >
                Proceed to Pay Advance {formatPrice(advanceDeposit)} <ArrowRight size={16} />
              </button>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.85rem' }}>
                🔒 100% Secure reservation. Slot is locked immediately upon advance confirmation.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
