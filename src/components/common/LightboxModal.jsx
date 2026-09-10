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
        style={{ maxWidth: '800px', background: '#FFFFFF', padding: 0, overflow: 'hidden', border: '1px solid var(--border-rose)' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ position: 'relative' }}>
          {/* Close Button */}
          <button
            onClick={closeModal}
            style={{
              position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
              background: 'rgba(45, 28, 36, 0.75)', color: '#FFFFFF', borderRadius: '50%', padding: '0.4rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Media Display */}
          <div style={{ maxHeight: '520px', background: '#FFF5F7', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={item.image || item.afterImage}
              alt={item.title}
              style={{ maxHeight: '520px', maxWidth: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Details Section */}
          <div style={{ padding: '1.5rem 1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.85rem' }}>
              <div>
                <span className="badge badge-rose" style={{ marginBottom: '0.35rem' }}>
                  {item.category || item.makeupType}
                </span>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
                  {item.description}
                </p>
              </div>

              {item.price && (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Estimated Price</span>
                  <div style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--primary-rose-dark)' }}>
                    {formatPrice(item.price)}
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: '0.75rem' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Tag size={14} style={{ color: 'var(--primary-rose)' }} />
                <span>Style #{item.id}</span>
              </div>

              <button
                onClick={() => {
                  closeModal();
                  startBooking(item, 'salon');
                }}
                className="btn btn-rose btn-sm"
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
