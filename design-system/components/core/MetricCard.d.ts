import * as React from 'react';
/**
 * Flat metric card with optional Facet marker (top-right).
 * @startingPoint section="Core" subtitle="KPI card with Facet marker" viewport="700x260"
 */
export interface MetricCardProps {
  label?: string;
  value?: React.ReactNode;
  caption?: string;
  /** Tier/product key — renders the one lit Facet pair. Use on one card per view only. */
  facet?: string | null;
  tone?: 'card' | 'sunken';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function MetricCard(props: MetricCardProps): JSX.Element;
export interface CardProps { padding?: number | string; children?: React.ReactNode; style?: React.CSSProperties; }
export declare function Card(props: CardProps): JSX.Element;
