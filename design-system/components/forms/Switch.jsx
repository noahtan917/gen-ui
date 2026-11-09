import React from 'react';

export function Switch({ label, checked, defaultChecked, onChange, disabled, style }) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked ?? inner;
  const toggle = () => { if (disabled) return; setInner(!on); onChange && onChange(!on); };
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-text)', fontSize: 14, color: 'var(--text-primary)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .45 : 1, ...style }}>
      <button type="button" role="switch" aria-checked={on} onClick={toggle} disabled={disabled}
        style={{ width: 36, height: 20, borderRadius: 999, border: 0, padding: 2, flex: 'none', background: on ? 'var(--action)' : 'var(--neutral-300)', cursor: 'inherit', transition: 'background var(--duration-fast) var(--ease-standard)' }}>
        <span style={{ display: 'block', width: 16, height: 16, borderRadius: '50%', background: '#fff', transform: on ? 'translateX(16px)' : 'none', transition: 'transform var(--duration-fast) var(--ease-standard)' }} />
      </button>
      {label}
    </label>
  );
}
