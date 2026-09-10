// src/components/dashboard/AdminServicesTab.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  Clock,
  MapPin,
  Search,
  Check,
  X
} from 'lucide-react';

export const AdminServicesTab = ({ searchQuery = '' }) => {
  const { services, addService, updateService, deleteService, formatPrice } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [localSearch, setLocalSearch] = useState('');

  const categories = [
    'All',
    'Bridal Makeup',
    'Engagement & Reception',
    'Party & Event Makeup',
    'Hairstyling',
    'Draping',
    'Salon Beauty Services'
  ];

  const [formState, setFormState] = useState({
    name: '',
    category: 'Bridal Makeup',
    price: '',
    duration: '2 Hours',
    description: '',
    availableAt: 'Salon & Home Service',
    inclusionsText: 'Skin Preparation\nHD Base Application\n3D Eyelashes',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80'
  });

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormState({
      name: '',
      category: 'Bridal Makeup',
      price: '',
      duration: '2 Hours',
      description: '',
      availableAt: 'Salon & Home Service',
      inclusionsText: 'Skin Preparation\nHD Base Application\n3D Eyelashes',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80'
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (srv) => {
    setEditingService(srv);
    setFormState({
      name: srv.name,
      category: srv.category,
      price: srv.price,
      duration: srv.duration,
      description: srv.description || '',
      availableAt: srv.availableAt || 'Salon & Home Service',
      inclusionsText: (srv.inclusions || []).join('\n'),
      image: srv.image || ''
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.price) return;

    const inclusionsList = formState.inclusionsText.split('\n').map(i => i.trim()).filter(Boolean);

    if (editingService) {
      updateService({
        ...editingService,
        name: formState.name,
        category: formState.category,
        price: parseInt(formState.price),
        duration: formState.duration,
        description: formState.description,
        availableAt: formState.availableAt,
        inclusions: inclusionsList,
        image: formState.image || 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80'
      });
    } else {
      addService({
        name: formState.name,
        category: formState.category,
        price: parseInt(formState.price),
        duration: formState.duration,
        description: formState.description,
        availableAt: formState.availableAt,
        inclusions: inclusionsList,
        image: formState.image || 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80'
      });
    }

    setShowAddModal(false);
  };

  const effectiveSearch = (searchQuery || localSearch).toLowerCase().trim();
  const filteredServices = (services || []).filter(s => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(effectiveSearch) ||
      (s.description || '').toLowerCase().includes(effectiveSearch) ||
      s.category.toLowerCase().includes(effectiveSearch);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="admin-subview">
      {/* Header */}
      <div className="admin-card-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            Services & Beauty Treatments
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Manage catalog services, pricing, durations, inclusions, and salon vs doorstep availability.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="admin-search-box" style={{ width: '220px' }}>
            <Search size={15} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search treatments..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>

          <button onClick={handleOpenAdd} className="btn btn-rose btn-sm">
            <Plus size={16} /> Add Treatment
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn btn-sm ${selectedCategory === cat ? 'btn-rose' : 'btn-outline-white'}`}
            style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid-3" style={{ gap: '1.5rem' }}>
        {filteredServices.map(srv => (
          <div key={srv.id} className="admin-white-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0', overflow: 'hidden' }}>
            <div style={{ height: '160px', position: 'relative', overflow: 'hidden' }}>
              <img
                src={srv.image}
                alt={srv.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span className="badge badge-rose" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                {srv.category}
              </span>
              <span className="badge badge-gray" style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(35, 20, 27, 0.85)', color: '#FFFFFF' }}>
                <Clock size={11} style={{ marginRight: '3px' }} /> {srv.duration}
              </span>
            </div>

            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.3' }}>
                    {srv.name}
                  </h3>
                  <span style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--primary-rose-dark)', whiteSpace: 'nowrap' }}>
                    {formatPrice(srv.price)}
                  </span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                  {srv.description}
                </p>

                {srv.inclusions && srv.inclusions.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Inclusions:
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.25rem' }}>
                      {srv.inclusions.slice(0, 3).map((inc, i) => (
                        <li key={i} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '2px' }}>
                          <Check size={12} color="#27ae60" /> {inc}
                        </li>
                      ))}
                      {srv.inclusions.length > 3 && (
                        <li style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                          + {srv.inclusions.length - 3} more inclusions
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid #F5E8EC', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  📍 {srv.availableAt || 'Salon & Home'}
                </span>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    onClick={() => handleOpenEdit(srv)}
                    className="btn btn-outline-white btn-sm"
                    style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                    title="Edit Service"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => deleteService(srv.id)}
                    className="btn btn-outline-white btn-sm"
                    style={{ color: '#e74c3c', padding: '0.3rem 0.5rem' }}
                    title="Delete Service"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Service Modal */}
      {showAddModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>
                {editingService ? 'Edit Treatment' : 'Add New Service'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="btn btn-sm btn-outline-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Service Name *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Royal Airbrush Bridal Makeover"
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control"
                    value={formState.category}
                    onChange={e => setFormState({ ...formState, category: e.target.value })}
                  >
                    <option value="Bridal Makeup">Bridal Makeup</option>
                    <option value="Engagement & Reception">Engagement & Reception</option>
                    <option value="Party & Event Makeup">Party & Event Makeup</option>
                    <option value="Hairstyling">Hairstyling</option>
                    <option value="Draping">Draping</option>
                    <option value="Salon Beauty Services">Salon Beauty Services</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    placeholder="e.g. 15000"
                    value={formState.price}
                    onChange={e => setFormState({ ...formState, price: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 2.5 - 3 Hours"
                    value={formState.duration}
                    onChange={e => setFormState({ ...formState, duration: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Availability</label>
                  <select
                    className="form-control"
                    value={formState.availableAt}
                    onChange={e => setFormState({ ...formState, availableAt: e.target.value })}
                  >
                    <option value="Salon & Home Service">Salon & Home Service</option>
                    <option value="Salon Studio Only">Salon Studio Only</option>
                    <option value="Home Service Only">Home Service Only</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  rows={2}
                  className="form-control"
                  placeholder="Short description of the treatment..."
                  value={formState.description}
                  onChange={e => setFormState({ ...formState, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Inclusions (one per line)</label>
                <textarea
                  rows={3}
                  className="form-control"
                  placeholder="Skin Pre-prep&#10;TEMPTU Airbrush Foundation&#10;3D Lashes"
                  value={formState.inclusionsText}
                  onChange={e => setFormState({ ...formState, inclusionsText: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
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
                  {editingService ? 'Save Changes' : 'Add Treatment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
