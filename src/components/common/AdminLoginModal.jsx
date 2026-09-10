// src/components/common/AdminLoginModal.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

export const AdminLoginModal = () => {
  const { adminLogin, authError, activeTab, isAdminAuthenticated } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsSubmitting(true);
    const result = await adminLogin(username, password);
    setIsSubmitting(false);

    if (result.success) {
      setPassword('');
    }
  };

  if (isAdminAuthenticated && activeTab === 'admin') return null;

  return (
    <div className="section-padding" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '65vh' }}>
      <div className="glass-card" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem', border: '1px solid var(--border-rose)', background: '#FFFFFF' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '50px', height: '50px', borderRadius: '50%',
            background: 'var(--rose-gradient)', color: '#FFFFFF', display: 'flex',
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem auto',
            boxShadow: '0 4px 14px rgba(212,106,134,0.3)'
          }}>
            <ShieldCheck size={26} />
          </div>

          <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>Owner Admin Login</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Enter authorized studio credentials to manage rates, portfolio, and appointments.
          </p>
        </div>

        {authError && (
          <div style={{
            background: 'rgba(235, 87, 87, 0.1)',
            border: '1px solid rgba(235, 87, 87, 0.3)',
            color: '#EB5757',
            padding: '0.75rem 0.9rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username *</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                required
                className="form-control"
                style={{ paddingLeft: '2.6rem' }}
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Password *</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="form-control"
                style={{ paddingLeft: '2.6rem', paddingRight: '2.6rem' }}
                placeholder="Enter admin password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-rose"
            style={{ width: '100%', padding: '0.85rem', fontSize: '0.98rem' }}
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In to Admin'} <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
