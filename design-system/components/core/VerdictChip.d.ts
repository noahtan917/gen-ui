import * as React from 'react';
/** Agent Guard verdict / system status chip. */
export interface VerdictChipProps {
  state?: 'allow' | 'hold' | 'block' | 'info' | 'neutral';
  /** Label; defaults to the state word. Never leave color alone without a word. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function VerdictChip(props: VerdictChipProps): JSX.Element;
