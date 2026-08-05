import type { CollectionEntry } from 'astro:content';
import { HOME_PIN_LIMIT, homePins, type HomePin, type HomePinType } from '../../config/home-pins';
import type { Locale } from '../../config/i18n';
import { entrySlug, getLocalizedEntries, localizedEntryPath } from './entries';
import { getLocalizedSeries, localizedSeriesPath, type ResolvedSeries } from './series';

type HomePinBase = {
  slug: string;
  title: string;
  description?: string;
  cover?: string;
  href: string;
};

export type ResolvedHomePin =
  | (HomePinBase & {
      type: 'posts';
      entry: CollectionEntry<'posts'>;
    })
  | (HomePinBase & {
      type: 'projects';
      entry: CollectionEntry<'projects'>;
    })
  | (HomePinBase & {
      type: 'series';
      series: ResolvedSeries;
      chapterCount: number;
    });

const pinIcons: Record<HomePinType, string> = {
  posts: 'lucide:file-text',
  projects: 'lucide:layers',
  series: 'lucide:list-ordered'
};

const pinLabels: Record<HomePinType, Record<Locale, string>> = {
  posts: { en: 'Post' },
  projects: { en: 'Project' },
  series: { en: 'Series' }
};

export function homePinIcon(type: HomePinType) {
  return pinIcons[type];
}

export function homePinLabel(type: HomePinType, locale: Locale) {
  return pinLabels[type][locale];
}

function findBySlug<T extends { id: string }>(
  items: T[],
  slug: string,
  getSlug: (item: T) => string
) {
  return items.find((item) => getSlug(item) === slug);
}

function seriesCover(series: ResolvedSeries) {
  for (const chapter of series.chapters) {
    if (chapter.data.cover) return chapter.data.cover;
  }
  return undefined;
}

async function resolvePin(pin: HomePin, locale: Locale): Promise<ResolvedHomePin> {
  if (pin.type === 'series') {
    const series = await getLocalizedSeries(locale);
    const match = findBySlug(series, pin.slug, (item) => item.slug);
    if (!match) {
      throw new Error(`homePins: series "${pin.slug}" not found for locale "${locale}".`);
    }

    return {
      type: 'series',
      slug: pin.slug,
      title: match.entry.data.title,
      description: match.entry.data.description,
      cover: seriesCover(match),
      href: localizedSeriesPath(match.entry),
      series: match,
      chapterCount: match.chapters.length
    };
  }

  const entries = await getLocalizedEntries(pin.type, locale);
  const match = findBySlug(entries, pin.slug, entrySlug);
  if (!match) {
    throw new Error(`homePins: ${pin.type} "${pin.slug}" not found for locale "${locale}".`);
  }

  if (pin.type === 'posts') {
    return {
      type: 'posts',
      slug: pin.slug,
      title: match.data.title,
      description: match.data.description,
      cover: match.data.cover,
      href: localizedEntryPath('posts', match as CollectionEntry<'posts'>),
      entry: match as CollectionEntry<'posts'>
    };
  }

  return {
    type: 'projects',
    slug: pin.slug,
    title: match.data.title,
    description: match.data.description,
    cover: match.data.cover,
    href: localizedEntryPath('projects', match as CollectionEntry<'projects'>),
    entry: match as CollectionEntry<'projects'>
  };
}

/** Resolve configured landing-page pins for a locale (max HOME_PIN_LIMIT). */
export async function getHomePins(locale: Locale): Promise<ResolvedHomePin[]> {
  const selected = homePins.slice(0, HOME_PIN_LIMIT);
  return Promise.all(selected.map((pin) => resolvePin(pin, locale)));
}
