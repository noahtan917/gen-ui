import React from 'react';
import { Button } from '../core/Button.jsx';

/** Modal dialog. Title says the decision; primary button says what will happen. */
export function Dialog({ open = true, title, children, confirm = 'Confirm', cancel = 'Cancel', onConfirm, onCancel, danger = false, inline = false, width = 460, style }) {
  if (!open) return null;
  const panel = (
    <div role="dialog" aria-modal="true" style={{ width, maxWidth: 'calc(100vw - 32px)', background: 'var(--surface-card)', color: 'var(--text-primary)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-overlay)', fontFamily: 'var(--font-text)', ...style }}>
      <div style={{ padding: '24px 24px 0', display: 'grid', gap: 8 }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, lineHeight: '24px' }}>{title}</h3>
        <div style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-secondary)' }}>{children}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: 24 }}>
        {cancel && <Button variant="secondary" onClick={onCancel}>{cancel}</Button>}
        <Button onClick={onConfirm} style={danger ? { background: 'var(--state-block)' } : null}>{confirm}</Button>
      </div>
    </div>
  );
  if (inline) return panel;
  return <div onClick={(e) => e.target === e.currentTarget && onCancel && onCancel()} style={{ position: 'fixed', inset: 0, background: 'rgba(10,12,17,.48)', display: 'grid', placeItems: 'center', zIndex: 100 }}>{panel}</div>;
}
