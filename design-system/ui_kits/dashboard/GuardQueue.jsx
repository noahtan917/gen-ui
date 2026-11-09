function GuardQueue({ queue, selected, setSelected, decide }) {
  const { Tabs, VerdictChip, Button, Card } = window.DS917;
  const [tab, setTab] = React.useState('hold');
  const rows = queue.filter(q => q.state === tab);
  const count = (s) => queue.filter(q => q.state === s).length;
  const sel = queue.find(q => q.id === selected);
  const cols = sel ? 'minmax(0,1fr) auto' : '90px minmax(0,2fr) minmax(0,1fr) 70px 90px';
  const [wide, setWide] = React.useState(window.innerWidth >= 1100);
  React.useEffect(() => { const f = () => setWide(window.innerWidth >= 1100); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);
  return (
    <div data-screen-label="Agent Guard queue" style={{ display: 'grid', gridTemplateColumns: sel && wide ? 'minmax(0,1fr) 360px' : 'minmax(0,1fr)', gap: 24, maxWidth: 1200, alignItems: 'start' }}>
      <div style={{ display: 'grid', gap: 16 }}>
        <Tabs items={[{ value: 'hold', label: 'Held', count: count('hold') }, { value: 'allow', label: 'Allowed', count: count('allow') }, { value: 'block', label: 'Blocked', count: count('block') }]} value={tab} onChange={(t) => { setTab(t); setSelected(null); }} />
        <Card padding={0} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 16, padding: '10px 20px', background: 'var(--surface-sunken)', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
            {!sel && <span>ID</span>}<span>Action</span>{!sel && <span>Policy</span>}{!sel && <span>Age</span>}<span>Verdict</span>
          </div>
          {rows.length === 0 && <div style={{ padding: 24, fontSize: 14, color: 'var(--text-secondary)' }}>No actions here.</div>}
          {rows.map(q => (
            <button key={q.id} onClick={() => setSelected(q.id)} style={{ display: 'grid', gridTemplateColumns: cols, gap: 16, alignItems: 'center', width: '100%', textAlign: 'left', border: 0, borderTop: '1px solid var(--border)', padding: '14px 20px', cursor: 'pointer', font: 'inherit', fontSize: 14, color: 'inherit', background: q.id === selected ? 'var(--blue-50)' : 'var(--surface-card)', boxShadow: q.id === selected ? 'inset 2px 0 0 var(--action)' : 'none' }}>
              {!sel && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-secondary)' }}>{q.id}</span>}
              <span style={{ display: 'grid', minWidth: 0 }}><b style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.action}</b><span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{q.agent} · {q.team}</span></span>
              {!sel && <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{q.policy}</span>}
              {!sel && <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--text-secondary)' }}>{q.age}</span>}
              <VerdictChip state={q.state} />
            </button>
          ))}
        </Card>
      </div>
      {sel && (
        <Card style={{ position: wide ? 'sticky' : 'static', top: 0, display: 'grid', gap: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-secondary)' }}>{sel.id}</span><VerdictChip state={sel.state} />
          </div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, lineHeight: '26px', letterSpacing: '-.01em' }}>{sel.action}</h2>
          <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '90px 1fr', gap: '8px 12px', fontSize: 14 }}>
            <dt style={{ color: 'var(--text-secondary)' }}>Agent</dt><dd style={{ margin: 0 }}>{sel.agent}</dd>
            <dt style={{ color: 'var(--text-secondary)' }}>Team</dt><dd style={{ margin: 0 }}>{sel.team}</dd>
            <dt style={{ color: 'var(--text-secondary)' }}>Policy</dt><dd style={{ margin: 0 }}>{sel.policy}</dd>
            <dt style={{ color: 'var(--text-secondary)' }}>Waiting</dt><dd style={{ margin: 0 }}>{sel.age}</dd>
          </dl>
          {sel.state === 'hold' ? (<>
            <p style={{ margin: 0, fontSize: 14, lineHeight: '22px', color: 'var(--text-secondary)', background: 'var(--surface-sunken)', padding: 12, borderRadius: 4 }}>Held because the action matches "{sel.policy}". A reviewer needs to approve it before it runs.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button onClick={() => decide(sel.id, 'allow')}>Allow action</Button>
              <Button variant="secondary" onClick={() => decide(sel.id, 'block', true)}>Block</Button>
            </div>
          </>) : <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)' }}>Decision recorded and signed. The full trace is in Agent Insights.</p>}
        </Card>
      )}
    </div>
  );
}
window.GuardQueue = GuardQueue;
