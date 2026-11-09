import * as React from 'react';
/** Modal confirmation dialog. */
export interface DialogProps { open?: boolean; title?: string; children?: React.ReactNode; confirm?: string; cancel?: string | null; onConfirm?: () => void; onCancel?: () => void; danger?: boolean; /** Render without overlay (for docs/cards) */ inline?: boolean; width?: number; style?: React.CSSProperties; }
export declare function Dialog(props: DialogProps): JSX.Element | null;
