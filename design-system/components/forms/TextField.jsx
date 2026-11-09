import React from 'react';

export function TextField({ label, value, defaultValue, placeholder, hint, error, type = 'text', disabled, onChange, prefix, style, inputStyle, id }) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || React.useId();
  return (
    <label htmlFor={fid} style={{ display: 'grid', gap: 6, fontFamily: 'var(--font-text)', minWidth: 0, ...style }}>
      {label && <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>}
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, borderRadius: 'var(--radius-sm)', border: '1px solid ' + (error ? 'var(--state-block)' : 'var(--border-strong, var(--border))'), background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)', padding: '0 12px', outline: focus ? '2px solid var(--focus)' : 'none', outlineOffset: 2, transition: 'outline-color var(--duration-fast)' }}>
        {prefix && <span style={{ color: 'var(--text-secondary)', display: 'flex' }}>{prefix}</span>}
        <input id={fid} type={type} value={value} defaultValue={defaultValue} placeholder={placeholder} disabled={disabled}
          onChange={onChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ flex: 1, minWidth: 0, border: 0, outline: 'none', background: 'transparent', font: '400 14px/20px var(--font-text)', color: 'var(--text-primary)', padding: '9px 0', ...inputStyle }} />
      </span>
      {(error || hint) && <span style={{ fontSize: 13, lineHeight: '18px', color: error ? 'var(--state-block)' : 'var(--text-secondary)' }}>{error || hint}</span>}
    </label>
  );
}
