import * as React from 'react';
export interface SidebarItem { key: string; label: string; icon?: React.ReactNode; count?: number; }
export interface SidebarSection { title?: string; items: SidebarItem[]; }
/** 917 Black product sidebar for internal tools and dashboards. */
export interface SidebarProps { header?: React.ReactNode; sections?: SidebarSection[]; value?: string; onChange?: (key: string) => void; footer?: React.ReactNode; width?: number; style?: React.CSSProperties; }
export declare function Sidebar(props: SidebarProps): JSX.Element;
