import React from 'react';

const COLORS = {
  agentbase: '#2F63D6', 'ai-labs': '#3F9BF0', velocity: '#6E5BE0', lex: '#A35CE6', ledger: '#1FA971', collect: '#E59E1A',
  agency: '#F26B3A', growth: '#EF4F6B', procure: '#6FA11F', reserve: '#D64FA8', devs: '#7A2FB0', fold: '#1A3A8C', lift: '#A8C0F4',
};

/** The Facet pair (Build up + Cut down) from the brand master geometry, 0.973 : 1. */
export function FacetMark({ tier = 'agentbase', color, size = 16, title, style }) {
  const fill = color || COLORS[tier] || COLORS.agentbase;
  return (
    <svg viewBox="0 0 97.3 100" width={size * 0.973} height={size} role={title ? 'img' : 'presentation'} aria-label={title} style={{ display: 'block', flex: 'none', ...style }}>
      <path d="M0,100H57.7L29.7,30.06Z" fill={fill} />
      <path d="M42.5,0H97.3L70.4,69.8Z" fill={fill} />
    </svg>
  );
}
FacetMark.colors = COLORS;
