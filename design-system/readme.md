# 917V Design System

Design system for **917V** (formerly 917 Ventures), an AI venture and technology company based in the Philippines. Corporate line: **Building the AI Economy.** Promise: **Build up, cut down.**

## Sources
- `uploads/brief_files-…-c794.html`: *917V Brand Book, Edition 2.1, October 2026* (approved identity). Originally shared as a claude.ai artifact (`https://claude.ai/artifact/9xdR2N5unB1yNYELewwfrA`). Every rule in this system comes from it.
- `uploads/logos-…zip`: `917V-Brand-Assets` master files (SVG, PNG, JPG). The SVG masters we need are copied into `assets/`.
- Font files supplied by the user: Archivo, Instrument Sans, JetBrains Mono (variable TTFs, SIL OFL) in `fonts/`.
- No codebase, Figma file or live product screens were provided, so the UI kits are built from the brand book's rules and its "Core components" demo. They are not recreations of shipped product.

## Brand architecture
A branded house: one company name, one product prefix, three pillars and one visual system.
- **917V** is the company. The V belongs to the company only.
- **917** is the product prefix. Products never contain the V; they carry the **Facet**, the two triangles the V opens in the mark.
- **Pillars** (Facet tier color): 917 AgentBase (917 Blue, Enterprise Agent Control Plane), 917 AI Labs (Sky, Enterprise AI Products & Venture Building), 917 Velocity (Iris, AI Ecosystem & Market Access).
- **AgentBase capabilities** take no prefix: AgentRank, Agent Gateway, Agent Guard, Agent Insights, Agent Marketplace.
- **AI Labs products**, each with its own Facet color: 917 Lex (Orchid, AI for Legal), 917 Ledger (Jade, AI for Finance), 917 Collect (Saffron, AI for Collections), 917 Agency (Coral, AI for Agencies & Marketing), 917 Growth (Rose, AI for Sales & Prospecting), 917 Procure (Moss, AI for Procurement), 917 Reserve (Fuchsia, AI for Booking & Reservations).
- **Program**: 917 Devs (Plum), the developer program.
- Audiences: enterprises first (CEO/CIO/CFO, risk and compliance, operators), developers and partners second.
- Surfaces in scope: corporate website (917v.ai, product sites at `[product].917v.ai`) and internal tools / dashboards.

---

## CONTENT FUNDAMENTALS
The brand book describes the voice as engineers who can explain their work to a board: plain, exact and calm.

- **Character:** Precise (not cold), Accountable (not defensive), Confident (not hype), Builder (not self-congratulatory).
- **Say what it does.** Lead with the customer outcome. "Agent Guard checks every action before it runs."
- **Numbers over adjectives.** "Closes the books in two days instead of eight." If there's no number, cut the adjective.
- **Short and active.** One idea per sentence, written for a reader who skims.
- **Accountable.** Say what AI does and doesn't do. Name the controls.
- **Casing:** sentence case everywhere: headings, buttons, navigation. No all-caps headlines. "AI" always capitalized.
- **Person:** "we" for 917V. "You" in developer docs (second person, code before prose). Marketing says "enterprise", "teams" or "operators" rather than "users".
- **Punctuation:** no exclamation marks in brand copy. En dash for ranges (2026–2030), × for sizes (1920 × 1080). Headlines are under 10 words and end with a full stop when they are sentences.
- **Numbers and currency:** numerals in product and data copy. ₱1.2M, US$40K, never "PHP" in running copy. Use tabular figures in tables.
- **Emoji:** none in formal channels. Filipino and Taglish are welcome in local social posts only.
- **Vocabulary.** Use: agent, AI agent, governed, controlled, audited, builds, runs, routes, checks, AI economy. Avoid: bot, digital worker, AI employee, "safe" without saying how, revolutionizes, disrupts, supercharges, unlocks, AI revolution.
- **UI copy:** buttons say what will happen ("Deploy agent", not "Submit"). Errors say what went wrong and how to fix it, without apologising. "Action held for review. A supervisor needs to approve it."
- **Product naming:** use the full name on first mention ("917 Lex"), then "Lex" may stand alone. Lead with the descriptor where readers may not know the product: "917 Growth, AI for Sales & Prospecting". Never write LEX, 917Lex, Lex AI, 917V AgentBase or 917 Agent Guard.
- **Approved lines:** "Build up, cut down." · "Build what's needed, remove what isn't." · "917V builds the infrastructure, products and companies of the AI economy."

## VISUAL FOUNDATIONS
Black, white and one blue do most of the work. The layout is architectural and calm: strong left edges, generous margins, one idea per surface.

