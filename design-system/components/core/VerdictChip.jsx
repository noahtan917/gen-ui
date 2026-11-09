import React from 'react';

const STATES = { allow: ['#1F9D63', 'Allow'], hold: ['#D99A21', 'Hold'], block: ['#D2483B', 'Block'], info: ['#2F63D6', 'Info'], neutral: ['#98A2B4', 'Idle'] };

/** Status chip — a state color always paired with a word. */
export function VerdictChip({ state = 'allow', children, style }) {
  const [c, word] = STATES[state] || STATES.neutral;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px 3px 8px', borderRadius: 999, background: 'var(--surface-sunken)', color: 'var(--text-primary)', fontFamily: 'var(--font-text)', fontSize: 12.5, fontWeight: 600, lineHeight: '18px', whiteSpace: 'nowrap', ...style }}>
      <i style={{ width: 7, height: 7, borderRadius: '50%', background: c, display: 'block' }} />
      {children || word}
    </span>
  );
}
