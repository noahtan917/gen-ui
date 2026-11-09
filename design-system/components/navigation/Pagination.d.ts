import * as React from 'react';
/**
 * Pagination below tables, lists, card grids and carousels.
 * @startingPoint section="Navigation" subtitle="Numbered, count, compact and dots pagination" viewport="700x300"
 */
export interface PaginationProps {
  /** numbered = data tables; count = large lists; compact = tight spaces; dots = carousels (≤5 items) */
  variant?: 'numbered' | 'count' | 'compact' | 'dots';
  /** Current page, 1-based */
  page?: number;
  pageCount?: number;
  onChange?: (page: number) => void;
  /** count variant: total items */
  total?: number;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizes?: number[];
  /** count variant: noun after the total, e.g. "agents" */
  noun?: string;
  style?: React.CSSProperties;
}
export declare function Pagination(props: PaginationProps): JSX.Element;
