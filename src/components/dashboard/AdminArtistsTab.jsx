// src/components/dashboard/AdminArtistsTab.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Plus,
  Star,
  Phone,
  Mail,
  Trash2,
  Edit2,
  Award,
  CheckCircle,
  X
} from 'lucide-react';

export const AdminArtistsTab = ({ searchQuery = '' }) => {
  const { artists, addArtist, updateArtist, deleteArtist, showToast } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingArtist, setEditingArtist] = useState(null);

  const [formState, setFormState] = useState({
    name: '',
    role: 'Senior Bridal Specialist',
    experience: '5 Years',
    phone: '',
    email: '',
    specialtiesText: 'Bridal HD, TEMPTU Airbrush',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  });

  const handleOpenAdd = () => {
    setEditingArtist(null);
    setFormState({
      name: '',
      role: 'Senior Bridal Specialist',
      experience: '5 Years',
      phone: '',
      email: '',
      specialtiesText: 'Bridal HD, TEMPTU Airbrush',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (art) => {
    setEditingArtist(art);
    setFormState({
      name: art.name,
      role: art.role,
      experience: art.experience,
      phone: art.phone || '',
      email: art.email || '',
      specialtiesText: (art.specialties || []).join(', '),
      image: art.image || ''
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name) return;

    const specialtiesList = formState.specialtiesText.split(',').map(s => s.trim()).filter(Boolean);

    if (editingArtist) {
      updateArtist({
        ...editingArtist,
        name: formState.name,
        role: formState.role,
        experience: formState.experience,
        phone: formState.phone,
        email: formState.email,
        specialties: specialtiesList.length > 0 ? specialtiesList : ['Bridal Makeovers'],
        image: formState.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      });
    } else {
      addArtist({
        name: formState.name,
        role: formState.role,
        experience: formState.experience,
        phone: formState.phone,
        email: formState.email,
        specialties: specialtiesList.length > 0 ? specialtiesList : ['Bridal Makeovers'],
        image: formState.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      });
    }

    setShowAddModal(false);
  };

  const filteredArtists = (artists || []).filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-subview">
      <div className="admin-card-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            Makeup Artists & Specialists
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Manage beauty team members, certifications, ratings, and service assignments.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-rose btn-sm">
          <Plus size={16} /> Add Makeup Artist
        </button>
      </div>

      <div className="grid-3" style={{ gap: '1.5rem' }}>
        {filteredArtists.map(artist => (
          <div key={artist.id} className="admin-white-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <img
                  src={artist.image}
                  alt={artist.name}
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-rose)' }}
                />
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>{artist.name}</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--primary-rose-dark)', fontWeight: '600' }}>{artist.role}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '2px', fontSize: '0.78rem', color: '#C29547', fontWeight: '700' }}>
                    <Star size={12} fill="#C29547" /> {artist.rating} ({artist.reviewsCount || 40}+ reviews)
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                <div><strong>Experience:</strong> {artist.experience}</div>
                {artist.phone && <div><strong>Phone:</strong> {artist.phone}</div>}
                {artist.email && <div><strong>Email:</strong> {artist.email}</div>}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Specialties:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.35rem' }}>
                  {(artist.specialties || []).map((spec, idx) => (
                    <span key={idx} className="badge badge-rose" style={{ fontSize: '0.68rem' }}>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #F5E8EC', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                <CheckCircle size={10} style={{ marginRight: '3px' }} /> {artist.status || 'Active'}
              </span>

              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  onClick={() => handleOpenEdit(artist)}
                  className="btn btn-outline-white btn-sm"
                  style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                  title="Edit Artist"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => deleteArtist(artist.id)}
                  className="btn btn-outline-white btn-sm"
                  style={{ color: '#e74c3c', padding: '0.3rem 0.5rem' }}
                  title="Delete Artist"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Artist Modal */}
      {showAddModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>
                {editingArtist ? 'Edit Makeup Artist' : 'Add New Makeup Artist'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="btn btn-sm btn-outline-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Shalini Roy"
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Role / Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Celebrity HD Makeup Lead"
                    value={formState.role}
                    onChange={e => setFormState({ ...formState, role: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Experience</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 6+ Years"
                    value={formState.experience}
                    onChange={e => setFormState({ ...formState, experience: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="+91 98765 00000"
                    value={formState.phone}
                    onChange={e => setFormState({ ...formState, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="artist@aurabeauty.in"
                    value={formState.email}
                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Specialties (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bridal HD, Airbrush Base, Saree Draping"
                  value={formState.specialtiesText}
                  onChange={e => setFormState({ ...formState, specialtiesText: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Profile Image URL</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://images.unsplash.com/..."
                  value={formState.image}
                  onChange={e => setFormState({ ...formState, image: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline-white btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-rose btn-sm">
                  {editingArtist ? 'Save Changes' : 'Add Artist'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
