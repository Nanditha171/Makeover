// src/components/dashboard/AdminUsersTab.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Plus,
  Trash2,
  UserCheck,
  Mail,
  Clock,
  X
} from 'lucide-react';

export const AdminUsersTab = () => {
  const { adminUsers, addAdminUser, deleteAdminUser } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    role: 'Salon Manager'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    addAdminUser(formState);
    setFormState({ name: '', email: '', role: 'Salon Manager' });
    setShowAddModal(false);
  };

  return (
    <div className="admin-subview">
      <div className="admin-card-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            User Management & Admin Access
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Manage staff credentials, portal permissions, and role-based operational access.
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-rose btn-sm">
          <Plus size={16} /> Add Portal User
        </button>
      </div>

      <div className="admin-white-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>User / Avatar</th>
                <th>Email Address</th>
                <th>Role & Permissions</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(adminUsers || []).map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: u.role === 'Super Admin' ? 'linear-gradient(135deg, #D46A86, #C29547)' : '#FDEEF2',
                          color: u.role === 'Super Admin' ? '#FFFFFF' : 'var(--primary-rose-dark)',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.88rem'
                        }}
                      >
                        {u.avatar || u.name[0]}
                      </div>
                      <div>
                        <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{u.name}</strong>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{u.email}</span>
                  </td>
                  <td>
                    <span className={`badge ${u.role === 'Super Admin' ? 'badge-green' : 'badge-rose'}`} style={{ fontSize: '0.72rem' }}>
                      <ShieldCheck size={11} style={{ marginRight: '3px' }} /> {u.role}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                      {u.status || 'Active'}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {u.lastLogin || 'Recent'}
                    </span>
                  </td>
                  <td>
                    {u.role !== 'Super Admin' && (
                      <button
                        onClick={() => deleteAdminUser(u.id)}
                        className="btn btn-outline-white btn-sm"
                        style={{ color: '#e74c3c', padding: '0.25rem 0.5rem' }}
                        title="Revoke User Access"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>Add Portal User</h3>
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
                  placeholder="e.g. Radhika Verma"
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  required
                  className="form-control"
                  placeholder="radhika@aurabeauty.in"
                  value={formState.email}
                  onChange={e => setFormState({ ...formState, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Role</label>
                <select
                  className="form-control"
                  value={formState.role}
                  onChange={e => setFormState({ ...formState, role: e.target.value })}
                >
                  <option value="Studio Director">Studio Director</option>
                  <option value="Salon Manager">Salon Manager</option>
                  <option value="Senior Makeup Artist">Senior Makeup Artist</option>
                  <option value="Front Desk Receptionist">Front Desk Receptionist</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline-white btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-rose btn-sm">
                  Grant Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
