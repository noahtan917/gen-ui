import React from 'react';

export function Select({ label, value, defaultValue, options = [], onChange, disabled, style, id }) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || React.useId();
  return (
    <label htmlFor={fid} style={{ display: 'grid', gap: 6, fontFamily: 'var(--font-text)', minWidth: 0, ...style }}>
      {label && <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>}
      <span style={{ position: 'relative', display: 'flex' }}>
        <select id={fid} value={value} defaultValue={defaultValue} onChange={onChange} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ appearance: 'none', width: '100%', font: '400 14px/20px var(--font-text)', color: 'var(--text-primary)', background: 'var(--surface-card)', border: '1px solid var(--border-strong, var(--border))', borderRadius: 'var(--radius-sm)', padding: '9px 36px 9px 12px', outline: focus ? '2px solid var(--focus)' : 'none', outlineOffset: 2, cursor: 'pointer' }}>
          {options.map(o => typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <svg viewBox="0 0 24 24" width="16" height="16" style={{ position: 'absolute', right: 12, top: '50%', marginTop: -8, pointerEvents: 'none', color: 'var(--text-secondary)' }}><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
      </span>
    </label>
  );
}
