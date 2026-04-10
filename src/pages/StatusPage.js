import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const STATUS_MAP = {
  0: { label: 'Pending',  cls: 'badge-pending' },
  1: { label: 'Accepted', cls: 'badge-success' },
  2: { label: 'Deleted',  cls: 'badge-deleted' },
};

function WorkshopDetailSheet({ workshop, onClose }) {
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="ws-detail-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sheet">
        <div className="sheet-handle" aria-hidden="true" />
        <h2 id="ws-detail-title" className="sheet-title">{workshop.workshop_type_name}</h2>
        <div className="drow">
          <span className="drow-label">Status</span>
          <span className={`badge ${STATUS_MAP[workshop.status].cls}`}>{STATUS_MAP[workshop.status].label}</span>
        </div>
        <div className="drow">
          <span className="drow-label">Date</span>
          <span className="drow-val">{new Date(workshop.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <div className="drow">
          <span className="drow-label">Instructor</span>
          <span className="drow-val">{workshop.instructor_name || 'Awaiting assignment'}</span>
        </div>
        <div className="drow">
          <span className="drow-label">Coordinator</span>
          <span className="drow-val">{workshop.coordinator_name}</span>
        </div>

        {workshop.comments.length > 0 && (
          <>
            <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 15, fontWeight: 700, marginTop: 16, marginBottom: 10 }}>
              Instructor Notes
            </h3>
            {workshop.comments.map((c) => (
              <div key={c.id} style={{
                background: 'var(--cream2)', borderRadius: 'var(--r-sm)', padding: '10px 12px',
                marginBottom: 8, fontSize: 12, lineHeight: 1.6, color: 'var(--ink2)',
              }}>
                <div style={{ fontWeight: 600, marginBottom: 3 }}>{c.author}</div>
                {c.text}
                <div style={{ fontSize: 10, color: 'var(--ink3)', marginTop: 3 }}>{c.date}</div>
              </div>
            ))}
          </>
        )}

        {workshop.status === 0 && (
          <div style={{
            background: 'rgba(232,160,48,0.08)', border: '1px solid rgba(232,160,48,0.2)',
            borderRadius: 'var(--r-sm)', padding: '10px 12px', marginTop: 14, fontSize: 12,
            color: 'var(--ink2)', lineHeight: 1.5,
          }} role="note">
            ⏳ Your proposal is under review. An instructor will be assigned shortly.
          </div>
        )}
        {workshop.status === 1 && (
          <div style={{
            background: 'rgba(60,200,160,0.08)', border: '1px solid rgba(60,200,160,0.2)',
            borderRadius: 'var(--r-sm)', padding: '10px 12px', marginTop: 14, fontSize: 12,
            color: 'var(--ink2)', lineHeight: 1.5,
          }} role="status">
            ✅ Workshop accepted! Your instructor will contact you with further details.
          </div>
        )}

        <button className="btn btn-outline btn-full" style={{ marginTop: 18 }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default function StatusPage({ onNavigate }) {
  const { user, workshops } = useApp();
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('all');

  if (!user) {
    return (
      <main className="page">
        <div className="empty">
          <div className="empty-icon">🔐</div>
          <h2 className="empty-title">Sign in required</h2>
          <p className="empty-text">Log in to see your workshop bookings.</p>
        </div>
      </main>
    );
  }

  const accepted = workshops.filter((w) => w.status === 1);
  const pending  = workshops.filter((w) => w.status === 0);
  const shown = tab === 'accepted' ? accepted : tab === 'pending' ? pending : workshops;

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">Coordinator Dashboard</p>
        <h1 className="page-title">My <em>Workshops</em></h1>
      </header>

      {/* Summary strip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 18 }}>
        {[
          { label: 'Total', count: workshops.length, color: 'var(--ink)' },
          { label: 'Accepted', count: accepted.length, color: '#1A8060' },
          { label: 'Pending', count: pending.length, color: '#9A5A00' },
        ].map((s) => (
          <div key={s.label} className="card" style={{ padding: '12px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 700, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink3)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="chips" role="group" aria-label="Filter workshops">
        {['all','accepted','pending'].map((t) => (
          <button key={t} className={`chip${tab === t ? ' active' : ''}`}
            onClick={() => setTab(t)} aria-pressed={tab === t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {workshops.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">📭</div>
          <h2 className="empty-title">No workshops yet</h2>
          <p className="empty-text" style={{ marginBottom: 16 }}>Propose your first workshop to get started.</p>
          <button className="btn btn-lime" onClick={() => onNavigate('propose')}>Propose a Workshop</button>
        </div>
      ) : shown.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🗂</div>
          <h2 className="empty-title">None here</h2>
          <p className="empty-text">No workshops in this category.</p>
        </div>
      ) : (
        <section aria-label="Your workshop bookings">
          {shown.map((w, i) => {
            const s = STATUS_MAP[w.status];
            return (
              <article key={w.id}
                className="wk-card"
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => setSelected(w)}
                role="button" tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelected(w)}
                aria-label={`${w.workshop_type_name}, ${s.label}`}>
                <div className="wk-row1">
                  <h3 className="wk-name">{w.workshop_type_name}</h3>
                  <span className={`badge ${s.cls}`}>{s.label}</span>
                </div>
                <div className="wk-meta">
                  📅 {new Date(w.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                {w.instructor_name && (
                  <div className="wk-footer">
                    <div className="wk-instructor-avatar" aria-hidden="true">
                      {w.instructor_name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                    <span className="wk-instructor-name">{w.instructor_name}</span>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      )}

      {selected && (
        <WorkshopDetailSheet workshop={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
