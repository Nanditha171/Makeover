// src/components/auth/ClientAuthGate.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ShieldCheck,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Clock,
  KeyRound,
  ChevronLeft
} from 'lucide-react';

export const ClientAuthGate = () => {
  const {
    loginCustomer,
    registerNewClient,
    loginCustomerWithGoogle,
    resetCustomerPassword,
    sendOTP,
    verifyClientOTP,
    pendingVerificationUser,
    setPendingVerificationUser,
    setActiveTab
  } = useApp();

  // Mode: 'signin' | 'register' | 'otp' | 'forgot'
  const [authMode, setAuthMode] = useState('signin');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register Form State
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // OTP State
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [activeOTPCode, setActiveOTPCode] = useState('');
  const otpInputRefs = useRef([]);

  // If AppContext has a pending verification user, switch to OTP screen
  useEffect(() => {
    if (pendingVerificationUser && authMode !== 'otp') {
      setAuthMode('otp');
      initiateOTPTimer(pendingVerificationUser.email || pendingVerificationUser.phone);
    }
  }, [pendingVerificationUser]);

  // Timer countdown hook for OTP
  useEffect(() => {
    let interval = null;
    if (authMode === 'otp' && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [authMode, timerSeconds]);

  const initiateOTPTimer = (identifier) => {
    const otpData = sendOTP(identifier);
    if (otpData) {
      setActiveOTPCode(otpData.code);
    }
    setTimerSeconds(60);
    setOtpDigits(['', '', '', '', '', '']);
    setTimeout(() => {
      if (otpInputRefs.current[0]) {
        otpInputRefs.current[0].focus();
      }
    }, 150);
  };

  // Handle individual OTP digit change
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);
    setErrorMsg('');

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasted)) {
      const digits = pasted.split('');
      setOtpDigits(digits);
      otpInputRefs.current[5]?.focus();
    }
  };

  // 1. Handle Registration Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regFullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!regEmail.trim() || !/\S+@\S+\.\S+/.test(regEmail)) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!regPhone.trim() || regPhone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please provide a valid 10-digit mobile number.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Please agree to the studio terms & booking policies.');
      return;
    }

    setLoading(true);
    try {
      const result = await registerNewClient({
        fullName: regFullName.trim(),
        email: regEmail.trim(),
        phone: regPhone.trim(),
        password: regPassword
      });

      if (result.success) {
        setAuthMode('otp');
        initiateOTPTimer(regEmail.trim());
      } else {
        setErrorMsg(result.error || 'Failed to create account. Please try again.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Registration error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle OTP Verification Submit
  const handleOtpVerify = async (e) => {
    e?.preventDefault();
    const enteredOTP = otpDigits.join('');

    if (enteredOTP.length < 6) {
      setErrorMsg('Please enter the complete 6-digit verification code.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const identifier = pendingVerificationUser?.email || pendingVerificationUser?.phone || regEmail;
      const result = await verifyClientOTP(identifier, enteredOTP);

      if (result.success) {
        setSuccessMsg('Account verified successfully! Welcome to Aura Beauty Studio.');
      } else {
        setErrorMsg(result.message || 'Invalid or expired OTP code.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Verification error.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Sign In Submit
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginEmail || !loginPassword) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      const result = await loginCustomer(loginEmail.trim(), loginPassword);

      if (result.success) {
        if (!result.user.isVerified) {
          setErrorMsg('Your account is not verified yet. Please verify your OTP to continue.');
          setPendingVerificationUser(result.user);
          setAuthMode('otp');
          initiateOTPTimer(result.user.email);
        }
      } else {
        setErrorMsg(result.error || 'Invalid email or password.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      const result = await loginCustomerWithGoogle();
      if (!result.success) {
        setErrorMsg(result.error || 'Google sign-in was cancelled.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  // 5. Handle Forgot Password
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!loginEmail) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await resetCustomerPassword(loginEmail.trim());
      if (res.success) {
        setSuccessMsg('Password reset instructions sent to your email.');
      } else {
        setErrorMsg(res.error || 'Failed to send reset link.');
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-gate-wrapper" style={{
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(135deg, #FFF9FA 0%, #FBF0F4 50%, #F5E6ED 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      position: 'relative'
    }}>
      {/* Decorative Blur Spheres */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '8%',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,106,134,0.18) 0%, rgba(212,106,134,0) 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '8%',
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(194,149,71,0.15) 0%, rgba(194,149,71,0) 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '540px',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        borderRadius: '20px',
        boxShadow: '0 20px 50px rgba(212, 106, 134, 0.15)',
        position: 'relative',
        zIndex: 2,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(212, 106, 134, 0.25)'
      }}>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'var(--rose-gradient)',
            margin: '0 auto 0.85rem auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: '1.6rem',
            fontWeight: 'bold',
            boxShadow: '0 8px 20px rgba(212, 106, 134, 0.35)'
          }}>
            A
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.75rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            letterSpacing: '0.02em',
            marginBottom: '0.2rem'
          }}>
            AURA BEAUTY STUDIO
          </h1>
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--primary-rose-dark)',
            fontWeight: '600',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            Luxury Bridal & Beauty Artistry
          </p>
        </div>

        {/* Mode Switcher Tabs (Only shown when not in OTP mode) */}
        {authMode !== 'otp' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'rgba(212, 106, 134, 0.08)',
            padding: '0.35rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            gap: '0.25rem'
          }}>
            <button
              type="button"
              onClick={() => { setAuthMode('signin'); setErrorMsg(''); setSuccessMsg(''); }}
              style={{
                padding: '0.65rem 0.5rem',
                borderRadius: '9px',
                border: 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: authMode === 'signin' || authMode === 'forgot' ? '#FFFFFF' : 'transparent',
                color: authMode === 'signin' || authMode === 'forgot' ? 'var(--primary-rose-dark)' : 'var(--text-secondary)',
                boxShadow: authMode === 'signin' || authMode === 'forgot' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              Client Sign In
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
              style={{
                padding: '0.65rem 0.5rem',
                borderRadius: '9px',
                border: 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: authMode === 'register' ? '#FFFFFF' : 'transparent',
                color: authMode === 'register' ? 'var(--primary-rose-dark)' : 'var(--text-secondary)',
                boxShadow: authMode === 'register' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              Register Now
            </button>
          </div>
        )}

        {/* Feedback Messages */}
        {errorMsg && (
          <div style={{
            background: 'rgba(231, 76, 60, 0.08)',
            border: '1px solid rgba(231, 76, 60, 0.25)',
            color: '#c0392b',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem',
            animation: 'fadeIn 0.2s ease'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div style={{
            background: 'rgba(46, 204, 113, 0.08)',
            border: '1px solid rgba(46, 204, 113, 0.25)',
            color: '#27ae60',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem',
            animation: 'fadeIn 0.2s ease'
          }}>
            <CheckCircle size={16} style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ----------------- VIEW 1: CLIENT SIGN IN ----------------- */}
        {authMode === 'signin' && (
          <form onSubmit={handleSignInSubmit}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  required
                  className="form-control"
                  placeholder="client@example.com"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '0.75rem' }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  className="form-control"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.82rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <input type="checkbox" defaultChecked /> Remember me
              </label>
              <button
                type="button"
                onClick={() => { setAuthMode('forgot'); setErrorMsg(''); setSuccessMsg(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--primary-rose-dark)', fontWeight: '600', cursor: 'pointer' }}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-rose btn-md"
              style={{ width: '100%', marginBottom: '1.25rem', padding: '0.8rem', fontSize: '0.95rem' }}
            >
              {loading ? <RefreshCw className="spin" size={18} /> : <>Sign In to Website <ArrowRight size={16} /></>}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.25rem 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <span>OR CONTINUE WITH</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="btn btn-outline-white btn-md"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)'
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

            <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => { setAuthMode('register'); setErrorMsg(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--primary-rose-dark)', fontWeight: '700', cursor: 'pointer' }}
              >
                Register Now
              </button>
            </div>
          </form>
        )}

        {/* ----------------- VIEW 2: CLIENT REGISTRATION ----------------- */}
        {authMode === 'register' && (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group" style={{ marginBottom: '0.85rem' }}>
              <label className="form-label">Full Name *</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Radhika Sharma"
                  value={regFullName}
                  onChange={e => setRegFullName(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div className="form-row-2" style={{ marginBottom: '0.85rem' }}>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="name@email.com"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>
            </div>

            <div className="form-row-2" style={{ marginBottom: '0.85rem' }}>
              <div className="form-group">
                <label className="form-label">Create Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    className="form-control"
                    placeholder="Min 6 chars"
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <div style={{ position: 'relative' }}>
                  <KeyRound size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    className="form-control"
                    placeholder="Re-enter password"
                    value={regConfirmPassword}
                    onChange={e => setRegConfirmPassword(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.82rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={e => setAgreeTerms(e.target.checked)}
                /> I agree to studio booking terms & policies
              </label>
              <button
                type="button"
                onClick={() => setShowRegPassword(!showRegPassword)}
                style={{ background: 'none', border: 'none', color: 'var(--primary-rose-dark)', fontSize: '0.78rem', cursor: 'pointer' }}
              >
                {showRegPassword ? 'Hide Password' : 'Show Password'}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-rose btn-md"
              style={{ width: '100%', marginBottom: '1.25rem', padding: '0.8rem', fontSize: '0.95rem' }}
            >
              {loading ? <RefreshCw className="spin" size={18} /> : <>Create Account & Send OTP <ArrowRight size={16} /></>}
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => { setAuthMode('signin'); setErrorMsg(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--primary-rose-dark)', fontWeight: '700', cursor: 'pointer' }}
              >
                Sign In Instead
              </button>
            </div>
          </form>
        )}

        {/* ----------------- VIEW 3: OTP VERIFICATION SCREEN ----------------- */}
        {authMode === 'otp' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(212, 106, 134, 0.12)',
                color: 'var(--primary-rose-dark)',
                margin: '0 auto 0.75rem auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Verify Your Account
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '380px', margin: '0 auto' }}>
                We have sent a 6-digit verification OTP to{' '}
                <strong style={{ color: 'var(--text-primary)' }}>
                  {pendingVerificationUser?.email || regEmail || 'your email / mobile'}
                </strong>.
              </p>
            </div>

            {/* OTP Demo Helper Badge */}
            {activeOTPCode && (
              <div style={{
                background: 'rgba(194, 149, 71, 0.1)',
                border: '1px dashed var(--primary-gold)',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                color: 'var(--text-primary)',
                textAlign: 'center',
                marginBottom: '1.25rem'
              }}>
                🔑 <strong>Demo Active Code:</strong> <span style={{ fontFamily: 'monospace', letterSpacing: '0.15em', fontWeight: '700', color: 'var(--primary-rose-dark)' }}>{activeOTPCode}</span> (or enter <strong>123456</strong>)
              </div>
            )}

            {/* 6-Digit OTP Input Boxes */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'clamp(0.35rem, 1.8vw, 0.65rem)',
              marginBottom: '1.5rem'
            }} onPaste={handleOtpPaste}>
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => otpInputRefs.current[idx] = el}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(idx, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(idx, e)}
                  style={{
                    width: 'clamp(42px, 12vw, 54px)',
                    height: 'clamp(48px, 13vw, 60px)',
                    textAlign: 'center',
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    borderRadius: '10px',
                    border: digit ? '2px solid var(--primary-rose)' : '1px solid var(--border-rose)',
                    background: digit ? 'rgba(212, 106, 134, 0.05)' : '#FFFFFF',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: digit ? '0 0 10px rgba(212, 106, 134, 0.2)' : 'none'
                  }}
                />
              ))}
            </div>

            {/* Expiration Timer & Resend Option */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              fontSize: '0.84rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: timerSeconds > 0 ? 'var(--text-secondary)' : '#c0392b' }}>
                <Clock size={14} />
                <span>
                  {timerSeconds > 0
                    ? `Code expires in 00:${timerSeconds.toString().padStart(2, '0')}`
                    : 'Code has expired!'}
                </span>
              </div>

              <button
                type="button"
                disabled={timerSeconds > 0}
                onClick={() => {
                  const target = pendingVerificationUser?.email || regEmail;
                  initiateOTPTimer(target);
                  setSuccessMsg('A new verification code has been dispatched.');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: timerSeconds === 0 ? 'var(--primary-rose-dark)' : 'var(--text-muted)',
                  fontWeight: '600',
                  cursor: timerSeconds === 0 ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <RefreshCw size={13} /> Resend OTP
              </button>
            </div>

            <button
              type="button"
              onClick={handleOtpVerify}
              disabled={loading || otpDigits.join('').length < 6}
              className="btn btn-rose btn-md"
              style={{ width: '100%', marginBottom: '1rem', padding: '0.8rem', fontSize: '0.95rem' }}
            >
              {loading ? <RefreshCw className="spin" size={18} /> : <>Verify & Access Website <CheckCircle size={16} /></>}
            </button>

            <button
              type="button"
              onClick={() => { setAuthMode('register'); setErrorMsg(''); setPendingVerificationUser(null); }}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem'
              }}
            >
              <ChevronLeft size={14} /> Change Email or Mobile Number
            </button>
          </div>
        )}

        {/* ----------------- VIEW 4: FORGOT PASSWORD ----------------- */}
        {authMode === 'forgot' && (
          <form onSubmit={handleForgotSubmit}>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Reset Password
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Enter your registered email address to receive password reset instructions.
              </p>
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  required
                  className="form-control"
                  placeholder="client@example.com"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-rose btn-md"
              style={{ width: '100%', marginBottom: '1rem', padding: '0.8rem' }}
            >
              {loading ? <RefreshCw className="spin" size={18} /> : 'Send Reset Link'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => { setAuthMode('signin'); setErrorMsg(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--primary-rose-dark)', fontWeight: '600', fontSize: '0.84rem', cursor: 'pointer' }}
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}

        {/* Portal / Admin Access Footer Link */}
        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}>
          <span>Protected by Firebase Authentication</span>
          <button
            type="button"
            onClick={() => setActiveTab('admin-login')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-gold)',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <ShieldCheck size={12} /> Staff Portal
          </button>
        </div>
      </div>
    </div>
  );
};
