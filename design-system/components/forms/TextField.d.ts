import * as React from 'react';
/**
 * Labelled text input with 2px focus ring.
 * @startingPoint section="Forms" subtitle="Text field, select, checkbox, switch" viewport="700x320"
 */
export interface TextFieldProps {
  label?: string; value?: string; defaultValue?: string; placeholder?: string;
  /** Helper text under the field */
  hint?: string;
  /** Error text: says what went wrong and how to fix it */
  error?: string;
  type?: string; disabled?: boolean; id?: string;
  prefix?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties; inputStyle?: React.CSSProperties;
}
export declare function TextField(props: TextFieldProps): JSX.Element;
