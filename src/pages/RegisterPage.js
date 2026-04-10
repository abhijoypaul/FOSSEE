import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS, STATES } from '../data/mockData';

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

// IMPORTANT: Field is defined at module level (outside RegisterPage).
// If it were inside, React would unmount/remount the input on every keystroke
// causing the "loses focus after one character" bug.
function Field({ id, label, type, value, onChange, error, placeholder, hint, children }) {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">{label}</label>
      {children || (
        <input
          id={id}
          type={type || 'text'}
          className="form-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
          aria-invalid={!!error}
        />
      )}
      {error && <p id={`${id}-err`} className="form-error" role="alert">{error}</p>}
      {hint && !error && <p id={`${id}-hint`} className="form-hint">{hint}</p>}
    </div>
  );
}

const STEPS = ['Account', 'Personal', 'Institution'];

export default function RegisterPage({ onSuccess, onLogin }) {
  const { register } = useApp();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', username: '',
    password: '', password2: '',
    title: '', phone_number: '',
    institute: '', department: '', position: 'coordinator',
    location: '', state: 'IN-MH',
    how_did_you_hear: '',
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.first_name.trim()) e.first_name = 'First name is required.';
      if (!form.last_name.trim()) e.last_name = 'Last name is required.';
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required.';
      if (!form.username.trim()) e.username = 'Username is required.';
      if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
      if (form.password !== form.password2) e.password2 = 'Passwords do not match.';
    }
    if (step === 1) {
      if (!form.phone_number.trim() || form.phone_number.length !== 10)
        e.phone_number = 'Enter a valid 10-digit phone number.';
    }
    if (step === 2) {
      if (!form.institute.trim()) e.institute = 'Institute name is required.';
      if (!form.department) e.department = 'Please select a department.';
    }
    return e;
  };

  const next = () => {
    const e = validateStep();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep((s) => s + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validateStep();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    register(form);
    setLoading(false);
    onSuccess();
  };

  return (
    <div className="auth-wrap" style={{ paddingTop: 24, paddingBottom: 40 }}>
      <div className="auth-logo" aria-label="FOSSEE Logo">
        <Logo />
      </div>
      <h1 className="auth-head-title">Create Account</h1>
      <p className="auth-head-sub">Join the FOSSEE workshop network</p>

      {/* Step progress bar */}
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}
        role="progressbar"
        aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={3}
        aria-label={`Step ${step + 1} of 3: ${STEPS[step]}`}
      >
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: i <= step ? 'var(--ink)' : 'var(--cream2)',
                border: `2px solid ${i <= step ? 'var(--ink)' : 'var(--border)'}`,
                color: i <= step ? 'var(--cream)' : 'var(--ink3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, transition: 'all 0.2s',
              }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: '0.04em',
                color: i === step ? 'var(--ink)' : 'var(--ink3)',
              }}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                height: 2, width: 32,
                background: i < step ? 'var(--ink)' : 'var(--cream3)',
                margin: '0 4px', marginBottom: 18, transition: 'background 0.2s',
              }} aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>

      <form
        onSubmit={step < 2 ? (e) => { e.preventDefault(); next(); } : handleSubmit}
        noValidate
        aria-label={`Registration step ${step + 1}: ${STEPS[step]}`}
      >
        <div className="card" style={{ padding: '20px 18px', marginBottom: 14 }}>

          {/* ── Step 0: Account ── */}
          {step === 0 && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Field id="first_name" label="First Name *" placeholder="Priya"
                  value={form.first_name} onChange={(v) => set('first_name', v)} error={errors.first_name} />
                <Field id="last_name" label="Last Name *" placeholder="Sharma"
                  value={form.last_name} onChange={(v) => set('last_name', v)} error={errors.last_name} />
              </div>
              <Field id="email" label="Email Address *" type="email" placeholder="you@institution.ac.in"
                value={form.email} onChange={(v) => set('email', v)} error={errors.email} />
              <Field id="username" label="Username *" placeholder="priya.sharma"
                value={form.username} onChange={(v) => set('username', v)} error={errors.username} />
              <Field id="password" label="Password *" type="password" placeholder="Min 6 characters"
                value={form.password} onChange={(v) => set('password', v)} error={errors.password} />
              <Field id="password2" label="Confirm Password *" type="password" placeholder="Repeat password"
                value={form.password2} onChange={(v) => set('password2', v)} error={errors.password2} />
            </>
          )}

          {/* ── Step 1: Personal ── */}
          {step === 1 && (
            <>
              <div className="form-group">
                <label htmlFor="title" className="form-label">Title</label>
                <select id="title" className="form-select"
                  value={form.title} onChange={(e) => set('title', e.target.value)}>
                  <option value="">Select title…</option>
                  {['Prof.', 'Dr.', 'Shri', 'Smt', 'Ku', 'Mr.', 'Mrs.', 'Ms.'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <Field id="phone_number" label="Phone Number *" type="tel" placeholder="9876543210"
                value={form.phone_number} onChange={(v) => set('phone_number', v)}
                error={errors.phone_number} hint="10-digit number without country code." />
              <div className="form-group">
                <label htmlFor="position" className="form-label">I am a…</label>
                <select id="position" className="form-select"
                  value={form.position} onChange={(e) => set('position', e.target.value)}>
                  <option value="coordinator">Coordinator – organise workshops at my college</option>
                  <option value="instructor">Instructor – conduct workshops</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="how_did_you_hear" className="form-label">How did you hear about us?</label>
                <select id="how_did_you_hear" className="form-select"
                  value={form.how_did_you_hear} onChange={(e) => set('how_did_you_hear', e.target.value)}>
                  <option value="">Select…</option>
                  {['FOSSEE website', 'Google', 'Social Media', 'From other College'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* ── Step 2: Institution ── */}
          {step === 2 && (
            <>
              <Field id="institute" label="Institution Name *" placeholder="IIT Bombay"
                value={form.institute} onChange={(v) => set('institute', v)} error={errors.institute} />
              <div className="form-group">
                <label htmlFor="department" className="form-label">Department *</label>
                <select id="department" className="form-select"
                  value={form.department} onChange={(e) => set('department', e.target.value)}
                  aria-invalid={!!errors.department}
                  aria-describedby={errors.department ? 'department-err' : undefined}>
                  <option value="">Select department…</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
                {errors.department && (
                  <p id="department-err" className="form-error" role="alert">{errors.department}</p>
                )}
              </div>
              <Field id="location" label="City / Place" placeholder="Mumbai"
                value={form.location} onChange={(v) => set('location', v)} error={errors.location} />
              <div className="form-group">
                <label htmlFor="state" className="form-label">State</label>
                <select id="state" className="form-select"
                  value={form.state} onChange={(e) => set('state', e.target.value)}>
                  {STATES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          {step > 0 && (
            <button type="button" className="btn btn-outline" style={{ minWidth: 90 }}
              onClick={() => setStep((s) => s - 1)}>
              ← Back
            </button>
          )}
          <button type="submit" className="btn btn-primary btn-full btn-lg"
            disabled={loading} aria-busy={loading}>
            {loading ? (
              <>
                <span style={{
                  width: 16, height: 16,
                  border: '2px solid rgba(245,240,232,0.3)',
                  borderTopColor: 'var(--cream)', borderRadius: '50%',
                  animation: 'spin 0.6s linear infinite', display: 'inline-block',
                }} aria-hidden="true" />
                Creating account…
              </>
            ) : step < 2 ? 'Continue →' : 'Create Account'}
          </button>
        </div>
      </form>

      <div style={{ marginTop: 22, textAlign: 'center', fontSize: 13, color: 'var(--ink3)' }}>
        Already have an account?{' '}
        <button className="btn btn-ghost"
          style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 700, padding: 0 }}
          onClick={onLogin}>
          Sign In →
        </button>
      </div>
    </div>
  );
}
