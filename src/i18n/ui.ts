import type { Locale } from '../config/i18n';

export const languages: Record<Locale, string> = {
  en: 'English'
};

export const defaultLang: Locale = 'en';

export const ui = {
  en: {
    'archive.description': 'All posts ordered by publication date.',
    'archive.filter.all': 'All',
    'archive.filter.categories': 'Categories',
    'archive.filter.empty': 'No posts match these filters.',
    'archive.filter.label': 'Filter archives',
    'archive.filter.tags': 'Tags',
    'archive.results.prefix': 'Showing',
    'archive.results.suffix': 'posts',
    'archive.title': 'Archives',
    'dock.back': 'Back',
    'dock.display': 'Display settings',
    'dock.display.close': 'Close display settings',
    'dock.display.reset': 'Restore default page width',
    'dock.display.width': 'Page width',
    'dock.home': 'Home',
    'dock.top': 'Back to top',
    'home.featuredProjects': 'Featured Projects',
    'home.recentPosts': 'Recent Posts',
    'home.scrollNext': 'Scroll to next section',
    'home.viewAll': 'View all',
    'license.label': 'License',
    'nav.colorMode': 'Toggle color mode',
    'nav.language': 'Language',
    'nav.menu': 'Menu',
    'nav.search': 'Search',
    'nav.theme': 'Theme',
    'notFound.action': 'Back home',
    'notFound.description': 'The page you are looking for does not exist.',
    'notFound.title': 'Page not found',
    'posts.description': 'Notes, essays, and technical writing.',
    'posts.title': 'Posts',
    'postNav.next': 'Next',
    'postNav.navigation': 'Post navigation',
    'postNav.previous': 'Previous',
    'projects.description': 'Selected projects, experiments, and work notes.',
    'projects.title': 'Projects',
    'related.title': 'Related Posts',
    'series.chapterCount': 'chapters',
    'series.chapters': 'Chapters',
    'series.description': 'Ordered reading paths for focused learning.',
    'series.empty': 'No published series yet.',
    'series.label': 'Series',
    'series.latestChapter': 'Latest chapter',
    'series.navigation': 'Series chapter navigation',
    'series.nextChapter': 'Next chapter',
    'series.previousChapter': 'Previous chapter',
    'series.title': 'Series',
    'search.close': 'Close search',
    'search.empty': 'Type to start searching',
    'search.label': 'Search',
    'search.loading': 'Loading index',
    'search.noResults': 'No results found',
    'search.placeholder': 'Search content'
  }
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)[typeof defaultLang];
