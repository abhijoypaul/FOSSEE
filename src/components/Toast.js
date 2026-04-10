import React from 'react';
import { useApp } from '../context/AppContext';

const ICONS = { success: '✓', error: '✕', info: 'i' };

export default function ToastContainer() {
  const { toasts } = useApp();
  if (!toasts.length) return null;
  return (
    <div className="toast-wrap" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`} role="alert">
          <span style={{ fontWeight: 800, fontSize: 13 }}>{ICONS[t.type]}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
