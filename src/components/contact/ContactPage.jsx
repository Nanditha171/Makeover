// src/components/contact/ContactPage.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Clock, Send, ChevronDown, ChevronUp, Calendar, Sparkles } from 'lucide-react';

export const ContactPage = () => {
  const { salonInfo, policies, services, packages, createEnquiry, startBooking } = useApp();
  const [openPolicy, setOpenPolicy] = useState('advancePolicy');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Bridal HD Makeup',
    eventDate: '',
    location: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name) return;

    setIsSubmitting(true);
    await createEnquiry(contactForm);
    setIsSubmitting(false);

    setContactForm({
      name: '',
      phone: '',
      email: '',
      service: 'Bridal HD Makeup',
      eventDate: '',
      location: '',
      message: ''
    });
  };

  const policyItems = [
    { key: 'advancePolicy', title: 'Advance Deposit & Slot Reservation Policy', text: policies.advancePolicy },
    { key: 'cancellationPolicy', title: 'Cancellation & Rescheduling Terms', text: policies.cancellationPolicy },
    { key: 'homeServicePolicy', title: 'Home Service & Venue Travel Terms', text: policies.homeServicePolicy },
    { key: 'hygienePolicy', title: 'Sanitization & Product Hygiene Standards', text: policies.hygienePolicy }
  ];

  return (
    <div className="contact-page section-padding">
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className="section-header">
          <span className="section-subtitle">Inquiries & Guidelines</span>
          <h2 className="section-title">Consultation & Studio Policies</h2>
          <p className="section-description">
            Submit an inquiry for your upcoming wedding or event, explore our studio location, and review our reservation guidelines.
          </p>
        </div>

        {/* Location Card & Inquiry Form Grid */}
        <div className="grid-2" style={{ gap: '2.5rem', marginBottom: '3.5rem', alignItems: 'flex-start' }}>
          {/* Studio Location Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="glass-card" style={{ padding: '1.75rem', border: '1px solid var(--border-rose)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'rgba(212, 106, 134, 0.12)', color: 'var(--primary-rose-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Studio Location</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-rose-dark)', fontWeight: '600' }}>Jubilee Hills, Hyderabad</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                {salonInfo.address}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', padding: '0.75rem 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
                <Clock size={16} style={{ color: 'var(--primary-rose-dark)', flexShrink: 0 }} />
                <span><strong>Open Daily:</strong> {salonInfo.hours}</span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href={salonInfo.googleMapsUrl} target="_blank" rel="noreferrer" className="btn btn-rose btn-sm" style={{ flex: 1 }}>
                  <MapPin size={14} /> Get Directions
                </a>
                <button onClick={() => startBooking(null, 'salon')} className="btn btn-outline-white btn-sm" style={{ flex: 1 }}>
                  <Calendar size={14} /> Book Appointment
                </button>
              </div>
            </div>

            {/* Quick Consultation Note */}
            <div className="glass-card" style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: 'var(--primary-rose-dark)', fontWeight: '700', fontSize: '0.9rem' }}>
                <Sparkles size={15} /> Personalized Bridal Consultations
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                We recommend booking bridal appointments at least 2 to 4 months in advance during peak wedding seasons. Studio trials can be scheduled via our booking wizard.
              </p>
            </div>
          </div>

          {/* Customer Enquiry Form */}
          <div className="glass-card" style={{ padding: '1.75rem', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>Send an Inquiry</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Have custom event requirements or need a tailored package quote? Send us your requirements.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Enter full name"
                  value={contactForm.name}
                  onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Contact Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Your contact number"
                    value={contactForm.phone}
                    onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your email address"
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Service Interested In</label>
                  <select
                    className="form-control"
                    value={contactForm.service}
                    onChange={e => setContactForm({ ...contactForm, service: e.target.value })}
                  >
                    <optgroup label="Services">
                      {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </optgroup>
                    <optgroup label="Packages">
                      {packages.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                    </optgroup>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Event Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={contactForm.eventDate}
                    onChange={e => setContactForm({ ...contactForm, eventDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Event Location / Venue</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Jubilee Hills, Hyderabad"
                  value={contactForm.location}
                  onChange={e => setContactForm({ ...contactForm, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message / Styling Details</label>
                <textarea
                  rows={2}
                  className="form-control"
                  placeholder="Mention number of guests, trial requests, or specific styling preferences..."
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn btn-rose btn-sm" style={{ width: '100%', padding: '0.8rem' }}>
                <Send size={15} /> {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>
        </div>

        {/* BOOKING POLICIES SECTION */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="section-header">
            <span className="section-subtitle">Transparency & Terms</span>
            <h2 className="section-title">Booking Policies</h2>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {policyItems.map(item => {
              const isOpen = openPolicy === item.key;
              return (
                <div
                  key={item.key}
                  className="glass-card"
                  style={{
                    padding: '1.15rem 1.35rem',
                    cursor: 'pointer',
                    borderColor: isOpen ? 'var(--primary-rose)' : 'var(--border-subtle)'
                  }}
                  onClick={() => setOpenPolicy(isOpen ? null : item.key)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '0.98rem', color: 'var(--text-primary)' }}>{item.title}</h4>
                    {isOpen ? <ChevronUp size={18} style={{ color: 'var(--primary-rose-dark)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />}
                  </div>

                  {isOpen && (
                    <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                      {item.text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
