import * as React from 'react';
export interface SelectOption { value: string; label: string; }
/** Native select styled to match TextField. */
export interface SelectProps { label?: string; value?: string; defaultValue?: string; options?: Array<string | SelectOption>; onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; disabled?: boolean; id?: string; style?: React.CSSProperties; }
export declare function Select(props: SelectProps): JSX.Element;
