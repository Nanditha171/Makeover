// src/components/dashboard/AdminCustomersTab.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Search,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  MessageCircle,
  MapPin,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export const AdminCustomersTab = ({ searchQuery = '' }) => {
  const { bookings, enquiries, formatPrice } = useApp();
  const [selectedClient, setSelectedClient] = useState(null);
  const [localSearch, setLocalSearch] = useState('');

  // Aggregate clients from bookings + enquiries
  const clientMap = new Map();

  bookings.forEach(b => {
    const key = b.customerName ? b.customerName.trim().toLowerCase() : (b.phone || 'guest');
    if (!clientMap.has(key)) {
      clientMap.set(key, {
        id: `cli-${key}`,
        name: b.customerName || 'Valued Guest',
        phone: b.phone || 'N/A',
        email: b.email || '',
        address: b.address || '',
        bookings: [b],
        totalSpend: b.status !== 'Cancelled' ? (b.totalPrice || 0) : 0,
        lastBookingDate: b.date || b.createdDate
      });
    } else {
      const existing = clientMap.get(key);
      existing.bookings.push(b);
      if (b.status !== 'Cancelled') {
        existing.totalSpend += (b.totalPrice || 0);
      }
      if (b.date > existing.lastBookingDate) {
        existing.lastBookingDate = b.date;
      }
    }
  });

  enquiries.forEach(e => {
    const key = e.name ? e.name.trim().toLowerCase() : (e.phone || 'enq');
    if (!clientMap.has(key)) {
      clientMap.set(key, {
        id: `enq-${key}`,
        name: e.name || 'Inquiry Contact',
        phone: e.phone || 'N/A',
        email: e.email || '',
        address: e.location || '',
        bookings: [],
        totalSpend: 0,
        lastBookingDate: e.dateSubmitted || 'Recent Inquiry'
      });
    }
  });

  const clientsList = Array.from(clientMap.values());

  const effectiveSearch = (searchQuery || localSearch).toLowerCase().trim();
  const filteredClients = clientsList.filter(c =>
    c.name.toLowerCase().includes(effectiveSearch) ||
    c.phone.toLowerCase().includes(effectiveSearch) ||
    c.email.toLowerCase().includes(effectiveSearch)
  );

  return (
    <div className="admin-subview">
      <div className="admin-card-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            Customers & Clients
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Registered client directory, appointment histories, and lifetime spend records.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="admin-search-box" style={{ width: '240px' }}>
            <Search size={15} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Filter clients..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredClients.length === 0 ? (
        <div className="admin-white-card" style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-muted)' }}>
          <Users size={40} color="var(--primary-rose)" style={{ margin: '0 auto 0.75rem', opacity: 0.7 }} />
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>No Client Records Found</h3>
          <p style={{ fontSize: '0.85rem' }}>
            {effectiveSearch ? "No clients match your filter criteria." : "As new reservations and inquiries are submitted, clients will appear here automatically."}
          </p>
        </div>
      ) : (
        <div className="admin-white-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="admin-table-container">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Contact Details</th>
                  <th>Total Reservations</th>
                  <th>Lifetime Spend</th>
                  <th>Last Appointment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(client => (
                  <tr key={client.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: '#FDEEF2',
                            color: 'var(--primary-rose-dark)',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.88rem'
                          }}
                        >
                          {client.name[0].toUpperCase()}
                        </div>
                        <div>
                          <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{client.name}</strong>
                          {client.address && (
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                              <MapPin size={11} /> {client.address.slice(0, 24)}...
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.84rem' }}>{client.phone}</div>
                      {client.email && <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{client.email}</div>}
                    </td>
                    <td>
                      <span className="badge badge-rose">
                        {client.bookings.length} {client.bookings.length === 1 ? 'Booking' : 'Bookings'}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--primary-rose-dark)' }}>{formatPrice(client.totalSpend)}</strong>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{client.lastBookingDate}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {client.phone && (
                          <a
                            href={`https://wa.me/${client.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-outline-white btn-sm"
                            style={{ color: '#27ae60', padding: '0.3rem 0.5rem' }}
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle size={14} />
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedClient(client)}
                          className="btn btn-outline-rose btn-sm"
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Client Booking History Modal */}
      {selectedClient && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedClient(null)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-primary)' }}>
                  {selectedClient.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                  {selectedClient.phone} • {selectedClient.email || 'No email provided'}
                </p>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="btn btn-sm btn-outline-white"
              >
                ✕ Close
              </button>
            </div>

            <div style={{ background: '#FAF2F4', padding: '0.9rem', borderRadius: '10px', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Appointments</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>{selectedClient.bookings.length}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lifetime Spend</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-rose-dark)' }}>{formatPrice(selectedClient.totalSpend)}</div>
              </div>
            </div>

            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.75rem' }}>Appointment History</h4>

            {selectedClient.bookings.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Client inquiry only (no completed bookings yet).</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '250px', overflowY: 'auto' }}>
                {selectedClient.bookings.map(b => (
                  <div key={b.id} style={{ background: '#FDF7F8', border: '1px solid #EEDDE2', borderRadius: '8px', padding: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <strong>{b.serviceName}</strong>
                      <span className="badge badge-rose">{b.status}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Date: {b.date} ({b.timeSlot}) • {b.type === 'home' ? 'Home Service' : 'Studio'}
                    </div>
                    <div style={{ fontSize: '0.8rem', marginTop: '0.35rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      Total: {formatPrice(b.totalPrice)} | Advance Paid: {formatPrice(b.advancePaid)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
