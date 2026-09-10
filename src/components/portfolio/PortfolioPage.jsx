// src/components/portfolio/PortfolioPage.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Eye, Image } from 'lucide-react';

export const PortfolioPage = () => {
  const { portfolio, openModal, startBooking } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = [
    'All',
    'Bridal',
    'Engagement',
    'Reception',
    'Party',
    'Traditional',
    'Hairstyling'
  ];

  const filteredItems = selectedFilter === 'All'
    ? portfolio
    : portfolio.filter(p => p.category === selectedFilter || (p.type && p.type.includes(selectedFilter)));

  return (
    <div className="portfolio-page section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Visual Gallery</span>
          <h2 className="section-title">Makeup & Hair Portfolio</h2>
          <p className="section-description">
            Explore our real bride transformations, engagement looks, and hairstyling gallery. Click to enlarge or book a similar makeover.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`btn btn-sm ${selectedFilter === f ? 'btn-rose' : 'btn-outline-white'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Gallery Grid or Empty State */}
        {filteredItems.length === 0 ? (
          <div className="glass-card empty-state">
            <div className="empty-state-icon">
              <Image size={32} />
            </div>
            <h3 className="empty-state-title">No Looks in this Category</h3>
            <p className="empty-state-desc">
              No gallery items found under "{selectedFilter}". Select another category or view all looks.
            </p>
            <button onClick={() => setSelectedFilter('All')} className="btn btn-outline-rose btn-sm">
              View All Portfolio Looks
            </button>
          </div>
        ) : (
          <div className="grid-3">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="glass-card"
                style={{ overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
                onClick={() => openModal('lightbox', item)}
              >
                <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  />
                  <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(0deg, rgba(45,28,36,0.92) 0%, rgba(45,28,36,0.3) 50%, transparent 100%)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span className="badge badge-rose">{item.category}</span>
                      <span style={{ fontSize: '0.75rem', color: '#FCEBEF', fontWeight: '500' }}>{item.type}</span>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.3rem' }}>{item.title}</h3>
                    <p style={{ color: '#EADCE0', fontSize: '0.8rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                      {item.description}
                    </p>

                    <div style={{ display: 'flex', gap: '0.4rem' }} onClick={e => e.stopPropagation()}>
                      <button onClick={() => openModal('lightbox', item)} className="btn btn-outline-white btn-sm" style={{ flex: 1, padding: '0.4rem' }}>
                        <Eye size={13} /> View Look
                      </button>
                      <button onClick={() => startBooking(item, 'salon')} className="btn btn-rose btn-sm" style={{ flex: 1, padding: '0.4rem' }}>
                        <Sparkles size={13} /> Book Look
                      </button>
                    </div>
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
