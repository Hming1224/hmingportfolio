export const BREAKPOINT_MOBILE = 768;
export const BREAKPOINT_TABLET = 1024;
export const BREAKPOINT_DESKTOP = 1440;

export const mediaQueries = {
  mobile: `(max-width: ${BREAKPOINT_MOBILE}px)`,
  tablet: `(max-width: ${BREAKPOINT_TABLET - 1}px)`,
  desktop: `(min-width: ${BREAKPOINT_DESKTOP}px)`,
} as const;
