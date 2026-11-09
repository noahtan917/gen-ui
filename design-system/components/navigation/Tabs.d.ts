import * as React from 'react';
export interface TabItem { value: string; label: string; count?: number; }
/** Underline tabs; the selected tab takes a 2px 917 Blue rule (selected state). */
export interface TabsProps { items?: Array<string | TabItem>; value?: string; onChange?: (value: string) => void; style?: React.CSSProperties; }
export declare function Tabs(props: TabsProps): JSX.Element;
