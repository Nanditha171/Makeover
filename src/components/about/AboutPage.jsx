// src/components/about/AboutPage.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, CheckCircle2, ShieldCheck, Heart, Sparkles, Star, Users, Briefcase } from 'lucide-react';

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
          <span className="section-subtitle">Our Heritage & Craft</span>
          <h2 className="section-title">About {salonInfo.name}</h2>
          <p className="section-description">
            Founded with a vision to redefine bridal beauty through elegance, skin-first techniques, and uncompromised luxury standards.
          </p>
        </div>

        {/* 4 EDITABLE STATS COUNTERS */}
        <div className="grid-4" style={{ marginBottom: '4rem' }}>
          <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'center', borderColor: 'var(--border-gold)' }}>
            <Briefcase size={32} style={{ color: 'var(--primary-gold)', margin: '0 auto 0.75rem auto' }} />
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-gold)' }}>{stats.yearsExperience}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Years Professional Experience</div>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'center', borderColor: 'var(--border-rose)' }}>
            <Users size={32} style={{ color: 'var(--primary-rose)', margin: '0 auto 0.75rem auto' }} />
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-rose)' }}>{stats.happyClients}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Happy Delighted Clients</div>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'center', borderColor: 'var(--border-gold)' }}>
            <Sparkles size={32} style={{ color: 'var(--primary-gold)', margin: '0 auto 0.75rem auto' }} />
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-gold)' }}>{stats.bridalMakeovers}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Bridal Makeovers Completed</div>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'center', borderColor: 'var(--border-rose)' }}>
            <Star size={32} style={{ color: 'var(--primary-rose)', margin: '0 auto 0.75rem auto' }} />
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-rose)' }}>{stats.eventsCovered}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Events & Shoots Covered</div>
          </div>
        </div>

        {/* Lead Artist Spotlight */}
        <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem', marginBottom: '5rem' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '0.8rem' }}>Master Makeup Artist</span>
            <h3 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Meet {salonInfo.artistName}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.7 }}>
              {salonInfo.artistName} is a celebrated bridal and fashion makeup artist trained at the prestigious <strong>London School of Makeup</strong> and certified by <strong>Kryolan Professional Academy</strong>.
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Her makeup philosophy centers on enhancing skin luminosity rather than masking natural features. "Every bride deserves a look that feels like the truest, most radiant version of herself," she shares.
            </p>

            <div style={{ borderLeft: '3px solid var(--primary-gold)', paddingLeft: '1.25rem', marginBottom: '1.75rem', fontStyle: 'italic', color: 'var(--text-primary)' }}>
              "True luxury is in the subtle details—the texture of skin, the light on cheeks, and makeup that holds effortlessly through tears of joy and endless dancing."
            </div>

            <button onClick={() => startBooking(null, 'salon')} className="btn btn-gold">
              Book a Consultation with Ananya
            </button>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
              alt={salonInfo.artistName}
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-gold)', boxShadow: 'var(--shadow-glow)' }}
            />
          </div>
        </div>

        {/* Luxury Brands Used */}
        <div style={{ marginBottom: '5rem', textStyle: 'center' }}>
          <div className="section-header">
            <span className="section-subtitle">Premium Products</span>
            <h2 className="section-title">International Brands & Cosmetics Used</h2>
            <p className="section-description">We strictly use 100% original, high-performance luxury cosmetics.</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {brands.map((b, i) => (
              <div key={i} className="glass-card" style={{ padding: '0.85rem 1.8rem', fontWeight: '600', color: 'var(--primary-gold)', fontSize: '1rem' }}>
                ✦ {b}
              </div>
            ))}
          </div>
        </div>

        {/* Hygiene & Safety Standards */}
        <div className="glass-card" style={{ padding: '3rem', marginBottom: '5rem', background: 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(26,22,34,0.9) 100%)', borderColor: 'var(--border-gold)' }}>
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <ShieldCheck size={40} style={{ color: 'var(--primary-gold)', margin: '0 auto 0.5rem auto' }} />
            <h2 className="section-title">Hygiene & Safety Protocol</h2>
            <p className="section-description">Your safety & comfort are our topmost priority.</p>
          </div>

          <div className="grid-3" style={{ gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <CheckCircle2 size={22} style={{ color: 'var(--primary-rose)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>Single-Use Disposable Kits</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mascara wands, lip applicators, and makeup sponges are strictly single-use per client.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <CheckCircle2 size={22} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>Sanitized Brushes & Palette</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>All makeup brushes undergo hospital-grade UV sterilization and alcohol cleansing after every session.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <CheckCircle2 size={22} style={{ color: 'var(--primary-rose)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>Skin Prep Protocol</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Customized patch testing and hypoallergenic primers tailored to sensitive or acne-prone skin.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
