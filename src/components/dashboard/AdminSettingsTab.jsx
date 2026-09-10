// src/components/dashboard/AdminSettingsTab.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Save,
  Shield,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2
} from 'lucide-react';

export const AdminSettingsTab = () => {
  const {
    salonInfo,
    setSalonInfo,
    policies,
    setPolicies,
    maintenanceMode,
    toggleMaintenanceMode,
    showToast
  } = useApp();

  const [infoForm, setInfoForm] = useState(salonInfo);
  const [policiesForm, setPoliciesForm] = useState(policies);

  const handleSaveInfo = (e) => {
    e.preventDefault();
    setSalonInfo(infoForm);
    showToast('Studio profile information saved successfully.');
  };

  const handleSavePolicies = (e) => {
    e.preventDefault();
    setPolicies(policiesForm);
    showToast('Booking policies updated successfully.');
  };

  return (
    <div className="admin-subview">
      <div className="admin-card-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            Studio Settings & Policies
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Configure studio contact channels, deposit percentages, travel vanity fees, and cancellation policies.
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '1.75rem' }}>
        {/* Studio Info Form */}
        <div className="admin-white-card">
          <div className="admin-card-header">
            <div className="admin-card-header-left">
              <h3>Studio Profile & Operations</h3>
              <p>Public business details shown to clients</p>
            </div>
          </div>

          <form onSubmit={handleSaveInfo}>
            <div className="form-group">
              <label className="form-label">Studio / Brand Name</label>
              <input
                type="text"
                className="form-control"
                value={infoForm.name}
                onChange={e => setInfoForm({ ...infoForm, name: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <div className="form-group">
                <label className="form-label">Lead Artist Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={infoForm.artistName}
                  onChange={e => setInfoForm({ ...infoForm, artistName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Artist Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={infoForm.title}
                  onChange={e => setInfoForm({ ...infoForm, title: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="+91 98765 43210"
                  value={infoForm.phone}
                  onChange={e => setInfoForm({ ...infoForm, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">WhatsApp Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="919876543210"
                  value={infoForm.whatsapp}
                  onChange={e => setInfoForm({ ...infoForm, whatsapp: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Studio Address</label>
              <textarea
                rows={2}
                className="form-control"
                value={infoForm.address}
                onChange={e => setInfoForm({ ...infoForm, address: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <div className="form-group">
                <label className="form-label">Advance Deposit (%)</label>
                <input
                  type="number"
                  className="form-control"
                  value={infoForm.advancePercent}
                  onChange={e => setInfoForm({ ...infoForm, advancePercent: parseInt(e.target.value) || 30 })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Home Service Travel Fee (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={infoForm.homeServiceCharge}
                  onChange={e => setInfoForm({ ...infoForm, homeServiceCharge: parseInt(e.target.value) || 500 })}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-rose btn-sm" style={{ width: '100%', marginTop: '0.5rem' }}>
              <Save size={15} /> Save Studio Information
            </button>
          </form>
        </div>

        {/* Policies Form */}
        <div className="admin-white-card">
          <div className="admin-card-header">
            <div className="admin-card-header-left">
              <h3>Client Policies & Terms</h3>
              <p>Deposit terms and cancellation rules</p>
            </div>
          </div>

          <form onSubmit={handleSavePolicies}>
            <div className="form-group">
              <label className="form-label">Advance Deposit Policy</label>
              <textarea
                rows={3}
                className="form-control"
                value={policiesForm.advancePolicy}
                onChange={e => setPoliciesForm({ ...policiesForm, advancePolicy: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Cancellation & Reschedule Policy</label>
              <textarea
                rows={3}
                className="form-control"
                value={policiesForm.cancellationPolicy}
                onChange={e => setPoliciesForm({ ...policiesForm, cancellationPolicy: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Doorstep Home Vanity Policy</label>
              <textarea
                rows={3}
                className="form-control"
                value={policiesForm.homeServicePolicy}
                onChange={e => setPoliciesForm({ ...policiesForm, homeServicePolicy: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hygiene & Sanitization Protocol</label>
              <textarea
                rows={2}
                className="form-control"
                value={policiesForm.hygienePolicy}
                onChange={e => setPoliciesForm({ ...policiesForm, hygienePolicy: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-rose btn-sm" style={{ width: '100%', marginTop: '0.5rem' }}>
              <Save size={15} /> Save Policy Terms
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
