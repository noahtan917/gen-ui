import React from 'react';

const SIZES = { sm: { padding: '6px 12px', fontSize: 13, minHeight: 32 }, md: { padding: '10px 16px', fontSize: 14, minHeight: 40 }, lg: { padding: '12px 20px', fontSize: 16, minHeight: 48 } };

export function Button({ variant = 'primary', size = 'md', disabled = false, icon = null, iconRight = null, children, onClick, type = 'button', style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontFamily: 'var(--font-text)', fontWeight: 600, lineHeight: 1.2, borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent', cursor: disabled ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
    transition: 'background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)',
    opacity: disabled ? 0.45 : 1, ...s,
  };
  const v = {
    primary: { background: press ? 'var(--action-pressed)' : hover ? 'var(--action-hover)' : 'var(--action)', color: 'var(--on-action)' },
    secondary: { background: hover ? 'var(--surface-sunken)' : 'var(--surface-card)', color: 'var(--text-primary)', borderColor: 'var(--border-strong, var(--border))' },
    ghost: { background: 'transparent', color: 'var(--link)', paddingInline: 4, textDecoration: hover ? 'underline' : 'none', textUnderlineOffset: 3 },
    inverse: { background: hover ? 'var(--neutral-100)' : 'var(--c-white)', color: 'var(--c-black)' },
  }[variant] || {};
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{ ...base, ...v, ...(disabled ? { background: variant === 'primary' ? 'var(--action)' : v.background } : {}), ...style }} {...rest}>
      {icon}{children}{iconRight}
    </button>
  );
}
