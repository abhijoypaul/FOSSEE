import React from 'react';

const TABS = [
  { id: 'home',      label: 'Home',      icon: '⌂' },
  { id: 'workshops', label: 'Workshops', icon: '🎓' },
  { id: 'propose',   label: 'Propose',   icon: '+' },
  { id: 'status',    label: 'My Bookings', icon: '📋' },
  { id: 'profile',   label: 'Profile',   icon: '👤' },
];

const GUEST_TABS = [
  { id: 'home',      label: 'Home',      icon: '⌂' },
  { id: 'workshops', label: 'Workshops', icon: '🎓' },
  { id: 'login',     label: 'Sign In',   icon: '→' },
];

export default function TabBar({ active, onChange, isGuest }) {
  const tabs = isGuest ? GUEST_TABS : TABS;
  return (
    <nav className="tabbar" role="tablist" aria-label="App navigation">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={active === t.id}
          aria-label={t.label}
          className={`tab-item${active === t.id ? ' active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          <span className="tab-item-icon" aria-hidden="true"
            style={t.id === 'propose' ? {
              background: 'var(--ink)', color: 'var(--lime)',
              width: 34, height: 34, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 300,
            } : {}}>
            {t.icon}
          </span>
          {active === t.id && t.id !== 'propose' && <span className="tab-item-pip" aria-hidden="true" />}
          <span className="tab-item-label">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
