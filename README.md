# Astro Narrow

A multi-color scheme Astro theme migrated from Hugo Narrow while retaining the overall Narrow design.

[English](README.md) · [简体中文](README.zh-CN.md) · [Hugo Narrow](https://github.com/tom2almighty/hugo-narrow)

## Features

- Multiple color palettes
- Table of contents
- Search
- Multiple languages
- Math and diagrams
- Multiple gallery layouts

## Quick Start

```sh
pnpm install
pnpm dev
pnpm build
```

## Main Config Files

| File                    | Purpose                                        | Common options                                                                 |
| ----------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------ |
| `src/config/site.ts`    | Site, author, and global features              | `contentWidth`, `nav`, `footerNav`, `comments`, `analytics`, `gallery`, `post` |
| `src/config/content.ts` | Lists and home sections for Posts and Projects | `cardStyle`, `listLayout`, `gridColumns`, `home.enabled`, `home.limit`         |
| `src/config/i18n.ts`    | Locales and display names                      | `defaultLocale`, `locales`, `localeMeta`                                       |
| `src/config/theme.ts`   | Palettes available in the Dock                 | `themes`                                                                       |
| `src/content.config.ts` | Available frontmatter fields                   | Update when adding or changing content fields                                  |

`cardStyle` accepts `article`, `showcase`, or `compact`; `listLayout` accepts `stack` or `grid`; `gridColumns` accepts `1`, `2`, or `3`.

When adding a locale, also update `i18n.locales` in `astro.config.mjs` and the allowed `lang` values in `src/content.config.ts`.

Navigation supports `posts`, `series`, `projects`, and `archives`:

```ts
nav: ["posts", "series", "projects", "archives"],
footerNav: ["archives"],
```

A custom item requires localized labels, a URL, and a Lucide icon:

```ts
{
  label: { en: "Docs", "zh-cn": "文档" },
  href: "https://example.com/docs/",
  icon: "lucide:book-open",
}
```

## Content Taxonomy

Posts use `categories` and `tags`, both as string arrays:

```yaml
---
title: Writing with Astro Narrow
pubDate: 2026-07-10
categories: [Guides]
tags: [Astro, Markdown]
---
```

- `categories`: broad content groups such as `Guides` or `Essays`.
- `tags`: topics or technologies covered by the post; multiple values are allowed.
- Projects only use `tags`.
- Pages do not use `categories` or `tags`.

Archives filter URLs can be shared directly:

```text
/archives/?category=Guides
/archives/?tag=Astro
/archives/?category=Guides&tag=Astro
```

## Ordered Series

Create a Markdown file under `src/content/series/<locale>/`. Its filename becomes the Series URL slug, and its Markdown body can provide an introduction.

```yaml
---
title: Astro Narrow Practical Guide
description: From content authoring to deployment.
draft: false
chapters:
  - en/authoring-content-collections
  - en/configure-series
  - en/deploy-github-pages
---
Follow the chapters in order to move from writing content to deploying the site.
```

| Option        | Required | Purpose                                        |
| ------------- | -------- | ---------------------------------------------- |
| `title`       | Yes      | Series title                                   |
| `description` | No       | Summary shown on index and detail pages        |
| `chapters`    | Yes      | Post IDs in reading order; at least two        |
| `draft`       | No       | Set to `true` to hide the public Series        |
| `lang`        | No       | Usually inferred from the `<locale>` directory |

A Post ID is the path relative to `src/content/posts/`, without its extension. A Series and all its chapters must use the same locale, chapters must be published, and a post can belong to only one public Series. Reorder the `chapters` array without changing post URLs.

`/series/` lists all Series, and `/series/<slug>/` shows the introduction and chapter list. Remove `"series"` from `siteConfig.nav` when a primary navigation entry is not needed.

## Markdown Tabs

Tabs use `remark-directive` syntax. The outer container uses four colons because it contains nested directives.

````md
::::tabs
:::tab{title="site.ts"}

```ts
export const siteConfig = {
  // Default page width; visitors can override it from Dock display settings.
  contentWidth: "56rem",
};
```

:::

:::tab{title="content.ts"}

```ts
export const contentTypes = {
  posts: { listLayout: "stack" },
};
```

:::
::::
````

## GitHub Pages

The example workflow is in `.github/workflows/deploy.yml`. Before the first deployment, open repository **Settings > Pages** and set **Build and deployment > Source** to **GitHub Actions**. Without this setting, `actions/deploy-pages` can fail with `HttpError: Not Found`.

The workflow sets `ASTRO_SITE` and `ASTRO_BASE` automatically for both user pages and project pages.

## License

This project is licensed under the [GNU General Public License Version 3](LICENSE).
