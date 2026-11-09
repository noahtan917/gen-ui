function AboutPage({ go }) {
  const areas = [['AI infrastructure', 'The control plane that routes, governs and observes enterprise agents.', '917 AgentBase'], ['Enterprise AI products', 'Vertical AI products for legal, finance, collections, marketing, sales, procurement and booking.', '917 AI Labs and its product family'], ['AI venture creation', 'New companies built with AI from day one.', '917 AI Labs'], ['Developers and ecosystem', 'SDKs, marketplace, partner and developer programs.', '917 Velocity, Agent Marketplace'], ['Distribution and market access', 'Getting AI products to enterprise buyers across the region.', '917 Velocity']];
  return (<>
    <Section pad={112}>
      <div data-screen-label="About" style={{ display: 'grid', gap: 24, maxWidth: 820 }}>
        <span style={H.label}>About 917V</span>
        <h1 style={H.display}>917V is an AI venture and technology company.</h1>
        <p style={H.lead}>We build the infrastructure, the products and the companies that let enterprises put AI to work. We started as 917 Ventures. The name 917V marks the move from investing in technology to building and operating it.</p>
      </div>
    </Section>
    <Section bg="var(--surface-page)">
      <div style={{ display: 'grid', gap: 32 }}>
        <h2 style={H.h1}>What we do</h2>
        <div style={{ background: 'var(--surface-card)', borderRadius: 6, boxShadow: 'inset 0 0 0 1px var(--border)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr) minmax(0,1fr)', gap: 24, padding: '12px 24px', background: 'var(--surface-sunken)', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}><span>Area</span><span>What it means</span><span>Carried by</span></div>
          {areas.map(([a, b, c]) => (
            <div key={a} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr) minmax(0,1fr)', gap: 24, padding: '16px 24px', borderTop: '1px solid var(--border)', fontSize: 15, lineHeight: '23px' }}>
              <span style={{ fontWeight: 600 }}>{a}</span><span style={{ color: 'var(--text-secondary)' }}>{b}</span><span>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
    <Section>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48 }}>
        {[['Purpose', 'Put AI to work for every enterprise.', 'Not as a pilot or a demo, but as agents that run real work every day, under controls a compliance team can sign off.'], ['Ambition', 'The AI company enterprises name first.', 'Built in the Philippines today and growing across the region and globally by 2030.']].map(([k, t, d]) => (
          <div key={k} style={{ display: 'grid', gap: 12, alignContent: 'start' }}><span style={H.label}>{k}</span><h2 style={H.h2}>{t}</h2><p style={H.body}>{d}</p></div>
        ))}
      </div>
    </Section>
  </>);
}

function ContactPage({ go }) {
  const { TextField, Select, Button, Toast } = window.DS917;
  const [sent, setSent] = React.useState(false);
  return (
    <Section bg="var(--surface-page)" pad={96}>
      <div data-screen-label="Contact" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 56 }}>
        <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
          <h1 style={H.h1}>Talk to the team.</h1>
          <p style={H.body}>Tell us which team you want to put AI to work for. We reply within two working days.</p>
        </div>
        <div style={{ background: 'var(--surface-card)', borderRadius: 6, boxShadow: 'inset 0 0 0 1px var(--border)', padding: 28, display: 'grid', gap: 18 }}>
          <TextField label="Work email" placeholder="name@company.com" />
          <TextField label="Company" />
          <Select label="Interested in" options={['917 AgentBase', '917 AI Labs products', '917 Velocity partner program']} />
          <div><Button onClick={() => setSent(true)}>Send request</Button></div>
          {sent && <Toast state="allow" title="Request sent" onClose={() => setSent(false)}>We'll reply to your work email within two working days.</Toast>}
        </div>
      </div>
    </Section>
  );
}
Object.assign(window, { AboutPage, ContactPage });
