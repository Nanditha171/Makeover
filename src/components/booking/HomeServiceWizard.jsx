// src/components/booking/HomeServiceWizard.jsx
import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Home, MapPin, Calendar, Clock, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

export const HomeServiceWizard = () => {
  const {
    services,
    packages,
    salonInfo,
    selectedBookingItem,
    checkSlotStatus,
    formatPrice,
    openModal
  } = useApp();

  const [selectedMakeup, setSelectedMakeup] = useState(selectedBookingItem || services[0]);
  const [selectedHair, setSelectedHair] = useState('none');
  const [selectedDrape, setSelectedDrape] = useState('none');
  const [peopleCount, setPeopleCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM');

  // Address State
  const [addressInfo, setAddressInfo] = useState({
    name: '',
    phone: '',
    fullAddress: '',
    landmark: '',
    cityZone: 'Jubilee Hills / Banjara Hills (Standard ₹500)'
  });

  useEffect(() => {
    if (selectedBookingItem) {
      setSelectedMakeup(selectedBookingItem);
    }
  }, [selectedBookingItem]);

  // Calculate Prices dynamically
  const makeupCost = (selectedMakeup ? selectedMakeup.price : 0) * peopleCount;

  // Add-on options
  const hairOptions = [
    { id: 'none', name: 'No Hair Add-on', price: 0 },
    { id: 'hair-1', name: 'Basic Hairstyling', price: 1000 },
    { id: 'hair-2', name: 'Bridal Hairstyling', price: 2500 },
    { id: 'hair-3', name: 'Premium Hollywood Waves', price: 3500 }
  ];

  const drapeOptions = [
    { id: 'none', name: 'No Draping Add-on', price: 0 },
    { id: 'drape-1', name: 'Saree Draping', price: 700 },
    { id: 'drape-2', name: 'Bridal Saree Draping', price: 1200 },
    { id: 'drape-3', name: 'Dual Dupatta Styling', price: 800 }
  ];

  const hairCost = (hairOptions.find(h => h.id === selectedHair)?.price || 0) * peopleCount;
  const drapeCost = (drapeOptions.find(d => d.id === selectedDrape)?.price || 0) * peopleCount;

  // Auto home service travel charge
  const travelFee = salonInfo.homeServiceCharge || 500;

  const totalOrderPrice = makeupCost + hairCost + drapeCost + travelFee;
  const advanceDeposit = Math.round((totalOrderPrice * salonInfo.advancePercent) / 100);
  const remainingBalance = totalOrderPrice - advanceDeposit;

  const handleProceedToPayment = (e) => {
    e.preventDefault();

    if (!addressInfo.name || !addressInfo.phone || !addressInfo.fullAddress) {
      alert('Please fill in your name, phone number, and full address for home delivery.');
      return;
    }

    const pendingBooking = {
      type: 'home',
      serviceName: `${selectedMakeup.name} (Home Service)`,
      serviceId: selectedMakeup.id,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      guestsCount: peopleCount,
      address: addressInfo.fullAddress,
      landmark: addressInfo.landmark,
      homeServiceFee: travelFee,
      totalPrice: totalOrderPrice,
      customerName: addressInfo.name,
      phone: addressInfo.phone
    };

    openModal('payment', pendingBooking);
  };

  return (
    <div className="home-service-wizard section-padding">
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className="section-header">
          <span className="section-subtitle">Doorstep Luxury</span>
          <h2 className="section-title">Book Home Service / Venue Makeover</h2>
          <p className="section-description">
            Our certified artists bring full professional lighting, sanitized kits, and vanity setups directly to your home or wedding venue.
          </p>
        </div>

        <form onSubmit={handleProceedToPayment} className="grid-2" style={{ gap: '2.5rem', alignItems: 'flex-start' }}>
          {/* Left Column: Selections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Step 1: Makeup & Services */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Home size={22} style={{ color: 'var(--primary-rose)' }} />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>1. Select Makeup Service & Add-ons</h3>
              </div>

              <div className="form-group">
                <label className="form-label">Primary Makeup Service / Package</label>
                <select
                  className="form-control"
                  value={selectedMakeup.id}
                  onChange={e => {
                    const found = services.find(s => s.id === e.target.value) || packages.find(p => p.id === e.target.value);
                    if (found) setSelectedMakeup(found);
                  }}
                >
                  <optgroup label="Services">
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.name} — {formatPrice(s.price)}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Packages">
                    {packages.map(p => (
                      <option key={p.id} value={p.id}>{p.name} — {formatPrice(p.price)}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Add-on Hairstyling</label>
                  <select className="form-control" value={selectedHair} onChange={e => setSelectedHair(e.target.value)}>
                    {hairOptions.map(h => (
                      <option key={h.id} value={h.id}>{h.name} {h.price > 0 ? `(+${formatPrice(h.price)})` : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Add-on Draping</label>
                  <select className="form-control" value={selectedDrape} onChange={e => setSelectedDrape(e.target.value)}>
                    {drapeOptions.map(d => (
                      <option key={d.id} value={d.id}>{d.name} {d.price > 0 ? `(+${formatPrice(d.price)})` : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Number of People to Style</label>
                <select className="form-control" value={peopleCount} onChange={e => setPeopleCount(parseInt(e.target.value))}>
                  <option value={1}>1 Person</option>
                  <option value={2}>2 Persons</option>
                  <option value={3}>3 Persons</option>
                  <option value={4}>4+ Persons (Bridal Group)</option>
                </select>
              </div>
            </div>

            {/* Step 2: Event Date & Time Slot */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Calendar size={22} style={{ color: 'var(--primary-gold)' }} />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>2. Event Date & Time Slot</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Event Date</label>
                  <input
                    type="date"
                    className="form-control"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Time Slot</label>
                  <select className="form-control" value={selectedTimeSlot} onChange={e => setSelectedTimeSlot(e.target.value)}>
                    <option>06:00 AM (Early Morning Bridal)</option>
                    <option>08:30 AM</option>
                    <option>11:00 AM</option>
                    <option>02:00 PM</option>
                    <option>04:30 PM</option>
                    <option>06:30 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Full Address Details */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <MapPin size={22} style={{ color: 'var(--primary-rose)' }} />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>3. Full Venue / Home Address</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Customer Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Ananya Reddy"
                    value={addressInfo.name}
                    onChange={e => setAddressInfo({ ...addressInfo, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={addressInfo.phone}
                    onChange={e => setAddressInfo({ ...addressInfo, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Complete Street Address / Venue Name *</label>
                <textarea
                  rows={2}
                  required
                  className="form-control"
                  placeholder="Flat 302, Royal Residency, Road No 10, Jubilee Hills..."
                  value={addressInfo.fullAddress}
                  onChange={e => setAddressInfo({ ...addressInfo, fullAddress: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: 0 }}>
                <div className="form-group">
                  <label className="form-label">Landmark</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Near Apollo Hospital"
                    value={addressInfo.landmark}
                    onChange={e => setAddressInfo({ ...addressInfo, landmark: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">City Zone / Distance Rate</label>
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    value={`Standard Travel Charge (${formatPrice(travelFee)})`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Auto Price Breakdown Card */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border-gold)', boxShadow: 'var(--shadow-glow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Truck size={22} style={{ color: 'var(--primary-gold)' }} />
                <h3 style={{ fontSize: '1.4rem' }}>Home Service Order Summary</h3>
              </div>

              {/* Price Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{selectedMakeup.name} ({peopleCount}x):</span>
                  <span>{formatPrice(makeupCost)}</span>
                </div>
                {hairCost > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Hairstyling Add-on:</span>
                    <span>+{formatPrice(hairCost)}</span>
                  </div>
                )}
                {drapeCost > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Draping Add-on:</span>
                    <span>+{formatPrice(drapeCost)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary-rose)' }}>
                  <span>Home Service Travel Charge:</span>
                  <span>+{formatPrice(travelFee)}</span>
                </div>
              </div>

              {/* Total Calculation */}
              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontWeight: '700', fontSize: '1.1rem' }}>
                  <span>Total Order Price:</span>
                  <span style={{ color: 'var(--primary-gold)', fontSize: '1.5rem' }}>{formatPrice(totalOrderPrice)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2ecc71', fontWeight: '600', fontSize: '0.95rem' }}>
                  <span>Advance Required ({salonInfo.advancePercent}%):</span>
                  <span>{formatPrice(advanceDeposit)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                  <span>Remaining Payable at Home:</span>
                  <span>{formatPrice(remainingBalance)}</span>
                </div>
              </div>

              <button type="submit" className="btn btn-rose" style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}>
                Pay Advance {formatPrice(advanceDeposit)} & Confirm Booking <ArrowRight size={18} />
              </button>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem' }}>
                ✓ Includes sanitized portable vanity mirror & studio light setup.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
