// src/components/about/AboutPage.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, CheckCircle2, Sparkles, Star, Users, Briefcase } from 'lucide-react';

export const AboutPage = () => {
  const { stats, salonInfo, startBooking } = useApp();

  const brands = [
    "MAC Cosmetics",
    "NARS Cosmetics",
    "Charlotte Tilbury",
    "Huda Beauty",
    "Bobbi Brown",
    "Kryolan Professional",
    "TEMPTU Airbrush",
    "Fenty Beauty"
  ];

  return (
    <div className="about-page section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">Heritage & Artistry</span>
          <h2 className="section-title">About {salonInfo.name}</h2>
          <p className="section-description">
            Dedicated to personalized bridal artistry, enhancing your natural radiance through high-definition techniques and uncompromising hygiene standards.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid-4" style={{ marginBottom: '3rem' }}>
          <div className="glass-card" style={{ padding: '1.35rem', textAlign: 'center' }}>
            <Briefcase size={26} style={{ color: 'var(--primary-rose-dark)', margin: '0 auto 0.4rem auto' }} />
            <div style={{ fontSize: '1.9rem', fontWeight: '800', color: 'var(--primary-rose-dark)' }}>{stats.yearsExperience}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Years Professional Experience</div>
          </div>

          <div className="glass-card" style={{ padding: '1.35rem', textAlign: 'center' }}>
            <Users size={26} style={{ color: 'var(--primary-rose)', margin: '0 auto 0.4rem auto' }} />
            <div style={{ fontSize: '1.9rem', fontWeight: '800', color: 'var(--primary-rose)' }}>{stats.happyClients}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Happy Brides & Clients</div>
          </div>

          <div className="glass-card" style={{ padding: '1.35rem', textAlign: 'center' }}>
            <Sparkles size={26} style={{ color: 'var(--primary-rose-dark)', margin: '0 auto 0.4rem auto' }} />
            <div style={{ fontSize: '1.9rem', fontWeight: '800', color: 'var(--primary-rose-dark)' }}>{stats.bridalMakeovers}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Bridal Makeovers</div>
          </div>

          <div className="glass-card" style={{ padding: '1.35rem', textAlign: 'center' }}>
            <Star size={26} style={{ color: 'var(--primary-rose)', margin: '0 auto 0.4rem auto' }} />
            <div style={{ fontSize: '1.9rem', fontWeight: '800', color: 'var(--primary-rose)' }}>{stats.eventsCovered}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Wedding & Event Projects</div>
          </div>
        </div>

        {/* Lead Artist Spotlight */}
        <div className="grid-2" style={{ alignItems: 'center', marginBottom: '3.5rem' }}>
          <div>
            <span className="badge badge-rose" style={{ marginBottom: '0.6rem' }}>Master Makeup Artist</span>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', marginBottom: '0.85rem' }}>Meet {salonInfo.artistName}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.85rem', lineHeight: 1.6, fontSize: '0.92rem' }}>
              {salonInfo.artistName} is an experienced bridal and fashion makeup specialist certified in advanced HD techniques, Airbrush application, and customized skin preparation.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.15rem', lineHeight: 1.6, fontSize: '0.92rem' }}>
              Her philosophy focuses on enhancing skin luminosity and accentuating natural facial contours, ensuring every bride feels radiant and confident both in person and in high-resolution photography.
            </p>

            <div style={{ borderLeft: '3px solid var(--primary-rose)', paddingLeft: '1rem', marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--text-primary)', fontSize: '0.92rem' }}>
              "True luxury is in the subtle details—the glow of healthy skin, balanced eyes, and makeup that holds effortlessly from dawn till night."
            </div>

            <button onClick={() => startBooking(null, 'salon')} className="btn btn-rose btn-sm" style={{ minHeight: '44px' }}>
              Book a Consultation with Ananya
            </button>
          </div>

          <div style={{ marginTop: '0.5rem' }}>
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
              alt={salonInfo.artistName}
              style={{ width: '100%', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-rose)', maxHeight: '420px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Luxury Cosmetics Used */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="section-header">
            <span className="section-subtitle">Premium Products</span>
            <h2 className="section-title">International Brands Used</h2>
            <p className="section-description">We strictly use 100% original, high-performance luxury cosmetics.</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', justifyContent: 'center' }}>
            {brands.map((b, i) => (
              <div key={i} className="glass-card" style={{ padding: '0.65rem 1.25rem', fontWeight: '600', color: 'var(--primary-rose-dark)', fontSize: '0.9rem' }}>
                ✦ {b}
              </div>
            ))}
          </div>
        </div>

        {/* Hygiene & Safety Standards */}
        <div className="glass-card" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', background: 'var(--bg-secondary)', borderColor: 'var(--border-rose)' }}>
          <div className="section-header" style={{ marginBottom: '1.75rem' }}>
            <ShieldCheck size={36} style={{ color: 'var(--primary-rose-dark)', margin: '0 auto 0.5rem auto' }} />
            <h2 className="section-title">Hygiene & Safety Protocol</h2>
            <p className="section-description">Your comfort and safety are our highest priority.</p>
          </div>

          <div className="grid-3">
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <CheckCircle2 size={20} style={{ color: 'var(--primary-rose-dark)', flexShrink: 0, marginTop: '0.1rem' }} />
              <div>
                <h4 style={{ fontSize: '0.98rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Single-Use Disposables</h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Mascara wands, lip applicators, and sponges are strictly single-use per client.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <CheckCircle2 size={20} style={{ color: 'var(--primary-rose-dark)', flexShrink: 0, marginTop: '0.1rem' }} />
              <div>
                <h4 style={{ fontSize: '0.98rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>UV Brush Sterilization</h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>All makeup brushes undergo hospital-grade UV sterilization and alcohol cleansing after every session.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <CheckCircle2 size={20} style={{ color: 'var(--primary-rose-dark)', flexShrink: 0, marginTop: '0.1rem' }} />
              <div>
                <h4 style={{ fontSize: '0.98rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Skin Prep & Patch Testing</h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Hypoallergenic primers and skin prep tailored specifically for sensitive or acne-prone skin.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
