const CAPS = [
  ['agentrank', 'AgentRank', 'Scores each agent on outcome, cost and policy fit, then routes every task to the best one.'],
  ['agent-gateway', 'Agent Gateway', 'One entry point for every agent call, with identity, rate limits and routing.'],
  ['agent-guard', 'Agent Guard', 'Checks every action against your policy set before it runs, and keeps a signed record of each verdict.'],
  ['agent-insights', 'Agent Insights', 'Cost, outcome and verdict history for every agent, team and policy.'],
  ['agent-marketplace', 'Agent Marketplace', 'Approved agents from 917 and partners, ready to deploy under your controls.'],
];

function ProductShot() {
  const { MetricCard, VerdictChip } = window.DS917;
  const rows = [['Payments agent', 'Release ₱740,000 to supplier', 'hold'], ['Claims agent', 'Close claim #20931', 'allow'], ['Outreach agent', 'Export 1,200 contacts', 'block']];
  return (
    <div style={{ background: 'var(--surface-page)', borderRadius: 6, padding: 20, boxShadow: 'inset 0 0 0 1px var(--border)', display: 'grid', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12 }}>
        <MetricCard label="Agents" value="1,284" caption="Last 7 days" facet="agentbase" />
        <MetricCard label="Checked" value="92,410" caption="Last 7 days" />
        <MetricCard label="Held" value="12" caption="Need review" />
      </div>
      <div style={{ background: 'var(--surface-card)', borderRadius: 6, boxShadow: 'inset 0 0 0 1px var(--border)' }}>
        {rows.map(([a, b, s], i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr auto', gap: 12, alignItems: 'center', padding: '12px 16px', borderTop: i ? '1px solid var(--border)' : 0, fontSize: 14 }}>
            <span style={{ fontWeight: 600 }}>{a}</span><span style={{ color: 'var(--text-secondary)', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b}</span><VerdictChip state={s} />
          </div>
        ))}
      </div>
      <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Example data</span>
    </div>
  );
}

function AgentBasePage({ go }) {
  const { SiteHeader, SiteFooter, Button } = window.DS917;
  return (<>
    <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
      <SiteHeader logo={<img src={ASSETS + '/03-pillar-lockups/917-agentbase/horizontal/917-agentbase-transparent-dark-text.svg'} style={{ height: 22 }} alt="917 AgentBase" />}
        nav={['Capabilities', 'Security', 'Developers', 'Docs']} onNav={(n) => !n && go('agentbase')} cta="Book a demo" onCta={() => go('contact')} />
    </div>
    <Section pad={88}>
      <div data-screen-label="AgentBase hero" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 56, alignItems: 'center' }}>
        <div style={{ display: 'grid', gap: 24 }}>
          <span style={H.label}>917 AgentBase · Enterprise Agent Control Plane</span>
          <h1 style={H.display}>Agents you can govern.</h1>
          <p style={H.lead}>One control plane to route, check and observe every agent an enterprise runs. Every action is checked, logged and traceable.</p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="secondary" size="lg" onClick={() => go('console')}>See the console</Button>
            <a href="#" onClick={e => e.preventDefault()} style={{ fontWeight: 600 }}>Read the docs</a>
          </div>
        </div>
        <ProductShot />
      </div>
    </Section>
    <Section bg="var(--surface-page)">
      <div style={{ display: 'grid', gap: 40 }}>
        <h2 style={H.h1}>Five capabilities, one control plane.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
          {CAPS.map(([k, n, d]) => (
            <div key={k} style={{ display: 'grid', gap: 12, alignContent: 'start', padding: 24, background: 'var(--surface-card)', borderRadius: 6, boxShadow: 'inset 0 0 0 1px var(--border)' }}>
              <img src={ASSETS + '/09-icons/icon-' + k + '-dark.svg'} width="40" height="40" />
              <h3 style={H.h3}>{n}</h3><p style={{ ...H.body, fontSize: 14, lineHeight: '22px' }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
    <Section bg="var(--c-black)" dark>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 48, alignItems: 'center' }}>
        <div style={{ display: 'grid', gap: 16 }}>
          <h2 style={{ ...H.h1, color: '#fff' }}>Check every action before it runs.</h2>
          <p style={{ ...H.body, color: '#98A2B4' }}>Install the SDK, then call guard.check() before every action. Held actions go to a named reviewer.</p>
        </div>
        <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 13.5, lineHeight: '20px', background: '#12161F', color: '#F1F3F7', padding: 24, borderRadius: 6, boxShadow: 'inset 0 0 0 1px #252C39', overflow: 'auto' }}>{`import { agentbase } from "@917/agentbase"

const verdict = await agentbase.guard.check(action)

if (verdict.state === "hold") {
  await verdict.requestReview({ team: "treasury" })
}`}</pre>
      </div>
    </Section>
    <SiteFooter logo={<div style={{ display: 'grid', gap: 10 }}><img src={ASSETS + '/01-master-logo/917v-primary-transparent-for-dark-bg.svg'} width="72" alt="917V" /></div>}
      line="A 917V product" columns={[{ title: 'AgentBase', links: ['Capabilities', 'Security', 'Pricing'] }, { title: 'Developers', links: ['Docs', 'SDKs', 'Status'] }]} legal="© 2026 917V · agentbase.917v.ai" />
  </>);
}
window.AgentBasePage = AgentBasePage;
