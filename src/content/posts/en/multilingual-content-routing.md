---
title: "Content Paths and Internal Links"
description: "Keep content folders, routes, taxonomy terms, and base-aware links predictable."
pubDate: 2026-06-23
categories: ["Guides"]
tags: ["Routing", "Astro"]
toc: "side"
---

This site is English-only. Content lives under locale folders for compatibility with the theme's content helpers, but `locales` only includes `en`, so pages are never prefixed with `/en/`.

## Place content under the English folder

```text
src/content/posts/en/deploy-github-pages.md
src/content/projects/en/astro-narrow.md
src/content/series/en/astro-narrow-practical-guide.md
```

Collection helpers derive locale from the first path segment (`en/...`). Keep new posts in `src/content/posts/en/` so listing, search, RSS, and home pins resolve correctly.

## Prefer locale helpers for internal links

Use `getLocalePath()` instead of hard-coding root-absolute paths:

```ts
getLocalePath('en', '/archives/')
// /archives/
```

On a project Pages deployment, the result also receives the configured repository base. Prefer this helper over string concatenation so links stay inside `ASTRO_BASE`.

## Verify with a project-base build

After changing navigation or content paths, build once with `ASTRO_BASE=/astro-narrow/`. Confirm that routes do not gain an `/en/` prefix, and that assets, Archives links, search results, RSS, and sitemap all stay inside the project base.
