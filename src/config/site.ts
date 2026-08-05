import type { Locale } from './i18n';

export const siteConfig = {
  name: 'nrtedesco',
  shortName: 'nrtedesco',
  description: 'Portfolio website built on astro-narrow.',
  author: {
    name: 'Nicholas Tedesco',
    title: {
      en: 'A clean and minimal Astro theme'
    },
    description: {
      en: 'Writing, projects, and notes — a compact space for ideas that keep their shape.'
    },
    avatar: '/favicon.svg',
    social: [
      { name: 'GitHub', url: 'https://github.com/nrtedesco', icon: 'simple-icons:github' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nicholas-r-tedesco/', icon: 'simple-icons:linkedin' },
      { name: 'Resume', url: '/resume.pdf', icon: 'lucide:file-text' }
    ]
  },
  contentWidth: '56rem',
  ui: {
    navbar: {
      sticky: true
    },
    dock: {
      enabled: false
    }
  },
  nav: ['posts', 'series', 'projects', 'archives'],
  footerNav: [],
  comments: {
    enabled: false,
    provider: 'giscus',
    giscus: {
      repo: '',
      repoId: '',
      category: '',
      categoryId: '',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'bottom',
      theme: 'preferred_color_scheme'
    }
  },
  analytics: {
    enabled: false,
    provider: 'umami',
    umami: {
      src: '',
      websiteId: '',
      domains: ''
    }
  },
  gallery: {
    enabled: true,
    defaultLayout: 'grid',
    gap: 10,
    targetRowHeight: 220,
    lastRowBehavior: 'center',
    columnWidth: 220,
    columns: 'auto'
  },
  lightbox: {
    enabled: true
  },
  post: {
    relatedCount: 3,
    license: {
      enabled: true,
      name: 'CC BY-NC-SA 4.0',
      url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
      description: 'This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.'
    },
    /**
     * Colors for Markdown emphasis in post prose (`**bold**`, `*italic*`, `***both***`).
     * Use any valid CSS color. Light/dark variants keep contrast in both modes.
     */
    emphasis: {
      bold: {
        light: '#04B1FB',
        dark: '#04B1FB'
      },
      italic: {
        light: '#FB7F04',
        dark: '#FB7F04'
      },
      boldItalic: {
        light: 'oklch(0.46 0.18 320)',
        dark: 'oklch(0.84 0.12 320)'
      }
    }
  }
} satisfies {
  name: string;
  shortName: string;
  description: string;
  author: {
    name: string;
    title: Record<Locale, string>;
    description: Record<Locale, string>;
    avatar: string;
    social: Array<{ name: string; url: string; icon: string }>;
  };
  contentWidth: `${number}rem`;
  ui: {
    navbar: {
      sticky: boolean;
    };
    dock: {
      enabled: boolean;
    };
  };
  nav: Array<string | { label: Record<Locale, string>; href: string; icon: string }>;
  footerNav: Array<string | { label: Record<Locale, string>; href: string; icon: string }>;
  comments: Record<string, any>;
  analytics: Record<string, any>;
  gallery: Record<string, any>;
  lightbox: Record<string, any>;
  post: Record<string, any>;
};
