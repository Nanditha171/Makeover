// src/components/contact/ContactPage.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Mail, Clock, Camera, MessageCircle, Send, ShieldAlert, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

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
    if (!contactForm.name || !contactForm.phone) return;

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
    { key: 'advancePolicy', title: 'Advance Deposit & Booking Policy', text: policies.advancePolicy },
    { key: 'cancellationPolicy', title: 'Cancellation & Refund Policy', text: policies.cancellationPolicy },
    { key: 'homeServicePolicy', title: 'Home Service & Travel Charges', text: policies.homeServicePolicy },
    { key: 'hygienePolicy', title: 'Sanitization & Hygiene Standards', text: policies.hygienePolicy }
  ];

  return (
    <div className="contact-page section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Contact Us & Studio Location</h2>
          <p className="section-description">
            We are delighted to assist you with inquiries, bridal availability checks, or custom package bookings.
          </p>
        </div>

        {/* Contact Information & Enquiry Form Grid */}
        <div className="grid-2" style={{ gap: '3rem', marginBottom: '4rem', alignItems: 'flex-start' }}>
          {/* Info Card */}
          <div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Studio Details</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <MapPin size={24} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Salon Address</strong>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{salonInfo.address}</span>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Phone size={24} style={{ color: 'var(--primary-rose)', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Phone / Direct Call</strong>
                  <a href={`tel:${salonInfo.phone}`} style={{ fontSize: '0.95rem', color: 'var(--primary-gold)' }}>{salonInfo.phone}</a>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <MessageCircle size={24} style={{ color: '#2ecc71', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block' }}>WhatsApp Direct Support</strong>
                  <a href={`https://wa.me/${salonInfo.whatsapp}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.95rem', color: '#2ecc71' }}>
                    {salonInfo.phone} (Click to Chat)
                  </a>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Clock size={24} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Studio Hours</strong>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{salonInfo.hours}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href={salonInfo.googleMapsUrl} target="_blank" rel="noreferrer" className="btn btn-gold btn-sm">
                <MapPin size={15} /> Get Directions
              </a>
              <a href={`tel:${salonInfo.phone}`} className="btn btn-outline-gold btn-sm">
                <Phone size={15} /> Call Now
              </a>
              <a href={`https://wa.me/${salonInfo.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-outline-white btn-sm" style={{ color: '#2ecc71', borderColor: 'rgba(46,204,113,0.4)' }}>
                <MessageCircle size={15} /> WhatsApp Us
              </a>
              <button onClick={() => startBooking(null, 'salon')} className="btn btn-rose btn-sm">
                <Calendar size={15} /> Book Appointment
              </button>
            </div>
          </div>

          {/* Customer Enquiry Form */}
          <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border-gold)' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Customer Enquiry Form</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Not ready to book yet? Send us your requirements and event date for a custom quote.
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={contactForm.phone}
                    onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email@example.com"
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                <label className="form-label">Event Location / City Zone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Jubilee Hills, Hyderabad / Venue address"
                  value={contactForm.location}
                  onChange={e => setContactForm({ ...contactForm, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message / Custom Requirements</label>
                <textarea
                  rows={3}
                  className="form-control"
                  placeholder="Mention number of guests, trial requests, or timing preferences..."
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn btn-gold" style={{ width: '100%' }}>
                <Send size={16} /> {isSubmitting ? 'Submitting Enquiry...' : 'Submit Customer Enquiry'}
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

          <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {policyItems.map(item => {
              const isOpen = openPolicy === item.key;
              return (
                <div
                  key={item.key}
                  className="glass-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    cursor: 'pointer',
                    borderColor: isOpen ? 'var(--primary-gold)' : 'var(--border-subtle)'
                  }}
                  onClick={() => setOpenPolicy(isOpen ? null : item.key)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{item.title}</h4>
                    {isOpen ? <ChevronUp size={18} style={{ color: 'var(--primary-gold)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />}
                  </div>

                  {isOpen && (
                    <div style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
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
