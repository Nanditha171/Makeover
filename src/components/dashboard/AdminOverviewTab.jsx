// src/components/dashboard/AdminOverviewTab.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Sparkles,
  Layers,
  CalendarCheck,
  CreditCard,
  Package,
  ShoppingBag,
  Star,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  MapPin,
  CheckCircle,
  Plus
} from 'lucide-react';

export const AdminOverviewTab = ({ onNavigateTab, onOpenAddService, onOpenAddArtist }) => {
  const {
    bookings,
    updateBookingStatus,
    services,
    packages,
    products,
    offers,
    reviews,
    artists,
    enquiries,
    maintenanceMode,
    toggleMaintenanceMode,
    formatPrice
  } = useApp();

  // Extract unique clients
  const clientNamesMap = new Map();
  bookings.forEach(b => {
    if (b.customerName) clientNamesMap.set(b.customerName, b);
  });
  enquiries.forEach(e => {
    if (e.name) clientNamesMap.set(e.name, e);
  });
  const totalClientsCount = clientNamesMap.size || (bookings.length > 0 ? bookings.length : 0);

  // Financial calculations
  const nonCancelledBookings = bookings.filter(b => b.status !== 'Cancelled');
  const grossTurnover = nonCancelledBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const totalAdvanceCollected = nonCancelledBookings.reduce((sum, b) => sum + (b.advancePaid || 0), 0);
  const pendingBalanceReceivable = nonCancelledBookings.reduce((sum, b) => sum + (b.remainingAmount || 0), 0);

  // Today's date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = bookings.filter(b => b.date === todayStr && b.status !== 'Cancelled');
  const pendingAppointments = bookings.filter(b => b.status === 'Pending' || b.status === 'Confirmed');

  return (
    <div className="admin-overview-container">
      {/* 1. Header Section */}
      <div className="admin-dashboard-header">
        <div>
          <span className="admin-header-subtitle">REAL-TIME MAKEOVER ADMIN DASHBOARD</span>
          <h1 className="admin-header-main-title">Control Console Overview</h1>
        </div>

        <div className="admin-sync-banner-pill">
          <span className="pulse-dot" />
          <span>Website Real-Time Sync Active</span>
        </div>
      </div>

      {/* 2. Platform Status Banner Card */}
      <div className="admin-platform-status-banner">
        <div className="admin-platform-status-left">
          <div className="admin-status-icon-bubble">
            <ShieldCheck size={26} />
          </div>
          <div className="admin-platform-status-text">
            <h3>
              Public Platform Status
              <span className={maintenanceMode ? "admin-status-badge-red" : "admin-status-badge-amber"}>
                {maintenanceMode ? "MAINTENANCE ACTIVE" : "LIVE ONLINE"}
              </span>
            </h3>
            <p>Control public client access to salon reservations, doorstep home vanity appointments, and payment gateways.</p>
          </div>
        </div>

        <button
          onClick={toggleMaintenanceMode}
          className={`admin-maintenance-toggle-btn ${maintenanceMode ? 'btn-active-mode' : ''}`}
        >
          {maintenanceMode ? "Disable Maintenance Mode" : "Enable Maintenance Mode"}
        </button>
      </div>

      {/* 3. 5 Key KPI Summary Cards */}
      <div className="admin-kpi-grid">
        {/* Card 1: Total Clients */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <span className="admin-kpi-title">CLIENTS</span>
            <div className="admin-kpi-icon-bubble bubble-rose">
              <Users size={18} />
            </div>
          </div>
          <div className="admin-kpi-middle">
            <span className="admin-kpi-value">{totalClientsCount}</span>
            <span className="admin-kpi-tag tag-green">Live Data</span>
          </div>
          <p className="admin-kpi-desc">Verified client profiles</p>
        </div>

        {/* Card 2: Makeup Artists */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <span className="admin-kpi-title">MAKEUP ARTISTS</span>
            <div className="admin-kpi-icon-bubble bubble-gold">
              <Sparkles size={18} />
            </div>
          </div>
          <div className="admin-kpi-middle">
            <span className="admin-kpi-value">{artists?.length || 0}</span>
            <span className="admin-kpi-tag tag-green">Live Data</span>
          </div>
          <p className="admin-kpi-desc">Certified beauty specialists</p>
        </div>

        {/* Card 3: Total Services */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <span className="admin-kpi-title">SERVICES</span>
            <div className="admin-kpi-icon-bubble bubble-purple">
              <Layers size={18} />
            </div>
          </div>
          <div className="admin-kpi-middle">
            <span className="admin-kpi-value">{services?.length || 0}</span>
            <span className="admin-kpi-tag tag-green">Live Data</span>
          </div>
          <p className="admin-kpi-desc">Catalog & home treatments</p>
        </div>

        {/* Card 4: Total Bookings */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <span className="admin-kpi-title">TOTAL BOOKINGS</span>
            <div className="admin-kpi-icon-bubble bubble-blue">
              <CalendarCheck size={18} />
            </div>
          </div>
          <div className="admin-kpi-middle">
            <span className="admin-kpi-value">{bookings?.length || 0}</span>
            <span className="admin-kpi-tag tag-green">Live Data</span>
          </div>
          <p className="admin-kpi-desc">Confirmed reservations</p>
        </div>

        {/* Card 5: Gross Turnover */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <span className="admin-kpi-title">GROSS TURNOVER</span>
            <div className="admin-kpi-icon-bubble bubble-green">
              <CreditCard size={18} />
            </div>
          </div>
          <div className="admin-kpi-middle">
            <span className="admin-kpi-value">{formatPrice(grossTurnover)}</span>
            <span className="admin-kpi-tag tag-green">Live Sum</span>
          </div>
          <p className="admin-kpi-desc">Season booking value</p>
        </div>
      </div>

      {/* 4. Mid Section: Website Data Overview + CMS Quick Actions */}
      <div className="admin-overview-mid-grid">
        {/* Left: Website Data Overview */}
        <div className="admin-white-card">
          <div className="admin-card-header">
            <div className="admin-card-header-left">
              <h3>Website Data Overview</h3>
              <p>Live data counts synchronized with the website</p>
            </div>
            <button
              onClick={() => onNavigateTab('reports')}
              className="admin-analytics-link"
            >
              Full Analytics <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="admin-counters-strip">
            <div className="admin-counter-pill-box" onClick={() => onNavigateTab('customers')} style={{ cursor: 'pointer' }}>
              <div className="admin-counter-pill-title">CLIENTS</div>
              <div className="admin-counter-pill-num">{totalClientsCount}</div>
            </div>

            <div className="admin-counter-pill-box" onClick={() => onNavigateTab('artists')} style={{ cursor: 'pointer' }}>
              <div className="admin-counter-pill-title">ARTISTS</div>
              <div className="admin-counter-pill-num">{artists?.length || 0}</div>
            </div>

            <div className="admin-counter-pill-box" onClick={() => onNavigateTab('services')} style={{ cursor: 'pointer' }}>
              <div className="admin-counter-pill-title">SERVICES</div>
              <div className="admin-counter-pill-num">{services?.length || 0}</div>
            </div>

            <div className="admin-counter-pill-box" onClick={() => onNavigateTab('packages')} style={{ cursor: 'pointer' }}>
              <div className="admin-counter-pill-title">PACKAGES</div>
              <div className="admin-counter-pill-num">{packages?.length || 0}</div>
            </div>

            <div className="admin-counter-pill-box" onClick={() => onNavigateTab('products')} style={{ cursor: 'pointer' }}>
              <div className="admin-counter-pill-title">PRODUCTS</div>
              <div className="admin-counter-pill-num">{products?.length || 0}</div>
            </div>

            <div className="admin-counter-pill-box" onClick={() => onNavigateTab('reviews')} style={{ cursor: 'pointer' }}>
              <div className="admin-counter-pill-title">REVIEWS</div>
              <div className="admin-counter-pill-num">{reviews?.length || 0}</div>
            </div>
          </div>
        </div>

        {/* Right: CMS Shortcuts / Quick Actions */}
        <div className="admin-white-card">
          <div className="admin-card-header">
            <div className="admin-card-header-left">
              <h3>CMS Shortcuts</h3>
              <p>Quick management triggers</p>
            </div>
          </div>

          <div className="admin-shortcuts-group">
            <button
              onClick={() => onNavigateTab('services')}
              className="admin-shortcut-btn-dark"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Layers size={16} color="#D4A359" /> Manage Services
              </span>
              <Plus size={16} />
            </button>

            <button
              onClick={() => onNavigateTab('reviews')}
              className="admin-shortcut-btn-outline"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Star size={16} color="var(--primary-rose)" /> Moderate Customer Reviews
              </span>
              <ArrowUpRight size={16} />
            </button>

            <button
              onClick={() => onNavigateTab('artists')}
              className="admin-shortcut-btn-outline"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Sparkles size={16} color="#C29547" /> Manage Makeup Artists
              </span>
              <Plus size={16} />
            </button>

            <button
              onClick={() => onNavigateTab('appointments')}
              className="admin-shortcut-btn-outline"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CalendarCheck size={16} color="var(--primary-rose)" /> Manage Appointments
              </span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Bottom Section: Booking Overview Table & Revenue/Artist Performance */}
      <div className="admin-overview-bottom-grid">
        {/* Left: Booking Overview Table */}
        <div className="admin-white-card">
          <div className="admin-card-header">
            <div className="admin-card-header-left">
              <h3>Booking Overview</h3>
              <p>Real-time customer reservations and appointment status</p>
            </div>
            <button
              onClick={() => onNavigateTab('appointments')}
              className="btn btn-outline-rose btn-sm"
            >
              View All ({bookings.length})
            </button>
          </div>

          {bookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
              <CalendarCheck size={36} color="var(--primary-rose)" style={{ margin: '0 auto 0.5rem', opacity: 0.7 }} />
              <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>No Bookings Yet</h4>
              <p style={{ fontSize: '0.82rem' }}>When clients place appointments on the website, they will appear here live.</p>
            </div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>ID / Client</th>
                    <th>Service & Type</th>
                    <th>Date & Time</th>
                    <th>Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map(b => (
                    <tr key={b.id}>
                      <td>
                        <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{b.customerName || 'Guest'}</strong>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>#{b.id} • {b.phone}</span>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600' }}>{b.serviceName}</div>
                        <span className="badge badge-gray" style={{ fontSize: '0.68rem', marginTop: '2px' }}>
                          {b.type === 'home' ? '🏠 Doorstep Home Service' : '✨ Studio Appointment'}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.84rem' }}>{b.date}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.timeSlot}</div>
                      </td>
                      <td>
                        <div><strong>{formatPrice(b.totalPrice)}</strong></div>
                        <div style={{ fontSize: '0.72rem', color: '#27AE60' }}>Adv: {formatPrice(b.advancePaid)}</div>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right: Revenue Breakdown & Artist Performance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Revenue Overview Card */}
          <div className="admin-white-card">
            <div className="admin-card-header">
              <div className="admin-card-header-left">
                <h3>Revenue Overview</h3>
                <p>Payment distribution</p>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Advance Deposits Collected</span>
                <strong style={{ color: '#27AE60' }}>{formatPrice(totalAdvanceCollected)}</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#F0E5E8', borderRadius: '99px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${grossTurnover > 0 ? (totalAdvanceCollected / grossTurnover) * 100 : 0}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #2ecc71, #27ae60)',
                    borderRadius: '99px'
                  }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Pending Balance Receivable</span>
                <strong style={{ color: 'var(--primary-rose-dark)' }}>{formatPrice(pendingBalanceReceivable)}</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#F0E5E8', borderRadius: '99px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${grossTurnover > 0 ? (pendingBalanceReceivable / grossTurnover) * 100 : 0}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #E27B94, #D46A86)',
                    borderRadius: '99px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Makeup Artist Performance Preview */}
          <div className="admin-white-card">
            <div className="admin-card-header">
              <div className="admin-card-header-left">
                <h3>Artist Performance</h3>
                <p>Team roster & ratings</p>
              </div>
              <button
                onClick={() => onNavigateTab('artists')}
                className="admin-analytics-link"
              >
                View All <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="admin-perf-list">
              {artists?.slice(0, 3).map(art => (
                <div key={art.id} className="admin-perf-item">
                  <div className="admin-perf-item-left">
                    <img src={art.image} alt={art.name} className="admin-perf-item-avatar" />
                    <div className="admin-perf-info">
                      <h4>{art.name}</h4>
                      <span>{art.role}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#C29547', fontWeight: '700', fontSize: '0.85rem' }}>
                      <Star size={13} fill="#C29547" /> {art.rating}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{art.reviewsCount || 45} reviews</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
