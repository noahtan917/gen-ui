import * as React from 'react';
/** Transient system message. Plain and brief: what happened, what to do next. */
export interface ToastProps { state?: 'allow' | 'hold' | 'block' | 'info'; title?: string; children?: React.ReactNode; action?: string; onAction?: () => void; onClose?: () => void; style?: React.CSSProperties; }
export declare function Toast(props: ToastProps): JSX.Element;
