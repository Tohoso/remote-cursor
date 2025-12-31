/**
 * Remote Cursor - Theme Constants
 *
 * This file exports all design tokens (colors, typography, spacing)
 * as constants for use throughout the mobile application.
 *
 * @see docs/design/STYLE_GUIDE.md for specifications
 */

export const colors = {
  background: '#111827',
  surface: '#1F2937',
  primaryText: '#F9FAFB',
  secondaryText: '#9CA3AF',
  accent: '#3B82F6',
  status: {
    success: '#10B981',
    inProgress: '#F59E0B',
    blocked: '#EF4444',
    ready: '#6B7280',
  },
};

export const typography = {
  display: {
    fontSize: 36,
    fontWeight: '700' as '700',
  },
  h1: {
    fontSize: 24,
    fontWeight: '700' as '700',
  },
  h2: {
    fontSize: 20,
    fontWeight: '600' as '600',
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as '400',
  },
  label: {
    fontSize: 14,
    fontWeight: '500' as '500',
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as '400',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const theme = {
  colors,
  typography,
  spacing,
};
