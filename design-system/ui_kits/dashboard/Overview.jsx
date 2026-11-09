function WeekChart({ data }) {
  const max = Math.max(...data);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12, alignItems: 'end', height: 180 }}>
      {data.map((v, i) => (
        <div key={i} style={{ display: 'grid', gap: 8, justifyItems: 'center', alignContent: 'end', height: '100%' }}>
          <span style={{ fontSize: 12, fontVariantNumeric: 'tabular-nums', color: 'var(--text-secondary)' }}>{(v / 1000).toFixed(1)}K</span>
          <div style={{ width: '100%', height: (v / max) * 130, background: i === 5 ? 'var(--blue-500)' : 'var(--blue-200)', borderRadius: 2 }} />
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

function Overview({ data, queue, open }) {
  const { MetricCard, Card, VerdictChip, Button } = window.DS917;
  const held = queue.filter(q => q.state === 'hold');
  return (
    <div data-screen-label="Overview" style={{ display: 'grid', gap: 24, maxWidth: 1200 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <MetricCard label="Active agents" value="1,284" caption="Last 7 days" />
        <MetricCard label="Actions checked" value="92,410" caption="Last 7 days" />
        <MetricCard label="Held for review" value={String(held.length)} caption={held.length ? 'Oldest ' + held[held.length - 1].age + ' ago' : 'Queue is clear'} facet="agentbase" />
        <MetricCard label="Blocked" value="31" caption="0.03% of actions" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)', gap: 16 }}>
        <Card>
          <div style={{ display: 'grid', gap: 4, marginBottom: 24 }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18 }}>Actions checked per day</h2>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Saturday peak: month-end payment runs</span>
          </div>
          <WeekChart data={data.week} />
        </Card>
        <Card padding={0}>
          <div style={{ padding: '20px 24px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18 }}>Waiting for you</h2>
            <Button variant="ghost" size="sm" onClick={() => open(null)}>View queue</Button>
          </div>
          {held.length === 0 && <p style={{ padding: '0 24px 24px', margin: 0, color: 'var(--text-secondary)', fontSize: 14 }}>Nothing is held. New holds appear here.</p>}
          {held.map(q => (
            <button key={q.id} onClick={() => open(q.id)} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 4, width: '100%', textAlign: 'left', background: 'none', border: 0, borderTop: '1px solid var(--border)', padding: '12px 24px', cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{q.action}</span><VerdictChip state="hold" />
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{q.agent} · {q.age} ago</span>
            </button>
          ))}
        </Card>
      </div>
    </div>
  );
}
window.Overview = Overview;
