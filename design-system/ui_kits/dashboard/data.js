window.CONSOLE_DATA = {
  queue: [
    { id: 'A-20931', agent: 'Payments agent', team: 'Treasury', action: 'Release ₱740,000 to Northline Supply', policy: 'Payments over ₱500K', state: 'hold', age: '2 h', product: 'ledger' },
    { id: 'A-20928', agent: 'Contracts agent', team: 'Legal ops', action: 'Send redlined MSA to counterparty', policy: 'External legal documents', state: 'hold', age: '3 h', product: 'lex' },
    { id: 'A-20925', agent: 'Collections agent', team: 'Collections', action: 'Offer 18% settlement on account 44-1902', policy: 'Settlements over 15%', state: 'hold', age: '5 h', product: 'collect' },
    { id: 'A-20917', agent: 'Outreach agent', team: 'Sales', action: 'Export 1,200 contacts to external CRM', policy: 'Bulk data export', state: 'block', age: '6 h', product: 'growth' },
    { id: 'A-20910', agent: 'Claims agent', team: 'Operations', action: 'Close claim #20931 as paid', policy: 'Standard claims', state: 'allow', age: '7 h', product: 'agentbase' },
    { id: 'A-20902', agent: 'Procurement agent', team: 'Procurement', action: 'Raise PO 7781 for ₱212,400', policy: 'Purchase orders', state: 'allow', age: '8 h', product: 'procure' },
  ],
  agents: [
    { name: 'Payments agent', team: 'Treasury', score: 94, cost: '₱0.82', actions: '18,204', state: 'allow' },
    { name: 'Contracts agent', team: 'Legal ops', score: 91, cost: '₱2.10', actions: '4,812', state: 'allow' },
    { name: 'Collections agent', team: 'Collections', score: 88, cost: '₱0.44', actions: '31,550', state: 'allow' },
    { name: 'Outreach agent', team: 'Sales', score: 71, cost: '₱0.31', actions: '22,906', state: 'hold' },
    { name: 'Claims agent', team: 'Operations', score: 96, cost: '₱0.58', actions: '9,140', state: 'allow' },
  ],
  week: [11200, 12480, 13050, 12890, 14210, 15020, 13560],
};
