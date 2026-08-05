/**
 * Pinned Notes & Projects on the landing page.
 *
 * Edit `homePins` to choose up to 6 items. Each pin points at a published
 * content entry by type + locale-relative slug (no `en/` / `zh-cn/` prefix).
 *
 * Examples:
 *   { type: 'posts', slug: 'hello-astro-narrow' }
 *   { type: 'projects', slug: 'astro-narrow' }
 *   { type: 'series', slug: 'astro-narrow-practical-guide' }
 */

export const HOME_PIN_LIMIT = 6;

export type HomePinType = 'posts' | 'projects' | 'series';

export type HomePin = {
  type: HomePinType;
  /** Locale-relative slug from the content filename / folder. */
  slug: string;
};

function defineHomePins<const T extends readonly HomePin[]>(pins: T & (T['length'] extends 0 | 1 | 2 | 3 | 4 | 5 | 6 ? unknown : never)) {
  if (pins.length > HOME_PIN_LIMIT) {
    throw new Error(`homePins supports at most ${HOME_PIN_LIMIT} items (got ${pins.length}).`);
  }
  return pins;
}

export const homePins = defineHomePins([
  { type: 'posts', slug: 'chess-scandinavian' },
  { type: 'posts', slug: 'outdoors-loyalsock' },
  { type: 'posts', slug: 'outdoors-acadia' },
  { type: 'posts', slug: 'authoring-content-collections' },
  { type: 'posts', slug: 'configure-series' },
  { type: 'posts', slug: 'deploy-github-pages' }
]);
