import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const DEP_LABELS = {
  'computer engineering': 'Computer Science',
  'information technology': 'Information Technology',
  'civil engineering': 'Civil Engineering',
  'electrical engineering': 'Electrical Engineering',
  'mechanical engineering': 'Mechanical Engineering',
  'chemical engineering': 'Chemical Engineering',
  'aerospace engineering': 'Aerospace Engineering',
  'biosciences and bioengineering': 'Biosciences & BioEngineering',
  'electronics': 'Electronics',
  'energy science and engineering': 'Energy Science & Engineering',
};

const STATE_LABELS = {
  'IN-MH': 'Maharashtra', 'IN-DL': 'Delhi', 'IN-KA': 'Karnataka',
  'IN-TN': 'Tamil Nadu', 'IN-UP': 'Uttar Pradesh', 'IN-GJ': 'Gujarat',
};

export default function ProfilePage({ onNavigate }) {
  const { user, logout } = useApp();
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  if (!user) {
    return (
      <main className="page">
        <div className="empty">
          <div className="empty-icon">👤</div>
          <h2 className="empty-title">Not signed in</h2>
          <p className="empty-text" style={{ marginBottom: 16 }}>Sign in to view your profile.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('login')}>Sign In</button>
        </div>
      </main>
    );
  }

  const initials = `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">Account</p>
        <h1 className="page-title">My <em>Profile</em></h1>
      </header>

      {/* Avatar card */}
      <div className="card" style={{ textAlign: 'center', padding: '24px 20px', marginBottom: 14 }}>
        <div className="profile-avatar-lg" aria-hidden="true">{initials}</div>
        <h2 className="profile-name">{user.title} {user.first_name} {user.last_name}</h2>
        <p className="profile-role">{user.position}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
          <span className="badge badge-lime">{user.is_email_verified ? '✓ Verified' : 'Unverified'}</span>
          <span className="badge badge-info">{user.position}</span>
        </div>
      </div>

      {/* Details */}
      <div className="card" style={{ marginBottom: 14 }}>
        <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
          Account Details
        </h3>
        {[
          { label: 'Email', value: user.email },
          { label: 'Phone', value: user.phone_number },
          { label: 'Institute', value: user.institute },
          { label: 'Department', value: DEP_LABELS[user.department] || user.department },
          { label: 'Location', value: user.location },
          { label: 'State', value: STATE_LABELS[user.state] || user.state },
        ].map(({ label, value }) => (
          <div className="drow" key={label}>
            <span className="drow-label">{label}</span>
            <span className="drow-val">{value}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="card" style={{ marginBottom: 14 }}>
        <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
          Actions
        </h3>
        {[
          { icon: '📅', label: 'Propose a Workshop', action: () => onNavigate('propose') },
          { icon: '📋', label: 'View My Bookings',   action: () => onNavigate('status') },
          { icon: '🔑', label: 'Change Password',    action: () => {} },
        ].map(({ icon, label, action }) => (
          <button key={label}
            onClick={action}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%',
              padding: '12px 0', background: 'none', cursor: 'pointer',
              borderBottom: '1px solid var(--border2)', color: 'var(--ink)',
            }}
            aria-label={label}>
            <span style={{ fontSize: 18, width: 28, textAlign: 'center' }}>{icon}</span>
            <span style={{ fontSize: 14, fontWeight: 500 }}>{label}</span>
            <span style={{ marginLeft: 'auto', color: 'var(--ink3)', fontSize: 14 }}>→</span>
          </button>
        ))}
        <button
          onClick={() => setLogoutConfirm(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 12, width: '100%',
            padding: '12px 0', background: 'none', cursor: 'pointer', color: 'var(--coral)',
          }}
          aria-label="Sign out">
          <span style={{ fontSize: 18, width: 28, textAlign: 'center' }}>🚪</span>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Sign Out</span>
        </button>
      </div>

      {/* Logout confirm sheet */}
      {logoutConfirm && (
        <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="logout-title"
          onClick={(e) => e.target === e.currentTarget && setLogoutConfirm(false)}>
          <div className="sheet" style={{ paddingBottom: 40 }}>
            <div className="sheet-handle" aria-hidden="true" />
            <h2 id="logout-title" className="sheet-title">Sign out?</h2>
            <p className="text-sm text-muted" style={{ marginBottom: 20 }}>
              You'll need to sign back in to propose workshops or see your bookings.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-outline btn-full" onClick={() => setLogoutConfirm(false)}>Cancel</button>
              <button className="btn btn-danger btn-full" onClick={() => { logout(); setLogoutConfirm(false); onNavigate('home'); }}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
