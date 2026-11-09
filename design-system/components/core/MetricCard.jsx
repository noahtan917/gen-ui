import React from 'react';
import { FacetMark } from './FacetMark.jsx';

/** Flat metric card from the brand book's Core components demo. */
export function MetricCard({ label, value, caption, facet = null, tone = 'card', children, style }) {
  const bg = tone === 'sunken' ? 'var(--surface-page)' : 'var(--surface-card)';
  return (
    <div style={{ position: 'relative', display: 'grid', gap: 4, padding: '16px 18px', borderRadius: 'var(--radius-md)', background: bg, boxShadow: 'inset 0 0 0 1px var(--border)', minWidth: 0, ...style }}>
      {facet && <span style={{ position: 'absolute', top: 14, right: 14 }}><FacetMark tier={facet} size={16} /></span>}
      {label && <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{label}</span>}
      {value != null && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 30, lineHeight: 1.15, letterSpacing: '-.02em', fontVariantNumeric: 'tabular-nums', color: 'var(--text-primary)' }}>{value}</span>}
      {caption && <span style={{ fontSize: 13, lineHeight: '18px', color: 'var(--text-secondary)' }}>{caption}</span>}
      {children}
    </div>
  );
}

/** Generic flat panel. */
export function Card({ padding = 24, children, style, ...rest }) {
  return <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-md)', boxShadow: 'inset 0 0 0 1px var(--border)', padding, minWidth: 0, ...style }} {...rest}>{children}</div>;
}
