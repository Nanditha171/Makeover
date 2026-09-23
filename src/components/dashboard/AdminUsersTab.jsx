// src/components/dashboard/AdminUsersTab.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Plus,
  Trash2,
  UserCheck,
  Mail,
  Phone,
  Clock,
  X,
  Search,
  CheckCircle,
  AlertCircle,
  Calendar,
  Filter,
  Eye,
  ArrowUpDown,
  RefreshCw,
  Users,
  ShieldAlert
} from 'lucide-react';

export const AdminUsersTab = () => {
  const {
    adminUsers,
    addAdminUser,
    deleteAdminUser,
    registeredClients,
    refreshRegisteredClients,
    deleteClientAccount,
    bookings,
    formatPrice
  } = useApp();

  // Sub-view: 'clients' (User History) | 'staff' (Portal Staff)
  const [activeSubView, setActiveSubView] = useState('clients');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVerification, setFilterVerification] = useState('all'); // 'all' | 'verified' | 'unverified'
  const [filterProvider, setFilterProvider] = useState('all'); // 'all' | 'email' | 'google'
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'lastLogin' | 'name'

  // Add Staff Modal
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [staffForm, setStaffForm] = useState({
    name: '',
    email: '',
    role: 'Salon Manager'
  });

  // Selected Client Details Modal
  const [selectedUser, setSelectedUser] = useState(null);

  const handleStaffSubmit = (e) => {
    e.preventDefault();
    if (!staffForm.name || !staffForm.email) return;

    addAdminUser(staffForm);
    setStaffForm({ name: '', email: '', role: 'Salon Manager' });
    setShowAddStaffModal(false);
  };

  // Filter & Sort Registered Clients
  const filteredClients = (registeredClients || [])
    .filter(u => {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = u.fullName?.toLowerCase().includes(q);
      const emailMatch = u.email?.toLowerCase().includes(q);
      const phoneMatch = u.phone?.toLowerCase().includes(q);
      const searchOk = !q || nameMatch || emailMatch || phoneMatch;

      const verificationOk =
        filterVerification === 'all' ||
        (filterVerification === 'verified' && u.isVerified) ||
        (filterVerification === 'unverified' && !u.isVerified);

      const providerOk =
        filterProvider === 'all' ||
        (u.authProvider && u.authProvider.toLowerCase() === filterProvider.toLowerCase());

      return searchOk && verificationOk && providerOk;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sortBy === 'lastLogin') {
        return new Date(b.lastLoginAt || 0) - new Date(a.lastLoginAt || 0);
      }
      if (sortBy === 'name') {
        return (a.fullName || '').localeCompare(b.fullName || '');
      }
      return 0;
    });

  // Calculate Statistics
  const totalUsers = registeredClients.length;
  const verifiedUsers = registeredClients.filter(u => u.isVerified).length;
  const pendingUsers = totalUsers - verifiedUsers;

  const getUserBookings = (user) => {
    if (!user) return [];
    return (bookings || []).filter(
      b => (b.userId && b.userId === user.uid) ||
           (b.userEmail && b.userEmail.toLowerCase() === user.email?.toLowerCase()) ||
           (b.phone && user.phone && b.phone.replace(/\D/g, '') === user.phone.replace(/\D/g, ''))
    );
  };

  return (
    <div className="admin-subview">
      {/* Card Header & Sub-View Switcher */}
      <div className="admin-card-header" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            Users & Client History Management
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Monitor registered customer accounts, OTP verification status, access logs, and staff permissions.
          </p>
        </div>

        {/* View Toggle */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-secondary)',
          padding: '0.3rem',
          borderRadius: '10px',
          border: '1px solid var(--border-subtle)',
          gap: '0.3rem'
        }}>
          <button
            onClick={() => setActiveSubView('clients')}
            className={`btn btn-sm ${activeSubView === 'clients' ? 'btn-rose' : 'btn-outline-white'}`}
            style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}
          >
            <Users size={14} /> Registered Clients ({totalUsers})
          </button>
          <button
            onClick={() => setActiveSubView('staff')}
            className={`btn btn-sm ${activeSubView === 'staff' ? 'btn-rose' : 'btn-outline-white'}`}
            style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}
          >
            <ShieldCheck size={14} /> Portal Staff ({adminUsers?.length || 0})
          </button>
        </div>
      </div>

      {/* ===================== VIEW 1: REGISTERED CLIENTS (USER HISTORY) ===================== */}
      {activeSubView === 'clients' && (
        <div>
          {/* Quick Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div className="admin-white-card" style={{ padding: '1.15rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(212, 106, 134, 0.1)', color: 'var(--primary-rose-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Registered</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)' }}>{totalUsers}</div>
              </div>
            </div>

            <div className="admin-white-card" style={{ padding: '1.15rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(46, 204, 113, 0.1)', color: '#27ae60', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>OTP Verified</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#27ae60' }}>{verifiedUsers}</div>
              </div>
            </div>

            <div className="admin-white-card" style={{ padding: '1.15rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Pending OTP</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#e74c3c' }}>{pendingUsers}</div>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="admin-white-card" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.75rem', flex: 1, minWidth: '260px', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search client by Name, Email, or Mobile..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '2.4rem', fontSize: '0.86rem' }}
                />
              </div>

              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="btn btn-outline-white btn-sm">
                  Clear
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Verification Filter */}
              <select
                className="form-control"
                value={filterVerification}
                onChange={e => setFilterVerification(e.target.value)}
                style={{ fontSize: '0.82rem', padding: '0.45rem 0.75rem', width: 'auto' }}
              >
                <option value="all">All Verification Status</option>
                <option value="verified">Verified Only</option>
                <option value="unverified">Pending OTP Only</option>
              </select>

              {/* Provider Filter */}
              <select
                className="form-control"
                value={filterProvider}
                onChange={e => setFilterProvider(e.target.value)}
                style={{ fontSize: '0.82rem', padding: '0.45rem 0.75rem', width: 'auto' }}
              >
                <option value="all">All Auth Methods</option>
                <option value="email">Email & Password</option>
                <option value="google">Google Sign-In</option>
              </select>

              {/* Sort By */}
              <select
                className="form-control"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{ fontSize: '0.82rem', padding: '0.45rem 0.75rem', width: 'auto' }}
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="lastLogin">Sort: Recent Login</option>
                <option value="name">Sort: Name (A-Z)</option>
              </select>

              <button
                onClick={refreshRegisteredClients}
                className="btn btn-outline-white btn-sm"
                title="Refresh List"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Users History Table */}
          <div className="admin-white-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="admin-table-container">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Client Name / ID</th>
                    <th>Email Address</th>
                    <th>Mobile Number</th>
                    <th>Registration Date</th>
                    <th>OTP Verification</th>
                    <th>Auth Provider</th>
                    <th>Last Active</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan="9" style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                        No registered users match the search and filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredClients.map(u => {
                      const userBookings = getUserBookings(u);
                      return (
                        <tr key={u.uid || u.email}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                              <div style={{
                                width: '34px',
                                height: '34px',
                                borderRadius: '50%',
                                background: 'var(--rose-gradient)',
                                color: '#FFFFFF',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.85rem',
                                flexShrink: 0
                              }}>
                                {(u.fullName?.[0] || u.email?.[0] || 'U').toUpperCase()}
                              </div>
                              <div>
                                <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.88rem' }}>
                                  {u.fullName || 'Client'}
                                </strong>
                                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                  UID: {u.uid?.slice(0, 12)}...
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{u.email}</span>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                              {u.phone || '—'}
                            </span>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                            </span>
                          </td>
                          <td>
                            {u.isVerified ? (
                              <span className="badge badge-green" style={{ fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                <CheckCircle size={11} /> Verified
                              </span>
                            ) : (
                              <span className="badge badge-red" style={{ fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                <AlertCircle size={11} /> Pending OTP
                              </span>
                            )}
                          </td>
                          <td>
                            <span className="badge badge-rose" style={{ textTransform: 'capitalize', fontSize: '0.72rem' }}>
                              {u.authProvider || 'Email'}
                            </span>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${u.status === 'Suspended' ? 'badge-red' : 'badge-green'}`} style={{ fontSize: '0.7rem' }}>
                              {u.status || 'Active'}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.35rem' }}>
                              <button
                                onClick={() => setSelectedUser(u)}
                                className="btn btn-outline-white btn-sm"
                                style={{ padding: '0.25rem 0.5rem', color: 'var(--primary-rose-dark)' }}
                                title="View User Profile & Bookings"
                              >
                                <Eye size={13} /> Details
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to remove user record for ${u.fullName || u.email}?`)) {
                                    deleteClientAccount(u.uid || u.email);
                                  }
                                }}
                                className="btn btn-outline-white btn-sm"
                                style={{ color: '#e74c3c', padding: '0.25rem 0.5rem' }}
                                title="Delete Record"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===================== VIEW 2: PORTAL STAFF & ADMINS ===================== */}
      {activeSubView === 'staff' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button onClick={() => setShowAddStaffModal(true)} className="btn btn-rose btn-sm">
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
        </div>
      )}

      {/* ===================== USER DETAILS MODAL ===================== */}
      {selectedUser && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedUser(null)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px', width: '92%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--rose-gradient)', color: '#FFFFFF', fontWeight: '700', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {(selectedUser.fullName?.[0] || selectedUser.email?.[0] || 'U').toUpperCase()}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', margin: 0 }}>
                    {selectedUser.fullName || 'Client Profile'}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    UID: {selectedUser.uid}
                  </span>
                </div>
              </div>

              <button onClick={() => setSelectedUser(null)} className="btn btn-sm btn-outline-white">
                <X size={16} />
              </button>
            </div>

            {/* Profile Fields Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', marginBottom: '1.25rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Email Address</span>
                <strong style={{ fontSize: '0.86rem', color: 'var(--text-primary)' }}>{selectedUser.email}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Mobile Number</span>
                <strong style={{ fontSize: '0.86rem', color: 'var(--text-primary)' }}>{selectedUser.phone || 'Not provided'}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>OTP Verification Status</span>
                <span className={`badge ${selectedUser.isVerified ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.72rem', marginTop: '0.2rem' }}>
                  {selectedUser.isVerified ? 'Verified' : 'Pending OTP Verification'}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Authentication Provider</span>
                <span className="badge badge-rose" style={{ fontSize: '0.72rem', marginTop: '0.2rem', textTransform: 'capitalize' }}>
                  {selectedUser.authProvider || 'Email & Password'}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Registration Date</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString('en-IN') : '—'}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Last Activity Timestamp</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  {selectedUser.lastLoginAt ? new Date(selectedUser.lastLoginAt).toLocaleString('en-IN') : 'Recent'}
                </span>
              </div>
            </div>

            {/* Linked Bookings History */}
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.65rem' }}>
              Linked Appointments & Vanity Bookings ({getUserBookings(selectedUser).length})
            </h4>

            {getUserBookings(selectedUser).length === 0 ? (
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', background: '#FFFFFF', padding: '0.85rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                No salon or home service appointments recorded yet for this client.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '180px', overflowY: 'auto', marginBottom: '1.25rem' }}>
                {getUserBookings(selectedUser).map(b => (
                  <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '0.82rem' }}>
                    <div>
                      <strong>#{b.id}</strong> — {b.serviceName}
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Date: {b.date} | Slot: {b.timeSlot}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>{b.status}</span>
                      <div style={{ fontWeight: '700', color: 'var(--primary-rose-dark)', marginTop: '2px' }}>
                        {formatPrice(b.totalPrice)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button onClick={() => setSelectedUser(null)} className="btn btn-rose btn-sm">
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== ADD STAFF MODAL ===================== */}
      {showAddStaffModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowAddStaffModal(false)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>Add Portal Staff User</h3>
              <button onClick={() => setShowAddStaffModal(false)} className="btn btn-sm btn-outline-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleStaffSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Radhika Verma"
                  value={staffForm.name}
                  onChange={e => setStaffForm({ ...staffForm, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  required
                  className="form-control"
                  placeholder="radhika@aurabeauty.in"
                  value={staffForm.email}
                  onChange={e => setStaffForm({ ...staffForm, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Role</label>
                <select
                  className="form-control"
                  value={staffForm.role}
                  onChange={e => setStaffForm({ ...staffForm, role: e.target.value })}
                >
                  <option value="Studio Director">Studio Director</option>
                  <option value="Salon Manager">Salon Manager</option>
                  <option value="Senior Makeup Artist">Senior Makeup Artist</option>
                  <option value="Front Desk Receptionist">Front Desk Receptionist</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddStaffModal(false)} className="btn btn-outline-white btn-sm">
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

