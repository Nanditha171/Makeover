// src/components/common/AdminLoginModal.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

export const AdminLoginModal = () => {
  const { adminLogin, authError, activeTab, isAdminAuthenticated } = useApp();

  const [username, setUsername] = useState('Makeup');
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
    <div className="section-padding" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <div className="glass-card" style={{ maxWidth: '460px', width: '100%', padding: '2.5rem', border: '1px solid var(--border-gold)', boxShadow: 'var(--shadow-glow)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '54px', height: '54px', borderRadius: '50%',
            background: 'var(--gold-gradient)', color: '#000', display: 'flex',
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto'
          }}>
            <ShieldCheck size={28} />
          </div>

          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Owner Admin Login</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Protected portal. Authenticate with authorized credentials to manage website content & prices.
          </p>
        </div>

        {authError && (
          <div style={{
            background: 'rgba(231,76,60,0.15)',
            border: '1px solid rgba(231,76,60,0.4)',
            color: '#e74c3c',
            padding: '0.8rem 1rem',
            borderRadius: '8px',
            fontSize: '0.88rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={18} />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username *</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                required
                className="form-control"
                style={{ paddingLeft: '2.8rem' }}
                placeholder="Enter admin username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label">Password *</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="form-control"
                style={{ paddingLeft: '2.8rem', paddingRight: '2.8rem' }}
                placeholder="Enter admin password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-gold"
            style={{ width: '100%', padding: '0.95rem', fontSize: '1.05rem' }}
          >
            {isSubmitting ? 'Authenticating Securely...' : 'Authenticate & Access Admin'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1.5rem' }}>
          🔒 Passwords are validated securely via backend bcrypt hashing.
        </div>
      </div>
    </div>
  );
};
