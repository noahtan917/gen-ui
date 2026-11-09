import React from 'react';

const DOT = { allow: '#1F9D63', hold: '#D99A21', block: '#D2483B', info: '#86A8F2' };

/** Brief system message: what happened and what to do next. Dark surface in both themes. */
export function Toast({ state = 'info', title, children, action, onAction, onClose, style }) {
  return (
    <div role="status" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, width: 380, maxWidth: '100%', padding: '14px 16px', borderRadius: 'var(--radius-md)', background: 'var(--c-graphite)', color: '#F1F3F7', boxShadow: '0 8px 24px rgba(10,12,17,.24), inset 0 0 0 1px #252C39', fontFamily: 'var(--font-text)', ...style }}>
      <i style={{ width: 8, height: 8, borderRadius: '50%', background: DOT[state], marginTop: 6, flex: 'none' }} />
      <div style={{ flex: 1, minWidth: 0, display: 'grid', gap: 2 }}>
        {title && <span style={{ fontSize: 14, fontWeight: 600, lineHeight: '20px' }}>{title}</span>}
        {children && <span style={{ fontSize: 13, lineHeight: '18px', color: '#98A2B4' }}>{children}</span>}
      </div>
      {action && <button onClick={onAction} style={{ background: 'none', border: 0, color: '#86A8F2', font: '600 13px/20px var(--font-text)', cursor: 'pointer', padding: 0 }}>{action}</button>}
      {onClose && <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 0, color: '#98A2B4', cursor: 'pointer', padding: 0, lineHeight: 0 }}><svg viewBox="0 0 24 24" width="16" height="16"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" /></svg></button>}
    </div>
  );
}
