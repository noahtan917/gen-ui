import React from 'react';

export function Tabs({ items = [], value, onChange, style }) {
  return (
    <div role="tablist" style={{ display: 'flex', gap: 24, borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-text)', ...style }}>
      {items.map(it => {
        const key = typeof it === 'string' ? it : it.value;
        const label = typeof it === 'string' ? it : it.label;
        const count = typeof it === 'string' ? null : it.count;
        const on = key === value;
        return (
          <button key={key} role="tab" aria-selected={on} onClick={() => onChange && onChange(key)}
            style={{ background: 'none', border: 0, padding: '10px 0', marginBottom: -1, cursor: 'pointer', font: (on ? '600' : '500') + ' 14px/20px var(--font-text)', color: on ? 'var(--text-primary)' : 'var(--text-secondary)', borderBottom: '2px solid ' + (on ? 'var(--action)' : 'transparent'), display: 'inline-flex', gap: 8, alignItems: 'center', transition: 'color var(--duration-fast)' }}>
            {label}{count != null && <span style={{ fontSize: 12, fontVariantNumeric: 'tabular-nums', color: 'var(--text-secondary)', background: 'var(--surface-sunken)', borderRadius: 4, padding: '0 6px' }}>{count}</span>}
          </button>
        );
      })}
    </div>
  );
}
