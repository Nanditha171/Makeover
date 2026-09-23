// src/components/services/ServicesPage.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Clock, CheckCircle2, SlidersHorizontal, Package, Wand2 } from 'lucide-react';
import { PackagesPage } from '../packages/PackagesPage';
import { CustomPackageBuilder } from '../packages/CustomPackageBuilder';

export const ServicesPage = () => {
  const { services, packages, formatPrice, startBooking } = useApp();
  const [activeSection, setActiveSection] = useState('services'); // 'services' | 'packages' | 'custom-builder'
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
                          (srv.description && srv.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="services-page section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Transparent Pricing</span>
          <h2 className="section-title">Services & Packages</h2>
          <p className="section-description">
            Explore our curated menu of beauty treatments, HD/Airbrush makeup, and bridal packages. Prices in Indian Rupees (₹).
          </p>
        </div>

        {/* Section Switcher Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveSection('services')}
            className={`btn btn-sm ${activeSection === 'services' ? 'btn-rose' : 'btn-outline-white'}`}
          >
            <SlidersHorizontal size={15} /> Individual Services ({services.length})
          </button>
          <button
            onClick={() => setActiveSection('packages')}
            className={`btn btn-sm ${activeSection === 'packages' ? 'btn-rose' : 'btn-outline-white'}`}
          >
            <Package size={15} /> Bridal Packages ({packages.length})
          </button>
          <button
            onClick={() => setActiveSection('custom-builder')}
            className={`btn btn-sm ${activeSection === 'custom-builder' ? 'btn-rose' : 'btn-outline-white'}`}
          >
            <Wand2 size={15} /> Custom Package Builder
          </button>
        </div>

        {/* SECTION 1: INDIVIDUAL SERVICES */}
        {activeSection === 'services' && (
          <div>
            {/* Search & Category Filter Bar */}
            <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Category Tabs */}
              <div className="no-scrollbar" style={{ display: 'flex', gap: '0.45rem', overflowX: 'auto', paddingBottom: '0.35rem', WebkitOverflowScrolling: 'touch', justifyContent: 'flex-start', flexWrap: 'nowrap' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`btn btn-sm ${selectedCategory === cat ? 'btn-rose' : 'btn-outline-white'}`}
                    style={{ flexShrink: 0, fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div style={{ position: 'relative', maxWidth: '480px', margin: '0 auto', width: '100%' }}>
                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search services (e.g. Airbrush, Hair Spa, Saree Draping)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '2.6rem' }}
                />
              </div>
            </div>

            {/* Services Grid or Empty State */}
            {filteredServices.length === 0 ? (
              <div className="glass-card empty-state">
                <div className="empty-state-icon">
                  <Search size={28} />
                </div>
                <h3 className="empty-state-title">No Services Found</h3>
                <p className="empty-state-desc">
                  No services matched "{searchQuery}". Try searching with another keyword or resetting the category filter.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="btn btn-outline-rose btn-sm"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid-3">
                {filteredServices.map(srv => (
                  <div key={srv.id} className="glass-card" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.65rem' }}>
                        <span className="badge badge-rose">{srv.category}</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
                          <Clock size={13} /> {srv.duration}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.18rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>{srv.name}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.85rem', lineHeight: 1.5 }}>
                        {srv.description}
                      </p>

                      {srv.inclusions && srv.inclusions.length > 0 && (
                        <div style={{ marginBottom: '1.15rem', fontSize: '0.82rem' }}>
                          <strong style={{ color: 'var(--primary-rose-dark)', display: 'block', marginBottom: '0.35rem' }}>Includes:</strong>
                          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                            {srv.inclusions.map((inc, idx) => (
                              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                                <CheckCircle2 size={13} style={{ color: 'var(--primary-rose-dark)', flexShrink: 0 }} />
                                <span>{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Price</span>
                        <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-rose-dark)' }}>
                          {formatPrice(srv.price, srv.isStartingFrom)}
                        </span>
                      </div>

                      <div className="btn-group-responsive">
                        <button onClick={() => startBooking(srv, 'salon')} className="btn btn-rose btn-sm" style={{ flex: 1 }}>
                          Book Salon
                        </button>
                        <button onClick={() => startBooking(srv, 'home')} className="btn btn-outline-white btn-sm" style={{ flex: 1 }}>
                          Book Home
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: BRIDAL PACKAGES */}
        {activeSection === 'packages' && (
          <PackagesPage isEmbedded={true} />
        )}

        {/* SECTION 3: CUSTOM BUILDER */}
        {activeSection === 'custom-builder' && (
          <CustomPackageBuilder isEmbedded={true} />
        )}
      </div>
    </div>
  );
};
