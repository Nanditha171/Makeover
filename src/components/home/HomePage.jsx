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
  Clock,
  Phone,
  MessageCircle,
  Award,
  CheckCircle2,
  Eye,
  ChevronDown,
  ChevronUp,
  Camera,
  Heart
} from 'lucide-react';

export const HomePage = () => {
  const {
    salonInfo,
    stats,
    whyChoose,
    services,
    packages,
    portfolio,
    testimonials,
    faqs,
    offers,
    formatPrice,
    setActiveTab,
    startBooking,
    openModal
  } = useApp();

  const [openFaqId, setOpenFaqId] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaqId(prev => prev === id ? null : id);
  };

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
          <div style={{ maxWidth: '750px' }}>
            <div className="badge badge-gold" style={{ marginBottom: '1.2rem', padding: '0.4rem 1.1rem' }}>
              <Sparkles size={14} /> Hyderabad's Premier Celebrity & Bridal Studio
            </div>

            <h1 style={{
              fontSize: '3.6rem',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-heading)'
            }}>
              Your Beauty. Your Occasion. <br />
              <span className="gradient-text-gold">Your Signature Look.</span>
            </h1>

            <p style={{
              fontSize: '1.2rem',
              color: 'var(--text-secondary)',
              marginBottom: '2.5rem',
              lineHeight: 1.6,
              maxWidth: '640px'
            }}>
              {salonInfo.heroDescription}
            </p>

            {/* Hero CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <button onClick={() => startBooking(null, 'salon')} className="btn btn-gold btn-lg">
                <Calendar size={18} /> Book Appointment
              </button>
              <button onClick={() => setActiveTab('services')} className="btn btn-rose btn-lg">
                <Sparkles size={18} /> Explore Services
              </button>
              <a href={`https://wa.me/${salonInfo.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-outline-white btn-lg" style={{ color: '#2ecc71', borderColor: 'rgba(46,204,113,0.4)' }}>
                <MessageCircle size={18} /> WhatsApp CTA
              </a>
            </div>

            {/* Quick Stats Bar */}
            <div className="glass-card" style={{ padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', maxWidth: '680px' }}>
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
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bridal Looks</div>
              </div>
              <div style={{ borderRight: '1px solid var(--border-subtle)' }} />
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary-rose)' }}>{stats.eventsCovered}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Events Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE AURA SECTION */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Excellence in Beauty Artistry</span>
            <h2 className="section-title">Why Choose AURA</h2>
            <p className="section-description">
              Dedicated to crafting personalized makeup experiences with camera-ready perfection and hospital-grade hygiene.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '1.5rem' }}>
            {whyChoose.map(item => (
              <div key={item.id} className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', color: 'var(--primary-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={22} />
                </div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
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
            <span className="section-subtitle">Comprehensive Beauty Menu</span>
            <h2 className="section-title">Featured Services & Rates</h2>
            <p className="section-description">
              Transparent pricing for every occasion. Book at our Jubilee Hills salon or doorstep home service.
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

                    <div style={{ fontSize: '0.82rem', color: 'var(--primary-rose)', marginBottom: '0.8rem' }}>
                      ⏱ Duration: {srv.duration} | Available: {srv.availableAt}
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Price</span>
                      <strong style={{ fontSize: '1.25rem', color: 'var(--primary-gold)' }}>
                        {formatPrice(srv.price, srv.isStartingFrom)}
                      </strong>
                    </div>

                    <button onClick={() => startBooking(srv, 'salon')} className="btn btn-gold btn-sm" style={{ width: '100%' }}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={() => setActiveTab('services')} className="btn btn-outline-gold btn-lg">
              View All Services & Complete Rates <ArrowRight size={16} />
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
              Bundled packages including makeup, hairstyling, draping, and luxury skin preparation rituals.
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
                borderColor: pkg.badge ? 'var(--primary-gold)' : 'var(--border-subtle)',
                boxShadow: pkg.badge ? 'var(--shadow-glow)' : 'var(--shadow-sm)'
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
              <Sparkles size={18} /> Or Build Your Own Custom Package
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Simple 4-Step Journey</span>
            <h2 className="section-title">How It Works</h2>
          </div>

          <div className="grid-4" style={{ gap: '1.5rem' }}>
            {[
              { step: '01', title: 'Explore', desc: 'Browse our services, bridal packages, and portfolio gallery.' },
              { step: '02', title: 'Choose', desc: 'Select a signature service or build a customized package.' },
              { step: '03', title: 'Book', desc: 'Select your preferred date & available time slot on our calendar.' },
              { step: '04', title: 'Glow', desc: 'Visit our Jubilee Hills salon or receive doorstep service at your venue.' }
            ].map(item => (
              <div key={item.step} className="glass-card" style={{ padding: '2rem', textAlign: 'center', position: 'relative' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'rgba(212,175,55,0.25)', marginBottom: '0.5rem' }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Verified Reviews</span>
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
                  <img src={t.image} alt={t.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{t.name}</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--primary-rose)' }}>{t.serviceBooked}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '850px' }}>
          <div className="section-header">
            <span className="section-subtitle">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map(faq => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justify: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-primary)',
                      fontSize: '1.05rem',
                      fontWeight: '600',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={20} style={{ color: 'var(--primary-gold)' }} /> : <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />}
                  </button>

                  {isOpen && (
                    <div style={{ marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INSTAGRAM SOCIAL PROOF FEED */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">@aurabeauty_ananya</span>
            <h2 className="section-title">Follow AURA on Instagram</h2>
          </div>

          <div className="grid-4" style={{ gap: '1rem', marginBottom: '2rem' }}>
            {portfolio.slice(0, 4).map(p => (
              <a key={p.id} href={`https://instagram.com/${salonInfo.instagram}`} target="_blank" rel="noreferrer" className="glass-card" style={{ padding: 0, overflow: 'hidden', height: '220px', display: 'block' }}>
                <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </a>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href={`https://instagram.com/${salonInfo.instagram}`} target="_blank" rel="noreferrer" className="btn btn-rose btn-lg">
              <Camera size={18} /> Follow on Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
