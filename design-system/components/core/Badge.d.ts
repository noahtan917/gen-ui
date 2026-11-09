import * as React from 'react';
/** Metadata label. Not for status — use VerdictChip. */
export interface BadgeProps { tone?: 'neutral' | 'outline' | 'blue' | 'dark'; children?: React.ReactNode; style?: React.CSSProperties; }
export declare function Badge(props: BadgeProps): JSX.Element;
