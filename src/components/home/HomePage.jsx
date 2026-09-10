// src/components/home/HomePage.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Calendar,
  ArrowRight,
  Star,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const HomePage = () => {
  const {
    salonInfo,
    stats,
    whyChoose,
    services,
    packages,
    testimonials,
    faqs,
    formatPrice,
    setActiveTab,
    startBooking
  } = useApp();

  const [openFaqId, setOpenFaqId] = useState('faq-1');

  const toggleFaq = (id) => {
    setOpenFaqId(prev => prev === id ? null : id);
  };

  return (
    <div className="homepage-wrapper">
      {/* HERO SECTION */}
      <section className="hero-section" style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--hero-overlay), url("https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '4.5rem 0'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '720px' }}>
            <div className="badge badge-rose" style={{ marginBottom: '1.2rem', padding: '0.35rem 1rem' }}>
              <Sparkles size={13} /> Luxury Bridal & Makeover Studio • Jubilee Hills
            </div>

            <h1 style={{
              fontSize: '3.2rem',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-primary)'
            }}>
              Your Beauty. Your Occasion. <br />
              <span className="gradient-text-rose">Your Signature Look.</span>
            </h1>

            <p style={{
              fontSize: '1.08rem',
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
              lineHeight: 1.6,
              maxWidth: '620px'
            }}>
              {salonInfo.heroDescription}
            </p>

            {/* Hero CTAs */}
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <button onClick={() => startBooking(null, 'salon')} className="btn btn-rose btn-lg">
                <Calendar size={18} /> Book Appointment
              </button>
              <button onClick={() => setActiveTab('services')} className="btn btn-outline-white btn-lg">
                Explore Services & Rates
              </button>
            </div>

            {/* Key Value Bar */}
            <div className="glass-card" style={{ padding: '1.15rem 1.75rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', maxWidth: '640px', background: '#FFFFFF' }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-rose-dark)' }}>{stats.yearsExperience}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Years Experience</div>
              </div>
              <div style={{ borderRight: '1px solid var(--border-subtle)' }} />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-rose-dark)' }}>{stats.bridalMakeovers}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Bridal Looks</div>
              </div>
              <div style={{ borderRight: '1px solid var(--border-subtle)' }} />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-rose-dark)' }}>{stats.happyClients}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Happy Clients</div>
              </div>
              <div style={{ borderRight: '1px solid var(--border-subtle)' }} />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-rose-dark)' }}>100%</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Hygiene Standard</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE AURA */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Excellence In Beauty</span>
            <h2 className="section-title">Why Choose AURA</h2>
            <p className="section-description">
              Dedicated to crafting personalized makeup experiences with camera-ready perfection and hospital-grade hygiene.
            </p>
          </div>

          <div className="grid-3">
            {whyChoose.map(item => (
              <div key={item.id} className="glass-card" style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(212,106,134,0.12)', color: 'var(--primary-rose-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Curated Offerings</span>
            <h2 className="section-title">Popular Services & Rates</h2>
            <p className="section-description">
              Clear, transparent pricing in Indian Rupees (₹). Book appointments at our salon studio or at your doorstep.
            </p>
          </div>

          <div className="grid-3">
            {services.slice(0, 6).map(srv => (
              <div key={srv.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '190px', position: 'relative', overflow: 'hidden' }}>
                  <img src={srv.image} alt={srv.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="badge badge-rose" style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                    {srv.category}
                  </span>
                </div>

                <div style={{ padding: '1.35rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>{srv.name}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.85rem', lineHeight: 1.5 }}>
                      {srv.description}
                    </p>

                    <div style={{ fontSize: '0.78rem', color: 'var(--primary-rose-dark)', marginBottom: '0.85rem', fontWeight: '600' }}>
                      ⏱ Duration: {srv.duration} | {srv.availableAt}
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Price</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--primary-rose-dark)' }}>
                        {formatPrice(srv.price, srv.isStartingFrom)}
                      </strong>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => startBooking(srv, 'salon')} className="btn btn-rose btn-sm" style={{ flex: 1 }}>
                        Book Salon
                      </button>
                      <button onClick={() => startBooking(srv, 'home')} className="btn btn-outline-white btn-sm" style={{ flex: 1 }}>
                        Book Home
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={() => setActiveTab('services')} className="btn btn-outline-rose btn-lg">
              View All Services & Complete Rates <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* POPULAR BRIDAL PACKAGES */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">All-Inclusive Luxury</span>
            <h2 className="section-title">Bridal Makeover Packages</h2>
            <p className="section-description">
              Bundled packages including makeup, hairstyling, draping, and pre-bridal skincare rituals.
            </p>
          </div>

          <div className="grid-3">
            {packages.map(pkg => (
              <div key={pkg.id} className="glass-card" style={{
                padding: '1.75rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                borderColor: pkg.badge === 'Most Booked' ? 'var(--primary-rose)' : 'var(--border-subtle)'
              }}>
                {pkg.badge && (
                  <span className="badge badge-rose" style={{ position: 'absolute', top: '-0.65rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--rose-gradient)', color: '#FFFFFF', border: 'none' }}>
                    {pkg.badge}
                  </span>
                )}

                <div>
                  <h3 style={{ fontSize: '1.4rem', textAlign: 'center', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{pkg.name}</h3>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-rose-dark)' }}>
                      {formatPrice(pkg.price)}
                    </span>
                    {pkg.originalPrice && (
                      <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', marginLeft: '0.5rem', fontSize: '1rem' }}>
                        {formatPrice(pkg.originalPrice)}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', textAlign: 'center', lineHeight: 1.5 }}>
                    {pkg.description}
                  </p>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginBottom: '1.25rem' }}>
                    <h5 style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--primary-rose-dark)', marginBottom: '0.6rem', letterSpacing: '0.04em', fontWeight: '700' }}>
                      Package Inclusions:
                    </h5>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem' }}>
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)' }}>
                          <CheckCircle2 size={15} style={{ color: 'var(--primary-rose-dark)', flexShrink: 0 }} />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => startBooking(pkg, 'salon')} className="btn btn-rose btn-sm" style={{ flex: 1 }}>
                    Book Salon
                  </button>
                  <button onClick={() => startBooking(pkg, 'home')} className="btn btn-outline-white btn-sm" style={{ flex: 1 }}>
                    Book Home
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Seamless Booking</span>
            <h2 className="section-title">How It Works</h2>
          </div>

          <div className="grid-4">
            {[
              { step: '01', title: 'Explore Services', desc: 'Browse our service menu, bridal packages, or build a custom package.' },
              { step: '02', title: 'Select Location', desc: 'Choose between visiting our Jubilee Hills studio or doorstep venue service.' },
              { step: '03', title: 'Pick Slot & Confirm', desc: 'Select your preferred date & available time slot with instant confirmation.' },
              { step: '04', title: 'Look Stunning', desc: 'Relax and enjoy flawless artistry using genuine luxury cosmetics.' }
            ].map(item => (
              <div key={item.step} className="glass-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-rose-dark)', marginBottom: '0.5rem' }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials && testimonials.length > 0 && (
        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Client Feedback</span>
              <h2 className="section-title">Client Reviews</h2>
            </div>

            <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
              {testimonials.map(t => (
                <div key={t.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.2rem', color: 'var(--primary-rose)', marginBottom: '0.75rem' }}>
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} size={15} fill="var(--primary-rose)" stroke="var(--primary-rose)" />
                      ))}
                    </div>
                    <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                      "{t.review}"
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
                    <img src={t.image} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{t.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--primary-rose-dark)', fontWeight: '600' }}>{t.serviceBooked}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ SECTION */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <span className="section-subtitle">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map(faq => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="glass-card" style={{ padding: '1.15rem 1.35rem', borderColor: isOpen ? 'var(--primary-rose)' : 'var(--border-subtle)' }}>
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-primary)',
                      fontSize: '1rem',
                      fontWeight: '600',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={18} style={{ color: 'var(--primary-rose-dark)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />}
                  </button>

                  {isOpen && (
                    <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STUDIO LOCATION BANNER */}
      <section style={{ background: 'var(--bg-secondary)', padding: '3.5rem 0', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '750px' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Visit Our Studio in Jubilee Hills</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
            {salonInfo.address} • Open daily from 10:00 AM to 8:00 PM.
          </p>
          <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={salonInfo.googleMapsUrl} target="_blank" rel="noreferrer" className="btn btn-rose">
              <MapPin size={16} /> Get Studio Directions
            </a>
            <button onClick={() => startBooking(null, 'salon')} className="btn btn-outline-white">
              <Calendar size={16} /> Book Salon Appointment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
