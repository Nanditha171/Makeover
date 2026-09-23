// src/components/common/CustomerAuthModal.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Mail, Lock, User, Eye, EyeOff, X, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const CustomerAuthModal = () => {
  const {
    customerAuthModalOpen,
    closeCustomerAuthModal,
    customerUser,
    loginCustomer,
    registerCustomer,
    loginCustomerWithGoogle,
    resetCustomerPassword,
    logoutCustomer,
    showToast
  } = useApp();

  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!customerAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (mode === 'forgot') {
      if (!email.trim()) {
        setError('Please enter your email address to reset password.');
        return;
      }
      setLoading(true);
      const res = await resetCustomerPassword(email.trim());
      setLoading(false);
      if (res.success) {
        setSuccessMsg('Password reset instructions have been sent to your email.');
      } else {
        setError(res.error || 'Failed to send reset email.');
      }
      return;
    }

    if (!email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    let result;

    if (mode === 'register') {
      result = await registerCustomer(email.trim(), password, displayName.trim());
    } else {
      result = await loginCustomer(email.trim(), password);
    }

    setLoading(false);

    if (result.success) {
      showToast(mode === 'register' ? '🎉 Account created successfully!' : '✨ Welcome back!');
      closeCustomerAuthModal();
      setEmail('');
      setPassword('');
      setDisplayName('');
    } else {
      setError(result.error || 'Authentication failed. Please verify and try again.');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    const result = await loginCustomerWithGoogle();
    setLoading(false);

    if (result.success) {
      showToast('✨ Signed in with Google successfully!');
      closeCustomerAuthModal();
    } else {
      setError(result.error || 'Google Sign-In was cancelled or failed.');
    }
  };

  return (
    <div className="modal-overlay" onClick={closeCustomerAuthModal}>
      <div className="modal-container" style={{ maxWidth: '460px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'var(--rose-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Sparkles size={16} />
            </div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
              {mode === 'login' ? 'Client Sign In' : mode === 'register' ? 'Create Client Account' : 'Reset Password'}
            </h3>
          </div>
          <button onClick={closeCustomerAuthModal} style={{ color: 'var(--text-secondary)', padding: '0.35rem' }} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Error / Success Notifications */}
          {error && (
            <div style={{
              background: 'rgba(235, 87, 87, 0.08)',
              border: '1px solid rgba(235, 87, 87, 0.35)',
              color: '#C53030',
              padding: '0.75rem 0.9rem',
              borderRadius: '8px',
              fontSize: '0.86rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              <div>{error}</div>
            </div>
          )}

          {successMsg && (
            <div style={{
              background: 'rgba(39, 174, 96, 0.08)',
              border: '1px solid rgba(39, 174, 96, 0.35)',
              color: '#219653',
              padding: '0.75rem 0.9rem',
              borderRadius: '8px',
              fontSize: '0.86rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}>
              <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              <div>{successMsg}</div>
            </div>
          )}

          {/* Social Google Login Button */}
          {mode !== 'forgot' && (
            <>
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="btn btn-outline-white"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  padding: '0.75rem',
                  marginBottom: '1.25rem',
                  fontWeight: '600',
                  fontSize: '0.92rem'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Continue with Google
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Or Email</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Enter your full name"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  required
                  className="form-control"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div className="form-group" style={{ marginBottom: mode === 'login' ? '0.75rem' : '1.25rem' }}>
                <label className="form-label">Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', padding: '0.2rem' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div style={{ textAlign: 'right', marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => { setMode('forgot'); setError(''); setSuccessMsg(''); }}
                  style={{ fontSize: '0.8rem', color: 'var(--primary-rose-dark)', fontWeight: '600' }}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-rose"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.98rem' }}
            >
              {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
            </button>
          </form>

          {/* Mode Switcher */}
          <div style={{ textAlign: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            {mode === 'login' ? (
              <div>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('register'); setError(''); setSuccessMsg(''); }}
                  style={{ color: 'var(--primary-rose-dark)', fontWeight: '700' }}
                >
                  Register Now
                </button>
              </div>
            ) : (
              <div>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
                  style={{ color: 'var(--primary-rose-dark)', fontWeight: '700' }}
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
