import * as React from 'react';
/**
 * 64px website header — logo top-left, sentence-case nav, one primary CTA.
 * @startingPoint section="Navigation" subtitle="Website header and footer" viewport="700x300"
 */
export interface SiteHeaderProps {
  /** Logo element — <img> of the 917V master (48px wide) or the product lockup on product sites */
  logo?: React.ReactNode;
  nav?: string[];
  active?: string | null;
  onNav?: (item: string | null) => void;
  cta?: string | null;
  onCta?: () => void;
  theme?: 'light' | 'dark';
  style?: React.CSSProperties;
}
export declare function SiteHeader(props: SiteHeaderProps): JSX.Element;
export interface SiteFooterColumn { title: string; links: string[]; }
export interface SiteFooterProps { logo?: React.ReactNode; line?: string; columns?: SiteFooterColumn[]; legal?: string; theme?: 'light' | 'dark'; style?: React.CSSProperties; }
export declare function SiteFooter(props: SiteFooterProps): JSX.Element;
