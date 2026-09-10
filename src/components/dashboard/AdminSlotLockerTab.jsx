// src/components/dashboard/AdminSlotLockerTab.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  Unlock,
  Calendar,
  Clock,
  Plus,
  Trash2,
  ShieldAlert
} from 'lucide-react';

export const AdminSlotLockerTab = () => {
  const { blockedSlots, addBlockedSlot, removeBlockedSlot, showToast } = useApp();

  const [blockDate, setBlockDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [blockTimeSlot, setBlockTimeSlot] = useState('All Day');
  const [blockReason, setBlockReason] = useState('VIP Wedding Assignment');

  const handleBlockSubmit = (e) => {
    e.preventDefault();
    if (!blockDate) return;

    addBlockedSlot({
      date: blockDate,
      timeSlot: blockTimeSlot,
      reason: blockReason
    });

    showToast(`Slot ${blockTimeSlot} on ${blockDate} locked.`);
  };

  return (
    <div className="admin-subview">
      <div className="admin-card-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            Calendar Slot Locker
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Lock specific dates or time slots from public booking during holidays, venue travel, or celebrity assignments.
          </p>
        </div>
      </div>

      <div className="admin-white-card" style={{ marginBottom: '1.75rem', border: '1px solid var(--border-rose)' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Lock Date or Time Slot
        </h3>

        <form onSubmit={handleBlockSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Date to Block *</label>
            <input
              type="date"
              required
              className="form-control"
              value={blockDate}
              onChange={e => setBlockDate(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Time Slot</label>
            <select
              className="form-control"
              value={blockTimeSlot}
              onChange={e => setBlockTimeSlot(e.target.value)}
            >
              <option value="All Day">All Day</option>
              <option value="06:00 AM">06:00 AM</option>
              <option value="08:30 AM">08:30 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="02:30 PM">02:30 PM</option>
              <option value="04:00 PM">04:00 PM</option>
              <option value="05:30 PM">05:30 PM</option>
              <option value="07:00 PM">07:00 PM</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Reason / Assignment</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. VIP Celebrity Shoot"
              value={blockReason}
              onChange={e => setBlockReason(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0, display: 'flex', alignItems: 'flex-end' }}>
            <button type="submit" className="btn btn-rose btn-sm" style={{ width: '100%', height: '42px' }}>
              <Lock size={15} /> Lock Slot
            </button>
          </div>
        </form>
      </div>

      <div className="admin-white-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #EEDDE2' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-primary)' }}>
            Currently Blocked Slots ({blockedSlots.length})
          </h3>
        </div>

        {blockedSlots.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <Unlock size={36} color="#27AE60" style={{ margin: '0 auto 0.5rem', opacity: 0.7 }} />
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>No Blocked Slots</h4>
            <p style={{ fontSize: '0.82rem' }}>All dates and time slots are currently open for customer bookings.</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Reason / Assignment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {blockedSlots.map((b, idx) => (
                  <tr key={idx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700' }}>
                        <Lock size={13} color="var(--primary-rose)" /> {b.date}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-gray">{b.timeSlot}</span>
                    </td>
                    <td>{b.reason || 'Blocked Slot'}</td>
                    <td>
                      <button
                        onClick={() => removeBlockedSlot(b.date, b.timeSlot)}
                        className="btn btn-outline-white btn-sm"
                      >
                        <Unlock size={13} /> Unblock
                      </button>
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
