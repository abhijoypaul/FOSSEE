import React from 'react';
import { useApp } from '../context/AppContext';

function FosseeLogo() {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="7" height="7" rx="2" fill="#C8E84C" />
      <rect x="10" y="1" width="7" height="7" rx="2" fill="rgba(245,240,232,0.6)" />
      <rect x="1" y="10" width="7" height="7" rx="2" fill="rgba(245,240,232,0.6)" />
      <rect x="10" y="10" width="7" height="7" rx="2" fill="rgba(245,240,232,0.35)" />
    </svg>
  );
}

export default function TopNav({ onProfileClick }) {
  const { user } = useApp();
  const initials = user
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : null;

  return (
    <nav className="topnav" role="navigation" aria-label="Main navigation">
      <div className="topnav-brand">
        <div className="topnav-logomark" aria-hidden="true">
          <FosseeLogo />
        </div>
        <span className="topnav-wordmark">FOSSEE</span>
      </div>
      <div className="topnav-right">
        {user && (
          <button
            className="topnav-icon-btn"
            aria-label="Notifications"
            title="Notifications"
          >
            <span aria-hidden="true">🔔</span>
            <span className="notif-dot" aria-hidden="true" />
          </button>
        )}
        {user && (
          <button
            className="topnav-avatar"
            onClick={onProfileClick}
            aria-label={`Profile: ${user.first_name} ${user.last_name}`}
            title="My Profile"
          >
            {initials}
          </button>
        )}
      </div>
    </nav>
  );
}
