import React from 'react';

export function Checkbox({ label, checked, defaultChecked, onChange, disabled, style }) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked ?? inner;
  const toggle = () => { if (disabled) return; setInner(!on); onChange && onChange(!on); };
  return (
    <label onClick={(e) => { e.preventDefault(); toggle(); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 24, fontFamily: 'var(--font-text)', fontSize: 14, color: 'var(--text-primary)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .45 : 1, ...style }}>
      <span role="checkbox" aria-checked={on} tabIndex={0} onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); toggle(); } }}
        style={{ width: 18, height: 18, borderRadius: 4, flex: 'none', display: 'grid', placeItems: 'center', background: on ? 'var(--action)' : 'var(--surface-card)', border: '1px solid ' + (on ? 'var(--action)' : 'var(--border-strong, var(--border))'), transition: 'background var(--duration-fast) var(--ease-standard)' }}>
        {on && <svg viewBox="0 0 24 24" width="14" height="14"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" strokeWidth="2.5" /></svg>}
      </span>
      {label}
    </label>
  );
}