- **Color proportion:** 917 Black 40%, White 28%, Cloud 16%, Blue 9%, Deep Blue 5%. Accents together stay at or below 2%. Tier and product colors appear only in the Facet plus at most one highlight, never as a wash, gradient or text on white. Heritage Gray `#737373` exists only inside the master mark.
- **917 Blue means "you can act here".** In product UI it is reserved for the one primary button, links, the selected state and focus. It is not used for headings, decoration or charts.
- **Type:** Archivo Semibold for headlines and product names (110% width at display sizes), Archivo Medium for subheads, Instrument Sans for reading and UI, JetBrains Mono for code only and never as a decorative label. Left-align; centre only single lines on covers. Keep lines under about 70 characters.
- **The Facet:** an upward triangle (Build up) and a downward triangle (Cut down). Always the pair, never one alone. **One lit pair per view.** In UI it sits in the top-right corner of the card that matters most, in the product color. It is never used as a bullet, arrow or play button. Minimum width 10 px.
- **The Frame:** the Facet split to the corners. The upward triangle stands bottom-left, the downward triangle hangs top-right, both flush to the edges at 15–25% of the shorter side. Content sits between them. The 917V mark moves bottom-right.
- **Lattice:** a field of pairs at 5–15% opacity with one diagonal path lit (tier color or Lift on Deep Blue). Used on covers, backdrops and the LinkedIn banner.
- **Backgrounds:** flat color only: 917 Black, Deep Blue, white, Cloud. No gradients, glows, neon, textures or "generic SaaS" washes.
- **Imagery:** real people at work in the region (candid, mid-task), architecture with strong diagonals, and real product screens. Cool, neutral grade with slightly lifted blacks, never teal-and-orange. No glowing brains, robots, binary rain or holograms. The "V window" crop of a photo is allowed once per piece. No character illustration; concept pictures are built from the Facet, the lattice and the icon library.
- **Diagrams:** 917 Black lines at 1.5 px, Cloud boxes with 4 px corners, Instrument Sans labels. 917 Blue marks the one path the diagram is about. No 3D or isometric cubes.
- **Charts:** sequential data uses the blue scale 200–900. Highlight one series in 917 Blue and keep the rest neutral. Accent colors appear only when comparing tiers.
- **Corner radii:** 4 px for buttons and inputs, 6 px for panels and cards, pill shapes for verdict chips, 22% for app tiles. The mark and Facet are never clipped by a rounded container.
- **Cards:** flat, 6 px radius. On light they are white with a 1 px keyline (`#E3E7EE` inset) or a `#F4F6F9` fill. On dark they are Graphite `#12161F` with a `#252C39` keyline. No drop shadows on cards; shadows appear only on floating overlays such as menus and dialogs.
- **Borders:** 1 px `--border` (`#D8DEE7` light, `#252C39` dark).
- **Spacing:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128. Website max content width is 1200 px on a 12-column grid with 24 px gutters and margins (16 px on phones). The header is 64 px.
- **Motion:** precise and short. 120 ms for hover and focus, 200 ms for menus, 320 ms for sections and drawers, 600 ms for brand moments only. Entrances use `cubic-bezier(.2,.7,.2,1)` and exits use `cubic-bezier(.4,0,1,1)`. No bounces, spins, glows or particles. With reduced motion, movement is replaced by a fade. The Facet has four moves only: Build up (rise), Cut down (drop, 80 ms later), Pathway, Frame.
- **Hover:** the primary button darkens to blue 600. Secondary buttons fill with Cloud (or neutral 800 on dark). Text links underline.
- **Press:** the primary button goes to Fold `#1A3A8C`. Buttons don't scale or bounce.
- **Focus:** a 2 px ring with a 2 px offset, 917 Blue on light and blue 300 `#86A8F2` on dark.
- **Transparency and blur:** used sparingly. Blur is not part of the brand. Opacity appears only for the descriptor line (66%), unlit lattice pairs (5–15%), the supporting form of an icon glyph (40%) and the app-tile keyline (white at 8%).
- **Accessibility:** body text never below 14 px, touch targets at least 44 × 44, state colors always paired with a word.
- **Dark theme:** a full theme. Pages sit on 917 Black, cards on Graphite, sunken surfaces on `#1B212C`, and links and focus move to blue 300.

