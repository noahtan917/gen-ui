function AgentRankView({ agents }) {
  const { Card, VerdictChip, TextField, Select } = window.DS917;
  const [q, setQ] = React.useState('');
  const rows = agents.filter(a => a.name.toLowerCase().includes(q.toLowerCase())).sort((a, b) => b.score - a.score);
  return (
    <div data-screen-label="AgentRank" style={{ display: 'grid', gap: 16, maxWidth: 1200 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <TextField label="Search agents" placeholder="Agent name" value={q} onChange={e => setQ(e.target.value)} style={{ width: 280 }} />
        <Select label="Team" options={['All teams', 'Treasury', 'Legal ops', 'Collections', 'Sales', 'Operations']} style={{ width: 200 }} />
      </div>
      <Card padding={0} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr) 200px 110px 110px 90px', gap: 16, padding: '10px 20px', background: 'var(--surface-sunken)', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
          <span>Agent</span><span>Team</span><span>AgentRank score</span><span style={{ textAlign: 'right' }}>Cost / action</span><span style={{ textAlign: 'right' }}>Actions, 7 d</span><span>Status</span>
        </div>
        {rows.map(a => (
          <div key={a.name} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr) 200px 110px 110px 90px', gap: 16, alignItems: 'center', padding: '14px 20px', borderTop: '1px solid var(--border)', fontSize: 14 }}>
            <b style={{ fontWeight: 600 }}>{a.name}</b><span style={{ color: 'var(--text-secondary)' }}>{a.team}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ flex: 1, height: 6, background: 'var(--surface-sunken)', borderRadius: 3, overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: a.score + '%', background: 'var(--blue-300)' }} /></span>
              <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600, width: 24 }}>{a.score}</span>
            </span>
            <span style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{a.cost}</span>
            <span style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{a.actions}</span>
            <VerdictChip state={a.state}>{a.state === 'hold' ? 'Review' : 'Healthy'}</VerdictChip>
          </div>
        ))}
      </Card>
      <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Score combines outcome, cost and policy fit. Example data.</span>
    </div>
  );
}
window.AgentRankView = AgentRankView;
