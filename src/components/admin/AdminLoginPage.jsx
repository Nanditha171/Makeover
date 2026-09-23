// src/components/admin/AdminLoginPage.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export const AdminLoginPage = () => {
  const { adminLogin, authError, setAuthError, setActiveTab, isAdminAuthenticated } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (setAuthError) setAuthError('');

    if (!username.trim() || !password) {
      setLocalError('Please enter both your admin username and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await adminLogin(username.trim(), password);
    setIsSubmitting(false);

    if (result.success) {
      setPassword('');
      setLocalError('');
    } else {
      setLocalError(result.error || 'Invalid credentials. Please verify and try again.');
    }
  };

  const displayedError = localError || authError;

  return (
    <div className="section-padding" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '75vh',
      background: 'var(--bg-main)',
      padding: '2rem var(--container-padding)'
    }}>
      <div className="glass-card" style={{
        maxWidth: '450px',
        width: '100%',
        padding: 'clamp(1.5rem, 5vw, 2.5rem) clamp(1.25rem, 4vw, 2rem)',
        border: '1px solid var(--border-rose)',
        background: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 8px 32px rgba(212, 106, 134, 0.12)'
      }}>
        {/* Header Icon & Title */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'var(--rose-gradient)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.85rem auto',
            boxShadow: '0 6px 18px rgba(212,106,134,0.35)'
          }}>
            <ShieldCheck size={26} />
          </div>

          <h2 style={{
            fontSize: 'clamp(1.4rem, 3.5vw, 1.75rem)',
            color: 'var(--text-primary)',
            marginBottom: '0.35rem',
            fontFamily: 'var(--font-heading)'
          }}>
            Admin Portal Login
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
            Authentication is required. Enter authorized admin credentials to access the studio management dashboard.
          </p>
        </div>

        {/* Error Alert Box */}
        {displayedError && (
          <div style={{
            background: 'rgba(235, 87, 87, 0.08)',
            border: '1px solid rgba(235, 87, 87, 0.35)',
            color: '#C53030',
            padding: '0.75rem 0.9rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.86rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
            <div>
              <span style={{ fontWeight: '600' }}>Authentication Failed: </span>
              {displayedError}
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.15rem' }}>
            <label className="form-label" htmlFor="admin-username" style={{ fontWeight: '600', fontSize: '0.86rem' }}>
              Admin Username / Email *
            </label>
            <div style={{ position: 'relative' }}>
              <User
                size={17}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              />
              <input
                id="admin-username"
                type="text"
                required
                autoComplete="username"
                className="form-control"
                style={{
                  paddingLeft: '2.6rem',
                  borderColor: displayedError ? '#EB5757' : 'var(--border-rose)'
                }}
                placeholder="Enter admin username"
                value={username}
                onChange={e => {
                  setUsername(e.target.value);
                  if (localError) setLocalError('');
                }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label className="form-label" htmlFor="admin-password" style={{ fontWeight: '600', fontSize: '0.86rem', marginBottom: 0 }}>
                Admin Password *
              </label>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock
                size={17}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                className="form-control"
                style={{
                  paddingLeft: '2.6rem',
                  paddingRight: '2.8rem',
                  borderColor: displayedError ? '#EB5757' : 'var(--border-rose)'
                }}
                placeholder="Enter password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  if (localError) setLocalError('');
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.4rem'
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-rose"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '0.98rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(212,106,134,0.3)',
              minHeight: '46px'
            }}
          >
            {isSubmitting ? 'Verifying Credentials...' : 'Sign In to Admin Portal'}
            <ArrowRight size={17} />
          </button>
        </form>

        {/* Back to Client Website link */}
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1.15rem',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.84rem',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem',
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-rose-dark)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <ArrowLeft size={14} /> Return to Client Website
          </button>
        </div>
      </div>
    </div>
  );
};