## ICONOGRAPHY
- The brand uses its own **solid two-tone glyph** system on a 24 × 24 grid. The glyph sits in the central 15 units. The bottom-left and top-right corners hold a Facet pair (3.6 units wide each) in the tier or product color. The main form is full ink and the supporting form is 40%. Corners are sharp and diagonals follow the mark's angles.
- "Draw the job, not the technology": a shield for governance, never a chip or a brain.
- Supplied library (`assets/09-icons/`, dark and white versions): agentbase, agent-gateway, agent-guard, agent-insights, agent-marketplace, agentrank, ai-labs, velocity, lex, ledger, collect, agency, growth, procure, reserve.
- **Product app icons** (`assets/06-app-icons/`): Ink tile `#10141C`, 22% radius, a white glyph and the Facet split to the corners.
- **UI icon library** (`icons/`): 1,921 line icons on a 24 px grid with a 1.5 px stroke, imported from the 917V *Icons* Figma file. `icon-data.js` holds the core set as `{ viewBox, body }` SVG markup (paint with currentColor); `sets/` holds large categories (sports, finance, animals, weather, arrows) loaded on demand; `icon-meta.js` maps every key to a category and kebab-case name. Browse, search, copy and download them on the Iconography page. The Figma file holds about 9,500 icons in total; import more categories the same way when needed.
- A few early pages still load [Lucide](https://lucide.dev) from CDN for utility glyphs. Prefer the library above for anything new.
- No emoji and no unicode-as-icon. The Facet is never used as an arrow, bullet or warning sign.

## Logos and lockups (`assets/`)
- `01-master-logo/`: 917V primary (light and dark backgrounds), plus one-color black, white and 917 Blue. Use from file; never retype. Minimum 72 px wide on screen. Clear space is twice the width of the 1.
- `02-symbol/`: the V symbol and the app tile, plus `favicon-32.png`. Use below 72 px.
- `03-pillar-lockups/`, `04-product-lockups/`: horizontal, with-descriptor and hero versions, each with dark or white text on a transparent background.
- `05-product-prefix/`: 917 plus the Facet pair in each color.
- `06-app-icons/`, `07-social-avatars/`, `08-facet/` (Facet pair SVG per tier and product, plus Fold and Lift), `09-icons/`.
- Placement: top-left for websites and documents, bottom-left for slides. A product header shows the product lockup only, and 917V appears once in the footer with "A 917V product".

## Index
- `styles.css`: entry point (imports only). `tokens/`: fonts, colors (with dark theme), typography, spacing, motion, base.
- `fonts/`: Archivo, Instrument Sans, JetBrains Mono.
- `assets/`: brand masters (see above).
- `guidelines/`: foundation specimen cards (Colors, Type, Spacing, Brand).
- `components/`: React primitives:
  - `core/`: Button, Card (MetricCard), FacetMark, VerdictChip, Badge
  - `forms/`: TextField, Select, Checkbox, Switch
  - `navigation/`: SiteHeader, Tabs, Sidebar, Pagination
  - `feedback/`: Toast, Dialog
- `ui_kits/website/`: 917v.ai corporate site (home, AgentBase product page, about).
- `ui_kits/dashboard/`: internal agent operations console (overview, Agent Guard review queue, agent detail).
- `917V Design System.dc.html`: the browsable docs site. Sidebar sections:
  - **Foundations:** Logos, Iconography, Typesetting, Palette, 8 pt grid, Aspect ratio
  - **Components:** Breadcrumbs, Buttons, Cards, Chips, Code block, Date and time picker (with schedule blocks), Dialogs, Dropdown, Pagination, Progress, Skeleton, Stepper, Table, Tabs, Text fields, Toast, Tooltips
  - **Patterns:** Blog cards, Rating, Testimonials, Success pages
  The theme tweak switches the whole site between light and dark. Add new pages to the `PAGES` list in the logic class.
- `icons/`: the UI icon library (see Iconography).
- `image-slot.js`: drop-in image placeholder used for testimonial photos and logos.
- `SKILL.md`: Agent Skill manifest.

### Intentional additions
The brand book defines buttons, a metric card, verdict chips and a text field, and it specifies the website header and footer. The following were added because the requested surfaces need them, and they are built only from book tokens: Select, Checkbox, Switch, Tabs, Sidebar, Badge, Toast, Dialog, Pagination, and every docs-site page beyond buttons, chips and text fields. Examples on those pages use made-up names, companies and figures; replace them before anything goes public.


## Products (sub-brands)
Every product is built from the one 917V library. Products differ only in the layers their tier allows; components, grid, spacing, radius, iconography and neutrals are always 917V.
- **Core:** own logo, product icon and accent color. Ledger, Agency, Growth.
- **Tinted:** adds an own palette, keeps 917V type and validation. 917 Procure (Procure #6FA11F, Procure 200 #295A4D, Procure 400 #072A21, Easter #A793E3, Light Teal #D2E9E7).
- **Branded:** own palette and typography, may own validation colors.
  - 917 Collect: Plus Jakarta Sans / Clarity City. Collection #EA9A07, Dark Teal #065D6F, Onyx 500 #181D20, Onyx 400 #202426, Faded Denim #8DA4B7.
  - 917 Lex: Sen / Hanken Grotesk. Lex #9E5DE3, Lex 700 #040618, Navy #2C3051, Lex 10 #EBE5F2, Lex 5 #EEEBF2.
  - 917 Reserve: Thunder / DM Sans. Fuschia #D64FA8, Mulberry #3F0724, Kicks #EFEFEF, Aqua #A2F2F6. Uses the 917V neutrals.

Each product section in the docs site has Logo, Palette and Typography in that order, then product-specific pages (Reserve: Sport glyphs; Procure and Reserve: Themed components).

### Theming
Components read seven color tokens: `--action`, `--action-hover`, `--action-disabled`, `--tint`, `--tint-hover`, `--on-tint`, `--accent` (plus `--focus`, `--link`, `--facet`). Branded products also override `--font-display` and `--font-text`. Product values live in `tokens/themes/<product>.css`; load `tokens/themes/index.css` and set `data-product="procure|reserve|lex|collect"`. See the Themed components pages for the 917V-to-product mapping.
