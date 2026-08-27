// src/components/dashboard/AdminDashboard.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLoginModal } from '../common/AdminLoginModal';
import {
  LayoutDashboard,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  Edit,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Tag,
  Users,
  Settings,
  LogOut,
  Image,
  Globe,
  Award,
  Sparkles,
  Percent,
  FileText
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    isAdminAuthenticated,
    adminLogout,
    bookings,
    updateBookingStatus,
    services,
    addService,
    updateService,
    deleteService,
    packages,
    addPackage,
    deletePackage,
    offers,
    addOffer,
    deleteOffer,
    portfolio,
    addPortfolioItem,
    deletePortfolioItem,
    stats,
    setStats,
    salonInfo,
    setSalonInfo,
    policies,
    setPolicies,
    blockedSlots,
    addBlockedSlot,
    removeBlockedSlot,
    formatPrice,
    showToast
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState('overview');

  // New Service Form State
  const [newService, setNewService] = useState({
    name: '', category: 'Bridal Makeup', price: '', duration: '1 Hour', description: ''
  });

  // New Package Form State
  const [newPackage, setNewPackage] = useState({
    name: '', price: '', originalPrice: '', description: '', inclusionsText: ''
  });

  // New Offer Form State
  const [newOffer, setNewOffer] = useState({
    title: '', category: 'Bridal', regularPrice: '', offerPrice: '', code: '', validTill: '', description: ''
  });

  // New Portfolio Form State
  const [newPortfolio, setNewPortfolio] = useState({
    title: '', category: 'Bridal', type: 'Bridal HD Makeup', image: '', description: ''
  });

  // Slot Locker Form State
  const [blockDate, setBlockDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [blockTimeSlot, setBlockTimeSlot] = useState('All Day');
  const [blockReason, setBlockReason] = useState('Private VIP Booking');

  // If unauthenticated, show protected Admin Login Page
  if (!isAdminAuthenticated) {
    return <AdminLoginModal />;
  }

  // Analytics calculation
  const totalRevenue = bookings.reduce((sum, b) => b.status !== 'Cancelled' ? sum + b.totalPrice : sum, 0);
  const pendingBalance = bookings.reduce((sum, b) => b.status !== 'Cancelled' ? sum + b.remainingAmount : sum, 0);
  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookingsCount = bookings.filter(b => b.date === todayStr && b.status !== 'Cancelled').length;

  const handleAddServiceSubmit = (e) => {
    e.preventDefault();
    if (!newService.name || !newService.price) return;

    addService({
      ...newService,
      price: parseInt(newService.price),
      isStartingFrom: false,
      inclusions: ["Skin Preparation", "Sanitized Kit Application"]
    });

    setNewService({ name: '', category: 'Bridal Makeup', price: '', duration: '1 Hour', description: '' });
  };

  const handleAddPackageSubmit = (e) => {
    e.preventDefault();
    if (!newPackage.name || !newPackage.price) return;

    const inclusionsList = newPackage.inclusionsText.split('\n').filter(i => i.trim().length > 0);

    addPackage({
      name: newPackage.name,
      price: parseInt(newPackage.price),
      originalPrice: newPackage.originalPrice ? parseInt(newPackage.originalPrice) : null,
      description: newPackage.description,
      inclusions: inclusionsList.length > 0 ? inclusionsList : ["Makeup", "Hairstyling", "Draping"]
    });

    setNewPackage({ name: '', price: '', originalPrice: '', description: '', inclusionsText: '' });
  };

  const handleAddOfferSubmit = (e) => {
    e.preventDefault();
    if (!newOffer.title || !newOffer.offerPrice) return;

    const savings = (parseInt(newOffer.regularPrice) || 0) - (parseInt(newOffer.offerPrice) || 0);

    addOffer({
      title: newOffer.title,
      category: newOffer.category,
      regularPrice: parseInt(newOffer.regularPrice) || parseInt(newOffer.offerPrice),
      offerPrice: parseInt(newOffer.offerPrice),
      savings: savings > 0 ? savings : 0,
      code: newOffer.code || 'GLOWSPECIAL',
      validTill: newOffer.validTill || '2026-12-31',
      description: newOffer.description,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
    });

    setNewOffer({ title: '', category: 'Bridal', regularPrice: '', offerPrice: '', code: '', validTill: '', description: '' });
  };

  const handleAddPortfolioSubmit = (e) => {
    e.preventDefault();
    if (!newPortfolio.title || !newPortfolio.image) return;

    addPortfolioItem(newPortfolio);
    setNewPortfolio({ title: '', category: 'Bridal', type: 'Bridal HD Makeup', image: '', description: '' });
  };

  const handleBlockSlotSubmit = (e) => {
    e.preventDefault();
    addBlockedSlot({ date: blockDate, timeSlot: blockTimeSlot, reason: blockReason });
  };

  return (
    <div className="admin-dashboard section-padding">
      <div className="container">
        {/* Header Bar with Logout */}
        <div className="glass-card" style={{ padding: '1.25rem 2rem', marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderColor: 'var(--border-gold)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gold-gradient)', color: '#000', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              A
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Aura CMS & Business Control Panel</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary-rose)' }}>Authenticated Admin: <strong>Makeup (Ananya Sharma)</strong></span>
            </div>
          </div>

          <button onClick={adminLogout} className="btn btn-outline-white btn-sm" style={{ color: '#e74c3c', borderColor: 'rgba(231,76,60,0.4)' }}>
            <LogOut size={16} /> Secure Logout
          </button>
        </div>

        {/* Analytics Counter Row */}
        <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', borderColor: 'var(--border-gold)' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Total Revenue</span>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-gold)' }}>{formatPrice(totalRevenue)}</div>
            <span style={{ fontSize: '0.75rem', color: '#2ecc71' }}>Confirmed Bookings</span>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', borderColor: 'var(--border-rose)' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Pending Due Balance</span>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-rose)' }}>{formatPrice(pendingBalance)}</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payable at Appointments</span>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Total Appointments</span>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>{bookings.length}</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-gold)' }}>{todayBookingsCount} Scheduled Today</span>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Active Content Items</span>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: '#2ecc71' }}>{services.length + packages.length + offers.length}</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Services, Packages & Deals</span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.8rem', marginBottom: '2.5rem', overflowX: 'auto' }}>
          {[
            { id: 'overview', label: 'All Bookings Manager', icon: LayoutDashboard },
            { id: 'calendar', label: 'Slot Locker & Calendar', icon: Lock },
            { id: 'business', label: 'Hero & Business Info CMS', icon: Globe },
            { id: 'pricing', label: 'Services & Prices CRUD', icon: DollarSign },
            { id: 'packages', label: 'Packages Manager', icon: Tag },
            { id: 'custom-calc', label: 'Build Package Config', icon: Percent },
            { id: 'offers', label: 'Discount Offers', icon: Sparkles },
            { id: 'portfolio-cms', label: 'Portfolio CMS', icon: Image },
            { id: 'settings', label: 'About, Stats & Policies', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id)}
                className={`btn btn-sm ${isActive ? 'btn-gold' : 'btn-outline-white'}`}
                style={{ whiteSpace: 'nowrap' }}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ALL BOOKINGS MANAGER */}
        {activeAdminTab === 'overview' && (
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Customer Appointments ({bookings.length})</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {bookings.map(b => (
                <div key={b.id} className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <span className="badge badge-gold">#{b.id}</span>
                      <span className={`badge ${b.status === 'Cancelled' ? 'badge-red' : 'badge-green'}`}>{b.status}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Type: {b.type}</span>
                    </div>
                    <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>{b.customerName} — {b.serviceName}</h4>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Date: <strong>{b.date}</strong> at <strong>{b.timeSlot}</strong> | Phone: {b.phone}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '700', color: 'var(--primary-gold)' }}>{formatPrice(b.totalPrice)}</div>
                      <div style={{ fontSize: '0.78rem', color: '#2ecc71' }}>Adv Paid: {formatPrice(b.advancePaid)}</div>
                    </div>

                    {b.status !== 'Cancelled' ? (
                      <button
                        onClick={() => updateBookingStatus(b.id, 'Cancelled')}
                        className="btn btn-outline-white btn-sm"
                        style={{ color: '#e74c3c' }}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                        className="btn btn-outline-gold btn-sm"
                      >
                        Reactivate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SLOT LOCKER & CALENDAR */}
        {activeAdminTab === 'calendar' && (
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'flex-start' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Lock Date or Time Slot</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Blocked slots automatically display as "Unavailable" on booking forms to prevent double bookings.
              </p>

              <form onSubmit={handleBlockSlotSubmit}>
                <div className="form-group">
                  <label className="form-label">Target Date</label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    value={blockDate}
                    onChange={e => setBlockDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Time Slot to Lock</label>
                  <select className="form-control" value={blockTimeSlot} onChange={e => setBlockTimeSlot(e.target.value)}>
                    <option value="All Day">All Day (Full Date Block)</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Reason / Internal Note</label>
                  <input
                    type="text"
                    className="form-control"
                    value={blockReason}
                    onChange={e => setBlockReason(e.target.value)}
                    placeholder="e.g. Master MUA at outstation wedding"
                  />
                </div>

                <button type="submit" className="btn btn-rose" style={{ width: '100%' }}>
                  <Lock size={16} /> Block Slot Now
                </button>
              </form>
            </div>

            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Currently Blocked Dates & Slots ({blockedSlots.length})</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {blockedSlots.map((bs, i) => (
                  <div key={i} className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ color: 'var(--primary-rose)' }}>{bs.date} — {bs.timeSlot}</strong>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Reason: {bs.reason}</div>
                    </div>

                    <button
                      onClick={() => removeBlockedSlot(bs.date, bs.timeSlot)}
                      className="btn btn-outline-white btn-sm"
                      style={{ color: '#2ecc71' }}
                    >
                      <Unlock size={14} /> Unblock
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HERO & BUSINESS INFO CMS */}
        {activeAdminTab === 'business' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Homepage Hero & General Business Information CMS</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Salon Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={salonInfo.name}
                  onChange={e => setSalonInfo({ ...salonInfo, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Makeup Artist Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={salonInfo.artistName}
                  onChange={e => setSalonInfo({ ...salonInfo, artistName: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Homepage Hero Tagline</label>
                <input
                  type="text"
                  className="form-control"
                  value={salonInfo.tagline}
                  onChange={e => setSalonInfo({ ...salonInfo, tagline: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={salonInfo.phone}
                  onChange={e => setSalonInfo({ ...salonInfo, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">WhatsApp Number (with country code)</label>
                <input
                  type="text"
                  className="form-control"
                  value={salonInfo.whatsapp}
                  onChange={e => setSalonInfo({ ...salonInfo, whatsapp: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={salonInfo.email}
                  onChange={e => setSalonInfo({ ...salonInfo, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Instagram Handle</label>
                <input
                  type="text"
                  className="form-control"
                  value={salonInfo.instagram}
                  onChange={e => setSalonInfo({ ...salonInfo, instagram: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Salon Physical Address</label>
                <textarea
                  rows={2}
                  className="form-control"
                  value={salonInfo.address}
                  onChange={e => setSalonInfo({ ...salonInfo, address: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Google Maps URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={salonInfo.googleMapsUrl}
                  onChange={e => setSalonInfo({ ...salonInfo, googleMapsUrl: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Operating Hours</label>
                <input
                  type="text"
                  className="form-control"
                  value={salonInfo.hours}
                  onChange={e => setSalonInfo({ ...salonInfo, hours: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SERVICES & PRICES CRUD */}
        {activeAdminTab === 'pricing' && (
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'flex-start' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Add New Service & Set Price</h3>

              <form onSubmit={handleAddServiceSubmit}>
                <div className="form-group">
                  <label className="form-label">Service Title *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Airbrush Bridal Glow"
                    value={newService.name}
                    onChange={e => setNewService({ ...newService, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control"
                    value={newService.category}
                    onChange={e => setNewService({ ...newService, category: e.target.value })}
                  >
                    <option>Bridal Makeup</option>
                    <option>Engagement & Reception</option>
                    <option>Party & Event Makeup</option>
                    <option>Hairstyling</option>
                    <option>Draping</option>
                    <option>Salon Beauty Services</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Price in INR (₹) *</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    placeholder="15000"
                    value={newService.price}
                    onChange={e => setNewService({ ...newService, price: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Short Description</label>
                  <textarea
                    rows={2}
                    className="form-control"
                    value={newService.description}
                    onChange={e => setNewService({ ...newService, description: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
                  <Plus size={16} /> Add Service To Website
                </button>
              </form>
            </div>

            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Live Services Menu ({services.length})</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '550px', overflowY: 'auto' }}>
                {services.map(s => (
                  <div key={s.id} className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>{s.name}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.category}</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <input
                        type="number"
                        className="form-control"
                        style={{ width: '110px', padding: '0.4rem 0.6rem', fontSize: '0.9rem' }}
                        value={s.price}
                        onChange={e => {
                          const val = parseInt(e.target.value) || 0;
                          updateService({ ...s, price: val });
                        }}
                      />
                      <button onClick={() => deleteService(s.id)} style={{ color: '#e74c3c' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PACKAGES MANAGER */}
        {activeAdminTab === 'packages' && (
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'flex-start' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Create New Bridal Package</h3>

              <form onSubmit={handleAddPackageSubmit}>
                <div className="form-group">
                  <label className="form-label">Package Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. BRIDAL GLAM LUXE"
                    value={newPackage.name}
                    onChange={e => setNewPackage({ ...newPackage, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Package Price (₹) *</label>
                    <input
                      type="number"
                      required
                      className="form-control"
                      placeholder="25000"
                      value={newPackage.price}
                      onChange={e => setNewPackage({ ...newPackage, price: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Original Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="30000"
                      value={newPackage.originalPrice}
                      onChange={e => setNewPackage({ ...newPackage, originalPrice: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Short summary"
                    value={newPackage.description}
                    onChange={e => setNewPackage({ ...newPackage, description: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Package Inclusions (One per line)</label>
                  <textarea
                    rows={4}
                    className="form-control"
                    placeholder="Bridal HD Makeup&#10;Bridal Hairstyling&#10;Saree Draping"
                    value={newPackage.inclusionsText}
                    onChange={e => setNewPackage({ ...newPackage, inclusionsText: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
                  <Plus size={16} /> Add Package
                </button>
              </form>
            </div>

            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Active Bridal Packages ({packages.length})</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {packages.map(p => (
                  <div key={p.id} className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '1.2rem', color: 'var(--primary-gold)' }}>{p.name}</h4>
                      <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{formatPrice(p.price)}</div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{p.description}</p>
                    </div>

                    <button onClick={() => deletePackage(p.id)} className="btn btn-outline-white btn-sm" style={{ color: '#e74c3c' }}>
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: BUILD YOUR PACKAGE CONFIG */}
        {activeAdminTab === 'custom-calc' && (
          <div className="glass-card" style={{ padding: '2rem', maxWidth: '650px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Build Your Package Configuration</h3>

            <div className="form-group">
              <label className="form-label">Home Service Travel Charge Rate (₹)</label>
              <input
                type="number"
                className="form-control"
                value={salonInfo.homeServiceCharge}
                onChange={e => setSalonInfo({ ...salonInfo, homeServiceCharge: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Advance Deposit Percentage (%)</label>
              <input
                type="number"
                className="form-control"
                value={salonInfo.advancePercent}
                onChange={e => setSalonInfo({ ...salonInfo, advancePercent: parseInt(e.target.value) || 30 })}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Fixed Advance Amount (if percentage disabled)</label>
              <input
                type="number"
                className="form-control"
                value={salonInfo.fixedAdvanceAmount}
                onChange={e => setSalonInfo({ ...salonInfo, fixedAdvanceAmount: parseInt(e.target.value) || 1000 })}
              />
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: 'rgba(212,175,55,0.05)', padding: '1rem', borderRadius: '8px' }}>
              💡 All dynamic calculations in the <strong>Build Package</strong> wizard automatically use these configured rates.
            </div>
          </div>
        )}

        {/* TAB 7: DISCOUNT OFFERS */}
        {activeAdminTab === 'offers' && (
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'flex-start' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Create New Promotional Offer</h3>

              <form onSubmit={handleAddOfferSubmit}>
                <div className="form-group">
                  <label className="form-label">Offer Title *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Festival Bridal Saver"
                    value={newOffer.title}
                    onChange={e => setNewOffer({ ...newOffer, title: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Regular Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="22000"
                      value={newOffer.regularPrice}
                      onChange={e => setNewOffer({ ...newOffer, regularPrice: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Offer Price (₹) *</label>
                    <input
                      type="number"
                      required
                      className="form-control"
                      placeholder="18999"
                      value={newOffer.offerPrice}
                      onChange={e => setNewOffer({ ...newOffer, offerPrice: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Promo Code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="BRIDAL2026"
                      value={newOffer.code}
                      onChange={e => setNewOffer({ ...newOffer, code: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Valid Till</label>
                    <input
                      type="date"
                      className="form-control"
                      value={newOffer.validTill}
                      onChange={e => setNewOffer({ ...newOffer, validTill: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={2}
                    className="form-control"
                    value={newOffer.description}
                    onChange={e => setNewOffer({ ...newOffer, description: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
                  <Plus size={16} /> Publish Offer
                </button>
              </form>
            </div>

            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Active Promotional Offers ({offers.length})</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {offers.map(o => (
                  <div key={o.id} className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span className="badge badge-rose" style={{ marginBottom: '0.3rem' }}>{o.code}</span>
                      <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>{o.title}</h4>
                      <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary-gold)' }}>
                        {formatPrice(o.offerPrice)} (Save {formatPrice(o.savings)})
                      </div>
                    </div>

                    <button onClick={() => deleteOffer(o.id)} className="btn btn-outline-white btn-sm" style={{ color: '#e74c3c' }}>
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: PORTFOLIO CMS */}
        {activeAdminTab === 'portfolio-cms' && (
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'flex-start' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Add Portfolio Image</h3>

              <form onSubmit={handleAddPortfolioSubmit}>
                <div className="form-group">
                  <label className="form-label">Title *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Royal Crimson Bridal Look"
                    value={newPortfolio.title}
                    onChange={e => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Image URL *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="https://images.unsplash.com/..."
                    value={newPortfolio.image}
                    onChange={e => setNewPortfolio({ ...newPortfolio, image: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-control" value={newPortfolio.category} onChange={e => setNewPortfolio({ ...newPortfolio, category: e.target.value })}>
                      <option>Bridal</option>
                      <option>Engagement</option>
                      <option>Reception</option>
                      <option>Party</option>
                      <option>Traditional</option>
                      <option>Hairstyling</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Makeup Type</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Bridal HD Makeup"
                      value={newPortfolio.type}
                      onChange={e => setNewPortfolio({ ...newPortfolio, type: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={2}
                    className="form-control"
                    value={newPortfolio.description}
                    onChange={e => setNewPortfolio({ ...newPortfolio, description: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
                  <Plus size={16} /> Add to Portfolio Gallery
                </button>
              </form>
            </div>

            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Portfolio Entries ({portfolio.length})</h3>

              <div className="grid-2" style={{ gap: '1rem', maxHeight: '550px', overflowY: 'auto' }}>
                {portfolio.map(item => (
                  <div key={item.id} className="glass-card" style={{ padding: '0.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }} />
                    <h5 style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{item.title}</h5>
                    <button onClick={() => deletePortfolioItem(item.id)} className="btn btn-outline-white btn-sm" style={{ color: '#e74c3c', marginTop: '0.5rem' }}>
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: ABOUT, STATS & POLICIES */}
        {activeAdminTab === 'settings' && (
          <div className="grid-2" style={{ gap: '3rem' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Edit About Us Statistics</h3>

              <div className="form-group">
                <label className="form-label">Years Experience Counter</label>
                <input
                  type="text"
                  className="form-control"
                  value={stats.yearsExperience}
                  onChange={e => setStats({ ...stats, yearsExperience: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Happy Clients Counter</label>
                <input
                  type="text"
                  className="form-control"
                  value={stats.happyClients}
                  onChange={e => setStats({ ...stats, happyClients: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bridal Makeovers Counter</label>
                <input
                  type="text"
                  className="form-control"
                  value={stats.bridalMakeovers}
                  onChange={e => setStats({ ...stats, bridalMakeovers: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Events Covered Counter</label>
                <input
                  type="text"
                  className="form-control"
                  value={stats.eventsCovered}
                  onChange={e => setStats({ ...stats, eventsCovered: e.target.value })}
                />
              </div>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Edit Website Policies</h3>

              <div className="form-group">
                <label className="form-label">Cancellation & Refund Terms</label>
                <textarea
                  rows={3}
                  className="form-control"
                  value={policies.cancellationPolicy}
                  onChange={e => setPolicies({ ...policies, cancellationPolicy: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Advance Deposit Policy</label>
                <textarea
                  rows={3}
                  className="form-control"
                  value={policies.advancePolicy}
                  onChange={e => setPolicies({ ...policies, advancePolicy: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Home Service Guidelines</label>
                <textarea
                  rows={3}
                  className="form-control"
                  value={policies.homeServicePolicy}
                  onChange={e => setPolicies({ ...policies, homeServicePolicy: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
