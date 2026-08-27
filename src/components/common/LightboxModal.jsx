// src/components/common/LightboxModal.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Calendar, Tag } from 'lucide-react';

export const LightboxModal = () => {
  const { modalState, closeModal, startBooking, formatPrice } = useApp();

  if (!modalState.isOpen || modalState.type !== 'lightbox' || !modalState.data) return null;

  const item = modalState.data;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-container"
        style={{ maxWidth: '850px', background: 'var(--bg-card)', padding: 0, overflow: 'hidden' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ position: 'relative' }}>
          {/* Close Button */}
          <button
            onClick={closeModal}
            style={{
              position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
              background: 'rgba(0,0,0,0.6)', color: '#fff', borderRadius: '50%', padding: '0.4rem'
            }}
          >
            <X size={22} />
          </button>

          {/* Media Display */}
          <div style={{ maxHeight: '550px', background: '#000', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={item.image || item.afterImage}
              alt={item.title}
              style={{ maxHeight: '550px', maxWidth: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Details Section */}
          <div style={{ padding: '1.75rem 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
                  {item.category || item.makeupType}
                </span>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.3rem' }}>
                  {item.description}
                </p>
              </div>

              {item.price && (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Price</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-gold)' }}>
                    {formatPrice(item.price)}
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginTop: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Tag size={15} style={{ color: 'var(--primary-rose)' }} />
                <span>Style Code: #{item.id}</span>
              </div>

              <button
                onClick={() => {
                  closeModal();
                  startBooking(item, 'salon');
                }}
                className="btn btn-gold btn-lg"
              >
                <Sparkles size={18} /> Book This Look Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
