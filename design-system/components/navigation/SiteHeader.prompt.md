Website header (64px; logo top-left; nav; one primary button) and SiteFooter (mark, corporate line, link columns, legal).

```jsx
<SiteHeader logo={<img src="assets/01-master-logo/917v-primary-transparent-for-light-bg.svg" width="48" />} nav={['AgentBase','AI Labs','Velocity','About']} cta="Talk to us" />
<SiteFooter logo={<img src="assets/01-master-logo/917v-one-color-white.svg" width="72" />} columns={[{ title: 'Company', links: ['About','Careers'] }]} />
```

- On product sites, pass the product lockup as `logo`; 917V does not appear in the header. Footer line becomes "A 917V product".
