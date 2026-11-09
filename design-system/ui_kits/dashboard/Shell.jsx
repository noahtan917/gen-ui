const ASSETS = '../../assets';
const I = (k) => <img src={ASSETS + '/09-icons/icon-' + k + '-white.svg'} width="18" height="18" alt="" />;

function ConsoleShell({ view, setView, held, children, title, actions }) {
  const { Sidebar, Badge } = window.DS917;
  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--surface-page)' }}>
      <Sidebar header={<img src={ASSETS + '/03-pillar-lockups/917-agentbase/horizontal/917-agentbase-transparent-white-text.svg'} style={{ height: 20 }} alt="917 AgentBase" />}
        value={view} onChange={setView}
        sections={[
          { items: [{ key: 'overview', label: 'Overview', icon: I('agentbase') }] },
          { title: 'Capabilities', items: [
            { key: 'guard', label: 'Agent Guard', icon: I('agent-guard'), count: held },
            { key: 'rank', label: 'AgentRank', icon: I('agentrank') },
            { key: 'gateway', label: 'Agent Gateway', icon: I('agent-gateway') },
            { key: 'insights', label: 'Agent Insights', icon: I('agent-insights') },
          ] },
        ]}
        footer={<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#1B212C', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 600 }}>MR</span>
          <div style={{ display: 'grid', fontSize: 13, lineHeight: '18px' }}><span style={{ fontWeight: 600 }}>Maria Reyes</span><span style={{ color: '#98A2B4' }}>Risk reviewer</span></div>
        </div>} />
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: 64, flex: 'none', display: 'flex', alignItems: 'center', gap: 16, padding: '0 32px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border)' }}>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, letterSpacing: '-.01em', flex: 1 }}>{title}</h1>
          <Badge tone="outline">Production</Badge>
          {actions}
        </header>
        <div style={{ flex: 1, overflow: 'auto', padding: 32 }}>{children}</div>
      </main>
    </div>
  );
}
Object.assign(window, { ConsoleShell, ASSETS });
