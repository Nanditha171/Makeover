// src/components/dashboard/AdminReviewsTab.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Star,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Sparkles,
  Search,
  X
} from 'lucide-react';

export const AdminReviewsTab = ({ searchQuery = '' }) => {
  const { reviews, addReview, updateReviewStatus, toggleReviewFeatured, deleteReview } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  const [formState, setFormState] = useState({
    clientName: '',
    service: 'Bridal HD Makeup',
    artist: 'Ananya Sharma',
    rating: 5,
    comment: '',
    featured: true
  });

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : '5.0';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.clientName || !formState.comment) return;

    addReview({
      clientName: formState.clientName,
      service: formState.service,
      artist: formState.artist,
      rating: parseInt(formState.rating) || 5,
      comment: formState.comment,
      featured: formState.featured
    });

    setFormState({
      clientName: '',
      service: 'Bridal HD Makeup',
      artist: 'Ananya Sharma',
      rating: 5,
      comment: '',
      featured: true
    });

    setShowAddModal(false);
  };

  const effectiveSearch = (searchQuery || localSearch).toLowerCase().trim();
  const filteredReviews = (reviews || []).filter(r =>
    r.clientName.toLowerCase().includes(effectiveSearch) ||
    r.comment.toLowerCase().includes(effectiveSearch) ||
    (r.service || '').toLowerCase().includes(effectiveSearch)
  );

  return (
    <div className="admin-subview">
      <div className="admin-card-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            Customer Reviews & Ratings Moderation
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Moderate client testimonials, approve ratings, and pin featured stories to the public website.
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-rose btn-sm">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {/* Rating Metric Strip */}
      <div className="grid-3" style={{ gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div className="admin-white-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="admin-kpi-icon-bubble bubble-gold" style={{ width: '48px', height: '48px' }}>
            <Star size={24} fill="#C29547" />
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              {avgRating} / 5.0
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Average verified satisfaction</p>
          </div>
        </div>

        <div className="admin-white-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="admin-kpi-icon-bubble bubble-rose" style={{ width: '48px', height: '48px' }}>
            <Sparkles size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-rose-dark)', fontFamily: 'var(--font-heading)' }}>
              {reviews.length}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total moderated feedback</p>
          </div>
        </div>

        <div className="admin-white-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="admin-kpi-icon-bubble bubble-green" style={{ width: '48px', height: '48px' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#27AE60', fontFamily: 'var(--font-heading)' }}>
              {reviews.filter(r => r.featured).length}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Featured on website</p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid-2" style={{ gap: '1.25rem' }}>
        {filteredReviews.map(rev => (
          <div key={rev.id} className="admin-white-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>{rev.clientName}</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--primary-rose-dark)' }}>{rev.service} • {rev.artist}</span>
                </div>
                <div style={{ display: 'flex', gap: '2px', color: '#C29547' }}>
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} fill="#C29547" />
                  ))}
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '0.75rem 0', background: '#FDF7F8', padding: '0.75rem', borderRadius: '8px' }}>
                "{rev.comment}"
              </p>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Submitted on: {rev.date || 'Recent'}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #F5E8EC', paddingTop: '0.75rem', marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => toggleReviewFeatured(rev.id)}
                  className={`btn btn-sm ${rev.featured ? 'btn-gold' : 'btn-outline-white'}`}
                  style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem' }}
                >
                  <Sparkles size={11} style={{ marginRight: '3px' }} />
                  {rev.featured ? 'Featured on Web' : 'Pin to Home'}
                </button>
              </div>

              <button
                onClick={() => deleteReview(rev.id)}
                className="btn btn-outline-white btn-sm"
                style={{ color: '#e74c3c', padding: '0.25rem 0.5rem' }}
                title="Delete Review"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>Add Customer Testimonial</h3>
              <button onClick={() => setShowAddModal(false)} className="btn btn-sm btn-outline-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Client Name *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Sneha Reddy"
                  value={formState.clientName}
                  onChange={e => setFormState({ ...formState, clientName: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Service Booked</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Bridal HD Makeover"
                    value={formState.service}
                    onChange={e => setFormState({ ...formState, service: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Lead Artist</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Ananya Sharma"
                    value={formState.artist}
                    onChange={e => setFormState({ ...formState, artist: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Star Rating (1 - 5)</label>
                <select
                  className="form-control"
                  value={formState.rating}
                  onChange={e => setFormState({ ...formState, rating: parseInt(e.target.value) })}
                >
                  <option value={5}>5 Stars (Exceptional)</option>
                  <option value={4}>4 Stars (Very Good)</option>
                  <option value={3}>3 Stars (Average)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Review Comment *</label>
                <textarea
                  rows={3}
                  required
                  className="form-control"
                  placeholder="Customer feedback..."
                  value={formState.comment}
                  onChange={e => setFormState({ ...formState, comment: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline-white btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-rose btn-sm">
                  Publish Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
