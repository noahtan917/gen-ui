import React from 'react';
import { Button } from '../core/Button.jsx';

/** 64px website header: logo top-left (48px wide on 917v.ai), sentence-case nav, one primary button right. */
export function SiteHeader({ logo, nav = [], active, onNav, cta = 'Talk to us', onCta, theme = 'light', style }) {
  const dark = theme === 'dark';
  return (
    <header style={{ height: 'var(--header-height)', display: 'flex', alignItems: 'center', gap: 32, padding: '0 var(--layout-margin)', background: dark ? 'var(--c-black)' : 'var(--surface-card)', borderBottom: '1px solid ' + (dark ? '#252C39' : 'var(--border)'), fontFamily: 'var(--font-text)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 'none', cursor: 'pointer' }} onClick={() => onNav && onNav(null)}>{logo}</div>
      <nav style={{ display: 'flex', gap: 24, flex: 1, minWidth: 0, overflow: 'hidden' }}>
        {nav.map(n => {
          const on = n === active;
          return <a key={n} href="#" onClick={(e) => { e.preventDefault(); onNav && onNav(n); }}
            style={{ fontSize: 14, fontWeight: on ? 600 : 500, color: dark ? (on ? '#fff' : '#98A2B4') : (on ? 'var(--text-primary)' : 'var(--text-secondary)'), textDecoration: 'none', whiteSpace: 'nowrap' }}>{n}</a>;
        })}
      </nav>
      {cta && <Button size="sm" onClick={onCta}>{cta}</Button>}
    </header>
  );
}

/** Website footer: mark, corporate line, legal name and links. */
export function SiteFooter({ logo, line = 'Building the AI Economy.', columns = [], legal = '© 2026 917V', theme = 'dark', style }) {
  const dark = theme === 'dark';
  const muted = dark ? '#98A2B4' : 'var(--text-secondary)';
  return (
    <footer style={{ background: dark ? 'var(--c-black)' : 'var(--surface-card)', color: dark ? '#F1F3F7' : 'var(--text-primary)', fontFamily: 'var(--font-text)', padding: '64px var(--layout-margin) 32px', ...style }}>
      <div style={{ maxWidth: 'var(--layout-max)', margin: '0 auto', display: 'grid', gap: 48 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) repeat(auto-fit, minmax(140px,1fr))', gap: 32 }}>
          <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>{logo}<span style={{ fontSize: 14, color: muted }}>{line}</span></div>
          {columns.map(c => (
            <div key={c.title} style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{c.title}</span>
              {c.links.map(l => <a key={l} href="#" onClick={e => e.preventDefault()} style={{ fontSize: 14, color: muted, textDecoration: 'none' }}>{l}</a>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid ' + (dark ? '#252C39' : 'var(--border)'), paddingTop: 20, fontSize: 13, color: muted, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span>{legal}</span><span style={{ display: 'flex', gap: 20 }}><span>Privacy</span><span>Terms</span></span>
        </div>
      </div>
    </footer>
  );
}
