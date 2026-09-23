// src/components/common/LightboxModal.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Tag } from 'lucide-react';

export const LightboxModal = () => {
  const { modalState, closeModal, startBooking, formatPrice } = useApp();

  if (!modalState.isOpen || modalState.type !== 'lightbox' || !modalState.data) return null;

  const item = modalState.data;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-container"
        style={{ maxWidth: '750px', background: '#FFFFFF', padding: 0, overflow: 'hidden', border: '1px solid var(--border-rose)' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          {/* Close Button */}
          <button
            onClick={closeModal}
            style={{
              position: 'absolute', top: '0.85rem', right: '0.85rem', zIndex: 10,
              background: 'rgba(45, 28, 36, 0.75)', color: '#FFFFFF', borderRadius: '50%', width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Media Display */}
          <div style={{ maxHeight: '48vh', minHeight: '220px', background: '#FFF5F7', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img
              src={item.image || item.afterImage}
              alt={item.title}
              style={{ maxHeight: '48vh', maxWidth: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Details Section */}
          <div style={{ padding: '1.25rem 1.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <span className="badge badge-rose" style={{ marginBottom: '0.35rem' }}>
                  {item.category || item.makeupType}
                </span>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginTop: '0.2rem' }}>
                  {item.description}
                </p>
              </div>

              {item.price && (
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Estimated Price</span>
                  <div style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--primary-rose-dark)' }}>
                    {formatPrice(item.price)}
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem', marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Tag size={14} style={{ color: 'var(--primary-rose)' }} />
                <span>Style #{item.id}</span>
              </div>

              <button
                onClick={() => {
                  closeModal();
                  startBooking(item, 'salon');
                }}
                className="btn btn-rose btn-sm"
                style={{ minHeight: '40px' }}
              >
                <Sparkles size={15} /> Book This Look
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
