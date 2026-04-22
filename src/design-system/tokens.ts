/**
 * Kecker Design System — Token Definitions
 *
 * This file is the single TypeScript source of truth for all design tokens.
 * It is used directly by Storybook and any scripts that need to reference
 * design values programmatically.
 *
 * The CSS custom properties in src/styles/global.css (:root block) mirror
 * these values and must be kept in sync when tokens change.
 *
 * Type scale rationale:
 *   base 1rem → h3 1.5rem → h2 2.5rem → h1 4.25rem
 *   Each step is roughly ×1.618 (golden ratio φ).
 *
 * Color rationale:
 *   Warm off-white (#faf9f7) background reads as natural parchment.
 *   Crimson (#971b2f) accent is used sparingly — it carries authority
 *   without aggression, echoing classical manuscript rubrics.
 */

// ---------------------------------------------------------------------------
// Color
// ---------------------------------------------------------------------------

export const color = {
  /** Page background — warm off-white, like natural parchment */
  bg:          '#faf9f7',
  /** Primary text — near-black, softer than pure #000 */
  ink:         '#111111',
  /** Body text — slightly lighter than ink */
  text:        '#2a2a2a',
  /** Secondary / supporting text */
  muted:       '#666666',
  /** Tertiary / metadata text */
  faint:       '#999999',
  /** Borders and dividers */
  rule:        '#e0dbd5',
  /** Brand accent — crimson, used sparingly */
  accent:      '#971b2f',
  /** Accent hover / pressed state */
  accentDark:  '#7a1527',
  /** Tinted section background — warm cream */
  warm:        '#f3ede6',
  /** Pure white — for reversed contexts */
  white:       '#ffffff',
} as const;

export type ColorToken = keyof typeof color;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const font = {
  /** EB Garamond — headings, display, long-form prose. Signals classical authority. */
  serif: "'EB Garamond', 'Iowan Old Style', Georgia, serif",
  /** Inter — UI chrome, labels, small text. Signals precision and modernity. */
  ui:    "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
} as const;

/**
 * Raw size scale (rem values).
 * Clamp expressions for responsive use are defined in CSS; these are the
 * max-viewport reference values.
 */
export const fontSize = {
  /** Eyebrow labels */
  eyebrow: '0.8125rem',   // 13px
  /** Navigation, footer, captions */
  sm:      '0.875rem',    // 14px
  /** UI labels */
  ui:      '0.9375rem',   // 15px
  /** Base body */
  base:    '1rem',        // 16px
  /** Body-lg / pillar text */
  md:      '1.125rem',    // 18px
  /** Lede paragraph */
  lede:    '1.375rem',    // 22px
  /** H3 max */
  h3:      '1.5rem',      // 24px
  /** Pull-quote, large accent text */
  display: '2.4rem',      // 38.4px
  /** H2 max */
  h2:      '2.5rem',      // 40px
  /** H1 max */
  h1:      '4.25rem',     // 68px
} as const;

export const lineHeight = {
  tight:  1.08,
  snug:   1.1,
  normal: 1.3,
  body:   1.6,
  prose:  1.82,
  loose:  1.95,
} as const;

export const letterSpacing = {
  eyebrow: '0.1em',
  tight:   '-0.025em',
  normal:  '-0.02em',
  ui:      '0.01em',
} as const;

export const fontWeight = {
  normal: 400,
  medium: 500,
  semi:   600,
} as const;

// ---------------------------------------------------------------------------
// Spacing (multiples of 4px / 0.25rem base)
// ---------------------------------------------------------------------------

export const space = {
  px1:  '0.25rem',    //  4px
  px2:  '0.5rem',     //  8px
  px3:  '0.75rem',    // 12px
  px4:  '1rem',       // 16px
  px5:  '1.25rem',    // 20px
  px6:  '1.5rem',     // 24px
  px7:  '1.75rem',    // 28px
  px8:  '2rem',       // 32px
  px10: '2.5rem',     // 40px
  px12: '3rem',       // 48px
  px16: '4rem',       // 64px
  px18: '4.5rem',     // 72px
  px20: '5rem',       // 80px
  px24: '6rem',       // 96px
  px28: '7rem',       // 112px
  px32: '8rem',       // 128px
} as const;

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

export const maxWidth = {
  /** Comfortable reading width for long-form prose */
  prose:   '44rem',   // ~704px
  /** Content column with sidebar room */
  content: '56rem',   // ~896px
  /** Wide content (flourishing section) */
  wide:    '64rem',   // ~1024px
  /** Full page container */
  page:    '72rem',   // ~1152px
} as const;

// ---------------------------------------------------------------------------
// Border radius
// ---------------------------------------------------------------------------

export const radius = {
  sm:   '4px',
  base: '6px',
  lg:   '10px',
} as const;

// ---------------------------------------------------------------------------
// Elevation (box shadows) — minimal; used sparingly
// ---------------------------------------------------------------------------

export const shadow = {
  sm: '0 1px 3px rgba(0,0,0,0.06)',
  md: '0 4px 12px rgba(0,0,0,0.08)',
} as const;

// ---------------------------------------------------------------------------
// Logo dimensions (for SVG usage guidance)
// ---------------------------------------------------------------------------

export const logo = {
  /** Mark-only viewBox dimensions */
  markWidth:      40,
  markHeight:     44,
  /** Wordmark viewBox dimensions */
  wordmarkWidth:  200,
  wordmarkHeight: 44,
  /** Minimum safe size for mark-only usage */
  minMarkPx: 16,
  /** Minimum safe size for wordmark usage */
  minWordmarkPx: 80,
} as const;
