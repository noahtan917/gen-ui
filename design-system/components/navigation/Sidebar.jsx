import React from 'react';

/** Dark product sidebar for internal tools. Items: { key, label, icon?, count? }; groups separated by section titles. */
export function Sidebar({ header, sections = [], value, onChange, footer, width = 240, style }) {
  return (
    <aside style={{ width, flex: 'none', background: 'var(--c-black)', color: '#F1F3F7', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-text)', borderRight: '1px solid #252C39', ...style }}>
      {header && <div style={{ height: 64, display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #1B212C' }}>{header}</div>}
      <nav style={{ flex: 1, overflow: 'auto', padding: '16px 12px', display: 'grid', gap: 20, alignContent: 'start' }}>
        {sections.map((s, i) => (
          <div key={i} style={{ display: 'grid', gap: 2 }}>
            {s.title && <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: '#667085', padding: '0 10px 6px' }}>{s.title}</span>}
            {s.items.map(it => <SideItem key={it.key} it={it} on={it.key === value} onClick={() => onChange && onChange(it.key)} />)}
          </div>
        ))}
      </nav>
      {footer && <div style={{ padding: 16, borderTop: '1px solid #1B212C' }}>{footer}</div>}
    </aside>
  );
}

function SideItem({ it, on, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', border: 0, borderRadius: 4, padding: '8px 10px', minHeight: 36, cursor: 'pointer', font: (on ? '600' : '500') + ' 14px/20px var(--font-text)', color: on ? '#fff' : '#98A2B4', background: on ? '#1B212C' : h ? '#12161F' : 'transparent', boxShadow: on ? 'inset 2px 0 0 #2F63D6' : 'none', transition: 'background var(--duration-fast)' }}>
      {it.icon && <span style={{ display: 'flex', width: 18, justifyContent: 'center' }}>{it.icon}</span>}
      <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.label}</span>
      {it.count != null && <span style={{ fontSize: 12, fontVariantNumeric: 'tabular-nums', color: on ? '#F1F3F7' : '#667085' }}>{it.count}</span>}
    </button>
  );
}
