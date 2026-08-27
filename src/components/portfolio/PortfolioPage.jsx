// src/components/portfolio/PortfolioPage.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Eye, Filter } from 'lucide-react';

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
    'HD Makeup',
    'Airbrush Makeup',
    'Hairstyling'
  ];

  const filteredItems = selectedFilter === 'All'
    ? portfolio
    : portfolio.filter(p => p.category === selectedFilter || p.type.includes(selectedFilter));

  return (
    <div className="portfolio-page section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Visual Showcase</span>
          <h2 className="section-title">Makeup & Hair Portfolio</h2>
          <p className="section-description">
            Filter through our real bride transformations, party looks, and hairstyling gallery. Click any look to enlarge or book a similar look.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`btn btn-sm ${selectedFilter === f ? 'btn-gold' : 'btn-outline-white'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid-3">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="glass-card"
              style={{ overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
              onClick={() => openModal('lightbox', item)}
            >
              <div style={{ height: '320px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(0deg, rgba(12,10,15,0.9) 0%, transparent 65%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span className="badge badge-gold">{item.category}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--primary-rose)' }}>{item.type}</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.4rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.8rem', lineHeight: 1.4 }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', gap: '0.5rem' }} onClick={e => e.stopPropagation()}>
                    <button onClick={() => openModal('lightbox', item)} className="btn btn-outline-white btn-sm" style={{ flex: 1 }}>
                      <Eye size={14} /> Lightbox
                    </button>
                    <button onClick={() => startBooking(item, 'salon')} className="btn btn-gold btn-sm" style={{ flex: 1 }}>
                      <Sparkles size={14} /> Book Similar Look
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
