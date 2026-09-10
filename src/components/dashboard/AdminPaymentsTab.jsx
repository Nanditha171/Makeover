// src/components/dashboard/AdminPaymentsTab.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Download
} from 'lucide-react';

export const AdminPaymentsTab = () => {
  const { bookings, formatPrice } = useApp();

  const nonCancelled = bookings.filter(b => b.status !== 'Cancelled');
  const grossTurnover = nonCancelled.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const totalAdvanceCollected = nonCancelled.reduce((sum, b) => sum + (b.advancePaid || 0), 0);
  const totalPendingBalance = nonCancelled.reduce((sum, b) => sum + (b.remainingAmount || 0), 0);
  const completedRevenue = bookings.filter(b => b.status === 'Completed').reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return (
    <div className="admin-subview">
      <div className="admin-card-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            Bookings & Payments
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Track advance deposits, settled salon balances, UPI payment records, and gross revenue turnover.
          </p>
        </div>
      </div>

      {/* Financial Summary KPI Cards */}
      <div className="grid-4" style={{ gap: '1.25rem', marginBottom: '1.75rem' }}>
        <div className="admin-white-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              GROSS TURNOVER
            </span>
            <div className="admin-kpi-icon-bubble bubble-green">
              <CreditCard size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            {formatPrice(grossTurnover)}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>All confirmed client bookings</p>
        </div>

        <div className="admin-white-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              ADVANCE COLLECTED
            </span>
            <div className="admin-kpi-icon-bubble bubble-rose">
              <TrendingUp size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#27AE60', fontFamily: 'var(--font-heading)' }}>
            {formatPrice(totalAdvanceCollected)}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Received via UPI / Online gateway</p>
        </div>

        <div className="admin-white-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              PENDING RECEIVABLES
            </span>
            <div className="admin-kpi-icon-bubble bubble-gold">
              <Clock size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-rose-dark)', fontFamily: 'var(--font-heading)' }}>
            {formatPrice(totalPendingBalance)}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Payable at venue / studio</p>
        </div>

        <div className="admin-white-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              SETTLED REVENUE
            </span>
            <div className="admin-kpi-icon-bubble bubble-blue">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            {formatPrice(completedRevenue)}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Completed appointment revenue</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="admin-white-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #EEDDE2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-primary)' }}>
              Transaction Ledger
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Itemized billing records per client appointment</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <CreditCard size={36} color="var(--primary-rose)" style={{ margin: '0 auto 0.5rem', opacity: 0.7 }} />
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>No Financial Records</h4>
            <p style={{ fontSize: '0.82rem' }}>Transactions will populate automatically as bookings are created.</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Transaction / Booking ID</th>
                  <th>Client Name</th>
                  <th>Service</th>
                  <th>Total Invoice</th>
                  <th>Advance Paid</th>
                  <th>Balance Due</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td>
                      <strong>#{b.id}</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                        {b.createdDate || b.date}
                      </span>
                    </td>
                    <td>
                      <div>{b.customerName}</div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{b.phone}</span>
                    </td>
                    <td>{b.serviceName}</td>
                    <td>
                      <strong style={{ color: 'var(--text-primary)' }}>{formatPrice(b.totalPrice)}</strong>
                    </td>
                    <td>
                      <span style={{ color: '#27AE60', fontWeight: '700' }}>{formatPrice(b.advancePaid)}</span>
                    </td>
                    <td>
                      <span style={{ color: b.remainingAmount > 0 ? 'var(--primary-rose-dark)' : 'var(--text-muted)', fontWeight: '700' }}>
                        {formatPrice(b.remainingAmount)}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-gray" style={{ fontSize: '0.72rem' }}>
                        {b.paymentMethod || 'UPI Advance'}
                      </span>
                    </td>
                    <td>
                      <span className={`table-badge-status ${
                        b.status === 'Completed' ? 'status-completed' :
                        b.status === 'Cancelled' ? 'status-cancelled' :
                        'status-confirmed'
                      }`}>
                        {b.status === 'Completed' ? 'Fully Settled' : b.status === 'Cancelled' ? 'Refund/Cancelled' : 'Advance Paid'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
