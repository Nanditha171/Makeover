// src/components/services/ServicesPage.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Sparkles, Clock, CheckCircle2, Filter } from 'lucide-react';

export const ServicesPage = () => {
  const { services, formatPrice, startBooking } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Bridal Makeup',
    'Engagement & Reception',
    'Party & Event Makeup',
    'Hairstyling',
    'Draping',
    'Salon Beauty Services'
  ];

  // Filter Services
  const filteredServices = services.filter(srv => {
    const matchesCategory = selectedCategory === 'All' || srv.category === selectedCategory;
    const matchesSearch = srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="services-page section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Transparent Pricing</span>
          <h2 className="section-title">Services & Rate Menu</h2>
          <p className="section-description">
            Explore our curated menu of beauty treatments, HD/Airbrush makeup, and salon pampering. Prices are clearly listed in Indian Rupees (₹).
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-gold' : 'btn-outline-white'}`}
                style={{ whiteSpace: 'nowrap' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
            <Search size={18} style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-control"
              placeholder="Search services (e.g. Airbrush, Facial, Saree Draping)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.8rem' }}
            />
          </div>
        </div>

        {/* Services List Grid */}
        {filteredServices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No services match your search query. Try searching for "Bridal" or "Makeup".
          </div>
        ) : (
          <div className="grid-3">
            {filteredServices.map(srv => (
              <div key={srv.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span className="badge badge-gold">{srv.category}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={13} /> {srv.duration}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{srv.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                    {srv.description}
                  </p>

                  {srv.inclusions && srv.inclusions.length > 0 && (
                    <div style={{ marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                      <strong style={{ color: 'var(--primary-rose)', display: 'block', marginBottom: '0.4rem' }}>Includes:</strong>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        {srv.inclusions.map((inc, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                            <CheckCircle2 size={13} style={{ color: 'var(--primary-gold)' }} />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Price</span>
                    <span style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--primary-gold)' }}>
                      {formatPrice(srv.price, srv.isStartingFrom)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => startBooking(srv, 'salon')} className="btn btn-gold btn-sm" style={{ flex: 1 }}>
                      Book Salon
                    </button>
                    <button onClick={() => startBooking(srv, 'home')} className="btn btn-rose btn-sm" style={{ flex: 1 }}>
                      Book Home
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
