// src/components/dashboard/AdminAppointmentsTab.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Search,
  Filter,
  CreditCard,
  CheckCircle,
  XCircle,
  FileText,
  User,
  MessageCircle
} from 'lucide-react';

export const AdminAppointmentsTab = ({ searchQuery = '' }) => {
  const { bookings, updateBookingStatus, formatPrice } = useApp();
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [localSearch, setLocalSearch] = useState('');
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);

  const todayStr = new Date().toISOString().split('T')[0];

  const effectiveSearch = (searchQuery || localSearch).toLowerCase().trim();

  const filteredBookings = bookings.filter(b => {
    // Status filter
    if (statusFilter === 'Today') {
      if (b.date !== todayStr) return false;
    } else if (statusFilter !== 'All' && b.status !== statusFilter) {
      return false;
    }

    // Type filter
    if (typeFilter !== 'All' && b.type !== typeFilter) {
      return false;
    }

    // Search query
    if (effectiveSearch) {
      const matchName = (b.customerName || '').toLowerCase().includes(effectiveSearch);
      const matchPhone = (b.phone || '').toLowerCase().includes(effectiveSearch);
      const matchService = (b.serviceName || '').toLowerCase().includes(effectiveSearch);
      const matchId = (b.id || '').toLowerCase().includes(effectiveSearch);
      return matchName || matchPhone || matchService || matchId;
    }

    return true;
  });

  return (
    <div className="admin-subview">
      {/* Header */}
      <div className="admin-card-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            Appointments & Reservations
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Schedule and manage all studio appointments, venue doorstep services, and client statuses.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="admin-search-box" style={{ width: '220px' }}>
            <Search size={15} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search by client, ID..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {['All', 'Today', 'Confirmed', 'Completed', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`btn btn-sm ${statusFilter === status ? 'btn-rose' : 'btn-outline-white'}`}
              style={{ fontSize: '0.8rem' }}
            >
              {status === 'Today' ? `📅 Today (${bookings.filter(b => b.date === todayStr).length})` : status}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location Type:</span>
          <select
            className="form-control"
            style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Locations</option>
            <option value="salon">Studio Appointments</option>
            <option value="home">Home & Venue Services</option>
          </select>
        </div>
      </div>

      {/* Table / List View */}
      {filteredBookings.length === 0 ? (
        <div className="admin-white-card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem', color: 'var(--text-muted)' }}>
          <CalendarCheck size={44} color="var(--primary-rose)" style={{ margin: '0 auto 0.75rem', opacity: 0.7 }} />
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>No Appointments Found</h3>
          <p style={{ fontSize: '0.85rem' }}>
            {effectiveSearch || statusFilter !== 'All' ? 'No appointments match the selected filters.' : 'When clients book services on the website, they will appear here in real-time.'}
          </p>
        </div>
      ) : (
        <div className="admin-white-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="admin-table-container">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Date & Time</th>
                  <th>Location</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(b => (
                  <tr key={b.id}>
                    <td>
                      <span className="badge badge-rose" style={{ fontFamily: 'monospace', fontSize: '0.78rem' }}>
                        #{b.id}
                      </span>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {b.createdDate || 'Recent'}
                      </div>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{b.customerName || 'Guest'}</strong>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>{b.phone}</span>
                    </td>
                    <td>
                      <strong style={{ fontSize: '0.86rem' }}>{b.serviceName}</strong>
                      {b.guestsCount > 1 && (
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{b.guestsCount} Persons</div>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.84rem', fontWeight: '600' }}>
                        <Calendar size={13} color="var(--primary-rose)" /> {b.date}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        <Clock size={12} /> {b.timeSlot}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>
                        {b.type === 'home' ? '🏠 Doorstep Home' : '✨ Studio Appointment'}
                      </span>
                      {b.address && (
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {b.address}
                        </div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{formatPrice(b.totalPrice)}</div>
                      <div style={{ fontSize: '0.72rem', color: '#27AE60' }}>Paid: {formatPrice(b.advancePaid)}</div>
                      {b.remainingAmount > 0 && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--primary-rose-dark)' }}>Due: {formatPrice(b.remainingAmount)}</div>
                      )}
                    </td>
                    <td>
                      <select
                        className={`table-badge-status ${
                          b.status === 'Completed' ? 'status-completed' :
                          b.status === 'Cancelled' ? 'status-cancelled' :
                          'status-confirmed'
                        }`}
                        style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => setSelectedBookingDetails(b)}
                        className="btn btn-outline-rose btn-sm"
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                      >
                        Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Appointment Invoice / Details Modal */}
      {selectedBookingDetails && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedBookingDetails(null)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #F5E8EC', paddingBottom: '0.75rem' }}>
              <div>
                <span className="badge badge-rose" style={{ marginBottom: '0.25rem' }}>Reservation Invoice Summary</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>
                  Booking #{selectedBookingDetails.id}
                </h3>
              </div>
              <button onClick={() => setSelectedBookingDetails(null)} className="btn btn-sm btn-outline-white">
                ✕
              </button>
            </div>

            <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.25rem', fontSize: '0.86rem' }}>
              <div>
                <strong style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Client Information</strong>
                <div style={{ marginTop: '0.35rem', fontWeight: '700' }}>{selectedBookingDetails.customerName}</div>
                <div>Phone: {selectedBookingDetails.phone}</div>
                {selectedBookingDetails.email && <div>Email: {selectedBookingDetails.email}</div>}
                {selectedBookingDetails.address && (
                  <div style={{ marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    📍 {selectedBookingDetails.address} {selectedBookingDetails.landmark && `(${selectedBookingDetails.landmark})`}
                  </div>
                )}
              </div>

              <div>
                <strong style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Service Details</strong>
                <div style={{ marginTop: '0.35rem', fontWeight: '700' }}>{selectedBookingDetails.serviceName}</div>
                <div>Type: {selectedBookingDetails.type === 'home' ? '🏠 Doorstep Home Service' : '✨ Studio Booking'}</div>
                <div>Date: {selectedBookingDetails.date} ({selectedBookingDetails.timeSlot})</div>
                <div>Guests: {selectedBookingDetails.guestsCount || 1}</div>
              </div>
            </div>

            {selectedBookingDetails.notes && (
              <div style={{ background: '#FAF2F4', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.84rem' }}>
                <strong>Client Notes:</strong> "{selectedBookingDetails.notes}"
              </div>
            )}

            <div style={{ background: '#FDF7F8', border: '1px solid #EEDDE2', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                <span>Service Price</span>
                <span>{formatPrice((selectedBookingDetails.totalPrice || 0) - (selectedBookingDetails.homeServiceFee || 0))}</span>
              </div>
              {selectedBookingDetails.homeServiceFee > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                  <span>Doorstep Travel & Vanity Charge</span>
                  <span>{formatPrice(selectedBookingDetails.homeServiceFee)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#27AE60', fontWeight: '600' }}>
                <span>Advance Deposit Paid ({selectedBookingDetails.paymentMethod || 'UPI'})</span>
                <span>- {formatPrice(selectedBookingDetails.advancePaid)}</span>
              </div>
              <div style={{ borderTop: '1px solid #EEDDE2', paddingTop: '0.6rem', marginTop: '0.4rem', display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1rem', color: 'var(--primary-rose-dark)' }}>
                <span>Balance Receivable at Venue</span>
                <span>{formatPrice(selectedBookingDetails.remainingAmount)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {selectedBookingDetails.phone && (
                <a
                  href={`https://wa.me/${selectedBookingDetails.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-white btn-sm"
                  style={{ color: '#27AE60' }}
                >
                  <MessageCircle size={14} /> WhatsApp Confirmation
                </a>
              )}

              <button
                onClick={() => setSelectedBookingDetails(null)}
                className="btn btn-rose btn-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
