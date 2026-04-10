import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

function Logo() {
  return (
    <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="11" height="11" rx="3" fill="#C8E84C" />
      <rect x="14" y="1" width="11" height="11" rx="3" fill="rgba(245,240,232,0.6)" />
      <rect x="1" y="14" width="11" height="11" rx="3" fill="rgba(245,240,232,0.6)" />
      <rect x="14" y="14" width="11" height="11" rx="3" fill="rgba(245,240,232,0.3)" />
    </svg>
  );
}

export default function LoginPage({ onSuccess, onRegister }) {
  const { login } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!username.trim()) errs.username = 'Username is required.';
    if (!password.trim()) errs.password = 'Password is required.';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const ok = login(username, password);
    setLoading(false);
    if (ok) onSuccess();
    else setErrors({ form: 'Invalid credentials. Please try again.' });
  };

  return (
    <div className="auth-wrap">
      <div className="auth-logo" aria-label="FOSSEE Logo">
        <Logo />
      </div>
      <h1 className="auth-head-title">Welcome back</h1>
      <p className="auth-head-sub">Sign in to your FOSSEE account</p>

      {errors.form && (
        <div style={{
          background: 'rgba(232,92,60,0.08)', border: '1px solid rgba(232,92,60,0.2)',
          borderRadius: 'var(--r-sm)', padding: '10px 14px', marginBottom: 14,
          fontSize: 13, color: 'var(--coral)', fontWeight: 500,
        }} role="alert">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate aria-label="Login form">
        <div className="form-group">
          <label htmlFor="login-user" className="form-label">Username or Email</label>
          <input id="login-user" type="text" className="form-input"
            placeholder="Enter your username"
            value={username} onChange={(e) => { setUsername(e.target.value); setErrors((er) => ({ ...er, username: '', form: '' })); }}
            autoComplete="username" aria-describedby={errors.username ? 'user-err' : undefined}
            aria-invalid={!!errors.username} />
          {errors.username && <p id="user-err" className="form-error" role="alert">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="login-pass" className="form-label">Password</label>
          <div style={{ position: 'relative' }}>
            <input id="login-pass" type={showPass ? 'text' : 'password'} className="form-input"
              placeholder="Enter your password"
              value={password} onChange={(e) => { setPassword(e.target.value); setErrors((er) => ({ ...er, password: '', form: '' })); }}
              autoComplete="current-password" aria-describedby={errors.password ? 'pass-err' : undefined}
              aria-invalid={!!errors.password}
              style={{ paddingRight: 46 }} />
            <button type="button" onClick={() => setShowPass((v) => !v)}
              aria-label={showPass ? 'Hide password' : 'Show password'}
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink3)', fontSize: 14,
              }}>
              {showPass ? '🙈' : '👁'}
            </button>
          </div>
          {errors.password && <p id="pass-err" className="form-error" role="alert">{errors.password}</p>}
        </div>

        <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: 4 }}
          disabled={loading} aria-busy={loading}>
          {loading ? (
            <><span style={{ width: 16, height: 16, border: '2px solid rgba(245,240,232,0.3)', borderTopColor: 'var(--cream)', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} aria-hidden="true" /> Signing in…</>
          ) : 'Sign In'}
        </button>
      </form>

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <button
          className="btn btn-ghost"
          style={{ fontSize: 13, color: 'var(--ink3)', textDecoration: 'underline', textUnderlineOffset: 2 }}
          onClick={() => {}}>
          Forgot password?
        </button>
      </div>

      <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: 'var(--ink3)' }}>
        New here?{' '}
        <button className="btn btn-ghost" style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 700, padding: 0 }}
          onClick={onRegister}>
          Create an account →
        </button>
      </div>

      <div style={{
        marginTop: 28, background: 'var(--cream2)', borderRadius: 'var(--r-sm)',
        padding: '10px 14px', fontSize: 11, color: 'var(--ink3)', textAlign: 'center', lineHeight: 1.5,
      }} role="note">
        Demo: enter any username &amp; password to sign in.
      </div>
    </div>
  );
}
