import * as React from 'react';
/** The Facet pair, the 917 graphic device. One lit pair per view. Min 10px wide. */
export interface FacetMarkProps {
  /** Tier or product key; sets the fill */
  tier?: 'agentbase' | 'ai-labs' | 'velocity' | 'lex' | 'ledger' | 'collect' | 'agency' | 'growth' | 'procure' | 'reserve' | 'devs' | 'fold' | 'lift';
  /** Override fill (must be a palette color) */
  color?: string;
  /** Height in px */
  size?: number;
  title?: string;
  style?: React.CSSProperties;
}
export declare function FacetMark(props: FacetMarkProps): JSX.Element;
