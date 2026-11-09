// Shared website pieces: header/footer wrappers, Frame, section shell.
const ASSETS = '../../assets';

function Frame({ color = '#2F63D6', h = '20%' }) {
  return (<>
    <svg viewBox="0 0 57.7 70" preserveAspectRatio="xMinYMax meet" style={{ position: 'absolute', left: 0, bottom: 0, height: h, pointerEvents: 'none' }}><path d="M0,70H57.7L29.7,0.06Z" fill={color} /></svg>
    <svg viewBox="0 0 54.8 70" preserveAspectRatio="xMaxYMin meet" style={{ position: 'absolute', right: 0, top: 0, height: h, pointerEvents: 'none' }}><path d="M0,0H54.8L27.9,69.8Z" fill={color} /></svg>
  </>);
}

function Section({ bg = 'var(--surface-card)', dark = false, children, style, pad = 96 }) {
  return (
    <section data-theme={dark ? 'dark' : undefined} style={{ background: bg, color: 'var(--text-primary)', padding: pad + 'px 24px', position: 'relative', overflow: 'hidden', ...style }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>{children}</div>
    </section>
  );
}

const H = {
  display: { fontFamily: 'var(--font-display)', fontWeight: 600, fontStretch: '110%', fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1, letterSpacing: '-.03em', margin: 0, textWrap: 'balance' },
  h1: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 40, lineHeight: '44px', letterSpacing: '-.02em', margin: 0, textWrap: 'balance' },
  h2: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 26, lineHeight: '32px', letterSpacing: '-.015em', margin: 0 },
  h3: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, lineHeight: '24px', margin: 0 },
  lead: { fontSize: 18, lineHeight: '28px', color: 'var(--text-secondary)', margin: 0, maxWidth: 620, textWrap: 'pretty' },
  body: { fontSize: 16, lineHeight: '25px', color: 'var(--text-secondary)', margin: 0, textWrap: 'pretty' },
  label: { fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' },
};

function CorporateHeader({ page, go }) {
  const { SiteHeader } = window.DS917;
  const map = { 'AgentBase': 'agentbase', 'AI Labs': 'home#labs', 'Velocity': 'home#pillars', 'About': 'about' };
  const active = page === 'about' ? 'About' : null;
  return <div style={{ position: 'sticky', top: 0, zIndex: 10 }}><SiteHeader logo={<img src={ASSETS + '/01-master-logo/917v-primary-transparent-for-light-bg.svg'} width="48" alt="917V" />}
    nav={Object.keys(map)} active={active} onNav={(n) => go(n ? map[n] : 'home')} cta="Talk to us" onCta={() => go('contact')} /></div>;
}

function CorporateFooter({ go }) {
  const { SiteFooter } = window.DS917;
  return <SiteFooter logo={<img src={ASSETS + '/01-master-logo/917v-primary-transparent-for-dark-bg.svg'} width="72" alt="917V" />}
    line="Building the AI Economy."
    columns={[{ title: 'Pillars', links: ['917 AgentBase', '917 AI Labs', '917 Velocity'] }, { title: 'Products', links: ['917 Lex', '917 Ledger', '917 Collect', '917 Agency'] }, { title: 'Company', links: ['About', 'Careers', 'Press kit', 'Contact'] }]}
    legal="© 2026 917V · Registered company name · Manila, Philippines" />;
}

Object.assign(window, { ASSETS, Frame, Section, H, CorporateHeader, CorporateFooter });
