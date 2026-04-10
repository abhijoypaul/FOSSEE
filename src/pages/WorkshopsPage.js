import React, { useState, useMemo } from 'react';
import { WORKSHOP_TYPES } from '../data/mockData';

const CATEGORIES = ['All', ...Array.from(new Set(WORKSHOP_TYPES.map((w) => w.category)))];

function WorkshopDetail({ wt, onClose, onPropose }) {
  const [tncOpen, setTncOpen] = useState(false);
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="wt-detail-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sheet">
        <div className="sheet-handle" aria-hidden="true" />
        {/* Hero color block */}
        <div className="wt-detail-hero" style={{ background: wt.color + '55' }}>
          <div className="wt-detail-badge">{wt.icon}</div>
          <h2 id="wt-detail-title" className="wt-detail-name">{wt.name}</h2>
          <div className="wt-detail-dur">{wt.duration} Day{wt.duration > 1 ? 's' : ''} · {wt.category}</div>
        </div>

        <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 14, marginBottom: 6, color: 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>About</h3>
        <p className="text-sm" style={{ lineHeight: 1.6, marginBottom: 16, color: 'var(--ink2)' }}>{wt.description}</p>

        <div className="drow">
          <span className="drow-label">Duration</span>
          <span className="drow-val">{wt.duration} day{wt.duration > 1 ? 's' : ''}</span>
        </div>
        <div className="drow">
          <span className="drow-label">Enrollments</span>
          <span className="drow-val">{wt.enrollments} participants</span>
        </div>
        <div className="drow">
          <span className="drow-label">Category</span>
          <span className="drow-val">{wt.category}</span>
        </div>

        <div style={{ marginTop: 14 }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setTncOpen((v) => !v)}
            aria-expanded={tncOpen}
            style={{ marginBottom: 8, padding: '6px 0', color: 'var(--sky)' }}>
            {tncOpen ? '▲' : '▼'} Terms &amp; Conditions
          </button>
          {tncOpen && (
            <div style={{
              background: 'var(--cream2)', borderRadius: 'var(--r-sm)', padding: '12px 14px',
              fontSize: 12, lineHeight: 1.7, color: 'var(--ink2)', whiteSpace: 'pre-line',
            }}>
              {wt.terms_and_conditions}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button className="btn btn-outline btn-full" onClick={onClose}>Close</button>
          <button className="btn btn-lime btn-full" onClick={() => { onClose(); onPropose(wt); }}>
            Propose This Workshop
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WorkshopsPage({ onPropose }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return WORKSHOP_TYPES.filter((w) => {
      const matchQ = w.name.toLowerCase().includes(query.toLowerCase()) ||
        w.description.toLowerCase().includes(query.toLowerCase());
      const matchC = cat === 'All' || w.category === cat;
      return matchQ && matchC;
    });
  }, [query, cat]);

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">Browse</p>
        <h1 className="page-title">Workshop <em>Types</em></h1>
        <p className="page-subtitle">All {WORKSHOP_TYPES.length} available programmes from FOSSEE · IIT Bombay</p>
      </header>

      {/* Search */}
      <div className="searchbar" role="search">
        <span className="searchbar-icon" aria-hidden="true">🔍</span>
        <input
          type="search" placeholder="Search workshops…"
          value={query} onChange={(e) => setQuery(e.target.value)}
          aria-label="Search workshops"
        />
        {query && (
          <button onClick={() => setQuery('')} aria-label="Clear search"
            style={{ color: 'var(--ink3)', fontSize: 14, padding: '2px 6px', borderRadius: 4, background: 'var(--cream2)' }}>✕</button>
        )}
      </div>

      {/* Category chips */}
      <div className="chips" role="group" aria-label="Filter by category">
        {CATEGORIES.map((c) => (
          <button key={c} className={`chip${cat === c ? ' active' : ''}`}
            onClick={() => setCat(c)} aria-pressed={cat === c}>
            {c}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🔍</div>
          <h2 className="empty-title">No results found</h2>
          <p className="empty-text">Try adjusting your search or clearing filters.</p>
        </div>
      ) : (
        <section aria-label="Workshop types list">
          <p className="text-xs text-muted" style={{ marginBottom: 10 }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
          {filtered.map((wt, i) => (
            <article key={wt.id}
              className="wk-card"
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => setSelected(wt)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelected(wt)}
              aria-label={`${wt.name}, ${wt.duration} day workshop in ${wt.category}`}>
              <div className="wk-row1">
                <div>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{wt.icon}</div>
                  <h3 className="wk-name">{wt.name}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                  <span className="badge badge-lime">{wt.category}</span>
                  <span className="badge badge-info">{wt.duration}d</span>
                </div>
              </div>
              <p className="wk-meta" style={{ marginBottom: 10, lineHeight: 1.5 }}>{wt.description.slice(0, 90)}…</p>
              <div style={{ height: 3, borderRadius: 2, background: wt.color, width: '100%' }} aria-hidden="true" />
              <div className="wk-row2" style={{ marginTop: 10 }}>
                <span className="text-xs text-muted">{wt.enrollments} enrolled</span>
                <span className="text-xs" style={{ color: 'var(--sky)', fontWeight: 600 }}>View details →</span>
              </div>
            </article>
          ))}
        </section>
      )}

      {selected && (
        <WorkshopDetail
          wt={selected}
          onClose={() => setSelected(null)}
          onPropose={(wt) => { setSelected(null); onPropose(wt); }}
        />
      )}
    </main>
  );
}
