import { site } from "./site";

/** Any section listed in `site.order` — the ids the nav and scroll-spy use. */
export type SectionId = (typeof site.order)[number];

/**
 * The nav bar, derived from `site.order` rather than written out again. Adding
 * a section to the config puts it in the bar; reordering the config reorders
 * the bar and the page.
 */
export const NAV = site.order.map((id) => ({
  id,
  label: site.sections[id].nav,
}));

