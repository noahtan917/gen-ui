import React from 'react';

/** Small rectangular label for metadata (tier, environment, version). Neutral by default. */
export function Badge({ tone = 'neutral', children, style }) {
  const t = {
    neutral: { background: 'var(--surface-sunken)', color: 'var(--text-secondary)' },
    outline: { background: 'transparent', color: 'var(--text-secondary)', boxShadow: 'inset 0 0 0 1px var(--border)' },
    blue: { background: 'var(--blue-50)', color: 'var(--blue-700)' },
    dark: { background: 'var(--c-black)', color: 'var(--c-white)' },
  }[tone];
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 8px', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-text)', fontSize: 12, fontWeight: 600, lineHeight: '18px', whiteSpace: 'nowrap', ...t, ...style }}>{children}</span>;
}
