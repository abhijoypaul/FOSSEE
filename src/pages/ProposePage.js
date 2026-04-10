import React, { useState } from 'react';
import { WORKSHOP_TYPES } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function ProposePage({ prefillType, onSuccess }) {
  const { user, proposeWorkshop } = useApp();
  const [workshopTypeId, setWorkshopTypeId] = useState(prefillType ? String(prefillType.id) : '');
  const [date, setDate] = useState('');
  const [tncAccepted, setTncAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showTnc, setShowTnc] = useState(false);

  const selectedType = WORKSHOP_TYPES.find((w) => w.id === Number(workshopTypeId));

  const minDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  })();
  const maxDate = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split('T')[0];
  })();

  const validate = () => {
    const e = {};
    if (!workshopTypeId) e.workshopTypeId = 'Please select a workshop type.';
    if (!date) e.date = 'Please select a date.';
    if (!tncAccepted) e.tnc = 'You must accept the terms and conditions.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    proposeWorkshop(Number(workshopTypeId), date, selectedType?.name);
    setSubmitting(false);
    onSuccess();
  };

  if (!user) {
    return (
      <main className="page">
        <div className="empty">
          <div className="empty-icon">🔐</div>
          <h2 className="empty-title">Sign in required</h2>
          <p className="empty-text">You need to be logged in to propose a workshop.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">Coordinator</p>
        <h1 className="page-title">Propose a <em>Workshop</em></h1>
        <p className="page-subtitle">Fill in the details below to request a workshop at your institution.</p>
      </header>

      {/* Info banner */}
      <div style={{
        background: 'rgba(60,168,232,0.08)', border: '1px solid rgba(60,168,232,0.2)',
        borderRadius: 'var(--r-sm)', padding: '12px 14px', marginBottom: 20, fontSize: 12,
        color: 'var(--ink2)', lineHeight: 1.5,
      }} role="note">
        💡 Browse <strong>Workshop Types</strong> first to find the right programme for your students.
      </div>

      <form onSubmit={handleSubmit} noValidate aria-label="Propose workshop form">
        <div className="card" style={{ padding: '20px 18px' }}>

          {/* Workshop Type */}
          <div className="form-group">
            <label htmlFor="workshop-type" className="form-label">Workshop Type *</label>
            <select
              id="workshop-type"
              className="form-select"
              value={workshopTypeId}
              onChange={(e) => { setWorkshopTypeId(e.target.value); setErrors((er) => ({ ...er, workshopTypeId: '' })); }}
              aria-describedby={errors.workshopTypeId ? 'wt-err' : undefined}
              aria-invalid={!!errors.workshopTypeId}>
              <option value="">Select a workshop…</option>
              {WORKSHOP_TYPES.map((wt) => (
                <option key={wt.id} value={wt.id}>{wt.name} ({wt.duration} day{wt.duration > 1 ? 's' : ''})</option>
              ))}
            </select>
            {errors.workshopTypeId && <p id="wt-err" className="form-error" role="alert">{errors.workshopTypeId}</p>}
          </div>

          {/* Selected Type Preview */}
          {selectedType && (
            <div style={{
              background: selectedType.color + '30', border: `1px solid ${selectedType.color}60`,
              borderRadius: 'var(--r-sm)', padding: '10px 12px', marginBottom: 14,
              display: 'flex', gap: 10, alignItems: 'center',
            }} role="status" aria-live="polite">
              <span style={{ fontSize: 22 }}>{selectedType.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{selectedType.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink3)' }}>{selectedType.duration} day{selectedType.duration > 1 ? 's' : ''} · {selectedType.enrollments} enrolled so far</div>
              </div>
            </div>
          )}

          {/* Date */}
          <div className="form-group">
            <label htmlFor="workshop-date" className="form-label">Preferred Date *</label>
            <input
              id="workshop-date"
              type="date"
              className="form-input"
              value={date}
              min={minDate} max={maxDate}
              onChange={(e) => { setDate(e.target.value); setErrors((er) => ({ ...er, date: '' })); }}
              aria-describedby={errors.date ? 'date-err' : 'date-hint'}
              aria-invalid={!!errors.date} />
            {errors.date
              ? <p id="date-err" className="form-error" role="alert">{errors.date}</p>
              : <p id="date-hint" className="form-hint">Must be at least 3 days from today (weekdays only).</p>
            }
          </div>

          {/* TnC */}
          <div>
            {selectedType && (
              <button type="button" className="btn btn-ghost btn-sm"
                onClick={() => setShowTnc((v) => !v)}
                style={{ marginBottom: 8, padding: '6px 0', color: 'var(--sky)', fontSize: 12 }}
                aria-expanded={showTnc}>
                {showTnc ? '▲' : '▼'} View Terms &amp; Conditions
              </button>
            )}
            {showTnc && selectedType && (
              <div style={{
                background: 'var(--cream2)', borderRadius: 'var(--r-sm)', padding: '10px 12px',
                fontSize: 12, lineHeight: 1.7, color: 'var(--ink2)', marginBottom: 10, whiteSpace: 'pre-line',
              }} role="region" aria-label="Terms and conditions">
                {selectedType.terms_and_conditions}
              </div>
            )}
            <label className="check-row">
              <input type="checkbox" checked={tncAccepted}
                onChange={(e) => { setTncAccepted(e.target.checked); setErrors((er) => ({ ...er, tnc: '' })); }}
                aria-describedby={errors.tnc ? 'tnc-err' : undefined} />
              <span className={`check-box${tncAccepted ? ' on' : ''}`} aria-hidden="true">{tncAccepted ? '✓' : ''}</span>
              <span className="check-label">I have read and accept the terms &amp; conditions</span>
            </label>
            {errors.tnc && <p id="tnc-err" className="form-error" role="alert">{errors.tnc}</p>}
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: 16 }}
          disabled={submitting} aria-busy={submitting}>
          {submitting ? (
            <><span style={{ width: 16, height: 16, border: '2px solid rgba(245,240,232,0.3)', borderTopColor: 'var(--cream)', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} aria-hidden="true" /> Submitting…</>
          ) : 'Submit Proposal'}
        </button>
      </form>
    </main>
  );
}
