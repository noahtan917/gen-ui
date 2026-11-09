import * as React from 'react';
/**
 * Sentence-case action button. One primary per view, in 917 Blue.
 * @startingPoint section="Core" subtitle="Primary, secondary, ghost buttons" viewport="700x260"
 */
export interface ButtonProps {
  /** primary = 917 Blue fill (one per view); secondary = outlined; ghost = text link; inverse = white on dark grounds */
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
