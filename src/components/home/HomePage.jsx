// src/components/home/HomePage.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Calendar, ArrowRight, Star, ShieldCheck, MapPin, Clock, Phone, MessageCircle, Award, CheckCircle2, Eye, Heart } from 'lucide-react';

export const HomePage = () => {
  const {
    salonInfo,
    stats,
    services,
    packages,
    portfolio,
    testimonials,
    offers,
    formatPrice,
    setActiveTab,
    startBooking,
    openModal
  } = useApp();

  return (
    <div className="homepage-wrapper">
      {/* HERO SECTION */}
      <section className="hero-section" style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--hero-overlay), url("https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '4rem 0'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '720px' }}>
            <div className="badge badge-gold" style={{ marginBottom: '1.2rem', padding: '0.4rem 1.1rem' }}>
              <Sparkles size={14} /> Hyderabad's Premier Celebrity & Bridal Studio
            </div>

            <h1 style={{
              fontSize: '3.8rem',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-heading)'
            }}>
              {salonInfo.tagline.split('with')[0]} <br />
              <span className="gradient-text-gold">with Flawless Precision</span>
            </h1>

            <p style={{
              fontSize: '1.2rem',
              color: 'var(--text-secondary)',
              marginBottom: '2.5rem',
              lineHeight: 1.6,
              maxWidth: '620px'
            }}>
              Welcome to <strong>{salonInfo.name}</strong> by lead artist <strong>{salonInfo.artistName}</strong>.
              Specializing in HD & Airbrush Bridal transformations, engagement looks, and luxury salon pampering.
            </p>

            {/* Hero CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <button onClick={() => startBooking(null, 'salon')} className="btn btn-gold btn-lg">
                <Calendar size={18} /> Book Salon Appointment
              </button>
              <button onClick={() => startBooking(null, 'home')} className="btn btn-rose btn-lg">
                <Sparkles size={18} /> Book Home Service
              </button>
              <button onClick={() => setActiveTab('portfolio')} className="btn btn-outline-white btn-lg">
                <Eye size={18} /> View Portfolio
              </button>
            </div>

            {/* Quick Stats Bar */}
            <div className="glass-card" style={{ padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', maxWidth: '650px' }}>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary-gold)' }}>{stats.yearsExperience}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Years Experience</div>
              </div>
              <div style={{ borderRight: '1px solid var(--border-subtle)' }} />
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary-rose)' }}>{stats.happyClients}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Happy Clients</div>
              </div>
              <div style={{ borderRight: '1px solid var(--border-subtle)' }} />
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary-gold)' }}>{stats.bridalMakeovers}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bridal Makeovers</div>
              </div>
              <div style={{ borderRight: '1px solid var(--border-subtle)' }} />
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary-rose)' }}>{stats.eventsCovered}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Events Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW & BRIDAL SPECIALIZATION */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt={salonInfo.artistName}
                style={{ width: '100%', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-gold)', boxShadow: 'var(--shadow-glow)' }}
              />
              <div className="glass-card" style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.8rem', maxWidth: '280px' }}>
                <Award size={32} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Certified Master MUA</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>London School of Makeup Trained</p>
                </div>
              </div>
            </div>

            <div>
              <span className="section-subtitle">Meet The Lead Artist</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Crafting Timeless Beauty for Your Most Sacred Moments
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.7 }}>
                With over {stats.yearsExperience} of professional artistry, <strong>{salonInfo.artistName}</strong> has established {salonInfo.name} as a landmark destination for brides seeking perfection, sophistication, and a glowing skin finish that lasts all day.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                We combine global premium brands (MAC, NARS, Charlotte Tilbury, TEMPTU Airbrush) with customized skin-prep rituals to craft personalized looks that amplify your natural elegance.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-gold)' }} />
                  <span>Airbrush & HD Expertise</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-gold)' }} />
                  <span>100% Sanitized Single-Use Kits</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-gold)' }} />
                  <span>At-Venue Home Service Available</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-gold)' }} />
                  <span>Pre-Bridal Skin Consultations</span>
                </div>
              </div>

              <button onClick={() => setActiveTab('about')} className="btn btn-outline-gold">
                Learn More About Our Philosophy <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Comprehensive Beauty Menu</span>
            <h2 className="section-title">Featured Services & Signature Makeovers</h2>
            <p className="section-description">
              Transparent, realistic pricing with no hidden charges. Choose salon or home delivery.
            </p>
          </div>

          <div className="grid-3">
            {services.slice(0, 6).map(srv => (
              <div key={srv.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <img src={srv.image} alt={srv.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="badge badge-gold" style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                    {srv.category}
                  </span>
                </div>

                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{srv.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                      {srv.description}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Price</span>
                      <strong style={{ fontSize: '1.25rem', color: 'var(--primary-gold)' }}>
                        {formatPrice(srv.price, srv.isStartingFrom)}
                      </strong>
                    </div>

                    <button onClick={() => startBooking(srv, 'salon')} className="btn btn-gold btn-sm" style={{ width: '100%' }}>
                      Book Service
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={() => setActiveTab('services')} className="btn btn-outline-gold btn-lg">
              View All Services & Complete Price List <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* POPULAR BRIDAL PACKAGES */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Curated All-Inclusive Deals</span>
            <h2 className="section-title">Popular Bridal Packages</h2>
            <p className="section-description">
              Save big with bundled makeup, hair, draping, and trial consultations.
            </p>
          </div>

          <div className="grid-3">
            {packages.map(pkg => (
              <div key={pkg.id} className="glass-card" style={{
                padding: '2rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                borderColor: pkg.badge === 'Most Recommended' ? 'var(--primary-gold)' : 'var(--border-subtle)',
                boxShadow: pkg.badge === 'Most Recommended' ? 'var(--shadow-glow)' : 'var(--shadow-sm)'
              }}>
                {pkg.badge && (
                  <span className="badge badge-gold" style={{ position: 'absolute', top: '-0.75rem', left: '50%', transform: 'translateX(-50%)' }}>
                    {pkg.badge}
                  </span>
                )}

                <div>
                  <h3 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{pkg.name}</h3>
                  <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--primary-gold)' }}>
                      {formatPrice(pkg.price)}
                    </span>
                    {pkg.originalPrice && (
                      <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', marginLeft: '0.6rem', fontSize: '1.1rem' }}>
                        {formatPrice(pkg.originalPrice)}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
                    {pkg.description}
                  </p>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                    <h5 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--primary-rose)', marginBottom: '0.8rem', letterSpacing: '0.05em' }}>
                      Package Inclusions:
                    </h5>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                          <CheckCircle2 size={16} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button onClick={() => startBooking(pkg, 'salon')} className="btn btn-gold" style={{ width: '100%' }}>
                  Book Package
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={() => setActiveTab('custom-package')} className="btn btn-rose btn-lg">
              <Sparkles size={18} /> Or Create Your Own Custom Package
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED PORTFOLIO PREVIEW */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Visual Gallery</span>
            <h2 className="section-title">Featured Artistry Portfolio</h2>
          </div>

          <div className="grid-3">
            {portfolio.slice(0, 6).map(item => (
              <div
                key={item.id}
                className="glass-card"
                style={{ overflow: 'hidden', cursor: 'pointer', group: 'hover' }}
                onClick={() => openModal('lightbox', item)}
              >
                <div style={{ height: '280px', position: 'relative', overflow: 'hidden' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                  <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 60%)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.25rem'
                  }}>
                    <span className="badge badge-gold" style={{ alignSelf: 'flex-start', marginBottom: '0.4rem' }}>{item.category}</span>
                    <h4 style={{ color: '#fff', fontSize: '1.15rem' }}>{item.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Click to view details & book look</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Client Love</span>
            <h2 className="section-title">What Our Happy Brides Say</h2>
          </div>

          <div className="grid-3">
            {testimonials.map(t => (
              <div key={t.id} className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.2rem', color: 'var(--primary-gold)', marginBottom: '1rem' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="var(--primary-gold)" />
                    ))}
                  </div>
                  <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                    "{t.review}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                  <img src={t.photo} alt={t.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{t.name}</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--primary-rose)' }}>{t.service}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SALON LOCATION & HOURS MAP SECTION */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="section-subtitle">Visit Our Studio</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>Location & Timings</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
                Located in the heart of Jubilee Hills, our luxury studio features climate-controlled trial rooms, sanitized styling stations, and private bridal suites.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <MapPin size={22} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Address:</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{salonInfo.address}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <Clock size={22} style={{ color: 'var(--primary-rose)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Salon Hours:</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{salonInfo.hours}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <Phone size={22} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Phone & WhatsApp:</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{salonInfo.phone}</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href={salonInfo.googleMapsUrl} target="_blank" rel="noreferrer" className="btn btn-gold">
                  <MapPin size={18} /> Get Directions
                </a>
                <a href={`https://wa.me/${salonInfo.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-outline-gold" style={{ color: '#2ecc71', borderColor: '#2ecc71' }}>
                  <MessageCircle size={18} /> WhatsApp Us
                </a>
              </div>
            </div>

            {/* Map Preview Card */}
            <div className="glass-card" style={{ height: '380px', position: 'relative', overflow: 'hidden', padding: 0 }}>
              <iframe
                title="Salon Location Map"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                loading="lazy"
                src="https://maps.google.com/maps?q=Jubilee%20Hills%20Hyderabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL BOOKING CTA */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #1f1a29 0%, #0c0a0f 100%)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Limited Availability</span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready for Your Dream Bridal Look?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
              Slots for the upcoming wedding season fill quickly. Lock your preferred date & makeup artist with our secure deposit system.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => startBooking(null, 'salon')} className="btn btn-gold btn-lg">
                Book Salon Appointment
              </button>
              <button onClick={() => startBooking(null, 'home')} className="btn btn-rose btn-lg">
                Book Home Service
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
