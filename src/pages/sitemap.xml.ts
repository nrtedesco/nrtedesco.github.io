import { getCollection } from 'astro:content';
import { locales } from '../config/i18n';
import { getLocalePath } from '../config/i18n';
import { localizedEntryPath } from '../lib/content/entries';
import { localizedSeriesPath } from '../lib/content/series';

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET({ site, url }: { site?: URL; url: URL }) {
  const origin = (site?.origin || url.origin).replace(/\/$/, '');
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  const pages = await getCollection('pages', ({ data }) => !data.draft);
  const series = await getCollection('series', ({ data }) => !data.draft);

  const staticPaths = locales.flatMap((locale) => [
    getLocalePath(locale, '/'),
    getLocalePath(locale, '/posts/'),
    getLocalePath(locale, '/projects/'),
    getLocalePath(locale, '/series/'),
    getLocalePath(locale, '/archives/'),
    getLocalePath(locale, '/rss.xml')
  ]);

  const postPaths = posts.map((entry) => localizedEntryPath('posts', entry as any));
  const projectPaths = projects.map((entry) => localizedEntryPath('projects', entry as any));
  const pagePaths = pages.map((entry) => localizedEntryPath('pages', entry as any));
  const seriesPaths = series.map((entry) => localizedSeriesPath(entry));
  const urls = [...new Set([...staticPaths, ...postPaths, ...projectPaths, ...pagePaths, ...seriesPaths])]
    .map((path) => `<url><loc>${escapeXml(`${origin}${path}`)}</loc></url>`)
    .join('');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: {
      'content-type': 'application/xml; charset=utf-8'
    }
  });
}
