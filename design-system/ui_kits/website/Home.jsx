const PILLARS = [
  { key: 'agentbase', line: 'Agents you can govern.', text: 'One control plane to route, check and observe every agent an enterprise runs.', go: 'agentbase' },
  { key: 'ai-labs', line: 'AI for every business function.', text: 'Vertical products for real teams, and new companies built with AI from day one.' },
  { key: 'velocity', line: 'From build to market.', text: 'Partner and developer programs, and the route to enterprise buyers across the region.' },
];
const PRODUCTS = [
  ['lex', '917 Lex', 'AI for Legal'], ['ledger', '917 Ledger', 'AI for Finance'], ['collect', '917 Collect', 'AI for Collections'],
  ['agency', '917 Agency', 'AI for Agencies & Marketing'], ['growth', '917 Growth', 'AI for Sales & Prospecting'],
  ['procure', '917 Procure', 'AI for Procurement'], ['reserve', '917 Reserve', 'AI for Booking & Reservations'],
];

function HomePage({ go }) {
  const { Button, FacetMark } = window.DS917;
  return (<>
    <section data-screen-label="Home hero" style={{ position: 'relative', background: 'var(--c-black)', color: '#fff', minHeight: 560, padding: '120px 24px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <Frame color="#2F63D6" h="20%" />
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gap: 28, position: 'relative' }}>
        <h1 style={{ ...H.display, fontSize: 'clamp(48px, 8vw, 96px)', maxWidth: 820 }}>Building the AI Economy.</h1>
        <p style={{ ...H.lead, color: '#98A2B4', fontSize: 20, lineHeight: '30px', maxWidth: 560 }}>917V builds the infrastructure, products and companies of the AI economy.</p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="inverse" size="lg" onClick={() => go('agentbase')}>Explore 917 AgentBase</Button>
          <a href="#" onClick={(e) => { e.preventDefault(); go('about'); }} style={{ color: '#86A8F2', fontWeight: 600, fontSize: 16, whiteSpace: 'nowrap' }}>About 917V</a>
        </div>
      </div>
    </section>

    <Section>
      <div id="pillars" style={{ display: 'grid', gap: 48 }}>
        <div style={{ display: 'grid', gap: 16 }}>
          <h2 style={H.h1}>Infrastructure, products and market access.</h2>
          <p style={H.lead}>An economy needs infrastructure, products, companies, builders and markets. 917V works on all five through three pillars.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {PILLARS.map(p => (
            <div key={p.key} onClick={() => p.go && go(p.go)} style={{ display: 'grid', gap: 16, alignContent: 'start', padding: 28, borderRadius: 6, background: 'var(--surface-page)', cursor: p.go ? 'pointer' : 'default' }}>
              <img src={ASSETS + '/03-pillar-lockups/917-' + p.key + '/horizontal/917-' + p.key + '-transparent-dark-text.svg'} style={{ height: 28, justifySelf: 'start' }} />
              <h3 style={{ ...H.h2, marginTop: 12 }}>{p.line}</h3>
              <p style={H.body}>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>

    <Section bg="var(--c-deep)" dark>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start', color: '#fff' }}>
        <div style={{ display: 'grid', gap: 24 }}>
          <FacetMark tier="lift" size={72} />
          <h2 style={{ ...H.h1, color: '#fff' }}>Build up, cut down.</h2>
          <p style={{ ...H.body, color: '#A8C0F4' }}>We build what enterprises need, the agents, products and companies, and we cut down what they don't: problems, costs and busywork.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {[['Build up', ['Build agents', 'Improve lives', 'Optimize how teams work', 'Grow companies']], ['Cut down', ['Eliminate problems', 'Reduce costs', 'Remove manual work', 'Shorten the time to results']]].map(([t, items]) => (
            <div key={t} style={{ display: 'grid', gap: 14, alignContent: 'start', borderTop: '1px solid #13296A', paddingTop: 20 }}>
              <span style={{ ...H.h3, color: '#fff' }}>{t}</span>
              {items.map(i => <span key={i} style={{ fontSize: 16, color: '#DCE6FB' }}>{i}</span>)}
            </div>
          ))}
        </div>
      </div>
    </Section>

    <Section>
      <div id="labs" style={{ display: 'grid', gap: 40 }}>
        <div style={{ display: 'grid', gap: 16 }}>
          <img src={ASSETS + '/03-pillar-lockups/917-ai-labs/horizontal/917-ai-labs-transparent-dark-text.svg'} style={{ height: 24, justifySelf: 'start' }} />
          <h2 style={H.h1}>One product for each business function.</h2>
          <p style={H.lead}>Legal, finance, collections, marketing, sales, procurement and booking, each with its own product.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {PRODUCTS.map(([k, n, d]) => (
            <div key={k} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 16, borderRadius: 6, boxShadow: 'inset 0 0 0 1px var(--border)' }}>
              <img src={ASSETS + '/06-app-icons/917-' + k + '-app-icon.svg'} width="48" height="48" />
              <div style={{ display: 'grid' }}><span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17 }}>{n}</span><span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{d}</span></div>
            </div>
          ))}
        </div>
      </div>
    </Section>

    <Section bg="var(--surface-page)">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 40 }}>
        {[['Governance first', 'Every agent action is checked before it runs, and every decision can be traced.'], ['Products in real work', 'Legal, finance, collections, marketing, sales, procurement and booking, each with its own product.'], ['Results in numbers', 'Time saved, cost removed, cases closed, from named deployments where the customer agrees.']].map(([t, d]) => (
          <div key={t} style={{ display: 'grid', gap: 10, alignContent: 'start', borderTop: '2px solid var(--c-black)', paddingTop: 20 }}>
            <h3 style={H.h2}>{t}</h3><p style={H.body}>{d}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section bg="var(--c-black)" dark pad={80}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <h2 style={{ ...H.h1, color: '#fff', maxWidth: 640 }}>Deploy AI agents your compliance team can approve.</h2>
        <window.DS917.Button size="lg" onClick={() => go('contact')}>Talk to us</window.DS917.Button>
      </div>
    </Section>
  </>);
}
window.HomePage = HomePage;
