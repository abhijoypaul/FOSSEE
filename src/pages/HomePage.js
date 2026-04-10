import React from 'react';
import { useApp } from '../context/AppContext';
import { WORKSHOP_TYPES, STATS } from '../data/mockData';

function StatTile({ label, value, trend }) {
  return (
    <div className="stat-tile">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {trend && <div className="stat-trend">↑ {trend}</div>}
    </div>
  );
}

function WtMini({ wt, onClick }) {
  return (
    <div className="wt-mini card-press" onClick={() => onClick(wt)} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(wt)}
      aria-label={`${wt.name}, ${wt.duration} day workshop`}>
      <div className="wt-mini-icon">{wt.icon}</div>
      <div className="wt-mini-color" style={{ background: wt.color }} />
      <div className="wt-mini-name">{wt.name}</div>
      <div className="wt-mini-dur">{wt.duration}d · {wt.enrollments} enrolled</div>
    </div>
  );
}

export default function HomePage({ onNavigate }) {
  const { user } = useApp();

  return (
    <main className="page">
      {/* Hero */}
      <div className="hero-card" role="banner">
        <div className="hero-blob" aria-hidden="true" />
        <div className="hero-blob2" aria-hidden="true" />
        <div className="hero-eyebrow">FOSSEE · IIT Bombay</div>
        <h1 className="hero-name">
          {user
            ? <>Hi, <span className="hero-name-hl">{user.first_name}</span>! 👋</>
            : <>What do you want to <span className="hero-name-hl">learn</span> today?</>}
        </h1>
        <p className="hero-sub">
          {user
            ? 'Track your workshops, propose new ones, and explore what\'s available.'
            : 'Free workshops on Python, Scilab, R and more — by IIT Bombay faculty.'}
        </p>
        <div className="hero-badge">
          <span className="hero-badge-dot" aria-hidden="true" />
          {STATS.active_instructors} instructors · {STATS.states_covered} states
        </div>
      </div>

      {/* Stats */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Portal Statistics</h2>
        <div className="stats-strip">
          <StatTile label="Workshops Held" value={STATS.total_workshops} trend="12% this year" />
          <StatTile label="This Month" value={STATS.workshops_this_month} />
          <StatTile label="States Covered" value={STATS.states_covered} />
          <StatTile label="Instructors" value={STATS.active_instructors} trend="Active" />
        </div>
      </section>

      {/* Workshop Types */}
      <section aria-labelledby="wt-heading">
        <div className="sec-head">
          <h2 id="wt-heading" className="sec-title">Workshop Types</h2>
          <span className="sec-action" role="button" tabIndex={0}
            onClick={() => onNavigate('workshops')}
            onKeyDown={e => e.key === 'Enter' && onNavigate('workshops')}>
            See all →
          </span>
        </div>
        <div className="wt-scroll" role="list" aria-label="Available workshop types">
          {WORKSHOP_TYPES.map((wt) => (
            <div key={wt.id} role="listitem">
              <WtMini wt={wt} onClick={() => onNavigate('workshops')} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA for guests */}
      {!user && (
        <section style={{ marginTop: 24 }}>
          <div className="card" style={{ textAlign: 'center', padding: '24px 20px' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🚀</div>
            <h2 className="serif" style={{ fontSize: 18, marginBottom: 5 }}>Ready to get started?</h2>
            <p className="text-sm text-muted" style={{ marginBottom: 16 }}>
              Register as a coordinator to propose workshops at your institution.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary btn-full" onClick={() => onNavigate('register')}>
                Create Account
              </button>
              <button className="btn btn-outline btn-full" onClick={() => onNavigate('login')}>
                Sign In
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Quick actions for logged in */}
      {user && (
        <section style={{ marginTop: 20 }}>
          <div className="sec-head">
            <h2 className="sec-title">Quick Actions</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { icon: '📅', label: 'Propose Workshop', action: 'propose', color: '#C8E84C' },
              { icon: '📋', label: 'My Bookings', action: 'status', color: '#A0D4E8' },
              { icon: '🎓', label: 'Browse Types', action: 'workshops', color: '#E8C4A0' },
              { icon: '👤', label: 'My Profile', action: 'profile', color: '#C4A0E8' },
            ].map((qa) => (
              <button key={qa.action}
                className="card card-press"
                style={{ textAlign: 'left', padding: '14px', cursor: 'pointer', border: 'none' }}
                onClick={() => onNavigate(qa.action)}
                aria-label={qa.label}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: qa.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 8 }}>
                  {qa.icon}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{qa.label}</div>
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
