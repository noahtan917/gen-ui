import React from 'react';

const Chev = ({ d }) => <svg viewBox="0 0 24 24" width="18" height="18"><path d={d} fill="none" stroke="currentColor" strokeWidth="2" /></svg>;

function StepButton({ dir, disabled, onClick, bordered, size }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" aria-label={dir === 'prev' ? 'Previous page' : 'Next page'} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ width: size, height: size, display: 'grid', placeItems: 'center', borderRadius: 4, border: bordered ? '1px solid var(--border-strong)' : 0, background: h && !disabled ? 'var(--surface-sunken)' : bordered ? 'var(--surface-card)' : 'transparent', color: 'var(--text-primary)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.35 : 1, transition: 'background var(--duration-fast) var(--ease-standard)' }}>
      <Chev d={dir === 'prev' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
    </button>
  );
}

function slots(cur, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (cur <= 4) return [1, 2, 3, 4, 5, '…', total];
  if (cur >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '…', cur - 1, cur, cur + 1, '…', total];
}

function PageButton({ n, on, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" aria-current={on ? 'page' : undefined} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ minWidth: 36, height: 36, padding: '0 8px', border: 0, borderRadius: 4, font: '600 14px/20px var(--font-text)', fontVariantNumeric: 'tabular-nums', cursor: 'pointer', background: on ? 'var(--action)' : h ? 'var(--surface-sunken)' : 'transparent', color: on ? 'var(--on-action)' : 'var(--text-primary)', transition: 'background var(--duration-fast) var(--ease-standard)' }}>{n}</button>
  );
}

/** Pagination: numbered (tables), count (large lists), compact (tight spaces), dots (carousels). */
export function Pagination({ variant = 'numbered', page = 1, pageCount = 1, onChange, total, pageSize = 25, onPageSizeChange, pageSizes = [25, 50, 100], noun = '', style }) {
  const set = (n) => onChange && onChange(Math.max(1, Math.min(pageCount, n)));
  const prev = <StepButton dir="prev" disabled={page <= 1} onClick={() => set(page - 1)} bordered={variant !== 'numbered'} size={variant === 'numbered' ? 36 : 32} />;
  const next = <StepButton dir="next" disabled={page >= pageCount} onClick={() => set(page + 1)} bordered={variant !== 'numbered'} size={variant === 'numbered' ? 36 : 32} />;
  const base = { display: 'flex', alignItems: 'center', fontFamily: 'var(--font-text)', ...style };
  if (variant === 'dots') {
    return (
      <div role="tablist" aria-label="Slides" style={{ ...base, gap: 0 }}>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map(n => (
          <button key={n} type="button" role="tab" aria-selected={n === page} aria-label={'Slide ' + n} onClick={() => set(n)}
            style={{ width: n === page ? 32 : 24, height: 24, display: 'grid', placeItems: 'center', border: 0, background: 'transparent', padding: 0, cursor: 'pointer' }}>
            <span style={{ display: 'block', height: 8, width: n === page ? 20 : 8, borderRadius: 999, background: n === page ? 'var(--action)' : 'var(--neutral-300)', transition: 'width var(--duration-base) var(--ease-standard)' }} />
          </button>
        ))}
      </div>
    );
  }
  if (variant === 'compact') {
    return <nav aria-label="Pagination" style={{ ...base, gap: 12 }}>{prev}<span style={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums', minWidth: 56, textAlign: 'center', color: 'var(--text-primary)' }}>{page} / {pageCount}</span>{next}</nav>;
  }
  if (variant === 'count') {
    const fmt = (n) => n.toLocaleString('en-US');
    const start = (page - 1) * pageSize + 1, end = Math.min(total ?? pageCount * pageSize, page * pageSize);
    return (
      <nav aria-label="Pagination" style={{ ...base, gap: 20, fontSize: 14, color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
        {onPageSizeChange && <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>Rows per page
          <select value={pageSize} onChange={e => onPageSizeChange(Number(e.target.value))} style={{ font: '400 14px/20px var(--font-text)', color: 'var(--text-primary)', background: 'var(--surface-card)', border: '1px solid var(--border-strong)', borderRadius: 4, padding: '6px 8px' }}>
            {pageSizes.map(s => <option key={s} value={s}>{s}</option>)}
          </select></label>}
        <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--text-primary)' }}>{fmt(start)}–{fmt(end)} of {fmt(total ?? end)}{noun ? ' ' + noun : ''}</span>
        <span style={{ display: 'flex', gap: 4 }}>{prev}{next}</span>
      </nav>
    );
  }
  return (
    <nav aria-label="Pagination" style={{ ...base, gap: 4 }}>
      {prev}
      {slots(page, pageCount).map((s, i) => s === '…'
        ? <span key={'e' + i} style={{ minWidth: 36, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 14 }}>…</span>
        : <PageButton key={s} n={s} on={s === page} onClick={() => set(s)} />)}
      {next}
    </nav>
  );
}
